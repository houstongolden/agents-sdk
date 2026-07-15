"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({
  command,
  label = "Copy command",
}: {
  command: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="flex min-w-0 items-center border border-foreground/16 bg-popover">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap px-3.5 py-3 font-mono text-xs sm:text-sm">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        className="grid h-11 w-11 shrink-0 place-items-center border-l border-foreground/12 text-muted transition hover:bg-foreground/[0.05] hover:text-foreground active:translate-y-px"
        aria-label={copied ? "Copied" : label}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
