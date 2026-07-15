import type { ReactNode } from "react";
import { CheckCircle2, Circle, File, Loader2, XCircle } from "lucide-react";
import { resolveArtifactRenderState, type ArtifactBlock, type ArtifactSpec } from "./artifact-spec";
import { cx } from "./utils";

export type ArtifactRendererProps = {
  artifact: ArtifactSpec | string | unknown;
  fallback?: ReactNode;
  className?: string;
};

export function ArtifactRenderer({ artifact, fallback = null, className }: ArtifactRendererProps) {
  const state = resolveArtifactRenderState(artifact);
  if (state.kind === "fallback") return <>{fallback}</>;
  const spec = state.spec;

  return (
    <article
      className={cx("mx-auto w-full max-w-[920px] space-y-5", className)}
      data-artifact-id={spec.id}
    >
      <header className="space-y-1 border-b border-foreground/10 pb-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">{spec.title}</h3>
          {spec.status ? (
            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-foreground/42">
              {spec.status}
            </span>
          ) : null}
        </div>
        {spec.summary ? (
          <p className="text-sm leading-6 text-foreground/58">{spec.summary}</p>
        ) : null}
      </header>
      {spec.blocks.length ? (
        spec.blocks.map((block) => <ArtifactBlockView key={block.id} block={block} />)
      ) : (
        <p className="py-8 text-center text-sm text-foreground/42">
          This artifact has no displayable blocks yet.
        </p>
      )}
    </article>
  );
}

function ArtifactBlockView({ block }: { block: ArtifactBlock }) {
  switch (block.type) {
    case "markdown":
      return (
        <div className="whitespace-pre-wrap text-sm leading-7 text-foreground/76">{block.body}</div>
      );
    case "stat":
      return (
        <section className="border-t border-foreground/10 pt-3">
          <p className="text-xs text-foreground/48">{block.label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <p className="text-2xl font-semibold text-foreground">{block.value}</p>
            {block.delta ? <span className="text-xs text-foreground/48">{block.delta}</span> : null}
          </div>
        </section>
      );
    case "task-list":
      return (
        <section>
          {block.title ? (
            <h4 className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-foreground/48">
              {block.title}
            </h4>
          ) : null}
          <div className="divide-y divide-foreground/10 border-y border-foreground/10">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 py-2.5 text-sm text-foreground/72"
              >
                <TaskIcon status={item.status} />
                <span className="min-w-0 flex-1">{item.label}</span>
                <span className="text-[10px] uppercase tracking-[0.08em] text-foreground/38">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      );
    case "file":
      return (
        <section className="flex items-center gap-3 border-y border-foreground/10 py-3">
          <File className="h-4 w-4 text-foreground/44" />
          <div className="min-w-0 flex-1">
            {block.url ? (
              <a
                href={block.url}
                className="block truncate text-sm font-medium underline-offset-4 hover:underline"
              >
                {block.name}
              </a>
            ) : (
              <p className="truncate text-sm font-medium">{block.name}</p>
            )}
            <p className="text-xs text-foreground/42">{block.mimeType}</p>
          </div>
        </section>
      );
    case "table":
      return (
        <section className="overflow-x-auto">
          {block.title ? <h4 className="mb-2 text-sm font-medium">{block.title}</h4> : null}
          <table className="w-full border-collapse text-left text-xs">
            <thead className="border-y border-foreground/10 text-foreground/46">
              <tr>
                {block.columns.map((column) => (
                  <th
                    key={column.key}
                    className={cx("px-2 py-2 font-medium", alignClass(column.align))}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/10">
              {block.rows.map((row, index) => (
                <tr key={index}>
                  {block.columns.map((column) => (
                    <td
                      key={column.key}
                      className={cx("px-2 py-2.5 text-foreground/72", alignClass(column.align))}
                    >
                      {formatCell(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      );
    case "code":
      return (
        <figure>
          <pre className="overflow-x-auto rounded-[10px] bg-foreground/[0.055] p-4 text-xs leading-6 text-foreground/78">
            <code>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-1.5 text-xs text-foreground/42">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    case "alert":
      return (
        <section className={cx("border-l-2 py-2 pl-3", alertClass(block.tone))}>
          <p className="text-sm font-medium">{block.title}</p>
          {block.body ? (
            <p className="mt-1 text-sm leading-6 text-foreground/58">{block.body}</p>
          ) : null}
        </section>
      );
  }
}

function TaskIcon({ status }: { status: "pending" | "running" | "done" | "failed" }) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "running") return <Loader2 className="h-4 w-4 animate-spin text-foreground/62" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-red-500" />;
  return <Circle className="h-4 w-4 text-foreground/30" />;
}

function alignClass(align?: "left" | "center" | "right") {
  return align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";
}

function alertClass(tone: "info" | "warning" | "error" | "success") {
  if (tone === "success") return "border-emerald-500 text-emerald-700 dark:text-emerald-300";
  if (tone === "warning") return "border-amber-500 text-amber-700 dark:text-amber-300";
  if (tone === "error") return "border-red-500 text-red-700 dark:text-red-300";
  return "border-sky-500 text-sky-700 dark:text-sky-300";
}

function formatCell(value: unknown) {
  if (value === null || value === undefined) return "Not available";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean")
    return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return "Not available";
  }
}
