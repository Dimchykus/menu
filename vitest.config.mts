import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: [
        "./src/app/api/**",
        "**/actions.ts",
        "./src/lib/db/**",
        "**/db/actions/menu.ts",
        "src/lib/db/**",
        "**/*.d.ts",
        "./src/test/**",
        "./src/auth.ts",
        "./src/middleware.ts",
        "./src/lib/providers/**",
        "./src/icons/**",
      ],
    },
    setupFiles: ["./src/test/setup.ts"],
    // Only include unit tests in src/, exclude Playwright tests
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "tests/**", // Exclude Playwright tests
      "playwright/**",
      "**/*.spec.ts", // Exclude spec files (typically Playwright)
      "**/*.spec.tsx",
      "src/app/api/**",
    ],
  },
});
