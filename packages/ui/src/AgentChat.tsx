import type { ReactNode } from "react";
import { cx } from "./utils";

export type AgentChatMessage = {
  id: string;
  role: "user" | "assistant" | "tool";
  content: ReactNode;
  label?: string;
};

export type AgentChatProps = {
  messages: AgentChatMessage[];
  composer: ReactNode;
  header?: ReactNode;
  empty?: ReactNode;
  ariaLabel?: string;
  className?: string;
};

/**
 * Presentational chat frame. The host owns transport, persistence, tool state,
 * approvals, and the composer controller.
 */
export function AgentChat({
  messages,
  composer,
  header,
  empty,
  ariaLabel = "Agent conversation",
  className,
}: AgentChatProps) {
  return (
    <section
      aria-label={ariaLabel}
      className={cx(
        "flex min-h-[460px] flex-col overflow-hidden border border-foreground/12 bg-background",
        className,
      )}
    >
      {header ? (
        <header className="border-b border-foreground/10 px-4 py-3">{header}</header>
      ) : null}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-6">
        {messages.length
          ? messages.map((message) => (
              <article
                key={message.id}
                className={cx(
                  "text-sm leading-6",
                  message.role === "user"
                    ? "ml-auto max-w-[82%] bg-foreground/[0.06] px-3 py-2"
                    : "max-w-[90%] text-foreground/72",
                  message.role === "tool" &&
                    "border-l-2 border-foreground/16 py-1 pl-3 font-mono text-xs text-foreground/58",
                )}
              >
                {message.label ? (
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/42">
                    {message.label}
                  </p>
                ) : null}
                {message.content}
              </article>
            ))
          : (empty ?? (
              <p className="py-16 text-center text-sm text-foreground/46">No messages yet.</p>
            ))}
      </div>
      <div className="shrink-0 border-t border-foreground/10 pt-3">{composer}</div>
    </section>
  );
}
