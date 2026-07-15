const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './public/sequences/seq';
const outputDir = './public/sequences/seq-resized';
const targetWidth = 640;
const targetHeight = 360;

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function resizeImages() {
  try {
    // Get all PNG files in the input directory
    const files = fs.readdirSync(inputDir)
      .filter(file => file.endsWith('.png'))
      .sort(); // Ensure proper order

    console.log(`Found ${files.length} images to resize`);
    console.log(`Resizing from 1920x1080 to ${targetWidth}x${targetHeight}`);

    let completed = 0;

    for (const file of files) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file);

      await sharp(inputPath)
        .resize(targetWidth, targetHeight, {
          fit: 'fill', // Stretch to exact dimensions
          withoutEnlargement: false
        })
        .png({ quality: 90, compressionLevel: 6 })
        .toFile(outputPath);

      completed++;
      
      // Show progress
      if (completed % 10 === 0 || completed === files.length) {
        console.log(`Progress: ${completed}/${files.length} (${Math.round(completed/files.length*100)}%)`);
      }
    }

    console.log('\n✅ All images resized successfully!');
    console.log(`📁 Resized images saved to: ${outputDir}`);
    
    // Calculate file size savings
    const originalSize = await getFolderSize(inputDir);
    const newSize = await getFolderSize(outputDir);
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`💾 File size savings: ${savings}% (${formatBytes(originalSize)} → ${formatBytes(newSize)})`);

  } catch (error) {
    console.error('❌ Error resizing images:', error);
  }
}

async function getFolderSize(folderPath) {
  const files = fs.readdirSync(folderPath);
  let totalSize = 0;
  
  for (const file of files) {
    if (file.endsWith('.png')) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
    }
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the resize function
resizeImages();