import type { Metadata } from "next";
import { DefinitionList, DocPage, DocSection } from "@/components/doc-page";

export const metadata: Metadata = { title: "Agents & Skills" };

export default function AgentsPage() {
  return (
    <DocPage
      kind="Catalog"
      title="Agents & Skills"
      summary="Agent and skill contracts define goals, tools, instructions, stop conditions, and observable state without coupling the UI to one provider."
    >
      <DocSection title="Reference contract: support triage">
        <DefinitionList
          items={[
            {
              term: "Input",
              detail: "A customer message plus explicit account and product context.",
            },
            {
              term: "Tools",
              detail:
                "Read ticket, search knowledge, draft reply, and request an approved account action.",
            },
            {
              term: "Output",
              detail: "A typed resolution, cited evidence, confidence, and any pending approval.",
            },
            {
              term: "Stop",
              detail:
                "Resolution drafted, human input required, approval required, or bounded tool budget reached.",
            },
            {
              term: "Evidence",
              detail:
                "Tool inputs, outputs, decision state, and artifact version remain inspectable.",
            },
          ]}
        />
        <p className="font-mono text-xs text-muted">
          Maturity: experimental contract. No packaged runtime in v0.1.
        </p>
      </DocSection>
      <DocSection title="Required boundaries">
        <p>
          An agent definition must not contain credentials, hidden authorization, or
          provider-specific UI state. The host maps the contract to its model, transport,
          persistence, and observability stack.
        </p>
      </DocSection>
      <DocSection title="Skill boundary">
        <p>
          A skill packages durable instructions, references, and verification guidance. It may shape
          agent behavior, but it does not silently grant tools, credentials, or production
          authorization.
        </p>
      </DocSection>
      <DocSection title="Before production">
        <p>
          Test tool argument validation, stop behavior, approval resumption, duplicate delivery, and
          replay safety. Treat a natural-language success message as presentation, not proof of a
          completed side effect.
        </p>
      </DocSection>
    </DocPage>
  );
}
