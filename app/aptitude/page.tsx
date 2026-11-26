import { AptitudePanel } from "@/components/AptitudePanel";
import { PageHeader, PageShell } from "@/components/PageShell";

export default function AptitudePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Practice"
        title="Aptitude"
        description="Generate a short multiple-choice set. Each choice is marked as soon as you pick it, and a finished set is stored on the dashboard."
      />
      <AptitudePanel />
    </PageShell>
  );
}
