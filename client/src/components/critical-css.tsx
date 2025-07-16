import { useEffect } from 'react';

// Critical CSS and resource optimization component
export default function CriticalCSS() {
  useEffect(() => {
    // Inject critical above-the-fold CSS
    const criticalCSS = `
      /* Critical CSS for immediate paint */
      .hero-video-container {
        backface-visibility: hidden;
        transform: translateZ(0);
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
      
      /* Enhanced video and image loading performance */
      video {
        max-width: 100%;
        height: auto;
        transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden;
      }
      
      img {
        max-width: 100%;
        height: auto;
        transform: translateZ(0);
        will-change: transform;
        backface-visibility: hidden;
      }
      
      /* Hardware acceleration for performance */
      .header-nav {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
      
      /* Optimize button interactions */
      button {
        backface-visibility: hidden;
        transform: translateZ(0);
      }
      
      /* Prevent text flash and optimize rendering */
      body {
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
        text-rendering: optimizeSpeed;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Optimize critical above-the-fold content */
      .hero-section {
        contain: layout style paint;
        transform: translateZ(0);
      }
      
      /* Reduce layout thrashing */
      * {
        box-sizing: border-box;
      }
      
      /* Optimize scroll performance */
      html {
        scroll-behavior: smooth;
      }
      
      /* Image placeholder optimization */
      .image-placeholder {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
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