import { Shield, Users, TrendingUp, Clock, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import SectionSeparator from "./section-separator";


const certifications = [
  {
    icon: Shield,
    title: "Trusted Network",
    description: "Connected to vetted lenders nationwide with established banking relationships"
  },
  {
    icon: Users,
    title: "5,000+ Clients Served",
    description: "Successfully funded thousands of businesses across multiple industries"
  },
  {
    icon: TrendingUp,
    title: "$1B+ Funded",
    description: "Over one billion dollars in business capital deployed to growing companies"
  },
  {
    icon: Clock,
    title: "24-Hour Decisions",
    description: "Rapid approval process with funding decisions within one business day"
  },
  {
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    ),
    title: "No Prepayment Penalties",
    description: "Flexible terms with no hidden fees or early payment penalties"
  },
  {
    icon: MapPin,
    title: "Nationwide Coverage",
    description: "Serving businesses across all 50 states with local expertise and national reach"
  }
];


export default function TrustSignalsSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [, setLocation] = useLocation();

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "How quickly can I get approved for funding?",
      answer: "Most clients receive approval decisions within 24 hours. Our streamlined application process and direct lender relationships allow us to move fast while other companies make you wait weeks."
    },
    {
      question: "What documents do I need to apply?",
      answer: "Just three simple items: your last 3 months of bank statements, application, and your business info. No complex financial statements or lengthy paperwork required."
    },
    {
      question: "Can I get funding if my credit isn't perfect?",
      answer: "Absolutely! We focus on your business performance and cash flow, not just credit scores. Many of our clients have been approved with credit scores as low as 550 because we look at the bigger picture."
    },
    {
      question: "Do you work with businesses in my industry?",
      answer: "We serve over 18 different industries including restaurants, retail, healthcare, construction, transportation, and many more. Our specialists understand the unique challenges each industry faces and tailor solutions accordingly."
    },
    {
      question: "What makes Lendura Capital different from banks?",
      answer: "Banks require perfect credit, extensive paperwork, and take weeks to decide. We approve clients in 24 hours with minimal documentation. Banks reject 80% of small businesses - we focus on your cash flow and business performance, not just credit scores. You work with a dedicated specialist, not a call center."
    }
  ];

  return (
    <>
      <SectionSeparator variant="wave" color="white" />
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust signals header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by 5,000+ Businesses Nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Over $1 billion in funding deployed. 24-hour decisions. Nationwide coverage.
          </p>
        </div>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4"
                    style={{ backgroundColor: '#193a59' }}
                  >
                    <div className="w-6 h-6 text-white">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cert.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get answers to the most common questions from clients like you
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqItems.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg border-l-4 overflow-hidden" style={{ borderLeftColor: '#193a59' }}>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-5 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#193a59] focus:ring-inset"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h4>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-5 pb-5">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* CTAs below FAQ */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => window.open("https://form.jotform.com/251965461165159", "_blank")}
              className="bg-[#193a59] hover:bg-[#285d8a] text-white font-semibold px-6 py-4 text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              Apply for Funding
            </Button>
            
            <Button 
              onClick={() => setLocation("/faq")}
              variant="outline"
              className="border-2 border-[#193a59] text-[#193a59] hover:bg-[#193a59] hover:text-white font-semibold px-6 py-4 text-lg rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 w-full sm:w-auto"
            >
              View All FAQs
            </Button>
          </div>
        </div>

        </div>
      </section>
      <SectionSeparator variant="diagonal" color="blue" />
    </>
  );
}