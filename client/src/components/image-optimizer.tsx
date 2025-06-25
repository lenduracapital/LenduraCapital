import { useEffect } from 'react';

// Image optimization for better Core Web Vitals
export default function ImageOptimizer() {
  useEffect(() => {
    const optimizeImages = () => {
      // Add loading attributes to images
      const images = document.querySelectorAll('img');
      images.forEach((img, index) => {
        // First few images should load eagerly (above the fold)
        if (index < 3) {
          img.loading = 'eager';
          img.decoding = 'sync';
          // Add high priority fetch
          img.fetchPriority = 'high' as any;
        } else {
          img.loading = 'lazy';
          img.decoding = 'async';
        }

        // Add error handling
        img.onerror = () => {
          img.style.display = 'none';
        };

        // Add dimensions if missing to prevent layout shift
        if (!img.width && !img.height && !img.style.width && !img.style.height) {
          img.style.minHeight = '200px';
          img.style.backgroundColor = '#f3f4f6';
        }
      });

      // Preload critical images
      const criticalImages = [
        '/favicon.svg',
        // Add other critical images here
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Run optimization after images are loaded
    if (document.readyState === 'complete') {
      optimizeImages();
    } else {
      window.addEventListener('load', optimizeImages);
      return () => window.removeEventListener('load', optimizeImages);
    }
  }, []);

  return null;
}