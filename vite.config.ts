import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs-extra'
import path from 'path'
import { Plugin } from 'vite'

// Custom markdown plugin
const markdownPlugin = (): Plugin => ({
  name: 'markdown',
  transform(code, id) {
    if (!id.endsWith('.md')) return null;
    
    // Return the content as a string
    return {
      code: `export default ${JSON.stringify(code)}`,
      map: null
    };
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    markdownPlugin(),
    {
      name: 'copy-content',
      closeBundle: async () => {
        const contentDir = 'src/content';
        const distContentDir = 'dist/content';

        // Check if content directory exists before proceeding
        if (!(await fs.pathExists(contentDir))) {
          return;
        }

        // Ensure the destination directory exists
        await fs.ensureDir(distContentDir);

        // Copy content directory to dist root
        await fs.copy(contentDir, distContentDir, {
          overwrite: true,
          filter: (src) => {
            try {
              const isDirectory = fs.statSync(src).isDirectory();
              const isMdFile = src.endsWith('.md');
              const isNodeModules = src.includes('node_modules');
              return isDirectory || (isMdFile && !isNodeModules);
            } catch {
              return false; // Ignore errors from non-existent files
            }
          }
        });

        // Remove `src/content` from dist if mistakenly copied
        const distSrcContent = path.join('dist', 'src', 'content');
        if (await fs.pathExists(distSrcContent)) {
          await fs.remove(distSrcContent);
        }
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        format: 'iife', // Ensure compatibility with static hosting
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
});

