"use client";

import { useState } from "react";
import { postJSON } from "@/lib/client-api";
import { newId, recordResume } from "@/lib/storage";
import type { ResumeReview } from "@/lib/types";
import { ErrorNote, fieldClass, labelClass, primaryButtonClass } from "./PageShell";

const SAMPLE = `Priya Sharma
B.Tech CSE, 2026, ABC College of Engineering, CGPA 8.1
Skills: Java, SQL, HTML, CSS, Git
Project: Library Management System
Built a website for issuing books using Java and MySQL.
Internship: Helped the college coding club with event registration.
Education: Class 12, 89%`;

export function ResumePanel() {
  const [resume, setResume] = useState("");
  const [review, setReview] = useState<ResumeReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    setLoading(true);
    setReview(null);
    try {
      const result = await postJSON<ResumeReview>("/api/resume", { resume });
      setReview(result);
      recordResume({
        id: newId("resume"),
        atsScore: result.atsScore,
        at: new Date().toISOString(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The review failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <label htmlFor="resume" className={labelClass}>
          Resume text
        </label>
        <textarea
          id="resume"
          className={`${fieldClass} min-h-64 font-mono`}
          value={resume}
          maxLength={12000}
          placeholder="Paste the text of your resume. PDF layout is not read, only the words."
          onChange={(event) => setResume(event.target.value)}
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className="text-left text-sm font-medium text-indigo-700 underline dark:text-indigo-300" onClick={() => setResume(SAMPLE)}>
            Load a sample to try the reviewer
          </button>
          <button type="submit" className={primaryButtonClass} disabled={loading || resume.trim().length < 80}>
            {loading ? "Reviewing…" : "Review resume"}
          </button>
        </div>
        <p className="text-xs text-slate-500">{resume.trim().length} characters. At least 80 are required.</p>
      </form>

      <ErrorNote message={error} />

      {review ? (
        <section className="grid gap-4" aria-live="polite">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">ATS-style score</p>
            <p className="mt-1 text-4xl font-semibold">{review.atsScore}<span className="text-lg text-slate-500"> / 100</span></p>
            <p className="mt-3 text-sm leading-6">{review.summary}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold">Strengths</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {review.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="font-semibold">Weaknesses</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {review.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="font-semibold">Improved bullets</h2>
            <ul className="mt-3 grid gap-2">
              {review.improvedBullets.map((item) => (
                <li key={item} className="rounded-xl bg-slate-50 px-3 py-2 text-sm dark:bg-slate-950">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>
      ) : null}
    </div>
  );
}
