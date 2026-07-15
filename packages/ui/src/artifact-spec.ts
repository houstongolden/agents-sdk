export const ARTIFACT_SCHEMA_VERSION = "agents-sdk.artifact/v1" as const;

export type ArtifactTaskStatus = "pending" | "running" | "done" | "failed";
export type ArtifactAlertTone = "info" | "warning" | "error" | "success";

type ArtifactBlockBase = { id: string };

export type ArtifactBlock =
  | (ArtifactBlockBase & { type: "markdown"; body: string })
  | (ArtifactBlockBase & { type: "stat"; label: string; value: string | number; delta?: string })
  | (ArtifactBlockBase & {
      type: "task-list";
      title?: string;
      items: Array<{ id: string; label: string; status: ArtifactTaskStatus }>;
    })
  | (ArtifactBlockBase & { type: "file"; name: string; mimeType: string; url?: string })
  | (ArtifactBlockBase & {
      type: "table";
      title?: string;
      columns: Array<{ key: string; label: string; align?: "left" | "center" | "right" }>;
      rows: Array<Record<string, unknown>>;
    })
  | (ArtifactBlockBase & { type: "code"; code: string; language?: string; caption?: string })
  | (ArtifactBlockBase & { type: "alert"; tone: ArtifactAlertTone; title: string; body?: string });

export type ArtifactSpec = {
  schemaVersion: typeof ARTIFACT_SCHEMA_VERSION;
  id: string;
  title: string;
  summary?: string;
  status?: "draft" | "streaming" | "complete" | "error";
  blocks: ArtifactBlock[];
};

export type ArtifactParseResult = {
  spec: ArtifactSpec | null;
  skippedBlocks: number;
  error?: "invalid-json" | "invalid-root" | "unsupported-version";
};

export type ArtifactRenderState =
  | { kind: "artifact"; spec: ArtifactSpec; skippedBlocks: number }
  | { kind: "fallback"; reason: NonNullable<ArtifactParseResult["error"]> };

/**
 * Validates the versioned envelope and independently validates each block.
 * A malformed envelope is rejected; malformed blocks are skipped so one bad
 * tool payload cannot blank the entire work pane.
 */
export function safeParseArtifactSpec(input: unknown): ArtifactParseResult {
  let value = input;
  if (typeof input === "string") {
    try {
      value = JSON.parse(input) as unknown;
    } catch {
      return { spec: null, skippedBlocks: 0, error: "invalid-json" };
    }
  }

  if (!isRecord(value)) {
    return { spec: null, skippedBlocks: 0, error: "invalid-root" };
  }
  if (value.schemaVersion !== ARTIFACT_SCHEMA_VERSION) {
    return { spec: null, skippedBlocks: 0, error: "unsupported-version" };
  }
  if (
    !isNonEmptyString(value.id) ||
    !isNonEmptyString(value.title) ||
    !Array.isArray(value.blocks)
  ) {
    return { spec: null, skippedBlocks: 0, error: "invalid-root" };
  }

  const blocks: ArtifactBlock[] = [];
  for (const block of value.blocks) {
    const parsed = parseArtifactBlock(block);
    if (parsed) blocks.push(parsed);
  }

  return {
    spec: {
      schemaVersion: ARTIFACT_SCHEMA_VERSION,
      id: value.id,
      title: value.title,
      ...(isString(value.summary) ? { summary: value.summary } : {}),
      ...(isArtifactStatus(value.status) ? { status: value.status } : {}),
      blocks,
    },
    skippedBlocks: value.blocks.length - blocks.length,
  };
}

export function parseArtifactSpec(input: unknown): ArtifactSpec | null {
  return safeParseArtifactSpec(input).spec;
}

/** Pure render decision used by ArtifactRenderer and non-React consumers. */
export function resolveArtifactRenderState(input: unknown): ArtifactRenderState {
  const result = safeParseArtifactSpec(input);
  if (result.spec) {
    return { kind: "artifact", spec: result.spec, skippedBlocks: result.skippedBlocks };
  }
  return { kind: "fallback", reason: result.error ?? "invalid-root" };
}

function parseArtifactBlock(value: unknown): ArtifactBlock | null {
  if (!isRecord(value) || !isNonEmptyString(value.id) || !isString(value.type)) return null;

  switch (value.type) {
    case "markdown":
      return isString(value.body) ? { id: value.id, type: "markdown", body: value.body } : null;
    case "stat":
      return isNonEmptyString(value.label) &&
        (isString(value.value) || typeof value.value === "number")
        ? {
            id: value.id,
            type: "stat",
            label: value.label,
            value: value.value,
            ...(isString(value.delta) ? { delta: value.delta } : {}),
          }
        : null;
    case "task-list": {
      if (!Array.isArray(value.items)) return null;
      const items = value.items.filter(isArtifactTask);
      if (items.length !== value.items.length) return null;
      return {
        id: value.id,
        type: "task-list",
        ...(isString(value.title) ? { title: value.title } : {}),
        items,
      };
    }
    case "file":
      return isNonEmptyString(value.name) && isNonEmptyString(value.mimeType)
        ? {
            id: value.id,
            type: "file",
            name: value.name,
            mimeType: value.mimeType,
            ...(isString(value.url) ? { url: value.url } : {}),
          }
        : null;
    case "table": {
      if (!Array.isArray(value.columns) || !value.columns.every(isArtifactColumn)) return null;
      if (!Array.isArray(value.rows) || !value.rows.every(isRecord)) return null;
      return {
        id: value.id,
        type: "table",
        ...(isString(value.title) ? { title: value.title } : {}),
        columns: value.columns,
        rows: value.rows,
      };
    }
    case "code":
      return isString(value.code)
        ? {
            id: value.id,
            type: "code",
            code: value.code,
            ...(isString(value.language) ? { language: value.language } : {}),
            ...(isString(value.caption) ? { caption: value.caption } : {}),
          }
        : null;
    case "alert":
      return isArtifactAlertTone(value.tone) && isNonEmptyString(value.title)
        ? {
            id: value.id,
            type: "alert",
            tone: value.tone,
            title: value.title,
            ...(isString(value.body) ? { body: value.body } : {}),
          }
        : null;
    default:
      return null;
  }
}

function isArtifactTask(
  value: unknown,
): value is { id: string; label: string; status: ArtifactTaskStatus } {
  return (
    isRecord(value) &&
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.label) &&
    isArtifactTaskStatus(value.status)
  );
}

function isArtifactColumn(
  value: unknown,
): value is { key: string; label: string; align?: "left" | "center" | "right" } {
  return (
    isRecord(value) &&
    isNonEmptyString(value.key) &&
    isNonEmptyString(value.label) &&
    (value.align === undefined ||
      value.align === "left" ||
      value.align === "center" ||
      value.align === "right")
  );
}

function isArtifactStatus(value: unknown): value is NonNullable<ArtifactSpec["status"]> {
  return value === "draft" || value === "streaming" || value === "complete" || value === "error";
}

function isArtifactTaskStatus(value: unknown): value is ArtifactTaskStatus {
  return value === "pending" || value === "running" || value === "done" || value === "failed";
}

function isArtifactAlertTone(value: unknown): value is ArtifactAlertTone {
  return value === "info" || value === "warning" || value === "error" || value === "success";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
