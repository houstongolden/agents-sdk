import type { Metadata } from "next";
import { GitBranch, Mail, MessageSquareMore } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Connectors" };

export default function ConnectorsPage() {
  return (
    <SectionPage
      eyebrow="Capabilities"
      title="Connectors"
      description="Catalog availability, user selection, and authenticated connection health are separate contracts."
      rows={[
        {
          label: "GitHub",
          detail: "Repository context and synchronization adapter example.",
          meta: "Not connected",
          icon: GitBranch,
        },
        {
          label: "Gmail",
          detail: "Read and draft capability example with write approval required.",
          meta: "Not connected",
          icon: Mail,
        },
        {
          label: "Slack",
          detail: "Workspace search and draft capability example.",
          meta: "Not connected",
          icon: MessageSquareMore,
        },
      ]}
      note="These are catalog examples only. The studio performs no OAuth and never represents selection as a live connection."
    />
  );
}
