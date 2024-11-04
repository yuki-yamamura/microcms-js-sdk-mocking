import path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

export default defineConfig({
  plugins: [react()],
  test: {
    env: dotenv.config({ path: ".env" }).parsed,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
