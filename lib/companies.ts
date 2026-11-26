export type Company = {
  name: string;
  sector: string;
  summary: string;
  rounds: { name: string; detail: string }[];
  tips: string[];
  askPrompt: string;
};

/**
 * Public, high-level campus patterns. Drives change by year and college.
 * The cards say that. They are not a promise of the next drive.
 */
export const COMPANIES: Company[] = [
  {
    name: "TCS",
    sector: "IT services",
    summary:
      "Tata Consultancy Services hires a large share of Indian campuses, often through the National Qualifier Test and a later interview.",
    rounds: [
      {
        name: "Online test",
        detail: "Usually numerical ability, verbal ability, reasoning, and a programming section. The mix depends on the NQT variant.",
      },
      {
        name: "Technical interview",
        detail: "Projects, one programming language, DBMS or OOP basics, and sometimes a short coding or SQL question.",
      },
      {
        name: "HR interview",
        detail: "Relocation, gaps, and why TCS. Offer bands such as Ninja, Digital, and Prime have been used, but names and cutoffs change.",
      },
    ],
    tips: ["Practice timed aptitude before long coding sessions.", "Be ready to explain your final-year project without slides."],
    askPrompt: "Explain the typical TCS campus hiring process and give me a 2-week prep plan for the test and interviews.",
  },
  {
    name: "Infosys",
    sector: "IT services",
    summary: "Infosys campus drives usually combine an online assessment with a technical round and an HR conversation.",
    rounds: [
      {
        name: "Online assessment",
        detail: "Aptitude, verbal, logical reasoning, and often a coding or hands-on section. Some years use InfyTQ-style practice before the drive.",
      },
      {
        name: "Technical interview",
        detail: "Programming fundamentals, a project deep dive, and basic questions from DBMS, OS, or the student's elective.",
      },
      {
        name: "HR interview",
        detail: "Communication, flexibility on location, and a clear introduction.",
      },
    ],
    tips: ["Write a 90-second self introduction and practice it aloud.", "Revise one language deeply rather than five shallowly."],
    askPrompt: "How should I prepare for an Infosys campus drive, round by round, including the HR interview?",
  },
  {
    name: "Wipro",
    sector: "IT services",
    summary: "Wipro campus hiring often starts with an online assessment and continues with technical and HR rounds.",
    rounds: [
      {
        name: "Online assessment",
        detail: "English, quantitative aptitude, and logical reasoning. Some drives add an essay or a coding question.",
      },
      {
        name: "Technical interview",
        detail: "Language basics, project work, and simple problem solving.",
      },
      {
        name: "HR interview",
        detail: "Goals, strengths, and willingness to work in shifts or relocate.",
      },
    ],
    tips: ["Do not ignore the English section.", "Keep one academic project and one personal project ready."],
    askPrompt: "Compare Wipro campus rounds with a typical service-company drive and tell me what to revise this week.",
  },
  {
    name: "Accenture",
    sector: "IT services and consulting",
    summary: "Accenture campus assessments often test cognitive skills, technical basics, and communication before an interview.",
    rounds: [
      {
        name: "Cognitive and technical assessment",
        detail: "Reasoning, English, and role-related technical questions. Coding appears for some developer tracks.",
      },
      {
        name: "Communication check",
        detail: "A short speaking or listening task is common. Clear speech matters as much as the score.",
      },
      {
        name: "Interview",
        detail: "Projects, fundamentals, and fit. The interviewer may mix technical and HR questions in one sitting.",
      },
    ],
    tips: ["Practice explaining a project in simple English.", "Revise pseudocode and basic complexity, not only syntax."],
    askPrompt: "Walk me through Accenture campus placement rounds and the communication round. How should I practice?",
  },
  {
    name: "Cognizant",
    sector: "IT services",
    summary: "Cognizant GenC-style drives usually stack an online test, a technical discussion, and HR. The cluster of tests changes by hiring season.",
    rounds: [
      {
        name: "Online assessment",
        detail: "Quantitative, logical, and verbal questions, sometimes with a coding or debugging cluster.",
      },
      {
        name: "Technical interview",
        detail: "Programming, SQL or DBMS, and whatever you listed on the resume.",
      },
      {
        name: "HR interview",
        detail: "Background, relocation, and why Cognizant.",
      },
    ],
    tips: ["Only list skills you can speak about for five minutes.", "Practice debugging small programs on paper."],
    askPrompt: "Explain a typical Cognizant GenC campus process and quiz me with one technical and one HR question.",
  },
  {
    name: "Capgemini",
    sector: "IT services",
    summary: "Capgemini campus processes often include an aptitude or game-style assessment, a technical round, and HR.",
    rounds: [
      {
        name: "Online assessment",
        detail: "Quantitative and logical questions. Some drives use game-based tasks or pseudocode instead of a long coding paper.",
      },
      {
        name: "Technical interview",
        detail: "Language of your choice, one project, and a few fundamentals.",
      },
      {
        name: "HR interview",
        detail: "Communication and willingness to learn a new stack after joining.",
      },
    ],
    tips: ["Read pseudocode questions slowly.", "Prepare an answer for a tool you want to learn on the job."],
    askPrompt: "How do Capgemini campus assessments usually work, and what aptitude topics should I prioritise?",
  },
  {
    name: "Amazon",
    sector: "Product",
    summary: "Amazon intern and new-grad loops focus on coding and Leadership Principles. This is a different pattern from a service-company aptitude test.",
    rounds: [
      {
        name: "Online assessment",
        detail: "Coding problems and sometimes a work-style survey. Debugging or work-simulation tasks appear in some seasons.",
      },
      {
        name: "Technical interviews",
        detail: "Data structures, algorithms, and complexity. You are expected to talk through the approach before coding.",
      },
      {
        name: "Behavioral interviews",
        detail: "Stories mapped to Leadership Principles, with a specific situation, what you did, and the result.",
      },
    ],
    tips: ["Practice medium DSA problems out loud.", "Prepare four STAR stories that are actually yours."],
    askPrompt: "I am preparing for Amazon campus interviews. Give me a coding practice plan and two Leadership Principle questions.",
  },
  {
    name: "Microsoft",
    sector: "Product",
    summary: "Microsoft campus hiring for technical roles is centered on coding interviews and project depth, after an online assessment.",
    rounds: [
      {
        name: "Online assessment",
        detail: "Coding problems, sometimes with a short debugging or multiple-choice technical section.",
      },
      {
        name: "Technical interviews",
        detail: "DSA, problem solving, and follow-ups on your approach. Interviewers often ask why a solution is correct.",
      },
      {
        name: "Final discussion",
        detail: "More problem solving or a conversation about internships and projects. An HR screen may be separate.",
      },
    ],
    tips: ["Write clean code and test it with one example.", "Be ready to improve a brute-force answer."],
    askPrompt: "Build me a 3-week Microsoft campus interview plan focused on DSA and explaining my projects.",
  },
  {
    name: "HCLTech",
    sector: "IT services",
    summary: "HCLTech campus drives commonly use an aptitude test followed by technical and HR rounds.",
    rounds: [
      {
        name: "Aptitude test",
        detail: "Quantitative aptitude, logical reasoning, and verbal ability under a time limit.",
      },
      {
        name: "Technical interview",
        detail: "C, Java, or Python basics, plus DBMS and your project.",
      },
      {
        name: "HR interview",
        detail: "Introduction, family background questions are less useful than clarity about role and location.",
      },
    ],
    tips: ["Time-box aptitude sets to 30 minutes.", "Revise DBMS keys, normalization, and one join query."],
    askPrompt: "Outline the HCLTech campus placement process and give me five aptitude topics to revise first.",
  },
];
