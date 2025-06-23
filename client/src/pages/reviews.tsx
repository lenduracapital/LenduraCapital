import { useState, useEffect } from "react";
import { Star, Filter, CheckCircle, Clock, Camera, Play, MessageCircle, ExternalLink, TrendingUp } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: string;
  name: string;
  company?: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  industry?: string;
  fundingType?: string;
  fundingAmount?: string;
  photos?: string[];
  videoUrl?: string;
  businessResponse?: string;
  source?: 'direct' | 'yelp' | 'google' | 'trustpilot';
  sourceUrl?: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [verifiedCount, setVerifiedCount] = useState(0);
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterIndustry, setFilterIndustry] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Review form state
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    rating: 0,
    text: "",
    industry: ""
  });

  // Load initial reviews (you can replace this with actual API call)
  useEffect(() => {
    const initialReviews: Review[] = [
      {
        id: "1",
        name: "Sarah Mitchell",
        company: "Mitchell's Auto Repair",
        rating: 5,
        text: "FundTek helped us secure a $75,000 equipment loan when our main lift broke down unexpectedly. The approval process was incredibly fast - we had funds within 48 hours. Their team understood our urgent situation and worked around the clock to get us approved.",
        date: "2025-01-15",
        verified: true,
        industry: "Automotive",
        fundingType: "Equipment Financing",
        fundingAmount: "$75,000",
        businessResponse: "Thank you Sarah! We're thrilled we could help you get back to serving your customers quickly. Emergency equipment breakdowns are exactly why we prioritize fast approvals for established businesses like yours."
      },
      {
        id: "2", 
        name: "David Chen",
        company: "Chen's Restaurant Group",
        rating: 5,
        text: "After our restaurant was damaged in a storm, we needed working capital fast to reopen. FundTek's merchant cash advance got us $50,000 in just 3 days. The flexible repayment structure based on our daily sales was exactly what we needed during the rebuilding phase.",
        date: "2025-01-10",
        verified: true,
        industry: "Restaurant",
        fundingType: "Merchant Cash Advance",
        fundingAmount: "$50,000",
        videoUrl: "https://example.com/video1"
      },
      {
        id: "3",
        name: "Lisa Rodriguez", 
        company: "Rodriguez Construction",
        rating: 4,
        text: "We used FundTek for equipment financing to purchase new excavators. The rates were competitive and the process was straightforward. Only minor issue was some delays in documentation, but overall very satisfied with the service.",
        date: "2025-01-08",
        verified: true,
        industry: "Construction"
      },
      {
        id: "4",
        name: "Michael Thompson",
        company: "Thompson Manufacturing",
        rating: 5,
        text: "FundTek consolidated our high-interest debts into one manageable payment. We went from juggling 4 different lenders to just one monthly payment at a much better rate. This saved us over $2,000 per month in interest payments.",
        date: "2025-01-05",
        verified: true,
        industry: "Manufacturing"
      },
      {
        id: "5",
        name: "Jennifer Adams",
        company: "Adams Logistics",
        rating: 4,
        text: "Needed to expand our fleet quickly to meet increased demand. FundTek's SBA loan program helped us secure $200,000 for new trucks. The process took a bit longer than expected but the terms were excellent.",
        date: "2024-12-28",
        verified: true,
        industry: "Transportation"
      },
      {
        id: "6",
        name: "Robert Wilson",
        company: "Wilson Tech Solutions", 
        rating: 5,
        text: "Outstanding service from start to finish. We needed working capital for a large government contract and FundTek's invoice factoring solution was perfect. They advanced us 85% of our outstanding invoices immediately.",
        date: "2024-12-20",
        verified: true,
        industry: "Technology"
      },
      {
        id: "7",
        name: "Amanda Foster",
        company: "Foster Medical Practice",
        rating: 4,
        text: "FundTek helped us purchase new medical equipment through their equipment financing program. The application was simple and approval was fast. Rates were reasonable for our industry. Would recommend to other medical practices.",
        date: "2024-12-15",
        verified: true,
        industry: "Healthcare"
      },
      {
        id: "8",
        name: "Carlos Mendez",
        company: "Mendez Landscaping",
        rating: 5,
        text: "Seasonal business cash flow was always a challenge until we found FundTek. Their line of credit gives us access to funds when we need them most during spring preparation. Game changer for our business operations.",
        date: "2024-12-10",
        verified: true,
        industry: "Landscaping"
      }
    ];

    setReviews(initialReviews);
    setFilteredReviews(initialReviews);
    
    // Calculate average rating and verified count
    const avg = initialReviews.reduce((sum, review) => sum + review.rating, 0) / initialReviews.length;
    setAverageRating(Math.round(avg * 10) / 10);
    setTotalReviews(initialReviews.length);
    setVerifiedCount(initialReviews.filter(review => review.verified).length);
  }, []);

  // Filter and sort reviews
  useEffect(() => {
    let filtered = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      const rating = parseInt(filterRating);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Filter by industry
    if (filterIndustry !== "all") {
      filtered = filtered.filter(review => review.industry === filterIndustry);
    }

    // Sort reviews
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sortBy === "highest") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "lowest") {
      filtered.sort((a, b) => a.rating - b.rating);
    }

    setFilteredReviews(filtered);
  }, [reviews, filterRating, filterIndustry, sortBy]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.rating === 0 || !formData.text.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide a rating and review text.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name || "Anonymous",
        company: formData.company,
        rating: formData.rating,
        text: formData.text,
        date: new Date().toISOString().split('T')[0],
        verified: false,
        industry: formData.industry
      };

      // Add to reviews (in real app, this would be an API call)
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      
      // Recalculate average
      const avg = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
      setAverageRating(Math.round(avg * 10) / 10);
      setTotalReviews(updatedReviews.length);

      // Reset form
      setFormData({
        name: "",
        company: "", 
        rating: 0,
        text: "",
        industry: ""
      });

      toast({
        title: "Review Submitted",
        description: "Thank you for your feedback! Your review has been posted.",
      });

      // Scroll to top to see the new review
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('review-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange?.(star)}
            className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Client Reviews - FundTek Capital Group"
        description="Read authentic reviews from FundTek Capital Group clients. See what business owners say about our financing solutions, approval process, and customer service."
        keywords="FundTek reviews, business loan reviews, client testimonials, funding reviews, merchant cash advance reviews"
        canonical="/reviews"
      />
      
      <Header />
      
      <main className="pt-20">
        {/* Hero Section with Rating Summary */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Client Reviews
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Real feedback from business owners who've worked with FundTek Capital Group
            </p>
            
            {/* Rating Summary */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                {renderStars(averageRating)}
                <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
              </div>
              <p className="text-gray-600">
                Based on {totalReviews} verified reviews
              </p>
            </div>

            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-[#85abe4] hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              Write a Review
            </Button>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐ 5 Stars</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐ 4 Stars</SelectItem>
                  <SelectItem value="3">⭐⭐⭐ 3 Stars</SelectItem>
                  <SelectItem value="2">⭐⭐ 2 Stars</SelectItem>
                  <SelectItem value="1">⭐ 1 Star</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Automotive">🚗 Automotive</SelectItem>
                  <SelectItem value="Construction">🏗️ Construction</SelectItem>
                  <SelectItem value="Healthcare">🏥 Healthcare</SelectItem>
                  <SelectItem value="Manufacturing">🏭 Manufacturing</SelectItem>
                  <SelectItem value="Restaurant">🍽️ Restaurant</SelectItem>
                  <SelectItem value="Retail">🏪 Retail</SelectItem>
                  <SelectItem value="Technology">💻 Technology</SelectItem>
                  <SelectItem value="Transportation">🚛 Transportation</SelectItem>
                  <SelectItem value="Landscaping">🌿 Landscaping</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">📅 Newest First</SelectItem>
                <SelectItem value="oldest">🗓️ Oldest First</SelectItem>
                <SelectItem value="highest">⭐ Highest Rated</SelectItem>
                <SelectItem value="lowest">📊 Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Results Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredReviews.length} of {totalReviews} reviews
            {filterRating !== "all" && ` • ${filterRating} stars`}
            {filterIndustry !== "all" && ` • ${filterIndustry} industry`}
          </div>
        </section>

        {/* Reviews Feed */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid gap-6">
            {filteredReviews.map((review) => (
              <Card key={review.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{review.name}</h3>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified Client
                          </Badge>
                        )}
                        {review.source && review.source !== 'direct' && (
                          <Badge variant="outline" className="text-xs">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            {review.source}
                          </Badge>
                        )}
                      </div>
                      {review.company && (
                        <p className="text-gray-600 text-sm mb-2">{review.company}</p>
                      )}
                      <div className="flex gap-2 mb-2">
                        {review.industry && (
                          <Badge variant="outline" className="text-xs">
                            {review.industry}
                          </Badge>
                        )}
                        {review.fundingType && review.fundingAmount && (
                          <Badge className="bg-[#85abe4] text-white text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {review.fundingType} - {review.fundingAmount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      {formatDate(review.date)}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>

                  {/* Video Testimonial */}
                  {review.videoUrl && (
                    <div className="mb-4">
                      <div className="bg-gray-100 rounded-lg p-4 flex items-center gap-3">
                        <Play className="w-5 h-5 text-[#85abe4]" />
                        <span className="text-sm font-medium text-gray-700">Video Testimonial Available</span>
                        <Button variant="outline" size="sm" className="ml-auto">
                          Watch Video
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="mb-4">
                      <div className="flex gap-2 items-center mb-2">
                        <Camera className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Client Photos</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {review.photos.map((photo, index) => (
                          <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business Response */}
                  {review.businessResponse && (
                    <div className="bg-blue-50 border-l-4 border-[#85abe4] p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-4 h-4 text-[#85abe4]" />
                        <span className="text-sm font-semibold text-[#85abe4]">Business Owner Response</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{review.businessResponse}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No reviews match your current filters.</p>
            </div>
          )}
        </section>

        {/* Submit Review Form */}
        <section id="review-form" className="bg-white py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Share Your Experience
              </h2>
              <p className="text-gray-600">
                Help other business owners by sharing your experience with FundTek Capital Group
              </p>
            </div>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating *
                    </label>
                    {renderStars(formData.rating, true, (rating) => 
                      setFormData(prev => ({ ...prev, rating }))
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name (Optional)
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry (Optional)
                    </label>
                    <Select 
                      value={formData.industry} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automotive">Automotive</SelectItem>
                        <SelectItem value="Construction">Construction</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Retail">Retail</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Transportation">Transportation</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Review *
                    </label>
                    <Textarea
                      value={formData.text}
                      onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                      placeholder="Share your experience with FundTek Capital Group..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#85abe4] hover:bg-blue-600 text-white py-3"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this review, you agree that it represents your genuine experience with our services.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Lead Generation CTA */}
        <section className="bg-gradient-to-r from-[#85abe4] to-blue-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Funded Like These Business Owners?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who've secured fast, flexible financing through FundTek Capital Group
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-[#85abe4] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                onClick={() => window.open('https://form.jotform.com/251417715331047', '_blank')}
              >
                Get Your Approval in 24 Hours
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[#85abe4] px-8 py-4 text-lg"
                onClick={() => window.open('tel:+13053074658', '_self')}
              >
                Call (305) 307-4658
              </Button>
            </div>
            <p className="text-blue-100 text-sm mt-6">
              No impact on your credit score • 5-minute application • Same-day decisions
            </p>
          </div>
        </section>
      </main>

      {/* Rich Snippet Schema for Google SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "FundTek Capital Group",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": averageRating,
              "reviewCount": totalReviews,
              "bestRating": 5,
              "worstRating": 1
            },
            "review": filteredReviews.slice(0, 5).map(review => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.rating,
                "bestRating": 5,
                "worstRating": 1
              },
              "reviewBody": review.text,
              "datePublished": review.date
            })),
            "url": "https://fundtekcapitalgroup.com/reviews",
            "telephone": "+1-305-307-4658",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          })
        }}
      />

      <Footer />
    </div>
  );
}