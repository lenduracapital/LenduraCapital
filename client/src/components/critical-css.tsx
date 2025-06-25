import { useEffect } from 'react';

// Critical CSS injection for above-the-fold content
export default function CriticalCSS() {
  useEffect(() => {
    const criticalStyles = `
      /* Critical above-the-fold styles */
      .hero-section {
        min-height: 100vh;
        position: relative;
        overflow: hidden;
      }
      
      .hero-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        will-change: transform;
        transform: translateZ(0);
      }
      
      .header-nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 50;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }
      
      /* Optimize text rendering */
      body {
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* Prevent flash of unstyled content */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Hardware acceleration for animations */
      .animate-element {
        transform: translateZ(0);
        will-change: transform, opacity;
      }
      
      /* Optimize button interactions */
      .btn-optimized {
        transform: translateZ(0);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      .btn-optimized:hover {
        transform: translateY(-1px) translateZ(0);
      }
    `;

    // Inject critical CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalStyles;
    styleElement.setAttribute('data-critical', 'true');
    document.head.insertBefore(styleElement, document.head.firstChild);

    return () => {
      const criticalStyle = document.querySelector('style[data-critical="true"]');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };
  }, []);

  return null;
}