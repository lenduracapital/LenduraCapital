import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const testimonials = [
  {
    initial: "A",
    name: "Antonio Valdez",
    business: "Valdez Brothers Plumbing",
    rating: 5,
    text: "Had three emergency calls but my van was in the shop for two weeks. Needed cash fast for a rental. FundTek came through when my bank couldn't even see me until next month."
  },
  {
    initial: "D",
    name: "Danny O'Brien",
    business: "Dublin's Irish Pub",
    rating: 5,
    text: "Our walk-in cooler died during St. Patrick's week. Would've lost thousands in spoiled food and had to cancel our biggest event. FundTek saved our season."
  },
  {
    initial: "M",
    name: "Maria Santos-Lopez",
    business: "Bella Vista Hair Studio",
    rating: 5,
    text: "Landlord raised rent by $800 overnight. My salon's been here 12 years but I needed quick cash to cover the deposit. Now I own the building next door too."
  }
];

export default function TestimonialsSection() {
  const [, setLocation] = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const handleMoreTestimonials = () => {
    setLocation("/more-testimonials");
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTestimonial = testimonials[currentIndex];
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-black">
            <h2 className="text-2xl font-bold mb-4">
              What our clients are saying about our solutions
            </h2>
            <p className="text-gray-600 mb-8">
              Our Financial Solutions and Business Services support our clients as they stay competitive and grow to keep our nation's economy alive.
            </p>
            
            <div style={{ backgroundColor: '#85abe4' }} className="p-4 md:p-6 rounded-lg relative">
              {/* Navigation Arrow - Hidden on mobile, positioned better on desktop */}
              <button
                onClick={nextTestimonial}
                className="hidden md:block absolute right-2 top-2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="flex items-start mb-4 pr-2 md:pr-12">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-black rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 md:mr-4 flex-shrink-0">
                  {currentTestimonial.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-black font-semibold text-sm md:text-base">{currentTestimonial.name}</p>
                  <p className="text-black text-xs md:text-sm">{currentTestimonial.business}</p>
                  <div className="flex text-yellow-400 mt-1">
                    {[...Array(Math.floor(currentTestimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-black italic text-sm md:text-base leading-relaxed pr-2 md:pr-12">
                "{currentTestimonial.text}"
              </p>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-black' : 'bg-black bg-opacity-30'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={handleMoreTestimonials}
                  variant="outline"
                  className="text-black border-black hover:bg-black hover:text-white min-h-[44px] px-6 py-3"
                >
                  Read More Success Stories →
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative bubbles - hidden on mobile to reduce clutter */}
            <div className="hidden lg:block absolute -top-4 -right-4 w-20 h-20 bg-[#85abe4] rounded-full opacity-20"></div>
            <div className="hidden lg:block absolute top-1/2 -left-8 w-12 h-12 bg-blue-300 rounded-full opacity-30"></div>
            <div className="hidden lg:block absolute -bottom-6 right-1/4 w-16 h-16 bg-[#85abe4] rounded-full opacity-15"></div>
            
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
              alt="Business meeting" 
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}