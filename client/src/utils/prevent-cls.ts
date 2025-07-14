// Prevent Cumulative Layout Shift (CLS) issues

export function preventCLS() {
  // Reserve space for dynamic elements
  if (typeof window !== 'undefined') {
    // Prevent font loading CLS
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }

    // Add class to indicate JS is loaded
    document.documentElement.classList.add('js-loaded');
    
    // Prevent layout shift from chat widget
    const style = document.createElement('style');
    style.textContent = `
      /* Reserve space for elements that appear after page load */
      .chat-widget-space {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 56px;
        height: 56px;
        pointer-events: none;
      }
      
      /* Stabilize hero section */
      .hero-section {
        contain: layout style paint;
      }
      
      /* Prevent font flash */
      .fonts-loaded body {
        font-synthesis: none;
      }
      
      /* Mobile-specific CLS prevention */
      @media (max-width: 768px) {
        /* Prevent video layout shift on mobile */
        video {
          aspect-ratio: 16/9;
          width: 100%;
          height: auto;
        }
        
        /* Stabilize mobile navigation */
        header {
          contain: layout;
          height: var(--header-height, 64px);
        }
      }
    `;
    document.head.appendChild(style);
  }
}