interface RouteMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    type: "website" | "article" | "service";
    image?: string;
  };
  twitter: {
    title: string;
    description: string;
  };
  schema?: {
    "@context": string;
    "@type": string;
    [key: string]: any;
  }[];
  h1?: string;
  primaryContent?: string;
}

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  // Home Page
  "/": {
    title: "Business Funding Solutions Brooklyn NY | 24 Hour Approval | Lendura Capital",
    description: "Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "business funding Brooklyn NY, merchant cash advance near me, 24 hour business loan approval, bad credit business loans, equipment financing, SBA loans Brooklyn, working capital loans, invoice factoring, small business funding NYC, same day business funding",
    canonical: "/",
    h1: "Business Funding Solutions | Fast Approval in 24 Hours",
    primaryContent: "Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing and 9 more solutions. Bad credit OK.",
    openGraph: {
      title: "Business Funding Solutions Brooklyn NY | 24 Hour Approval | Lendura Capital",
      description: "Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK.",
      type: "website",
      image: "/lendura-logo.png"
    },
    twitter: {
      title: "Business Funding Solutions Brooklyn NY | 24 Hour Approval | Lendura Capital",
      description: "Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK."
    },
    schema: [{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Lendura Capital",
      "url": "https://lenduracapital.com",
      "logo": "https://lenduracapital.com/lendura-logo.png",
      "description": "Business funding solutions with 24 hour approval",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Brooklyn",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-305-834-7168",
        "contactType": "Customer Service"
      },
      "sameAs": [
        "https://twitter.com/LenduraCapital"
      ]
    }]
  },

  // Solutions Pages
  "/solutions": {
    title: "Business Funding Solutions | 12 Financing Options | Lendura Capital",
    description: "Explore 12 business financing solutions including term loans, merchant cash advance, SBA loans, equipment financing, lines of credit and more. Get approved in 24 hours.",
    keywords: "business funding solutions, term loans, merchant cash advance, SBA loans, equipment financing, lines of credit, business loans",
    canonical: "/solutions",
    h1: "Business Funding Solutions",
    primaryContent: "Explore 12 comprehensive business financing solutions designed to meet your unique business needs.",
    openGraph: {
      title: "Business Funding Solutions | 12 Financing Options | Lendura Capital",
      description: "Explore 12 business financing solutions including term loans, merchant cash advance, SBA loans, equipment financing, lines of credit and more.",
      type: "service"
    },
    twitter: {
      title: "Business Funding Solutions | 12 Financing Options | Lendura Capital",
      description: "Explore 12 business financing solutions including term loans, merchant cash advance, SBA loans, equipment financing, lines of credit and more."
    }
  },

  "/solutions/term-loans": {
    title: "Term Loans for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get term loans for your business with approval in 24 hours. Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "term loans, business term loans, term loans Brooklyn NY, fast term loans approval, term loans bad credit, term loans funding",
    canonical: "/solutions/term-loans",
    h1: "Term Loans",
    primaryContent: "Traditional fixed-term business loans with competitive rates and flexible repayment terms for various business needs.",
    openGraph: {
      title: "Term Loans for Business | Lendura Capital",
      description: "Get term loans for your business with approval in 24 hours. Traditional fixed-term business loans with competitive rates and flexible repayment terms.",
      type: "service"
    },
    twitter: {
      title: "Term Loans for Business | Lendura Capital",
      description: "Get term loans for your business with approval in 24 hours. Traditional fixed-term business loans with competitive rates and flexible repayment terms."
    }
  },

  "/solutions/merchant-cash-advance": {
    title: "Merchant Cash Advance for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get merchant cash advance for your business with approval in 24 hours. Quick access to working capital based on your daily credit card sales. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "merchant cash advance, business merchant cash advance, merchant cash advance Brooklyn NY, fast merchant cash advance approval, merchant cash advance bad credit, merchant cash advance funding",
    canonical: "/solutions/merchant-cash-advance",
    h1: "Merchant Cash Advance",
    primaryContent: "Quick access to working capital based on your daily credit card sales with flexible repayment.",
    openGraph: {
      title: "Merchant Cash Advance for Business | Lendura Capital",
      description: "Get merchant cash advance for your business with approval in 24 hours. Quick access to working capital based on your daily credit card sales.",
      type: "service"
    },
    twitter: {
      title: "Merchant Cash Advance for Business | Lendura Capital",
      description: "Get merchant cash advance for your business with approval in 24 hours. Quick access to working capital based on your daily credit card sales."
    }
  },

  "/solutions/lines-of-credit": {
    title: "Lines of Credit for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get lines of credit for your business with approval in 24 hours. Revolving credit lines that provide flexible access to capital when you need it most for operational expenses. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "lines of credit, business lines of credit, lines of credit Brooklyn NY, fast lines of credit approval, lines of credit bad credit, lines of credit funding",
    canonical: "/solutions/lines-of-credit",
    h1: "Lines of Credit",
    primaryContent: "Revolving credit lines that provide flexible access to capital when you need it most for operational expenses.",
    openGraph: {
      title: "Lines of Credit for Business | Lendura Capital",
      description: "Get lines of credit for your business with approval in 24 hours. Revolving credit lines that provide flexible access to capital.",
      type: "service"
    },
    twitter: {
      title: "Lines of Credit for Business | Lendura Capital",
      description: "Get lines of credit for your business with approval in 24 hours. Revolving credit lines that provide flexible access to capital."
    }
  },

  "/solutions/sba-loans": {
    title: "SBA Loans for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get sba loans for your business with approval in 24 hours. Government-backed loans offering favorable terms and lower down payments for qualified businesses. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "sba loans, business sba loans, sba loans Brooklyn NY, fast sba loans approval, sba loans bad credit, sba loans funding",
    canonical: "/solutions/sba-loans",
    h1: "SBA Loans",
    primaryContent: "Government-backed loans offering favorable terms and lower down payments for qualified businesses.",
    openGraph: {
      title: "SBA Loans for Business | Lendura Capital",
      description: "Get sba loans for your business with approval in 24 hours. Government-backed loans offering favorable terms.",
      type: "service"
    },
    twitter: {
      title: "SBA Loans for Business | Lendura Capital",
      description: "Get sba loans for your business with approval in 24 hours. Government-backed loans offering favorable terms."
    }
  },

  "/solutions/equipment-financing": {
    title: "Equipment Financing for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get equipment financing for your business with approval in 24 hours. Specialized financing for purchasing or leasing business equipment, machinery, and vehicles. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "equipment financing, business equipment financing, equipment financing Brooklyn NY, fast equipment financing approval, equipment financing bad credit, equipment financing funding",
    canonical: "/solutions/equipment-financing",
    h1: "Equipment Financing",
    primaryContent: "Specialized financing for purchasing or leasing business equipment, machinery, and vehicles.",
    openGraph: {
      title: "Equipment Financing for Business | Lendura Capital",
      description: "Get equipment financing for your business with approval in 24 hours. Specialized financing for purchasing or leasing business equipment.",
      type: "service"
    },
    twitter: {
      title: "Equipment Financing for Business | Lendura Capital",
      description: "Get equipment financing for your business with approval in 24 hours. Specialized financing for purchasing or leasing business equipment."
    }
  },

  "/solutions/invoice-factoring": {
    title: "Invoice Factoring for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get invoice factoring for your business with approval in 24 hours. Convert your outstanding invoices into immediate cash flow to keep your business running smoothly. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "invoice factoring, business invoice factoring, invoice factoring Brooklyn NY, fast invoice factoring approval, invoice factoring bad credit, invoice factoring funding",
    canonical: "/solutions/invoice-factoring",
    h1: "Invoice Factoring",
    primaryContent: "Convert your outstanding invoices into immediate cash flow to keep your business running smoothly.",
    openGraph: {
      title: "Invoice Factoring for Business | Lendura Capital",
      description: "Get invoice factoring for your business with approval in 24 hours. Convert your outstanding invoices into immediate cash flow.",
      type: "service"
    },
    twitter: {
      title: "Invoice Factoring for Business | Lendura Capital",
      description: "Get invoice factoring for your business with approval in 24 hours. Convert your outstanding invoices into immediate cash flow."
    }
  },

  "/solutions/po-financing": {
    title: "Purchase Order Financing for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get purchase order financing for your business with approval in 24 hours. Funding to fulfill large orders when you don't have the upfront capital. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "purchase order financing, business purchase order financing, po financing Brooklyn NY, fast po financing approval, po financing bad credit, po financing funding",
    canonical: "/solutions/po-financing",
    h1: "Purchase Order Financing",
    primaryContent: "Funding to fulfill large orders when you don't have the upfront capital.",
    openGraph: {
      title: "Purchase Order Financing for Business | Lendura Capital",
      description: "Get purchase order financing for your business with approval in 24 hours. Funding to fulfill large orders.",
      type: "service"
    },
    twitter: {
      title: "Purchase Order Financing for Business | Lendura Capital",
      description: "Get purchase order financing for your business with approval in 24 hours. Funding to fulfill large orders."
    }
  },

  "/solutions/debt-consolidation": {
    title: "Debt Consolidation for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get debt consolidation for your business with approval in 24 hours. Consolidate multiple business debts into one manageable payment with better terms. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "debt consolidation, business debt consolidation, debt consolidation Brooklyn NY, fast debt consolidation approval, debt consolidation bad credit, debt consolidation funding",
    canonical: "/solutions/debt-consolidation",
    h1: "Debt Consolidation",
    primaryContent: "Consolidate multiple business debts into one manageable payment with better terms.",
    openGraph: {
      title: "Debt Consolidation for Business | Lendura Capital",
      description: "Get debt consolidation for your business with approval in 24 hours. Consolidate multiple business debts into one manageable payment.",
      type: "service"
    },
    twitter: {
      title: "Debt Consolidation for Business | Lendura Capital",
      description: "Get debt consolidation for your business with approval in 24 hours. Consolidate multiple business debts into one manageable payment."
    }
  },

  "/solutions/credit-services": {
    title: "Credit Services for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get credit services for your business with approval in 24 hours. Professional credit repair and building services to improve your business credit profile. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "credit services, business credit services, credit services Brooklyn NY, fast credit services approval, credit services bad credit, credit services funding",
    canonical: "/solutions/credit-services",
    h1: "Credit Services",
    primaryContent: "Professional credit repair and building services to improve your business credit profile.",
    openGraph: {
      title: "Credit Services for Business | Lendura Capital",
      description: "Get credit services for your business with approval in 24 hours. Professional credit repair and building services.",
      type: "service"
    },
    twitter: {
      title: "Credit Services for Business | Lendura Capital",
      description: "Get credit services for your business with approval in 24 hours. Professional credit repair and building services."
    }
  },

  "/solutions/commercial-real-estate-lending": {
    title: "Commercial Real Estate Lending for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get commercial real estate lending for your business with approval in 24 hours. Specialized financing for purchasing, refinancing, or improving commercial properties. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "commercial real estate lending, business commercial real estate lending, commercial real estate lending Brooklyn NY, fast commercial real estate lending approval, commercial real estate lending bad credit, commercial real estate lending funding",
    canonical: "/solutions/commercial-real-estate-lending",
    h1: "Commercial Real Estate Lending",
    primaryContent: "Specialized financing for purchasing, refinancing, or improving commercial properties.",
    openGraph: {
      title: "Commercial Real Estate Lending for Business | Lendura Capital",
      description: "Get commercial real estate lending for your business with approval in 24 hours. Specialized financing for commercial properties.",
      type: "service"
    },
    twitter: {
      title: "Commercial Real Estate Lending for Business | Lendura Capital",
      description: "Get commercial real estate lending for your business with approval in 24 hours. Specialized financing for commercial properties."
    }
  },

  "/solutions/mortgage-financing": {
    title: "Mortgage Financing for Business | Fast Approval & Competitive Rates | Lendura Capital",
    description: "Get mortgage financing for your business with approval in 24 hours. Commercial mortgage solutions for business property purchases and refinancing. Bad credit OK. Apply online or call (305) 834-7168.",
    keywords: "mortgage financing, business mortgage financing, mortgage financing Brooklyn NY, fast mortgage financing approval, mortgage financing bad credit, mortgage financing funding",
    canonical: "/solutions/mortgage-financing",
    h1: "Mortgage Financing",
    primaryContent: "Commercial mortgage solutions for business property purchases and refinancing.",
    openGraph: {
      title: "Mortgage Financing for Business | Lendura Capital",
      description: "Get mortgage financing for your business with approval in 24 hours. Commercial mortgage solutions for business properties.",
      type: "service"
    },
    twitter: {
      title: "Mortgage Financing for Business | Lendura Capital",
      description: "Get mortgage financing for your business with approval in 24 hours. Commercial mortgage solutions for business properties."
    }
  },

  // Industry Pages
  "/qualified-industries": {
    title: "Industries We Fund | Business Funding by Industry | Lendura Capital",
    description: "We provide business funding across 18+ industries including construction, healthcare, trucking, restaurants, retail, manufacturing and more. Get approved in 24 hours.",
    keywords: "industries funded, business funding by industry, construction funding, healthcare funding, trucking funding, restaurant funding",
    canonical: "/qualified-industries",
    h1: "Industries We Fund",
    primaryContent: "We provide business funding across 18+ industries with specialized solutions for each sector's unique needs.",
    openGraph: {
      title: "Industries We Fund | Business Funding by Industry | Lendura Capital",
      description: "We provide business funding across 18+ industries including construction, healthcare, trucking, restaurants, retail, manufacturing and more.",
      type: "website"
    },
    twitter: {
      title: "Industries We Fund | Business Funding by Industry | Lendura Capital",
      description: "We provide business funding across 18+ industries including construction, healthcare, trucking, restaurants, retail, manufacturing and more."
    }
  },

  "/industries/construction": {
    title: "Construction Industry Financing | Equipment & Project Funding | Lendura Capital",
    description: "Get construction business funding with 24-hour approval. Equipment financing, working capital, and project funding for contractors and construction companies. Bad credit OK.",
    keywords: "construction financing, construction business loans, contractor funding, construction equipment financing, construction working capital",
    canonical: "/industries/construction",
    h1: "Construction Industry Financing",
    primaryContent: "Build your business with flexible financing for equipment, projects, and working capital needs.",
    openGraph: {
      title: "Construction Industry Financing | Equipment & Project Funding | Lendura Capital",
      description: "Get construction business funding with 24-hour approval. Equipment financing, working capital, and project funding for contractors.",
      type: "service"
    },
    twitter: {
      title: "Construction Industry Financing | Equipment & Project Funding | Lendura Capital",
      description: "Get construction business funding with 24-hour approval. Equipment financing, working capital, and project funding for contractors."
    }
  },

  "/industries/medical-healthcare": {
    title: "Medical & Healthcare Financing | Practice Funding Solutions | Lendura Capital",
    description: "Get medical and healthcare business funding with 24-hour approval. Equipment financing, practice expansion, and working capital for medical professionals. Bad credit OK.",
    keywords: "medical financing, healthcare business loans, practice funding, medical equipment financing, healthcare working capital",
    canonical: "/industries/medical-healthcare",
    h1: "Medical & Healthcare Financing",
    primaryContent: "Specialized financing solutions for medical practices, clinics, and healthcare professionals.",
    openGraph: {
      title: "Medical & Healthcare Financing | Practice Funding Solutions | Lendura Capital",
      description: "Get medical and healthcare business funding with 24-hour approval. Equipment financing, practice expansion, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Medical & Healthcare Financing | Practice Funding Solutions | Lendura Capital",
      description: "Get medical and healthcare business funding with 24-hour approval. Equipment financing, practice expansion, and working capital."
    }
  },

  "/industries/trucking-transportation": {
    title: "Trucking & Transportation Financing | Fleet & Equipment Funding | Lendura Capital",
    description: "Get trucking and transportation business funding with 24-hour approval. Fleet financing, equipment loans, and working capital for trucking companies. Bad credit OK.",
    keywords: "trucking financing, transportation business loans, fleet funding, truck financing, transportation equipment financing",
    canonical: "/industries/trucking-transportation",
    h1: "Trucking & Transportation Financing",
    primaryContent: "Keep your fleet moving with flexible financing for trucks, trailers, and operational expenses.",
    openGraph: {
      title: "Trucking & Transportation Financing | Fleet & Equipment Funding | Lendura Capital",
      description: "Get trucking and transportation business funding with 24-hour approval. Fleet financing, equipment loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Trucking & Transportation Financing | Fleet & Equipment Funding | Lendura Capital",
      description: "Get trucking and transportation business funding with 24-hour approval. Fleet financing, equipment loans, and working capital."
    }
  },

  "/industries/restaurant-food-service": {
    title: "Restaurant & Food Service Financing | Equipment & Working Capital | Lendura Capital",
    description: "Get restaurant and food service business funding with 24-hour approval. Equipment financing, renovation loans, and working capital for restaurants. Bad credit OK.",
    keywords: "restaurant financing, food service business loans, restaurant equipment financing, restaurant working capital",
    canonical: "/industries/restaurant-food-service",
    h1: "Restaurant & Food Service Financing",
    primaryContent: "Serve up success with financing for equipment, renovations, and working capital needs.",
    openGraph: {
      title: "Restaurant & Food Service Financing | Equipment & Working Capital | Lendura Capital",
      description: "Get restaurant and food service business funding with 24-hour approval. Equipment financing, renovation loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Restaurant & Food Service Financing | Equipment & Working Capital | Lendura Capital",
      description: "Get restaurant and food service business funding with 24-hour approval. Equipment financing, renovation loans, and working capital."
    }
  },

  "/industries/retail-e-commerce": {
    title: "Retail & E-commerce Financing | Inventory & Growth Funding | Lendura Capital",
    description: "Get retail and e-commerce business funding with 24-hour approval. Inventory financing, expansion loans, and working capital for retail businesses. Bad credit OK.",
    keywords: "retail financing, e-commerce business loans, inventory financing, retail working capital",
    canonical: "/industries/retail-e-commerce",
    h1: "Retail & E-commerce Financing",
    primaryContent: "Scale your retail business with financing for inventory, expansion, and operational needs.",
    openGraph: {
      title: "Retail & E-commerce Financing | Inventory & Growth Funding | Lendura Capital",
      description: "Get retail and e-commerce business funding with 24-hour approval. Inventory financing, expansion loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Retail & E-commerce Financing | Inventory & Growth Funding | Lendura Capital",
      description: "Get retail and e-commerce business funding with 24-hour approval. Inventory financing, expansion loans, and working capital."
    }
  },

  "/industries/manufacturing": {
    title: "Manufacturing Financing | Equipment & Production Funding | Lendura Capital",
    description: "Get manufacturing business funding with 24-hour approval. Equipment financing, production loans, and working capital for manufacturers. Bad credit OK.",
    keywords: "manufacturing financing, manufacturing business loans, production financing, manufacturing equipment financing",
    canonical: "/industries/manufacturing",
    h1: "Manufacturing Financing",
    primaryContent: "Power your production with financing for equipment, expansion, and operational needs.",
    openGraph: {
      title: "Manufacturing Financing | Equipment & Production Funding | Lendura Capital",
      description: "Get manufacturing business funding with 24-hour approval. Equipment financing, production loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Manufacturing Financing | Equipment & Production Funding | Lendura Capital",
      description: "Get manufacturing business funding with 24-hour approval. Equipment financing, production loans, and working capital."
    }
  },

  "/industries/professional-services": {
    title: "Professional Services Financing | Practice & Office Funding | Lendura Capital",
    description: "Get professional services business funding with 24-hour approval. Office expansion, equipment, and working capital for professional service firms. Bad credit OK.",
    keywords: "professional services financing, professional services business loans, office financing, professional services working capital",
    canonical: "/industries/professional-services",
    h1: "Professional Services Financing",
    primaryContent: "Grow your practice with financing for expansion, equipment, and operational needs.",
    openGraph: {
      title: "Professional Services Financing | Practice & Office Funding | Lendura Capital",
      description: "Get professional services business funding with 24-hour approval. Office expansion, equipment, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Professional Services Financing | Practice & Office Funding | Lendura Capital",
      description: "Get professional services business funding with 24-hour approval. Office expansion, equipment, and working capital."
    }
  },

  "/industries/technology-software": {
    title: "Technology & Software Financing | Growth & Development Funding | Lendura Capital",
    description: "Get technology and software business funding with 24-hour approval. Development costs, equipment, and working capital for tech companies. Bad credit OK.",
    keywords: "technology financing, software business loans, tech startup funding, technology working capital",
    canonical: "/industries/technology-software",
    h1: "Technology & Software Financing",
    primaryContent: "Accelerate innovation with financing for development, equipment, and growth initiatives.",
    openGraph: {
      title: "Technology & Software Financing | Growth & Development Funding | Lendura Capital",
      description: "Get technology and software business funding with 24-hour approval. Development costs, equipment, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Technology & Software Financing | Growth & Development Funding | Lendura Capital",
      description: "Get technology and software business funding with 24-hour approval. Development costs, equipment, and working capital."
    }
  },

  "/industries/auto-transportation": {
    title: "Auto & Transportation Financing | Fleet & Shop Funding | Lendura Capital",
    description: "Get auto and transportation business funding with 24-hour approval. Fleet financing, shop equipment, and working capital for automotive businesses. Bad credit OK.",
    keywords: "auto financing, transportation business loans, automotive financing, auto shop funding",
    canonical: "/industries/auto-transportation",
    h1: "Auto & Transportation Financing",
    primaryContent: "Drive your business forward with financing for fleets, equipment, and operational needs.",
    openGraph: {
      title: "Auto & Transportation Financing | Fleet & Shop Funding | Lendura Capital",
      description: "Get auto and transportation business funding with 24-hour approval. Fleet financing, shop equipment, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Auto & Transportation Financing | Fleet & Shop Funding | Lendura Capital",
      description: "Get auto and transportation business funding with 24-hour approval. Fleet financing, shop equipment, and working capital."
    }
  },

  "/industries/beauty-wellness": {
    title: "Beauty & Wellness Financing | Salon & Spa Funding | Lendura Capital",
    description: "Get beauty and wellness business funding with 24-hour approval. Equipment financing, renovation loans, and working capital for salons and spas. Bad credit OK.",
    keywords: "beauty financing, wellness business loans, salon financing, spa funding",
    canonical: "/industries/beauty-wellness",
    h1: "Beauty & Wellness Financing",
    primaryContent: "Beautify your business with financing for equipment, renovations, and operational needs.",
    openGraph: {
      title: "Beauty & Wellness Financing | Salon & Spa Funding | Lendura Capital",
      description: "Get beauty and wellness business funding with 24-hour approval. Equipment financing, renovation loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Beauty & Wellness Financing | Salon & Spa Funding | Lendura Capital",
      description: "Get beauty and wellness business funding with 24-hour approval. Equipment financing, renovation loans, and working capital."
    }
  },

  "/industries/hospitality-tourism": {
    title: "Hospitality & Tourism Financing | Hotel & Travel Funding | Lendura Capital",
    description: "Get hospitality and tourism business funding with 24-hour approval. Equipment financing, expansion loans, and working capital for hotels and tourism businesses. Bad credit OK.",
    keywords: "hospitality financing, tourism business loans, hotel financing, hospitality working capital",
    canonical: "/industries/hospitality-tourism",
    h1: "Hospitality & Tourism Financing",
    primaryContent: "Welcome success with financing for expansion, equipment, and operational needs.",
    openGraph: {
      title: "Hospitality & Tourism Financing | Hotel & Travel Funding | Lendura Capital",
      description: "Get hospitality and tourism business funding with 24-hour approval. Equipment financing, expansion loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Hospitality & Tourism Financing | Hotel & Travel Funding | Lendura Capital",
      description: "Get hospitality and tourism business funding with 24-hour approval. Equipment financing, expansion loans, and working capital."
    }
  },

  "/industries/agriculture-farming": {
    title: "Agriculture & Farming Financing | Equipment & Seasonal Funding | Lendura Capital",
    description: "Get agriculture and farming business funding with 24-hour approval. Equipment financing, seasonal loans, and working capital for farms and agricultural businesses. Bad credit OK.",
    keywords: "agriculture financing, farming business loans, farm equipment financing, agricultural working capital",
    canonical: "/industries/agriculture-farming",
    h1: "Agriculture & Farming Financing",
    primaryContent: "Grow your agricultural business with financing for equipment, seasonal needs, and operational expenses.",
    openGraph: {
      title: "Agriculture & Farming Financing | Equipment & Seasonal Funding | Lendura Capital",
      description: "Get agriculture and farming business funding with 24-hour approval. Equipment financing, seasonal loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Agriculture & Farming Financing | Equipment & Seasonal Funding | Lendura Capital",
      description: "Get agriculture and farming business funding with 24-hour approval. Equipment financing, seasonal loans, and working capital."
    }
  },

  "/industries/real-estate": {
    title: "Real Estate Financing | Investment & Development Funding | Lendura Capital",
    description: "Get real estate business funding with 24-hour approval. Property acquisition, development loans, and working capital for real estate professionals. Bad credit OK.",
    keywords: "real estate financing, real estate business loans, property investment funding, real estate working capital",
    canonical: "/industries/real-estate",
    h1: "Real Estate Financing",
    primaryContent: "Build your real estate portfolio with financing for acquisitions, development, and operational needs.",
    openGraph: {
      title: "Real Estate Financing | Investment & Development Funding | Lendura Capital",
      description: "Get real estate business funding with 24-hour approval. Property acquisition, development loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Real Estate Financing | Investment & Development Funding | Lendura Capital",
      description: "Get real estate business funding with 24-hour approval. Property acquisition, development loans, and working capital."
    }
  },

  "/industries/entertainment-events": {
    title: "Entertainment & Events Financing | Production & Equipment Funding | Lendura Capital",
    description: "Get entertainment and events business funding with 24-hour approval. Production costs, equipment, and working capital for entertainment businesses. Bad credit OK.",
    keywords: "entertainment financing, events business loans, production financing, entertainment working capital",
    canonical: "/industries/entertainment-events",
    h1: "Entertainment & Events Financing",
    primaryContent: "Stage your success with financing for production, equipment, and operational needs.",
    openGraph: {
      title: "Entertainment & Events Financing | Production & Equipment Funding | Lendura Capital",
      description: "Get entertainment and events business funding with 24-hour approval. Production costs, equipment, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Entertainment & Events Financing | Production & Equipment Funding | Lendura Capital",
      description: "Get entertainment and events business funding with 24-hour approval. Production costs, equipment, and working capital."
    }
  },

  "/industries/education-training": {
    title: "Education & Training Financing | School & Program Funding | Lendura Capital",
    description: "Get education and training business funding with 24-hour approval. Equipment financing, expansion loans, and working capital for educational institutions. Bad credit OK.",
    keywords: "education financing, training business loans, school financing, education working capital",
    canonical: "/industries/education-training",
    h1: "Education & Training Financing",
    primaryContent: "Educate and grow with financing for equipment, expansion, and operational needs.",
    openGraph: {
      title: "Education & Training Financing | School & Program Funding | Lendura Capital",
      description: "Get education and training business funding with 24-hour approval. Equipment financing, expansion loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Education & Training Financing | School & Program Funding | Lendura Capital",
      description: "Get education and training business funding with 24-hour approval. Equipment financing, expansion loans, and working capital."
    }
  },

  "/industries/franchises": {
    title: "Franchise Financing | Startup & Expansion Funding | Lendura Capital",
    description: "Get franchise business funding with 24-hour approval. Franchise fees, equipment, and working capital for new and existing franchisees. Bad credit OK.",
    keywords: "franchise financing, franchise business loans, franchise startup funding, franchise working capital",
    canonical: "/industries/franchises",
    h1: "Franchise Financing",
    primaryContent: "Franchise your future with financing for startup costs, equipment, and operational needs.",
    openGraph: {
      title: "Franchise Financing | Startup & Expansion Funding | Lendura Capital",
      description: "Get franchise business funding with 24-hour approval. Franchise fees, equipment, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Franchise Financing | Startup & Expansion Funding | Lendura Capital",
      description: "Get franchise business funding with 24-hour approval. Franchise fees, equipment, and working capital."
    }
  },

  "/industries/home-services-contracting": {
    title: "Home Services & Contracting Financing | Equipment & Project Funding | Lendura Capital",
    description: "Get home services and contracting business funding with 24-hour approval. Equipment financing, project funding, and working capital for contractors. Bad credit OK.",
    keywords: "home services financing, contracting business loans, contractor funding, home services working capital",
    canonical: "/industries/home-services-contracting",
    h1: "Home Services & Contracting Financing",
    primaryContent: "Build your contracting business with financing for equipment, projects, and operational needs.",
    openGraph: {
      title: "Home Services & Contracting Financing | Equipment & Project Funding | Lendura Capital",
      description: "Get home services and contracting business funding with 24-hour approval. Equipment financing, project funding, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Home Services & Contracting Financing | Equipment & Project Funding | Lendura Capital",
      description: "Get home services and contracting business funding with 24-hour approval. Equipment financing, project funding, and working capital."
    }
  },

  "/industries/cleaning-janitorial-services": {
    title: "Cleaning & Janitorial Services Financing | Equipment & Growth Funding | Lendura Capital",
    description: "Get cleaning and janitorial services business funding with 24-hour approval. Equipment financing, expansion loans, and working capital for cleaning companies. Bad credit OK.",
    keywords: "cleaning services financing, janitorial business loans, cleaning equipment financing, janitorial working capital",
    canonical: "/industries/cleaning-janitorial-services",
    h1: "Cleaning & Janitorial Services Financing",
    primaryContent: "Clean up with financing for equipment, expansion, and operational needs.",
    openGraph: {
      title: "Cleaning & Janitorial Services Financing | Equipment & Growth Funding | Lendura Capital",
      description: "Get cleaning and janitorial services business funding with 24-hour approval. Equipment financing, expansion loans, and working capital.",
      type: "service"
    },
    twitter: {
      title: "Cleaning & Janitorial Services Financing | Equipment & Growth Funding | Lendura Capital",
      description: "Get cleaning and janitorial services business funding with 24-hour approval. Equipment financing, expansion loans, and working capital."
    }
  },

  // Other Important Pages
  "/about": {
    title: "About Lendura Capital | Trusted Business Funding Partner Since 2015",
    description: "Learn about Lendura Capital, your trusted partner in business financing solutions. Over $1B funded, 50+ specialists, 12 financing options with 24-hour approval times.",
    keywords: "about Lendura Capital, business funding company, trusted business partner, business financing solutions",
    canonical: "/about",
    h1: "About Lendura Capital",
    primaryContent: "Your trusted partner in business financing solutions, dedicated to helping businesses grow and thrive.",
    openGraph: {
      title: "About Lendura Capital | Trusted Business Funding Partner Since 2015",
      description: "Learn about Lendura Capital, your trusted partner in business financing solutions. Over $1B funded, 50+ specialists, 12 financing options.",
      type: "website"
    },
    twitter: {
      title: "About Lendura Capital | Trusted Business Funding Partner Since 2015",
      description: "Learn about Lendura Capital, your trusted partner in business financing solutions. Over $1B funded, 50+ specialists, 12 financing options."
    }
  },

  "/contact": {
    title: "Contact Lendura Capital | Get Business Funding Help | (305) 834-7168",
    description: "Contact Lendura Capital for business funding assistance. Call (305) 834-7168, email, or fill out our form. Get expert guidance on your financing needs.",
    keywords: "contact Lendura Capital, business funding help, Lendura Capital phone number, business financing contact",
    canonical: "/contact",
    h1: "Contact Lendura Capital",
    primaryContent: "Get in touch with our business funding experts for personalized assistance with your financing needs.",
    openGraph: {
      title: "Contact Lendura Capital | Get Business Funding Help | (305) 834-7168",
      description: "Contact Lendura Capital for business funding assistance. Call (305) 834-7168, email, or fill out our form.",
      type: "website"
    },
    twitter: {
      title: "Contact Lendura Capital | Get Business Funding Help | (305) 834-7168",
      description: "Contact Lendura Capital for business funding assistance. Call (305) 834-7168, email, or fill out our form."
    }
  },

  "/testimonials": {
    title: "Client Testimonials | Lendura Capital Success Stories",
    description: "Read real client testimonials and success stories from businesses funded by Lendura Capital. See how we've helped companies grow with our financing solutions.",
    keywords: "Lendura Capital testimonials, client success stories, business funding reviews, customer testimonials",
    canonical: "/testimonials",
    h1: "Client Testimonials",
    primaryContent: "Read success stories from businesses we've helped grow with our financing solutions.",
    openGraph: {
      title: "Client Testimonials | Lendura Capital Success Stories",
      description: "Read real client testimonials and success stories from businesses funded by Lendura Capital.",
      type: "website"
    },
    twitter: {
      title: "Client Testimonials | Lendura Capital Success Stories",
      description: "Read real client testimonials and success stories from businesses funded by Lendura Capital."
    }
  },

  "/faq": {
    title: "Frequently Asked Questions | Business Funding FAQ | Lendura Capital",
    description: "Get answers to common questions about business funding, loan requirements, approval times, and financing options. Expert answers from Lendura Capital.",
    keywords: "business funding FAQ, business loan questions, financing answers, Lendura Capital FAQ",
    canonical: "/faq",
    h1: "Frequently Asked Questions",
    primaryContent: "Get answers to common questions about business funding and our financing solutions.",
    openGraph: {
      title: "Frequently Asked Questions | Business Funding FAQ | Lendura Capital",
      description: "Get answers to common questions about business funding, loan requirements, approval times, and financing options.",
      type: "website"
    },
    twitter: {
      title: "Frequently Asked Questions | Business Funding FAQ | Lendura Capital",
      description: "Get answers to common questions about business funding, loan requirements, approval times, and financing options."
    }
  },

  "/apply": {
    title: "Apply for Business Funding | Fast & Easy Application | Lendura Capital",
    description: "Apply for business funding online with Lendura Capital's fast and easy application. Get approved in 24 hours for $10K-$750K. Bad credit OK.",
    keywords: "apply for business funding, business loan application, fast funding application, online business loan",
    canonical: "/apply",
    h1: "Apply for Business Funding",
    primaryContent: "Get started with our fast and easy online application for business funding.",
    openGraph: {
      title: "Apply for Business Funding | Fast & Easy Application | Lendura Capital",
      description: "Apply for business funding online with Lendura Capital's fast and easy application. Get approved in 24 hours for $10K-$750K.",
      type: "website"
    },
    twitter: {
      title: "Apply for Business Funding | Fast & Easy Application | Lendura Capital",
      description: "Apply for business funding online with Lendura Capital's fast and easy application. Get approved in 24 hours for $10K-$750K."
    }
  },

  "/terms": {
    title: "Terms of Service | Lendura Capital",
    description: "Read Lendura Capital's terms of service for our business funding platform and financing services.",
    keywords: "terms of service, legal terms, Lendura Capital terms",
    canonical: "/terms",
    h1: "Terms of Service",
    primaryContent: "Terms of service for Lendura Capital's business funding platform and financing services.",
    openGraph: {
      title: "Terms of Service | Lendura Capital",
      description: "Read Lendura Capital's terms of service for our business funding platform and financing services.",
      type: "website"
    },
    twitter: {
      title: "Terms of Service | Lendura Capital",
      description: "Read Lendura Capital's terms of service for our business funding platform and financing services."
    }
  },

  "/privacy": {
    title: "Privacy Policy | Lendura Capital",
    description: "Read Lendura Capital's privacy policy to understand how we protect and handle your personal and business information.",
    keywords: "privacy policy, data protection, Lendura Capital privacy",
    canonical: "/privacy",
    h1: "Privacy Policy",
    primaryContent: "Learn how Lendura Capital protects and handles your personal and business information.",
    openGraph: {
      title: "Privacy Policy | Lendura Capital",
      description: "Read Lendura Capital's privacy policy to understand how we protect and handle your personal and business information.",
      type: "website"
    },
    twitter: {
      title: "Privacy Policy | Lendura Capital",
      description: "Read Lendura Capital's privacy policy to understand how we protect and handle your personal and business information."
    }
  }
};

export function getRouteMetadata(path: string): RouteMetadata | null {
  return ROUTE_METADATA[path] || null;
}

export function getAllRoutes(): string[] {
  return Object.keys(ROUTE_METADATA);
}