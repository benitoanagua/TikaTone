import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'public',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'assets/js/main.js'),
        admin: path.resolve(__dirname, 'assets/js/admin.js'),
        editor: path.resolve(__dirname, 'assets/js/editor.js'),
        customizer: path.resolve(__dirname, 'assets/js/customizer.js'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/[name].css';
          }
          return 'assets/[name].[ext]';
        },
      },
    },
  },
  server: {
    host: 'localhost',
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3001,
    },
  },
});
