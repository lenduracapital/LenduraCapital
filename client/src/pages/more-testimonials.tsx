import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star } from "lucide-react";

const testimonials = [
  {
    initial: "J",
    name: "James Castillo",
    business: "Estrella Mexican Grill",
    rating: 5,
    text: "We've been serving authentic tacos for 8 years but our fryer gave out right before Cinco de Mayo weekend. Couldn't afford to miss our busiest days. FundTek understood the urgency."
  },
  {
    initial: "D",
    name: "Daniel Patel",
    business: "Golden State Dry Cleaners",
    rating: 4,
    text: "Two pressing machines broke within the same week. My regular customers depend on me for their work clothes. Got funding approved while my competitor was still waiting for his bank appointment."
  },
  {
    initial: "A",
    name: "Ava Jackson",
    business: "Motor City Detail Shop",
    rating: 5,
    text: "Police department wanted to renew our fleet contract but required new equipment certifications. Had 10 days to upgrade everything. My bank wanted six weeks just to review the application."
  },
  {
    initial: "P",
    name: "Paige Petrov",
    business: "Little Angels Daycare",
    rating: 4,
    text: "State changed licensing requirements - we needed new security system and playground updates by January or they'd shut us down. 15 families counting on us to stay open."
  },
  {
    initial: "M",
    name: "Marc Washington",
    business: "Southside Barber Lounge",
    rating: 5,
    text: "Landlord sold the building, new owner doubled our rent with 30 days notice. Been cutting hair in this neighborhood for 22 years. The emergency funding kept our doors open."
  },
  {
    initial: "L",
    name: "Lisa Chen-Rodriguez",
    business: "Fusion Physical Therapy",
    rating: 4,
    text: "Insurance reimbursements were 4 months behind but patients needed treatment now. Couldn't afford to turn people away while waiting for bureaucrats to cut checks."
  }
];

export default function MoreTestimonials() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section with Skyline Background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop')"
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8">
          <h1 className="text-4xl font-bold text-white mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Client Success Stories
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}>
            Discover how FundTek Capital Group has helped businesses across industries achieve their goals with flexible financing solutions.
          </p>
        </div>
      </section>

      {/* Trust Building Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Don't take our word for it.
          </h2>
          
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Small businesses are the backbone of our economy, and they deserve funding partners who understand their unique challenges. Unlike traditional banks with rigid requirements, FundTek Capital Group specializes in flexible financing solutions that work for real business situations.
            </p>
            
            <p>
              From retail stores and restaurants to construction companies and service providers, our funding solutions help businesses navigate cash flow gaps, equipment failures, seasonal fluctuations, and growth opportunities. We've built our reputation by delivering fast approvals, transparent terms, and personalized service.
            </p>
            
            <p className="font-semibold text-gray-800">
              Hear directly from business owners who've experienced our commitment firsthand:
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                style={{ backgroundColor: '#85abe4' }}
                className="p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initial}
                  </div>
                  <div>
                    <p className="text-black font-semibold">{testimonial.name}</p>
                    <p className="text-black text-sm">{testimonial.business}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-black italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Ready to Join Our Success Stories?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the funding your business needs to grow and thrive.
          </p>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            style={{ backgroundColor: '#85abe4' }}
            className="px-8 py-4 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Apply for Funding Today
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}