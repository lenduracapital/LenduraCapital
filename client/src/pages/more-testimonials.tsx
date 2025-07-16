import Header from "@/components/header";
import Footer from "@/components/footer";
import { Star } from "lucide-react";

const testimonials = [
  {
    initial: "C",
    name: "Carmen Rodriguez",
    business: "La Casa Cantina",
    rating: 5,
    text: "Our deep fryer died Friday before Cinco de Mayo weekend - our biggest revenue day. Bank was closed, other lenders wanted credit checks and three days minimum. James picked up his phone at 7 PM, had me approved by midnight. That's real service."
  },
  {
    initial: "P",
    name: "Pradeep Sharma",
    business: "Quality Cleaners",
    rating: 4,
    text: "Both steam presses went down same week, right before prom season. Customers were panicking about their formal wear. Irving worked with my limited credit history, got me funded Tuesday morning. Saved my reputation with longtime clients."
  },
  {
    initial: "T",
    name: "Tony Ricci",
    business: "Elite Auto Detailing",
    rating: 5,
    text: "City contract required $50K in new equipment certifications. Had two weeks or lose everything. My credit union said maybe in 6-8 weeks. Ava understood the deadline pressure, expedited everything. Contract saved, business growing."
  },
  {
    initial: "M",
    name: "Michelle Park",
    business: "Bright Minds Daycare",
    rating: 4,
    text: "State inspection found playground violations, gave us 30 days to fix or close. 18 families depend on us, kids had nowhere else to go. Paige stayed late to process paperwork, kept me updated every step. We reopened on time."
  },
  {
    initial: "R",
    name: "Rico Martinez",
    business: "Hometown Barbershop",
    rating: 5,
    text: "Building sold, new landlord wanted double deposit upfront. Been here 15 years, customers are like family. Victor understood this wasn't just business - it's community. Got funding in 36 hours, kept our doors open."
  },
  {
    initial: "A",
    name: "Angela Wu",
    business: "Healing Hands Therapy",
    rating: 4,
    text: "Insurance payments were 5 months late, but couldn't stop treating patients. Payroll was due, rent overdue. Brian didn't just process my application, he called insurance company himself to verify payments. That's going above and beyond."
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
            onClick={() => window.open("https://form.jotform.com/251965198766173", "_blank")}
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