"use client";

import { useEffect, useState } from "react";
import { ScoreChart } from "@/components/ScoreChart";
import { clearProgress, emptyProgress, loadProgress } from "@/lib/storage";
import type { ProgressData } from "@/lib/types";
import { secondaryButtonClass } from "./PageShell";

function mean(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function DashboardPanel() {
  const [progress, setProgress] = useState<ProgressData | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  if (!progress) {
    return <p className="text-sm text-slate-600 dark:text-slate-300">Loading progress saved in this browser…</p>;
  }

  const quizAverage = mean(progress.quizzes.map((quiz) => quiz.percent));
  const interviewAverage = mean(progress.interviews.map((item) => item.averageScore * 10)) / 10;
  const points = [
    ...progress.quizzes.map((quiz) => ({
      label: quiz.category.slice(0, 3),
      value: quiz.percent,
      at: quiz.at,
    })),
    ...progress.interviews.map((item) => ({
      label: "Int",
      value: item.averageScore * 10,
      at: item.at,
    })),
    ...progress.resumes.map((item) => ({
      label: "CV",
      value: item.atsScore,
      at: item.at,
    })),
  ]
    .sort((a, b) => a.at.localeCompare(b.at))
    .slice(-8)
    .map(({ label, value }) => ({ label, value }));

  const cards = [
    { label: "Quizzes", value: String(progress.quizzes.length) },
    { label: "Quiz average", value: progress.quizzes.length ? `${quizAverage}%` : "—" },
    { label: "Interviews", value: String(progress.interviews.length) },
    {
      label: "Interview average",
      value: progress.interviews.length ? `${interviewAverage.toFixed(1)} / 10` : "—",
    },
    { label: "Resume reviews", value: String(progress.resumes.length) },
    { label: "Chat replies", value: String(progress.chatReplies) },
  ];

  return (
    <div className="grid gap-6">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Summary">
        {cards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm text-slate-600 dark:text-slate-300">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-semibold">Recent scores</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Quiz percentages, interview averages scaled to 100, and resume scores. The last eight are shown.
        </p>
        <div className="mt-4">
          <ScoreChart points={points} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Recent quizzes</h2>
        {progress.quizzes.length === 0 ? (
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">No quiz yet. Finish an aptitude set to record one.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {progress.quizzes.slice(0, 8).map((quiz) => (
              <li key={quiz.id} className="rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
                {quiz.category}: {quiz.correct}/{quiz.total} ({quiz.percent}%) · {new Date(quiz.at).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        className={secondaryButtonClass}
        onClick={() => {
          if (!window.confirm("Clear quiz, interview, resume, and chat-count progress on this browser?")) return;
          clearProgress();
          setProgress(emptyProgress());
        }}
      >
        Clear progress
      </button>
    </div>
  );
}
