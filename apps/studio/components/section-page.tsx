import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

export type SectionRow = {
  label: string;
  detail: string;
  meta?: string;
  icon?: LucideIcon;
};

export function SectionPage({
  eyebrow,
  title,
  description,
  rows,
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  rows: SectionRow[];
  note: string;
}) {
  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        <div className="mt-3 flex flex-col justify-between gap-6 border-b border-foreground/10 pb-8 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/52">{description}</p>
          </div>
          <Link
            href="/chat/demo"
            className="inline-flex h-9 shrink-0 items-center gap-2 self-start rounded-[8px] bg-foreground px-3 text-xs font-medium text-background transition hover:opacity-88 sm:self-auto"
          >
            Build with Agenty
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <section className="divide-y divide-foreground/10">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div
                key={row.label}
                className="grid gap-3 py-5 sm:grid-cols-[minmax(180px,0.8fr)_minmax(280px,1.6fr)_auto] sm:items-center"
              >
                <div className="flex items-center gap-2.5">
                  {Icon ? <Icon className="h-4 w-4 shrink-0 text-foreground/36" /> : null}
                  <p className="text-sm font-medium text-foreground/74">{row.label}</p>
                </div>
                <p className="text-sm leading-6 text-foreground/48">{row.detail}</p>
                {row.meta ? (
                  <span className="justify-self-start rounded-full bg-foreground/[0.055] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/46 sm:justify-self-end">
                    {row.meta}
                  </span>
                ) : null}
              </div>
            );
          })}
        </section>

        <p className="border-t border-foreground/10 pt-5 text-xs leading-5 text-foreground/38">
          {note}
        </p>
      </div>
    </main>
  );
}
