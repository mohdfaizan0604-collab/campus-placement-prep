/** Shared types used by the UI and the API routes. */

export const CHAT_MODES = ["general", "technical", "hr", "aptitude", "resume"] as const;

export type ChatMode = (typeof CHAT_MODES)[number];

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type QuizCategory = "quant" | "logical" | "verbal";

export type QuizQuestion = {
  question: string;
  options: [string, string, string, string];
  /** Index into `options`. 0 is A, 3 is D. */
  answerIndex: number;
  explanation: string;
};

export type QuizPayload = {
  category: QuizCategory;
  questions: QuizQuestion[];
};

export type InterviewQuestion = {
  question: string;
  topic: string;
};

export type InterviewEvaluation = {
  score: number;
  strengths: string[];
  improvements: string[];
  nextQuestion: string;
  nextTopic: string;
};

export type ResumeReview = {
  atsScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  improvedBullets: string[];
};

export type QuizRecord = {
  id: string;
  category: string;
  correct: number;
  total: number;
  percent: number;
  at: string;
};

export type InterviewRecord = {
  id: string;
  role: string;
  interviewType: string;
  difficulty: string;
  averageScore: number;
  answers: number;
  at: string;
};

export type ResumeRecord = {
  id: string;
  atsScore: number;
  at: string;
};

export type ProgressData = {
  quizzes: QuizRecord[];
  interviews: InterviewRecord[];
  resumes: ResumeRecord[];
  chatReplies: number;
};

export type StoredChat = {
  mode: ChatMode;
  messages: ChatMessage[];
};
