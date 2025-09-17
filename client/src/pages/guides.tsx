import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { Search, BookOpen, TrendingUp, Users, FileText, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

// Guide categories data
const guideCategories = [
  {
    id: "sba-loans",
    title: "SBA Loan Guides",
    description: "Complete guides to SBA financing programs",
    icon: "🏛️",
    guides: [
      "Complete SBA Loan Application Guide 2025",
      "SBA 7(a) vs 504 Loans: Which is Right for You?",
      "SBA Loan Requirements and Eligibility",
      "How to Improve SBA Loan Approval Chances"
    ]
  },
  {
    id: "by-industry",
    title: "Industry-Specific Guides", 
    description: "Tailored financing advice by business type",
    icon: "🏢",
    guides: [
      "Restaurant Financing: From Startup to Expansion",
      "Medical Practice Funding Guide",
      "Construction Business Loan Strategies",
      "Retail Store Financing Options"
    ]
  },
  {
    id: "business-growth",
    title: "Business Growth Strategies",
    description: "Scale your business with the right funding",
    icon: "📈",
    guides: [
      "Equipment Financing vs Leasing Guide",
      "Working Capital Management for Growth",
      "How to Use Business Credit Lines Effectively",
      "Debt Consolidation for Business Owners"
    ]
  },
  {
    id: "credit-preparation",
    title: "Credit & Application Prep",
    description: "Prepare your business for funding success",
    icon: "📊",
    guides: [
      "Building Business Credit from Scratch", 
      "Financial Documents Lenders Require",
      "How to Read and Improve Your Business Credit Score",
      "Creating a Winning Business Plan for Lenders"
    ]
  }
];

const featuredGuides = [
  {
    id: "ultimate-sba-guide",
    title: "The Ultimate Guide to SBA Loans in 2025",
    excerpt: "Everything you need to know about SBA financing, from application to approval. Get step-by-step instructions and insider tips.",
    readTime: "15 min read",
    category: "SBA Loans",
    featured: true
  },
  {
    id: "restaurant-funding", 
    title: "Restaurant Financing: Complete Guide to Funding Your Food Business",
    excerpt: "Discover the best financing options for restaurants, from equipment loans to working capital solutions.",
    readTime: "12 min read",
    category: "Industry Guides",
    featured: true
  },
  {
    id: "business-credit-building",
    title: "Building Business Credit: A Step-by-Step Blueprint",
    excerpt: "Learn how to establish and build business credit that will help you secure better financing terms.",
    readTime: "10 min read", 
    category: "Credit Preparation",
    featured: true
  }
];

export default function GuidesPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter guides and categories based on search query
  const filteredFeaturedGuides = useMemo(() => {
    if (!searchQuery.trim()) return featuredGuides;
    const query = searchQuery.toLowerCase();
    return featuredGuides.filter(guide => 
      guide.title.toLowerCase().includes(query) ||
      guide.excerpt.toLowerCase().includes(query) ||
      guide.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredGuideCategories = useMemo(() => {
    if (!searchQuery.trim()) return guideCategories;
    const query = searchQuery.toLowerCase();
    return guideCategories.map(category => ({
      ...category,
      guides: category.guides.filter(guide => 
        guide.toLowerCase().includes(query) ||
        category.title.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
      )
    })).filter(category => 
      category.guides.length > 0 ||
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the useMemo filters above
  };

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handleGuideClick = (guideId: string) => {
    // For now, scroll to top and show coming soon - could link to actual guide pages later
    window.scrollTo(0, 0);
    console.log(`Guide clicked: ${guideId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    // For now, scroll to category section - could link to category pages later
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
      <section className="pt-12 pb-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Business Funding Guides
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert insights and step-by-step guides to help you secure the right financing for your business. From SBA loans to industry-specific funding strategies.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8" role="search">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="Search guides... (e.g., 'SBA loans', 'restaurant financing', 'business credit')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-[#193a59] focus:ring-[#193a59]"
                  aria-label="Search business funding guides"
                  data-testid="input-search-guides"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#193a59] hover:bg-[#2a4a6b] px-6"
                  data-testid="button-search-guides"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#193a59]" />
                <span>25+ Expert Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#193a59]" />
                <span>500+ Businesses Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#193a59]" />
                <span>$50M+ in Funding Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                
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

                {/* Category Navigation */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Guide Categories</h3>
                  <nav className="space-y-2" role="navigation" aria-label="Guide categories">
                    {filteredGuideCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                        data-testid={`button-category-${category.id}`}
                        aria-label={`View ${category.title} guides`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xl" aria-hidden="true">{category.icon}</span>
                            <div>
                              <div className="font-medium text-gray-900 group-hover:text-[#193a59]">
                                {category.title}
                              </div>
                              <div className="text-xs text-gray-500">
                                {category.guides.length} guides
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#193a59]" aria-hidden="true" />
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Links */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Popular Topics</h3>
                  <nav className="space-y-2" role="navigation" aria-label="Popular financing topics">
                    <Link
                      href="/solutions/sba-loans"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors"
                      data-testid="link-sba-loans"
                    >
                      → SBA Loan Solutions
                    </Link>
                    <Link
                      href="/industries/restaurant-food-service"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors"
                      data-testid="link-restaurant-financing"
                    >
                      → Restaurant Financing
                    </Link>
                    <Link
                      href="/solutions/equipment-financing"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors"
                      data-testid="link-equipment-financing"
                    >
                      → Equipment Financing
                    </Link>
                    <Link
                      href="/industries/medical-healthcare"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors"
                      data-testid="link-medical-loans"
                    >
                      → Medical Practice Loans
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              
              {/* Featured Guides */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Guides</h2>
                {filteredFeaturedGuides.length === 0 && searchQuery ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg mb-4">No featured guides found for "{searchQuery}"</p>
                    <p className="text-sm text-gray-400">Try searching for terms like "SBA", "restaurant", or "credit"</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredFeaturedGuides.map((guide) => (
                      <article key={guide.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <span className="inline-block bg-[#193a59] text-white text-xs px-3 py-1 rounded-full font-medium">
                            {guide.category}
                          </span>
                          <span className="text-sm text-gray-500">{guide.readTime}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-[#193a59] cursor-pointer">
                          {guide.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {guide.excerpt}
                        </p>
                        
                        <Button
                          variant="outline"
                          className="border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white"
                          onClick={() => handleGuideClick(guide.id)}
                          data-testid={`button-read-guide-${guide.id}`}
                        >
                          Read Guide
                        </Button>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* Guide Categories Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Guide Categories</h2>
                {filteredGuideCategories.length === 0 && searchQuery ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg mb-4">No categories found for "{searchQuery}"</p>
                    <p className="text-sm text-gray-400">Try searching for broader terms or clear your search to see all categories</p>
                    <Button 
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="mt-4 border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white"
                      data-testid="button-clear-search"
                    >
                      Clear Search
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredGuideCategories.map((category) => (
                      <article key={category.id} id={`category-${category.id}`} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-3xl" aria-hidden="true">{category.icon}</div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                            <p className="text-gray-600 text-sm">{category.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-6" role="list" aria-label={`${category.title} guides`}>
                          {category.guides.map((guide, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-gray-600" role="listitem">
                              <FileText className="w-4 h-4 text-[#193a59]" aria-hidden="true" />
                              <button 
                                onClick={() => handleGuideClick(`${category.id}-${index}`)}
                                className="hover:text-[#193a59] cursor-pointer text-left"
                                data-testid={`button-guide-${category.id}-${index}`}
                              >
                                {guide}
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <Button
                          variant="outline" 
                          className="w-full border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white"
                          onClick={() => handleCategoryClick(category.id)}
                          data-testid={`button-view-all-${category.id}`}
                          aria-label={`View all ${category.guides.length} guides in ${category.title}`}
                        >
                          View All {category.guides.length} Guides
                        </Button>
                      </article>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Section */}
              <section className="bg-gradient-to-r from-[#193a59] to-[#2a4a6b] rounded-lg p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
                  Our funding experts are here to help you find the perfect financing solution for your business needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleApplyNow}
                    className="bg-white text-[#193a59] hover:bg-gray-100 font-bold px-8 py-3"
                    data-testid="button-cta-apply-now"
                  >
                    Get Pre-Approved Now
                  </Button>
                  <a
                    href="tel:3058347168"
                    className="flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#193a59] font-bold px-8 py-3 rounded-lg transition-all duration-300"
                    data-testid="link-cta-phone"
                    aria-label="Call Lendura Capital at (305) 834-7168"
                  >
                    Call (305) 834-7168
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}