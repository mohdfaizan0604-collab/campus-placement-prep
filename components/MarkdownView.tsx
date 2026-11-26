"use client";

import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  pre({ children }) {
    return <>{children}</>;
  },
  code({ className, children }) {
    const text = String(children).replace(/\n$/, "");
    const language = /language-([\w-]+)/.exec(className ?? "")?.[1];
    const block = Boolean(language) || text.includes("\n");
    if (!block) {
      return <code>{text}</code>;
    }
    return (
      <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm text-slate-100">
        {language ? <div className="mb-2 text-xs tracking-wide text-slate-400 uppercase">{language}</div> : null}
        <code className="font-mono">{text}</code>
      </pre>
    );
  },
};

export function MarkdownView({ text }: { text: string }) {
  return (
    <div className="markdown text-sm leading-6">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  );
}
