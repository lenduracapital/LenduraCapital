// Performance optimization utilities for faster loading

export function initPerformanceBoost() {
  if (typeof window === 'undefined') return;

  // 1. Preload critical resources
  const preloadCritical = () => {
    // Preload most important images first
    const criticalImages = [
      '/assets/ChatGPT Image Jun 5_ 2025_ 12_13_54 PM_1752722086552-DHcJmu6c.png', // Logo
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  };

  // 2. Lazy load large images
  const setupLazyLoading = () => {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
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
  };

  // 3. Defer non-critical scripts
  const deferNonCritical = () => {
    // Defer video processing
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.preload = 'none';
      // Note: loading attribute is not supported on video elements
    });
  };

  // 4. Optimize rendering
  const optimizeRendering = () => {
    // Add CSS for faster rendering
    const style = document.createElement('style');
    style.textContent = `
      /* Fast rendering hints */
      img {
        content-visibility: auto;
        contain-intrinsic-size: 300px 200px;
      }
      
      .lazy {
        opacity: 0;
        transition: opacity 0.3s;
      }
      
      .lazy.loaded {
        opacity: 1;
      }
      
      /* Reduce paint complexity */
      .hero-section {
        will-change: transform;
        transform: translateZ(0);
      }
      
      /* Critical path CSS */
      body {
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  };

  // Run optimizations immediately
  preloadCritical();
  optimizeRendering();
  
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupLazyLoading();
      deferNonCritical();
    });
  } else {
    setupLazyLoading();
    deferNonCritical();
  }
}

// Service Worker registration moved to service-worker-registration.ts to avoid conflicts
// This function is now deprecated - use initServiceWorker from service-worker-registration.ts instead
export function registerServiceWorker() {
  console.log('Service Worker registration moved to service-worker-registration.ts');
}