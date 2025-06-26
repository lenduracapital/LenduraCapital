// Safe speed optimizations for Isaac & Agent collaboration

export function initializeSpeedOptimizations() {
  // 1. Preload critical fonts
  preloadCriticalResources();
  
  // 2. Optimize images loading
  setupLazyImageLoading();
  
  // 3. Defer non-critical resources
  deferNonCriticalResources();
  
  // 4. Setup connection optimizations
  setupConnectionOptimizations();
}

function preloadCriticalResources() {
  const criticalResources = [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
    { href: '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750718184734.png', as: 'image' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'style') {
      link.onload = function() { (this as any).rel = 'stylesheet'; };
    }
    document.head.appendChild(link);
  });
}

function setupLazyImageLoading() {
  // Enhanced lazy loading for all images
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          
          // Add loading placeholder
          img.style.filter = 'blur(5px)';
          img.style.transition = 'filter 0.3s';
          
          img.src = img.dataset.src!;
          img.onload = () => {
            img.style.filter = 'none';
            img.removeAttribute('data-src');
          };
          
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

function deferNonCriticalResources() {
  // Defer loading of non-critical CSS and JS
  window.addEventListener('load', () => {
    // Load non-critical CSS after page load
    const nonCriticalCSS = [
      'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
    ];

    nonCriticalCSS.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.media = 'print';
      link.onload = function() { this.media = 'all'; };
      document.head.appendChild(link);
    });
  });
}

function setupConnectionOptimizations() {
  // DNS prefetch for external domains
  const domains = [
    '//form.jotform.com',
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//www.google-analytics.com'
  ];

  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });
}

// Video optimization specifically for large video files
export function optimizeVideoLoading(videoElement: HTMLVideoElement) {
  // Check connection speed
  const connection = (navigator as any).connection;
  
  if (connection) {
    // Adjust video quality based on connection
    if (connection.effectiveType === '3g' || connection.effectiveType === 'slow-2g') {
      // Lower quality for slow connections
      videoElement.style.display = 'none';
      console.log('Video hidden due to slow connection');
      return false;
    }
  }

  // Optimize video loading
  videoElement.preload = 'metadata';
  videoElement.setAttribute('playsinline', '');
  
  return true;
}

// Page transition optimizations
export function setupPageTransitions() {
  // Prefetch likely next pages
  const commonLinks = document.querySelectorAll('a[href^="/"]');
  
  commonLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const href = (link as HTMLAnchorElement).href;
      
      // Prefetch the page
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = href;
      document.head.appendChild(prefetchLink);
    }, { once: true });
  });
}