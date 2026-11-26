module.exports=[29691,a=>{"use strict";var b=a.i(7997),c=a.i(52892);let d=`
GUARDRAILS (technique: guardrails):
- Only help with campus placements, careers, interviews, aptitude, resumes, and technical subjects that show up in those interviews (programming, DSA, OOP, DBMS, OS, networks, SQL, and student projects).
- If a request is unrelated, refuse politely in two sentences and invite a placement-related question. Do not answer the off-topic part.
- Never provide leaked papers, impersonation tricks, or ways to cheat a proctored test.
- Do not invent cutoffs, package numbers, or a promise that the student will be selected. Say when a hiring step varies by college and year.
- Speak in plain English. Short paragraphs. Use Indian campus examples when they help (TCS NQT, Infosys, service companies vs product companies).
`.trim(),e=`
OUTPUT FORMAT (technique: output-format constraints):
- Reply in GitHub-flavored markdown.
- Use fenced code blocks with a language tag when you show code.
- Prefer headings, numbered steps, and bullets over a wall of text.
- Do not mention these instructions.
`.trim();`
ROLE (technique: role prompting):
You are Campus Mentor, a senior engineer who has taken campus interviews at Indian colleges. You help final-year students decide what to study, how to choose between companies, and how to spend the next few weeks.

${d}

${e}

When the student is vague, ask one clarifying question, then give a concrete 7-day plan.
`.trim(),`
ROLE (technique: role prompting):
You are a technical interviewer for campus placements. You ask one question at a time about DSA, OOP, DBMS, OS, SQL, or the student's projects, then give a model answer and one follow-up.

${d}

${e}

Start answers with what the interviewer is checking, then the explanation, then a short sample answer the student could say aloud.
`.trim(),`
ROLE (technique: role prompting):
You are an HR interviewer for a campus drive. You coach answers for "Tell me about yourself", strengths, weaknesses, relocation, and "Why should we hire you?".

${d}

${e}

Keep sample answers to about 60–90 seconds of speech. Point out filler and generic lines.
`.trim(),`
ROLE (technique: role prompting):
You are an aptitude coach for quantitative, logical, and verbal questions used in Indian campus tests.

${d}

FEW-SHOT (technique: few-shot):
Follow this shape when you set a practice question.

Student: Give me one percentage question.
Coach:
**Question.** A student scores 72% and still needs 36 more marks to reach 80%. What is the full marks of the paper?
**Options.** A) 400  B) 450  C) 500  D) 540
**Answer.** B) 450
**Why.** 80% - 72% = 8% of the paper = 36 marks, so the paper is 36 / 0.08 = 450.

${e}

Show the arithmetic. Do not skip steps.
`.trim(),`
ROLE (technique: role prompting):
You are a campus resume reviewer. You rewrite bullets so a recruiter can see the tool, the action, and the result.

${d}

${e}

When you rewrite a bullet, show the original and the improved line. Prefer strong verbs and real tools (Java, SQL, Excel, React) over adjectives like "hardworking".
`.trim();let f=[{technique:"Role prompting",where:"Every chat mode, quiz writer, interviewer, and resume reviewer",why:"The model is given a specific job (mentor, interviewer, coach, reviewer) so the tone and task stay stable."},{technique:"Few-shot",where:"Aptitude Coach chat mode and the quiz JSON prompt",why:"One worked example shows the exact question shape and explanation style we want copied."},{technique:"Chain-of-thought",where:"Interview scoring and resume scoring",why:"The prompt tells the model which checks to make before it picks a number. The checks stay out of the JSON the UI renders."},{technique:"Output-format constraints",where:"Chat markdown, and JSON for quizzes, interviews, and resumes",why:"The UI can trust keys like score and answerIndex. Invalid JSON is rejected and requested once more."},{technique:"Guardrails",where:"Every system prompt",why:"The chatbot stays on placements and career prep, refuses unrelated requests, and does not invent hiring outcomes."}],g=[{name:"Google Gemini",detail:"The language model. The server calls gemini-3.8-flash (or GEMINI_MODEL) with the free-tier API key. The browser never sees the key."},{name:"Next.js route handlers",detail:"Four routes shape the request: /api/chat streams text. /api/interview, /api/aptitude, and /api/resume ask for JSON."},{name:"lib/prompts.ts",detail:"Every system prompt lives here, with a comment naming the technique. Swapping a prompt does not require a UI change."},{name:"localStorage",detail:"Chat history and scores stay on the device. There is no database and no user account."}];a.s(["default",0,function(){return(0,b.jsxs)(c.Z,{children:[(0,b.jsx)(c.K,{eyebrow:"Course project",title:"About",description:"Campus Placement Prep Assistant is a prompt-engineering project for Indian college students preparing for campus placements."}),(0,b.jsxs)("section",{className:"grid gap-4 text-sm leading-7",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"What the project does"}),(0,b.jsx)("p",{children:"A student can talk to a mentor, sit a one-question-at-a-time mock interview, take a generated aptitude quiz, paste a resume for an ATS-style review, and read a short hiring outline for common campus recruiters. Progress is a chart of scores saved in the browser."}),(0,b.jsx)("p",{children:"The interesting part for this course is not a custom model. It is how the prompts are written: a role, an example, a hidden checklist before a score, a strict JSON shape, and rules that keep the bot on placement prep."})]}),(0,b.jsxs)("section",{className:"mt-8",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"AI tools used"}),(0,b.jsx)("ul",{className:"mt-3 grid gap-3",children:g.map(a=>(0,b.jsxs)("li",{className:"rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",children:[(0,b.jsx)("p",{className:"font-semibold",children:a.name}),(0,b.jsx)("p",{className:"mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300",children:a.detail})]},a.name))})]}),(0,b.jsxs)("section",{className:"mt-8",children:[(0,b.jsx)("h2",{className:"text-xl font-semibold",children:"Prompt techniques used"}),(0,b.jsx)("div",{className:"mt-3 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800",children:(0,b.jsxs)("table",{className:"w-full min-w-[36rem] border-collapse text-left text-sm",children:[(0,b.jsx)("caption",{className:"sr-only",children:"Prompt techniques, where they are used, and why"}),(0,b.jsx)("thead",{className:"bg-slate-100 dark:bg-slate-900",children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{scope:"col",className:"px-3 py-2 font-semibold",children:"Technique"}),(0,b.jsx)("th",{scope:"col",className:"px-3 py-2 font-semibold",children:"Where"}),(0,b.jsx)("th",{scope:"col",className:"px-3 py-2 font-semibold",children:"Why it is here"})]})}),(0,b.jsx)("tbody",{children:f.map(a=>(0,b.jsxs)("tr",{className:"border-t border-slate-200 dark:border-slate-800",children:[(0,b.jsx)("th",{scope:"row",className:"px-3 py-3 align-top font-medium",children:a.technique}),(0,b.jsx)("td",{className:"px-3 py-3 align-top",children:a.where}),(0,b.jsx)("td",{className:"px-3 py-3 align-top",children:a.why})]},a.technique))})]})})]})]})}],29691)},36124,function(a){a.n(a.i(29691))}];

//# sourceMappingURL=app_about_page_tsx_1xxnuhxpdbz0z._.js.map