import { defineConfig } from "vite";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [tailwindcss()],
  css: {
    devSourcemap: true,
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    emptyOutDir: true,
    cssCodeSplit: false,
    outDir: "public",
    lib: {
      entry: resolve(__dirname, "assets/main.ts"),
      name: "TikaToneElements",
      fileName: (format) => `tika-tone-elements.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      output: {
        assetFileNames: "tika-tone-elements.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "assets"),
    },
  },
});
