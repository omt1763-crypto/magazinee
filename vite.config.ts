import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    {
      name: "html-transform",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return html.replace(
            "<div id=\"root\"></div>",
            '<div id="root"></div><script type="module" src="/src/main.tsx"><\/script>'
          );
        },
      },
    },
    react(),
    componentTagger(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
  },
});
