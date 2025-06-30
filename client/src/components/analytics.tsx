import { useEffect } from "react";

// Google Analytics 4 tracking functions
export function initGA4() {
  // Initialize GA4 with your tracking ID
  const GA_TRACKING_ID = 'G-C5XF22RXMM'; // FundTek Capital Group tracking ID
  
  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_title: document.title,
      page_location: window.location.href
    });
  `;
  document.head.appendChild(script2);
}

// Track events
export function trackEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    });
  }
}

// Track form submissions
export function trackFormSubmission(formType: string, success: boolean = true) {
  trackEvent('form_submit', {
    event_category: 'form',
    event_label: formType,
    form_type: formType,
    success: success,
    value: success ? 1 : 0
  });
}

// Track page views
export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'G-XXXXXXXXXX', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
}

// Track conversion events
export function trackConversion(conversionType: 'loan_application' | 'contact_form' | 'phone_call') {
  trackEvent('conversion', {
    event_category: 'conversion',
    conversion_type: conversionType,
    value: 1
  });
}

// Analytics provider component
export default function Analytics() {
  useEffect(() => {
    initGA4();
  }, []);

  return null;
}