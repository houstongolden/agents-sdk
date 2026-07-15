"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Braces, Layers3, ShieldCheck } from "lucide-react";
import { ChatComposer, starterConnectors } from "@agenty/ui";

const prompts = [
  "Build a support agent with approval before sending refunds",
  "Create a research agent with sources and a durable report artifact",
  "Plan a local-first coding agent with tests and a resumable task ledger",
];

export function ChatHome() {
  const router = useRouter();
  const [draft, setDraft] = useState("");

  function submit(value = draft) {
    const prompt = value.trim();
    if (!prompt) return;
    router.push(`/chat/demo?prompt=${encodeURIComponent(prompt)}`);
  }

  return (
    <main className="min-h-0 flex-1 overflow-y-auto">
      <div className="mx-auto flex min-h-full w-full max-w-5xl flex-col justify-center px-5 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-[860px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-accent">
            Agenty Studio
          </p>
          <h1 className="max-w-3xl text-balance text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Build the agent. Keep the contract.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-6 text-foreground/52 sm:text-base sm:leading-7">
            Start with an outcome. Agenty turns the same shell, progress, tool, artifact, and
            verification contracts into a reusable implementation surface.
          </p>
        </div>

        <div className="mt-8">
          <ChatComposer
            value={draft}
            onChange={setDraft}
            onSubmit={() => submit()}
            connectors={starterConnectors}
            selectedConnectorIds={["github"]}
            contextChips={[{ id: "mode", label: "Local deterministic demo" }]}
            actions={["attach", "mention", "connectors", "mode", "send"]}
            className="px-0 pb-0"
            shellClassName="bg-popover shadow-[0_14px_50px_rgba(0,0,0,0.07)]"
            autoFocus
          />
        </div>

        <div className="mx-auto mt-4 grid w-full max-w-[860px] divide-y divide-foreground/10 border-y border-foreground/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => submit(prompt)}
              className="group flex min-h-20 items-start gap-3 px-3 py-4 text-left text-xs leading-5 text-foreground/54 transition hover:bg-foreground/[0.035] hover:text-foreground md:px-4"
            >
              <span className="min-w-0 flex-1">{prompt}</span>
              <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 grid w-full max-w-[860px] gap-5 text-sm text-foreground/50 sm:grid-cols-3">
          <Capability
            icon={Braces}
            title="Typed contracts"
            body="Chat and artifacts remain separate, versioned state."
          />
          <Capability
            icon={Layers3}
            title="Adapter first"
            body="Provider, auth, data, and runtime stay project-owned."
          />
          <Capability
            icon={ShieldCheck}
            title="Verifiable"
            body="Every starter has deterministic checks and evidence."
          />
        </div>
      </div>
    </main>
  );
}

function Capability({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Braces;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground/36" />
      <div>
        <p className="font-medium text-foreground/72">{title}</p>
        <p className="mt-1 text-xs leading-5">{body}</p>
      </div>
    </div>
  );
}
