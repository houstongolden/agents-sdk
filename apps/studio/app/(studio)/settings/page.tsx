import type { Metadata } from "next";
import { Database, KeyRound, Palette } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <SectionPage
      eyebrow="Studio"
      title="Settings"
      description="Project adapters own theme, runtime, persistence, and credentials without leaking those choices into shared UI."
      rows={[
        {
          label: "Appearance",
          detail: "System light/dark preference with one Agenty accent.",
          meta: "System",
          icon: Palette,
        },
        {
          label: "Runtime",
          detail: "Deterministic local sequence; no model provider configured.",
          meta: "Local",
          icon: Database,
        },
        {
          label: "Credentials",
          detail: "No keys or authenticated accounts are required by this studio.",
          meta: "None",
          icon: KeyRound,
        },
      ]}
      note="Production applications should keep secret values server-side and commit only complete, blank-key environment templates."
    />
  );
}
