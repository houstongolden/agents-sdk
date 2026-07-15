import type { Metadata } from "next";
import { DefinitionList, DocPage, DocSection } from "@/components/doc-page";

export const metadata: Metadata = { title: "Tools & MCP" };

export default function ToolsPage() {
  return (
    <DocPage
      kind="Catalog"
      title="Tools & MCP"
      summary="Typed operations and MCP surfaces classified by side effect, authorization requirement, replay behavior, and evidence output."
    >
      <DocSection title="Side-effect classes">
        <DefinitionList
          items={[
            {
              term: "read",
              detail:
                "Retrieves state without changing an external system. Still enforce tenant and scope checks.",
            },
            {
              term: "draft",
              detail: "Creates reversible local state that is not published or sent.",
            },
            {
              term: "write",
              detail:
                "Changes an external system and normally requires an approval or explicit policy grant.",
            },
            {
              term: "destructive",
              detail:
                "Deletes, publishes, pays, deploys, or changes access. Require fresh authorization and durable audit evidence.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="Minimum tool contract">
        <DefinitionList
          items={[
            {
              term: "input schema",
              detail: "Reject unknown and malformed arguments before execution.",
            },
            {
              term: "effect",
              detail: "Declare read, draft, write, or destructive behavior in metadata.",
            },
            { term: "idempotency", detail: "Define how retries avoid duplicate external work." },
            {
              term: "authorization",
              detail: "Resolve tenant, actor, scopes, and approval on the server.",
            },
            {
              term: "evidence",
              detail: "Return a stable operation ID and sanitized result for the run ledger.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="UI contract">
        <p>
          Render requested, running, completed, failed, and approval-required states distinctly. A
          selected connector is user intent, not proof that authentication succeeded.
        </p>
      </DocSection>
      <DocSection title="MCP boundary">
        <p>
          MCP exposes tool and resource contracts across process boundaries. Servers still enforce
          identity, tenant scope, argument validation, approval policy, and sanitized evidence at
          execution time.
        </p>
      </DocSection>
    </DocPage>
  );
}
