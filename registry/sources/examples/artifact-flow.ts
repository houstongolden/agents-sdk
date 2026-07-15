export interface ReportArtifact {
  schemaVersion: "example.report/v1";
  id: string;
  title: string;
  markdown: string;
}

export function parseReportArtifact(value: unknown): ReportArtifact {
  if (!value || typeof value !== "object") throw new Error("Artifact must be an object");
  const record = value as Record<string, unknown>;
  if (
    record.schemaVersion !== "example.report/v1" ||
    typeof record.id !== "string" ||
    typeof record.title !== "string" ||
    typeof record.markdown !== "string"
  )
    throw new Error("Invalid report artifact");
  return record as unknown as ReportArtifact;
}
