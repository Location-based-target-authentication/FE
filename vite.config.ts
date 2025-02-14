import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const server = {
  port: 8080,
  host: "localhost"
};

// https://vitejs.dev/config/
export default defineConfig({
  server,
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true
      },
      include: "**/*.svg"
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
