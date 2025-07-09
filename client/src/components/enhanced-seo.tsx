import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface EnhancedSEOProps {
  pageTitle?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function EnhancedSEO({ pageTitle = "FundTek Capital Group", breadcrumbs = [] }: EnhancedSEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(viewport);
    }

    // Add meta robots tag
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      (robots as HTMLMetaElement).name = 'robots';
      document.head.appendChild(robots);
    }
    (robots as HTMLMetaElement).content = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    // Enhanced JSON-LD breadcrumb structured data
    if (breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": `https://fundtekcapitalgroup.com${crumb.url}`
        }))
      };

      let script = document.querySelector('#breadcrumb-schema');
      if (!script) {
        script = document.createElement('script');
        script.id = 'breadcrumb-schema';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(breadcrumbSchema);
    }

    // Enhanced FAQ Schema for key pages
    const addFAQSchema = () => {
      const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast can I get business funding approval?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FundTek Capital Group provides business funding approvals in as little as 24 hours. Our streamlined process and extensive lender network enable us to deliver fast decisions for qualified businesses."
            }
          },
          {
            "@type": "Question", 
            "name": "What types of business funding does FundTek offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer 12+ financing solutions including Term Loans, Lines of Credit, SBA Loans, Equipment Financing, Merchant Cash Advance, Invoice Factoring, Debt Consolidation, and specialized services like Credit Repair and Digital Marketing."
            }
          },
          {
            "@type": "Question",
            "name": "What are the minimum requirements for business funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minimum qualifications include: 550+ credit score, 6+ months in business, and $10,000+ monthly revenue. We offer flexible requirements compared to traditional banks."
            }
          },
          {
            "@type": "Question",
            "name": "Does FundTek charge hidden fees?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No, FundTek Capital Group provides transparent pricing with all costs disclosed upfront. What you see is what you pay - no hidden fees or surprises."
            }
          },
          {
            "@type": "Question",
            "name": "Which industries does FundTek serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve 18+ industries including Construction, Healthcare, Restaurants, Retail, Manufacturing, Professional Services, Technology, Real Estate, and many more across the United States and Canada."
            }
          }
        ]
      };

      let faqScript = document.querySelector('#faq-schema');
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'faq-schema';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify(faqData);
    };

    // Add FAQ schema to homepage and key pages
    if (location === '/' || location === '/solutions' || location === '/about') {
      addFAQSchema();
    }

    // Enhanced tracking for page changes
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-C5XF22RXMM', {
        page_path: location,
        page_title: pageTitle,
        custom_map: {
          'dimension1': 'page_category'
        }
      });

      // Track page category for analytics
      let pageCategory = 'general';
      if (location.includes('/solutions/')) pageCategory = 'solutions';
      else if (location.includes('/industries/')) pageCategory = 'industries'; 
      else if (location === '/solutions') pageCategory = 'solutions_overview';
      else if (location === '/') pageCategory = 'homepage';

      (window as any).gtag('event', 'page_view', {
        page_category: pageCategory,
        page_path: location
      });
    }

  }, [location, pageTitle, breadcrumbs]);

  return null;
}