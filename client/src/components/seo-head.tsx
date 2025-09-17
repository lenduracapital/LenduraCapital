import { useEffect } from "react";

interface ArticleData {
  headline: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  category: string;
  readTime?: string;
  image?: string;
  excerpt?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  type?: "website" | "article" | "service";
  image?: string;
  // Schema data
  articleData?: ArticleData;
  faqData?: FAQItem[];
  breadcrumbData?: BreadcrumbItem[];
  // Enhanced social and meta data
  socialProfiles?: string[];
  locale?: string;
  siteName?: string;
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
  image = "/lendura-logo.png",
  articleData,
  faqData,
  breadcrumbData,
  socialProfiles,
  locale = "en_US",
  siteName = "Lendura Capital"
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Generate absolute URLs
    const absoluteCanonical = canonical ? makeAbsoluteUrl(canonical) : makeAbsoluteUrl(window.location.pathname);
    const absoluteImage = makeAbsoluteUrl(image);

    // Update basic meta tags
    updateBasicMetaTags({
      description,
      keywords,
      canonical: absoluteCanonical,
      image: absoluteImage
    });

    // Update Open Graph and Twitter Card tags
    updateSocialMetaTags({
      title,
      description,
      type,
      url: absoluteCanonical,
      image: absoluteImage,
      siteName,
      locale
    });

    // Remove existing SEOHead JSON-LD scripts
    removeExistingSchemas('seo-head');

    // Add JSON-LD schemas
    if (articleData) {
      injectArticleSchema(articleData, absoluteCanonical, absoluteImage);
    }

    if (faqData && faqData.length > 0) {
      injectFAQSchema(faqData);
    }

    if (breadcrumbData && breadcrumbData.length > 0) {
      injectBreadcrumbSchema(breadcrumbData);
    }

    // Cleanup function
    return () => {
      removeExistingSchemas('seo-head');
    };
  }, [title, description, keywords, canonical, type, image, articleData, faqData, breadcrumbData, locale, siteName]);

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

// Enhanced meta tag management functions
interface BasicMetaData {
  description: string;
  keywords: string;
  canonical: string;
  image: string;
}

interface SocialMetaData {
  title: string;
  description: string;
  type: string;
  url: string;
  image: string;
  siteName: string;
  locale: string;
}

function updateBasicMetaTags({ description, keywords, canonical, image }: BasicMetaData) {
  updateMetaTag("description", description);
  updateMetaTag("keywords", keywords);
  updateLinkTag("canonical", canonical);
  
  // Add additional SEO meta tags
  updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  updateMetaTag("googlebot", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
  updateMetaTag("viewport", "width=device-width, initial-scale=1");
}

function updateSocialMetaTags({ title, description, type, url, image, siteName, locale }: SocialMetaData) {
  // Open Graph tags
  updateMetaProperty("og:title", title);
  updateMetaProperty("og:description", description);
  updateMetaProperty("og:type", type);
  updateMetaProperty("og:url", url);
  updateMetaProperty("og:image", image);
  updateMetaProperty("og:image:alt", `${title} - ${siteName}`);
  updateMetaProperty("og:site_name", siteName);
  updateMetaProperty("og:locale", locale);
  
  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", title);
  updateMetaTag("twitter:description", description);
  updateMetaTag("twitter:image", image);
  updateMetaTag("twitter:image:alt", `${title} - ${siteName}`);
  updateMetaTag("twitter:site", "@LenduraCapital");
  updateMetaTag("twitter:creator", "@LenduraCapital");
}

// JSON-LD Schema functions
function removeExistingSchemas(component: string) {
  const existingScripts = document.querySelectorAll(`script[type="application/ld+json"][data-component="${component}"]`);
  existingScripts.forEach(script => script.remove());
}

function injectSchema(schema: object, component: string, schemaType: string) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-component', component);
  script.setAttribute('data-schema-type', schemaType);
  script.textContent = JSON.stringify(schema, null, 2);
  document.head.appendChild(script);
}

function injectArticleSchema(articleData: ArticleData, canonicalUrl: string, imageUrl: string) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.headline,
    "description": articleData.excerpt || articleData.headline,
    "image": {
      "@type": "ImageObject",
      "url": articleData.image || imageUrl,
      "width": 800,
      "height": 450
    },
    "author": {
      "@type": "Organization",
      "name": articleData.author,
      "url": "https://lenduracapital.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lendura Capital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lenduracapital.com/lendura-logo.png",
        "width": 400,
        "height": 400
      }
    },
    "datePublished": articleData.datePublished,
    "dateModified": articleData.dateModified || articleData.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "articleSection": articleData.category,
    "keywords": [articleData.category, "business funding", "SBA loans", "business finance"],
    "wordCount": articleData.readTime ? parseInt(articleData.readTime) * 200 : 1500,
    "timeRequired": articleData.readTime || "8 minutes",
    "inLanguage": "en-US",
    "copyrightYear": new Date(articleData.datePublished).getFullYear(),
    "copyrightHolder": {
      "@type": "Organization",
      "name": "Lendura Capital"
    }
  };

  injectSchema(schema, 'seo-head', 'Article');
}

function injectFAQSchema(faqData: FAQItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  injectSchema(schema, 'seo-head', 'FAQ');
}

function injectBreadcrumbSchema(breadcrumbData: BreadcrumbItem[]) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbData.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": makeAbsoluteUrl(item.url)
    }))
  };

  injectSchema(schema, 'seo-head', 'Breadcrumb');
}

