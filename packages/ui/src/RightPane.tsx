"use client";

import { PanelRight, X } from "lucide-react";
import type { RightPaneProps } from "./types";
import { cx } from "./utils";

export function RightPane({
  modes,
  activeMode,
  onModeChange,
  children,
  title = "Work pane",
  open = true,
  width = 440,
  onClose,
  className,
  contentClassName,
}: RightPaneProps) {
  if (!open) return null;
  const content = typeof children === "function" ? children(activeMode) : children;

  return (
    <aside
      className={cx(
        "fixed inset-y-0 right-0 z-50 flex max-w-full shrink-0 flex-col border-l border-foreground/10 bg-background shadow-2xl xl:static xl:z-auto xl:shadow-none",
        className,
      )}
      style={{ width: typeof width === "number" ? `min(100vw, ${width}px)` : width }}
      aria-label={title}
    >
      <header className="flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-foreground/10 px-4">
        <div className="flex min-w-0 items-center gap-2">
          <PanelRight className="h-4 w-4 shrink-0 text-foreground/48" />
          <h2 className="truncate text-sm font-medium">{title}</h2>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="flex min-w-0 items-center rounded-[8px] bg-foreground/[0.055] p-1"
            role="tablist"
            aria-label={`${title} modes`}
          >
            {modes.map((mode) => {
              const Icon = mode.icon;
              const active = mode.id === activeMode;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onModeChange(mode.id)}
                  className={cx(
                    "inline-flex h-7 items-center gap-1.5 rounded-[6px] px-2 text-xs transition",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/52 hover:text-foreground",
                  )}
                >
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                  <span className="hidden 2xl:inline">{mode.label}</span>
                  {mode.badge ? <span className="text-[10px] opacity-70">{mode.badge}</span> : null}
                </button>
              );
            })}
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-foreground/52 transition hover:bg-foreground/[0.06] hover:text-foreground"
              aria-label="Close work pane"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </header>
      <div className={cx("min-h-0 flex-1 overflow-y-auto p-5", contentClassName)}>{content}</div>
    </aside>
  );
}
