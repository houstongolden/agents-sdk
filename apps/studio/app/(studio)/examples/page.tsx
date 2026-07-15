import type { Metadata } from "next";
import Link from "next/link";
import { DocPage, DocSection } from "@/components/doc-page";

export const metadata: Metadata = { title: "Examples" };

const examples = [
  {
    title: "Local UI fixture",
    mode: "Runnable",
    href: "/studio",
    body: "A deterministic browser-only replay of chat, tools, progress, and a versioned artifact.",
  },
  {
    title: "Approval-gated retry",
    mode: "Pattern",
    href: "/patterns/approval-gates",
    body: "The server-side invariants behind pausing and resuming one external write.",
  },
  {
    title: "Support agent",
    mode: "Template",
    href: "/templates/support-agent",
    body: "A complete boundary map for knowledge reads, resolution artifacts, and account actions.",
  },
] as const;

export default function ExamplesPage() {
  return (
    <DocPage
      kind="Catalog"
      title="Examples"
      summary="Small, explicit references that identify what runs, what is simulated, and what your application must provide."
    >
      <DocSection title="Available references">
        <div className="border-t border-foreground/14">
          {examples.map((example) => (
            <Link
              key={example.title}
              href={example.href}
              className="group grid gap-2 border-b border-foreground/14 py-5 sm:grid-cols-[180px_100px_1fr]"
            >
              <strong className="text-foreground">{example.title}</strong>
              <span className="font-mono text-xs text-accent">{example.mode}</span>
              <span>{example.body}</span>
            </Link>
          ))}
        </div>
      </DocSection>
      <DocSection title="Evidence standard">
        <p>
          An example must disclose simulated state, external dependencies, required credentials,
          expected output, and a deterministic verification path. Screenshots and success copy are
          not acceptance evidence.
        </p>
      </DocSection>
    </DocPage>
  );
}
