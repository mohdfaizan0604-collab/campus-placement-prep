# Campus Placement Prep Assistant

A small website for Indian college students preparing for campus placements. It uses Google Gemini as a mentor for chat, mock interviews, aptitude questions, and resume feedback. Scores and chat history stay in the browser. There is no database.

## Features

- **Home.** A short introduction, feature cards, and a Start Preparing button.
- **Chat.** A streaming mentor with five modes (General, Technical, HR, Aptitude, Resume). Suggestion chips, markdown and code, the last 10 messages as memory, and a clear-chat button. Off-topic requests are refused by the system prompt.
- **Interview.** One question at a time for a chosen role, type, and difficulty. Each answer gets a score out of 10, strengths, and improvements.
- **Aptitude.** Original multiple-choice questions (quant, logical, verbal) returned as JSON. A choice is marked immediately, with an explanation. A finished set is saved.
- **Resume.** Paste resume text and receive an ATS-style score, strengths, weaknesses, and improved bullets. The prompt forbids invented metrics.
- **Companies.** Hiring outlines for TCS, Infosys, Wipro, Accenture, Cognizant, Capgemini, Amazon, Microsoft, and HCLTech. Ask AI opens chat with a prepared prompt.
- **Dashboard.** Quiz counts, averages, interview scores, and a simple bar chart, all from `localStorage`.
- **About.** What the project is, which AI tools it uses, and a table of prompt techniques.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- Google Gemini, called only from the server
- `react-markdown` for chat replies
- `localStorage` for history and progress

## Folder structure

```
app/
  layout.tsx              navbar, footer, theme boot
  page.tsx                home
  chat/page.tsx
  interview/page.tsx
  aptitude/page.tsx
  resume/page.tsx
  companies/page.tsx
  dashboard/page.tsx
  about/page.tsx
  api/chat/route.ts       streaming mentor
  api/interview/route.ts  question + score, JSON
  api/aptitude/route.ts   quiz JSON
  api/resume/route.ts     review JSON
components/               pages are thin; the interactive parts live here
lib/
  llm.ts                  the only file that calls Gemini
  prompts.ts              every system prompt, tagged by technique
  validators.ts           checks JSON before the UI uses it
  storage.ts              localStorage helpers
  companies.ts            static company cards
  types.ts                shared TypeScript types
docs/CODE_EXPLANATION.md  plain-language request flow
```

## Setup

1. Install Node.js 20 or newer.
2. In this folder, install dependencies:

```bash
npm install
```

3. Copy the env example and add your key:

```bash
copy .env.example .env.local
```

On macOS or Linux, use `cp .env.example .env.local`.

4. Start the app:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Name | Required | Where it is read | Purpose |
| --- | --- | --- | --- |
| `GEMINI_API_KEY` | Yes | `lib/llm.ts` on the server | Authenticates with Google AI Studio. |
| `GEMINI_MODEL` | No | `lib/llm.ts` | Overrides the default model, `gemini-3.8-flash`. |

Do not prefix these with `NEXT_PUBLIC_`. That would ship the key to the browser. `.env.local` is gitignored. `.env.example` is the template you commit.

## Chatbot request flow

1. `ChatPanel` sends `{ mode, messages }` to `POST /api/chat`. Only the last 10 messages are included.
2. The route picks a system prompt from `lib/prompts.ts`. The browser cannot set that prompt.
3. `lib/llm.ts` calls Gemini's streaming endpoint and yields text chunks.
4. The route forwards those chunks as a plain-text stream.
5. The panel appends each chunk to the assistant bubble and then saves the thread in `localStorage`.

A longer version, including the JSON retry used by quizzes and interviews, is in [docs/CODE_EXPLANATION.md](docs/CODE_EXPLANATION.md).

## Get a Gemini API key

1. Sign in at [Google AI Studio](https://aistudio.google.com/apikey).
2. Create an API key. The free tier is enough for this project. It has a daily quota, so a burst of quiz and interview calls can return a rate-limit error. Wait a minute and try again.
3. Paste the key into `.env.local` as `GEMINI_API_KEY`.
4. Restart `npm run dev` after changing env files. Next.js reads them only at startup.

## Test each feature

Do these with the dev server running and a real key in `.env.local`.

1. **Home.** Confirm the hero, six cards, and that Start Preparing opens `/chat`. Toggle Dark and Light in the navbar and refresh. The choice should stick.
2. **Chat.** Send "Explain OOP". Words should appear before the full reply is done. Switch to HR Interviewer and use the Mock HR interview chip. Ask "What is the weather in Paris?" and confirm a short refusal. Clear chat, refresh, and confirm the thread is gone. Open a company card's Ask AI link and confirm the box is prefilled.
3. **Interview.** Start as Software Engineer / Technical / Easy. Submit a short answer. You should see a score out of 10, strengths, improvements, and a new question.
4. **Aptitude.** Generate a quantitative set of 3. Click one option. It should lock, show right or wrong, and show the working. Finish every question, then open the dashboard and confirm the quiz is listed.
5. **Resume.** Load the sample and review it. You should see a score, strengths, weaknesses, and improved bullets. A paste shorter than 80 characters should be blocked.
6. **Companies.** Open TCS and use Ask AI. The chat box should contain a TCS prompt.
7. **Dashboard.** After the quiz and interview, the counts and the bar chart should be non-zero. Clear progress and confirm the numbers reset. Chat history is separate and is not deleted by that button.
8. **About.** The techniques table should list role prompting, few-shot, chain-of-thought, output-format constraints, and guardrails.

`npm run build` must pass before you deploy. It checks types and compiles every page. It does not call Gemini.

## Deploy on Vercel

1. Push this folder to a Git hosting provider (GitHub, GitLab, or Bitbucket). Do not commit `.env.local`.
2. In [Vercel](https://vercel.com/new), import that repository. Framework preset: Next.js. Root directory: the project folder. Leave the build command as `npm run build`.
3. In Project Settings, then Environment Variables, add `GEMINI_API_KEY` for Production (and Preview, if you want preview URLs to call Gemini). Add `GEMINI_MODEL` only if you do not want the default.
4. Deploy. Vercel runs `npm run build`, then serves the app. The route handlers run as serverless functions. `export const maxDuration = 60` in each route asks for up to 60 seconds, which matters because an interview score is one full model call.
5. Open the production URL and repeat the chat test. If the reply says the API key is missing, the variable was not set for that environment, or the deployment happened before you saved it. Redeploy after adding it.

Progress still lives in each visitor's browser after deployment. You do not configure a database.
