import { describe, expect, it } from "vitest";
import { assertExecutionAllowed, consumeGrant, grantAllows } from "./approval-gates";

const intent = { toolName: "refundOrder", risk: "write" as const, inputHash: "sha256:abc" };

describe("approval gates", () => {
  it("binds grants to exact tool input and expiry", () => {
    const grant = {
      toolName: "refundOrder",
      inputHash: "sha256:abc",
      approvedBy: "user-1",
      expiresAt: "2030-01-01T00:00:00.000Z",
    };
    expect(grantAllows(intent, grant, new Date("2029-01-01"))).toBe(true);
    expect(
      grantAllows({ ...intent, inputHash: "sha256:changed" }, grant, new Date("2029-01-01")),
    ).toBe(false);
  });

  it("never executes writes without a valid grant", () => {
    expect(() => assertExecutionAllowed(intent)).toThrow("Approval required");
  });

  it("consumes a grant once and rejects reuse", () => {
    const grant = {
      toolName: "refundOrder",
      inputHash: "sha256:abc",
      approvedBy: "user-1",
      expiresAt: "2030-01-01T00:00:00.000Z",
    };
    const consumed = consumeGrant(intent, grant, new Date("2029-01-01"));
    expect(consumed.consumedAt).toBe("2029-01-01T00:00:00.000Z");
    expect(() => consumeGrant(intent, consumed, new Date("2029-01-01"))).toThrow(
      "Approval required",
    );
  });
});
