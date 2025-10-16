import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: true, // or use your local IP directly
//     port: 5000, // COLO 35 port 5180
//   },
// });

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5222,
    proxy: {
      "/api": {
        target: "http://192.168.50.35:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/service": {
        target: "http://192.168.50.35:8101",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/service/, ""),
      },
      "/main": {
        target: "http://192.168.50.35:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/main/, ""),
      },
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
