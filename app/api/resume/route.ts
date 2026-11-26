import { generateJSON, LlmError } from "@/lib/llm";
import { RESUME_SYSTEM_PROMPT } from "@/lib/prompts";
import { validateResumeReview } from "@/lib/validators";

export const maxDuration = 60;

export async function POST(request: Request) {
  let body: { resume?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body." }, { status: 400 });
  }

  const resume = typeof body.resume === "string" ? body.resume.trim().slice(0, 12000) : "";
  if (resume.length < 80) {
    return Response.json(
      { error: "Paste at least a short resume (80 characters or more) so the review has something to score." },
      { status: 400 },
    );
  }

  try {
    const review = await generateJSON({
      system: RESUME_SYSTEM_PROMPT,
      user: `Review this resume text:\n\n${resume}`,
      validate: validateResumeReview,
    });
    return Response.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : "The resume review failed.";
    const status = error instanceof LlmError ? 502 : 500;
    return Response.json({ error: message }, { status });
  }
}
