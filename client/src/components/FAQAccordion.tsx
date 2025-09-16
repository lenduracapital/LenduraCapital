import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
  generateSchema?: boolean;
  className?: string;
  defaultExpanded?: number; // Index of initially expanded item
  'data-testid'?: string;
}

export default function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  generateSchema = true,
  className = '',
  defaultExpanded,
  'data-testid': testId = 'faq-accordion'
}: FAQAccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (defaultExpanded !== undefined && defaultExpanded < faqs.length) {
      setExpandedItems(new Set([defaultExpanded]));
    }
  }, [defaultExpanded, faqs.length]);

  useEffect(() => {
    if (generateSchema && faqs.length > 0) {
      generateFAQSchema();
    }
  }, [faqs, generateSchema]);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const generateFAQSchema = () => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Remove existing FAQ schema
    const existingScript = document.querySelector('script[type="application/ld+json"][data-component="faq-accordion"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new FAQ schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-component', 'faq-accordion');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);
  };

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section 
      className={`py-16 md:py-24 bg-gray-50 ${className}`}
      data-testid={testId}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-testid="faq-title"
          >
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our business funding solutions.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isExpanded = expandedItems.has(index);
            
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
                data-testid={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#193a59] focus:ring-inset"
                  aria-expanded={isExpanded}
                  aria-controls={`faq-answer-${index}`}
                  data-testid={`faq-question-${index}`}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 transition-transform duration-200">
                    {isExpanded ? (
                      <ChevronUp 
                        className="w-5 h-5 text-[#193a59]" 
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDown 
                        className="w-5 h-5 text-gray-400" 
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                  data-testid={`faq-answer-${index}`}
                >
                  <div className="px-6 pb-4">
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:3058347168"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#193a59] text-white font-semibold rounded-md hover:bg-[#285d8a] transition-colors duration-200 min-h-[44px]"
              data-testid="faq-call-button"
            >
              Call (305) 834-7168
            </a>
            <button
              onClick={() => window.open("https://form.jotform.com/251965461165159", "_blank")}
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#193a59] text-[#193a59] font-semibold rounded-md hover:bg-[#193a59] hover:text-white transition-colors duration-200 min-h-[44px]"
              data-testid="faq-apply-button"
            >
              Apply Online
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Utility function to create FAQ items with proper typing
export const createFAQItem = (question: string, answer: string): FAQItem => ({
  question,
  answer
});

// Common FAQ items for business funding (can be imported and reused)
export const commonBusinessFundingFAQs: FAQItem[] = [
  createFAQItem(
    "How quickly can I get approved for business funding?",
    "Most applications are approved within 24-48 hours. Once approved, funding can be available as soon as the next business day, depending on the funding type and your bank's processing times."
  ),
  createFAQItem(
    "What credit score do I need to qualify?",
    "We work with businesses with credit scores as low as 500. While higher credit scores may qualify for better terms, we have funding solutions for businesses with various credit profiles."
  ),
  createFAQItem(
    "Do I need collateral for business funding?",
    "Many of our funding solutions are unsecured, meaning no collateral is required. However, secured options with collateral may offer lower rates and higher funding amounts."
  ),
  createFAQItem(
    "How much funding can I qualify for?",
    "Funding amounts typically range from $10,000 to $750,000, depending on your business revenue, credit profile, and the type of funding solution you choose."
  ),
  createFAQItem(
    "What documents do I need to apply?",
    "Basic requirements include business and personal bank statements (3-6 months), business license, and personal identification. Additional documents may be required based on the funding type."
  )
];