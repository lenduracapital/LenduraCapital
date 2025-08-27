import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: "website" | "article" | "service";
  image?: string;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords = "business funding, term loans, merchant cash advance, equipment financing, SBA loans",
  canonical,
  type = "website",
  image = "/assets/fundtek-og-image.jpg"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag("description", description);
    
    // Update keywords
    updateMetaTag("keywords", keywords);
    
    // Update canonical
    if (canonical) {
      updateLinkTag("canonical", canonical);
    }

    // Open Graph tags
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:type", type);
    updateMetaProperty("og:image", image);
    updateMetaProperty("og:site_name", "Lendura Capital");
    
    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Enhanced structured data for financial service broker
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Lendura Capital",
      "url": "https://lenduracapital.com",
      "logo": "/favicon.svg",
      "description": "Professional business funding broker connecting businesses with lending partners across all 50 states and Canada. We specialize in term loans, merchant cash advances, equipment financing, SBA loans, and comprehensive financial solutions.",
      "telephone": "(305) 834-7168",
      "email": "admin@lenduracapital.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2727 Coney Island Ave",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "postalCode": "11235",
        "addressCountry": "US"
      },
      "areaServed": ["United States", "Canada"],
      "serviceType": [
        "Business Loan Brokerage",
        "Term Loans",
        "Lines of Credit",
        "Cash Advance",
        "SBA Loans",
        "Debt Consolidation",
        "Equipment Loans",
        "Factoring",
        "P.O. Financing",
        "CRE Lending",
        "Card Processing",
        "Credit Repair",
        "Marketing"
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
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Equipment Financing",
              "description": "Specialized financing for business equipment, machinery, and technology purchases"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Merchant Cash Advance",
              "description": "Fast access to working capital based on future credit card sales with daily repayment"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "SBA Loans",
              "description": "Government-backed SBA loans with lower down payments and competitive interest rates"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service", 
              "name": "Lines of Credit",
              "description": "Flexible revolving credit lines for ongoing business expenses and cash flow management"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5"
      },
      "openingHours": [
        "Mo-Fr 08:30-19:30"
      ],
      "priceRange": "$10,000 - $750,000"
    };

    updateStructuredData(structuredData);
  }, [title, description, keywords, canonical, type, image]);

  return null;
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    (meta as HTMLMetaElement).name = name;
    document.head.appendChild(meta);
  }
  (meta as HTMLMetaElement).content = content;
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    (meta as HTMLMetaElement).setAttribute("property", property);
    document.head.appendChild(meta);
  }
  (meta as HTMLMetaElement).content = content;
}

function updateLinkTag(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement("link");
    (link as HTMLLinkElement).rel = rel;
    document.head.appendChild(link);
  }
  (link as HTMLLinkElement).href = href;
}

function updateStructuredData(data: object) {
  let script = document.querySelector('script[type="application/ld+json"][data-component="seo-head"]') as HTMLScriptElement;
  if (!script) {
    script = document.createElement("script") as HTMLScriptElement;
    script.type = "application/ld+json";
    script.setAttribute('data-component', 'seo-head');
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}