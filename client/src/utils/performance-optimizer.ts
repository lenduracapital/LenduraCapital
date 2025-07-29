// Advanced performance optimization utilities

// Image optimization with WebP conversion and lazy loading
export function optimizeImages() {
  if (typeof window === 'undefined') return;

  // Add intersection observer for lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.1
  });

  // Observe all images with lazy loading
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Reduce main thread blocking
export function optimizeMainThread() {
  if (typeof window === 'undefined') return;

  // Use scheduler API when available
  const scheduler = (window as any).scheduler;
  if (scheduler && scheduler.postTask) {
    return (callback: () => void, priority = 'background') => {
      scheduler.postTask(callback, { priority });
    };
  }

  // Fallback to requestIdleCallback
  if (window.requestIdleCallback) {
    return (callback: () => void) => {
      window.requestIdleCallback(callback, { timeout: 5000 });
    };
  }

  // Final fallback to setTimeout
  return (callback: () => void) => {
    setTimeout(callback, 0);
  };
}

// Bundle splitting and code splitting optimization
export function enableCodeSplitting() {
  // Preload critical routes
  const criticalRoutes = ['/', '/solutions', '/contact'];
  
  criticalRoutes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
}

// Memory management
export function optimizeMemory() {
  if (typeof window === 'undefined') return;

  // Clean up unused resources periodically
  setInterval(() => {
    // Force garbage collection if available (dev tools)
    if ((window as any).gc) {
      (window as any).gc();
    }
    
    // Clean up cached images that aren't visible
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight + 1000 && rect.bottom > -1000;
      
      if (!isVisible && img.src && img.src.startsWith('blob:')) {
        // Clean up blob URLs that are no longer visible
        URL.revokeObjectURL(img.src);
      }
    });
  }, 30000); // Every 30 seconds
}

// CSS optimization
export function optimizeCriticalCSS() {
  if (typeof window === 'undefined') return;

  // Move non-critical CSS to load after first paint
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  stylesheets.forEach((stylesheet, index) => {
    if (index > 0) { // Keep first stylesheet synchronous
      const link = stylesheet as HTMLLinkElement;
      link.media = 'print';
      link.onload = () => {
        link.media = 'all';
      };
    }
  });
}

// Initialize all optimizations
export function initializePerformanceOptimizations() {
  // Use scheduler to avoid blocking initial render
  const scheduleTask = optimizeMainThread();
  
  if (scheduleTask) {
    scheduleTask(() => {
      optimizeImages();
      enableCodeSplitting();
      optimizeCriticalCSS();
      optimizeMemory();
    });
  } else {
    // Fallback if scheduleTask is undefined
    setTimeout(() => {
      optimizeImages();
      enableCodeSplitting();
      optimizeCriticalCSS();
      optimizeMemory();
    }, 0);
  }
}