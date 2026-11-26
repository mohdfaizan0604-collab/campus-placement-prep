module.exports = [
"[externals]/next/dist/server/app-render/module-loading/track-module-loading.external.js [external] (next/dist/server/app-render/module-loading/track-module-loading.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/module-loading/track-module-loading.external.js", () => require("next/dist/server/app-render/module-loading/track-module-loading.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/about/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AboutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PageShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/PageShell.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prompts.ts [app-rsc] (ecmascript)");
;
;
;
const TOOLS = [
    {
        name: "Google Gemini",
        detail: "The language model. The server calls gemini-3.8-flash (or GEMINI_MODEL) with the free-tier API key. The browser never sees the key."
    },
    {
        name: "Next.js route handlers",
        detail: "Four routes shape the request: /api/chat streams text. /api/interview, /api/aptitude, and /api/resume ask for JSON."
    },
    {
        name: "lib/prompts.ts",
        detail: "Every system prompt lives here, with a comment naming the technique. Swapping a prompt does not require a UI change."
    },
    {
        name: "localStorage",
        detail: "Chat history and scores stay on the device. There is no database and no user account."
    }
];
function AboutPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PageShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageShell"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$PageShell$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PageHeader"], {
                eyebrow: "Course project",
                title: "About",
                description: "Campus Placement Prep Assistant is a prompt-engineering project for Indian college students preparing for campus placements."
            }, void 0, false, {
                fileName: "[project]/app/about/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid gap-4 text-sm leading-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold",
                        children: "What the project does"
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "A student can talk to a mentor, sit a one-question-at-a-time mock interview, take a generated aptitude quiz, paste a resume for an ATS-style review, and read a short hiring outline for common campus recruiters. Progress is a chart of scores saved in the browser."
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "The interesting part for this course is not a custom model. It is how the prompts are written: a role, an example, a hidden checklist before a score, a strict JSON shape, and rules that keep the bot on placement prep."
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/about/page.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold",
                        children: "AI tools used"
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "mt-3 grid gap-3",
                        children: TOOLS.map((tool)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: tool.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/about/page.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300",
                                        children: tool.detail
                                    }, void 0, false, {
                                        fileName: "[project]/app/about/page.tsx",
                                        lineNumber: 48,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, tool.name, true, {
                                fileName: "[project]/app/about/page.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/about/page.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold",
                        children: "Prompt techniques used"
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full min-w-[36rem] border-collapse text-left text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
                                    className: "sr-only",
                                    children: "Prompt techniques, where they are used, and why"
                                }, void 0, false, {
                                    fileName: "[project]/app/about/page.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-slate-100 dark:bg-slate-900",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                className: "px-3 py-2 font-semibold",
                                                children: "Technique"
                                            }, void 0, false, {
                                                fileName: "[project]/app/about/page.tsx",
                                                lineNumber: 61,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                className: "px-3 py-2 font-semibold",
                                                children: "Where"
                                            }, void 0, false, {
                                                fileName: "[project]/app/about/page.tsx",
                                                lineNumber: 62,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                scope: "col",
                                                className: "px-3 py-2 font-semibold",
                                                children: "Why it is here"
                                            }, void 0, false, {
                                                fileName: "[project]/app/about/page.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/about/page.tsx",
                                        lineNumber: 60,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/about/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PROMPT_TECHNIQUES"].map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t border-slate-200 dark:border-slate-800",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    scope: "row",
                                                    className: "px-3 py-3 align-top font-medium",
                                                    children: row.technique
                                                }, void 0, false, {
                                                    fileName: "[project]/app/about/page.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-3 align-top",
                                                    children: row.where
                                                }, void 0, false, {
                                                    fileName: "[project]/app/about/page.tsx",
                                                    lineNumber: 70,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-3 py-3 align-top",
                                                    children: row.why
                                                }, void 0, false, {
                                                    fileName: "[project]/app/about/page.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, row.technique, true, {
                                            fileName: "[project]/app/about/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/app/about/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/about/page.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/about/page.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/about/page.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/about/page.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/about/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/about/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/favicon.ico (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/favicon.117ezoe8m31dk.ico" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/app/favicon.ico (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$favicon$2e$ico__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 48,
    height: 48
};
}),
"[project]/components/PageShell.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorNote",
    ()=>ErrorNote,
    "PageHeader",
    ()=>PageHeader,
    "PageShell",
    ()=>PageShell,
    "fieldClass",
    ()=>fieldClass,
    "labelClass",
    ()=>labelClass,
    "primaryButtonClass",
    ()=>primaryButtonClass,
    "secondaryButtonClass",
    ()=>secondaryButtonClass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function PageShell({ children, wide = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mx-auto w-full px-4 py-8 sm:px-6 ${wide ? "max-w-6xl" : "max-w-3xl"}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/PageShell.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
function PageHeader({ eyebrow, title, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "mb-8",
        children: [
            eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold tracking-wide text-indigo-700 uppercase dark:text-indigo-300",
                children: eyebrow
            }, void 0, false, {
                fileName: "[project]/components/PageShell.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mt-1 text-3xl font-semibold tracking-tight sm:text-4xl",
                children: title
            }, void 0, false, {
                fileName: "[project]/components/PageShell.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300",
                children: description
            }, void 0, false, {
                fileName: "[project]/components/PageShell.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/PageShell.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
const fieldClass = "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100";
const labelClass = "mb-1 block text-sm font-medium";
const primaryButtonClass = "inline-flex items-center justify-center rounded-xl bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60";
const secondaryButtonClass = "inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";
function ErrorNote({ message }) {
    if (!message) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        role: "alert",
        className: "rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200",
        children: message
    }, void 0, false, {
        fileName: "[project]/components/PageShell.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/prompts.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0bwl9_fda68gb._.js.map