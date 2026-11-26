/**
 * Browser-only progress and chat history.
 * There is no database. Each helper no-ops if localStorage is missing.
 */

import type { ChatMode, InterviewRecord, ProgressData, QuizRecord, ResumeRecord, StoredChat } from "./types";
import { CHAT_MODES } from "./types";

export const THEME_KEY = "cpp-theme";
const PROGRESS_KEY = "cpp-progress";
const CHAT_KEY = "cpp-chat";

export const emptyProgress = (): ProgressData => ({
  quizzes: [],
  interviews: [],
  resumes: [],
  chatReplies: 0,
});

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadProgress(): ProgressData {
  const saved = readJSON<Partial<ProgressData>>(PROGRESS_KEY);
  return {
    quizzes: Array.isArray(saved?.quizzes) ? saved.quizzes : [],
    interviews: Array.isArray(saved?.interviews) ? saved.interviews : [],
    resumes: Array.isArray(saved?.resumes) ? saved.resumes : [],
    chatReplies: typeof saved?.chatReplies === "number" ? saved.chatReplies : 0,
  };
}

function saveProgress(progress: ProgressData) {
  writeJSON(PROGRESS_KEY, {
    ...progress,
    quizzes: progress.quizzes.slice(0, 50),
    interviews: progress.interviews.slice(0, 50),
    resumes: progress.resumes.slice(0, 50),
  });
}

export function recordQuiz(record: QuizRecord) {
  const progress = loadProgress();
  progress.quizzes.unshift(record);
  saveProgress(progress);
}

export function upsertInterview(record: InterviewRecord) {
  const progress = loadProgress();
  const index = progress.interviews.findIndex((item) => item.id === record.id);
  if (index === -1) progress.interviews.unshift(record);
  else progress.interviews[index] = record;
  saveProgress(progress);
}

export function recordResume(record: ResumeRecord) {
  const progress = loadProgress();
  progress.resumes.unshift(record);
  saveProgress(progress);
}

export function bumpChatReplies() {
  const progress = loadProgress();
  progress.chatReplies += 1;
  saveProgress(progress);
}

export function clearProgress() {
  saveProgress(emptyProgress());
}

export function loadChat(): StoredChat | null {
  const saved = readJSON<StoredChat>(CHAT_KEY);
  if (!saved || !Array.isArray(saved.messages)) return null;
  const mode = CHAT_MODES.includes(saved.mode) ? saved.mode : "general";
  const messages = saved.messages.filter(
    (message) =>
      message &&
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      message.content.trim().length > 0,
  );
  return { mode: mode as ChatMode, messages: messages.slice(-40) };
}

export function saveChat(chat: StoredChat) {
  writeJSON(CHAT_KEY, {
    mode: chat.mode,
    messages: chat.messages.slice(-40),
  });
}

export function clearChat() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CHAT_KEY);
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
