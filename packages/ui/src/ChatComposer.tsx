"use client";

import type { KeyboardEvent } from "react";
import {
  ArrowUp,
  AtSign,
  Mic,
  Paperclip,
  Plug,
  Settings2,
  SlidersHorizontal,
  Square,
} from "lucide-react";
import { IntegrationIcon } from "./IntegrationIcon";
import type {
  ChatComposerProps,
  ComposerAction,
  ComposerToolbarAction,
  ConnectorCatalogEntry,
  IntegrationSummary,
} from "./types";
import { cx } from "./utils";

const ACTION_ICONS = {
  attach: Paperclip,
  mention: AtSign,
  connectors: Plug,
  voice: Mic,
  model: Settings2,
  mode: SlidersHorizontal,
  "media-options": SlidersHorizontal,
} satisfies Partial<Record<ComposerAction, typeof Paperclip>>;

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  disabled,
  running,
  placeholder = "Ask the agent to build, search, draft, or repair...",
  selectedConnectorIds = [],
  connectors = [],
  integrations = [],
  contextChips = [],
  actions = ["attach", "mention", "connectors", "voice", "send"],
  onAction,
  className,
  shellClassName,
  textareaClassName,
  toolbarClassName,
  autoFocus,
  submitOnEnter = true,
}: ChatComposerProps) {
  const connectorCatalog = connectors.length > 0 ? connectors : integrations;
  const selectedIntegrations = selectedConnectorIds
    .map((id) => connectorCatalog.find((connector) => connector.id === id))
    .filter(Boolean) as Array<ConnectorCatalogEntry | IntegrationSummary>;

  function onKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (submitOnEnter && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!disabled && value.trim()) onSubmit();
    }
  }

  const canSend = Boolean(value.trim()) && !disabled;
  const showStop = running && actions.includes("stop");

  return (
    <div className={cx("w-full px-4 pb-4", className)}>
      <div className="mx-auto max-w-[860px]">
        <div
          className={cx(
            "rounded-[16px] border border-foreground/12 bg-background px-3 py-2.5 shadow-sm transition focus-within:border-foreground/24",
            shellClassName,
          )}
        >
          {contextChips.length || selectedIntegrations.length ? (
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              {contextChips.map((chip) => (
                <span
                  key={chip.id}
                  className="inline-flex h-7 max-w-full items-center gap-1.5 rounded-[7px] bg-foreground/[0.055] px-2 text-xs text-foreground/68"
                >
                  {chip.icon}
                  <span className="truncate">{chip.label}</span>
                </span>
              ))}
              {selectedIntegrations.map((integration) => (
                <span
                  key={integration.id}
                  className="inline-flex h-7 max-w-full items-center gap-1.5 rounded-[7px] bg-foreground/[0.055] px-2 text-xs text-foreground/68"
                >
                  <IntegrationIcon integration={integration} size={16} />
                  <span className="truncate">{integration.label}</span>
                </span>
              ))}
            </div>
          ) : null}

          <textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            autoFocus={autoFocus}
            className={cx(
              "block max-h-[180px] min-h-10 w-full resize-none border-0 bg-transparent px-1 py-2 text-[15px] leading-6 text-foreground outline-none shadow-none placeholder:text-foreground/38 focus:border-0 focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0",
              textareaClassName,
            )}
          />

          <div
            className={cx("mt-1 flex min-h-9 items-center justify-between gap-2", toolbarClassName)}
          >
            <div className="flex min-w-0 flex-wrap items-center gap-1">
              {actions.filter(isToolbarAction).map((action) => {
                const Icon = ACTION_ICONS[action];
                if (!Icon) return null;
                return (
                  <button
                    key={action}
                    type="button"
                    onClick={() => onAction?.(action)}
                    disabled={disabled}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] text-foreground/52 transition hover:bg-foreground/[0.065] hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={labelForAction(action)}
                    title={labelForAction(action)}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={showStop ? onStop : onSubmit}
              disabled={showStop ? !onStop : !canSend}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
              aria-label={showStop ? "Stop agent" : "Send message"}
            >
              {showStop ? (
                <Square className="h-3.5 w-3.5 fill-current" />
              ) : (
                <ArrowUp className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function labelForAction(action: ComposerToolbarAction) {
  switch (action) {
    case "attach":
      return "Attach file";
    case "mention":
      return "Add context";
    case "connectors":
      return "Choose connectors";
    case "voice":
      return "Voice input";
    case "model":
      return "Choose model";
    case "mode":
      return "Choose mode";
    case "media-options":
      return "Media options";
  }
}

function isToolbarAction(action: ComposerAction): action is ComposerToolbarAction {
  return action !== "send" && action !== "stop";
}
