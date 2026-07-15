import { describe, expect, it } from "vitest";
import { applyDemoStreamPart, createDemoSequence, createInitialDemoState } from "./demo-stream";

describe("local demo stream", () => {
  it("uses a deterministic, monotonic event schedule", () => {
    const events = createDemoSequence("Build a support agent");
    expect(events).toHaveLength(16);
    expect(
      events.every((event, index) => index === 0 || event.delayMs >= events[index - 1]!.delayMs),
    ).toBe(true);
    expect(events.at(-1)?.part.type).toBe("finish");
  });

  it("keeps artifact state separate from assistant text", () => {
    const events = createDemoSequence("Build a support agent");
    const result = events.reduce(
      (state, event) => applyDemoStreamPart(state, event.part),
      createInitialDemoState(),
    );

    expect(result.status).toBe("complete");
    expect(result.artifact?.schemaVersion).toBe("agenty.artifact/v1");
    expect(result.response).toContain("reference build is ready");
    expect(result.response).not.toContain(result.artifact?.title ?? "Reference agent build");
  });

  it("updates tool calls by stable call id", () => {
    const events = createDemoSequence("Build a support agent");
    const result = events.reduce(
      (state, event) => applyDemoStreamPart(state, event.part),
      createInitialDemoState(),
    );

    expect(result.toolCalls).toHaveLength(2);
    expect(result.toolCalls.every((call) => call.status === "complete")).toBe(true);
  });
});
