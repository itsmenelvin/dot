// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Prevent chunk splitting for workers (if needed)
        manualChunks(id) {
          if (id.includes('emailGenerator.worker.js')) {
            return 'emailGenerator.worker';
          }
        }
      }
    }
  }
});
