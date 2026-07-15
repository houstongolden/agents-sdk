import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CopyCommand } from "@/components/copy-command";
import {
  componentCollection,
  INSTALL_COMMAND,
  POSITIONING,
  PUBLIC_PACKAGE_NOTE,
} from "@/lib/catalog";

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-foreground/14">
        <div className="mx-auto grid min-h-[calc(100dvh-64px)] max-w-[1440px] items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_0.85fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="max-w-2xl font-mono text-sm font-medium leading-6 text-accent">
              {POSITIONING}
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
              Build production agents from tested parts.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Components, patterns, tools, and templates for inspectable agent applications.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/docs/getting-started"
                className="primary-cta inline-flex h-11 items-center gap-2 px-4 text-sm font-medium transition hover:opacity-88 active:translate-y-px"
              >
                Start building <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/components"
                className="inline-flex h-11 items-center border border-foreground/16 px-4 text-sm font-medium transition hover:bg-foreground/[0.05] active:translate-y-px"
              >
                Browse components
              </Link>
            </div>
          </div>

          <div className="border-t-2 border-foreground pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-sm font-semibold">Install one component</h2>
              <span className="font-mono text-[11px] text-muted">v0.1 collection</span>
            </div>
            <div className="mt-4">
              <CopyCommand command={INSTALL_COMMAND} />
            </div>
            <p className="mt-3 border-l-2 border-accent pl-3 text-xs leading-5 text-muted">
              {PUBLIC_PACKAGE_NOTE} Contributors can use the local commands in the documentation.
            </p>
            <div className="mt-7 border-t border-foreground/14">
              {componentCollection.map((item) => (
                <Link
                  key={item.slug}
                  href={`/components/${item.slug}`}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-foreground/12 py-3.5 text-sm transition hover:pl-1"
                >
                  <span>{item.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                    {item.maturity}
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted">
              Preview means the API is useful and tested, but may change before 1.0.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/14">
        <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Own the system you ship.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            The registry distributes readable source and contracts. It does not hide your runtime
            behind a hosted black box.
          </p>
          <div className="mt-10 grid border-y border-foreground/14 md:grid-cols-3">
            <Ownership
              title="Agents SDK owns"
              items={[
                "Versioned registry manifests",
                "UI and pattern source",
                "Compatibility checks",
              ]}
            />
            <Ownership
              title="Your application owns"
              items={[
                "Models and transports",
                "Auth, data, and persistence",
                "Tool execution and policy",
              ]}
            />
            <Ownership
              title="Your team controls"
              items={[
                "Approval boundaries",
                "Deployment and observability",
                "Every production side effect",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/14">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.04em]">
              A small release, fully legible.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted">
              v0.1 starts with the seams every serious agent application needs.
            </p>
          </div>
          <div className="grid gap-x-10 sm:grid-cols-2">
            <EcosystemLink
              href="/agents"
              title="Agents & Skills"
              body="Composable agent contracts, instruction packages, and runtime boundaries."
            />
            <EcosystemLink
              href="/tools"
              title="Tools & MCP"
              body="Typed operations and MCP surfaces with explicit side-effect classes."
            />
            <EcosystemLink
              href="/patterns/approval-gates"
              title="Patterns"
              body="Implementation guidance with failure modes and tests."
            />
            <EcosystemLink
              href="/templates/support-agent"
              title="Templates"
              body="Coherent starters that combine registry items."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-l-2 border-accent pl-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold">Built by BAMF</p>
            <p className="mt-1 text-sm text-muted">
              Need a production agent system built around your workflows and data?
            </p>
          </div>
          <a
            href="https://bamf.com"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-accent hover:underline"
          >
            Enterprise agent systems <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

function Ownership({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="border-b border-foreground/14 py-6 md:border-b-0 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
      <h3 className="font-mono text-xs font-medium text-accent">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-foreground/44" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function EcosystemLink({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <Link href={href} className="group border-t border-foreground/14 py-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-semibold">{title}</h3>
        <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-accent" />
      </div>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </Link>
  );
}
