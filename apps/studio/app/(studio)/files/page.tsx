import type { Metadata } from "next";
import { FileCode2, FileInput, FileOutput } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Files" };

export default function FilesPage() {
  return (
    <SectionPage
      eyebrow="Context"
      title="Files"
      description="Keep source inputs, generated artifacts, and verification evidence distinct and traceable."
      rows={[
        {
          label: "Inputs",
          detail: "User-selected context with explicit provenance and scope.",
          meta: "Project-owned",
          icon: FileInput,
        },
        {
          label: "Artifacts",
          detail: "Versioned outputs rendered independently from chat text.",
          meta: "agenty.artifact/v1",
          icon: FileOutput,
        },
        {
          label: "Evidence",
          detail: "Test output, eval results, and acceptance records.",
          meta: "Verifiable",
          icon: FileCode2,
        },
      ]}
      note="No upload backend is connected in the reference studio; selecting a file never implies storage or authorization."
    />
  );
}
