import { lookupOrder } from "./support-data";
import { resolveCredit, type Resolution } from "./support-flow";

export interface SupportAgentAdapter {
  inspectOrder(orderId: string): { tool: "lookupOrder"; evidence: string };
  decideCredit(approved: boolean): Resolution;
}

/** Deterministic browser-safe adapter. Replace at the server boundary, never with browser provider keys. */
export const offlineSupportAgent: SupportAgentAdapter = {
  inspectOrder(orderId) {
    const order = lookupOrder(orderId);
    return {
      tool: "lookupOrder",
      evidence: order ? `${order.status}; ETA ${order.eta}` : "Order not found",
    };
  },
  decideCredit: resolveCredit,
};
