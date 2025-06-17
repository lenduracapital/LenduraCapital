import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star } from "lucide-react";

const testimonials = [
  {
    initial: "M",
    name: "Miguel Santos",
    business: "Santos Family Restaurant",
    rating: 4.5,
    text: "We needed working capital to get through a slow winter season. FundTek's team understood our cash flow challenges and structured payments that worked with our revenue cycles."
  },
  {
    initial: "S",
    name: "Sarah Johnson",
    business: "Johnson Dental Practice",
    rating: 4,
    text: "The equipment financing helped us upgrade our dental equipment. The application was straightforward and we got approval faster than expected."
  },
  {
    initial: "R",
    name: "Robert Chen",
    business: "Chen Auto Repair",
    rating: 5,
    text: "When our diagnostic machine broke, we needed quick funding for a replacement. FundTek processed our application in two days and kept our shop running."
  },
  {
    initial: "L",
    name: "Lisa Martinez",
    business: "Martinez Construction",
    rating: 5,
    text: "The line of credit has been helpful for managing materials costs between project payments. We only pay interest on what we actually use."
  },
  {
    initial: "D",
    name: "David Thompson",
    business: "Thompson Electric",
    rating: 5,
    text: "Purchase order financing allowed us to take on a larger commercial project. The process was more flexible than traditional bank lending."
  },
  {
    initial: "A",
    name: "Amanda Rodriguez",
    business: "Rodriguez Physical Therapy",
    rating: 5,
    text: "We needed to expand our clinic space. FundTek's term loan had reasonable rates and the monthly payments fit our budget."
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