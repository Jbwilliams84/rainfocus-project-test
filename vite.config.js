import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'build',
    modulePreload: false,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
  },
});
