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

// Type definitions for internal linking system
export interface InternalLink {
  slug: string;
  anchorText: string;
  reason: string;
}

export interface InternalLinkMapping {
  [key: string]: InternalLink[];
}

// Solution to Industry mappings - each solution links to 3-5 most relevant industries
export const solutionToIndustryLinks: InternalLinkMapping = {
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
    { slug: 'construction', anchorText: 'Construction Purchase Order Financing', reason: 'Materials for large construction projects' },
    { slug: 'professional-services', anchorText: 'Professional Services Purchase Order Financing', reason: 'Large service contract fulfillment' }
  ],

  'commercial-real-estate-lending': [
    { slug: 'real-estate', anchorText: 'Real Estate Development Financing', reason: 'Property acquisition and development projects' },
    { slug: 'construction', anchorText: 'Construction Real Estate Financing', reason: 'Commercial construction and renovation' },
    { slug: 'retail-e-commerce', anchorText: 'Retail Property Financing', reason: 'Store locations and warehouse facilities' },
    { slug: 'restaurant-food-service', anchorText: 'Restaurant Property Financing', reason: 'Restaurant locations and kitchen facilities' },
    { slug: 'manufacturing', anchorText: 'Manufacturing Facility Financing', reason: 'Production facilities and warehouses' }
  ]
};

// Industry to Solution mappings - each industry links to 3-5 most relevant solutions
export const industryToSolutionLinks: InternalLinkMapping = {
  'restaurant-food-service': [
    { slug: 'merchant-cash-advance', anchorText: 'Restaurant Merchant Cash Advance', reason: 'Daily sales provide natural repayment source' },
    { slug: 'equipment-financing', anchorText: 'Restaurant Equipment Financing', reason: 'Kitchen equipment and dining room furnishings' },
    { slug: 'term-loans', anchorText: 'Restaurant Term Loans', reason: 'Expansion, renovation, and working capital' },
    { slug: 'lines-of-credit', anchorText: 'Restaurant Lines of Credit', reason: 'Seasonal cash flow and ingredient purchases' },
    { slug: 'debt-consolidation', anchorText: 'Restaurant Debt Consolidation', reason: 'Combine multiple equipment and credit lines' }
  ],

  'retail-e-commerce': [
    { slug: 'merchant-cash-advance', anchorText: 'Retail Merchant Cash Advance', reason: 'High credit card transaction volumes' },
    { slug: 'lines-of-credit', anchorText: 'Retail Lines of Credit', reason: 'Inventory management and seasonal demands' },
    { slug: 'term-loans', anchorText: 'Retail Business Term Loans', reason: 'Store expansion and technology upgrades' },
    { slug: 'invoice-factoring', anchorText: 'Retail Invoice Factoring', reason: 'B2B sales and wholesale operations' },
    { slug: 'po-financing', anchorText: 'Retail Purchase Order Financing', reason: 'Large inventory purchases for seasonal sales' }
  ],

  'construction': [
    { slug: 'equipment-financing', anchorText: 'Construction Equipment Financing', reason: 'Heavy machinery, trucks, and tools' },
    { slug: 'lines-of-credit', anchorText: 'Construction Lines of Credit', reason: 'Project materials and cash flow management' },
    { slug: 'invoice-factoring', anchorText: 'Construction Invoice Factoring', reason: 'Accelerate payment on completed work' },
    { slug: 'term-loans', anchorText: 'Construction Business Term Loans', reason: 'Large projects and company expansion' },
    { slug: 'po-financing', anchorText: 'Construction Purchase Order Financing', reason: 'Materials for large construction contracts' }
  ],

  'manufacturing': [
    { slug: 'equipment-financing', anchorText: 'Manufacturing Equipment Financing', reason: 'Production machinery and technology' },
    { slug: 'invoice-factoring', anchorText: 'Manufacturing Invoice Factoring', reason: 'B2B sales with extended payment terms' },
    { slug: 'term-loans', anchorText: 'Manufacturing Term Loans', reason: 'Facility expansion and large equipment purchases' },
    { slug: 'sba-loans', anchorText: 'Manufacturing SBA Loans', reason: 'Government-backed financing for growth' },
    { slug: 'po-financing', anchorText: 'Manufacturing Purchase Order Financing', reason: 'Raw materials for large production runs' }
  ],

  'medical-healthcare': [
    { slug: 'equipment-financing', anchorText: 'Medical Equipment Financing', reason: 'Medical devices and diagnostic equipment' },
    { slug: 'term-loans', anchorText: 'Healthcare Practice Term Loans', reason: 'Practice expansion and facility improvements' },
    { slug: 'lines-of-credit', anchorText: 'Healthcare Lines of Credit', reason: 'Cash flow and operational expenses' },
    { slug: 'sba-loans', anchorText: 'Healthcare SBA Loans', reason: 'Practice acquisition and expansion' },
    { slug: 'invoice-factoring', anchorText: 'Medical Invoice Factoring', reason: 'Insurance reimbursement acceleration' }
  ],

  'technology-software': [
    { slug: 'lines-of-credit', anchorText: 'Technology Company Lines of Credit', reason: 'R&D funding and operational flexibility' },
    { slug: 'term-loans', anchorText: 'Technology Business Term Loans', reason: 'Equipment, hiring, and growth capital' },
    { slug: 'invoice-factoring', anchorText: 'Technology Invoice Factoring', reason: 'B2B software sales and service contracts' },
    { slug: 'sba-loans', anchorText: 'Technology SBA Loans', reason: 'Long-term growth and development funding' },
    { slug: 'po-financing', anchorText: 'Technology Purchase Order Financing', reason: 'Large contract fulfillment and equipment' }
  ],

  'trucking-transportation': [
    { slug: 'equipment-financing', anchorText: 'Trucking Equipment Financing', reason: 'Commercial vehicles, trailers, and maintenance equipment' },
    { slug: 'invoice-factoring', anchorText: 'Trucking Invoice Factoring', reason: 'Freight bills and transportation invoices' },
    { slug: 'term-loans', anchorText: 'Trucking Business Term Loans', reason: 'Fleet expansion and terminal facilities' },
    { slug: 'lines-of-credit', anchorText: 'Trucking Lines of Credit', reason: 'Fuel, maintenance, and operational expenses' },
    { slug: 'merchant-cash-advance', anchorText: 'Trucking Merchant Cash Advance', reason: 'Fast access to working capital for operations' }
  ],

  'professional-services': [
    { slug: 'lines-of-credit', anchorText: 'Professional Services Lines of Credit', reason: 'Operating expenses and growth funding' },
    { slug: 'merchant-cash-advance', anchorText: 'Professional Services Cash Advance', reason: 'Service businesses with regular client payments' },
    { slug: 'term-loans', anchorText: 'Professional Services Term Loans', reason: 'Office expansion and technology investments' },
    { slug: 'invoice-factoring', anchorText: 'Professional Services Invoice Factoring', reason: 'Client invoicing and cash flow acceleration' },
    { slug: 'sba-loans', anchorText: 'Professional Services SBA Loans', reason: 'Practice acquisition and long-term growth' }
  ],

  'beauty-wellness': [
    { slug: 'merchant-cash-advance', anchorText: 'Beauty & Wellness Merchant Cash Advance', reason: 'Service-based businesses with daily transactions' },
    { slug: 'equipment-financing', anchorText: 'Beauty Equipment Financing', reason: 'Salon equipment and wellness technology' },
    { slug: 'term-loans', anchorText: 'Beauty & Wellness Term Loans', reason: 'Salon expansion and spa development' },
    { slug: 'lines-of-credit', anchorText: 'Beauty Business Lines of Credit', reason: 'Inventory and seasonal cash flow needs' },
    { slug: 'debt-consolidation', anchorText: 'Beauty Business Debt Consolidation', reason: 'Equipment loans and expansion debt management' }
  ],

  'auto-transportation': [
    { slug: 'equipment-financing', anchorText: 'Auto Industry Equipment Financing', reason: 'Diagnostic equipment and shop tools' },
    { slug: 'merchant-cash-advance', anchorText: 'Auto Dealership Merchant Cash Advance', reason: 'Vehicle sales and service transactions' },
    { slug: 'lines-of-credit', anchorText: 'Auto Industry Lines of Credit', reason: 'Inventory financing and cash flow management' },
    { slug: 'term-loans', anchorText: 'Auto Business Term Loans', reason: 'Facility expansion and technology upgrades' },
    { slug: 'debt-consolidation', anchorText: 'Auto Industry Debt Consolidation', reason: 'Inventory and equipment debt management' }
  ],

  'real-estate': [
    { slug: 'commercial-real-estate-lending', anchorText: 'Commercial Real Estate Financing', reason: 'Property acquisition and development' },
    { slug: 'sba-loans', anchorText: 'Real Estate SBA Loans', reason: 'Owner-occupied property financing' },
    { slug: 'term-loans', anchorText: 'Real Estate Investment Term Loans', reason: 'Property acquisition and renovation' },
    { slug: 'lines-of-credit', anchorText: 'Real Estate Lines of Credit', reason: 'Bridge financing and renovation projects' },
    { slug: 'po-financing', anchorText: 'Real Estate Purchase Order Financing', reason: 'Materials for large development projects' }
  ],

  'agriculture-farming': [
    { slug: 'equipment-financing', anchorText: 'Agricultural Equipment Financing', reason: 'Tractors, harvesters, and farming equipment' },
    { slug: 'term-loans', anchorText: 'Farm Business Term Loans', reason: 'Land acquisition and facility development' },
    { slug: 'lines-of-credit', anchorText: 'Agricultural Lines of Credit', reason: 'Seasonal cash flow and crop financing' },
    { slug: 'sba-loans', anchorText: 'Farm SBA Loans', reason: 'Government-backed agricultural financing' },
    { slug: 'invoice-factoring', anchorText: 'Agricultural Invoice Factoring', reason: 'Crop sales and equipment leasing payments' }
  ],

  'franchises': [
    { slug: 'sba-loans', anchorText: 'Franchise SBA Loans', reason: 'Government-backed franchise financing with lower down payments' },
    { slug: 'term-loans', anchorText: 'Franchise Business Term Loans', reason: 'Multi-unit expansion and equipment purchases' },
    { slug: 'equipment-financing', anchorText: 'Franchise Equipment Financing', reason: 'Brand-specific equipment and technology' },
    { slug: 'lines-of-credit', anchorText: 'Franchise Lines of Credit', reason: 'Working capital and inventory management' },
    { slug: 'merchant-cash-advance', anchorText: 'Franchise Merchant Cash Advance', reason: 'Fast access to working capital for franchise operations' }
  ]
};

/**
 * Get related industries for a specific solution
 * @param solutionSlug - The slug identifier for the solution
 * @returns Array of related industry links
 */
export function getRelatedIndustries(solutionSlug: string): InternalLink[] {
  return solutionToIndustryLinks[solutionSlug] || [];
}

/**
 * Get related solutions for a specific industry  
 * @param industrySlug - The slug identifier for the industry
 * @returns Array of related solution links
 */
export function getRelatedSolutions(industrySlug: string): InternalLink[] {
  return industryToSolutionLinks[industrySlug] || [];
}

/**
 * Generate HTML for internal linking sections
 * @param links - Array of internal links to render
 * @param sectionTitle - Title for the links section
 * @returns HTML string for the links section
 */
export function generateInternalLinksHTML(links: InternalLink[], sectionTitle: string): string {
  if (!links || links.length === 0) {
    return '';
  }

  const linksHTML = links.map(link => `
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <h3 class="text-xl font-semibold text-[#193a59] mb-2">
        <a href="/industries/${link.slug}" class="hover:text-[#285d8a] transition-colors">
          ${link.anchorText}
        </a>
      </h3>
      <p class="text-gray-600">${link.reason}</p>
    </div>
  `).join('');

  return `
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold text-center text-black mb-12">
          ${sectionTitle}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${linksHTML}
        </div>
      </div>
    </section>
  `;
}

/**
 * Get SEO-optimized keywords from related links
 * @param links - Array of internal links
 * @returns Comma-separated string of keywords for SEO meta tags
 */
export function generateSEOKeywords(links: InternalLink[]): string {
  if (!links || links.length === 0) {
    return '';
  }
  
  return links.map(link => 
    link.anchorText.toLowerCase().replace(/\s+/g, ' ').trim()
  ).join(', ');
}

// Export default object for backward compatibility
export default {
  solutionToIndustryLinks,
  industryToSolutionLinks,
  getRelatedIndustries,
  getRelatedSolutions,
  generateInternalLinksHTML,
  generateSEOKeywords
};