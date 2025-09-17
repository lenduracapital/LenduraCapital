import { useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";
import SEOHead from "@/components/seo-head";
import SkipNavigation from "@/components/skip-navigation";

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "service";
}

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  openGraph?: OpenGraphData;
  jsonLd?: object | object[]; // Support multiple schemas
  className?: string;
  headerTransparent?: boolean;
  'data-testid'?: string;
}

export default function Layout({
  children,
  title,
  description,
  canonical,
  keywords,
  openGraph,
  jsonLd,
  className = '',
  headerTransparent = false,
  'data-testid': testId = 'layout'
}: LayoutProps) {
  
  useEffect(() => {
    // Inject Organization schema
    injectOrganizationSchema();
    
    // Inject custom JSON-LD schemas if provided
    if (jsonLd) {
      injectCustomSchemas(jsonLd);
    }

    // Performance monitoring
    if (typeof window !== 'undefined') {
      // Monitor Core Web Vitals
      measureWebVitals();
      
      // Monitor navigation timing
      measureNavigationTiming();
    }

    // Cleanup function
    return () => {
      // Remove custom schemas on unmount (but keep Organization schema)
      const customSchemas = document.querySelectorAll('script[type="application/ld+json"][data-component="layout-custom"]');
      customSchemas.forEach(script => script.remove());
    };
  }, [jsonLd]);

  const injectOrganizationSchema = () => {
    // Remove existing organization schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-component="layout-organization"]');
    if (existingScript) {
      return; // Keep the existing one to avoid duplicates
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Lendura Capital",
      "alternateName": "Lendura",
      "url": "https://lenduracapital.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lenduracapital.com/lendura-logo.png",
        "width": "400",
        "height": "400"
      },
      "description": "Professional business funding broker connecting businesses with lending partners across all 50 states and Canada. Specializing in term loans, merchant cash advances, equipment financing, SBA loans, and comprehensive financial solutions.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Brooklyn",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "telephone": "(305) 834-7168",
      "email": "admin@lenduracapital.com",
      "sameAs": [
        "https://www.instagram.com/lenduracapital/",
        "https://x.com/lenduracapital",
        "https://www.facebook.com/lenduracapital",
        "https://www.tiktok.com/@lenduracapital",
        "https://www.reddit.com/user/lenduracapital",
        "https://www.youtube.com/@lenduracapital",
        "https://www.yelp.com/biz/lendura-capital",
        "https://substack.com/@lenduracapital",
        "https://www.quora.com/profile/Lendura-Capital",
        "https://www.trustpilot.com/review/lenduracapital.com",
        "https://www.linkedin.com/company/lendura-capital"
      ],
      "areaServed": [
        {
          "@type": "Country",
          "name": "United States"
        },
        {
          "@type": "Country", 
          "name": "Canada"
        }
      ],
      "serviceType": [
        "Business Loan Brokerage",
        "Term Loans",
        "Lines of Credit", 
        "Merchant Cash Advance",
        "SBA Loans",
        "Debt Consolidation",
        "Equipment Financing",
        "Invoice Factoring",
        "Purchase Order Financing",
        "Commercial Real Estate Lending",
        "Credit Card Processing",
        "Credit Repair Services",
        "Digital Marketing Services"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Business Funding Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Term Loans",
              "description": "Traditional business term loans with competitive rates and flexible repayment terms"
            },
            "priceRange": "$10,000 - $750,000"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Merchant Cash Advance",
              "description": "Fast access to working capital based on future credit card sales"
            },
            "priceRange": "$10,000 - $750,000"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Equipment Financing", 
              "description": "Specialized financing for business equipment and machinery"
            },
            "priceRange": "$10,000 - $750,000"
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5"
      },
      "openingHours": "Mo-Fr 08:30-19:30",
      "paymentAccepted": ["Cash", "Check", "Wire Transfer"],
      "currenciesAccepted": "USD",
      "priceRange": "$10,000 - $750,000",
      "slogan": "Fast Business Funding Solutions - Approved in 24 Hours"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-component', 'layout-organization');
    script.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script);
  };

  const injectCustomSchemas = (schemas: object | object[]) => {
    // Remove existing custom schemas
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"][data-component="layout-custom"]');
    existingSchemas.forEach(script => script.remove());

    const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
    
    schemaArray.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-component', 'layout-custom');
      script.setAttribute('data-index', index.toString());
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });
  };

  const measureWebVitals = () => {
    // Measure Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry && window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_category: 'Web Vitals'
            });
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // Measure Cumulative Layout Shift (CLS)
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          let clsScore = 0;
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          });
          if (clsScore > 0 && window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsScore * 1000),
              event_category: 'Web Vitals'
            });
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('Performance observation failed:', error);
      }
    }
  };

  const measureNavigationTiming = () => {
    // Measure page load timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation && window.gtag) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          window.gtag('event', 'page_timing', {
            name: 'page_load_time',
            value: Math.round(loadTime),
            event_category: 'Performance'
          });
        }
      }, 0);
    });
  };

  return (
    <div 
      className={`min-h-screen bg-white text-black ${className}`}
      data-testid={testId}
    >
      <SEOHead 
        title={title}
        description={description}
        keywords={keywords}
        canonical={canonical}
        type={openGraph?.type || "website"}
        image={openGraph?.image}
      />
      
      <SkipNavigation />
      <Header transparent={headerTransparent} />
      
      <main 
        id="main-content"
        className="relative"
        data-testid="main-content"
      >
        {children}
      </main>
      
      <Footer />
      <BackToTop />
    </div>
  );
}

// Specialized Layout components for different page types
export const SolutionLayout = (props: Omit<LayoutProps, 'jsonLd'> & { solutionName: string }) => {
  const { solutionName, ...layoutProps } = props;
  
  const solutionSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": solutionName,
    "provider": {
      "@type": "FinancialService",
      "name": "Lendura Capital"
    },
    "serviceType": "Business Funding",
    "areaServed": ["United States", "Canada"],
    "description": props.description
  };

  return <Layout {...layoutProps} jsonLd={solutionSchema} />;
};

export const IndustryLayout = (props: Omit<LayoutProps, 'jsonLd'> & { industryName: string }) => {
  const { industryName, ...layoutProps } = props;
  
  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${industryName} Business Funding`,
    "description": props.description,
    "about": {
      "@type": "Thing",
      "name": industryName
    },
    "provider": {
      "@type": "FinancialService",
      "name": "Lendura Capital"
    }
  };

  return <Layout {...layoutProps} jsonLd={industrySchema} />;
};

// Note: Global gtag types are now defined in client/src/vite-env.d.ts