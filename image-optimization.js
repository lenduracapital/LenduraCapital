// Invisible image optimization script - no visual changes
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = './attached_assets';
const OUTPUT_DIR = './public/optimized';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImages() {
  const files = fs.readdirSync(ASSETS_DIR);
  
  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    const ext = path.extname(file).toLowerCase();
    
    // Only process image files
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    
    const baseName = path.basename(file, ext);
    
    try {
      // Generate WebP version (lossless)
      await sharp(filePath)
        .webp({ lossless: true, quality: 100 })
        .toFile(path.join(OUTPUT_DIR, `${baseName}.webp`));
      
      // Generate AVIF version (lossless)
      await sharp(filePath)
        .avif({ lossless: true, quality: 100 })
        .toFile(path.join(OUTPUT_DIR, `${baseName}.avif`));
      
      // Generate responsive sizes (480px to 1920px)
      const sizes = [480, 768, 1024, 1200, 1920];
      
      for (const size of sizes) {
        // WebP responsive
        await sharp(filePath)
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: 90 })
          .toFile(path.join(OUTPUT_DIR, `${baseName}-${size}w.webp`));
        
        // AVIF responsive  
        await sharp(filePath)
          .resize(size, null, { withoutEnlargement: true })
          .avif({ quality: 90 })
          .toFile(path.join(OUTPUT_DIR, `${baseName}-${size}w.avif`));
      }
      
      console.log(`Optimized: ${file}`);
    } catch (error) {
      console.log(`Skipped: ${file} (${error.message})`);
    }
  }
  
  console.log('Image optimization complete');
}

// Run optimization
if (require.main === module) {
  optimizeImages().catch(console.error);
}

module.exports = { optimizeImages };