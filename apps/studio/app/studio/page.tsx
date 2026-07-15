import type { Metadata } from "next";
import Link from "next/link";
import { DemoSession } from "@/components/demo-session";

export const metadata: Metadata = {
  title: "Deterministic UI preview",
  description:
    "A browser-only UI fixture with no model, transport, persistence, authentication, or external writes.",
};

export default function StudioPreviewPage() {
  return (
    <main className="flex h-[100dvh] min-h-0 flex-col bg-background">
      <header className="flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-foreground/14 px-4 py-2">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold tracking-[-0.02em]">
            Agents SDK
          </Link>
          <span className="border-l border-foreground/16 pl-3 font-mono text-xs text-muted">
            Deterministic UI preview
          </span>
        </div>
        <p className="font-mono text-[10px] text-muted">No model. No auth. No external writes.</p>
      </header>
      <DemoSession />
    </main>
  );
}
