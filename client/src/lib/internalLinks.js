/**
 * Internal Linking System for Solutions ↔ Industries Cross-linking
 * 
 * This file provides smart business logic mapping between financing solutions 
 * and industries to create keyword-rich internal links for SEO optimization.
 * 
 * Usage:
 * - getRelatedIndustries(solutionSlug) - Get industries that commonly use this solution
 * - getRelatedSolutions(industrySlug) - Get solutions commonly used by this industry  
 * - generateInternalLinksHTML() - Generate HTML for cross-linking sections
 */

// Solution to Industry mappings - each solution links to 3-5 most relevant industries
export const solutionToIndustryLinks = {
  'term-loans': [
    { slug: 'manufacturing', anchorText: 'Manufacturing & Production Term Loans', reason: 'Equipment purchases and facility expansion' },
    { slug: 'construction', anchorText: 'Construction Industry Term Loans', reason: 'Project funding and equipment purchases' },
    { slug: 'restaurant-food-service', anchorText: 'Restaurant & Food Service Term Loans', reason: 'Expansion, renovation, and equipment' },
    { slug: 'retail-e-commerce', anchorText: 'Retail & E-commerce Business Term Loans', reason: 'Inventory, expansion, and technology' },
    { slug: 'medical-healthcare', anchorText: 'Healthcare Practice Term Loans', reason: 'Practice expansion and medical equipment' }
  ],

  'lines-of-credit': [
    { slug: 'retail-e-commerce', anchorText: 'Retail & E-commerce Lines of Credit', reason: 'Inventory management and seasonal cash flow' },
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Lines of Credit', reason: 'Working capital and seasonal operations' },
    { slug: 'construction', anchorText: 'Construction Lines of Credit', reason: 'Project materials and cash flow management' },
    { slug: 'technology-software', anchorText: 'Technology Company Lines of Credit', reason: 'R&D funding and growth capital' },
    { slug: 'professional-services', anchorText: 'Professional Services Lines of Credit', reason: 'Operating expenses and growth funding' }
  ],

  'merchant-cash-advance': [
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Merchant Cash Advance', reason: 'Daily credit card sales provide repayment source' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Merchant Cash Advance', reason: 'High-volume sales transactions' },
    { slug: 'beauty-wellness', anchorText: 'Beauty & Wellness Merchant Cash Advance', reason: 'Service-based businesses with daily sales' },
    { slug: 'professional-services', anchorText: 'Professional Services Cash Advance', reason: 'Service businesses with regular payments' },
    { slug: 'auto-transportation', anchorText: 'Auto Industry Merchant Cash Advance', reason: 'Auto sales and service transactions' }
  ],

  'equipment-financing': [
    { slug: 'construction', anchorText: 'Construction Equipment Financing', reason: 'Heavy machinery, tools, and vehicles' },
    { slug: 'manufacturing', anchorText: 'Manufacturing Equipment Financing', reason: 'Production machinery and tools' },
    { slug: 'trucking-transportation', anchorText: 'Trucking & Transportation Equipment Financing', reason: 'Commercial vehicles and trailers' },
    { slug: 'medical-healthcare', anchorText: 'Medical Equipment Financing', reason: 'Medical devices and diagnostic equipment' },
    { slug: 'agriculture-farming', anchorText: 'Agricultural Equipment Financing', reason: 'Tractors, harvesters, and farming equipment' }
  ],

  'sba-loans': [
    { slug: 'manufacturing', anchorText: 'Manufacturing SBA Loans', reason: 'Established businesses with growth plans' },
    { slug: 'real-estate', anchorText: 'Real Estate SBA Loans', reason: 'Property acquisition and development' },
    { slug: 'franchises', anchorText: 'Franchise SBA Loans', reason: 'Franchise purchases and multi-unit expansion' },
    { slug: 'professional-services', anchorText: 'Professional Services SBA Loans', reason: 'Practice acquisition and expansion' },
    { slug: 'technology-software', anchorText: 'Technology Company SBA Loans', reason: 'Long-term growth and development' }
  ],

  'invoice-factoring': [
    { slug: 'manufacturing', anchorText: 'Manufacturing Invoice Factoring', reason: 'B2B sales with 30-90 day payment terms' },
    { slug: 'construction', anchorText: 'Construction Invoice Factoring', reason: 'Large project invoices and payment delays' },
    { slug: 'professional-services', anchorText: 'Professional Services Invoice Factoring', reason: 'Client invoicing and cash flow acceleration' },
    { slug: 'technology-software', anchorText: 'Technology Invoice Factoring', reason: 'B2B software and service invoicing' },
    { slug: 'trucking-transportation', anchorText: 'Trucking Invoice Factoring', reason: 'Freight bills and transportation invoices' }
  ],

  'debt-consolidation': [
    { slug: 'retail-e-commerce', anchorText: 'Retail Debt Consolidation', reason: 'Multiple credit lines and seasonal debt' },
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Debt Consolidation', reason: 'Equipment loans and credit consolidation' },
    { slug: 'professional-services', anchorText: 'Professional Services Debt Consolidation', reason: 'Practice loans and credit management' },
    { slug: 'beauty-wellness', anchorText: 'Beauty & Wellness Debt Consolidation', reason: 'Equipment and expansion debt management' },
    { slug: 'auto-transportation', anchorText: 'Auto Industry Debt Consolidation', reason: 'Inventory and equipment debt management' }
  ],

  'po-financing': [
    { slug: 'manufacturing', anchorText: 'Manufacturing Purchase Order Financing', reason: 'Large order fulfillment and production' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Purchase Order Financing', reason: 'Inventory purchases for large orders' },
    { slug: 'technology-software', anchorText: 'Technology Purchase Order Financing', reason: 'Large contract fulfillment' },
    { slug: 'construction', anchorText: 'Construction Purchase Order Financing', reason: 'Material purchases for large projects' },
    { slug: 'professional-services', anchorText: 'Professional Services Purchase Order Financing', reason: 'Large contract project funding' }
  ],

  'commercial-real-estate-lending': [
    { slug: 'real-estate', anchorText: 'Real Estate Investment Financing', reason: 'Property acquisition and development' },
    { slug: 'manufacturing', anchorText: 'Manufacturing Facility Financing', reason: 'Production facility acquisition' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Property Financing', reason: 'Store locations and warehouses' },
    { slug: 'medical-healthcare', anchorText: 'Medical Facility Financing', reason: 'Practice buildings and medical centers' },
    { slug: 'hospitality-tourism', anchorText: 'Hospitality Real Estate Financing', reason: 'Hotels and tourism property acquisition' }
  ],

  'mortgage-financing': [
    { slug: 'real-estate', anchorText: 'Real Estate Mortgage Financing', reason: 'Property acquisition and refinancing' },
    { slug: 'construction', anchorText: 'Construction Mortgage Financing', reason: 'Development and construction projects' },
    { slug: 'hospitality-tourism', anchorText: 'Hospitality Mortgage Financing', reason: 'Hotel and resort property financing' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Property Mortgage Financing', reason: 'Commercial retail property acquisition' },
    { slug: 'medical-healthcare', anchorText: 'Medical Property Mortgage Financing', reason: 'Healthcare facility acquisition' }
  ],

  'credit-services': [
    { slug: 'professional-services', anchorText: 'Professional Services Credit Solutions', reason: 'Credit building and management' },
    { slug: 'technology-software', anchorText: 'Technology Company Credit Services', reason: 'Business credit establishment' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Business Credit Services', reason: 'Credit building for growth' },
    { slug: 'beauty-wellness', anchorText: 'Beauty & Wellness Credit Services', reason: 'Service business credit solutions' },
    { slug: 'auto-transportation', anchorText: 'Auto Industry Credit Services', reason: 'Automotive business credit building' }
  ],

  'credit-card-processing': [
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Credit Card Processing', reason: 'High-volume card transactions and quick deposits' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Credit Card Processing', reason: 'In-store and online payment processing' },
    { slug: 'beauty-wellness', anchorText: 'Beauty & Wellness Payment Processing', reason: 'Service-based payment solutions' },
    { slug: 'professional-services', anchorText: 'Professional Services Payment Processing', reason: 'Client payment processing solutions' },
    { slug: 'medical-healthcare', anchorText: 'Medical Practice Payment Processing', reason: 'Patient payment and insurance processing' }
  ],

  'seo-web-development': [
    { slug: 'professional-services', anchorText: 'Professional Services Digital Marketing', reason: 'Online presence and client acquisition' },
    { slug: 'technology-software', anchorText: 'Technology Company SEO & Web Development', reason: 'Digital marketing and web presence' },
    { slug: 'retail-e-commerce', anchorText: 'E-commerce SEO & Web Development', reason: 'Online store optimization and growth' },
    { slug: 'medical-healthcare', anchorText: 'Healthcare Practice SEO & Web Development', reason: 'Patient acquisition and online presence' },
    { slug: 'beauty-wellness', anchorText: 'Beauty & Wellness Digital Marketing', reason: 'Customer acquisition and online booking' }
  ],

  'credit-servicing': [
    { slug: 'professional-services', anchorText: 'Professional Services Credit Repair', reason: 'Business credit improvement and management' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Business Credit Repair', reason: 'Credit score improvement for better financing' },
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Credit Repair Services', reason: 'Credit improvement for better loan terms' },
    { slug: 'construction', anchorText: 'Construction Business Credit Repair', reason: 'Credit building for better bonding and financing' },
    { slug: 'auto-transportation', anchorText: 'Auto Industry Credit Repair', reason: 'Credit improvement for fleet financing' }
  ]
};

// Industry to Solution mappings - each industry links to 3-5 most relevant solutions
export const industryToSolutionLinks = {
  'construction': [
    { slug: 'equipment-financing', anchorText: 'Construction Equipment Financing', reason: 'Heavy machinery, tools, and vehicles' },
    { slug: 'lines-of-credit', anchorText: 'Construction Lines of Credit', reason: 'Project materials and cash flow management' },
    { slug: 'term-loans', anchorText: 'Construction Term Loans', reason: 'Project funding and business expansion' },
    { slug: 'invoice-factoring', anchorText: 'Construction Invoice Factoring', reason: 'Accelerate payment from general contractors' },
    { slug: 'po-financing', anchorText: 'Construction Purchase Order Financing', reason: 'Material purchases for large projects' },
    { slug: 'mortgage-financing', anchorText: 'Construction Mortgage Financing', reason: 'Development and construction projects' },
    { slug: 'credit-servicing', anchorText: 'Construction Business Credit Repair', reason: 'Credit building for better bonding and financing' }
  ],

  'manufacturing': [
    { slug: 'equipment-financing', anchorText: 'Manufacturing Equipment Financing', reason: 'Production machinery and tools' },
    { slug: 'term-loans', anchorText: 'Manufacturing Term Loans', reason: 'Facility expansion and equipment purchases' },
    { slug: 'invoice-factoring', anchorText: 'Manufacturing Invoice Factoring', reason: 'B2B sales and cash flow acceleration' },
    { slug: 'sba-loans', anchorText: 'Manufacturing SBA Loans', reason: 'Long-term growth and expansion funding' },
    { slug: 'po-financing', anchorText: 'Manufacturing Purchase Order Financing', reason: 'Large order fulfillment funding' },
    { slug: 'commercial-real-estate-lending', anchorText: 'Manufacturing Facility Financing', reason: 'Production facility acquisition' }
  ],

  'restaurant-food-service': [
    { slug: 'merchant-cash-advance', anchorText: 'Restaurant Merchant Cash Advance', reason: 'Quick funding based on daily sales' },
    { slug: 'term-loans', anchorText: 'Restaurant Term Loans', reason: 'Equipment, renovation, and expansion' },
    { slug: 'lines-of-credit', anchorText: 'Restaurant Lines of Credit', reason: 'Working capital and seasonal cash flow' },
    { slug: 'equipment-financing', anchorText: 'Restaurant Equipment Financing', reason: 'Kitchen equipment and furniture' },
    { slug: 'debt-consolidation', anchorText: 'Restaurant Debt Consolidation', reason: 'Simplify multiple loans and credit lines' },
    { slug: 'credit-card-processing', anchorText: 'Restaurant Credit Card Processing', reason: 'High-volume card transactions and quick deposits' },
    { slug: 'credit-servicing', anchorText: 'Restaurant Credit Repair Services', reason: 'Credit improvement for better loan terms' }
  ],

  'retail-e-commerce': [
    { slug: 'merchant-cash-advance', anchorText: 'Retail Merchant Cash Advance', reason: 'Based on credit card sales volume' },
    { slug: 'lines-of-credit', anchorText: 'Retail Lines of Credit', reason: 'Inventory management and seasonal needs' },
    { slug: 'term-loans', anchorText: 'Retail Term Loans', reason: 'Expansion, inventory, and technology' },
    { slug: 'po-financing', anchorText: 'Retail Purchase Order Financing', reason: 'Large inventory purchases' },
    { slug: 'debt-consolidation', anchorText: 'Retail Debt Consolidation', reason: 'Manage multiple credit facilities' },
    { slug: 'commercial-real-estate-lending', anchorText: 'Retail Property Financing', reason: 'Store locations and warehouses' },
    { slug: 'mortgage-financing', anchorText: 'Retail Property Mortgage Financing', reason: 'Commercial retail property acquisition' },
    { slug: 'credit-services', anchorText: 'Retail Business Credit Services', reason: 'Credit building for growth' },
    { slug: 'credit-card-processing', anchorText: 'Retail Credit Card Processing', reason: 'In-store and online payment processing' },
    { slug: 'seo-web-development', anchorText: 'E-commerce SEO & Web Development', reason: 'Online store optimization and growth' },
    { slug: 'credit-servicing', anchorText: 'Retail Business Credit Repair', reason: 'Credit score improvement for better financing' }
  ],

  'medical-healthcare': [
    { slug: 'equipment-financing', anchorText: 'Medical Equipment Financing', reason: 'Medical devices and diagnostic equipment' },
    { slug: 'term-loans', anchorText: 'Healthcare Practice Term Loans', reason: 'Practice expansion and improvements' },
    { slug: 'commercial-real-estate-lending', anchorText: 'Medical Facility Financing', reason: 'Practice buildings and medical centers' },
    { slug: 'lines-of-credit', anchorText: 'Healthcare Lines of Credit', reason: 'Working capital and cash flow management' },
    { slug: 'invoice-factoring', anchorText: 'Medical Invoice Factoring', reason: 'Insurance billing and payment acceleration' },
    { slug: 'mortgage-financing', anchorText: 'Medical Property Mortgage Financing', reason: 'Healthcare facility acquisition' },
    { slug: 'credit-card-processing', anchorText: 'Medical Practice Payment Processing', reason: 'Patient payment and insurance processing' },
    { slug: 'seo-web-development', anchorText: 'Healthcare Practice SEO & Web Development', reason: 'Patient acquisition and online presence' }
  ],

  'technology-software': [
    { slug: 'lines-of-credit', anchorText: 'Technology Lines of Credit', reason: 'R&D funding and growth capital' },
    { slug: 'sba-loans', anchorText: 'Technology SBA Loans', reason: 'Long-term development and expansion' },
    { slug: 'invoice-factoring', anchorText: 'Technology Invoice Factoring', reason: 'B2B software and service invoicing' },
    { slug: 'term-loans', anchorText: 'Technology Term Loans', reason: 'Equipment and growth funding' },
    { slug: 'po-financing', anchorText: 'Technology Purchase Order Financing', reason: 'Large contract fulfillment' },
    { slug: 'credit-services', anchorText: 'Technology Company Credit Services', reason: 'Business credit establishment' },
    { slug: 'seo-web-development', anchorText: 'Technology Company SEO & Web Development', reason: 'Digital marketing and web presence' }
  ],

  'trucking-transportation': [
    { slug: 'equipment-financing', anchorText: 'Trucking Equipment Financing', reason: 'Commercial vehicles and trailers' },
    { slug: 'invoice-factoring', anchorText: 'Trucking Invoice Factoring', reason: 'Freight bills and payment acceleration' },
    { slug: 'term-loans', anchorText: 'Trucking Term Loans', reason: 'Fleet expansion and equipment' },
    { slug: 'lines-of-credit', anchorText: 'Trucking Lines of Credit', reason: 'Fuel, maintenance, and operating expenses' },
    { slug: 'merchant-cash-advance', anchorText: 'Transportation Cash Advance', reason: 'Quick funding for logistics companies' }
  ],

  'professional-services': [
    { slug: 'lines-of-credit', anchorText: 'Professional Services Lines of Credit', reason: 'Operating expenses and growth funding' },
    { slug: 'invoice-factoring', anchorText: 'Professional Services Invoice Factoring', reason: 'Client payment acceleration' },
    { slug: 'sba-loans', anchorText: 'Professional Services SBA Loans', reason: 'Practice acquisition and expansion' },
    { slug: 'merchant-cash-advance', anchorText: 'Professional Services Cash Advance', reason: 'Quick funding for service businesses' },
    { slug: 'term-loans', anchorText: 'Professional Services Term Loans', reason: 'Office expansion and equipment' },
    { slug: 'debt-consolidation', anchorText: 'Professional Services Debt Consolidation', reason: 'Practice loans and credit management' },
    { slug: 'po-financing', anchorText: 'Professional Services Purchase Order Financing', reason: 'Large contract project funding' },
    { slug: 'credit-services', anchorText: 'Professional Services Credit Solutions', reason: 'Credit building and management' },
    { slug: 'credit-card-processing', anchorText: 'Professional Services Payment Processing', reason: 'Client payment processing solutions' },
    { slug: 'seo-web-development', anchorText: 'Professional Services Digital Marketing', reason: 'Online presence and client acquisition' },
    { slug: 'credit-servicing', anchorText: 'Professional Services Credit Repair', reason: 'Business credit improvement and management' }
  ],

  'real-estate': [
    { slug: 'commercial-real-estate-lending', anchorText: 'Real Estate Investment Financing', reason: 'Property acquisition and development' },
    { slug: 'mortgage-financing', anchorText: 'Real Estate Mortgage Financing', reason: 'Property acquisition and refinancing' },
    { slug: 'sba-loans', anchorText: 'Real Estate SBA Loans', reason: 'Commercial property acquisition' },
    { slug: 'lines-of-credit', anchorText: 'Real Estate Lines of Credit', reason: 'Property management and improvements' },
    { slug: 'term-loans', anchorText: 'Real Estate Term Loans', reason: 'Property development and renovation' }
  ],

  'beauty-wellness': [
    { slug: 'merchant-cash-advance', anchorText: 'Beauty & Wellness Cash Advance', reason: 'Service-based businesses with daily sales' },
    { slug: 'equipment-financing', anchorText: 'Beauty Equipment Financing', reason: 'Salon and spa equipment' },
    { slug: 'term-loans', anchorText: 'Beauty & Wellness Term Loans', reason: 'Salon expansion and renovation' },
    { slug: 'lines-of-credit', anchorText: 'Beauty & Wellness Lines of Credit', reason: 'Inventory and working capital' },
    { slug: 'debt-consolidation', anchorText: 'Beauty Business Debt Consolidation', reason: 'Equipment and expansion debt management' },
    { slug: 'credit-services', anchorText: 'Beauty & Wellness Credit Services', reason: 'Service business credit solutions' },
    { slug: 'credit-card-processing', anchorText: 'Beauty & Wellness Payment Processing', reason: 'Service-based payment solutions' },
    { slug: 'seo-web-development', anchorText: 'Beauty & Wellness Digital Marketing', reason: 'Customer acquisition and online booking' }
  ],

  'auto-transportation': [
    { slug: 'merchant-cash-advance', anchorText: 'Auto Industry Cash Advance', reason: 'Auto sales and service transactions' },
    { slug: 'equipment-financing', anchorText: 'Auto Equipment Financing', reason: 'Diagnostic equipment and tools' },
    { slug: 'lines-of-credit', anchorText: 'Auto Dealer Lines of Credit', reason: 'Inventory and working capital' },
    { slug: 'term-loans', anchorText: 'Auto Industry Term Loans', reason: 'Dealership expansion and equipment' },
    { slug: 'debt-consolidation', anchorText: 'Auto Industry Debt Consolidation', reason: 'Inventory and equipment debt management' },
    { slug: 'credit-services', anchorText: 'Auto Industry Credit Services', reason: 'Automotive business credit building' },
    { slug: 'credit-servicing', anchorText: 'Auto Industry Credit Repair', reason: 'Credit improvement for fleet financing' }
  ],

  'agriculture-farming': [
    { slug: 'equipment-financing', anchorText: 'Agricultural Equipment Financing', reason: 'Tractors, harvesters, and farming equipment' },
    { slug: 'term-loans', anchorText: 'Agricultural Term Loans', reason: 'Farm expansion and equipment purchases' },
    { slug: 'lines-of-credit', anchorText: 'Agricultural Lines of Credit', reason: 'Seasonal cash flow and operations' },
    { slug: 'sba-loans', anchorText: 'Agricultural SBA Loans', reason: 'Farm acquisition and development' },
    { slug: 'invoice-factoring', anchorText: 'Agricultural Invoice Factoring', reason: 'Crop sales and payment acceleration' }
  ],

  'franchises': [
    { slug: 'sba-loans', anchorText: 'Franchise SBA Loans', reason: 'Franchise purchases and multi-unit expansion' },
    { slug: 'term-loans', anchorText: 'Franchise Term Loans', reason: 'Location expansion and equipment' },
    { slug: 'lines-of-credit', anchorText: 'Franchise Lines of Credit', reason: 'Multi-location operations and growth' },
    { slug: 'equipment-financing', anchorText: 'Franchise Equipment Financing', reason: 'Standardized equipment packages' },
    { slug: 'merchant-cash-advance', anchorText: 'Franchise Cash Advance', reason: 'Quick funding for franchise operations' }
  ],

  'hospitality-tourism': [
    { slug: 'commercial-real-estate-lending', anchorText: 'Hospitality Real Estate Financing', reason: 'Hotel and resort property acquisition' },
    { slug: 'mortgage-financing', anchorText: 'Hospitality Mortgage Financing', reason: 'Hotel property financing and refinancing' },
    { slug: 'term-loans', anchorText: 'Hospitality Term Loans', reason: 'Hotel renovation and expansion' },
    { slug: 'lines-of-credit', anchorText: 'Hospitality Lines of Credit', reason: 'Seasonal operations and improvements' },
    { slug: 'equipment-financing', anchorText: 'Hospitality Equipment Financing', reason: 'Hotel and restaurant equipment' }
  ],

  'cleaning-janitorial-services': [
    { slug: 'merchant-cash-advance', anchorText: 'Cleaning Services Cash Advance', reason: 'Service-based business with regular contracts' },
    { slug: 'equipment-financing', anchorText: 'Cleaning Equipment Financing', reason: 'Commercial cleaning equipment and vehicles' },
    { slug: 'lines-of-credit', anchorText: 'Cleaning Services Lines of Credit', reason: 'Supplies and working capital' },
    { slug: 'term-loans', anchorText: 'Cleaning Services Term Loans', reason: 'Business expansion and equipment' },
    { slug: 'invoice-factoring', anchorText: 'Cleaning Services Invoice Factoring', reason: 'Commercial contract payment acceleration' }
  ],

  'education-training': [
    { slug: 'term-loans', anchorText: 'Education & Training Term Loans', reason: 'Facility expansion and equipment' },
    { slug: 'sba-loans', anchorText: 'Education SBA Loans', reason: 'School acquisition and development' },
    { slug: 'lines-of-credit', anchorText: 'Education Lines of Credit', reason: 'Seasonal cash flow and operations' },
    { slug: 'equipment-financing', anchorText: 'Education Equipment Financing', reason: 'Training equipment and technology' },
    { slug: 'commercial-real-estate-lending', anchorText: 'Education Facility Financing', reason: 'School buildings and training centers' }
  ],

  'entertainment-events': [
    { slug: 'merchant-cash-advance', anchorText: 'Entertainment Cash Advance', reason: 'Event-based sales and ticket revenue' },
    { slug: 'lines-of-credit', anchorText: 'Entertainment Lines of Credit', reason: 'Event planning and production costs' },
    { slug: 'equipment-financing', anchorText: 'Entertainment Equipment Financing', reason: 'Audio/visual and production equipment' },
    { slug: 'term-loans', anchorText: 'Entertainment Term Loans', reason: 'Venue acquisition and improvements' },
    { slug: 'po-financing', anchorText: 'Entertainment Purchase Order Financing', reason: 'Large event production funding' }
  ],

  'home-services-contracting': [
    { slug: 'equipment-financing', anchorText: 'Home Services Equipment Financing', reason: 'Tools, trucks, and service equipment' },
    { slug: 'lines-of-credit', anchorText: 'Home Services Lines of Credit', reason: 'Materials and working capital' },
    { slug: 'merchant-cash-advance', anchorText: 'Home Services Cash Advance', reason: 'Service-based revenue stream' },
    { slug: 'term-loans', anchorText: 'Home Services Term Loans', reason: 'Business expansion and equipment' },
    { slug: 'invoice-factoring', anchorText: 'Home Services Invoice Factoring', reason: 'Customer payment acceleration' }
  ]
};

/**
 * Get industries that commonly use a specific financing solution
 * @param {string} solutionSlug - The solution slug (e.g., 'term-loans')
 * @returns {Array} Array of industry objects with slug, anchorText, and reason
 */
export const getRelatedIndustries = (solutionSlug) => {
  return solutionToIndustryLinks[solutionSlug] || [];
};

/**
 * Get financing solutions commonly used by a specific industry
 * @param {string} industrySlug - The industry slug (e.g., 'construction')
 * @returns {Array} Array of solution objects with slug, anchorText, and reason
 */
export const getRelatedSolutions = (industrySlug) => {
  return industryToSolutionLinks[industrySlug] || [];
};

/**
 * Generate formatted list of related links for display
 * @param {string} type - Either 'solution' or 'industry'
 * @param {string} slug - The current page slug
 * @returns {Array} Formatted array of related links
 */
export const getFormattedRelatedLinks = (type, slug) => {
  if (type === 'solution') {
    return getRelatedIndustries(slug);
  } else if (type === 'industry') {
    return getRelatedSolutions(slug);
  }
  return [];
};

/**
 * Get all solutions mapped to industries for sitemap generation
 * @returns {Object} Complete mapping object
 */
export const getAllSolutionMappings = () => {
  return solutionToIndustryLinks;
};

/**
 * Get all industries mapped to solutions for sitemap generation
 * @returns {Object} Complete mapping object
 */
export const getAllIndustryMappings = () => {
  return industryToSolutionLinks;
};

/**
 * Validate that mappings are bidirectional (for development/testing)
 * @returns {Array} Array of inconsistencies found
 */
export const validateBidirectionalMappings = () => {
  const inconsistencies = [];
  
  // Check if Solution A links to Industry B, that Industry B links back to Solution A
  Object.entries(solutionToIndustryLinks).forEach(([solutionSlug, industries]) => {
    industries.forEach(industry => {
      const industryMappings = industryToSolutionLinks[industry.slug] || [];
      const hasBackLink = industryMappings.some(solution => solution.slug === solutionSlug);
      
      if (!hasBackLink) {
        inconsistencies.push({
          type: 'missing_back_link',
          solution: solutionSlug,
          industry: industry.slug,
          message: `Solution '${solutionSlug}' links to industry '${industry.slug}' but industry doesn't link back`
        });
      }
    });
  });
  
  return inconsistencies;
};

// Export all available solution and industry slugs for validation
export const availableSolutions = Object.keys(solutionToIndustryLinks);
export const availableIndustries = Object.keys(industryToSolutionLinks);

// Quick reference for all solutions and industries
export const SOLUTIONS = {
  TERM_LOANS: 'term-loans',
  LINES_OF_CREDIT: 'lines-of-credit',
  MERCHANT_CASH_ADVANCE: 'merchant-cash-advance',
  EQUIPMENT_FINANCING: 'equipment-financing',
  SBA_LOANS: 'sba-loans',
  INVOICE_FACTORING: 'invoice-factoring',
  DEBT_CONSOLIDATION: 'debt-consolidation',
  PO_FINANCING: 'po-financing',
  COMMERCIAL_REAL_ESTATE: 'commercial-real-estate-lending',
  MORTGAGE_FINANCING: 'mortgage-financing',
  CREDIT_SERVICES: 'credit-services',
  CREDIT_CARD_PROCESSING: 'credit-card-processing',
  SEO_WEB_DEVELOPMENT: 'seo-web-development',
  CREDIT_SERVICING: 'credit-servicing'
};

export const INDUSTRIES = {
  CONSTRUCTION: 'construction',
  MANUFACTURING: 'manufacturing',
  RESTAURANT: 'restaurant-food-service',
  RETAIL: 'retail-e-commerce',
  MEDICAL: 'medical-healthcare',
  TECHNOLOGY: 'technology-software',
  TRUCKING: 'trucking-transportation',
  PROFESSIONAL_SERVICES: 'professional-services',
  REAL_ESTATE: 'real-estate',
  BEAUTY: 'beauty-wellness',
  AUTO: 'auto-transportation',
  AGRICULTURE: 'agriculture-farming',
  FRANCHISES: 'franchises',
  HOSPITALITY: 'hospitality-tourism',
  CLEANING: 'cleaning-janitorial-services',
  EDUCATION: 'education-training',
  ENTERTAINMENT: 'entertainment-events',
  HOME_SERVICES: 'home-services-contracting'
};