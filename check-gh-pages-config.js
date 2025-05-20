#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Checking GitHub Pages deployment configuration...');

// Check package.json
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
  console.log(`✓ Homepage set to: ${packageJson.homepage}`);
  console.log(`✓ Build command: ${packageJson.scripts.build}`);
  if (packageJson.scripts.build.includes('cp dist/index.html dist/404.html')) {
    console.log('✓ 404.html will be created during build');
  } else {
    console.warn('⚠ Build command does not create 404.html from index.html');
  }
} catch (error) {
  console.error('❌ Error reading package.json:', error.message);
}

// Check vite.config.ts/js
try {
  const viteConfigPath = fs.existsSync(path.join(__dirname, 'vite.config.ts')) 
    ? path.join(__dirname, 'vite.config.ts') 
    : path.join(__dirname, 'vite.config.js');
  
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  if (viteConfig.includes("base: './'")) {
    console.log('✓ Vite config has base set to "./"');
  } else {
    console.warn('⚠ Vite config does not have base set to "./"');
  }
} catch (error) {
  console.error('❌ Error reading vite config:', error.message);
}

// Check 404.html
try {
  if (fs.existsSync(path.join(__dirname, '404.html'))) {
    console.log('✓ 404.html file exists');
    const content404 = fs.readFileSync(path.join(__dirname, '404.html'), 'utf8');
    if (content404.includes('pathSegmentsToKeep')) {
      console.log('✓ 404.html contains redirect script');
    } else {
      console.warn('⚠ 404.html does not contain proper redirect script');
    }
  } else {
    console.warn('⚠ 404.html file missing - will be created during build');
  }
} catch (error) {
  console.error('❌ Error checking 404.html:', error.message);
}

// Check index.html
try {
  const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  if (indexHtml.includes('Single Page Apps for GitHub Pages')) {
    console.log('✓ index.html contains redirect handling script');
  } else {
    console.warn('⚠ index.html does not contain redirect handling script');
  }
} catch (error) {
  console.error('❌ Error reading index.html:', error.message);
}

// Check Router in App.tsx
try {
  const appTsx = fs.readFileSync(path.join(__dirname, 'src', 'App.tsx'), 'utf8');
  if (appTsx.includes('isProd ?') && appTsx.includes('"/Website"')) {
    console.log('✓ Using BrowserRouter with conditional basename for GitHub Pages');
  } else {
    console.warn('⚠ App.tsx is not using BrowserRouter with conditional basename for GitHub Pages');
  }
} catch (error) {
  console.error('❌ Error reading App.tsx:', error.message);
}

console.log('\nTo deploy to GitHub Pages:');
console.log('1. Run: npm run build');
console.log('2. Verify that dist/404.html exists and handles redirects properly');
console.log('3. Run: npm run deploy');
console.log('4. Check your GitHub repository settings to ensure GitHub Pages is set up correctly'); 
