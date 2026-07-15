import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AgentChat } from "./agent-chat";

describe("AgentChat", () => {
  it("renders public message roles and the host composer", () => {
    const html = renderToStaticMarkup(
      <AgentChat
        composer={<button>Send</button>}
        messages={[
          { id: "m1", role: "assistant", content: "Order found" },
          { id: "m2", role: "tool", label: "lookupOrder", content: "Shipped" },
        ]}
      />,
    );
    expect(html).toContain("Order found");
    expect(html).toContain("lookupOrder");
    expect(html).toContain("Send");
  });
});
