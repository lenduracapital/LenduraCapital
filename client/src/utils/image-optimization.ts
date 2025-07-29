// Advanced image optimization for performance

// Convert large images to optimized formats
export function createOptimizedImageLoader() {
  // WebP support detection
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  };

  // Create optimized image with proper loading
  const createOptimizedImage = (src: string, alt: string = '', className: string = '') => {
    const img = document.createElement('img');
    
    // Add loading optimization attributes
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = alt;
    img.className = className;
    
    // Use WebP if supported and available
    if (supportsWebP() && src.includes('.jpg')) {
      const webpSrc = src.replace('.jpg', '.webp');
      
      // Try WebP first, fallback to original
      const testImg = new Image();
      testImg.onload = () => {
        img.src = webpSrc;
      };
      testImg.onerror = () => {
        img.src = src;
      };
      testImg.src = webpSrc;
    } else {
      img.src = src;
    }
    
    return img;
  };

  return { createOptimizedImage, supportsWebP };
}

// Lazy loading with intersection observer
export function initializeLazyLoading() {
  if (typeof window === 'undefined') return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Load the actual image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          img.classList.add('loaded');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  // Observe all lazy images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
}

// Preload critical images only
export function preloadCriticalImages() {
  const criticalImages = [
    '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png' // Logo only
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

// Image compression and resizing
export function compressImage(file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        } else {
          reject(new Error('Compression failed'));
        }
      }, 'image/jpeg', quality);
    };
    
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = URL.createObjectURL(file);
  });
}