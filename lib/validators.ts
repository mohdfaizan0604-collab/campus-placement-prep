import type {
  InterviewEvaluation,
  InterviewQuestion,
  QuizCategory,
  QuizPayload,
  QuizQuestion,
  ResumeReview,
} from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, max = 2000): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value.trim().slice(0, max);
}

function stringList(value: unknown, field: string, min: number, maxItems: number): string[] {
  if (!Array.isArray(value)) throw new Error(`${field} must be an array of strings`);
  const items = value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
  if (items.length < min) throw new Error(`${field} needs at least ${min} item(s)`);
  return items;
}

function numberInRange(value: unknown, field: string, min: number, max: number): number {
  const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    throw new Error(`${field} must be a number from ${min} to ${max}`);
  }
  return Math.round(parsed * 10) / 10;
}

export function validateInterviewQuestion(value: unknown): InterviewQuestion {
  if (!isRecord(value)) throw new Error("Question response must be a JSON object");
  return {
    question: requiredString(value.question, "question", 800),
    topic: requiredString(value.topic, "topic", 80),
  };
}

export function validateInterviewEvaluation(value: unknown): InterviewEvaluation {
  if (!isRecord(value)) throw new Error("Evaluation response must be a JSON object");
  const score = numberInRange(value.score, "score", 0, 10);
  return {
    score,
    strengths: stringList(value.strengths, "strengths", 1, 3),
    improvements: stringList(value.improvements, "improvements", 1, 3),
    nextQuestion: requiredString(value.nextQuestion, "nextQuestion", 800),
    nextTopic: requiredString(value.nextTopic, "nextTopic", 80),
  };
}

function validateQuestion(value: unknown, index: number): QuizQuestion {
  if (!isRecord(value)) throw new Error(`Question ${index + 1} must be an object`);
  if (!Array.isArray(value.options) || value.options.length !== 4) {
    throw new Error(`Question ${index + 1} must have exactly 4 options`);
  }
  const options = value.options.map((option, optionIndex) =>
    requiredString(option, `Question ${index + 1} option ${optionIndex + 1}`, 300),
  ) as [string, string, string, string];
  const answerIndex = numberInRange(value.answerIndex, `Question ${index + 1} answerIndex`, 0, 3);
  if (!Number.isInteger(answerIndex)) {
    throw new Error(`Question ${index + 1} answerIndex must be an integer`);
  }
  return {
    question: requiredString(value.question, `Question ${index + 1}`, 500),
    options,
    answerIndex,
    explanation: requiredString(value.explanation, `Question ${index + 1} explanation`, 800),
  };
}

export function validateQuiz(value: unknown, category: QuizCategory, count: number): QuizPayload {
  if (!isRecord(value) || !Array.isArray(value.questions)) {
    throw new Error("Quiz response must be an object with a questions array");
  }
  if (value.questions.length < count) {
    throw new Error(`Expected ${count} questions but received ${value.questions.length}`);
  }
  return {
    category,
    questions: value.questions.slice(0, count).map((question, index) => validateQuestion(question, index)),
  };
}

export function validateResumeReview(value: unknown): ResumeReview {
  if (!isRecord(value)) throw new Error("Resume review must be a JSON object");
  return {
    atsScore: Math.round(numberInRange(value.atsScore, "atsScore", 0, 100)),
    summary: requiredString(value.summary, "summary", 600),
    strengths: stringList(value.strengths, "strengths", 2, 4),
    weaknesses: stringList(value.weaknesses, "weaknesses", 2, 4),
    improvedBullets: stringList(value.improvedBullets, "improvedBullets", 3, 6),
  };
}
