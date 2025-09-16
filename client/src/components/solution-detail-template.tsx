import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { getRelatedIndustries, generateSEOKeywords } from "@/lib/internalLinks";


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
  
  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank", 'noopener,noreferrer');
  };
  
  // Get related industries for internal linking
  const relatedIndustries = getRelatedIndustries(slug);
  const additionalKeywords = generateSEOKeywords(relatedIndustries);

  const handleBackToSolutions = () => {
    setLocation("/solutions");
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setLocation("/");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={`${title} for Business | Fast Approval & Competitive Rates | Lendura Capital`}
        description={`Get ${title.toLowerCase()} for your business with approval in 24 hours. ${description} Bad credit OK. Apply online or call (305) 834-7168.`}
        keywords={`${title.toLowerCase()}, business ${title.toLowerCase()}, ${title.toLowerCase()} Brooklyn NY, fast ${title.toLowerCase()} approval, ${title.toLowerCase()} bad credit, ${title.toLowerCase()} funding${additionalKeywords ? ', ' + additionalKeywords : ''}`}
        canonical={`/solutions/${slug}`}
      />

      <Header />
      
      {/* Hero Section with Image */}
      <section className="relative pt-40 md:pt-48 pb-20 md:pb-32 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('${heroImage}')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-wider">
              {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title}
            </h1>
            <p className="text-base md:text-xl text-gray-200 leading-relaxed px-4">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Everything You Need to Know About {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title}
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {description} Our comprehensive guide covers all aspects of this financing solution to help you make an informed decision for your business.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <div className="relative order-2 lg:order-1">
              <img 
                src={contentImage}
                alt={`${title} financing solution`}
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium">{approvalTime?.label || "Fast Approval"}</div>
                <div className="text-2xl font-bold">{approvalTime?.duration || "24-48hrs"}</div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8">
                What is {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title}?
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                <p>{description}</p>
                <p>This financing solution is designed for businesses that need flexible access to capital without the lengthy approval processes and strict requirements of traditional bank loans.</p>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Key Features & Benefits</h3>
              <ul className="space-y-4 mb-8 md:mb-12">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 flex-shrink-0" style={{ color: '#193a59' }} />
                    <span className="text-sm md:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">Perfect for:</h3>
              <ul className="space-y-1 md:space-y-2 mb-6 md:mb-8">
                {perfectFor.map((use, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <span className="mr-2 md:mr-3">•</span>
                    <span className="text-sm md:text-base">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Perfect For These Industries
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {title} work exceptionally well for businesses in these sectors due to their unique operational characteristics and cash flow patterns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perfectFor.map((industry, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center">
                <div className="w-16 h-16 bg-[#193a59]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-[#193a59]">{index + 1}</div>
                </div>
                <h3 className="text-lg font-bold text-black mb-2">{industry}</h3>
                <p className="text-gray-600 text-sm">Ideal financing solution for growth and operational needs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Comparison */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              How We Compare to Traditional Banks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the clear advantages of choosing Lendura Capital over traditional banking institutions.
            </p>
          </div>
          
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
                  <li key={index} className="flex items-start">
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
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Sections */}
      {(howItWorks || ratesBasedOn || requiredDocuments || askYourself || goodToKnow) && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Complete {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title} Guide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title.toLowerCase()}, from how they work to what documents you'll need.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* How It Works */}
              {howItWorks && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: '#193a59' }}>
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{howItWorks.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {howItWorks.items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#193a59' }}>■</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Rates Based On */}
              {ratesBasedOn && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: '#193a59' }}>
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Rates are based on</h3>
                  </div>
                  <ul className="space-y-3">
                    {ratesBasedOn.map((factor, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#193a59' }}>■</span>
                        <span className="text-gray-700">{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Required Documents */}
              {requiredDocuments && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: '#193a59' }}>
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Required documents</h3>
                  </div>
                  <ul className="space-y-3">
                    {requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#193a59' }}>■</span>
                        <span className="text-gray-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ask Yourself */}
              {askYourself && (
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: '#193a59' }}>
                      4
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Ask Yourself</h3>
                  </div>
                  <ul className="space-y-3">
                    {askYourself.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#193a59' }}>■</span>
                        <span className="text-gray-700">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Good to Know */}
              {goodToKnow && (
                <div className="bg-gray-50 p-6 rounded-lg md:col-span-2 lg:col-span-3">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mr-3" style={{ backgroundColor: '#193a59' }}>
                      5
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Good to know</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goodToKnow.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <span className="mr-2 mt-1" style={{ color: '#193a59' }}>■</span>
                        <span className="text-gray-700">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-4">Get Your Quote Today</h3>
              <p className="text-sm md:text-base text-gray-600 mb-6">
                Ready to secure funding for your business? Our specialists are standing by to help you find the perfect {title.toLowerCase()} solution.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded border-l-4" style={{ borderLeftColor: '#193a59' }}>
                  <p className="text-xs md:text-sm text-gray-600">Call us directly:</p>
                  <p className="text-xl md:text-2xl font-bold text-black">(305) 834-7168</p>
                </div>
                <Button 
                  onClick={handleApplyNow}
                  style={{ backgroundColor: '#193a59' }}
                  className="w-full text-white py-3 rounded font-semibold text-base md:text-lg hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Apply Now
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleBackToSolutions}
                    variant="outline"
                    className="py-3 rounded font-semibold text-sm md:text-base border-black text-black hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Back to Solutions
                  </Button>
                  <Button 
                    onClick={handleBackToHome}
                    variant="outline"
                    className="py-3 rounded font-semibold text-sm md:text-base border-black text-black hover:bg-black hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-lg" style={{ backgroundColor: '#193a59' }}>
              <h4 className="text-lg md:text-xl font-bold text-white mb-4">Qualification Requirements</h4>
              <ul className="space-y-2 text-white">
                {qualificationRequirements.map((req, index) => (
                  <li key={index} className="text-sm md:text-base">• {req}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title} FAQ
            </h2>
            
            <div className="space-y-6">
              {faq.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Industries Section */}
      {relatedIndustries && relatedIndustries.length > 0 && (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                Which Industries Use {title.toLowerCase().includes('merchant cash advance') || title.toLowerCase().includes('client cash advance') ? 'Merchant Cash Advance' : title}?
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Our {title.toLowerCase()} solutions serve diverse industries with unique financing needs. Explore how businesses in these sectors leverage our funding:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {relatedIndustries.map((industry, index) => (
                <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-xl hover:border-[#193a59] transition-all duration-300 transform hover:scale-105 group">
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
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
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
            
            <div className="text-center mt-12 md:mt-16">
              <Button
                onClick={() => {
                  setLocation('/who-we-fund');
                  window.scrollTo(0, 0);
                }}
                size="lg"
                style={{ backgroundColor: '#193a59', color: 'white' }}
                className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
                data-testid="button-view-all-industries"
              >
                View All Industries We Fund
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}