import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ProcessSection from "@/components/process-section";
import ServicesSection from "@/components/services-section";
import IndustryServicesSection from "@/components/industry-services-section";
import TrustSignalsSection from "@/components/trust-signals-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactFormSection from "@/components/contact-form-section";
import MoveBusinessForwardSection from "@/components/move-business-forward-section";
import BusinessSolutionsSection from "@/components/business-solutions-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";
import CookieBanner from "@/components/CookieBanner";
import CountUp from "@/components/count-up";
import SEOHead from "@/components/seo-head";

export default function Home() {
  return (
    <>
      <SEOHead 
        title="FundTek Capital Group - Fast Business Financing Solutions | Get Approved in 24 Hours"
        description="Get fast business funding with FundTek Capital Group. Term loans, SBA loans, equipment financing, and more. 50+ specialists, 12 financing solutions, approval in 24 hours."
        keywords="business funding, term loans, SBA loans, equipment financing, merchant cash advance, business loans, working capital"
        canonical="/"
        type="website"
      />
      
      <div className="min-h-screen bg-white">
        <Header transparent={true} />
        
        <main>
          <HeroSection />
          <ProcessSection />
          
          {/* Working Capital Section with Rolling Statistics */}
          <section className="py-16 md:py-24" style={{ backgroundColor: '#85abe4' }}>
            <div className="container mx-auto px-4">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Accelerate the growth of your business</h2>
                <p className="text-xl mb-12 max-w-3xl mx-auto">
                  Frustrated by funding delays? Connect one-on-one with a dedicated specialist who understands your industry and can tailor solutions to your unique business and operational goals.
                </p>
                
                {/* Rolling Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp end={50} suffix="+" />
                    </div>
                    <p className="text-lg">Expert financing specialists who tailor solutions to your unique business and operational goals</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp end={12} />
                    </div>
                    <p className="text-lg">12 financing solutions and small business products</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp end={20} prefix="$" suffix="M" />
                    </div>
                    <p className="text-lg">Unsecured funding up to $20,000,000</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      <CountUp end={24} suffix=" hrs" />
                    </div>
                    <p className="text-lg">Get funding in 24 hours</p>
                  </div>
                </div>

                {/* Traditional Banks vs FundTek Comparison */}
                <div className="max-w-4xl mx-auto mb-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Traditional Banks */}
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-red-700 mb-4">Traditional Banks</h3>
                      <ul className="space-y-3 text-red-600">
                        <li className="flex items-center">
                          <span className="text-red-500 mr-3 text-xl">✗</span>
                          <span>Slow approval process (weeks/months)</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-500 mr-3 text-xl">✗</span>
                          <span>High collateral requirements</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-500 mr-3 text-xl">✗</span>
                          <span>Strict credit score requirements</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-red-500 mr-3 text-xl">✗</span>
                          <span>Limited funding options</span>
                        </li>
                      </ul>
                    </div>

                    {/* FundTek Capital Group */}
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-green-700 mb-4">FundTek Capital Group</h3>
                      <ul className="space-y-3 text-green-600">
                        <li className="flex items-center">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span>Fast approval in 24 hours</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span>Flexible collateral requirements</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span>550+ credit score accepted</span>
                        </li>
                        <li className="flex items-center">
                          <span className="text-green-500 mr-3 text-xl">✓</span>
                          <span>12 diverse funding solutions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* FundTek Tailored Section */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* No Impact Card */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">No Impact On Your FICO</h3>
                    <p className="text-lg">Our application process won't affect your credit score during the initial review</p>
                  </div>

                  {/* 5 Min Application */}
                  <div className="bg-blue-900 rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">5 Min. Application Process</h3>
                    <p className="text-lg mb-4">Quick and simple application to get you approved fast</p>
                    <button 
                      onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
                      className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>

                  {/* Expert Advice */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                    <h3 className="text-2xl font-bold mb-4">Get 1-2-1 advice from experts</h3>
                    <p className="text-lg">Speak directly with our specialists for personalized guidance</p>
                  </div>
                </div>

                {/* Information Needed & Minimum Qualifications */}
                <div className="flex flex-col md:flex-row gap-8 max-w-4xl">
                  {/* Information Needed */}
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Information Needed</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Personal Info</h4>
                        <p className="text-sm">Basic contact details</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Business Info</h4>
                        <p className="text-sm">Company details</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Bank Connection</h4>
                        <p className="text-sm">Financial verification</p>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Qualifications */}
                  <div className="md:w-1/2">
                    <h3 className="text-2xl font-bold mb-4">Minimum Qualifications</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span>550+ credit score</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span>6+ months in business</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-400 mr-3 text-xl">✓</span>
                        <span>$10K+ monthly revenue</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => window.location.href = '/solutions'}
                  className="bg-white text-[#85abe4] px-8 py-4 text-xl rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg mt-8"
                >
                  Browse 12 Funding Solutions
                </button>
              </div>
            </div>
          </section>

          <IndustryServicesSection />
          <TrustSignalsSection />
          <TestimonialsSection />
          <ContactFormSection />
          <MoveBusinessForwardSection />
          <BusinessSolutionsSection />
          
          {/* Custom Small Business Solutions Section */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/api/placeholder/1920/800')`,
                filter: 'brightness(0.7)'
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Personalized Small Business Solutions
                </h2>
                <p className="text-xl text-white mb-8 leading-relaxed">
                  Meet your Goals. Grow your Business. Beyond traditional financing, we provide comprehensive solutions to address the operational challenges that prevent businesses from reaching their full potential.
                </p>
                <p className="text-lg text-white/90 mb-8">
                  Whether it's outdated technology systems, inefficient processes, or scaling challenges, our team connects you with the right resources and expertise to overcome these obstacles and accelerate your business growth.
                </p>
                <button 
                  onClick={() => window.location.href = '/solutions'}
                  className="bg-[#85abe4] text-white px-8 py-4 text-lg rounded-lg font-semibold hover:bg-[#7299d6] transition-colors shadow-lg"
                >
                  Find out more
                </button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <ChatWidget />
        <CookieBanner />
      </div>
    </>
  );
}