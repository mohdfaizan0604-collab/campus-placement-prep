import { PageHeader, PageShell } from "@/components/PageShell";
import { PROMPT_TECHNIQUES } from "@/lib/prompts";

const TOOLS = [
  {
    name: "Google Gemini",
    detail: "The language model. The server calls gemini-3.8-flash (or GEMINI_MODEL) with the free-tier API key. The browser never sees the key.",
  },
  {
    name: "Next.js route handlers",
    detail: "Four routes shape the request: /api/chat streams text. /api/interview, /api/aptitude, and /api/resume ask for JSON.",
  },
  {
    name: "lib/prompts.ts",
    detail: "Every system prompt lives here, with a comment naming the technique. Swapping a prompt does not require a UI change.",
  },
  {
    name: "localStorage",
    detail: "Chat history and scores stay on the device. There is no database and no user account.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Course project"
        title="About"
        description="Campus Placement Prep Assistant is a prompt-engineering project for Indian college students preparing for campus placements."
      />

      <section className="grid gap-4 text-sm leading-7">
        <h2 className="text-xl font-semibold">What the project does</h2>
        <p>
          A student can talk to a mentor, sit a one-question-at-a-time mock interview, take a generated aptitude quiz, paste a resume for an ATS-style review, and read a short hiring outline for common campus recruiters. Progress is a chart of scores saved in the browser.
        </p>
        <p>
          The interesting part for this course is not a custom model. It is how the prompts are written: a role, an example, a hidden checklist before a score, a strict JSON shape, and rules that keep the bot on placement prep.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">AI tools used</h2>
        <ul className="mt-3 grid gap-3">
          {TOOLS.map((tool) => (
            <li key={tool.name} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold">{tool.name}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{tool.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Prompt techniques used</h2>
        <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">Prompt techniques, where they are used, and why</caption>
            <thead className="bg-slate-100 dark:bg-slate-900">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">Technique</th>
                <th scope="col" className="px-3 py-2 font-semibold">Where</th>
                <th scope="col" className="px-3 py-2 font-semibold">Why it is here</th>
              </tr>
            </thead>
            <tbody>
              {PROMPT_TECHNIQUES.map((row) => (
                <tr key={row.technique} className="border-t border-slate-200 dark:border-slate-800">
                  <th scope="row" className="px-3 py-3 align-top font-medium">{row.technique}</th>
                  <td className="px-3 py-3 align-top">{row.where}</td>
                  <td className="px-3 py-3 align-top">{row.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}
