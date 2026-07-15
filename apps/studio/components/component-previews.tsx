"use client";

import { useState } from "react";
import {
  AgentChat,
  ArtifactRenderer,
  ArtifactWorkspace,
  ChatComposer,
  HumanApproval,
  ARTIFACT_SCHEMA_VERSION,
  type ApprovalStatus,
} from "@agents-sdk/ui";

export function AgentChatPreview() {
  const [draft, setDraft] = useState("");
  return (
    <AgentChat
      className="min-h-[430px]"
      header={
        <div>
          <p className="text-sm font-medium">Support triage</p>
          <p className="font-mono text-[11px] text-muted">transport: host-owned</p>
        </div>
      }
      messages={[
        {
          id: "user",
          role: "user",
          content: "Summarize the failed webhook and suggest a safe retry.",
        },
        {
          id: "tool",
          role: "tool",
          label: "get_webhook_event",
          content: "Read event evt_0192. No external write performed.",
        },
        {
          id: "assistant",
          role: "assistant",
          content:
            "The endpoint returned 429 after two attempts. I can prepare a delayed retry for approval.",
        },
      ]}
      composer={
        <ChatComposer
          value={draft}
          onChange={setDraft}
          onSubmit={() => setDraft("")}
          placeholder="Ask about the event"
          actions={["attach", "mention", "send"]}
        />
      }
    />
  );
}

export function HumanApprovalPreview() {
  const [status, setStatus] = useState<ApprovalStatus>("pending");
  return (
    <div className="mx-auto max-w-2xl py-8">
      <HumanApproval
        title="Retry webhook delivery"
        description="The agent prepared a write action after inspecting the failed event. Confirm before it enters the delivery queue."
        action="POST the original payload to the configured customer endpoint"
        impact="One external request, recorded against event evt_0192"
        status={status}
        onApprove={() => setStatus("approved")}
        onReject={() => setStatus("rejected")}
      />
      {status !== "pending" ? (
        <button
          type="button"
          onClick={() => setStatus("pending")}
          className="mt-3 font-mono text-xs text-accent hover:underline"
        >
          Reset preview
        </button>
      ) : null}
    </div>
  );
}

const exampleArtifact = {
  schemaVersion: ARTIFACT_SCHEMA_VERSION,
  id: "support-runbook",
  title: "Webhook recovery runbook",
  summary: "A versioned output produced from the inspected event and current retry policy.",
  status: "complete" as const,
  blocks: [
    {
      id: "summary",
      type: "markdown" as const,
      body: "The endpoint is healthy again. Retry only the failed event after approval.",
    },
    {
      id: "tasks",
      type: "task-list" as const,
      title: "Recovery checks",
      items: [
        { id: "inspect", label: "Inspect the failed delivery", status: "done" as const },
        { id: "health", label: "Confirm endpoint health", status: "done" as const },
        { id: "approve", label: "Approve one retry", status: "pending" as const },
      ],
    },
  ],
};

export function ArtifactWorkspacePreview() {
  const [tab, setTab] = useState("artifact");
  return (
    <ArtifactWorkspace
      title="Webhook recovery runbook"
      status="complete"
      tabs={[
        { id: "artifact", label: "Artifact" },
        { id: "history", label: "Versions", count: 1 },
      ]}
      activeTab={tab}
      onTabChange={setTab}
    >
      {tab === "artifact" ? (
        <ArtifactRenderer artifact={exampleArtifact} />
      ) : (
        <div className="py-12 text-center text-sm text-muted">
          Version history is supplied by the host persistence adapter.
        </div>
      )}
    </ArtifactWorkspace>
  );
}
