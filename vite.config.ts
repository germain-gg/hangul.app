import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { generateSW } from "rollup-plugin-workbox";

const plugins = [reactRefresh()];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    generateSW({
      swDest: "dist/service-worker.js",
      globDirectory: "dist",
      globPatterns: ["**/*.{html,css,js,svg}"],
      skipWaiting: true,
    })
  );
  plugins.push({
    name: "add-service worker",
    transformIndexHtml() {
      return [
        {
          tag: "script",
          attrs: {
            type: "text/javascript",
          },
          children: `if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }`,
          injectTo: "body",
        },
      ];
    },
  });
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
});
