import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: "index.html",
      onwarn(warning, warn) {
        // Suppress warnings about unresolved /src/main.tsx - it's resolved at runtime
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('/src/main.tsx')) {
          return;
        }
        warn(warning);
      },
    },
  },
});
