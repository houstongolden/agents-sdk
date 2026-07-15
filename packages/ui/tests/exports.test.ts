import { describe, expect, it } from "vitest";
import { AgentChat, ArtifactWorkspace, HumanApproval } from "../src";

describe("public component exports", () => {
  it("exposes the v0.1 agent UI collection", () => {
    expect(AgentChat).toBeTypeOf("function");
    expect(HumanApproval).toBeTypeOf("function");
    expect(ArtifactWorkspace).toBeTypeOf("function");
  });
});
