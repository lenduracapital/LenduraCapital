// Advanced performance optimizations for 90+ scores
export function enableUltraPerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Critical Performance API optimizations
  const enablePerformanceObserver = () => {
    if ('PerformanceObserver' in window) {
      // Monitor LCP for real-time optimization
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // If LCP is too slow, trigger immediate optimizations
            if (entry.startTime > 2500) {
              enableEmergencyOptimizations();
            }
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  };

  // Emergency optimizations for slow loading
  const enableEmergencyOptimizations = () => {
    // Disable non-critical animations
    document.documentElement.style.setProperty('--animation-duration', '0s');
    
    // Force GPU acceleration on all elements
    const criticalElements = document.querySelectorAll('video, .hero-section, img');
    criticalElements.forEach(el => {
      (el as HTMLElement).style.transform = 'translateZ(0)';
      (el as HTMLElement).style.willChange = 'transform';
    });
  };

  // Advanced service worker for aggressive caching
  const registerAdvancedServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Create inline service worker for critical caching
        const swCode = `
          const CACHE_NAME = 'fundtek-v2';
          const CRITICAL_ASSETS = [
            '/',
            '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png',
            '/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg'
          ];
          
          self.addEventListener('install', (e) => {
            e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CRITICAL_ASSETS)));
          });
          
          self.addEventListener('fetch', (e) => {
            e.respondWith(
              caches.match(e.request).then(response => response || fetch(e.request))
            );
          });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        navigator.serviceWorker.register(swUrl);
      });
    }
  };

  // Initialize all optimizations immediately
  enablePerformanceObserver();
  registerAdvancedServiceWorker();

  // Network-aware loading
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection && connection.effectiveType === '4g') {
      // Preload additional resources on fast connections
      setTimeout(() => {
        const video = document.createElement('link');
        video.rel = 'prefetch';
        video.href = '/attached_assets/Video (FundTek)_1751295081956.webm';
        document.head.appendChild(video);
      }, 1000);
    }
  }

  // Advanced font optimization
  const optimizeFonts = () => {
    document.fonts.ready.then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  };

  optimizeFonts();
}

// Ultra-critical CSS containment optimization
export function applyCriticalContainment() {
  const style = document.createElement('style');
  style.textContent = `
    /* Ultra-performance containment for 90+ scores */
    .hero-section { contain: layout style paint size; }
    .navbar { contain: layout style; }
    .footer { contain: layout style; }
    img, video { contain: layout style; }
    
    /* Advanced GPU acceleration */
    * { transform: translateZ(0); }
    .performance-critical { 
      will-change: transform, opacity;
      backface-visibility: hidden;
      perspective: 1000px;
    }
    
    /* Critical loading states */
    .loading { opacity: 0; transform: translateY(20px); }
    .loaded { opacity: 1; transform: translateY(0); transition: all 0.3s ease; }
  `;
  document.head.appendChild(style);
}