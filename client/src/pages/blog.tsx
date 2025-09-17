import { useState, useMemo } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { Search, Clock, Tag, ChevronRight, Calendar, User, TrendingUp, Building2, CreditCard, FileText, Target, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

// Professional blog data with real business lending content
const allBlogPosts = [
  {
    id: "sba-loan-changes-2025",
    title: "Major SBA Loan Program Changes Coming in 2025",
    excerpt: "The Small Business Administration announces significant updates to loan programs, including increased lending limits and streamlined application processes.",
    readTime: "6 min read",
    category: "SBA Updates",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=250&fit=crop",
    featured: true,
    slug: "sba-loan-changes-2025",
    publishDate: "2025-01-18",
    author: "SBA Lending Team"
  },
  {
    id: "business-credit-score-tips",
    title: "5 Ways to Improve Your Business Credit Score Fast",
    excerpt: "Learn proven strategies to boost your business credit score and qualify for better financing terms. These tips can improve your score in 30-90 days.",
    readTime: "8 min read",
    category: "Credit Tips",
    image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=250&fit=crop",
    featured: true,
    slug: "business-credit-score-improvement",
    publishDate: "2025-01-16",
    author: "Credit Specialists"
  },
  {
    id: "restaurant-industry-outlook",
    title: "Restaurant Industry Financing Outlook for 2025",
    excerpt: "Analysis of current lending trends, challenges, and opportunities in the restaurant and food service industry for the coming year.",
    readTime: "10 min read",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    featured: true,
    slug: "restaurant-industry-outlook-2025",
    publishDate: "2025-01-14",
    author: "Industry Analysts"
  },
  {
    id: "equipment-financing-trends",
    title: "Equipment Financing Trends: What Business Owners Need to Know",
    excerpt: "Rising equipment costs and supply chain challenges are changing how businesses approach equipment financing. Here's what to expect.",
    readTime: "7 min read",
    category: "Equipment Financing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
    featured: false,
    slug: "equipment-financing-trends-2025",
    publishDate: "2025-01-12",
    author: "Equipment Finance Team"
  },
  {
    id: "working-capital-strategies",
    title: "Smart Working Capital Strategies for Growing Businesses",
    excerpt: "How to manage cash flow effectively while scaling your business. Expert tips on working capital optimization and funding sources.",
    readTime: "9 min read",
    category: "Business Growth",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    featured: false,
    slug: "working-capital-strategies-growth",
    publishDate: "2025-01-10",
    author: "Business Finance Team"
  },
  {
    id: "medical-practice-funding-trends",
    title: "Medical Practice Funding: 2025 Trends and Opportunities",
    excerpt: "Healthcare financing landscape continues to evolve. Discover new funding options and strategies for medical practices and healthcare facilities.",
    readTime: "11 min read",
    category: "Healthcare Finance",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
    featured: false,
    slug: "medical-practice-funding-trends",
    publishDate: "2025-01-08",
    author: "Healthcare Finance Team"
  },
  {
    id: "merchant-cash-advance-alternatives",
    title: "Beyond Merchant Cash Advances: Better Funding Alternatives",
    excerpt: "While MCAs can provide quick funding, explore these alternative financing options that may offer better terms for your business.",
    readTime: "8 min read",
    category: "Alternative Financing",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    featured: false,
    slug: "merchant-cash-advance-alternatives",
    publishDate: "2025-01-06",
    author: "Funding Specialists"
  },
  {
    id: "construction-business-financing",
    title: "Construction Business Financing: Navigating Seasonal Cash Flow",
    excerpt: "Construction businesses face unique cash flow challenges. Learn financing strategies to manage seasonal fluctuations and project-based revenue.",
    readTime: "10 min read",
    category: "Construction Finance",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
    featured: false,
    slug: "construction-business-financing-tips",
    publishDate: "2025-01-04",
    author: "Construction Finance Team"
  }
];

const blogCategories = [
  "All Posts",
  "SBA Updates",
  "Credit Tips",
  "Industry Insights",
  "Equipment Financing",
  "Business Growth",
  "Healthcare Finance",
  "Alternative Financing",
  "Construction Finance"
];

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  // Filter blog posts based on search query and category
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts;
    
    // Filter by category
    if (selectedCategory !== "All Posts") {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleApplyNow = () => {
    setLocation('/apply-now');
  };

  const handlePostClick = (slug: string) => {
    setLocation(`/blog/${slug}`);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Business Funding Blog | Industry News & Tips | Lendura Capital"
        description="Stay updated with the latest business funding news, SBA loan updates, industry insights, and expert tips from Lendura Capital's finance professionals."
        keywords="business funding blog, SBA loan news, business credit tips, industry financing trends, equipment financing news, working capital strategies"
        canonical="/blog"
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
            <span className="text-[#193a59] font-medium">Blog</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 bg-gradient-to-br from-[#193a59] to-[#285d8a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Business Funding Blog
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Stay informed with the latest business funding news, industry insights, and expert tips from our finance professionals.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8" role="search">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
                <Input
                  type="text"
                  placeholder="Search articles... (e.g., 'SBA loans', 'credit tips')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 rounded-lg bg-white text-gray-900 placeholder-gray-500"
                  aria-label="Search blog articles"
                  data-testid="input-search-blog"
                />
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>Industry Insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Expert Analysis</span>
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
                  <div className="flex items-center mb-4">
                    <Filter className="w-5 h-5 text-[#193a59] mr-2" />
                    <h3 className="font-bold text-gray-900 text-lg">Filter by Category</h3>
                  </div>
                  <nav className="space-y-2" role="navigation" aria-label="Blog categories">
                    {blogCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-[#193a59] text-white'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        data-testid={`button-category-${category.toLowerCase().replace(/\\s+/g, '-')}`}
                      >
                        <div className="font-medium">{category}</div>
                        <div className={`text-xs ${
                          selectedCategory === category ? 'text-gray-200' : 'text-gray-500'
                        }`}>
                          {category === "All Posts" 
                            ? `${allBlogPosts.length} articles` 
                            : `${allBlogPosts.filter(p => p.category === category).length} articles`}
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-[#193a59] rounded-lg p-6 text-white text-center">
                  <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-200 mb-4">Get the latest funding news and tips delivered to your inbox</p>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="mb-3 bg-white text-gray-900"
                  />
                  <Button className="bg-white text-[#193a59] hover:bg-gray-100 font-bold w-full">
                    Subscribe
                  </Button>
                </div>

                {/* Quick Apply CTA */}
                <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Need Funding?</h3>
                  <p className="text-sm text-gray-600 mb-4">Get pre-approved in minutes</p>
                  <Button
                    onClick={handleApplyNow}
                    className="bg-[#193a59] hover:bg-[#2a4a6b] text-white font-bold w-full"
                    data-testid="sidebar-cta-apply"
                  >
                    Apply Now
                  </Button>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">Questions? Call</p>
                    <a href="tel:3058347168" className="text-[#193a59] font-bold hover:underline">
                      (305) 834-7168
                    </a>
                  </div>
                </div>

                {/* Popular Articles */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Popular Articles</h3>
                  <nav className="space-y-3" role="navigation" aria-label="Popular articles">
                    <Link
                      href="/blog/sba-loan-changes-2025"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors leading-relaxed"
                    >
                      → SBA Loan Program Changes in 2025
                    </Link>
                    <Link
                      href="/blog/business-credit-score-improvement"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors leading-relaxed"
                    >
                      → 5 Ways to Improve Business Credit
                    </Link>
                    <Link
                      href="/blog/restaurant-industry-outlook-2025"
                      className="block text-sm text-gray-600 hover:text-[#193a59] transition-colors leading-relaxed"
                    >
                      → Restaurant Industry Outlook
                    </Link>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Articles Section */}
              {featuredPosts.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#193a59] to-[#285d8a] rounded-full"></div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredPosts.map((post) => (
                      <article key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={post.image}
                            alt={post.title}
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
                              {post.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readTime}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#193a59] transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(post.publishDate)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => handlePostClick(post.slug)}
                            className="w-full bg-[#193a59] hover:bg-[#2a4a6b] text-white"
                            data-testid={`button-read-${post.id}`}
                          >
                            Read Article
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles Section */}
              {regularPosts.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {selectedCategory === "All Posts" ? "Latest Articles" : selectedCategory}
                    </h2>
                    <div className="text-sm text-gray-500">
                      {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {regularPosts.map((post) => (
                      <article key={post.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 overflow-hidden group">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-64 md:h-48 aspect-video md:aspect-auto relative overflow-hidden flex-shrink-0">
                            <img 
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          
                          <div className="flex-1 p-6 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-3">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                  {post.category}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {post.readTime}
                                </span>
                              </div>
                              
                              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#193a59] transition-colors">
                                {post.title}
                              </h3>
                              
                              <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  <span>{formatDate(post.publishDate)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  <span>{post.author}</span>
                                </div>
                              </div>
                              
                              <Button
                                onClick={() => handlePostClick(post.slug)}
                                variant="outline"
                                size="sm"
                                className="text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
                                data-testid={`button-post-${post.id}`}
                              >
                                Read More
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No articles match your search for "${searchQuery}". Try different keywords or browse all categories.`
                      : `No articles found in the "${selectedCategory}" category.`}
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
                    onClick={() => setSelectedCategory("All Posts")}
                    variant="outline"
                    className="text-[#193a59] border-[#193a59] hover:bg-[#193a59] hover:text-white"
                  >
                    View All Articles
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
            Ready to Put These Insights to Work?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our finance experts are here to help you apply these strategies to your business funding needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleApplyNow}
              className="bg-[#193a59] hover:bg-[#2a4a6b] text-white px-8 py-3 text-lg"
              data-testid="cta-apply-now"
            >
              Get Funding Today
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-500">Speak with an expert:</p>
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