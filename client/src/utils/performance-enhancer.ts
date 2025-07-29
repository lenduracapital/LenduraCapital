// Advanced performance enhancements without changing visual elements

// Optimize JavaScript execution
export function optimizeJavaScriptExecution() {
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback for non-critical operations
  const runWhenIdle = (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1000 });
    } else {
      setTimeout(callback, 100);
    }
  };

  // Optimize scroll performance
  let ticking = false;
  const optimizeScrollEvents = () => {
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-based operations here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // Initialize optimizations when idle
  runWhenIdle(() => {
    optimizeScrollEvents();
    
    // Preload critical resources more intelligently
    const criticalImages = [
      '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png',
      '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg'
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  });

  // Advanced memory management and performance optimization
  const advancedCleanupResources = () => {
    // Clean up any unused DOM references
    const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
    unusedElements.forEach(el => el.remove());
    
    // Force garbage collection if available
    if ('gc' in window && typeof window.gc === 'function') {
      window.gc();
    }
    
    // Clear unused image caches
    const images = document.querySelectorAll('img[data-loaded="true"]');
    images.forEach(img => {
      if (!img.getBoundingClientRect().height) {
        (img as HTMLImageElement).src = '';
      }
    });
  };

  // Enhanced performance optimizations
  const enableAdvancedOptimizations = () => {
    // Use performance observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    // Optimize viewport rendering
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no');
    }
  };

  // Run optimizations
  enableAdvancedOptimizations();
  
  // Run cleanup periodically with increased frequency
  setInterval(advancedCleanupResources, 30000); // Every 30 seconds
}

// Enhanced image loading optimization
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return;

  // Native lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      const imgElement = img as HTMLImageElement;
      imgElement.src = imgElement.dataset.src || '';
    });
  }
}

// Network-aware loading
export function adaptToNetworkConditions() {
  if (typeof window === 'undefined' || !('connection' in navigator)) return;

  const connection = (navigator as any).connection;
  if (!connection) return;

  const isSlowConnection = connection.effectiveType === '2g' || 
                          connection.effectiveType === 'slow-2g' ||
                          (connection.downlink && connection.downlink < 1);

  if (isSlowConnection) {
    // Reduce quality for slow connections
    document.documentElement.classList.add('slow-connection');
    
    // Disable non-essential animations
    const style = document.createElement('style');
    style.textContent = `
      .slow-connection * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize all optimizations
export function initializePerformanceEnhancements() {
  // Run immediately for critical optimizations
  optimizeJavaScriptExecution();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      optimizeImageLoading();
      adaptToNetworkConditions();
    });
  } else {
    optimizeImageLoading();
    adaptToNetworkConditions();
  }
}