// Enhanced Cumulative Layout Shift (CLS) prevention system
// Target: Reduce CLS from 0.3+ to <0.1

interface CLSMetrics {
  value: number;
  hadRecentInput: boolean;
}

export function preventCLS() {
  if (typeof window === 'undefined') return;

  // Apply immediate critical CSS to prevent layout shifts
  applyCriticalCLSPrevention();
  
  // Set up font loading optimization
  optimizeFontLoading();
  
  // Stabilize dynamic content areas
  stabilizeDynamicContent();
  
  // Monitor and adjust for layout shifts
  monitorLayoutShifts();
  
  // Set up image loading stability
  stabilizeImageLoading();
  
  // Prevent navigation-related shifts
  stabilizeNavigation();

  // Apply hero-specific optimizations
  preventHeroLayoutShift();

  console.log('Enhanced CLS prevention system initialized');
  
  // Monitor page performance
  if ('PerformanceObserver' in window) {
    setTimeout(() => {
      const perfObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (entry.name === 'largest-contentful-paint') {
            console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
          }
        });
      });
      
      try {
        perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        // Performance observer not supported
      }
    }, 1000);
  }
}

function applyCriticalCLSPrevention() {
  const criticalStyle = document.createElement('style');
  criticalStyle.id = 'critical-cls-prevention';
  criticalStyle.textContent = `
    /* CRITICAL CSS for CLS prevention - Applied immediately */
    
    /* Prevent font loading shifts */
    html {
      font-size: 16px;
      line-height: 1.5;
    }
    
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      min-height: 100vh;
      font-display: swap;
    }
    
    /* Runtime hero section adjustments only */
    
    /* Runtime-specific UI adjustments only - core styles are in index.css */
    
    /* Chat widget space reservation */
    .chat-widget-space {
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      width: 60px;
      height: 60px;
      pointer-events: none;
      z-index: 1000;
    }
    
    /* Skeleton loading states */
    .loading-skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }
    
    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    /* Prevent reflow during font load */
    h1, h2, h3, h4, h5, h6 {
      line-height: 1.2;
      margin: 0;
      contain: layout;
    }
    
    /* Mobile runtime optimizations */
    @media (max-width: 768px) {
      video {
        -webkit-transform: translateZ(0);
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
      }
    }
  `;
  
  // Insert at the very beginning of head for immediate application
  document.head.insertBefore(criticalStyle, document.head.firstChild);
}

function optimizeFontLoading() {
  // Use font-display: swap for faster text rendering
  const fontOptimizationStyle = document.createElement('style');
  fontOptimizationStyle.textContent = `
    /* Runtime font loading optimization */
    .fonts-loading {
      font-display: swap;
    }
    
    /* Fallback font metrics to match Inter */
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size-adjust: 0.5;
    }
    
    /* Prevent invisible text during font load */
    .fonts-loading * {
      visibility: visible !important;
    }
  `;
  
  document.head.appendChild(fontOptimizationStyle);

  // Mark when fonts are loading
  document.documentElement.classList.add('fonts-loading');
  
  // Font loading optimization
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    });
    
    // Set timeout to prevent indefinite loading state
    setTimeout(() => {
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    }, 3000);
  }
}

function stabilizeDynamicContent() {
  const stabilizationStyle = document.createElement('style');
  stabilizationStyle.textContent = `
    /* Stabilize content that loads dynamically */
    
    /* Reserve space for testimonials */
    .testimonial-carousel {
      min-height: 300px;
      contain: layout style;
    }
    
    /* Reserve space for form elements */
    .contact-form {
      min-height: 400px;
      contain: layout;
    }
    
    /* Stabilize card grids */
    .card-grid {
      display: grid;
      gap: 1rem;
      contain: layout;
    }
    
    /* Industry/solution cards */
    .industry-card, .solution-card {
      min-height: 200px;
      contain: layout style;
    }
    
    /* FAQ sections */
    .faq-item {
      contain: layout;
    }
    
    /* Calculator components */
    .calculator-widget {
      min-height: 400px;
      contain: layout style;
    }
  `;
  
  document.head.appendChild(stabilizationStyle);
}

function monitorLayoutShifts() {
  if (!('PerformanceObserver' in window)) return;
  
  let cumulativeLayoutShift = 0;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as any[];
      
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          cumulativeLayoutShift += entry.value;
          
          // Log significant layout shifts for debugging
          if (entry.value > 0.05) {
            console.warn('Significant layout shift detected:', {
              value: entry.value,
              cumulative: cumulativeLayoutShift,
              sources: entry.sources,
              lastInputTime: entry.lastInputTime
            });
          }
        }
      });
      
      // Log total CLS periodically
      if (cumulativeLayoutShift > 0.1) {
        console.warn(`High CLS detected: ${cumulativeLayoutShift.toFixed(3)} (target: <0.1)`);
      }
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.warn('Layout shift monitoring not supported:', error);
  }
}

function stabilizeImageLoading() {
  // Add intersection observer for images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Set dimensions before loading to prevent shifts
        if (img.dataset.width && img.dataset.height) {
          img.style.width = img.dataset.width + 'px';
          img.style.height = img.dataset.height + 'px';
        }
        
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('loading-skeleton');
        }
        
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px'
  });
  
  // Observe all images with data-src
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  });
}

function stabilizeNavigation() {
  // Reserve space for navigation elements
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    /* Navigation stability */
    header {
      position: relative;
      contain: layout style;
      min-height: 80px;
    }
    
    /* Mobile menu stability */
    .mobile-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      contain: layout;
    }
    
    /* Breadcrumb stability */
    .breadcrumb {
      min-height: 2rem;
      contain: layout;
    }
    
    /* Footer stability */
    footer {
      contain: layout style;
      min-height: 300px;
    }
  `;
  
  document.head.appendChild(navStyle);

  // Add class when JS is loaded to prevent navigation shifts
  document.documentElement.classList.add('js-loaded');
}

// Export additional utilities for specific components
export function preventHeroLayoutShift() {
  const heroStyle = document.createElement('style');
  heroStyle.textContent = `
    .hero-section {
      width: 100%;
      height: 100vh;
      min-height: 600px;
      position: relative;
      overflow: hidden;
      contain: layout style paint;
    }
    
    .hero-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      padding: 2rem;
      contain: layout;
    }
    
    .hero-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    
    .hero-background img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  `;
  document.head.appendChild(heroStyle);
}