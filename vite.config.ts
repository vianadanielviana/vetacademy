import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["icon-192.png", "icon-512.png"],
        manifest: {
          name: "VetAcademy",
          short_name: "VetAcademy",
          description: "Guia clínico veterinário — medicamentos, calculadoras e RCP",
          theme_color: "#7c3aed",
          background_color: "#0a0a0a",
          display: "standalone",
          orientation: "portrait",
          scope: "/",
          start_url: "/",
          icons: [
            {
              src: "/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/icon-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
          runtimeCaching: [
            {
              urlPattern: /\.m4a$/i,
              handler: "CacheFirst",
              options: {
                cacheName: "audio-cache",
                expiration: { maxEntries: 5, maxAgeSeconds: 30 * 24 * 3600 },
              },
            },
            {
              urlPattern: /^https:\/\/ieyjfxuthwgbrgswceko\.supabase\.co\/.*/i,
              handler: "NetworkFirst",
              options: {
                cacheName: "supabase-api-cache",
                expiration: { maxEntries: 50, maxAgeSeconds: 3600 },
              },
            },
          ],
        },
      }),
    ],
    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
