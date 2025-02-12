import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs-extra'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    react(),
    {
      name: 'copy-content',
      closeBundle: async () => {
        try {
          // Ensure the content directory exists in dist
          await fs.ensureDir('dist/content/articles');
          
          // Copy content directory to dist root
          await fs.copy('src/content', 'dist/content', { 
            overwrite: true,
            filter: (src) => {
              // Ensure we copy .md files
              return !src.includes('node_modules') && (src.endsWith('.md') || !src.includes('.'));
            }
          });
          
          // Remove the src/content from dist if it exists
          if (await fs.pathExists('dist/src/content')) {
            await fs.remove('dist/src/content');
          }

          console.log('Successfully copied content files to dist');
        } catch (error) {
          console.error('Error copying content:', error);
          throw error;
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
