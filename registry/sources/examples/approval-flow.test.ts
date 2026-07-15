import { describe, expect, it } from "vitest";
import { executeApprovedRefund } from "./approval-flow";

describe("approval flow example", () => {
  it("executes only an approved exact intent", async () => {
    const result = await executeApprovedRefund(
      { toolName: "refundOrder", risk: "write", inputHash: "hash" },
      {
        toolName: "refundOrder",
        inputHash: "hash",
        approvedBy: "user-1",
        expiresAt: "2999-01-01T00:00:00.000Z",
      },
    );
    expect(result.status).toBe("queued");
  });
});
