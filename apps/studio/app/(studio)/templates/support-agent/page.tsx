import type { Metadata } from "next";
import { Command, DefinitionList, DocPage, DocSection } from "@/components/doc-page";
import { PUBLIC_PACKAGE_NOTE } from "@/lib/catalog";

export const metadata: Metadata = { title: "Support agent template" };

export default function SupportAgentTemplatePage() {
  return (
    <DocPage
      kind="Template"
      title="Support agent"
      summary="A runnable offline reference for support lookup, approval allow or deny, artifact creation, and UI composition."
    >
      <DocSection title="Install">
        <p>{PUBLIC_PACKAGE_NOTE}</p>
        <Command>npx @agents-sdk/cli@latest add support-agent</Command>
        <p>Maturity: preview. The template is an offline reference, not a deployed service.</p>
      </DocSection>
      <DocSection title="Included boundaries">
        <DefinitionList
          items={[
            {
              term: "offline lookup",
              detail: "Deterministic evidence for one known order and null for unknown IDs.",
            },
            {
              term: "allow or deny",
              detail: "Allow creates the demonstrated resolution state. Deny returns no artifact.",
            },
            {
              term: "artifact creation",
              detail: "The tested flow creates a resolution artifact only after allow.",
            },
            {
              term: "UI composition",
              detail: "Agent Chat, Human Approval, and Artifact Workspace render together.",
            },
            {
              term: "application build",
              detail:
                "The copied React, Vite, and Tailwind app provides test, typecheck, and build commands.",
            },
          ]}
        />
      </DocSection>
      <DocSection title="You must supply">
        <p>
          Provider transport, authenticated users, durable approval and artifact persistence,
          external write adapters, secrets, audit retention, queues, deployment, and production
          policy remain application-owned.
        </p>
      </DocSection>
      <DocSection title="Acceptance checks">
        <p>
          Current tests cover known and missing order lookup, allow and deny outcomes, artifact
          creation after allow, and static rendering of the three UI surfaces. The template test
          command also runs typecheck and the application build.
        </p>
      </DocSection>
    </DocPage>
  );
}
