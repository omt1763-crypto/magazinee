import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Custom plugin to handle the /src/main.tsx resolution gracefully
const handleScriptTagPlugin = {
  name: 'handle-script-tag',
  resolveId(id) {
    // When Rollup tries to resolve /src/main.tsx from HTML, resolve it to the actual file
    if (id === '/src/main.tsx') {
      return path.resolve(__dirname, 'src/main.tsx');
    }
  },
};

export default defineConfig({
  plugins: [handleScriptTagPlugin, react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
