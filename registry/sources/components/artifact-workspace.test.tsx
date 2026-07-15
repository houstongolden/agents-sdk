import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ArtifactWorkspace } from "./artifact-workspace";

describe("ArtifactWorkspace", () => {
  it("renders the public controlled-tab contract", () => {
    const html = renderToStaticMarkup(
      <ArtifactWorkspace
        title="Resolution"
        activeTab="final"
        tabs={[{ id: "final", label: "Final" }]}
      >
        ready
      </ArtifactWorkspace>,
    );
    expect(html).toContain("ready");
    expect(html).toContain('aria-selected="true"');
  });
});
