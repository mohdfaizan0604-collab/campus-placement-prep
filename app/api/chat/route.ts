import { streamChat, LlmError } from "@/lib/llm";
import { getChatSystemPrompt } from "@/lib/prompts";
import { CHAT_MODES, type ChatMessage, type ChatMode } from "@/lib/types";

export const maxDuration = 60;

/** How many past messages are sent with each new question. Older turns stay on screen only. */
const MEMORY_LIMIT = 10;

function isMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const message = value as ChatMessage;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 4000
  );
}

export async function POST(request: Request) {
  let body: { mode?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body with mode and messages." }, { status: 400 });
  }

  if (!CHAT_MODES.includes(body.mode as ChatMode)) {
    return Response.json({ error: "Choose a valid chat mode." }, { status: 400 });
  }
  if (!Array.isArray(body.messages) || body.messages.length === 0 || !body.messages.every(isMessage)) {
    return Response.json({ error: "Messages must be a list of user and assistant turns." }, { status: 400 });
  }

  const messages = body.messages.slice(-MEMORY_LIMIT);
  if (messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "The latest message must be from the student." }, { status: 400 });
  }

  try {
    const iterator = streamChat({
      system: getChatSystemPrompt(body.mode as ChatMode),
      messages,
    });
    const first = await iterator.next();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          if (!first.done && first.value) controller.enqueue(encoder.encode(first.value));
          for await (const chunk of iterator) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (error) {
          const message = error instanceof Error ? error.message : "The reply stopped early.";
          controller.enqueue(encoder.encode(`\n\n(The reply stopped early: ${message})`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "The assistant could not reply.";
    const status = error instanceof LlmError ? 502 : 500;
    return Response.json({ error: message }, { status });
  }
}
