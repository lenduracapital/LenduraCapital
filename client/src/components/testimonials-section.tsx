import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const handleMoreTestimonials = () => {
    window.location.href = "/more-testimonials";
  };
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
            
            <div style={{ backgroundColor: '#85abe4' }} className="p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mr-4">
                  M
                </div>
                <div>
                  <p className="text-black font-semibold">Restaurant Owner</p>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-black italic">
                "FundTek Capital Group helped us get the funding we needed to get some upgrades done. With low rates we were able to borrow and pay back overtime and noticed how we got more customers as a result. Loan paid for itself in 1-2 years!"
              </p>
              
              <div className="mt-6">
                <Button 
                  onClick={handleMoreTestimonials}
                  variant="outline"
                  className="text-black border-black hover:bg-black hover:text-white"
                >
                  More Testimonials →
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