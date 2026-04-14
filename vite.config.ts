import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [
    {
      name: "suppress-tsconfig-warning",
      apply: "build",
      enforce: "post",
    },
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "UNRESOLVED_IMPORT" && warning.source?.includes("main.tsx")) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
});
