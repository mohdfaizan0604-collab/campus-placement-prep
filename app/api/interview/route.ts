import { generateJSON, LlmError } from "@/lib/llm";
import { INTERVIEW_EVAL_PROMPT, INTERVIEW_QUESTION_PROMPT } from "@/lib/prompts";
import { validateInterviewEvaluation, validateInterviewQuestion } from "@/lib/validators";

export const maxDuration = 60;

const ROLES = ["Software Engineer", "Data Analyst", "QA Engineer"];
const TYPES = ["Technical", "HR", "Mixed"];
const LEVELS = ["Easy", "Medium", "Hard"];

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function askedList(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean).slice(-8);
}

function fail(error: unknown) {
  const message = error instanceof Error ? error.message : "The interview request failed.";
  const status = error instanceof LlmError ? 502 : 500;
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const role = clip(body.role, 40);
  const interviewType = clip(body.interviewType, 20);
  const difficulty = clip(body.difficulty, 20);
  if (!ROLES.includes(role) || !TYPES.includes(interviewType) || !LEVELS.includes(difficulty)) {
    return Response.json({ error: "Choose a role, interview type, and difficulty." }, { status: 400 });
  }

  const asked = askedList(body.asked);
  const askedBlock = asked.length ? asked.map((item) => `- ${item}`).join("\n") : "- none";
  const setup = `Role: ${role}\nInterview type: ${interviewType}\nDifficulty: ${difficulty}\nAlready asked:\n${askedBlock}`;

  try {
    if (body.action === "question") {
      const question = await generateJSON({
        system: INTERVIEW_QUESTION_PROMPT,
        user: `${setup}\n\nAsk the first question.`,
        validate: validateInterviewQuestion,
      });
      return Response.json(question);
    }

    if (body.action === "evaluate") {
      const question = clip(body.question, 800);
      const answer = clip(body.answer, 5000);
      if (!question || answer.length < 2) {
        return Response.json({ error: "Add an answer before asking for a score." }, { status: 400 });
      }
      const evaluation = await generateJSON({
        system: INTERVIEW_EVAL_PROMPT,
        user: `${setup}\n\nQuestion: ${question}\nStudent answer: ${answer}\n\nScore this answer and ask a new next question.`,
        validate: validateInterviewEvaluation,
      });
      return Response.json(evaluation);
    }

    return Response.json({ error: "Unknown interview action." }, { status: 400 });
  } catch (error) {
    return fail(error);
  }
}
