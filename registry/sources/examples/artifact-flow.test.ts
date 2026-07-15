import { describe, expect, it } from "vitest";
import { parseReportArtifact } from "./artifact-flow";

describe("artifact flow example", () => {
  it("rejects unversioned model output", () => {
    expect(() => parseReportArtifact({ title: "Missing contract" })).toThrow(
      "Invalid report artifact",
    );
  });
});
