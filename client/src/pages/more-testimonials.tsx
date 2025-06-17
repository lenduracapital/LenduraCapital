import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star } from "lucide-react";

const testimonials = [
  {
    initial: "M",
    name: "Restaurant Owner",
    business: "Fine Dining Restaurant",
    rating: 5,
    text: "FundTek Capital Group helped us get the funding we needed to get some upgrades done. With low rates we were able to borrow and pay back overtime and noticed how we got more customers as a result. Loan paid for itself in 1-2 years!"
  },
  {
    initial: "S",
    name: "Sarah Johnson",
    business: "Tech Startup",
    rating: 5,
    text: "The merchant cash advance program was exactly what we needed during our growth phase. Quick approval and flexible repayment terms helped us scale without the stress of traditional loans."
  },
  {
    initial: "R",
    name: "Robert Chen",
    business: "Manufacturing Company",
    rating: 5,
    text: "Equipment financing through FundTek allowed us to purchase new machinery that doubled our production capacity. The team understood our industry needs perfectly."
  },
  {
    initial: "L",
    name: "Lisa Martinez",
    business: "Retail Chain",
    rating: 5,
    text: "Working capital funding helped us through seasonal fluctuations. FundTek's team was professional, fast, and delivered exactly what they promised."
  },
  {
    initial: "D",
    name: "David Thompson",
    business: "Construction Contractor",
    rating: 5,
    text: "The P.O. financing solution enabled us to take on larger contracts without cash flow concerns. Game-changer for our business growth."
  },
  {
    initial: "A",
    name: "Amanda Rodriguez",
    business: "Healthcare Practice",
    rating: 5,
    text: "Term loan for our practice expansion was approved quickly with competitive rates. FundTek made the process smooth and stress-free."
  }
];

export default function MoreTestimonials() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-black mb-6">
            Client Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how FundTek Capital Group has helped businesses across industries achieve their goals with flexible financing solutions.
          </p>
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
                      {[...Array(testimonial.rating)].map((_, i) => (
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