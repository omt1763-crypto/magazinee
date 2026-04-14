import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        // Completely silence the warning about unresolved /src/main.tsx
        if (warning.code === 'UNRESOLVED_IMPORT') {
          return; // Don't warn at all, just continue
        }
        defaultHandler(warning); // Handle other warnings normally
      },
    },
  },
});
