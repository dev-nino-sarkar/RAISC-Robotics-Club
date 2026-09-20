import { defineConfig } from 'vite';

export default defineConfig({
  // Serve partials from /src/sections as static files
  publicDir: 'public',
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Split JS by module for clean chunking
        manualChunks: {
          canvas:  ['./src/js/canvas.js'],
          ui:      ['./src/js/navbar.js', './src/js/loader.js', './src/js/scroll-reveal.js'],
          widgets: ['./src/js/counter.js', './src/js/filter.js', './src/js/form.js'],
        },
      },
    },
  },
});
