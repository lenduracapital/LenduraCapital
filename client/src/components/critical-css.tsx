import { useEffect } from 'react';

// Critical CSS and resource optimization component
export default function CriticalCSS() {
  useEffect(() => {
    // Inject critical above-the-fold CSS
    const criticalCSS = `
      /* Critical CSS for immediate paint */
      .hero-video-container {
        transform: translateZ(0);
        backface-visibility: hidden;
        will-change: transform;
      }
      
      /* Optimize font loading */
      @font-face {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2') format('woff2');
      }
      
      /* Prevent layout shift */
      img, video {
        max-width: 100%;
        height: auto;
      }
      
      /* Hardware acceleration for performance */
      .header-nav {
        transform: translateZ(0);
        will-change: transform;
      }
      
      /* Optimize button interactions */
      button {
        transform: translateZ(0);
        backface-visibility: hidden;
      }
      
      /* Prevent text flash */
      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        text-rendering: optimizeSpeed;
      }
    `;

    // Create and inject critical style element
    let criticalStyle = document.getElementById('critical-css');
    if (!criticalStyle) {
      criticalStyle = document.createElement('style');
      criticalStyle.id = 'critical-css';
      criticalStyle.innerHTML = criticalCSS;
      document.head.insertBefore(criticalStyle, document.head.firstChild);
    }

    // Preload key resources
    const preloadResources = [
      { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', as: 'style' },
      { href: 'https://fonts.gstatic.com', rel: 'preconnect', crossorigin: 'anonymous' }
    ];

    preloadResources.forEach(resource => {
      const link = document.createElement('link');
      if (resource.rel) {
        link.rel = resource.rel;
      } else {
        link.rel = 'preload';
        link.as = resource.as;
      }
      link.href = resource.href;
      if (resource.crossorigin) {
        link.crossOrigin = resource.crossorigin;
      }
      document.head.appendChild(link);
    });

    // Resource hints for external domains
    const resourceHints = [
      'https://www.googletagmanager.com',
      'https://form.jotform.com',
      'https://calendly.com'
    ];

    resourceHints.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

  }, []);

  return null;
}