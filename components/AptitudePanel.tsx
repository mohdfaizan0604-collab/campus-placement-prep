"use client";

import { useState } from "react";
import { postJSON } from "@/lib/client-api";
import { newId, recordQuiz } from "@/lib/storage";
import type { QuizCategory, QuizPayload } from "@/lib/types";
import { ErrorNote, fieldClass, labelClass, primaryButtonClass } from "./PageShell";

const CATEGORIES: { id: QuizCategory; label: string }[] = [
  { id: "quant", label: "Quantitative" },
  { id: "logical", label: "Logical" },
  { id: "verbal", label: "Verbal" },
];

type Attempt = {
  quiz: QuizPayload;
  picks: Array<number | null>;
  saved: boolean;
};

export function AptitudePanel() {
  const [category, setCategory] = useState<QuizCategory>("quant");
  const [count, setCount] = useState<3 | 5>(5);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const answered = attempt?.picks.filter((pick) => pick !== null).length ?? 0;
  const correct =
    attempt?.quiz.questions.filter((question, index) => attempt.picks[index] === question.answerIndex).length ?? 0;

  async function generate() {
    setError(null);
    setLoading(true);
    setAttempt(null);
    try {
      const quiz = await postJSON<QuizPayload>("/api/aptitude", { category, count });
      setAttempt({
        quiz,
        picks: quiz.questions.map(() => null),
        saved: false,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a quiz.");
    } finally {
      setLoading(false);
    }
  }

  function choose(questionIndex: number, optionIndex: number) {
    if (!attempt || attempt.picks[questionIndex] !== null) return;
    const picks = attempt.picks.map((pick, index) => (index === questionIndex ? optionIndex : pick));
    const next = { ...attempt, picks };
    const finished = picks.every((pick) => pick !== null);
    if (finished && !attempt.saved) {
      const score = next.quiz.questions.filter((question, index) => picks[index] === question.answerIndex).length;
      recordQuiz({
        id: newId("quiz"),
        category: next.quiz.category,
        correct: score,
        total: next.quiz.questions.length,
        percent: Math.round((score / next.quiz.questions.length) * 100),
        at: new Date().toISOString(),
      });
      next.saved = true;
    }
    setAttempt(next);
  }

  return (
    <div className="grid gap-6">
      <form
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900"
        onSubmit={(event) => {
          event.preventDefault();
          void generate();
        }}
      >
        <div>
          <label htmlFor="category" className={labelClass}>
            Topic
          </label>
          <select
            id="category"
            className={fieldClass}
            value={category}
            onChange={(event) => setCategory(event.target.value as QuizCategory)}
          >
            {CATEGORIES.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="count" className={labelClass}>
            Questions
          </label>
          <select
            id="count"
            className={fieldClass}
            value={count}
            onChange={(event) => setCount(event.target.value === "3" ? 3 : 5)}
          >
            <option value={5}>5</option>
            <option value={3}>3</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <button type="submit" className={primaryButtonClass} disabled={loading}>
            {loading ? "Writing questions…" : "Generate quiz"}
          </button>
        </div>
      </form>

      <ErrorNote message={error} />

      {attempt ? (
        <div className="grid gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300" aria-live="polite">
            Score {correct} / {attempt.quiz.questions.length}
            {answered < attempt.quiz.questions.length ? ` · ${answered} answered` : " · saved to your dashboard"}
          </p>
          {attempt.quiz.questions.map((question, questionIndex) => {
            const pick = attempt.picks[questionIndex];
            const locked = pick !== null;
            return (
              <fieldset
                key={question.question}
                className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
              >
                <legend className="px-1 text-base font-semibold">
                  {questionIndex + 1}. {question.question}
                </legend>
                <div className="mt-3 grid gap-2">
                  {question.options.map((option, optionIndex) => {
                    const selected = pick === optionIndex;
                    const isAnswer = optionIndex === question.answerIndex;
                    let tone = "border-slate-300 dark:border-slate-700";
                    if (locked && isAnswer) tone = "border-emerald-600 bg-emerald-50 dark:bg-emerald-950";
                    else if (locked && selected) tone = "border-red-500 bg-red-50 dark:bg-red-950";
                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={locked}
                        aria-pressed={selected}
                        className={`rounded-xl border px-3 py-2 text-left text-sm disabled:cursor-default ${tone}`}
                        onClick={() => choose(questionIndex, optionIndex)}
                      >
                        <span className="mr-2 font-semibold">{String.fromCharCode(65 + optionIndex)}.</span>
                        {option}
                      </button>
                    );
                  })}
                </div>
                {locked ? (
                  <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">
                    {pick === question.answerIndex ? "Correct. " : "Not quite. "}
                    {question.explanation}
                  </p>
                ) : null}
              </fieldset>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
