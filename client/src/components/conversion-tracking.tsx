import { useEffect } from "react";

interface ConversionTrackingProps {
  eventType: 'page_view' | 'form_start' | 'form_submit' | 'phone_click' | 'apply_click';
  eventData?: {
    page_title?: string;
    form_type?: string;
    phone_number?: string;
    solution_type?: string;
    value?: number;
  };
}

export default function ConversionTracking({ eventType, eventData = {} }: ConversionTrackingProps) {
  useEffect(() => {
    // Google Analytics 4 Event Tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const gtag = (window as any).gtag;
      
      switch (eventType) {
        case 'page_view':
          gtag('config', 'G-XXXXXXXXXX', {
            page_title: eventData.page_title || document.title,
            page_location: window.location.href
          });
          break;
          
        case 'form_start':
          gtag('event', 'form_start', {
            event_category: 'engagement',
            form_type: eventData.form_type || 'contact',
            page_location: window.location.href
          });
          break;
          
        case 'form_submit':
          gtag('event', 'form_submit', {
            event_category: 'conversion',
            form_type: eventData.form_type || 'contact',
            value: eventData.value || 1,
            currency: 'USD'
          });
          
          // Enhanced ecommerce for lead value
          gtag('event', 'purchase', {
            transaction_id: `lead_${Date.now()}`,
            value: eventData.value || 100, // Average lead value
            currency: 'USD',
            items: [{
              item_id: eventData.form_type || 'contact_lead',
              item_name: `${eventData.form_type || 'Contact'} Lead`,
              category: 'Lead Generation',
              quantity: 1,
              price: eventData.value || 100
            }]
          });
          break;
          
        case 'phone_click':
          gtag('event', 'phone_call', {
            event_category: 'conversion',
            phone_number: eventData.phone_number || '(305) 307-4658',
            value: 150 // Phone leads typically higher value
          });
          break;
          
        case 'apply_click':
          gtag('event', 'apply_now_click', {
            event_category: 'conversion',
            solution_type: eventData.solution_type || 'general',
            page_location: window.location.href,
            value: 200 // Application leads highest value
          });
          break;
      }
    }
    
    // Facebook Pixel Tracking (if implemented)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const fbq = (window as any).fbq;
      
      switch (eventType) {
        case 'form_submit':
          fbq('track', 'Lead', {
            content_name: eventData.form_type || 'Contact Form',
            value: eventData.value || 100,
            currency: 'USD'
          });
          break;
          
        case 'apply_click':
          fbq('track', 'InitiateCheckout', {
            content_name: eventData.solution_type || 'Loan Application',
            value: 200,
            currency: 'USD'
          });
          break;
      }
    }
    
    // Custom event for internal tracking
    const customEvent = new CustomEvent('fundtek_conversion', {
      detail: {
        type: eventType,
        data: eventData,
        timestamp: new Date().toISOString()
      }
    });
    window.dispatchEvent(customEvent);
    
  }, [eventType, eventData]);

  return null;
}

// Hook for tracking form interactions
export function useFormTracking(formType: string) {
  const trackFormStart = () => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('fundtek_conversion', {
        detail: {
          type: 'form_start',
          data: { form_type: formType },
          timestamp: new Date().toISOString()
        }
      });
      window.dispatchEvent(event);
    }
  };

  const trackFormSubmit = (value?: number) => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('fundtek_conversion', {
        detail: {
          type: 'form_submit',
          data: { form_type: formType, value },
          timestamp: new Date().toISOString()
        }
      });
      window.dispatchEvent(event);
    }
  };

  return { trackFormStart, trackFormSubmit };
}

// Enhanced phone number click tracking
export function trackPhoneClick(phoneNumber: string = "(305) 307-4658") {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'phone_call', {
      event_category: 'conversion',
      phone_number: phoneNumber,
      value: 150
    });
  }
}

// Solution-specific application tracking
export function trackSolutionApply(solutionType: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'apply_now_click', {
      event_category: 'conversion',
      solution_type: solutionType,
      page_location: window.location.href,
      value: 200
    });
  }
}