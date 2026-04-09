import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress the /src/main.tsx resolution warning - it's intentional
        if (warning.code === 'UNRESOLVED_ENTRY' || (warning.message && warning.message.includes('src/main.tsx'))) {
          return;
        }
        warn(warning);
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
