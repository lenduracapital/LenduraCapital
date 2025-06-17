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
    updateMetaProperty("og:site_name", "FundTek Capital Group");
    
    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Structured data for organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "FundTek Capital Group",
      "url": "https://fundtekcapital.com",
      "logo": "https://fundtekcapital.com/assets/logo.png",
      "description": "Professional business funding solutions including term loans, merchant cash advances, and equipment financing.",
      "telephone": "(305) 307-4658",
      "email": "admin@fundtekcapital.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Miami",
        "addressRegion": "FL",
        "addressCountry": "US"
      },
      "serviceType": [
        "Business Loans",
        "Term Loans", 
        "Merchant Cash Advance",
        "Equipment Financing",
        "SBA Loans",
        "Lines of Credit"
      ]
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
  let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}