import { useEffect } from 'react';

interface SchemaProps {
  type: 'homepage' | 'solutions' | 'industry' | 'solution-detail';
  pageData?: {
    title?: string;
    description?: string;
    industry?: string;
    solution?: string;
  };
}

export default function EnhancedSchema({ type, pageData = {} }: SchemaProps) {
  useEffect(() => {
    let schemaData: any = {};

    switch (type) {
      case 'homepage':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "FundTek Capital Group",
          "url": "https://fundtekcapital.com",
          "logo": "https://fundtekcapital.com/favicon.svg",
          "description": "Professional business funding broker connecting businesses with lending partners for comprehensive financial solutions including term loans, equipment financing, and merchant cash advances.",
          "telephone": "(305) 307-4658",
          "email": "admin@fundtekcapitalgroup.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Miami",
            "addressRegion": "FL",
            "postalCode": "33101",
            "addressCountry": "US"
          },
          "areaServed": "United States",
          "serviceType": [
            "Business Loan Brokerage",
            "Term Loans",
            "Merchant Cash Advance",
            "Equipment Financing",
            "SBA Loans",
            "Lines of Credit",
            "Invoice Factoring",
            "Commercial Real Estate Lending",
            "Debt Consolidation"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5"
          },
          "openingHours": ["Mo-Fr 09:00-18:00"],
          "priceRange": "$10,000 - $5,000,000"
        };
        break;

      case 'solutions':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Business Funding Solutions",
          "description": "Comprehensive business financing options including term loans, equipment financing, merchant cash advances, and specialized funding solutions.",
          "numberOfItems": "12",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Term Loans",
              "description": "Traditional business term loans with competitive rates",
              "url": "https://fundtekcapital.com/solutions/term-loans"
            },
            {
              "@type": "ListItem", 
              "position": 2,
              "name": "Equipment Financing",
              "description": "Specialized financing for business equipment and machinery",
              "url": "https://fundtekcapital.com/solutions/equipment-financing"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Merchant Cash Advance",
              "description": "Fast access to working capital based on future sales",
              "url": "https://fundtekcapital.com/solutions/merchant-cash-advance"
            }
          ]
        };
        break;

      case 'solution-detail':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": pageData.title || "Business Funding Solution",
          "description": pageData.description || "Professional business funding solution",
          "provider": {
            "@type": "FinancialService",
            "name": "FundTek Capital Group",
            "telephone": "(305) 307-4658"
          },
          "areaServed": "United States",
          "serviceType": "Business Financing"
        };
        break;

      case 'industry':
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `${pageData.industry} Business Funding`,
          "description": `Specialized business funding solutions for ${pageData.industry} companies`,
          "mainEntity": {
            "@type": "FinancialService",
            "name": "FundTek Capital Group",
            "serviceType": `${pageData.industry} Business Financing`
          }
        };
        break;
    }

    // Inject schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', type);
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[data-schema="${type}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, pageData]);

  return null;
}