import { defineConfig } from 'vite'

export default defineConfig({
  base: '/siw-ss.github.io/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
})
