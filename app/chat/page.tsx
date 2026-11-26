import { Suspense } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { PageHeader, PageShell } from "@/components/PageShell";

export default function ChatPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Mentor"
        title="Chat"
        description="Pick a mode to change the system prompt. The assistant stays on placements, interviews, aptitude, and technical prep."
      />
      <Suspense fallback={<p className="text-sm text-slate-600">Loading chat…</p>}>
        <ChatPanel />
      </Suspense>
    </PageShell>
  );
}
