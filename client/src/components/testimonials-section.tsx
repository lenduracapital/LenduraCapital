import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const testimonials = [
  {
    initial: "S",
    name: "Sarah Mitchell",
    business: "Mitchell's Restaurant",
    rating: 5,
    text: "We needed working capital to get through a slow winter season. FundTek's team understood our cash flow challenges and structured payments that worked with our revenue cycles."
  },
  {
    initial: "J",
    name: "Jennifer Walsh",
    business: "Walsh Landscaping",
    rating: 5,
    text: "Our truck broke down right before spring season. FundTek got us approved in 24 hours so we could buy a replacement and not lose our biggest contracts."
  },
  {
    initial: "C",
    name: "Carlos Mendez",
    business: "Mendez Roofing",
    rating: 5,
    text: "Insurance was taking forever to pay on a big job. The merchant cash advance kept my crew working while we waited for that check to come in."
  },
  {
    initial: "T",
    name: "Tracy Williams",
    business: "Williams Bakery",
    rating: 4,
    text: "My oven died on a Tuesday. By Friday I had funding to replace it. Saved my weekend wedding orders and probably my business."
  },
  {
    initial: "R",
    name: "Robert Kim",
    business: "Kim's Auto Body",
    rating: 5,
    text: "Equipment financing let me buy the paint booth I needed to take insurance work. Now I'm booked solid and payments are manageable."
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
            
            <div style={{ backgroundColor: '#85abe4' }} className="p-6 rounded-lg relative">
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {currentTestimonial.initial}
                </div>
                <div>
                  <p className="text-black font-semibold">{currentTestimonial.name}</p>
                  <p className="text-black text-sm">{currentTestimonial.business}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(Math.floor(currentTestimonial.rating))].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-black italic">
                "{currentTestimonial.text}"
              </p>
              
              {/* Carousel Indicators */}
              <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
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
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
              alt="Business meeting" 
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}