import { consumeGrant, type ApprovalGrant, type ToolIntent } from "../patterns/approval-gates";

export type Resolution =
  | { status: "rejected"; artifact: null }
  | { status: "approved"; artifact: { id: string; title: string; body: string } };

export const creditIntent: ToolIntent = {
  toolName: "issueCredit",
  risk: "write",
  inputHash: "support-credit:order-100:25",
};

export function resolveCredit(
  approved: boolean,
  now = new Date("2026-07-15T00:00:00.000Z"),
): Resolution {
  if (!approved) return { status: "rejected", artifact: null };
  const grant: ApprovalGrant = {
    toolName: creditIntent.toolName,
    inputHash: creditIntent.inputHash,
    approvedBy: "demo-user",
    expiresAt: "2026-07-15T00:15:00.000Z",
  };
  consumeGrant(creditIntent, grant, now);
  return {
    status: "approved",
    artifact: {
      id: "resolution-order-100",
      title: "Support resolution",
      body: "$25 credit approved for order-100.",
    },
  };
}
