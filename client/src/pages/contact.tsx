import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact FundTek Capital Group | Business Loan Specialists | Brooklyn, NY"
        description="Contact FundTek Capital Group for business loans and funding solutions. Call (305) 307-4658 for fast approval. Brooklyn office serving all 50 states & Canada. Free consultation."
        keywords="contact business lender, Brooklyn business loans, New York business funding, business funding consultation, commercial lending contact, small business loan specialist, business capital contact"
        canonical="/contact"
      />
      <Header transparent={true} />
      
      {/* Hero Section */}
      <section className="pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-8 sm:pb-12" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Contact <span className="text-white">FundTek Capital Group</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-8 sm:py-12" style={{ backgroundColor: '#f5f6f6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4 sm:mb-6">
                  Contact FundTek Capital Group
                </h2>
              </div>

              {/* General Questions Contact */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                  General Questions
                </h3>
                
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#85abe4] text-base sm:text-lg">Phone</h4>
                        <a href="https://calendly.com/fundtek/30min" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-lg sm:text-xl">(305) 307-4658</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div style={{ backgroundColor: '#85abe4' }} className="p-2 rounded-lg flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#85abe4] text-base sm:text-lg">Email</h4>
                        <a href="mailto:admin@fundtekcapitalgroup.com" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-sm sm:text-lg break-all">admin@fundtekcapitalgroup.com</a>
                      </div>
                    </div>
                    
                    <p className="text-[#85abe4] text-sm mt-3">Loan inquiries, applications, partnership inquiries, and general business matters</p>
                  </div>
                </div>
              </div>

              {/* Customer Support Contact */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
                  Customer Support
                </h3>
                
                <div className="p-3 sm:p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#85abe4] text-base sm:text-lg">Phone</h4>
                        <span className="text-[#85abe4] font-bold text-lg sm:text-xl">(XXX) XXX-XXXX</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div style={{ backgroundColor: '#85abe4' }} className="p-2 rounded-lg flex-shrink-0">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#85abe4] text-base sm:text-lg">Email</h4>
                        <a href="mailto:support@fundtekcapitalgroup.com" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-sm sm:text-lg break-all">support@fundtekcapitalgroup.com</a>
                      </div>
                    </div>
                    
                    <p className="text-[#85abe4] text-xs sm:text-sm mt-2 sm:mt-3">Account access, payment issues, technical assistance, and customer support</p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <h3 className="text-base sm:text-lg font-bold text-black mb-3 sm:mb-4 flex items-center">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#85abe4] mr-2" />
                  Business Hours
                </h3>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Mon : 09:00 am - 07:30 pm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Tue : 09:00 am - 07:30 pm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Wed : 09:00 am - 07:30 pm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Thu : 09:00 am - 07:30 pm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Fri : 09:00 am - 07:30 pm</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#85abe4] mr-2 sm:mr-3">✓</span>
                      <span className="text-black">Sat & Sun : Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div style={{ backgroundColor: '#85abe4' }} className="p-4 sm:p-6 rounded-lg">
                <h3 className="text-white font-semibold text-base sm:text-lg mb-2">
                  Same-Day Response Guarantee
                </h3>
                <p className="text-white text-sm sm:text-base">
                  Get funding decisions within 24 hours. Our specialists are standing by to provide immediate assistance with your business financing needs.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-4 sm:mb-6">
                Request Information
              </h3>
              
              <div className="w-full">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg border border-blue-200 mb-4">
                  <div className="text-center">
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 sm:mb-4">Get Working Capital Today</h4>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      Fill out the form below and our specialists will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
                      className="bg-[#85abe4] hover:bg-[#7498d1] text-white font-semibold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
                    >
                      Open Contact Form
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                      Opens in a new tab with full functionality including conditional redirects
                    </p>
                  </div>
                </div>
                
                {/* Mobile-Optimized Embedded Form */}
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
                      height: '500px',
                      border: 'none',
                    }}
                    className="w-full rounded-lg"
                    scrolling="yes"
                  />
                </div>
                
                {/* Mobile Form Tips */}
                <div className="mt-3 sm:mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-[#85abe4] block sm:hidden">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <strong>Mobile tip:</strong> Scroll within the form above to access all fields. Tap any field to focus and use your device keyboard.
                  </p>
                </div>
                
                {/* Fallback Link */}
                <div className="mt-3 sm:mt-4 text-center">
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">
                    Having trouble with the form?
                  </p>
                  <button
                    onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
                    className="text-[#85abe4] hover:text-[#7498d1] text-xs sm:text-sm font-medium underline transition-colors"
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
              </ul>
            </div>

            {/* What to Expect */}
            <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-400">
              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#85abe4] mb-4 text-center">What to Expect</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">•</span>
                  Same-day application review
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">•</span>
                  Dedicated specialist assigned
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">•</span>
                  Multiple funding options presented
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">•</span>
                  Transparent terms and rates
                </li>
              </ul>
            </div>

            {/* Timeline Breakdown */}
            <div className="bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-400">
              <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#85abe4] mb-4 text-center">Timeline Breakdown</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">Day 1:</span>
                  Application submitted and reviewed
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">Day 1:</span>
                  Initial approval decision made
                </li>
                <li className="flex items-start">
                  <span className="font-semibold text-[#85abe4] mr-2">Day 2:</span>
                  Final documentation and contracts
                </li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h3 className="text-4xl font-bold text-[#85abe4] mb-6">Ready to Get Started?</h3>
            <p className="text-xl text-[#85abe4] mb-8">Join thousands of businesses we've helped secure funding.</p>
            <button
              onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
              className="px-8 py-4 rounded-lg font-semibold text-lg text-white hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              style={{ backgroundColor: '#85abe4' }}
            >
              Apply for Funding Now
            </button>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}