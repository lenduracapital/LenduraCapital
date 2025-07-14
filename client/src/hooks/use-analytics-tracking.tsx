import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Define event types for better type safety
export type AnalyticsEvent = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

// Track page views with time spent
export const usePageTracking = () => {
  const [location] = useLocation();
  
  useEffect(() => {
    const startTime = Date.now();
    
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location,
        page_title: document.title,
      });
    }
    
    // Track time spent on page when leaving
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_time_spent', {
          event_category: 'engagement',
          event_label: location,
          value: timeSpent,
        });
      }
    };
  }, [location]);
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, ctaLocation: string, ctaDestination?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      event_category: 'engagement',
      event_label: ctaName,
      cta_location: ctaLocation,
      cta_destination: ctaDestination,
    });
  }
  
  // Also send to backend for persistent tracking
  fetch('/api/analytics/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'cta_click',
      data: {
        ctaName,
        ctaLocation,
        ctaDestination,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      }
    })
  }).catch(() => {
    // Silently fail - don't interrupt user experience
  });
};

// Track scroll depth
export const useScrollTracking = () => {
  useEffect(() => {
    let maxScroll = 0;
    const checkpoints = [25, 50, 75, 90]; // Percentage points to track
    const tracked = new Set<number>();
    
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      maxScroll = Math.max(maxScroll, scrollPercentage);
      
      // Track milestone percentages
      checkpoints.forEach(checkpoint => {
        if (scrollPercentage >= checkpoint && !tracked.has(checkpoint)) {
          tracked.add(checkpoint);
          
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${checkpoint}%`,
              value: checkpoint,
            });
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      // Track max scroll depth when leaving page
      if (maxScroll > 0 && typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'max_scroll_depth', {
          event_category: 'engagement',
          value: maxScroll,
        });
      }
    };
  }, []);
};

// Track form interactions
export const trackFormInteraction = (formName: string, action: 'start' | 'abandon' | 'complete', fieldName?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `form_${action}`, {
      event_category: 'form_interaction',
      event_label: formName,
      form_field: fieldName,
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'external_link_click', {
      event_category: 'outbound',
      event_label: linkText,
      destination_url: url,
    });
  }
};

// Track video interactions
export const trackVideoInteraction = (action: 'play' | 'pause' | 'complete', videoTitle: string, progress?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', `video_${action}`, {
      event_category: 'video_engagement',
      event_label: videoTitle,
      value: progress,
    });
  }
};

// Custom hook for comprehensive analytics
export const useAnalytics = () => {
  usePageTracking();
  useScrollTracking();
  
  return {
    trackCTAClick,
    trackFormInteraction,
    trackExternalLink,
    trackVideoInteraction,
  };
};