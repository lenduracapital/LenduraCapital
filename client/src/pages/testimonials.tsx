import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Quote } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";

const testimonials = [
  {
    id: 1,
    name: "Marc Chen",
    title: "Auto Shop Owner",
    company: "Chen's Auto Repair",
    rating: 5,
    text: "When our main diagnostic machine broke down, we needed quick funding to replace it. Lendura Capital helped us get approved within two days. The application process was straightforward and the team was responsive.",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    solution: "Equipment Financing"
  },
  {
    id: 2,
    name: "Gabby Rodriguez",
    title: "Restaurant Owner",
    company: "La Casa Restaurant",
    rating: 5,
    text: "We needed to upgrade our kitchen equipment before the busy season. Lendura Capital's team walked us through the options and helped us find financing that worked with our cash flow. The approval process was much faster than our bank.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    solution: "Equipment Financing"
  },
  {
    id: 3,
    name: "Eric Chen",
    title: "Construction Company Owner",
    company: "Chen Construction Inc.",
    rating: 5,
    text: "The line of credit from Lendura Capital has been a game-changer for our seasonal business. We can draw funds when we need them for materials and labor, and only pay interest on what we use. Perfect for managing cash flow.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    solution: "Lines of Credit"
  },
  {
    id: 4,
    name: "James Johnson",
    title: "Medical Practice Owner",
    company: "Johnson Family Dentistry",
    rating: 5,
    text: "Lendura Capital understood our unique needs as a medical practice. The invoice factoring solution helped us maintain steady cash flow while waiting for insurance payments. Highly professional service.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
    solution: "Invoice Factoring"
  },
  {
    id: 5,
    name: "Daniel Thompson",
    title: "Tech Startup Founder",
    company: "TechFlow Solutions",
    rating: 5,
    text: "As a growing tech company, we needed flexible funding that could scale with our business. Lendura Capital's revenue-based financing was perfect - payments adjust with our monthly revenue.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    solution: "Revenue-Based Financing"
  },
  {
    id: 6,
    name: "Ava Williams",
    title: "Retail Store Owner",
    company: "Williams Boutique",
    rating: 5,
    text: "The merchant cash advance from Lendura Capital helped us stock up for the holiday season. Fast approval and funding within 24 hours. Our sales increased by 60% that quarter!",
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
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  // Auto-advance carousel every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentData = testimonials[currentTestimonial];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      {/* Hero Section with Skyline Background */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop')"
          }}
        />

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">

          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Real Stories, Real Results
          </h1>
          <p className="text-xl text-white max-w-4xl mx-auto mb-12" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Discover how Lendura Capital has empowered businesses across industries to achieve their growth goals with tailored financing solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleApplyNow}
              style={{ backgroundColor: '#193a59' }}
              className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90"
            >
              Start Your Success Story
            </Button>
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Testimonial Slideshow */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Client Success Spotlight
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real businesses, real growth, real results with Lendura Capital
            </p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: '#193a59' }}></div>
            
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <div className="flex items-center justify-between mb-8">
                  <Quote className="h-12 w-12" style={{ color: '#193a59' }} />
                </div>
                
                <blockquote className="text-2xl font-light text-gray-800 leading-relaxed mb-8 italic">
                  "{currentData.text}"
                </blockquote>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4" style={{ backgroundColor: '#193a59' }}>
                    {currentData.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold text-lg">{currentData.name}</p>
                    <p className="text-gray-600">{currentData.title}</p>
                    <p className="text-gray-500 text-sm">{currentData.company}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(currentData.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <span className="text-sm px-4 py-2 rounded-full font-medium" style={{ backgroundColor: '#193a59', color: 'white' }}>
                    {currentData.solution}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {currentTestimonial + 1} of {testimonials.length}
                  </span>
                </div>
              </div>
              
              <div className="relative lg:min-h-[600px]">
                <img 
                  src={currentData.image}
                  alt={`${currentData.name} business`}
                  className="w-full h-full object-cover transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-lg font-semibold">{currentData.company}</p>
                  <p className="text-sm opacity-90">Industry Success Story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of satisfied business owners who chose Lendura Capital for their financing needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4" style={{ backgroundColor: '#193a59' }}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.title}</p>
                      <p className="text-gray-500 text-xs">{testimonial.company}</p>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Quote className="h-8 w-8 text-gray-300 mb-4" />
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.text.length > 150 ? testimonial.text.substring(0, 150) + '...' : testimonial.text}"
                  </p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: '#193a59', color: 'white' }}>
                      {testimonial.solution}
                    </span>
                    <button 
                      onClick={() => setCurrentTestimonial(index)}
                      className="text-sm font-medium group-hover:text-[#193a59] transition-colors"
                      style={{ color: '#193a59' }}
                    >
                      Read Full Story →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#193a59]/20 to-transparent"></div>
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6">Ready to Write Your Success Story?</h3>
              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Join these successful business owners and get the funding you need to grow your business. Our specialists are standing by to help you find the perfect financing solution.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#193a59' }}>
                    <span className="text-2xl font-bold">24</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Hour Approval</h4>
                  <p className="text-gray-300 text-sm">Fast decisions for your business needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#193a59' }}>
                    <span className="text-2xl font-bold">50+</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Specialists</h4>
                  <p className="text-gray-300 text-sm">Expert guidance every step of the way</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#193a59' }}>
                    <span className="text-2xl font-bold">$20M</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Funded</h4>
                  <p className="text-gray-300 text-sm">Capital deployed to growing businesses</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                  <p className="text-gray-300 text-sm mb-2">Call us directly:</p>
                  <a href="https://calendly.com/lenduracapital/30min" target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-white hover:text-gray-200 transition-colors">(305) 834-7168</a>
                  <p className="text-gray-300 text-sm">Schedule your consultation today</p>
                </div>
                <div className="text-center">
                  <Button 
                    onClick={handleApplyNow}
                    style={{ backgroundColor: '#193a59' }}
                    className="text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Get Pre-Qualified Today
                  </Button>
                  <p className="text-gray-400 text-sm mt-2">No impact to your credit score</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}