import {
  assertExecutionAllowed,
  type ApprovalGrant,
  type ToolIntent,
} from "../patterns/approval-gates";

export async function executeApprovedRefund(intent: ToolIntent, grant: ApprovalGrant) {
  assertExecutionAllowed(intent, grant);
  return { status: "queued", tool: intent.toolName, approvedBy: grant.approvedBy } as const;
}
