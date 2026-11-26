import { ResumePanel } from "@/components/ResumePanel";
import { PageHeader, PageShell } from "@/components/PageShell";

export default function ResumePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Review"
        title="Resume"
        description="Paste the words from your resume. You get an ATS-style score, strengths, weaknesses, and bullets you can copy. The model will not invent numbers that are not in the text."
      />
      <ResumePanel />
    </PageShell>
  );
}
