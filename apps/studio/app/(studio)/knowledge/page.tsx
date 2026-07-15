import type { Metadata } from "next";
import { BookOpen, Braces, ShieldCheck } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Knowledge" };

export default function KnowledgePage() {
  return (
    <SectionPage
      eyebrow="Context"
      title="Knowledge"
      description="Make instructions, sources, schemas, and memory boundaries inspectable before they enter an agent run."
      rows={[
        {
          label: "Instructions",
          detail: "Versioned behavior and project-local deviations.",
          meta: "Scoped",
          icon: BookOpen,
        },
        {
          label: "Contracts",
          detail: "Typed event, tool, artifact, and approval interfaces.",
          meta: "Versioned",
          icon: Braces,
        },
        {
          label: "Trust boundary",
          detail: "Private memory and credentials remain outside distributable context.",
          meta: "Protected",
          icon: ShieldCheck,
        },
      ]}
      note="Agenty distributes contracts and references; You.md and project-owned stores retain identity and private memory."
    />
  );
}
