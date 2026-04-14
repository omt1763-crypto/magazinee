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
  onLog(level, log, handler) {
    // Suppress the warning about unresolved /src/main.tsx
    if (log.code === 'UNRESOLVED_IMPORT' && log.message.includes('/src/main.tsx')) {
      return;
    }
    handler(level, log);
  },
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});
