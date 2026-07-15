const orders: Record<string, { status: string; eta: string }> = {
  "order-100": { status: "shipped", eta: "2026-07-18" },
};

export function lookupOrder(orderId: string) {
  return orders[orderId] ?? null;
}
