import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CatalogShell } from "@/components/catalog-shell";
import { componentCollection } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Source-owned UI primitives for agent conversations, approvals, and durable artifacts.",
};

export default function ComponentsPage() {
  return (
    <CatalogShell>
      <header className="max-w-3xl border-b border-foreground/14 pb-9">
        <p className="font-mono text-xs text-accent">v0.1 release collection</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">Components</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Copyable React source for the visible boundaries of an agent application. Every item
          leaves runtime, persistence, and authorization in your stack.
        </p>
      </header>
      <div className="mt-4">
        {componentCollection.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="group grid gap-4 border-b border-foreground/14 py-7 sm:grid-cols-[180px_1fr_auto] sm:items-start"
          >
            <div>
              <h2 className="font-semibold">{component.name}</h2>
              <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                {component.maturity}
              </span>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-muted">{component.summary}</p>
            <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
          </Link>
        ))}
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
        Preview APIs may change before 1.0. Each detail page documents current ownership boundaries
        and tradeoffs.
      </p>
    </CatalogShell>
  );
}
