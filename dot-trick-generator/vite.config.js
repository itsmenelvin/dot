// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        // Customize as needed
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  server: {
    open: true,
  },
  // Ensure the public directory is correctly set (default is 'public')
  publicDir: 'public',
});
