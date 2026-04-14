import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Plugin to inject main.js script after HTML is rendered
const injectScriptPlugin = {
  name: 'inject-script',
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      return html.replace(
        '</body>',
        '    <script type="module" src="./main.js"></script>\n  </body>'
      );
    },
  },
};

export default defineConfig({
  plugins: [react(), injectScriptPlugin],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        main: path.resolve(__dirname, "src/main.tsx"),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
