"use client";

import { faviconUrl, initialsFor } from "./utils";
import type { IntegrationIconProps } from "./types";

export function IntegrationIcon({ integration, size = 20, className = "" }: IntegrationIconProps) {
  const src = integration.iconUrl || faviconUrl(integration.domain);
  const label = integration.label || integration.domain || "Integration";

  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        className={`shrink-0 rounded-[5px] object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-[5px] bg-foreground/[0.08] text-[10px] font-semibold text-foreground/70 ${className}`}
      style={{ width: size, height: size }}
    >
      {initialsFor(label)}
    </span>
  );
}
