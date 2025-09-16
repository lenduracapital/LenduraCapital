import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import SectionSeparator from "./section-separator";


const clientSuccessStories = [
  {
    businessName: "Tony's Auto Repair",
    ownerName: "Anthony Rodriguez",
    location: "Phoenix, AZ",
    fundingAmount: "$65,000",
    result: "Purchased new diagnostic equipment and expanded to second bay. Revenue increased 40% in 6 months.",
    industry: "Automotive",
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    businessName: "Bella Vista Restaurant",
    ownerName: "Maria Santos",
    location: "Miami, FL",
    fundingAmount: "$85,000",
    result: "Renovated dining room and added outdoor seating. Daily revenue jumped from $1,200 to $2,100.",
    industry: "Restaurant",
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
        </svg>
      </div>
    )
  },
  {
    businessName: "Premier Landscaping Co.",
    ownerName: "David Chen",
    location: "Austin, TX",
    fundingAmount: "$120,000",
    result: "Bought 3 new trucks and hired 8 employees. Secured $400K in new commercial contracts.",
    industry: "Construction",
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M9 11H7l3-8 3 8h-2l-1 3-1-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
  },
  {
    businessName: "Brooklyn Medical Supplies",
    ownerName: "Dr. Sarah Johnson",
    location: "Brooklyn, NY",
    fundingAmount: "$95,000",
    result: "Expanded inventory and opened online store. Monthly sales grew from $45K to $78K.",
    industry: "Healthcare",
    icon: () => (
      <div className="w-6 h-6 relative">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    )
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
        {/* Success Stories header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real Businesses, Real Results
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how our funding helped business owners grow and succeed across the country.
          </p>
        </div>

        {/* Client Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {clientSuccessStories.map((story, index) => {
            const IconComponent = story.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#193a59]">
                <div className="flex items-start mb-4">
                  <div 
                    className="p-3 rounded-lg mr-4 flex-shrink-0"
                    style={{ backgroundColor: '#193a59' }}
                  >
                    <div className="w-6 h-6 text-white">
                      <IconComponent />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#193a59] mb-1">
                      {story.businessName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {story.ownerName} • {story.location} • {story.industry}
                    </p>
                    <div className="inline-block bg-[#193a59] text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {story.fundingAmount} Funded
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">
                  {story.result}
                </p>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-500">
            Case studies are representative examples; individual results vary.
          </p>
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