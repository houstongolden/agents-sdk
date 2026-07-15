export type ToolRisk = "read" | "write" | "irreversible";

export interface ToolIntent {
  toolName: string;
  risk: ToolRisk;
  inputHash: string;
}

export interface ApprovalGrant {
  toolName: string;
  inputHash: string;
  approvedBy: string;
  expiresAt: string;
  consumedAt?: string;
}

export function requiresApproval(intent: ToolIntent): boolean {
  return intent.risk !== "read";
}

export function grantAllows(intent: ToolIntent, grant: ApprovalGrant, now = new Date()): boolean {
  return (
    requiresApproval(intent) &&
    grant.toolName === intent.toolName &&
    grant.inputHash === intent.inputHash &&
    !grant.consumedAt &&
    Date.parse(grant.expiresAt) > now.getTime()
  );
}

export function assertExecutionAllowed(
  intent: ToolIntent,
  grant?: ApprovalGrant,
  now?: Date,
): void {
  if (!requiresApproval(intent)) return;
  if (!grant || !grantAllows(intent, grant, now))
    throw new Error(`Approval required for ${intent.toolName}`);
}

/** Persist this returned transition atomically with enqueue/execution in the host store. */
export function consumeGrant(
  intent: ToolIntent,
  grant: ApprovalGrant,
  now = new Date(),
): ApprovalGrant {
  assertExecutionAllowed(intent, grant, now);
  return { ...grant, consumedAt: now.toISOString() };
}
