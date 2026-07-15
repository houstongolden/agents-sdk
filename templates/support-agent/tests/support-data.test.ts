import { describe, expect, it } from "vitest";
import { lookupOrder } from "../src/support-data.js";

describe("support data", () => {
  it("returns evidence for known orders without guessing", () => {
    expect(lookupOrder("order-100")?.status).toBe("shipped");
    expect(lookupOrder("missing")).toBeNull();
  });
});
