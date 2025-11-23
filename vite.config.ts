import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      util: 'util',
      buffer: 'buffer',
      events: 'events',
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis',
  },
});
