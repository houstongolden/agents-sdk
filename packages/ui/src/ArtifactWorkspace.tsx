"use client";

import type { ReactNode } from "react";
import { cx } from "./utils";

export type ArtifactWorkspaceTab = {
  id: string;
  label: string;
  count?: number;
};

export type ArtifactWorkspaceProps = {
  title: string;
  status?: string;
  tabs?: ArtifactWorkspaceTab[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: ReactNode;
  className?: string;
};

/** Durable-output frame. Parsing and persistence remain host-owned. */
export function ArtifactWorkspace({
  title,
  status,
  tabs = [],
  activeTab,
  onTabChange,
  children,
  className,
}: ArtifactWorkspaceProps) {
  return (
    <section className={cx("overflow-hidden border border-foreground/12 bg-background", className)}>
      <header className="flex min-h-12 flex-wrap items-center justify-between gap-3 border-b border-foreground/10 px-4 py-2.5">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {status ? <span className="font-mono text-xs text-foreground/48">{status}</span> : null}
      </header>
      {tabs.length ? (
        <div className="flex overflow-x-auto border-b border-foreground/10 px-2" role="tablist">
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onTabChange?.(tab.id)}
                className={cx(
                  "min-h-10 shrink-0 border-b-2 px-3 text-xs transition",
                  selected
                    ? "border-foreground text-foreground"
                    : "border-transparent text-foreground/48 hover:text-foreground",
                )}
              >
                {tab.label}
                {tab.count !== undefined ? ` (${tab.count})` : ""}
              </button>
            );
          })}
        </div>
      ) : null}
      <div className="max-h-[520px] overflow-auto p-4 sm:p-5">{children}</div>
    </section>
  );
}
