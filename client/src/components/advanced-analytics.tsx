import { useEffect } from 'react';

// Advanced analytics and conversion tracking
export default function AdvancedAnalytics() {
  useEffect(() => {
    // Enhanced conversion tracking
    const trackConversions = () => {
      // Track external link clicks
      document.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const link = target.closest('a');
        
        if (link && link.href) {
          // Track Calendly clicks
          if (link.href.includes('calendly.com')) {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'schedule_consultation', {
                event_category: 'conversion',
                event_label: 'calendly_click',
                value: 1
              });
            }
          }
          
          // Track Jotform clicks  
          if (link.href.includes('jotform.com')) {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'start_application', {
                event_category: 'conversion', 
                event_label: 'jotform_click',
                value: 1
              });
            }
          }

          // Track phone number clicks
          if (link.href.includes('tel:')) {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'phone_call', {
                event_category: 'conversion',
                event_label: 'phone_click',
                value: 1
              });
            }
          }

          // Track email clicks
          if (link.href.includes('mailto:')) {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'email_contact', {
                event_category: 'conversion',
                event_label: 'email_click', 
                value: 1
              });
            }
          }
        }
      });

      // Track scroll depth
      let maxScroll = 0;
      const trackScrollDepth = () => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          
          // Track milestone scroll depths
          if ([25, 50, 75, 90].includes(scrollPercent)) {
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'scroll_depth', {
                event_category: 'engagement',
                event_label: `${scrollPercent}%`,
                value: scrollPercent
              });
            }
          }
        }
      };

      window.addEventListener('scroll', trackScrollDepth);

      // Track time on page
      const startTime = Date.now();
      const trackTimeOnPage = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'time_on_page', {
            event_category: 'engagement',
            value: timeSpent
          });
        }
      };

      // Track time on page when user leaves
      window.addEventListener('beforeunload', trackTimeOnPage);

      // Track engagement milestones
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'engaged_user', {
            event_category: 'engagement',
            event_label: '30_seconds',
            value: 1
          });
        }
      }, 30000); // 30 seconds

      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'highly_engaged_user', {
            event_category: 'engagement', 
            event_label: '2_minutes',
            value: 1
          });
        }
      }, 120000); // 2 minutes
    };

    // Error tracking
    const trackErrors = () => {
      window.addEventListener('error', (event) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'javascript_error', {
            event_category: 'error',
            event_label: event.message,
            value: 0
          });
        }
      });

      // Track unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'promise_rejection', {
            event_category: 'error',
            event_label: event.reason,
            value: 0
          });
        }
      });
    };

    // Initialize tracking
    trackConversions();
    trackErrors();

  }, []);

  return null;
}