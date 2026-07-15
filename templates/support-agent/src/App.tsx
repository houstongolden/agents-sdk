import { useState } from "react";
import { AgentChat } from "../components/agent-chat";
import { ArtifactWorkspace } from "../components/artifact-workspace";
import { HumanApproval, type ApprovalStatus } from "../components/human-approval";
import { offlineSupportAgent, type SupportAgentAdapter } from "./agent-adapter";
import type { Resolution } from "./support-flow";

export function App({ adapter = offlineSupportAgent }: { adapter?: SupportAgentAdapter }) {
  const [status, setStatus] = useState<ApprovalStatus>("pending");
  const [resolution, setResolution] = useState<Resolution | null>(null);
  const inspection = adapter.inspectOrder("order-100");
  function decide(approved: boolean) {
    setStatus(approved ? "approved" : "rejected");
    setResolution(adapter.decideCredit(approved));
  }
  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-6 p-4 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
      <AgentChat
        header={
          <div>
            <h1 className="font-semibold">Support Agent</h1>
            <p className="text-sm opacity-60">Host-owned transport and persistence</p>
          </div>
        }
        messages={[
          { id: "user", role: "user", content: "Where is order-100?" },
          { id: "tool", role: "tool", label: inspection.tool, content: inspection.evidence },
          {
            id: "assistant",
            role: "assistant",
            content: "I found the order and prepared a $25 credit for approval.",
          },
        ]}
        composer={
          <form className="flex gap-2 p-3" onSubmit={(event) => event.preventDefault()}>
            <input
              aria-label="Message"
              className="min-w-0 flex-1 bg-transparent px-2 outline-none"
              placeholder="Ask about an order"
            />
            <button type="submit">Send</button>
          </form>
        }
      />
      <div className="space-y-5">
        <HumanApproval
          title="Issue customer credit"
          description="The agent inspected order-100 before proposing this write."
          action="Issue a $25 account credit"
          impact="One customer balance change"
          status={status}
          onApprove={() => decide(true)}
          onReject={() => decide(false)}
        />
        <ArtifactWorkspace
          title="Resolution artifact"
          status={resolution?.status ?? "awaiting approval"}
          tabs={[{ id: "resolution", label: "Resolution", count: resolution?.artifact ? 1 : 0 }]}
          activeTab="resolution"
        >
          {resolution?.artifact ? (
            <article>
              <h2 className="font-semibold">{resolution.artifact.title}</h2>
              <p className="mt-2">{resolution.artifact.body}</p>
            </article>
          ) : (
            <p className="text-sm opacity-60">
              Approve the proposed action to create a resolution artifact.
            </p>
          )}
        </ArtifactWorkspace>
      </div>
    </main>
  );
}
