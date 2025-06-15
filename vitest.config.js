import path from "path";
import vue from "@vitejs/plugin-react";

export default {
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
