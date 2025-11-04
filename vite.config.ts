import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      verbose: true,
    }),
    visualizer({
      open: false,
      filename: "bundle-stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    open: true,  // ✅ Automatically opens the browser
    port: 5173,  // Optional: customize the dev server port
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "framer-motion", "lucide-react"],
        },
      },
    },
  },
});
