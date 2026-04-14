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
    target: "esnext",
    rollupOptions: {
      external: (id) => id.includes("main") && id.includes("tsx"),
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
