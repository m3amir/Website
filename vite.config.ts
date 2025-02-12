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
        try {
          const contentDir = 'src/content';
          const distContentDir = 'dist/content';
          
          // Ensure the content directory exists in dist
          await fs.ensureDir(distContentDir);
          
          // Copy content directory to dist root
          await fs.copy(contentDir, distContentDir, { 
            overwrite: true,
            filter: (src) => {
              // Always include directories and .md files
              const isDirectory = fs.lstatSync(src).isDirectory();
              const isMdFile = src.endsWith('.md');
              const isNodeModules = src.includes('node_modules');
              
              return isDirectory || (isMdFile && !isNodeModules);
            }
          });
          
          // Remove the src/content from dist if it exists
          const distSrcContent = path.join('dist', 'src', 'content');
          if (await fs.pathExists(distSrcContent)) {
            await fs.remove(distSrcContent);
          }

          // List copied files for verification
          const files = await fs.readdir(path.join(distContentDir, 'articles'));
          console.log('Copied articles:', files);
          
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
