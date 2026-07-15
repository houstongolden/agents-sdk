import type { Metadata } from "next";
import { CalendarClock, RefreshCw, Siren } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata: Metadata = { title: "Loops" };

export default function LoopsPage() {
  return (
    <SectionPage
      eyebrow="Operations"
      title="Loops"
      description="Recurring agents need explicit cadence, convergence, evidence, and stop conditions."
      rows={[
        {
          label: "Schedule",
          detail: "A project adapter owns cadence, timezone, and durable wakeups.",
          meta: "Adapter",
          icon: CalendarClock,
        },
        {
          label: "Convergence",
          detail: "Every loop declares completion and retry boundaries.",
          meta: "Required",
          icon: RefreshCw,
        },
        {
          label: "Escalation",
          detail: "Failures and consequential writes surface for human review.",
          meta: "Approval",
          icon: Siren,
        },
      ]}
      note="No recurring process runs from this reference route. It documents the contract without creating background work."
    />
  );
}
