import Link from "next/link";
import { PageShell, primaryButtonClass, secondaryButtonClass } from "@/components/PageShell";

const FEATURES = [
  {
    href: "/chat",
    title: "AI mentor",
    text: "A streaming chat with modes for technical, HR, aptitude, and resume questions.",
  },
  {
    href: "/interview",
    title: "Mock interview",
    text: "One question at a time, then a score out of 10 with strengths and improvements.",
  },
  {
    href: "/aptitude",
    title: "Aptitude sets",
    text: "Fresh multiple-choice questions in quant, logical, and verbal, with explanations.",
  },
  {
    href: "/resume",
    title: "Resume review",
    text: "Paste your resume text and get an ATS-style score plus stronger bullets.",
  },
  {
    href: "/companies",
    title: "Company guides",
    text: "Hiring steps for TCS, Infosys, Wipro, Amazon, and other campus recruiters.",
  },
  {
    href: "/dashboard",
    title: "Your progress",
    text: "Quiz scores and interview averages saved in this browser.",
  },
];

export default function HomePage() {
  return (
    <PageShell wide>
      <section className="rounded-3xl border border-slate-200 bg-white px-6 py-10 sm:px-10 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">
          For Indian campus drives
        </p>
        <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Campus Placement Prep Assistant
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Practice the conversations, tests, and resume lines that show up in campus placements. The mentor runs on Gemini. Your history stays on this device.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/chat" className={primaryButtonClass}>
            Start Preparing
          </Link>
          <Link href="/dashboard" className={secondaryButtonClass}>
            View progress
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Features">
        {FEATURES.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-400 dark:border-slate-800 dark:bg-slate-900"
          >
            <h2 className="text-lg font-semibold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
