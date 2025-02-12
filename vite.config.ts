import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs-extra'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    {
      name: 'copy-content',
      closeBundle: async () => {
        // Copy content directory to dist root
        await fs.copy('src/content', 'dist/content', { overwrite: true });
        // Remove the src/content from dist if it exists
        if (await fs.pathExists('dist/src/content')) {
          await fs.remove('dist/src/content');
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    minify: 'esbuild',
    sourcemap: false,
    outDir: 'dist',
    assetsDir: 'assets'
  },
  optimizeDeps: {
    include: ['gray-matter']
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@content', replacement: '/src/content' }
    ]
  }
})
