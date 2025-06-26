// Performance utilities for quick optimizations

export function preloadCriticalImages() {
  const criticalImages = [
    '/attached_assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750718184734.png', // Logo
    '/attached_assets/download (2)_1750787760177.jpg' // Hero background
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

export function deferNonCriticalCSS() {
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  links.forEach(link => {
    if (link.getAttribute('href')?.includes('googleapis')) {
      link.setAttribute('media', 'print');
      link.addEventListener('load', function() {
        this.setAttribute('media', 'all');
      });
    }
  });
}

export function enableResourceHints() {
  // DNS prefetch for external domains
  const domains = ['form.jotform.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });
}

export function optimizeImages() {
  // Add intersection observer for lazy loading images
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}