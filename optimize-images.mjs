import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, 'src/assets');

async function optimizeImages(dir) {
  const files = [];

  function walkDir(currentPath) {
    const items = fs.readdirSync(currentPath);
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (/(\.png|\.jpg|\.jpeg)$/i.test(item)) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);

  console.log(`Found ${files.length} images to optimize...\n`);

  for (const filePath of files) {
    const ext = path.extname(filePath).toLowerCase();
    const filename = path.basename(filePath);

    try {
      const origSize = fs.statSync(filePath).size;
      let pipeline = sharp(filePath);

      // Compress and optimize
      if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      }

      const optimizedPath = filePath + '.optimized';
      await pipeline.toFile(optimizedPath);

      const newSize = fs.statSync(optimizedPath).size;
      const savings = Math.round(((origSize - newSize) / origSize) * 100);

      if (newSize < origSize) {
        fs.renameSync(optimizedPath, filePath);
        console.log(
          `✓ ${filename}: ${Math.round(origSize / 1024)}KB → ${Math.round(newSize / 1024)}KB (saved ${savings}%)`
        );
      } else {
        fs.unlinkSync(optimizedPath);
        console.log(`→ ${filename}: No improvement (skipped)`);
      }
    } catch (err) {
      console.error(`✗ Failed to optimize ${filename}:`, err.message);
    }
  }

  console.log('\n✓ Image optimization complete!');
}

optimizeImages(imageDir);
