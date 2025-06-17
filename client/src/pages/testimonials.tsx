import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const testimonials = [
  {
    id: 1,
    name: "James Martinez",
    title: "Manufacturing Company Owner",
    company: "Martinez Manufacturing LLC",
    rating: 5,
    text: "FundTek's term loan helped us purchase the equipment we needed to expand our manufacturing capacity. The fixed monthly payments made budgeting easy, and we were able to increase our revenue by 40% within the first year.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    solution: "Term Loans"
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    title: "Restaurant Owner",
    company: "La Casa Restaurant",
    rating: 5,
    text: "FundTek Capital Group helped us get the funding we needed to get some upgrades done. With low rates we were able to borrow and pay back overtime and noticed how we got more customers as a result. Loan paid for itself in 1-2 years!",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    solution: "Equipment Financing"
  },
  {
    id: 3,
    name: "David Chen",
    title: "Construction Company Owner",
    company: "Chen Construction Inc.",
    rating: 5,
    text: "The line of credit from FundTek has been a game-changer for our seasonal business. We can draw funds when we need them for materials and labor, and only pay interest on what we use. Perfect for managing cash flow.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    solution: "Lines of Credit"
  },
  {
    id: 4,
    name: "Sarah Johnson",
    title: "Medical Practice Owner",
    company: "Johnson Family Dentistry",
    rating: 5,
    text: "FundTek understood our unique needs as a medical practice. The invoice factoring solution helped us maintain steady cash flow while waiting for insurance payments. Highly professional service.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    solution: "Invoice Factoring"
  },
  {
    id: 5,
    name: "Michael Thompson",
    title: "Tech Startup Founder",
    company: "TechFlow Solutions",
    rating: 5,
    text: "As a growing tech company, we needed flexible funding that could scale with our business. FundTek's revenue-based financing was perfect - payments adjust with our monthly revenue.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    solution: "Revenue-Based Financing"
  },
  {
    id: 6,
    name: "Lisa Williams",
    title: "Retail Store Owner",
    company: "Williams Boutique",
    rating: 5,
    text: "The merchant cash advance from FundTek helped us stock up for the holiday season. Fast approval and funding within 24 hours. Our sales increased by 60% that quarter!",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    solution: "Merchant Cash Advance"
  }
];

export default function TestimonialsPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [, setLocation] = useLocation();

  const handleBackToHome = () => {
    setLocation("/");
  };

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-[--bg-primary] text-[--text-primary]">
      <Header />
      
      {/* Breadcrumb Navigation */}
      <section className="pt-24 pb-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <button onClick={handleBackToHome} className="hover:text-[--primary]">Home</button>
            <span>›</span>
            <span className="text-gray-900 font-medium">Testimonials</span>
          </nav>
          <Button 
            onClick={handleBackToHome}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[--primary] to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client Success Stories
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Hear from real business owners who have transformed their companies with FundTek's financing solutions
          </p>
        </div>
      </section>

      {/* Featured Testimonial Slideshow */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">
                  What our clients are saying about our solutions
                </h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-white" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-white" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8">
                Our Financial Solutions and Business Services support our clients as they stay competitive and grow to keep our nation's economy alive.
              </p>
              
              <div className="bg-gray-800 p-8 rounded-lg">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {currentData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-lg">{currentData.name}</p>
                    <p className="text-gray-400">{currentData.title}</p>
                    <p className="text-gray-500 text-sm">{currentData.company}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(currentData.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic text-lg leading-relaxed mb-4">
                  "{currentData.text}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 rounded-full" style={{ backgroundColor: '#85abe4', color: 'white' }}>
                    {currentData.solution}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {currentTestimonial + 1} of {testimonials.length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={currentData.image}
                alt={`${currentData.name} business`}
                className="w-full h-96 object-cover rounded-lg transition-opacity duration-500"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded">
                <p className="text-sm font-medium">{currentData.company}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of satisfied business owners who chose FundTek
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold mr-3">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{testimonial.text.length > 120 ? testimonial.text.substring(0, 120) + '...' : testimonial.text}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#85abe4', color: 'white' }}>
                    {testimonial.solution}
                  </span>
                  <button 
                    onClick={() => setCurrentTestimonial(index)}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Read Full Story
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gray-50 p-8 rounded-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Write Your Success Story?</h3>
              <p className="text-gray-600 mb-6">
                Join these successful business owners and get the funding you need to grow your business.
              </p>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4" style={{ borderLeftColor: '#85abe4' }}>
                  <p className="text-sm text-gray-600">Call us directly:</p>
                  <p className="text-2xl font-bold text-gray-900">(305) 307-4658</p>
                </div>
                <Button 
                  onClick={handleApplyNow}
                  style={{ backgroundColor: '#85abe4' }}
                  className="text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90"
                >
                  Get Pre-Qualified Today
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}