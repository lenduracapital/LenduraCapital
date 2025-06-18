import { useEffect } from 'react';

interface SchemaMarkupProps {
  page: string;
}

export function AdvancedSchemaMarkup({ page }: SchemaMarkupProps) {
  useEffect(() => {
    // Remove existing schema markup
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
    existingSchemas.forEach(script => script.remove());

    const schemas = [];

    // Organization Schema (appears on all pages)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "FundTek Capital Group",
      "alternateName": "FundTek Capital",
      "url": "https://fundtekcapital.com",
      "logo": "https://fundtekcapital.com/logo.png",
      "image": "https://fundtekcapital.com/logo.png",
      "description": "Professional business funding solutions including SBA loans, equipment financing, and working capital. Fast approval in 24 hours with flexible terms.",
      "telephone": "(305) 307-4658",
      "email": "info@fundtekcapitalgroup.com",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US",
        "addressRegion": "FL",
        "addressLocality": "Miami"
      },
      "areaServed": "US",
      "serviceType": "Business Financing",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Business Financing Solutions",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SBA Loans",
              "description": "Government-backed loans with competitive rates"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Equipment Financing",
              "description": "Secure funding for business equipment purchases"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Working Capital Loans",
              "description": "Fast access to business operating capital"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    schemas.push(organizationSchema);

    // Page-specific schemas
    if (page === 'homepage') {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fundtekcapital.com"
          }
        ]
      };

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How fast can I get approved for business funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "FundTek Capital Group provides approval decisions in as little as 24 hours with our streamlined application process."
            }
          },
          {
            "@type": "Question",
            "name": "What types of business financing do you offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer 10 different financing solutions including SBA loans, equipment financing, working capital, merchant cash advances, and more."
            }
          },
          {
            "@type": "Question",
            "name": "What are the minimum requirements for funding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Minimum requirements include 480+ credit score, 3+ months in business, and $5,000+ monthly revenue."
            }
          }
        ]
      };

      schemas.push(breadcrumbSchema, faqSchema);
    }

    if (page === 'solutions') {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Business Financing Solutions",
        "description": "Comprehensive list of business funding options from FundTek Capital Group",
        "numberOfItems": 10,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "Term Loans",
              "description": "Traditional business loans with fixed terms and competitive rates",
              "provider": {
                "@type": "Organization",
                "name": "FundTek Capital Group"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "SBA Loans",
              "description": "Government-backed loans with favorable terms for qualified businesses",
              "provider": {
                "@type": "Organization",
                "name": "FundTek Capital Group"
              }
            }
          }
        ]
      };

      schemas.push(serviceSchema);
    }

    if (page === 'testimonials') {
      const reviewSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "FundTek Capital Group",
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Maria Gonzalez"
            },
            "reviewBody": "FundTek helped us expand Gonzalez Bistro when our equipment failed. The process was smooth and funding arrived quickly.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FundTek Capital Group"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "David Martinez"
            },
            "reviewBody": "Our auto repair shop needed quick funding for diagnostic equipment. FundTek delivered exactly what we needed.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "publisher": {
              "@type": "Organization",
              "name": "FundTek Capital Group"
            }
          }
        ]
      };

      schemas.push(reviewSchema);
    }

    // Add all schemas to the document
    schemas.forEach(schema => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      // Cleanup on unmount
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
      schemaScripts.forEach(script => script.remove());
    };
  }, [page]);

  return null;
}