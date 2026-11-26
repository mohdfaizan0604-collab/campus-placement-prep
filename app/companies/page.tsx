import Link from "next/link";
import { PageHeader, PageShell, secondaryButtonClass } from "@/components/PageShell";
import { COMPANIES } from "@/lib/companies";

export default function CompaniesPage() {
  return (
    <PageShell wide>
      <PageHeader
        eyebrow="Campus drives"
        title="Companies"
        description="These cards describe the usual public pattern for each company. The exact test changes by year and college. Use Ask AI when you want a plan for one of them."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {COMPANIES.map((company) => (
          <article key={company.name} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold">{company.name}</h2>
              <p className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800">{company.sector}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{company.summary}</p>
            <ol className="mt-4 grid gap-3">
              {company.rounds.map((round, index) => (
                <li key={round.name}>
                  <p className="text-sm font-semibold">
                    {index + 1}. {round.name}
                  </p>
                  <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{round.detail}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
              {company.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <Link href={`/chat?prompt=${encodeURIComponent(company.askPrompt)}`} className={`${secondaryButtonClass} mt-5 self-start`}>
              Ask AI about {company.name}
            </Link>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
