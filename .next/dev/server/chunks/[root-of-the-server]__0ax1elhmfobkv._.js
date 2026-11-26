module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/resume/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/llm.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prompts.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/validators.ts [app-route] (ecmascript)");
;
;
;
const maxDuration = 60;
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return Response.json({
            error: "Send a JSON body."
        }, {
            status: 400
        });
    }
    const resume = typeof body.resume === "string" ? body.resume.trim().slice(0, 12000) : "";
    if (resume.length < 80) {
        return Response.json({
            error: "Paste at least a short resume (80 characters or more) so the review has something to score."
        }, {
            status: 400
        });
    }
    try {
        const review = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateJSON"])({
            system: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["RESUME_SYSTEM_PROMPT"],
            user: `Review this resume text:\n\n${resume}`,
            validate: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$validators$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateResumeReview"]
        });
        return Response.json(review);
    } catch (error) {
        const message = error instanceof Error ? error.message : "The resume review failed.";
        const status = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$llm$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LlmError"] ? 502 : 500;
        return Response.json({
            error: message
        }, {
            status
        });
    }
}
}),
"[project]/lib/llm.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LlmError",
    ()=>LlmError,
    "generateJSON",
    ()=>generateJSON,
    "parseModelJson",
    ()=>parseModelJson,
    "streamChat",
    ()=>streamChat
]);
;
/**
 * The only file that calls a language model.
 *
 * The UI and the route handlers ask for text, a stream, or JSON.
 * They do not know the provider. To switch away from Gemini, replace
 * requestGemini() and keep streamChat() / generateJSON() the same.
 */ const DEFAULT_MODEL = "gemini-3.8-flash";
const API_ROOT = "https://generativelanguage.googleapis.com/v1beta/models";
class LlmError extends Error {
    constructor(message){
        super(message);
        this.name = "LlmError";
    }
}
function getConfig() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new LlmError("GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the dev server.");
    }
    return {
        apiKey,
        model: process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL
    };
}
/** Gemini uses "model" where this app uses "assistant", and it rejects two user turns in a row. */ function toContents(messages) {
    const contents = [];
    for (const message of messages){
        const text = message.content.trim();
        if (!text) continue;
        const role = message.role === "assistant" ? "model" : "user";
        const previous = contents[contents.length - 1];
        if (previous && previous.role === role) {
            previous.parts[0].text += `\n\n${text}`;
        } else {
            contents.push({
                role,
                parts: [
                    {
                        text
                    }
                ]
            });
        }
    }
    if (contents[0]?.role === "model") contents.shift();
    if (contents.length === 0) throw new LlmError("There is no user message to send.");
    return contents;
}
function readText(payload) {
    if (payload.error?.message) throw new LlmError(payload.error.message);
    if (payload.promptFeedback?.blockReason) {
        throw new LlmError("The model declined this request. Try rephrasing it around interview preparation.");
    }
    const parts = payload.candidates?.[0]?.content?.parts ?? [];
    const text = parts.filter((part)=>part.text && !part.thought).map((part)=>part.text).join("");
    return text;
}
function friendlyStatus(status, body) {
    if (status === 429) {
        return "Gemini rate limit reached. Wait a minute and try again. The free tier has a small daily quota.";
    }
    if (status === 400 || status === 404) {
        return `Gemini rejected the request (${status}). Check GEMINI_MODEL in .env.local. Details: ${body.slice(0, 280)}`;
    }
    if (status === 401 || status === 403) {
        return "Gemini refused the API key. Create a new key in Google AI Studio and update .env.local.";
    }
    return `Gemini request failed (${status}). ${body.slice(0, 280)}`;
}
async function requestGemini(input, stream) {
    const { apiKey, model } = getConfig();
    const method = stream ? "streamGenerateContent" : "generateContent";
    const url = new URL(`${API_ROOT}/${model}:${method}`);
    url.searchParams.set("key", apiKey);
    if (stream) url.searchParams.set("alt", "sse");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            systemInstruction: {
                parts: [
                    {
                        text: input.system
                    }
                ]
            },
            contents: toContents(input.messages),
            generationConfig: {
                temperature: input.temperature,
                maxOutputTokens: input.maxOutputTokens,
                // Low thinking keeps free-tier replies fast and leaves room for the actual answer.
                thinkingConfig: {
                    thinkingLevel: "LOW",
                    includeThoughts: false
                },
                ...input.json ? {
                    responseMimeType: "application/json"
                } : {}
            }
        })
    });
    if (!response.ok) {
        const body = await response.text();
        throw new LlmError(friendlyStatus(response.status, body));
    }
    return response;
}
function parseModelJson(raw) {
    const trimmed = raw.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const body = (fenced ? fenced[1] : trimmed).trim();
    const start = body.search(/[\[{]/);
    if (start === -1) throw new LlmError("The model did not return JSON.");
    const slice = body.slice(start);
    try {
        return JSON.parse(slice);
    } catch  {
        const end = Math.max(slice.lastIndexOf("}"), slice.lastIndexOf("]"));
        if (end !== -1) {
            try {
                return JSON.parse(slice.slice(0, end + 1));
            } catch  {
            // Fall through to the single error generateJSON knows how to retry.
            }
        }
        throw new LlmError("The model returned invalid JSON.");
    }
}
async function* streamChat(options) {
    const response = await requestGemini({
        system: options.system,
        messages: options.messages,
        temperature: 0.7,
        json: false,
        maxOutputTokens: 2048
    }, true);
    if (!response.body) throw new LlmError("Gemini returned an empty stream.");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let emitted = false;
    const emitPayload = function*(payload) {
        const text = readText(payload);
        if (text) {
            emitted = true;
            yield text;
        }
    };
    while(true){
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, {
            stream: true
        });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines){
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            yield* emitPayload(JSON.parse(data));
        }
    }
    if (!emitted) throw new LlmError("The model returned an empty reply. Please try again.");
}
async function generateText(options) {
    const response = await requestGemini({
        system: options.system,
        messages: [
            {
                role: "user",
                content: options.user
            }
        ],
        temperature: options.json ? 0.3 : 0.7,
        json: options.json,
        maxOutputTokens: 8192
    }, false);
    const payload = await response.json();
    const text = readText(payload).trim();
    if (!text) throw new LlmError("The model returned an empty reply. Please try again.");
    return text;
}
async function generateJSON(options) {
    let lastError = "The response did not match the expected JSON.";
    for(let attempt = 0; attempt < 2; attempt += 1){
        const user = attempt === 0 ? options.user : `${options.user}\n\nYour previous reply was rejected: ${lastError}\nReturn only corrected JSON. No markdown.`;
        try {
            const text = await generateText({
                system: options.system,
                user,
                json: true
            });
            return options.validate(parseModelJson(text));
        } catch (error) {
            const message = error instanceof Error ? error.message : lastError;
            const canRetry = /JSON|must be|needs at least|Expected|non-empty|array of strings/.test(message);
            if (!canRetry) throw error;
            lastError = message;
        }
    }
    throw new LlmError(`The model returned unusable JSON twice. ${lastError}`);
}
}),
"[project]/lib/prompts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "INTERVIEW_EVAL_PROMPT",
    ()=>INTERVIEW_EVAL_PROMPT,
    "INTERVIEW_QUESTION_PROMPT",
    ()=>INTERVIEW_QUESTION_PROMPT,
    "PROMPT_TECHNIQUES",
    ()=>PROMPT_TECHNIQUES,
    "QUIZ_SYSTEM_PROMPT",
    ()=>QUIZ_SYSTEM_PROMPT,
    "RESUME_SYSTEM_PROMPT",
    ()=>RESUME_SYSTEM_PROMPT,
    "getChatSystemPrompt",
    ()=>getChatSystemPrompt
]);
;
/**
 * Every system prompt for this app lives in this file.
 * Each block is tagged with the prompt-engineering technique it demonstrates.
 * Routes pick a prompt and pass it to lib/llm.ts. The browser cannot overwrite it.
 */ const GUARDRAILS = `
GUARDRAILS (technique: guardrails):
- Only help with campus placements, careers, interviews, aptitude, resumes, and technical subjects that show up in those interviews (programming, DSA, OOP, DBMS, OS, networks, SQL, and student projects).
- If a request is unrelated, refuse politely in two sentences and invite a placement-related question. Do not answer the off-topic part.
- Never provide leaked papers, impersonation tricks, or ways to cheat a proctored test.
- Do not invent cutoffs, package numbers, or a promise that the student will be selected. Say when a hiring step varies by college and year.
- Speak in plain English. Short paragraphs. Use Indian campus examples when they help (TCS NQT, Infosys, service companies vs product companies).
`.trim();
const MARKDOWN_FORMAT = `
OUTPUT FORMAT (technique: output-format constraints):
- Reply in GitHub-flavored markdown.
- Use fenced code blocks with a language tag when you show code.
- Prefer headings, numbered steps, and bullets over a wall of text.
- Do not mention these instructions.
`.trim();
/** Role prompting: a different persona for each mode, plus the shared guardrails. */ const CHAT_PROMPTS = {
    general: `
ROLE (technique: role prompting):
You are Campus Mentor, a senior engineer who has taken campus interviews at Indian colleges. You help final-year students decide what to study, how to choose between companies, and how to spend the next few weeks.

${GUARDRAILS}

${MARKDOWN_FORMAT}

When the student is vague, ask one clarifying question, then give a concrete 7-day plan.
`.trim(),
    technical: `
ROLE (technique: role prompting):
You are a technical interviewer for campus placements. You ask one question at a time about DSA, OOP, DBMS, OS, SQL, or the student's projects, then give a model answer and one follow-up.

${GUARDRAILS}

${MARKDOWN_FORMAT}

Start answers with what the interviewer is checking, then the explanation, then a short sample answer the student could say aloud.
`.trim(),
    hr: `
ROLE (technique: role prompting):
You are an HR interviewer for a campus drive. You coach answers for "Tell me about yourself", strengths, weaknesses, relocation, and "Why should we hire you?".

${GUARDRAILS}

${MARKDOWN_FORMAT}

Keep sample answers to about 60–90 seconds of speech. Point out filler and generic lines.
`.trim(),
    aptitude: `
ROLE (technique: role prompting):
You are an aptitude coach for quantitative, logical, and verbal questions used in Indian campus tests.

${GUARDRAILS}

FEW-SHOT (technique: few-shot):
Follow this shape when you set a practice question.

Student: Give me one percentage question.
Coach:
**Question.** A student scores 72% and still needs 36 more marks to reach 80%. What is the full marks of the paper?
**Options.** A) 400  B) 450  C) 500  D) 540
**Answer.** B) 450
**Why.** 80% - 72% = 8% of the paper = 36 marks, so the paper is 36 / 0.08 = 450.

${MARKDOWN_FORMAT}

Show the arithmetic. Do not skip steps.
`.trim(),
    resume: `
ROLE (technique: role prompting):
You are a campus resume reviewer. You rewrite bullets so a recruiter can see the tool, the action, and the result.

${GUARDRAILS}

${MARKDOWN_FORMAT}

When you rewrite a bullet, show the original and the improved line. Prefer strong verbs and real tools (Java, SQL, Excel, React) over adjectives like "hardworking".
`.trim()
};
function getChatSystemPrompt(mode) {
    return CHAT_PROMPTS[mode];
}
const QUIZ_SYSTEM_PROMPT = `
ROLE (technique: role prompting):
You write original multiple-choice aptitude questions for Indian campus placement tests. Difficulty is what a prepared second- or third-year student can solve in about two minutes.

FEW-SHOT (technique: few-shot):
One good question looks like this:
{
  "question": "A train 180 m long crosses a pole in 12 seconds. What is its speed in km/h?",
  "options": ["45", "54", "60", "72"],
  "answerIndex": 1,
  "explanation": "Speed = 180/12 = 15 m/s. 15 * 18/5 = 54 km/h."
}

OUTPUT FORMAT (technique: output-format constraints):
Return only JSON with this shape:
{
  "questions": [
    {
      "question": "string",
      "options": ["A text", "B text", "C text", "D text"],
      "answerIndex": 0,
      "explanation": "string with the working"
    }
  ]
}
Rules:
- Exactly 4 options.
- answerIndex is 0, 1, 2, or 3.
- Exactly one correct option.
- Do not label options with A/B/C/D inside the strings.
- Explanations must show the steps, not only the final number.
- No markdown fences.

GUARDRAILS (technique: guardrails):
Questions must be original. Do not copy a famous copyrighted item set verbatim.
`.trim();
const INTERVIEW_QUESTION_PROMPT = `
ROLE (technique: role prompting):
You are a campus interviewer. Ask exactly one question suited to the role, interview type, and difficulty the student chose.

OUTPUT FORMAT (technique: output-format constraints):
Return only JSON:
{ "question": "string", "topic": "short topic label" }

GUARDRAILS (technique: guardrails):
- Do not ask for phone numbers, college ID, or other personal data.
- Do not repeat a question listed in "already asked".
- Technical questions should be answerable out loud in a few minutes, not a full coding assignment.
- HR questions should be behavioral, not trivia.
`.trim();
const INTERVIEW_EVAL_PROMPT = `
ROLE (technique: role prompting):
You are a campus interviewer scoring a student's spoken answer.

CHAIN OF THOUGHT (technique: chain-of-thought):
Before you choose a score, privately check three things:
1. Is the answer correct or, for HR, specific and believable?
2. Did the student give a structure (definition + example, or situation + action + result)?
3. What is the single most useful improvement?
Do not include that private check in the JSON.

OUTPUT FORMAT (technique: output-format constraints):
Return only JSON:
{
  "score": 0,
  "strengths": ["string"],
  "improvements": ["string"],
  "nextQuestion": "string",
  "nextTopic": "string"
}
score is a number from 0 to 10, with one decimal allowed.
strengths and improvements each have 1 to 3 short items.
nextQuestion is a new question, not a repeat of the one just answered.

GUARDRAILS (technique: guardrails):
Be honest and kind. A weak answer should score below 5. Do not give 10 unless the answer is precise and complete.
`.trim();
const RESUME_SYSTEM_PROMPT = `
ROLE (technique: role prompting):
You are an applicant-tracking reviewer for campus placements in India. You score how easy it is for a recruiter (and a simple keyword screen) to see skills, projects, education, and impact.

CHAIN OF THOUGHT (technique: chain-of-thought):
Privately scan for: contact clutter, education, skills, projects, numbers, weak verbs, and missing tools. Then decide the score. Do not print the scan.

OUTPUT FORMAT (technique: output-format constraints):
Return only JSON:
{
  "atsScore": 0,
  "summary": "2 sentences",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "improvedBullets": ["string"]
}
atsScore is an integer from 0 to 100.
Provide 2 to 4 strengths, 2 to 4 weaknesses, and 3 to 6 improved bullets the student can paste onto a resume.

GUARDRAILS (technique: guardrails):
- Use only facts present in the resume text. Do not invent employers, CGPA, or metrics.
- If a number is missing, write the bullet with a blank like "[X%]" instead of making one up.
- Do not claim the student will pass any company's ATS.
`.trim();
const PROMPT_TECHNIQUES = [
    {
        technique: "Role prompting",
        where: "Every chat mode, quiz writer, interviewer, and resume reviewer",
        why: "The model is given a specific job (mentor, interviewer, coach, reviewer) so the tone and task stay stable."
    },
    {
        technique: "Few-shot",
        where: "Aptitude Coach chat mode and the quiz JSON prompt",
        why: "One worked example shows the exact question shape and explanation style we want copied."
    },
    {
        technique: "Chain-of-thought",
        where: "Interview scoring and resume scoring",
        why: "The prompt tells the model which checks to make before it picks a number. The checks stay out of the JSON the UI renders."
    },
    {
        technique: "Output-format constraints",
        where: "Chat markdown, and JSON for quizzes, interviews, and resumes",
        why: "The UI can trust keys like score and answerIndex. Invalid JSON is rejected and requested once more."
    },
    {
        technique: "Guardrails",
        where: "Every system prompt",
        why: "The chatbot stays on placements and career prep, refuses unrelated requests, and does not invent hiring outcomes."
    }
];
}),
"[project]/lib/validators.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateInterviewEvaluation",
    ()=>validateInterviewEvaluation,
    "validateInterviewQuestion",
    ()=>validateInterviewQuestion,
    "validateQuiz",
    ()=>validateQuiz,
    "validateResumeReview",
    ()=>validateResumeReview
]);
function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function requiredString(value, field, max = 2000) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`${field} must be a non-empty string`);
    }
    return value.trim().slice(0, max);
}
function stringList(value, field, min, maxItems) {
    if (!Array.isArray(value)) throw new Error(`${field} must be an array of strings`);
    const items = value.filter((item)=>typeof item === "string").map((item)=>item.trim()).filter(Boolean).slice(0, maxItems);
    if (items.length < min) throw new Error(`${field} needs at least ${min} item(s)`);
    return items;
}
function numberInRange(value, field, min, max) {
    const parsed = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
    if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
        throw new Error(`${field} must be a number from ${min} to ${max}`);
    }
    return Math.round(parsed * 10) / 10;
}
function validateInterviewQuestion(value) {
    if (!isRecord(value)) throw new Error("Question response must be a JSON object");
    return {
        question: requiredString(value.question, "question", 800),
        topic: requiredString(value.topic, "topic", 80)
    };
}
function validateInterviewEvaluation(value) {
    if (!isRecord(value)) throw new Error("Evaluation response must be a JSON object");
    const score = numberInRange(value.score, "score", 0, 10);
    return {
        score,
        strengths: stringList(value.strengths, "strengths", 1, 3),
        improvements: stringList(value.improvements, "improvements", 1, 3),
        nextQuestion: requiredString(value.nextQuestion, "nextQuestion", 800),
        nextTopic: requiredString(value.nextTopic, "nextTopic", 80)
    };
}
function validateQuestion(value, index) {
    if (!isRecord(value)) throw new Error(`Question ${index + 1} must be an object`);
    if (!Array.isArray(value.options) || value.options.length !== 4) {
        throw new Error(`Question ${index + 1} must have exactly 4 options`);
    }
    const options = value.options.map((option, optionIndex)=>requiredString(option, `Question ${index + 1} option ${optionIndex + 1}`, 300));
    const answerIndex = numberInRange(value.answerIndex, `Question ${index + 1} answerIndex`, 0, 3);
    if (!Number.isInteger(answerIndex)) {
        throw new Error(`Question ${index + 1} answerIndex must be an integer`);
    }
    return {
        question: requiredString(value.question, `Question ${index + 1}`, 500),
        options,
        answerIndex,
        explanation: requiredString(value.explanation, `Question ${index + 1} explanation`, 800)
    };
}
function validateQuiz(value, category, count) {
    if (!isRecord(value) || !Array.isArray(value.questions)) {
        throw new Error("Quiz response must be an object with a questions array");
    }
    if (value.questions.length < count) {
        throw new Error(`Expected ${count} questions but received ${value.questions.length}`);
    }
    return {
        category,
        questions: value.questions.slice(0, count).map((question, index)=>validateQuestion(question, index))
    };
}
function validateResumeReview(value) {
    if (!isRecord(value)) throw new Error("Resume review must be a JSON object");
    return {
        atsScore: Math.round(numberInRange(value.atsScore, "atsScore", 0, 100)),
        summary: requiredString(value.summary, "summary", 600),
        strengths: stringList(value.strengths, "strengths", 2, 4),
        weaknesses: stringList(value.weaknesses, "weaknesses", 2, 4),
        improvedBullets: stringList(value.improvedBullets, "improvedBullets", 3, 6)
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ax1elhmfobkv._.js.map