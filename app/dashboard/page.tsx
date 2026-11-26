import { DashboardPanel } from "@/components/DashboardPanel";
import { PageHeader, PageShell } from "@/components/PageShell";

export default function DashboardPage() {
  return (
    <PageShell wide>
      <PageHeader
        eyebrow="This browser"
        title="Dashboard"
        description="Quizzes, interview averages, resume scores, and chat replies are stored in localStorage. Clearing the site data, or using another browser, starts you from zero."
      />
      <DashboardPanel />
    </PageShell>
  );
}
