import "server-only";

import type { ChatMessage } from "./types";

/**
 * The only file that calls a language model.
 *
 * The UI and the route handlers ask for text, a stream, or JSON.
 * They do not know the provider. To switch away from Gemini, replace
 * requestGemini() and keep streamChat() / generateJSON() the same.
 */

const DEFAULT_MODEL = "gemini-3.8-flash";
const API_ROOT = "https://generativelanguage.googleapis.com/v1beta/models";

type GeminiRole = "user" | "model";

type GeminiPart = { text?: string; thought?: boolean };

type GeminiResponse = {
  candidates?: {
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }[];
  promptFeedback?: { blockReason?: string };
  error?: { message?: string; status?: string };
};

export class LlmError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LlmError";
  }
}

function getConfig() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new LlmError(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the dev server.",
    );
  }
  return {
    apiKey,
    model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL,
  };
}

/** Gemini uses "model" where this app uses "assistant", and it rejects two user turns in a row. */
function toContents(messages: ChatMessage[]) {
  const contents: { role: GeminiRole; parts: { text: string }[] }[] = [];

  for (const message of messages) {
    const text = message.content.trim();
    if (!text) continue;
    const role: GeminiRole = message.role === "assistant" ? "model" : "user";
    const previous = contents[contents.length - 1];
    if (previous && previous.role === role) {
      previous.parts[0].text += `\n\n${text}`;
    } else {
      contents.push({ role, parts: [{ text }] });
    }
  }

  if (contents[0]?.role === "model") contents.shift();
  if (contents.length === 0) throw new LlmError("There is no user message to send.");
  return contents;
}

function readText(payload: GeminiResponse): string {
  if (payload.error?.message) throw new LlmError(payload.error.message);
  if (payload.promptFeedback?.blockReason) {
    throw new LlmError("The model declined this request. Try rephrasing it around interview preparation.");
  }
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  const text = parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text)
    .join("");
  return text;
}

function friendlyStatus(status: number, body: string): string {
  if (status === 429) {
    return "Gemini rate limit reached. Wait a minute and try again. The free tier has a small daily quota.";
  }
  if (status === 400 || status === 404) {
    return `Gemini rejected the request (${status}). Check GEMINI_MODEL in .env.local. Details: ${body.slice(0, 280)}`;
  }
  if (status === 401 || status === 403) {
    return "Gemini refused the API key. Create a new key in Google AI Studio and update .env.local.";
  }
  return `Gemini request failed (${status}). ${body.slice(0, 280)}`;
}

type GeminiRequest = {
  system: string;
  messages: ChatMessage[];
  temperature: number;
  json: boolean;
  maxOutputTokens: number;
};

async function requestGemini(input: GeminiRequest, stream: boolean): Promise<Response> {
  const { apiKey, model } = getConfig();
  const method = stream ? "streamGenerateContent" : "generateContent";
  const url = new URL(`${API_ROOT}/${model}:${method}`);
  url.searchParams.set("key", apiKey);
  if (stream) url.searchParams.set("alt", "sse");

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: input.system }] },
      contents: toContents(input.messages),
      generationConfig: {
        temperature: input.temperature,
        maxOutputTokens: input.maxOutputTokens,
        // Low thinking keeps free-tier replies fast and leaves room for the actual answer.
        thinkingConfig: { thinkingLevel: "LOW", includeThoughts: false },
        ...(input.json ? { responseMimeType: "application/json" } : {}),
      },
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new LlmError(friendlyStatus(response.status, body));
  }
  return response;
}

/** Pull a JSON value out of a model reply, even if it added a fence or a sentence. */
export function parseModelJson(raw: string): unknown {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const body = (fenced ? fenced[1] : trimmed).trim();
  const start = body.search(/[\[{]/);
  if (start === -1) throw new LlmError("The model did not return JSON.");
  const slice = body.slice(start);
  try {
    return JSON.parse(slice);
  } catch {
    const end = Math.max(slice.lastIndexOf("}"), slice.lastIndexOf("]"));
    if (end !== -1) {
      try {
        return JSON.parse(slice.slice(0, end + 1));
      } catch {
        // Fall through to the single error generateJSON knows how to retry.
      }
    }
    throw new LlmError("The model returned invalid JSON.");
  }
}

export async function* streamChat(options: {
  system: string;
  messages: ChatMessage[];
}): AsyncGenerator<string> {
  const response = await requestGemini(
    {
      system: options.system,
      messages: options.messages,
      temperature: 0.7,
      json: false,
      maxOutputTokens: 2048,
    },
    true,
  );

  if (!response.body) throw new LlmError("Gemini returned an empty stream.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let emitted = false;

  const emitPayload = function* (payload: GeminiResponse): Generator<string> {
    const text = readText(payload);
    if (text) {
      emitted = true;
      yield text;
    }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      yield* emitPayload(JSON.parse(data) as GeminiResponse);
    }
  }

  if (!emitted) throw new LlmError("The model returned an empty reply. Please try again.");
}

async function generateText(options: {
  system: string;
  user: string;
  json: boolean;
}): Promise<string> {
  const response = await requestGemini(
    {
      system: options.system,
      messages: [{ role: "user", content: options.user }],
      temperature: options.json ? 0.3 : 0.7,
      json: options.json,
      maxOutputTokens: 8192,
    },
    false,
  );
  const payload = (await response.json()) as GeminiResponse;
  const text = readText(payload).trim();
  if (!text) throw new LlmError("The model returned an empty reply. Please try again.");
  return text;
}

/**
 * Ask for JSON, check it with `validate`, and retry once if the shape is wrong.
 * The second attempt tells the model what failed.
 */
export async function generateJSON<T>(options: {
  system: string;
  user: string;
  validate: (value: unknown) => T;
}): Promise<T> {
  let lastError = "The response did not match the expected JSON.";

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const user =
      attempt === 0
        ? options.user
        : `${options.user}\n\nYour previous reply was rejected: ${lastError}\nReturn only corrected JSON. No markdown.`;

    try {
      const text = await generateText({ system: options.system, user, json: true });
      return options.validate(parseModelJson(text));
    } catch (error) {
      const message = error instanceof Error ? error.message : lastError;
      const canRetry = /JSON|must be|needs at least|Expected|non-empty|array of strings/.test(message);
      if (!canRetry) throw error;
      lastError = message;
    }
  }

  throw new LlmError(`The model returned unusable JSON twice. ${lastError}`);
}
