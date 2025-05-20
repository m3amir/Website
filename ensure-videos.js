#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Ensuring video files are properly accessible...');

// Check if dist/videos directory exists
const distVideosDir = path.join(__dirname, 'dist', 'videos');
if (!fs.existsSync(distVideosDir)) {
  console.log('Creating dist/videos directory...');
  fs.mkdirSync(distVideosDir, { recursive: true });
}

// Check each video file
const videoFiles = ['explainer.mp4', 'herbup.mov'];
let allFilesExist = true;

videoFiles.forEach(videoFile => {
  const sourcePath = path.join(__dirname, 'public', 'videos', videoFile);
  const destPath = path.join(distVideosDir, videoFile);
  
  if (fs.existsSync(sourcePath)) {
    console.log(`✓ Found ${videoFile} in public/videos`);
    
    // Check if file exists in dist/videos
    if (!fs.existsSync(destPath)) {
      console.log(`Copying ${videoFile} to dist/videos...`);
      try {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✓ Successfully copied ${videoFile} to dist/videos`);
      } catch (error) {
        console.error(`❌ Error copying ${videoFile}:`, error.message);
        allFilesExist = false;
      }
    } else {
      console.log(`✓ ${videoFile} already exists in dist/videos`);
    }
  } else {
    console.error(`❌ Error: ${videoFile} not found in public/videos`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('✅ All video files are available in dist/videos!');
} else {
  console.error('⚠️ Some video files are missing. Please check the errors above.');
} 