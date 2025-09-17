import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { Search, Clock, Tag, ChevronRight, BookOpen, TrendingUp, Building2, CreditCard, FileText, Target } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

// Professional guide data with real business lending content
const allGuides = [
  {
    id: "ultimate-sba-guide",
    title: "The Complete Guide to SBA Loans in 2025",
    excerpt: "Everything you need to know about SBA financing programs, from application requirements to approval strategies. Includes SBA 7(a), 504, and microloans.",
    readTime: "15 min read",
    category: "SBA Loans",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    featured: true,
    slug: "complete-sba-loan-guide-2025",
    publishDate: "2025-01-15"
  },
  {
    id: "restaurant-financing-guide",
    title: "Restaurant Financing: Complete Funding Guide for Food Service Businesses",
    excerpt: "Discover financing options specifically designed for restaurants, cafes, and food service businesses. Equipment loans, working capital, and more.",
    readTime: "12 min read",
    category: "Industry Guides",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    featured: true,
    slug: "restaurant-financing-complete-guide",
    publishDate: "2025-01-12"
  },
  {
    id: "business-credit-building",
    title: "Building Business Credit: A Step-by-Step Blueprint",
    excerpt: "Learn how to establish and build business credit from scratch. Improve your company's creditworthiness for better financing terms.",
    readTime: "10 min read",
    category: "Credit & Finance",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=250&fit=crop",
    featured: true,
    slug: "building-business-credit-blueprint",
    publishDate: "2025-01-10"
  },
  {
    id: "equipment-financing-guide",
    title: "Equipment Financing vs. Leasing: Which Option Is Right for Your Business?",
    excerpt: "Compare equipment financing and leasing options. Learn the pros and cons of each approach to make the best decision for your business.",
    readTime: "8 min read",
    category: "Equipment Financing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    featured: false,
    slug: "equipment-financing-vs-leasing-guide",
    publishDate: "2025-01-08"
  },
  {
    id: "working-capital-management",
    title: "Working Capital Management: Strategies for Business Growth",
    excerpt: "Master working capital management with proven strategies. Learn how to optimize cash flow and fuel sustainable business growth.",
    readTime: "11 min read",
    category: "Business Growth",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    featured: false,
    slug: "working-capital-management-strategies",
    publishDate: "2025-01-05"
  },
  {
    id: "construction-business-loans",
    title: "Construction Business Loans: Financing Guide for Contractors",
    excerpt: "Specialized financing options for construction businesses. Equipment loans, lines of credit, and project financing solutions.",
    readTime: "9 min read",
    category: "Industry Guides",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
    featured: false,
    slug: "construction-business-loans-guide",
    publishDate: "2025-01-03"
  },
  {
    id: "medical-practice-funding",
    title: "Medical Practice Funding: Healthcare Financing Solutions",
    excerpt: "Comprehensive guide to funding medical practices, dental offices, and healthcare facilities. Equipment, expansion, and working capital.",
    readTime: "13 min read",
    category: "Industry Guides",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    featured: false,
    slug: "medical-practice-funding-guide",
    publishDate: "2024-12-28"
  },
  {
    id: "merchant-cash-advance-guide",
    title: "Merchant Cash Advance: When It Makes Sense for Your Business",
    excerpt: "Understanding merchant cash advances, how they work, and when they're the right financing solution for your business needs.",
    readTime: "7 min read",
    category: "Alternative Financing",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    featured: false,
    slug: "merchant-cash-advance-guide",
    publishDate: "2024-12-25"
  }
];

const guideCategories = [
  "All Guides",
  "SBA Loans",
  "Industry Guides",
  "Credit & Finance",
  "Equipment Financing",
  "Business Growth",
  "Alternative Financing"
];

export default function GuidesPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Guides");

  // Filter guides based on search query and category
  const filteredGuides = useMemo(() => {
    let filtered = allGuides;
    
    // Filter by category
    if (selectedCategory !== "All Guides") {
      filtered = filtered.filter(guide => guide.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(guide => 
        guide.title.toLowerCase().includes(query) ||
        guide.excerpt.toLowerCase().includes(query) ||
        guide.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const featuredGuides = filteredGuides.filter(guide => guide.featured);
  const regularGuides = filteredGuides.filter(guide => !guide.featured);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handleGuideClick = (slug: string) => {
    setLocation(`/guides/${slug}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Business Funding Guides | Expert Insights | Lendura Capital"
        description="Expert business funding guides covering SBA loans, industry-specific financing, credit building, and growth strategies. Free resources from Brooklyn's trusted lenders."
        keywords="business funding guides, SBA loan guide, restaurant financing, business credit building, equipment financing guide, working capital strategies"
        canonical="/guides"
      />
      <Header />
      
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb" role="navigation">
            <Link 
              href="/"
              className="text-gray-500 hover:text-[#193a59] transition-colors"
              data-testid="breadcrumb-home"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            <span className="text-gray-900 font-medium">Resource Hub</span>
            <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            <span className="text-[#193a59] font-medium">Guides</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 bg-gradient-to-br from-[#193a59] to-[#285d8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Business Funding Guides
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Expert insights and step-by-step guides to help you secure the right financing for your business. From SBA loans to industry-specific funding strategies.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8" role="search">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="Search guides... (e.g., 'SBA loans', 'restaurant financing')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                  aria-label="Search business funding guides"
                  data-testid="input-search-guides"
                />
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>8+ Expert Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>$50M+ Funded</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Industry Expertise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                
                {/* Category Filter */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Filter by Category</h3>
                  <nav className="space-y-2" role="navigation" aria-label="Guide categories">
                    {guideCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#193a59] text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="font-medium">{category}</div>
                        <div className={`text-xs ${
                          selectedCategory === category ? 'text-gray-200' : 'text-gray-500'
                        }`}>
                          {category === "All Guides" 
                            ? `${allGuides.length} guides` 
                            : `${allGuides.filter(g => g.category === category).length} guides`}
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Apply CTA */}
                <div className="bg-[#193a59] rounded-lg p-6 text-white text-center">
                  <h3 className="font-bold text-lg mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-gray-200 mb-4">Get pre-approved in minutes</p>
                  <Button
                    onClick={handleApplyNow}
                    className="bg-white text-[#193a59] hover:bg-gray-100 font-bold w-full"
                    data-testid="sidebar-cta-apply"
                  >
                    Apply Now
                  </Button>
                  <div className="mt-3 pt-3 border-t border-gray-400">
                    <p className="text-xs text-gray-300">Questions? Call</p>
                    <a href="tel:3058347168" className="text-white font-bold hover:underline">
                      (305) 834-7168
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Popular Solutions</h3>
                  <nav className="space-y-2" role="navigation" aria-label="Popular financing solutions">
                    <Link
                      href="/solutions/sba-loans"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors p-2 hover:bg-gray-50 rounded"
                      data-testid="link-sba-loans"
                    >
                      → SBA Loan Solutions
                    </Link>
                    <Link
                      href="/solutions/term-loans"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors p-2 hover:bg-gray-50 rounded"
                      data-testid="link-term-loans"
                    >
                      → Term Loans
                    </Link>
                    <Link
                      href="/solutions/equipment-financing"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors p-2 hover:bg-gray-50 rounded"
                      data-testid="link-equipment-financing"
                    >
                      → Equipment Financing
                    </Link>
                    <Link
                      href="/solutions/lines-of-credit"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors p-2 hover:bg-gray-50 rounded"
                    >
                      → Lines of Credit
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Guides Section */}
              {featuredGuides.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Guides</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#193a59] to-[#285d8a] rounded-full"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredGuides.map((guide) => (
                      <article key={guide.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={guide.image}
                            alt={guide.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 text-xs font-medium bg-[#193a59] text-white rounded-full">
                              Featured
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                              {guide.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {guide.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#193a59] transition-colors">
                            {guide.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                            {guide.excerpt}
                          </p>
                          
                          <Button
                            onClick={() => handleGuideClick(guide.slug)}
                            className="w-full bg-[#193a59] hover:bg-[#2a4a6b] text-white"
                            data-testid={`button-read-${guide.id}`}
                          >
                            Read Guide
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Guides Section */}
              {regularGuides.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedCategory === "All Guides" ? "All Guides" : selectedCategory}
                    </h2>
                    <div className="text-sm text-gray-500">
                      {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {regularGuides.map((guide) => (
                      <article key={guide.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden group">
                        <div className="flex">
                          <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
                            <img 
                              src={guide.image}
                              alt={guide.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1 p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                {guide.category}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {guide.readTime}
                              </span>
                            </div>
                            
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#193a59] transition-colors">
                              {guide.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {guide.excerpt}
                            </p>
                            
                            <Button
                              onClick={() => handleGuideClick(guide.slug)}
                              variant="outline"
                              size="sm"
                              className="text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
                              data-testid={`button-guide-${guide.id}`}
                            >
                              Read Guide
                              <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No guides match your search for "${searchQuery}". Try different keywords or browse all categories.`
                      : `No guides found in the "${selectedCategory}" category.`}
                  </p>
                  {searchQuery ? (
                    <Button
                      onClick={() => setSearchQuery("")}
                      className="bg-[#193a59] hover:bg-[#2a4a6b] text-white mr-3"
                    >
                      Clear Search
                    </Button>
                  ) : null}
                  <Button
                    onClick={() => setSelectedCategory("All Guides")}
                    variant="outline"
                    className="text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
                  >
                    View All Guides
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Personalized Guidance?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our financing experts are here to help you choose the right funding solution for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleApplyNow}
              className="bg-[#193a59] hover:bg-[#2a4a6b] text-white px-8 py-3 text-lg"
              data-testid="cta-apply-now"
            >
              Apply for Funding
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-500">Or call us directly:</p>
              <a href="tel:3058347168" className="text-[#193a59] font-bold text-lg hover:underline">
                (305) 834-7168
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}