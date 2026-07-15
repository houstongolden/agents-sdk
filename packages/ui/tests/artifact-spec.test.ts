import { describe, expect, it } from "vitest";
import {
  ARTIFACT_SCHEMA_VERSION,
  parseArtifactSpec,
  resolveArtifactRenderState,
  safeParseArtifactSpec,
} from "../src/artifact-spec";

describe("ArtifactSpec", () => {
  it("accepts a versioned artifact", () => {
    expect(
      parseArtifactSpec({
        schemaVersion: ARTIFACT_SCHEMA_VERSION,
        id: "artifact-1",
        title: "Plan",
        blocks: [{ id: "body", type: "markdown", body: "Ready" }],
      }),
    ).toMatchObject({ id: "artifact-1", title: "Plan" });
  });

  it("skips malformed and unknown blocks without dropping valid blocks", () => {
    const result = safeParseArtifactSpec({
      schemaVersion: ARTIFACT_SCHEMA_VERSION,
      id: "artifact-2",
      title: "Mixed",
      blocks: [
        { id: "good", type: "stat", label: "Runs", value: 4 },
        { id: "unknown", type: "chart", values: [] },
        { id: "bad-table", type: "table", columns: "nope", rows: [] },
      ],
    });

    expect(result.error).toBeUndefined();
    expect(result.skippedBlocks).toBe(2);
    expect(result.spec?.blocks).toHaveLength(1);
    expect(result.spec?.blocks[0]?.id).toBe("good");
  });

  it("rejects malformed roots and unsupported versions", () => {
    expect(safeParseArtifactSpec("not json").error).toBe("invalid-json");
    expect(safeParseArtifactSpec({ schemaVersion: "agents-sdk.artifact/v2" }).error).toBe(
      "unsupported-version",
    );
    expect(parseArtifactSpec(null)).toBeNull();
  });

  it("selects the renderer fallback for an invalid artifact", () => {
    expect(resolveArtifactRenderState({ schemaVersion: "wrong" })).toEqual({
      kind: "fallback",
      reason: "unsupported-version",
    });
  });
});
