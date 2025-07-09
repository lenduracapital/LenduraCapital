import { useEffect } from 'react';
import SEOHead from '@/components/seo-head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import EnhancedSEO from '@/components/enhanced-seo';
import EnhancedSchema from '@/components/enhanced-schema';
import ConversionTracking from '@/components/conversion-tracking';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title="Contact FundTek Capital Group - Get Business Funding Help"
        description="Contact FundTek Capital Group for business funding assistance. Our specialists provide personalized support for loans, equipment financing, and working capital solutions."
        keywords="contact business funding, FundTek Capital Group, business loan help, funding assistance, financial advisor"
        canonical="https://fundtekcapitalgroup.com/contact"
        type="website"
      />
      <EnhancedSEO pageTitle="Contact FundTek Capital Group" />
      <EnhancedSchema type="homepage" />
      <ConversionTracking eventType="page_view" eventData={{ page_title: "Contact Us" }} />
      
      <div className="min-h-screen bg-gray-50">
        <Header transparent={false} />
        
        {/* Hero Section */}
        <section className="pt-32 md:pt-40 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact FundTek Capital Group
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ready to secure funding for your business? Our specialists are here to help you find the perfect financing solution.
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 text-lg mb-8">
                    Speak with our financing specialists who understand your industry and can guide you to the right funding solution.
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div style={{ backgroundColor: '#85abe4' }} className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Phone</h3>
                      <a href="https://calendly.com/fundtekcapitalgroup" className="text-[#85abe4] hover:text-[#7498d1] font-medium">
                        (305) 307-4658
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div style={{ backgroundColor: '#85abe4' }} className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Email</h3>
                      <a href="mailto:admin@fundtekcapitalgroup.com" className="text-[#85abe4] hover:text-[#7498d1] font-medium">
                        admin@fundtekcapitalgroup.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div style={{ backgroundColor: '#85abe4' }} className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">Address</h3>
                      <p className="text-gray-600">
                        2727 Coney Island Ave<br />
                        Brooklyn, NY 11235
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-4">Business Hours</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Mon : 09:00 am - 07:30 pm</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Tue : 09:00 am - 07:30 pm</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Wed : 09:00 am - 07:30 pm</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Thu : 09:00 am - 07:30 pm</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Fri : 09:00 am - 07:30 pm</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[#85abe4] mr-3">✓</span>
                        <span className="text-black">Sat & Sun : Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Response Promise */}
                <div style={{ backgroundColor: '#85abe4' }} className="p-6 rounded-lg">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Same-Day Response Guarantee
                  </h3>
                  <p className="text-white">
                    Get funding decisions within 24 hours. Our specialists are standing by to provide immediate assistance with your business financing needs.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6">
                  Request Information
                </h3>
                
                <div className="w-full">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg border border-blue-200 mb-6">
                    <div className="text-center">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Get Working Capital Today</h4>
                      <p className="text-sm sm:text-base text-gray-600 mb-0">
                        Complete the form below - all fields are visible without scrolling.
                      </p>
                    </div>
                  </div>
                  
                  {/* Full-View Embedded Form */}
                  <div className="w-full relative">
                    <iframe
                      id="JotFormIFrame-251674789886078"
                      title="FundTek Capital Group Contact Form"
                      onLoad={() => window.parent.scrollTo(0, 0)}
                      allowtransparency="true"
                      allow="geolocation; microphone; camera; fullscreen"
                      src="https://form.jotform.com/251674789886078"
                      frameBorder="0"
                      style={{
                        minWidth: '100%',
                        maxWidth: '100%',
                        height: '1000px',
                        border: 'none',
                      }}
                      className="w-full rounded-lg"
                      scrolling="no"
                    />
                  </div>
                  
                  {/* Fallback Link */}
                  <div className="mt-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-500 mb-2">
                      Having trouble with the form?
                    </p>
                    <button
                      onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
                      className="text-[#85abe4] hover:text-[#7498d1] text-sm font-medium underline transition-colors"
                    >
                      Open in new tab
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-black mb-6">
                Next Steps - Your Path to Funding
              </h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Getting business funding with FundTek is straightforward. Here's exactly what to expect from application to approval.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* How to Apply */}
              <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-[#85abe4]">
                <div style={{ backgroundColor: '#85abe4' }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#85abe4] mb-4 text-center">How to Apply</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold text-[#85abe4] mr-2">1.</span>
                    Complete our 5-minute online application
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-[#85abe4] mr-2">2.</span>
                    Upload 3 months of bank statements
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-[#85abe4] mr-2">3.</span>
                    Provide basic business information
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-[#85abe4] mr-2">4.</span>
                    Submit driver's license and voided check
                  </li>
                </ul>
              </div>

              {/* What to Expect */}
              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-400">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-green-600 mb-4 text-center">What to Expect</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">1.</span>
                    Same-day review of your application
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">2.</span>
                    Pre-approval within 24 hours
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">3.</span>
                    Funding options presented to you
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-green-600 mr-2">4.</span>
                    Funds deposited in your account
                  </li>
                </ul>
              </div>

              {/* Why Choose Us */}
              <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-400">
                <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-6">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-purple-600 mb-4 text-center">Why Choose FundTek</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-semibold text-purple-600 mr-2">✓</span>
                    50+ financing specialists
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-purple-600 mr-2">✓</span>
                    $5,000 to $20,000,000 funding range
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-purple-600 mr-2">✓</span>
                    12 different financing solutions
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold text-purple-600 mr-2">✓</span>
                    No impact on your FICO score
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Get Started */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-[#85abe4] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't let cash flow challenges hold your business back. Get the funding you need to grow and succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
                className="bg-[#85abe4] hover:bg-[#7498d1] text-white font-semibold py-4 px-8 rounded-lg transition-colors"
              >
                Apply for Funding
              </button>
              <a
                href="https://calendly.com/fundtekcapitalgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#85abe4] text-[#85abe4] hover:bg-[#85abe4] hover:text-white font-semibold py-4 px-8 rounded-lg transition-colors"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}