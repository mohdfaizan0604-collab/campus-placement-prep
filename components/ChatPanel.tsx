"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CHAT_MODE_OPTIONS, CHAT_SUGGESTIONS } from "@/lib/chat-options";
import { bumpChatReplies, clearChat, loadChat, saveChat } from "@/lib/storage";
import type { ChatMessage, ChatMode } from "@/lib/types";
import { ErrorNote, fieldClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./PageShell";
import { MarkdownView } from "./MarkdownView";

export function ChatPanel() {
  const params = useSearchParams();
  const prefill = params.get("prompt") ?? "";
  const [mode, setMode] = useState<ChatMode>("general");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const saved = loadChat();
    if (saved) {
      setMode(saved.mode);
      setMessages(saved.messages);
    }
    if (prefill) setInput(prefill);
    setReady(true);
  }, [prefill]);

  useEffect(() => {
    if (!ready) return;
    const stored = messages.filter((message, index) => {
      const pending = index === messages.length - 1 && message.role === "assistant" && message.content === "";
      return !pending;
    });
    saveChat({ mode, messages: stored });
  }, [messages, mode, ready]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;
    setError(null);
    setInput("");

    const history = [...messages, { role: "user" as const, content: text }].slice(-40);
    setMessages([...history, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, messages: history.slice(-10) }),
      });

      if (!response.ok || !response.body) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "The assistant could not reply.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let full = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        const snapshot = full;
        setMessages((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          if (last?.role === "assistant") next[next.length - 1] = { role: "assistant", content: snapshot };
          return next;
        });
      }

      if (!full.trim()) throw new Error("The assistant returned an empty reply.");
      bumpChatReplies();
    } catch (err) {
      setMessages((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        if (last?.role === "assistant" && !last.content.trim()) next.pop();
        return next;
      });
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    if (loading) return;
    clearChat();
    setMessages([]);
    setError(null);
  }

  const selected = CHAT_MODE_OPTIONS.find((option) => option.id === mode);

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md flex-1">
          <label htmlFor="mode" className={labelClass}>
            Mode
          </label>
          <select
            id="mode"
            className={fieldClass}
            value={mode}
            onChange={(event) => setMode(event.target.value as ChatMode)}
          >
            {CHAT_MODE_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{selected?.blurb}</p>
        </div>
        <button type="button" className={secondaryButtonClass} onClick={onClear} disabled={loading || messages.length === 0}>
          Clear chat
        </button>
      </div>

      <section
        aria-label="Conversation"
        className="flex min-h-[24rem] flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Ask about interviews, aptitude, companies, or your resume. The last 10 messages are sent with each question so the mentor can follow the conversation.
          </p>
        ) : null}
        <div className="grid gap-3" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((message, index) => {
            const mine = message.role === "user";
            const waiting = !mine && message.content === "" && loading;
            return (
              <article
                key={`${message.role}-${index}`}
                className={`max-w-[95%] rounded-2xl px-4 py-3 ${
                  mine
                    ? "ml-auto bg-indigo-700 text-white"
                    : "mr-auto bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                <p className="mb-1 text-xs font-semibold tracking-wide uppercase opacity-70">
                  {mine ? "You" : "Mentor"}
                </p>
                {waiting ? (
                  <p className="text-sm">
                    <span className="sr-only">Mentor is typing</span>
                    <span aria-hidden="true" className="inline-flex gap-1">
                      <span className="animate-pulse">Thinking</span>
                    </span>
                  </p>
                ) : mine ? (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <MarkdownView text={message.content} />
                )}
              </article>
            );
          })}
        </div>
        <div ref={bottomRef} />
      </section>

      <ErrorNote message={error} />

      <div className="flex flex-wrap gap-2" aria-label="Suggested prompts">
        {CHAT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            disabled={loading}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-left text-sm hover:bg-slate-100 disabled:opacity-60 dark:border-slate-700 dark:hover:bg-slate-800"
            onClick={() => send(suggestion.prompt)}
          >
            {suggestion.label}
          </button>
        ))}
      </div>

      <form
        className="grid gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void send(input);
        }}
      >
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          className={`${fieldClass} min-h-28`}
          value={input}
          maxLength={4000}
          placeholder="Ask a placement question"
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void send(input);
            }
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">Enter sends. Shift+Enter adds a line.</p>
          <button type="submit" className={primaryButtonClass} disabled={loading || input.trim().length === 0}>
            {loading ? "Waiting for reply…" : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
}
