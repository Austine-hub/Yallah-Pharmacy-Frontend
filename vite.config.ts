// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteCompression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    // ✅ React (SWC for faster builds)
    react(),

    // ✅ Gzip Compression for Production Builds
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 10240,
      verbose: true,
    }),

    // ✅ Bundle Visualizer (helps analyze build size)
    visualizer({
      open: false,
      filename: "bundle-stats.html",
      gzipSize: true,
      brotliSize: true,
    }),
  ],

  server: {
    open: true, // ✅ Automatically opens the browser
    port: 5173, // ✅ Local dev server port
    // ⚠️ NOTE: Vite automatically handles SPA fallback.
    // No need for `historyApiFallback` — it's not a valid Vite property.
  },

  preview: {
    // ✅ Vite preview also handles SPA routing automatically.
    port: 4173,
  },

  build: {
    rollupOptions: {
      output: {
        // ✅ Chunk optimization for better caching
        manualChunks: {
          react: ["react", "react-dom"],
          vendor: ["axios", "framer-motion", "lucide-react"],
        },
      },
    },
  },
});
