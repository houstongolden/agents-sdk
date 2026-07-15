import { describe, expect, it } from "vitest";
import { resolveCredit } from "../src/support-flow";

describe("support approval flow", () => {
  it("creates a durable-output shape only after approval", () => {
    expect(resolveCredit(true).artifact?.id).toBe("resolution-order-100");
  });
  it("records rejection without executing the write", () => {
    expect(resolveCredit(false)).toEqual({ status: "rejected", artifact: null });
  });
});
