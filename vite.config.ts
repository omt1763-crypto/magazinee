import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
      onwarn(warning) {
        // Suppress warnings about cannot find module for src/main.tsx
        if (warning.code === "UNRESOLVED_IMPORT" && warning.source === "src/main.tsx") {
          return;
        }
      },
    },
  },
});
