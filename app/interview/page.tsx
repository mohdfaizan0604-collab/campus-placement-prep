import { InterviewPanel } from "@/components/InterviewPanel";
import { PageHeader, PageShell } from "@/components/PageShell";

export default function InterviewPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Practice"
        title="Mock interview"
        description="Pick a role, type, and difficulty. The interviewer asks one question, scores your answer out of 10, and then asks the next one."
      />
      <InterviewPanel />
    </PageShell>
  );
}
