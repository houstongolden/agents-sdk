"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArtifactRenderer, ChatComposer, RightPane, starterConnectors } from "@agenty/ui";
import {
  CheckCircle2,
  Circle,
  FileText,
  ListChecks,
  Loader2,
  PanelRight,
  RotateCcw,
  TerminalSquare,
} from "lucide-react";
import {
  applyDemoStreamPart,
  createDemoSequence,
  createInitialDemoState,
  type DemoProgress,
  type DemoRunState,
} from "@/lib/demo-stream";

const DEFAULT_PROMPT =
  "Build a reusable support agent with visible progress and a durable implementation artifact.";

export function DemoSession({ initialPrompt = DEFAULT_PROMPT }: { initialPrompt?: string }) {
  const [draft, setDraft] = useState("");
  const [activePrompt, setActivePrompt] = useState(initialPrompt);
  const [run, setRun] = useState<DemoRunState>(() => createInitialDemoState());
  const [paneOpen, setPaneOpen] = useState(true);
  const [paneMode, setPaneMode] = useState("progress");
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];
  }, []);

  const startRun = useCallback(
    (prompt: string) => {
      clearTimers();
      setActivePrompt(prompt);
      setRun({ ...createInitialDemoState(), status: "running" });
      setPaneOpen(true);
      setPaneMode("progress");

      for (const event of createDemoSequence(prompt)) {
        const timer = setTimeout(() => {
          setRun((current) => applyDemoStreamPart(current, event.part));
          if (event.part.type === "artifact") setPaneMode("artifact");
        }, event.delayMs);
        timers.current.push(timer);
      }
    },
    [clearTimers],
  );

  useEffect(() => {
    startRun(initialPrompt);
    return clearTimers;
  }, [clearTimers, initialPrompt, startRun]);

  function submit() {
    const prompt = draft.trim();
    if (!prompt) return;
    setDraft("");
    startRun(prompt);
  }

  function stop() {
    clearTimers();
    setRun((current) => ({ ...current, status: "stopped" }));
  }

  const rightPane = (
    <RightPane
      title="Reference output"
      open={paneOpen}
      activeMode={paneMode}
      onModeChange={setPaneMode}
      onClose={() => setPaneOpen(false)}
      width={480}
      modes={[
        {
          id: "progress",
          label: "Progress",
          icon: ListChecks,
          badge: run.progress.filter((phase) => phase.status === "done").length,
        },
        {
          id: "artifact",
          label: "Artifact",
          icon: FileText,
          ...(run.artifact ? { badge: 1 } : {}),
        },
      ]}
    >
      {(mode) =>
        mode === "artifact" ? (
          run.artifact ? (
            <ArtifactRenderer
              artifact={run.artifact}
              fallback={<PaneEmpty label="Artifact unavailable" />}
            />
          ) : (
            <PaneEmpty label="The versioned artifact will appear after the compose phase." />
          )
        ) : (
          <ProgressPane run={run} />
        )
      }
    </RightPane>
  );

  return (
    <div className="relative flex min-h-0 flex-1 overflow-hidden">
      <section className="relative flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-foreground/10 px-4 sm:px-5">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-medium">Deterministic reference build</h1>
            <p className="truncate text-[11px] text-foreground/40">
              No provider key · no auth · no external writes
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => startRun(activePrompt)}
              className="inline-flex h-8 items-center gap-1.5 rounded-[7px] px-2 text-xs text-foreground/52 hover:bg-foreground/[0.055] hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Replay</span>
            </button>
            {!paneOpen ? (
              <button
                type="button"
                onClick={() => setPaneOpen(true)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[7px] text-foreground/52 hover:bg-foreground/[0.055] hover:text-foreground"
                aria-label="Open reference output"
              >
                <PanelRight className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-7 sm:px-8">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">
            <div className="ml-auto max-w-[86%] rounded-[14px] bg-foreground/[0.065] px-3.5 py-2.5 text-sm leading-6">
              {activePrompt}
            </div>

            <div className="max-w-[90%] text-sm leading-7 text-foreground/72">
              <p>
                I’ll translate that into contracts, inspect the reusable local package, build a
                versioned artifact, and verify the result.
              </p>
            </div>

            {run.toolCalls.length ? (
              <div className="max-w-2xl border-y border-foreground/10">
                {run.toolCalls.map((call) => (
                  <div key={call.id} className="flex items-center gap-3 py-2.5 text-xs">
                    {call.status === "complete" ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-foreground/46" />
                    )}
                    <TerminalSquare className="h-3.5 w-3.5 shrink-0 text-foreground/38" />
                    <span className="min-w-0 flex-1 truncate font-medium text-foreground/68">
                      {call.label}
                    </span>
                    <span className="hidden truncate text-foreground/38 sm:block">
                      {call.detail}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {run.response ? (
              <div className="max-w-[90%] text-sm leading-7 text-foreground/72">{run.response}</div>
            ) : run.status === "running" ? (
              <div className="flex items-center gap-2 text-xs text-foreground/42">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Agenty is working through the fixed build phases
              </div>
            ) : run.status === "stopped" ? (
              <div className="text-sm text-foreground/48">
                Run stopped. Replay it or send a new request.
              </div>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 bg-gradient-to-t from-background via-background to-transparent pt-4">
          <ChatComposer
            value={draft}
            onChange={setDraft}
            onSubmit={submit}
            onStop={stop}
            running={run.status === "running"}
            connectors={starterConnectors}
            selectedConnectorIds={["github"]}
            contextChips={[{ id: "runtime", label: "Local deterministic runtime" }]}
            actions={["attach", "mention", "connectors", "mode", "stop", "send"]}
            placeholder="Describe another agent to build..."
          />
        </div>
      </section>

      {paneOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[1px] xl:hidden"
          aria-label="Close reference output"
          onClick={() => setPaneOpen(false)}
        />
      ) : null}
      {rightPane}
    </div>
  );
}

function ProgressPane({ run }: { run: DemoRunState }) {
  return (
    <div className="space-y-7">
      <section>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/46">
            Build phases
          </h3>
          <span className="text-[10px] uppercase tracking-[0.1em] text-foreground/36">
            {run.status}
          </span>
        </div>
        <div className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
          {run.progress.map((phase) => (
            <ProgressRow key={phase.id} phase={phase} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-foreground/46">
          Tool activity
        </h3>
        <div className="mt-3 space-y-3">
          {run.toolCalls.length ? (
            run.toolCalls.map((call) => (
              <div key={call.id} className="flex gap-3 text-sm">
                <TerminalSquare className="mt-0.5 h-4 w-4 shrink-0 text-foreground/38" />
                <div className="min-w-0">
                  <p className="font-medium text-foreground/70">{call.name}</p>
                  <p className="mt-0.5 text-xs leading-5 text-foreground/42">{call.detail}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-foreground/42">Tool calls will appear as typed run state.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function ProgressRow({ phase }: { phase: DemoProgress }) {
  return (
    <div className="flex gap-3 py-3">
      {phase.status === "done" ? (
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      ) : phase.status === "running" ? (
        <Loader2 className="mt-0.5 h-4 w-4 shrink-0 animate-spin text-foreground/50" />
      ) : (
        <Circle className="mt-0.5 h-4 w-4 shrink-0 text-foreground/22" />
      )}
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground/70">{phase.label}</p>
        <p className="mt-0.5 text-xs leading-5 text-foreground/42">{phase.detail}</p>
      </div>
    </div>
  );
}

function PaneEmpty({ label }: { label: string }) {
  return <p className="py-16 text-center text-sm leading-6 text-foreground/42">{label}</p>;
}
