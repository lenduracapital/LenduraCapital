// Industry data for template-based pages
export interface IndustryData {
  name: string;
  title: string;
  description: string;
  slug: string;
  heroImage: string;
  heroImageAlt: string;
  overviewTitle: string;
  overviewContent: string[];
  commonNeeds: string[];
}

export const industriesData: Record<string, IndustryData> = {
  construction: {
    name: "Construction",
    title: "Construction Industry Financing",
    description: "Build your business with flexible financing for equipment, projects, and working capital needs.",
    slug: "construction",
    heroImage: "/attached_assets/construction.jpg",
    heroImageAlt: "Construction work and equipment",
    overviewTitle: "Building Success Together",
    overviewContent: [
      "Construction companies face unique challenges: project-based cash flow, equipment costs, material expenses, and payment delays from clients and general contractors.",
      "Lendura Capital understands the construction industry's cyclical nature and provides flexible financing solutions that help contractors manage cash flow and grow their businesses."
    ],
    commonNeeds: [
      "Heavy equipment and machinery",
      "Project materials and supplies", 
      "Payroll and subcontractor payments",
      "Bonding and insurance requirements",
      "Fleet vehicles and transportation",
      "Bridge financing between projects"
    ]
  },

  "medical-healthcare": {
    name: "Medical & Healthcare",
    title: "Medical & Healthcare Financing",
    description: "Specialized funding solutions for medical equipment, practice expansion, and healthcare facilities.",
    slug: "medical-healthcare",
    heroImage: "/attached_assets/medical.jpg",
    heroImageAlt: "Medical equipment and healthcare facility",
    overviewTitle: "Supporting Healthcare Excellence",
    overviewContent: [
      "Healthcare practices face unique financial challenges: expensive medical equipment, regulatory requirements, insurance reimbursement delays, and the need for continuous technology upgrades.",
      "Lendura Capital understands the healthcare industry and provides specialized financing solutions that help medical professionals focus on patient care while growing their practices."
    ],
    commonNeeds: [
      "Medical equipment and diagnostic tools",
      "Practice expansion and renovations", 
      "Electronic health record systems",
      "Working capital for operations",
      "Equipment upgrades and replacements",
      "Cash flow management between payments"
    ]
  },

  "restaurant-food-service": {
    name: "Restaurant & Food Service",
    title: "Restaurant & Food Service Financing",
    description: "Flexible funding for restaurant equipment, renovations, inventory, and working capital needs.",
    slug: "restaurant-food-service",
    heroImage: "/attached_assets/restaurant.jpg",
    heroImageAlt: "Restaurant kitchen and dining area",
    overviewTitle: "Serving Your Success",
    overviewContent: [
      "Restaurants and food service businesses operate in a fast-paced, high-volume environment with thin margins and significant upfront costs.",
      "Lendura Capital provides tailored financing solutions that help restaurants manage seasonal fluctuations, upgrade equipment, and expand operations."
    ],
    commonNeeds: [
      "Kitchen equipment and appliances",
      "Restaurant renovations and buildouts",
      "Point-of-sale systems and technology",
      "Inventory and food supplies",
      "Working capital for operations",
      "Franchise fees and expansion costs"
    ]
  },

  "trucking-transportation": {
    name: "Trucking & Transportation",
    title: "Trucking & Transportation Financing",
    description: "Comprehensive financing for trucks, trailers, fuel, maintenance, and fleet expansion.",
    slug: "trucking-transportation",
    heroImage: "/attached_assets/trucking.jpg",
    heroImageAlt: "Commercial trucks and transportation fleet",
    overviewTitle: "Keeping Your Fleet Moving",
    overviewContent: [
      "Transportation companies face unique challenges including vehicle acquisition costs, fuel price volatility, maintenance expenses, and regulatory compliance.",
      "Lendura Capital understands the transportation industry and offers flexible financing solutions to help trucking companies maintain and expand their fleets."
    ],
    commonNeeds: [
      "Semi-trucks and commercial vehicles",
      "Trailers and specialized equipment",
      "Fuel and operational expenses",
      "Maintenance and repair costs",
      "Fleet expansion and upgrades",
      "Working capital for cash flow"
    ]
  },

  "retail-e-commerce": {
    name: "Retail & E-Commerce",
    title: "Retail & E-Commerce Financing",
    description: "Smart financing solutions for inventory, technology, marketing, and business growth.",
    slug: "retail-e-commerce",
    heroImage: "/attached_assets/retail.jpg",
    heroImageAlt: "Retail store and e-commerce operations",
    overviewTitle: "Powering Retail Success",
    overviewContent: [
      "Retail and e-commerce businesses need flexible financing to manage inventory cycles, seasonal fluctuations, and rapid growth opportunities.",
      "Lendura Capital provides tailored funding solutions that help retailers optimize cash flow, expand product lines, and scale their operations."
    ],
    commonNeeds: [
      "Inventory and product sourcing",
      "E-commerce platform and technology",
      "Marketing and advertising campaigns",
      "Store fixtures and equipment",
      "Working capital for operations",
      "Seasonal inventory preparation"
    ]
  }
};