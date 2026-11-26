"use client";

import { useState } from "react";
import { postJSON } from "@/lib/client-api";
import { newId, upsertInterview } from "@/lib/storage";
import type { InterviewEvaluation, InterviewQuestion } from "@/lib/types";
import { ErrorNote, fieldClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./PageShell";

const ROLES = ["Software Engineer", "Data Analyst", "QA Engineer"] as const;
const TYPES = ["Technical", "HR", "Mixed"] as const;
const LEVELS = ["Easy", "Medium", "Hard"] as const;

type Turn = {
  question: string;
  topic: string;
  answer: string;
  score: number;
  strengths: string[];
  improvements: string[];
};

function average(turns: Turn[]) {
  if (turns.length === 0) return 0;
  const total = turns.reduce((sum, turn) => sum + turn.score, 0);
  return Math.round((total / turns.length) * 10) / 10;
}

export function InterviewPanel() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("Software Engineer");
  const [interviewType, setInterviewType] = useState<(typeof TYPES)[number]>("Technical");
  const [difficulty, setDifficulty] = useState<(typeof LEVELS)[number]>("Easy");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<InterviewQuestion | null>(null);
  const [answer, setAnswer] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const latest = turns[turns.length - 1];

  function saveProgress(nextTurns: Turn[], id: string) {
    upsertInterview({
      id,
      role,
      interviewType,
      difficulty,
      averageScore: average(nextTurns),
      answers: nextTurns.length,
      at: new Date().toISOString(),
    });
  }

  async function start() {
    setError(null);
    setLoading(true);
    setTurns([]);
    setAnswer("");
    setQuestion(null);
    try {
      const first = await postJSON<InterviewQuestion>("/api/interview", {
        action: "question",
        role,
        interviewType,
        difficulty,
        asked: [],
      });
      setSessionId(newId("interview"));
      setQuestion(first);
    } catch (err) {
      setSessionId(null);
      setError(err instanceof Error ? err.message : "Could not start the interview.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!question || !sessionId || answer.trim().length < 2) return;
    setError(null);
    setLoading(true);
    const asked = [...turns.map((turn) => turn.question), question.question];
    try {
      const evaluation = await postJSON<InterviewEvaluation>("/api/interview", {
        action: "evaluate",
        role,
        interviewType,
        difficulty,
        question: question.question,
        answer: answer.trim(),
        asked,
      });
      const nextTurns: Turn[] = [
        ...turns,
        {
          question: question.question,
          topic: question.topic,
          answer: answer.trim(),
          score: evaluation.score,
          strengths: evaluation.strengths,
          improvements: evaluation.improvements,
        },
      ];
      setTurns(nextTurns);
      saveProgress(nextTurns, sessionId);
      setQuestion({ question: evaluation.nextQuestion, topic: evaluation.nextTopic });
      setAnswer("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not score that answer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-3 dark:border-slate-800 dark:bg-slate-900"
        onSubmit={(event) => {
          event.preventDefault();
          void start();
        }}
      >
        <div>
          <label htmlFor="role" className={labelClass}>
            Role
          </label>
          <select id="role" className={fieldClass} value={role} onChange={(event) => setRole(event.target.value as (typeof ROLES)[number])}>
            {ROLES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type" className={labelClass}>
            Type
          </label>
          <select
            id="type"
            className={fieldClass}
            value={interviewType}
            onChange={(event) => setInterviewType(event.target.value as (typeof TYPES)[number])}
          >
            {TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="difficulty" className={labelClass}>
            Difficulty
          </label>
          <select
            id="difficulty"
            className={fieldClass}
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value as (typeof LEVELS)[number])}
          >
            {LEVELS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-3">
          <button type="submit" className={primaryButtonClass} disabled={loading}>
            {loading && !question ? "Getting the first question…" : question ? "Start a new interview" : "Start interview"}
          </button>
        </div>
      </form>

      <ErrorNote message={error} />

      {question ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" aria-live="polite">
          <p className="text-xs font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300">{question.topic}</p>
          <h2 className="mt-2 text-xl font-semibold">{question.question}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Answer as you would out loud. The score is saved in this browser.
            {turns.length > 0 ? ` Session average: ${average(turns)} / 10 from ${turns.length} answer${turns.length === 1 ? "" : "s"}.` : ""}
          </p>
          <label htmlFor="answer" className={`${labelClass} mt-4`}>
            Your answer
          </label>
          <textarea
            id="answer"
            className={`${fieldClass} min-h-32`}
            value={answer}
            maxLength={5000}
            disabled={loading}
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button
            type="button"
            className={`${primaryButtonClass} mt-3`}
            disabled={loading || answer.trim().length < 2}
            onClick={() => void submitAnswer()}
          >
            {loading ? "Scoring…" : "Submit answer"}
          </button>
        </section>
      ) : null}

      {latest ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900" aria-label="Latest feedback">
          <h2 className="text-lg font-semibold">Last answer: {latest.score} / 10</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{latest.topic}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold">Strengths</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {latest.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Improvements</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {latest.improvements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {turns.length > 1 ? (
        <section>
          <h2 className="text-lg font-semibold">Earlier questions</h2>
          <ol className="mt-3 grid gap-3">
            {turns.slice(0, -1).map((turn, index) => (
              <li key={`${turn.question}-${index}`} className="rounded-xl border border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                <p className="font-medium">{turn.question}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">Score {turn.score} / 10</p>
              </li>
            ))}
          </ol>
          <button type="button" className={`${secondaryButtonClass} mt-4`} onClick={() => void start()} disabled={loading}>
            End and start over
          </button>
        </section>
      ) : null}
    </div>
  );
}
