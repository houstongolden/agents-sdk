import { CopyCommand } from "@/components/copy-command";
import { CatalogShell } from "@/components/catalog-shell";

export function DocPage({
  kind,
  title,
  summary,
  children,
}: {
  kind: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <CatalogShell>
      <article className="max-w-4xl">
        <header className="border-b border-foreground/14 pb-9">
          <p className="font-mono text-xs text-accent">{kind}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{summary}</p>
        </header>
        <div className="doc-content">{children}</div>
      </article>
    </CatalogShell>
  );
}

export function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-foreground/14 py-9">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-4 space-y-4 text-sm leading-7 text-muted">{children}</div>
    </section>
  );
}

export function Command({ children }: { children: string }) {
  return <CopyCommand command={children} />;
}

export function DefinitionList({ items }: { items: Array<{ term: string; detail: string }> }) {
  return (
    <dl className="border-y border-foreground/14">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-2 border-b border-foreground/10 py-4 last:border-b-0 sm:grid-cols-[180px_1fr]"
        >
          <dt className="font-mono text-xs text-foreground">{item.term}</dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
