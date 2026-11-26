import { generateJSON, LlmError } from "@/lib/llm";
import { QUIZ_SYSTEM_PROMPT } from "@/lib/prompts";
import type { QuizCategory } from "@/lib/types";
import { validateQuiz } from "@/lib/validators";

export const maxDuration = 60;

const CATEGORIES: Record<QuizCategory, string> = {
  quant: "Quantitative aptitude: percentages, ratios, time and work, speed, profit and loss, averages.",
  logical: "Logical reasoning: sequences, syllogisms, seating arrangements, coding-decoding, blood relations.",
  verbal: "Verbal ability: grammar, sentence correction, vocabulary in context, short reading inference.",
};

export async function POST(request: Request) {
  let body: { category?: unknown; count?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const category = body.category;
  if (category !== "quant" && category !== "logical" && category !== "verbal") {
    return Response.json({ error: "Choose quant, logical, or verbal." }, { status: 400 });
  }

  const count = body.count === 3 ? 3 : 5;

  try {
    const quiz = await generateJSON({
      system: QUIZ_SYSTEM_PROMPT,
      user: `Category: ${CATEGORIES[category]}\nWrite exactly ${count} original questions as JSON.`,
      validate: (value) => validateQuiz(value, category, count),
    });
    return Response.json(quiz);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The quiz could not be created.";
    const status = error instanceof LlmError ? 502 : 500;
    return Response.json({ error: message }, { status });
  }
}
