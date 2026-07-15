import type { Metadata } from "next";
import { Activity, FolderKanban, MessageSquare } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <SectionPage
      eyebrow="Workspace"
      title="Projects"
      description="Bind agent sessions, files, artifacts, tasks, and verification evidence to a durable project boundary."
      rows={[
        {
          label: "Agenty Studio",
          detail: "Reference shell and deterministic contract proof.",
          meta: "Active",
          icon: FolderKanban,
        },
        {
          label: "Reference build",
          detail: "Local session demonstrating fixed progress and artifact phases.",
          meta: "Demo",
          icon: MessageSquare,
        },
        {
          label: "Acceptance ledger",
          detail: "Build, test, and review evidence belongs beside project state.",
          meta: "Contract",
          icon: Activity,
        },
      ]}
      note="This reference route is intentionally local-only. A production adapter owns persistence and access control."
    />
  );
}
