import { useLocation } from "wouter";
import { IndustryLayout } from "@/components/Layout";
import { getRelatedSolutions, generateSEOKeywords } from "@/lib/internalLinks";
import Hero from "@/components/Hero";
import BenefitList from "@/components/BenefitList";
import FAQAccordion from "@/components/FAQAccordion";
import CTAButton from "@/components/CTAButton";

interface IndustryData {
  // Basic info
  name: string;
  title: string;
  description: string;
  slug: string;
  
  // Hero section
  heroImage: string;
  heroImageAlt: string;
  
  // Overview section
  overviewTitle: string;
  overviewContent: string[];
  
  // Financing needs
  commonNeeds: string[];
  
  // Additional content sections
  sections?: {
    title: string;
    content: string;
    items?: string[];
  }[];
  
  // Trust signals
  trustSignals?: {
    approvalTime: string;
    fundingRange: string;
  };
}

interface IndustryTemplateProps {
  data: IndustryData;
}

export default function IndustryTemplate({ data }: IndustryTemplateProps) {
  const [, setLocation] = useLocation();
  
  // Get related solutions for internal linking
  const relatedSolutions = getRelatedSolutions(data.slug);
  const additionalKeywords = generateSEOKeywords(relatedSolutions);

  // Sample FAQ data - replace with actual data from props or API
  const sampleFAQs = [
    {
      question: `How fast can ${data.name} businesses get approved for funding?`,
      answer: `${data.name} businesses can typically get approved for funding in 24-48 hours through our streamlined application process.`
    },
    {
      question: `What funding amounts are available for ${data.name} businesses?`,
      answer: `We offer funding from $10,000 to $750,000+ for ${data.name.toLowerCase()} businesses, depending on revenue and business needs.`
    },
    {
      question: `Do ${data.name} businesses need collateral for financing?`,
      answer: `Most of our ${data.name.toLowerCase()} financing solutions are unsecured and don't require collateral.`
    }
  ];

  return (
    <IndustryLayout
      industryName={data.name}
      title={`${data.title} | Fast Business Funding | Lendura Capital`}
      description={`${data.description} Get approved in 24 hours with competitive rates. Call (305) 834-7168 or apply online today.`}
      keywords={`${data.name.toLowerCase()} financing, ${data.name.toLowerCase()} business loans, ${data.name.toLowerCase()} equipment financing, ${data.name.toLowerCase()} working capital${additionalKeywords ? ', ' + additionalKeywords : ''}`}
      canonical={`/industries/${data.slug}`}
      openGraph={{
        title: `${data.title} | Lendura Capital`,
        description: `${data.description} Get approved in 24 hours with competitive rates.`,
        type: "website"
      }}
    >
      
      {/* H1: Main keyword (industry name) - Use Hero component */}
      <Hero
        title={data.title}
        description={data.description}
        backgroundImage={data.heroImage}
        breadcrumbs={[
          { label: "Industries", href: "/who-we-fund" },
          { label: data.name, href: `/industries/${data.slug}` }
        ]}
        ctaText="Get Approved in 24 Hours"
        ctaAction={() => window.open("https://form.jotform.com/251965461165159", "_blank", 'noopener,noreferrer')}
        size="large"
        overlay="dark"
        alignment="center"
        data-testid="hero-industry-detail"
      />

      {/* H2: What is [Industry] Financing? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8" data-testid="heading-what-is-financing">
                What is {data.name} Financing?
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                {/* Replace with optimized copy for {data.name} */}
                <p>{data.description}</p>
                <p>{data.name} financing provides specialized funding solutions tailored to the unique needs and challenges of {data.name.toLowerCase()} businesses.</p>
                <p>Our {data.name.toLowerCase()} financing programs are designed to help businesses grow, manage cash flow, and seize opportunities in this dynamic industry.</p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={data.heroImage}
                alt={data.heroImageAlt || `${data.name} financing solutions`}
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
                data-testid="img-industry-content"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-white">Fast Approval</div>
                <div className="text-2xl font-bold text-white">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Why [Industry] Businesses Use Our Services */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-why-businesses-use">
            Why {data.name} Businesses Use Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#193a59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#193a59]">1</div>
              </div>
              <h3 className="text-xl font-bold text-[#193a59] mb-4">Industry Expertise</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {data.name} */}
                We understand the unique challenges and opportunities in the {data.name.toLowerCase()} industry.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#193a59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#193a59]">2</div>
              </div>
              <h3 className="text-xl font-bold text-[#193a59] mb-4">Flexible Solutions</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {data.name} */}
                Customized financing options that match your {data.name.toLowerCase()} business model and cash flow.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#193a59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl font-bold text-[#193a59]">3</div>
              </div>
              <h3 className="text-xl font-bold text-[#193a59] mb-4">Fast Approval</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {data.name} */}
                Get approved in 24-48 hours with minimal paperwork and quick funding.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* H2: Best Financing Solutions for [Industry] Businesses - Auto-render internal links */}
      {relatedSolutions && relatedSolutions.length > 0 && (
        <section className="py-16 md:py-24 bg-white" data-testid="section-related-solutions">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-best-solutions">
              Best Financing Solutions for {data.name} Businesses
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              {/* Replace with optimized copy for {data.name} */}
              Discover the most popular funding options specifically designed for {data.name.toLowerCase()} businesses like yours:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedSolutions.map((solution, index) => (
                <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-xl hover:border-[#193a59] transition-all duration-300 transform hover:scale-105 group">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#193a59] mb-4 group-hover:text-[#285d8a] transition-colors">
                    <button
                      onClick={() => {
                        setLocation(`/solutions/${solution.slug}`);
                        window.scrollTo(0, 0);
                      }}
                      className="text-left hover:underline focus:outline-none focus:ring-2 focus:ring-[#193a59] rounded p-1 -m-1"
                      data-testid={`link-related-solution-${solution.slug}`}
                    >
                      {solution.anchorText}
                    </button>
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                    {solution.reason}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setLocation(`/solutions/${solution.slug}`);
                        window.scrollTo(0, 0);
                      }}
                      className="text-[#193a59] hover:text-[#285d8a] font-medium text-sm flex items-center group-hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#193a59] rounded p-1 -m-1"
                      data-testid={`button-learn-more-${solution.slug}`}
                    >
                      Learn More About This Solution →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* H2: How Lendura Capital Helps [Industry] Businesses */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-how-lendura-helps">
            How Lendura Capital Helps {data.name} Businesses
          </h2>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
            {/* Replace with optimized copy for {data.name} */}
            We specialize in {data.name.toLowerCase()} financing solutions that work for your business. Our expertise in this industry means faster approvals and better terms.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Traditional Lenders</h3>
              <ul className="space-y-4">
                {[
                  "30-90 day approval process",
                  "Extensive documentation required", 
                  "High credit score requirements",
                  "No industry specialization",
                  "Limited product options"
                ].map((item, index) => (
                  <li key={index} className="flex items-start" data-testid={`traditional-item-${index}`}>
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Lendura Capital</h3>
              <ul className="space-y-4">
                {[
                  "24-48 hour approval process",
                  "Minimal documentation needed",
                  "Flexible credit requirements", 
                  `${data.name} industry expertise`,
                  "12 different financing solutions"
                ].map((item, index) => (
                  <li key={index} className="flex items-start" data-testid={`lendura-industry-item-${index}`}>
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Key Benefits for [Industry] Businesses - Use BenefitList component */}
      <BenefitList
        benefits={data.commonNeeds || [
          "Fast approval in 24-48 hours",
          "No collateral required for most programs", 
          "Credit scores as low as 500 accepted",
          "Funding amounts from $10K to $750K",
          "Industry-specific financing solutions",
          "Dedicated {industry} financing specialist".replace('{industry}', data.name.toLowerCase())
        ]}
        title={`Key Benefits for ${data.name} Businesses`}
        variant="checkmarks"
        columns={2}
        iconColor="green"
        size="md"
        className="py-16 md:py-24 bg-white"
        data-testid="benefit-list-industry-benefits"
      />

      {/* H2: FAQs - Use FAQAccordion component + JSON-LD schema */}
      <FAQAccordion
        faqs={sampleFAQs}
        title={`${data.name} Financing FAQ`}
        generateSchema={true}
        className="bg-gray-50"
        data-testid="faq-accordion-industry"
      />

      {/* CTA block at bottom - Use CTAButton component for "Apply Now" */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#193a59] to-[#285d8a]" data-testid="section-cta-bottom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Grow Your {data.name} Business?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-12 leading-relaxed">
            {/* Replace with optimized copy for {data.name} */}
            Get the financing your {data.name.toLowerCase()} business needs with competitive rates and fast approval. 
            Our {data.name.toLowerCase()} financing experts are ready to help you succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <CTAButton
              variant="apply-now"
              size="lg"
              href="https://form.jotform.com/251965461165159"
              className="text-lg px-8 py-3 font-semibold"
              data-testid="cta-button-apply-now"
            >
              Apply Now - Get Approved Fast
            </CTAButton>
            
            <CTAButton
              variant="phone"
              size="lg"
              href="tel:3058347168"
              className="text-lg px-8 py-3 font-semibold"
              data-testid="cta-button-phone"
            >
              Call (305) 834-7168
            </CTAButton>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">24-48hrs</div>
              <div className="text-sm text-blue-100">Approval Time</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">$10K+</div>
              <div className="text-sm text-blue-100">Funding Amount</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">99%+</div>
              <div className="text-sm text-blue-100">Approval Rate</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-blue-100">Credit Score OK</div>
            </div>
          </div>
          
          {/* Industry-specific trust signals */}
          {data.trustSignals && (
            <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">{data.name} Financing Highlights</h3>
              <div className="grid md:grid-cols-2 gap-4 text-center">
                <div className="text-blue-100">
                  <div className="text-lg font-semibold">{data.trustSignals.approvalTime}</div>
                  <div className="text-sm">Average Approval</div>
                </div>
                <div className="text-blue-100">
                  <div className="text-lg font-semibold">{data.trustSignals.fundingRange}</div>
                  <div className="text-sm">Funding Range</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

    </IndustryLayout>
  );
}