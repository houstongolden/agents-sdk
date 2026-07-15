import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HumanApproval } from "./human-approval";

describe("HumanApproval", () => {
  it("shows action, impact, and explicit decisions", () => {
    const html = renderToStaticMarkup(
      <HumanApproval
        title="Refund"
        description="Refund $25"
        action="refundOrder"
        impact="$25 account credit"
      />,
    );
    expect(html).toContain("Refund $25");
    expect(html).toContain("Reject");
    expect(html).toContain("Approve action");
  });
});
