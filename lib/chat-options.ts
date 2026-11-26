import type { ChatMode } from "./types";

/** Labels for the chat mode selector. Prompt text itself lives in lib/prompts.ts. */
export const CHAT_MODE_OPTIONS: { id: ChatMode; label: string; blurb: string }[] = [
  {
    id: "general",
    label: "General Mentor",
    blurb: "Study plans, company choice, and what to revise next.",
  },
  {
    id: "technical",
    label: "Technical Interviewer",
    blurb: "DSA, OOP, DBMS, OS, and project questions.",
  },
  {
    id: "hr",
    label: "HR Interviewer",
    blurb: "Tell me about yourself, strengths, and “why this company?”.",
  },
  {
    id: "aptitude",
    label: "Aptitude Coach",
    blurb: "Quant, logical, and verbal practice with worked solutions.",
  },
  {
    id: "resume",
    label: "Resume Reviewer",
    blurb: "Bullet points, projects, and ATS-friendly wording.",
  },
];

/** Short chip label, plus the fuller prompt that is actually sent. */
export const CHAT_SUGGESTIONS: { label: string; prompt: string }[] = [
  {
    label: "Explain OOP",
    prompt: "Explain OOP with examples I can use in a technical interview.",
  },
  {
    label: "Aptitude question",
    prompt: "Give me one aptitude question on percentages, then walk through the solution.",
  },
  {
    label: "Mock HR interview",
    prompt: "Start a short mock HR interview. Ask one question and wait for my answer.",
  },
  {
    label: "TCS vs Infosys vs Wipro",
    prompt: "Compare the campus hiring process of TCS, Infosys, and Wipro.",
  },
];
