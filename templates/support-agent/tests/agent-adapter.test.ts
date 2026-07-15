import { describe, expect, it } from "vitest";
import { offlineSupportAgent } from "../src/agent-adapter";

describe("offline support agent adapter", () => {
  it("drives the same evidence and approval state consumed by the UI", () => {
    expect(offlineSupportAgent.inspectOrder("order-100").evidence).toContain("shipped");
    expect(offlineSupportAgent.decideCredit(false).artifact).toBeNull();
  });
});
