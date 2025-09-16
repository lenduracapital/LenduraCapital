import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Phone } from "lucide-react";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

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

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251965461165159", "_blank");
  };

  const handleBackToIndustries = () => {
    setLocation("/who-we-fund");
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title={`${data.title} | Fast Business Funding | Lendura Capital`}
        description={`${data.description} Get approved in 24 hours with competitive rates. Call (305) 834-7168 or apply online today.`}
        keywords={`${data.name.toLowerCase()} financing, ${data.name.toLowerCase()} business loans, ${data.name.toLowerCase()} equipment financing, ${data.name.toLowerCase()} working capital`}
        canonical={`/industries/${data.slug}`}
      />
      
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-[#193a59] to-[#285d8a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/30 to-transparent"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${data.heroImage})`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={handleBackToIndustries}
            style={{ backgroundColor: '#193a59', color: 'white' }}
            className="mb-8 text-white border-white hover:bg-white hover:text-[#193a59] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95"
            data-testid="button-back-industries"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Industries
          </Button>
          
          <div className="text-left max-w-4xl mt-8 md:mt-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="text-industry-title">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed" data-testid="text-industry-description">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleApplyNow}
                size="lg"
                style={{ backgroundColor: '#193a59', color: 'white' }}
                className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
                data-testid="button-apply-now"
              >
                Get Approved in 24 Hours
              </Button>
              <Button 
                onClick={() => setLocation("/solutions")}
                size="lg"
                style={{ color: 'white', borderColor: '#193a59', backgroundColor: '#193a59' }}
                className="hover:bg-[#285d8a] hover:border-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold border shadow-lg"
                data-testid="button-view-solutions"
              >
                View All Solutions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8" data-testid="text-overview-title">
                {data.overviewTitle}
              </h2>
              <div className="text-lg md:text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed space-y-4">
                {data.overviewContent.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">Common Financing Needs</h3>
              <ul className="space-y-4 mb-8 md:mb-12" data-testid="list-financing-needs">
                {data.commonNeeds.map((need, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#193a59' }} />
                    <span className="text-gray-700">{need}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img 
                src={data.heroImage}
                alt={data.heroImageAlt}
                className="w-full h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-xl"
                data-testid="img-industry-hero"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#193a59] text-white p-6 rounded-lg shadow-lg">
                <div className="text-sm font-medium text-white">Fast Approval</div>
                <div className="text-2xl font-bold text-white">24-48hrs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Financing Steps */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#193a59' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Get Business Financing
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Our streamlined process makes it easy to get the funding your {data.name.toLowerCase()} business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                step: "1",
                title: "Apply Online",
                description: "Complete our simple application in minutes with basic business information"
              },
              {
                step: "2", 
                title: "Get Pre-Approved",
                description: "Receive preliminary approval within hours, not days or weeks"
              },
              {
                step: "3",
                title: "Receive Funding",
                description: "Get funds deposited directly into your business account in 24-48 hours"
              }
            ].map((step, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-white text-[#193a59] rounded-full text-xl md:text-2xl font-bold mb-4 md:mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-blue-100 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
            Ready to Grow Your {data.name} Business?
          </h2>
          <p className="text-xl text-gray-700 mb-8 md:mb-12 leading-relaxed">
            Get the financing you need with competitive rates and fast approval times. 
            Our {data.name.toLowerCase()} financing experts are ready to help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              onClick={handleApplyNow}
              size="lg"
              style={{ backgroundColor: '#193a59', color: 'white' }}
              className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg"
              data-testid="button-cta-apply"
            >
              Apply Now - Get Approved Fast
            </Button>
            
            <div className="flex items-center text-[#193a59] font-semibold">
              <Phone className="w-5 h-5 mr-2" />
              <a href="https://calendly.com/sam-lenduracapital/30min" target="_blank" rel="noopener noreferrer" className="hover:text-[#285d8a] transition-colors" data-testid="link-phone">
                (305) 834-7168
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#193a59]">24-48hrs</div>
              <div className="text-sm text-gray-600">Approval Time</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#193a59]">$10K+</div>
              <div className="text-sm text-gray-600">Funding Amount</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#193a59]">99%+</div>
              <div className="text-sm text-gray-600">Approval Rate</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="text-2xl font-bold text-[#193a59]">500+</div>
              <div className="text-sm text-gray-600">Credit Score OK</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}