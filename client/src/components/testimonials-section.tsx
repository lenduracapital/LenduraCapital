import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

const testimonials = [
  {
    initial: "R",
    name: "Roberto Gonzalez",
    business: "City Auto Center",
    rating: 5,
    text: "My main lift broke during inspection season - busiest time of year. Called everywhere, banks wanted weeks of paperwork. Marc from FundTek had me funded same day. Guy actually listened and understood my situation."
  },
  {
    initial: "L",
    name: "Lisa Chang",
    business: "Golden Wok",
    rating: 5,
    text: "Health department required new ventilation system or we'd get shut down. Had 2 weeks to fix it. Gabby walked me through everything, kept me updated daily. She made an impossible situation manageable."
  },
  {
    initial: "D",
    name: "David Rodriguez",
    business: "Coastal Roofing",
    rating: 5,
    text: "Hurricane season killed our cash flow, but had three big jobs lined up. Banks said no because of seasonal income. Eric got it - he's worked with contractors before. Funding came through when I needed it most."
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

  // Auto-advance carousel every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3500);
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
              <p className="text-black italic text-sm md:text-base leading-relaxed">
                "{currentTestimonial.text}"
              </p>
              
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