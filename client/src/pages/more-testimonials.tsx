import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star } from "lucide-react";

const testimonials = [
  {
    initial: "J",
    name: "Jennifer Walsh",
    business: "Walsh Landscaping",
    rating: 5,
    text: "Our truck broke down right before spring season. FundTek got us approved in 24 hours so we could buy a replacement and not lose our biggest contracts."
  },
  {
    initial: "M",
    name: "Michael Park",
    business: "Park's Electronics Repair",
    rating: 4,
    text: "Needed inventory for the holiday rush but my bank said no. FundTek understood seasonal businesses and got me the working capital in 3 days."
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
  },
  {
    initial: "L",
    name: "Linda Torres",
    business: "Torres Cleaning Services",
    rating: 4,
    text: "Got a big contract but needed to hire staff and buy supplies upfront. The line of credit gave me flexibility to grow without stress."
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
            See why businesses trust FundTek Capital Group.
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