import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Search, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "small-business-funding-options-2025",
    title: "Complete Guide to Small Business Funding Options in 2025",
    excerpt: "Discover the most effective financing solutions for small businesses, from traditional term loans to alternative funding methods.",
    content: "Small business funding has evolved significantly in 2025, with new options emerging to meet diverse business needs...",
    author: "Marc Hoffman",
    publishDate: "2025-01-08",
    readTime: "8 min read",
    category: "Funding Guides",
    tags: ["Small Business", "Funding", "Term Loans", "SBA"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "sba-loans-qualification-requirements",
    title: "SBA Loan Qualification Requirements: What You Need to Know",
    excerpt: "Understanding SBA loan requirements can help you prepare a stronger application and increase your approval chances.",
    content: "SBA loans offer some of the most competitive rates and terms available to small businesses...",
    author: "Gabby Goodman",
    publishDate: "2025-01-07",
    readTime: "6 min read",
    category: "SBA Loans",
    tags: ["SBA", "Qualification", "Requirements", "Application"],
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "merchant-cash-advance-vs-term-loans",
    title: "Merchant Cash Advance vs. Term Loans: Which is Right for Your Business?",
    excerpt: "Compare the benefits and drawbacks of merchant cash advances versus traditional term loans to make the best financing decision.",
    content: "When facing a funding decision, business owners often find themselves choosing between merchant cash advances and term loans...",
    author: "Marc Hoffman",
    publishDate: "2025-01-06",
    readTime: "7 min read",
    category: "Comparison",
    tags: ["MCA", "Term Loans", "Comparison", "Business Funding"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "equipment-financing-benefits",
    title: "Equipment Financing: Preserve Cash Flow While Growing Your Business",
    excerpt: "Learn how equipment financing can help you acquire essential assets without depleting working capital.",
    content: "Equipment financing offers businesses a strategic way to acquire necessary equipment while preserving cash flow...",
    author: "Gabby Goodman",
    publishDate: "2025-01-05",
    readTime: "5 min read",
    category: "Equipment Financing",
    tags: ["Equipment", "Cash Flow", "Business Growth", "Assets"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "improve-business-credit-score",
    title: "5 Proven Strategies to Improve Your Business Credit Score",
    excerpt: "Build stronger business credit to qualify for better funding terms and lower interest rates.",
    content: "A strong business credit score opens doors to better financing options and more favorable terms...",
    author: "Marc Hoffman",
    publishDate: "2025-01-04",
    readTime: "6 min read",
    category: "Credit Building",
    tags: ["Credit Score", "Business Credit", "Financial Health", "Qualification"],
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  },
  {
    id: "restaurant-industry-funding-guide",
    title: "Restaurant Industry Funding: Navigating Seasonal Cash Flow Challenges",
    excerpt: "Specialized funding solutions for restaurants to handle seasonal fluctuations and expansion opportunities.",
    content: "The restaurant industry faces unique financial challenges, from seasonal fluctuations to equipment needs...",
    author: "Gabby Goodman",
    publishDate: "2025-01-03",
    readTime: "9 min read",
    category: "Industry Focus",
    tags: ["Restaurant", "Seasonal", "Cash Flow", "Industry Specific"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    featured: false
  }
];

const categories = ["All", "Funding Guides", "SBA Loans", "Comparison", "Equipment Financing", "Credit Building", "Industry Focus"];

export default function Blog() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleReadMore = (postId: string) => {
    setLocation(`/blog/${postId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-wider">
            Business Funding Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Expert insights, funding guides, and industry knowledge to help you make informed financing decisions for your business.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category 
                      ? "bg-[#85abe4] hover:bg-[#7396d8] text-white" 
                      : "text-white border-gray-300 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && selectedCategory === "All" && !searchTerm && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#85abe4' }}>
              Featured Article
            </h2>
            
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-[#85abe4] text-white">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(featuredPost.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleReadMore(featuredPost.id)}
                    className="bg-[#85abe4] hover:bg-[#7396d8] text-white px-8 py-3 text-lg font-semibold hover:scale-105 transform transition-all duration-200 hover:shadow-lg"
                  >
                    Read Full Article
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#85abe4' }}>
            {searchTerm ? `Search Results for "${searchTerm}"` : 
             selectedCategory !== "All" ? `${selectedCategory} Articles` : "Latest Articles"}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No articles found matching your criteria.</p>
              <Button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                variant="outline"
                className="text-[#85abe4] border-[#85abe4] hover:bg-[#85abe4] hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#85abe4] text-white">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 leading-tight hover:text-[#85abe4] transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-4 space-x-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs text-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={() => handleReadMore(post.id)}
                      variant="outline"
                      className="w-full text-[#85abe4] border-[#85abe4] hover:bg-[#85abe4] hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#85abe4' }}>
            Stay Informed
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest business funding insights and financing tips delivered to your inbox.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button 
              className="bg-[#85abe4] hover:bg-[#7396d8] text-white px-8 font-semibold hover:scale-105 transform transition-all duration-200"
            >
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}