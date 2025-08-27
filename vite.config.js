import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { versionPlugin } from "./tools/generate-version.js";
import { apiDocsPlugin } from "./tools/generate-api-docs.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    versionPlugin({
      input: path.join("package.json"),
      output: path.join("src", "version.js"),
    }),
    apiDocsPlugin({
      inputs: ["src/xuan-paper/*.{js,jsx}", "tools/*.js"],
      output: path.join("docs", "api.md"),
      title: "Xuan Paper API Documentation",
      options: {},
    }),
    tailwindcss(),
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Xuan Paper",
        short_name: "Xuan Paper",
        description: "Xuan Paper",
        theme_color: "#6B9E6D",
      },

      injectManifest: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
