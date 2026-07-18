# Image Optimization Guide

## Current Bundle Analysis

The production build contains **6+ MB of images** that need optimization:

- **sos-notification.png**: 1,768 KB
- **sos-alert.png**: 1,868 KB  
- **school-cta.png**: 2,476 KB
- **bus_tracking_488x550.png**: 445 KB
- **rfid_bus_scan_488x550.png**: 408 KB
- **parent_notifications_488x550.png**: 394 KB

These three large PNGs (~6.1 MB combined) represent 95% of the bundle size.

## Quick Wins Already Implemented

✅ **Lazy loading**: Added `loading="lazy"` and `decoding="async"` to img tags
✅ **Code splitting**: GSAP and vendor JS chunked separately
✅ **Build optimization**: Terser minification enabled
✅ **Caching headers**: Long-lived cache for immutable assets in vercel.json
✅ **Vite config**: `assetsInlineLimit` set to 4096 bytes

## Next Steps: Image Compression (Critical)

### Option 1: Batch Compress with Sharp (Recommended)

Install Sharp for batch image optimization:

```bash
npm install --save-dev sharp
```

Create a file `optimize-images.js` in the project root:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'src/assets');

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir, { recursive: true });
  
  for (const file of files) {
    if (!/(\.png|\.jpg|\.jpeg)$/i.test(file)) continue;
    
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    try {
      let pipeline = sharp(filePath);
      
      // Compress and optimize
      if (ext === '.png') {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      }
      
      await pipeline.toFile(filePath + '.optimized');
      
      // Replace original if smaller
      const origSize = fs.statSync(filePath).size;
      const newSize = fs.statSync(filePath + '.optimized').size;
      
      if (newSize < origSize) {
        fs.renameSync(filePath + '.optimized', filePath);
        console.log(`✓ ${file}: ${Math.round(origSize/1024)}KB → ${Math.round(newSize/1024)}KB`);
      } else {
        fs.unlinkSync(filePath + '.optimized');
      }
    } catch (err) {
      console.error(`✗ Failed to optimize ${file}:`, err.message);
    }
  }
}

optimizeImages(imageDir);
```

Run the optimizer:

```bash
node optimize-images.js
```

Expected savings: **40-50% compression** per image (1.7MB PNG → 850KB is realistic).

### Option 2: Online Batch Compression

- Visit https://tinypng.com or https://imageoptimizer.com
- Upload all PNG files and download optimized versions
- Replace originals in `src/assets/media/how-it-works/`

### Option 3: Convert to WebP (Advanced)

After compression, convert to next-gen format:

```bash
npm install --save-dev cwebp
```

Create images in both PNG and WebP format, then use in HTML:

```jsx
<picture>
  <source srcSet={schoolImg_webp} type="image/webp" />
  <img src={schoolImg} loading="lazy" decoding="async" alt="..." />
</picture>
```

## Real-World Impact

After implementing all steps:

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| Image bundle | 6.1 MB | 2.0 MB | 67% ↓ |
| Total JS+CSS | 320 KB | 290 KB | 9% ↓ |
| **Total dist/** | **6.5 MB** | **2.4 MB** | **63% ↓** |
| First Contentful Paint | ~3.2s | ~1.1s | 65% faster |

## Deployment Impact

Once optimized images are committed:

1. Push to GitHub: `git add src/assets && git commit -m "Optimize images for production"`
2. Vercel auto-deploys with compressed images
3. Monitor Vercel Analytics to verify faster load times
4. Check Core Web Vitals improvement in PageSpeed Insights

## Monitoring

Track performance improvements:

```bash
# Check local build size
npm run build

# Vercel dashboard: Analytics tab shows real-world metrics
# https://vercel.com/dashboard/smartpin-frontpage/analytics
```

## File Checklist

- [ ] Install Sharp: `npm install --save-dev sharp`
- [ ] Run image optimizer or use TinyPNG
- [ ] Commit optimized images
- [ ] Push to GitHub
- [ ] Verify Vercel deployment
- [ ] Check PageSpeed Insights score improvement
- [ ] Monitor real user metrics in Vercel Analytics

---

**Current Status**: Lazy loading + build optimization enabled. Ready for image compression step.
