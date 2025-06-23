import { useEffect } from "react";

interface EnhancedSchemaProps {
  pageType: 'homepage' | 'solutions' | 'contact' | 'solution-detail';
  solutionName?: string;
  faqData?: Array<{ question: string; answer: string }>;
}

export default function EnhancedSchema({ pageType, solutionName, faqData }: EnhancedSchemaProps) {
  useEffect(() => {
    // Base organization schema - using any type to avoid TypeScript conflicts
    const organizationSchema: any = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "FundTek Capital Group",
      "url": "https://fundtekcapital.com",
      "logo": "https://fundtekcapital.com/assets/logo.png",
      "description": "Professional business funding solutions including term loans, merchant cash advances, and equipment financing serving businesses nationwide with headquarters in Miami, Florida.",
      "telephone": "(305) 307-4658",
      "email": "admin@fundtekcapital.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "serviceType": [
        "Business Loans",
        "Term Loans", 
        "Merchant Cash Advance",
        "Equipment Financing",
        "SBA Loans",
        "Lines of Credit",
        "Invoice Factoring",
        "P.O. Financing"
      ],
      "priceRange": "$5,000 - $5,000,000",
      "openingHours": "Mo-Fr 09:00-18:00",
      "sameAs": [
        "https://www.linkedin.com/company/fundtek-capital-group",
        "https://www.facebook.com/fundtekcapital"
      ]
    };

    // LocalBusiness schema for Miami location
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "FundTek Capital Group",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "Florida",
        "addressCountry": "United States"
      },
      "telephone": "(305) 307-4658",
      "url": "https://fundtekcapital.com",
      "openingHours": [
        "Mo-Fr 09:00-18:00"
      ],
      "priceRange": "$$$"
    };

    // FAQ schema if FAQ data is provided
    let faqSchema = null;
    if (faqData && faqData.length > 0) {
      faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
    }

    // Service-specific schema for solution pages
    let serviceSchema = null;
    if (pageType === 'solution-detail' && solutionName) {
      const serviceDescriptions = {
        'term-loans': 'Fixed-rate business term loans with competitive rates and flexible repayment terms for business expansion and working capital needs.',
        'merchant-cash-advance': 'Fast merchant cash advances based on future credit card sales, providing quick access to business capital.',
        'equipment-financing': 'Specialized equipment financing solutions for purchasing or upgrading business equipment and machinery.',
        'sba-loans': 'SBA guaranteed loans with favorable terms and lower down payments for qualified small businesses.',
        'lines-of-credit': 'Flexible business lines of credit providing on-demand access to working capital when you need it.',
        'invoice-factoring': 'Invoice factoring services to convert outstanding invoices into immediate cash flow for your business.',
        'po-financing': 'Purchase order financing to fulfill large orders and grow your business without cash flow constraints.'
      };

      serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": solutionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        "description": serviceDescriptions[solutionName as keyof typeof serviceDescriptions] || "Professional business funding solution",
        "provider": {
          "@type": "FinancialService",
          "name": "FundTek Capital Group",
          "telephone": "(305) 307-4658",
          "url": "https://fundtekcapital.com"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "category": "Business Financing"
      };
    }

    // Breadcrumb schema for navigation
    let breadcrumbSchema = null;
    if (pageType !== 'homepage') {
      const breadcrumbItems = [
        { name: "Home", url: "https://fundtekcapital.com/" }
      ];

      if (pageType === 'solutions') {
        breadcrumbItems.push({ name: "Solutions", url: "https://fundtekcapital.com/solutions" });
      } else if (pageType === 'solution-detail' && solutionName) {
        breadcrumbItems.push(
          { name: "Solutions", url: "https://fundtekcapital.com/solutions" },
          { 
            name: solutionName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '), 
            url: `https://fundtekcapital.com/solutions/${solutionName}` 
          }
        );
      } else if (pageType === 'contact') {
        breadcrumbItems.push({ name: "Contact", url: "https://fundtekcapital.com/contact" });
      }

      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    }

    // Combine all schemas
    const schemas = [organizationSchema];
    
    if (pageType === 'homepage' || pageType === 'contact') {
      schemas.push(localBusinessSchema);
    }
    
    if (serviceSchema) schemas.push(serviceSchema);
    if (faqSchema) schemas.push(faqSchema);
    if (breadcrumbSchema) schemas.push(breadcrumbSchema);

    // Update or create script tags for each schema
    schemas.forEach((schema, index) => {
      const scriptId = `schema-${pageType}-${index}`;
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      
      script.textContent = JSON.stringify(schema);
    });

    // Cleanup function to remove old schemas
    return () => {
      schemas.forEach((_, index) => {
        const scriptId = `schema-${pageType}-${index}`;
        const script = document.getElementById(scriptId);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, [pageType, solutionName, faqData]);

  return null;
}