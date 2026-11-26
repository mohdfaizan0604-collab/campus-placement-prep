# How a message travels through the app

This is the path for the chatbot, in the order things actually happen. The interview, quiz, and resume features use the same middle (the route and `lib/llm.ts`) but they ask for one JSON object instead of a stream.

## 1. The student types in the browser

`/chat` renders `components/ChatPanel.tsx`. That file is a client component, so it can use `useState` and `localStorage`.

When the student presses Send:

1. The new user message is appended to the list on screen.
2. An empty assistant bubble is added so the typing state has somewhere to go.
3. The browser `POST`s JSON to `/api/chat`.

The body has two fields:

- `mode`: which mentor is speaking (`general`, `technical`, `hr`, `aptitude`, or `resume`).
- `messages`: only the last 10 turns. Older turns stay on screen, but they are not sent again. That limit is the memory.

The system prompt is not in this body. The browser is not allowed to write it.

## 2. The route checks the body and picks a prompt

`app/api/chat/route.ts` runs on the server.

It rejects a bad mode, an empty list, or a latest message that is not from the student. Then it calls `getChatSystemPrompt(mode)` from `lib/prompts.ts`. Each prompt in that file starts with a comment naming the technique (role prompting, few-shot, chain-of-thought, output-format constraints, or guardrails). The shared guardrail tells the model to stay on placements, careers, interviews, and technical or aptitude prep, and to refuse anything else in two polite sentences.

## 3. One file talks to Gemini

`lib/llm.ts` is the only file that knows the provider.

`streamChat()`:

1. Reads `GEMINI_API_KEY` from the environment. If it is missing, it throws a message that tells you to fill in `.env.local`.
2. Turns our roles into Gemini roles (`assistant` becomes `model`).
3. `POST`s to Google's `streamGenerateContent` endpoint for `gemini-3.8-flash`, unless `GEMINI_MODEL` overrides that.
4. Reads the server-sent events and yields each text chunk.

To swap providers later, replace `requestGemini()` and keep `streamChat()` and `generateJSON()` as the functions the routes call.

## 4. The route forwards the stream

The route does not wait for the full answer. It opens a `ReadableStream`, writes each chunk as plain text, and returns that stream with `Content-Type: text/plain`. If Gemini fails before the first chunk, the route returns JSON with an `error` field and a 502 status instead.

## 5. The browser paints the reply

`ChatPanel` reads the stream with `response.body.getReader()`. Each chunk is appended to the assistant bubble, so the words show up as they arrive. Markdown and code are rendered by `components/MarkdownView.tsx` (`react-markdown`).

When the stream finishes, the full conversation is written to `localStorage` under the key `cpp-chat`, and the chat-reply counter in `cpp-progress` goes up by one. Clearing the chat deletes `cpp-chat` only.

## JSON features (quiz, interview, resume)

These routes call `generateJSON()` instead of `streamChat()`.

1. The prompt demands a JSON object and nothing else.
2. Gemini is asked for `responseMimeType: "application/json"`.
3. `parseModelJson()` still strips a markdown fence if the model adds one.
4. A validator in `lib/validators.ts` checks the shape (four options, a score from 0 to 10, and so on).
5. If the shape is wrong, `generateJSON()` calls the model one more time and includes the validation error. A second failure is shown in the page's error box.

The aptitude page marks an option in the browser as soon as it is clicked, using the `answerIndex` that came back with the questions. There is no database to hide the key on the server between requests. Interview scores and quiz results are written to `localStorage` by `lib/storage.ts`, and `/dashboard` reads that same object.

## What never leaves the server

`GEMINI_API_KEY` is read only inside `lib/llm.ts`. It is not prefixed with `NEXT_PUBLIC_`, so Next.js does not bundle it into the browser JavaScript.
