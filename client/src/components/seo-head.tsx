import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: "website" | "article" | "service";
  image?: string;
}

// Utility function to get base URL
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  // Fallback for SSR or development
  return 'https://lenduracapital.com';
}

// Utility function to ensure absolute URL
function makeAbsoluteUrl(url: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const baseUrl = getBaseUrl();
  return `${baseUrl}${url.startsWith('/') ? url : '/' + url}`;
}

export default function SEOHead({ 
  title, 
  description, 
  keywords = "business funding, term loans, merchant cash advance, equipment financing, SBA loans",
  canonical,
  type = "website",
  image = "/lendura-logo.png"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    updateMetaTag("description", description);
    
    // Update keywords
    updateMetaTag("keywords", keywords);
    
    // Generate absolute URLs
    const absoluteCanonical = canonical ? makeAbsoluteUrl(canonical) : makeAbsoluteUrl(window.location.pathname);
    const absoluteImage = makeAbsoluteUrl(image);
    
    // Update canonical
    updateLinkTag("canonical", absoluteCanonical);

    // Open Graph tags
    updateMetaProperty("og:title", title);
    updateMetaProperty("og:description", description);
    updateMetaProperty("og:type", type);
    updateMetaProperty("og:url", absoluteCanonical);
    updateMetaProperty("og:image", absoluteImage);
    updateMetaProperty("og:site_name", "Lendura Capital");
    
    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", absoluteImage);

    // Note: Organization schema is handled by Layout.tsx to avoid duplicates
    // SEOHead.tsx focuses only on meta tags and OpenGraph data
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

