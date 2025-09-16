import { useLocation } from "wouter";
import { SolutionLayout } from "@/components/Layout";
import { getRelatedIndustries, generateSEOKeywords } from "@/lib/internalLinks";
import Hero from "@/components/Hero";
import BenefitList from "@/components/BenefitList";
import FAQAccordion from "@/components/FAQAccordion";
import CTAButton from "@/components/CTAButton";


interface SolutionDetailProps {
  title: string;
  description: string;
  heroImage: string;
  contentImage: string;
  features: string[];
  perfectFor: string[];
  qualificationRequirements: string[];
  approvalTime?: {
    label: string;
    duration: string;
  };
  howItWorks?: {
    title: string;
    items: string[];
  };
  ratesBasedOn?: string[];
  requiredDocuments?: string[];
  askYourself?: string[];
  goodToKnow?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
  comparison?: {
    traditional: string[];
    fundtek: string[];
  };
  slug: string; // Added for internal linking
}

export default function SolutionDetailTemplate({
  title,
  description,
  heroImage,
  contentImage,
  features,
  perfectFor,
  qualificationRequirements,
  approvalTime,
  howItWorks,
  ratesBasedOn,
  requiredDocuments,
  askYourself,
  goodToKnow,
  faq,
  comparison,
  slug
}: SolutionDetailProps) {
  const [, setLocation] = useLocation();
  
  // Get related industries for internal linking
  const relatedIndustries = getRelatedIndustries(slug);
  const additionalKeywords = generateSEOKeywords(relatedIndustries);

  // Clean title for display (handle merchant cash advance)
  const displayTitle = title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') 
    ? 'Merchant Cash Advance' 
    : title;

  return (
    <SolutionLayout
      solutionName={title}
      title={`${displayTitle} for Business | Fast Approval & Competitive Rates | Lendura Capital`}
      description={`Get ${title.toLowerCase()} for your business with approval in 24 hours. ${description} Bad credit OK. Apply online or call (305) 834-7168.`}
      keywords={`${title.toLowerCase()}, business ${title.toLowerCase()}, ${title.toLowerCase()} Brooklyn NY, fast ${title.toLowerCase()} approval, ${title.toLowerCase()} bad credit, ${title.toLowerCase()} funding${additionalKeywords ? ', ' + additionalKeywords : ''}`}
      canonical={`/solutions/${slug}`}
      openGraph={{
        title: `${displayTitle} for Business | Lendura Capital`,
        description: `Get ${title.toLowerCase()} for your business with approval in 24 hours. ${description}`,
        type: "service"
      }}
    >
      
      {/* H1: Main keyword (page topic) - Use Hero component */}
      <Hero
        title={displayTitle}
        description={description}
        backgroundImage={heroImage}
        breadcrumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: displayTitle, href: `/solutions/${slug}` }
        ]}
        ctaText="Get Approved in 24 Hours"
        ctaAction={() => window.open("https://form.jotform.com/251965461165159", "_blank", 'noopener,noreferrer')}
        size="large"
        overlay="dark"
        alignment="center"
        data-testid="hero-solution-detail"
      />

      {/* H2: What is [Keyword]? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8" data-testid="heading-what-is">
                What is {displayTitle}?
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                {/* Replace with optimized copy for {displayTitle} */}
                <p>{description}</p>
                <p>This financing solution is designed for businesses that need flexible access to capital without the lengthy approval processes and strict requirements of traditional bank loans.</p>
                <p>With {displayTitle.toLowerCase()}, businesses can get the funding they need quickly and with minimal documentation requirements.</p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={contentImage}
                alt={`${displayTitle} financing solution`}
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
                data-testid="img-solution-content"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium">{approvalTime?.label || "Fast Approval"}</div>
                <div className="text-2xl font-bold">{approvalTime?.duration || "24-48hrs"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Why Businesses Use [Keyword] */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-why-businesses-use">
            Why Businesses Use {displayTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#193a59] mb-4">Fast Approval Process</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {displayTitle} */}
                Get approved in 24-48 hours compared to weeks or months with traditional banks.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#193a59] mb-4">Flexible Qualification</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {displayTitle} */}
                Revenue-based approval with credit scores as low as 500 accepted.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-[#193a59] mb-4">No Collateral Required</h3>
              <p className="text-gray-700 leading-relaxed">
                {/* Replace with optimized copy for {displayTitle} */}
                Unsecured funding based on business performance, not personal assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Which Businesses Use [Keyword]? - Auto-render internal links */}
      {relatedIndustries && relatedIndustries.length > 0 && (
        <section className="py-16 md:py-24 bg-white" data-testid="section-related-industries">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-which-businesses-use">
              Which Industries Use {displayTitle}?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
              {/* Replace with optimized copy for {displayTitle} */}
              Our {displayTitle.toLowerCase()} solutions serve diverse industries with unique financing needs. Explore how businesses in these sectors leverage our funding:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedIndustries.map((industry, index) => (
                <div key={index} className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-xl hover:border-[#193a59] transition-all duration-300 transform hover:scale-105 group">
                  <h3 className="text-xl md:text-2xl font-semibold text-[#193a59] mb-4 group-hover:text-[#285d8a] transition-colors">
                    <button
                      onClick={() => {
                        setLocation(`/industries/${industry.slug}`);
                        window.scrollTo(0, 0);
                      }}
                      className="text-left hover:underline focus:outline-none focus:ring-2 focus:ring-[#193a59] rounded p-1 -m-1"
                      data-testid={`link-related-industry-${industry.slug}`}
                    >
                      {industry.anchorText}
                    </button>
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4">
                    {industry.reason}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setLocation(`/industries/${industry.slug}`);
                        window.scrollTo(0, 0);
                      }}
                      className="text-[#193a59] hover:text-[#285d8a] font-medium text-sm flex items-center group-hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-[#193a59] rounded p-1 -m-1"
                      data-testid={`button-learn-more-${industry.slug}`}
                    >
                      Learn More About This Industry →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* H2: How Lendura Capital Helps */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12 md:mb-16" data-testid="heading-how-lendura-helps">
            How Lendura Capital Helps
          </h2>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
            {/* Replace with optimized copy for {displayTitle} */}
            We specialize in {displayTitle.toLowerCase()} solutions that work for your business, not against it. See the clear advantages of choosing Lendura Capital:
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-red-50 p-8 rounded-lg border border-red-200">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Traditional Banks</h3>
              <ul className="space-y-4">
                {(comparison?.traditional || [
                  "30-90 day approval process",
                  "Extensive documentation required", 
                  "High credit score requirements",
                  "Rigid qualification criteria",
                  "Limited product options"
                ]).map((item, index) => (
                  <li key={index} className="flex items-start" data-testid={`traditional-bank-item-${index}`}>
                    <span className="text-red-500 mr-3 mt-1">✗</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <h3 className="text-2xl font-bold text-green-800 mb-6">Lendura Capital</h3>
              <ul className="space-y-4">
                {(comparison?.fundtek || [
                  "24-48 hour approval process",
                  "Minimal documentation needed",
                  "Flexible credit requirements", 
                  "Revenue-based qualification",
                  "12 different financing solutions"
                ]).map((item, index) => (
                  <li key={index} className="flex items-start" data-testid={`lendura-item-${index}`}>
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* H2: Key Benefits of [Keyword] - Use BenefitList component */}
      <BenefitList
        benefits={features || [
          "Fast approval in 24-48 hours",
          "No collateral required for most programs", 
          "Credit scores as low as 500 accepted",
          "Funding amounts from $10K to $750K",
          "Multiple repayment options available",
          "Use funds for any business purpose"
        ]}
        title={`Key Benefits of ${displayTitle}`}
        variant="checkmarks"
        columns={2}
        iconColor="green"
        size="md"
        className="py-16 md:py-24 bg-white"
        data-testid="benefit-list-key-benefits"
      />


      {/* H2: FAQs - Use FAQAccordion component + JSON-LD schema */}
      {faq && faq.length > 0 && (
        <FAQAccordion
          faqs={faq}
          title={`${displayTitle} FAQ`}
          generateSchema={true}
          className="bg-gray-50"
          data-testid="faq-accordion-solution"
        />
      )}

      {/* CTA block at bottom - Use CTAButton component for "Apply Now" */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#193a59] to-[#285d8a]" data-testid="section-cta-bottom">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get {displayTitle}?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 md:mb-12 leading-relaxed">
            {/* Replace with optimized copy for {displayTitle} */}
            Get the {displayTitle.toLowerCase()} your business needs with competitive rates and fast approval. 
            Our financing experts are ready to help you succeed.
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
          
          {/* Qualification Requirements */}
          {qualificationRequirements && qualificationRequirements.length > 0 && (
            <div className="mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Qualification Requirements</h3>
              <div className="grid md:grid-cols-2 gap-2 text-left">
                {qualificationRequirements.map((req, index) => (
                  <div key={index} className="flex items-center text-blue-100" data-testid={`qualification-${index}`}>
                    <span className="mr-2">✓</span>
                    <span className="text-sm">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </SolutionLayout>
  );
}