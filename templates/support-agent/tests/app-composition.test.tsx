import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { App } from "../src/App";

describe("support application composition", () => {
  it("renders chat, approval, and artifact surfaces together", () => {
    const html = renderToStaticMarkup(<App />);
    expect(html).toContain("Agent conversation");
    expect(html).toContain("Awaiting a decision");
    expect(html).toContain("Resolution artifact");
  });
});
