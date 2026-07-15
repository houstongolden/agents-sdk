"use client";

import { useId, type ReactNode } from "react";
import { AlertTriangle, Check, X } from "lucide-react";
import { cx } from "./utils";

export type ApprovalStatus = "pending" | "approved" | "rejected" | "expired";

export type HumanApprovalProps = {
  title: string;
  description: ReactNode;
  action: string;
  impact: string;
  status?: ApprovalStatus;
  approveLabel?: string;
  rejectLabel?: string;
  onApprove?: () => void;
  onReject?: () => void;
  className?: string;
};

/** Consequential-action boundary. Execution remains host-owned. */
export function HumanApproval({
  title,
  description,
  action,
  impact,
  status = "pending",
  approveLabel = "Approve action",
  rejectLabel = "Reject",
  onApprove,
  onReject,
  className,
}: HumanApprovalProps) {
  const titleId = useId();
  const resolved = status !== "pending";
  return (
    <section
      aria-labelledby={titleId}
      className={cx("border border-foreground/14 bg-background", className)}
    >
      <div className="flex gap-3 border-b border-foreground/10 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-foreground/58" aria-hidden="true" />
        <div>
          <h3 id={titleId} className="text-sm font-semibold text-foreground">
            {title}
          </h3>
          <div className="mt-1 text-sm leading-6 text-foreground/62">{description}</div>
        </div>
      </div>
      <dl className="grid sm:grid-cols-2">
        <div className="border-b border-foreground/10 p-4 sm:border-b-0 sm:border-r">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/42">
            Action
          </dt>
          <dd className="mt-1 text-sm text-foreground/72">{action}</dd>
        </div>
        <div className="p-4">
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/42">
            Impact
          </dt>
          <dd className="mt-1 text-sm text-foreground/72">{impact}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-foreground/10 p-3">
        <p aria-live="polite" className="font-mono text-xs text-foreground/52">
          {status === "pending" ? "Awaiting a decision" : `Decision: ${status}`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={resolved}
            onClick={onReject}
            className="inline-flex h-9 items-center gap-1.5 border border-foreground/16 px-3 text-xs font-medium text-foreground transition hover:bg-foreground/[0.05] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            {rejectLabel}
          </button>
          <button
            type="button"
            disabled={resolved}
            onClick={onApprove}
            className="inline-flex h-9 items-center gap-1.5 bg-foreground px-3 text-xs font-medium text-background transition hover:opacity-88 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {approveLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
