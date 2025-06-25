import { useEffect } from 'react';

// Semantic HTML structure optimization for better SEO
export default function HeadingOptimizer() {
  useEffect(() => {
    // Ensure proper heading hierarchy throughout the site
    const optimizeHeadings = () => {
      // Check for missing H1 tags and add them if needed
      const h1Elements = document.querySelectorAll('h1');
      if (h1Elements.length === 0) {
        const firstH2 = document.querySelector('h2');
        if (firstH2) {
          const h1 = document.createElement('h1');
          h1.textContent = firstH2.textContent || 'FundTek Capital Group';
          h1.className = firstH2.className;
          h1.style.cssText = firstH2.style.cssText;
          firstH2.parentNode?.replaceChild(h1, firstH2);
        }
      }

      // Ensure logical heading sequence (H1 > H2 > H3)
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let currentLevel = 0;
      
      headings.forEach((heading: any) => {
        const level = parseInt(heading.tagName.substring(1));
        
        // Skip if heading level jumps more than 1
        if (level > currentLevel + 1 && currentLevel > 0) {
          // Adjust heading level to maintain hierarchy
          const newLevel = Math.min(level, currentLevel + 1);
          const newHeading = document.createElement(`h${newLevel}`);
          newHeading.textContent = heading.textContent;
          newHeading.className = heading.className;
          newHeading.style.cssText = heading.style.cssText;
          heading.parentNode?.replaceChild(newHeading, heading);
          currentLevel = newLevel;
        } else {
          currentLevel = level;
        }
      });
    };

    // Add semantic landmarks for better accessibility and SEO
    const addSemanticLandmarks = () => {
      // Ensure main content has proper landmark
      const mainContent = document.querySelector('main') || 
                         document.querySelector('[role="main"]') ||
                         document.querySelector('#main-content');
      
      if (!mainContent) {
        const firstSection = document.querySelector('section');
        if (firstSection && !firstSection.closest('header, footer, nav')) {
          firstSection.setAttribute('role', 'main');
          firstSection.setAttribute('id', 'main-content');
        }
      }

      // Add skip navigation if missing
      if (!document.querySelector('a[href="#main-content"]')) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white p-2 z-50';
        document.body.insertBefore(skipLink, document.body.firstChild);
      }
    };

    // Run optimizations after DOM is ready
    setTimeout(() => {
      optimizeHeadings();
      addSemanticLandmarks();
    }, 100);

  }, []);

  return null;
}