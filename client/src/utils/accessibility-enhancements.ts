// Accessibility enhancement utilities for Lighthouse optimization

export class AccessibilityEnhancer {
  // Keyboard navigation management
  static setupKeyboardNavigation() {
    // Ensure proper tab order
    const tabbableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    tabbableElements.forEach((element) => {
      if (!element.getAttribute('tabindex') && element.getAttribute('tabindex') !== '0') {
        element.setAttribute('tabindex', '0');
      }
    });

    // Add keyboard event handlers
    document.addEventListener('keydown', (e) => {
      // Skip links for screen readers
      if (e.key === 'Tab' && e.shiftKey) {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink && document.activeElement === document.body) {
          (skipLink as HTMLElement).focus();
        }
      }

      // Escape key handling for modals/dropdowns
      if (e.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [data-testid*="close"]');
          if (closeButton) {
            (closeButton as HTMLElement).click();
          }
        }
      }
    });
  }

  // ARIA labels enhancement
  static enhanceAriaLabels() {
    // Add missing ARIA labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
    buttons.forEach((button) => {
      const icon = button.querySelector('svg, img');
      const text = button.textContent?.trim();
      
      if (!text && icon) {
        const testId = button.getAttribute('data-testid');
        if (testId) {
          const label = testId.replace(/-/g, ' ').replace(/button|btn/i, '').trim();
          if (label) {
            button.setAttribute('aria-label', label.charAt(0).toUpperCase() + label.slice(1));
          }
        }
      }
    });

    // Add ARIA labels to form inputs without labels
    const inputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
    inputs.forEach((input) => {
      const placeholder = input.getAttribute('placeholder');
      const testId = input.getAttribute('data-testid');
      
      if (placeholder && !input.closest('label')) {
        input.setAttribute('aria-label', placeholder);
      } else if (testId) {
        const label = testId.replace(/input-/i, '').replace(/-/g, ' ');
        input.setAttribute('aria-label', label.charAt(0).toUpperCase() + label.slice(1));
      }
    });

    // Add ARIA roles where needed
    const navigations = document.querySelectorAll('nav:not([role])');
    navigations.forEach((nav) => {
      nav.setAttribute('role', 'navigation');
    });

    const sections = document.querySelectorAll('section:not([role])');
    sections.forEach((section) => {
      if (section.querySelector('h1, h2, h3')) {
        section.setAttribute('role', 'region');
      }
    });
  }

  // Color contrast validation and improvement
  static improveColorContrast() {
    // Define minimum contrast ratios
    const contrastRatios = {
      normal: 4.5,
      large: 3.0,
    };

    // Helper function to calculate luminance
    const getLuminance = (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    // Calculate contrast ratio
    const getContrastRatio = (color1: [number, number, number], color2: [number, number, number]) => {
      const lum1 = getLuminance(...color1);
      const lum2 = getLuminance(...color2);
      return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    };

    // Check and improve text contrast
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a, button, label');
    textElements.forEach((element) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Skip if transparent background
      if (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        return;
      }

      // Parse RGB values (simplified - in production, use a proper color parser)
      const colorMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      const bgMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      
      if (colorMatch && bgMatch) {
        const textColor: [number, number, number] = [
          parseInt(colorMatch[1]),
          parseInt(colorMatch[2]),
          parseInt(colorMatch[3])
        ];
        const bgColor: [number, number, number] = [
          parseInt(bgMatch[1]),
          parseInt(bgMatch[2]),
          parseInt(bgMatch[3])
        ];
        
        const contrast = getContrastRatio(textColor, bgColor);
        const fontSize = parseFloat(styles.fontSize);
        const isLarge = fontSize >= 18 || (fontSize >= 14 && styles.fontWeight === 'bold');
        const requiredContrast = isLarge ? contrastRatios.large : contrastRatios.normal;
        
        if (contrast < requiredContrast) {
          console.warn(`Low contrast detected: ${contrast.toFixed(2)} (required: ${requiredContrast})`, element);
          // Apply high contrast fix
          if (element.classList.contains('text-white')) {
            (element as HTMLElement).style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
          }
        }
      }
    });
  }

  // Focus management
  static setupFocusManagement() {
    // Add focus-visible polyfill behavior
    const focusableElements = document.querySelectorAll(
      'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((element) => {
      element.addEventListener('focus', () => {
        element.setAttribute('data-focus-visible', 'true');
      });

      element.addEventListener('blur', () => {
        element.removeAttribute('data-focus-visible');
      });
    });

    // Ensure focus trapping in modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        const modal = document.querySelector('[role="dialog"]:not([aria-hidden="true"])');
        if (modal) {
          const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstFocusable = focusableElements[0] as HTMLElement;
          const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              e.preventDefault();
              lastFocusable.focus();
            }
          } else {
            if (document.activeElement === lastFocusable) {
              e.preventDefault();
              firstFocusable.focus();
            }
          }
        }
      }
    });
  }

  // Screen reader optimizations
  static optimizeForScreenReaders() {
    // Add skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded skip-link';
    skipLink.setAttribute('tabindex', '0');
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Ensure main content has proper ID
    const mainContent = document.querySelector('main, [role="main"], #main-content');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }

    // Add live regions for dynamic content
    const liveRegion = document.createElement('div');
    liveRegion.id = 'live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);

    // Announce navigation changes
    let currentPath = window.location.pathname;
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== currentPath) {
        currentPath = window.location.pathname;
        const pageTitle = document.title;
        liveRegion.textContent = `Navigated to ${pageTitle}`;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Form accessibility
  static enhanceFormAccessibility() {
    // Associate labels with inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      const id = input.id;
      if (id) {
        const label = document.querySelector(`label[for="${id}"]`);
        if (!label) {
          // Look for nearby label
          const parentLabel = input.closest('label');
          if (parentLabel) {
            parentLabel.setAttribute('for', id);
          }
        }
      }

      // Add required indicators
      if (input.hasAttribute('required')) {
        input.setAttribute('aria-required', 'true');
        
        const label = document.querySelector(`label[for="${input.id}"]`) || input.closest('label');
        if (label && !label.textContent?.includes('*')) {
          const asterisk = document.createElement('span');
          asterisk.textContent = ' *';
          asterisk.setAttribute('aria-label', 'required');
          asterisk.className = 'text-red-500';
          label.appendChild(asterisk);
        }
      }
    });

    // Add error states
    const invalidInputs = document.querySelectorAll('input:invalid, select:invalid, textarea:invalid');
    invalidInputs.forEach((input) => {
      input.setAttribute('aria-invalid', 'true');
      
      // Add error message if not present
      let errorId = input.getAttribute('aria-describedby');
      if (!errorId) {
        errorId = `${input.id}-error`;
        input.setAttribute('aria-describedby', errorId);
        
        const errorMsg = document.createElement('div');
        errorMsg.id = errorId;
        errorMsg.className = 'text-red-500 text-sm mt-1';
        errorMsg.textContent = 'Please check this field';
        errorMsg.setAttribute('role', 'alert');
        input.parentNode?.insertBefore(errorMsg, input.nextSibling);
      }
    });
  }

  // Initialize all accessibility enhancements
  static initialize() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupKeyboardNavigation();
        this.enhanceAriaLabels();
        this.improveColorContrast();
        this.setupFocusManagement();
        this.optimizeForScreenReaders();
        this.enhanceFormAccessibility();
      });
    } else {
      this.setupKeyboardNavigation();
      this.enhanceAriaLabels();
      this.improveColorContrast();
      this.setupFocusManagement();
      this.optimizeForScreenReaders();
      this.enhanceFormAccessibility();
    }

    console.log('Accessibility enhancements initialized');
  }
}

// Auto-initialize accessibility enhancements
if (typeof window !== 'undefined') {
  AccessibilityEnhancer.initialize();
}

export default AccessibilityEnhancer;