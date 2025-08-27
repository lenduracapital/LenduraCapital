import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqData = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "What is Lendura Capital?",
        answer: "Lendura Capital is a business funding broker that connects qualified businesses with our network of trusted lending partners. We help businesses find the right financing solutions for their specific needs, from equipment purchases to working capital."
      },
      {
        question: "How does the application process work?",
        answer: "Our application process is simple: 1) Complete our online application form, 2) Provide basic business and financial information, 3) Receive multiple funding options within 24-48 hours, 4) Choose the best option for your business, and 5) Get funded quickly."
      },
      {
        question: "What types of businesses do you work with?",
        answer: "We work with businesses across all industries including restaurants, retail, construction, healthcare, manufacturing, auto repair, and many more. Whether you're a startup or established business, we have solutions that can work for you."
      }
    ]
  },
  {
    category: "Funding Options",
    questions: [
      {
        question: "What funding options are available?",
        answer: "We offer Term Loans, Lines of Credit, Equipment Financing, Invoice Factoring, P.O. Financing, SBA Loans, Merchant Cash Advances, Credit Services, and Debt Consolidation. Each option has different terms and requirements."
      },
      {
        question: "How much funding can I qualify for?",
        answer: "Funding amounts vary based on your business revenue, credit profile, and financing type. We offer solutions ranging from $10,000 to over $5 million. The best way to know what you qualify for is to complete our application."
      },
      {
        question: "What are the typical interest rates?",
        answer: "Interest rates vary based on the type of financing, your credit profile, business performance, and market conditions. Our team will present you with multiple options so you can choose the best rate and terms for your situation."
      }
    ]
  },
  {
    category: "Requirements",
    questions: [
      {
        question: "What are the minimum requirements?",
        answer: "Generally, we look for businesses that have been operating for at least 6 months, have monthly revenue of $10,000 or more, and a credit score of 550+. However, requirements vary by funding type and lender."
      },
      {
        question: "What documents do I need to provide?",
        answer: "Typically, you'll need bank statements (3-6 months), business tax returns, personal credit authorization, and basic business information. Some funding types may require additional documentation."
      },
      {
        question: "Do I need collateral?",
        answer: "Not all funding options require collateral. Unsecured options are available for qualified businesses. Equipment financing uses the equipment as collateral, while some term loans may require additional security."
      }
    ]
  },
  {
    category: "Process & Timeline",
    questions: [
      {
        question: "How quickly can I get funded?",
        answer: "Many of our funding options can be approved within 24-48 hours and funded within 1-5 business days. The exact timeline depends on the funding type, completeness of your application, and lender requirements."
      },
      {
        question: "Is there a cost for your services?",
        answer: "There are no upfront fees for our broker services. We're compensated by our lending partners only when you successfully receive funding. All costs and fees will be clearly disclosed before you accept any funding offer."
      },
      {
        question: "Can I apply if I've been declined by my bank?",
        answer: "Absolutely! Bank declines don't disqualify you from our alternative funding options. We work with many businesses that have been declined by traditional banks due to our extensive network of specialized lenders."
      }
    ]
  },
  {
    category: "Working with FundTek",
    questions: [
      {
        question: "What makes FundTek different from other brokers?",
        answer: "We focus on building long-term relationships, not just single transactions. Our team provides personalized service, multiple funding options, ongoing support, and we're committed to helping your business grow and succeed."
      },
      {
        question: "Do you work with startups?",
        answer: "Yes, we have funding solutions for startups and newer businesses. While requirements may be different, we have specialized programs and lenders that work with businesses with limited operating history."
      },
      {
        question: "Can I get funding for multiple purposes?",
        answer: "Yes, many of our funding options can be used for various business purposes including inventory, equipment, expansion, marketing, working capital, debt consolidation, and more. We'll help you find the best solution for your specific needs."
      }
    ]
  }
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="FAQ - Frequently Asked Questions | Lendura Capital"
        description="Get answers to common questions about business funding, application process, requirements, and working with Lendura Capital."
        canonical="/faq"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16" style={{ backgroundColor: '#2563eb' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Find answers to common questions about business funding and our services
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: '#2563eb' }}>
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`;
                  const isOpen = openItems.includes(itemId);
                  
                  return (
                    <div key={faqIndex} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our funding specialists are here to help you find the right solution for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open("https://form.jotform.com/251965461165159", "_blank")}
              className="px-8 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-colors"
              style={{ backgroundColor: '#2563eb' }}
            >
              Apply Now
            </button>
            <button 
              onClick={() => window.open("https://calendly.com/lenduracapital/30min", "_blank")}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Schedule Call (305) 834-7168
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}