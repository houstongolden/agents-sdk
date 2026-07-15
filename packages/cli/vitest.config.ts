import { defineConfig } from "vitest/config";

export default defineConfig({
  esbuild: { jsx: "automatic" },
  test: {
    include: ["tests/**/*.test.ts", "registry/sources/**/*.test.{ts,tsx}"],
    exclude: ["registry/templates/**"],
  },
});
