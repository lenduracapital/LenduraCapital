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
      <section className="pt-24 md:pt-32 lg:pt-40 pb-12" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-6">
              Contact <span className="text-white">FundTek Capital Group</span>
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Ready to secure funding for your business? Our team of financial experts is here to help you find the perfect financing solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-12" style={{ backgroundColor: '#f5f6f6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Contact FundTek Capital Group
                </h2>
              </div>

              {/* Phone Numbers Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-black mb-6 flex items-center">
                  <Phone className="h-6 w-6 text-green-500 mr-3" />
                  Phone Support
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                    <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#85abe4] text-lg">General Questions</h4>
                      <a href="https://calendly.com/fundtek/30min" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-xl">(305) 307-4658</a>
                      <p className="text-[#85abe4] text-sm mt-1">Loan inquiries, applications, and general information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                    <div className="bg-green-500 p-2 rounded-lg flex-shrink-0">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#85abe4] text-lg">Support Line</h4>
                      <span className="text-[#85abe4] font-bold text-xl">(XXX) XXX-XXXX</span>
                      <p className="text-[#85abe4] text-sm mt-1">Account access, payment issues, and technical assistance</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-black mb-6 flex items-center">
                  <Mail className="h-6 w-6 text-[#85abe4] mr-3" />
                  Email Support
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                    <div style={{ backgroundColor: '#85abe4' }} className="p-2 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#85abe4] text-lg">General Inquiries</h4>
                      <a href="mailto:admin@fundtekcapitalgroup.com" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-lg">admin@fundtekcapitalgroup.com</a>
                      <p className="text-[#85abe4] text-sm mt-1">Business funding questions and loan applications</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-[#85abe4]">
                    <div style={{ backgroundColor: '#85abe4' }} className="p-2 rounded-lg flex-shrink-0">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#85abe4] text-lg">Customer Support</h4>
                      <a href="mailto:support@fundtekcapitalgroup.com" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-bold text-lg">support@fundtekcapitalgroup.com</a>
                      <p className="text-[#85abe4] text-sm mt-1">Account support, payment assistance, and technical help</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours & Location */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center">
                      <Clock className="h-5 w-5 text-[#85abe4] mr-2" />
                      Business Hours
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="font-medium text-black">Monday - Friday:</span>
                          <span className="text-gray-600">9:00 AM - 7:30 PM EST</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium text-black">Weekends:</span>
                          <span className="text-gray-600">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-black mb-4 flex items-center">
                      <MapPin className="h-5 w-5 text-[#85abe4] mr-2" />
                      Office Location
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 font-medium">
                        2727 Coney Island Ave<br />
                        Brooklyn, NY 11235
                      </p>
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
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6">
                Request Information
              </h3>
              
              <div className="w-full">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg border border-blue-200">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Get Working Capital Today</h3>
                    <p className="text-gray-600 mb-6">
                      Ready to secure funding for your business? Click below to access our secure application form.
                    </p>
                    <button
                      onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
                      className="bg-[#85abe4] hover:bg-[#7498d1] text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
                    >
                      Open Contact Form
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                      Opens in a new tab with full functionality including conditional redirects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-6">
              Why Choose FundTek Capital Group?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div style={{ backgroundColor: '#85abe4' }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Quick Approvals</h3>
              <p className="text-gray-600">
                Get approved in as little as 24 hours with our streamlined application process.
              </p>
            </div>

            <div className="text-center">
              <div style={{ backgroundColor: '#85abe4' }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Work directly with experienced funding specialists who understand your industry.
              </p>
            </div>

            <div className="text-center">
              <div style={{ backgroundColor: '#85abe4' }} className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-3">Flexible Solutions</h3>
              <p className="text-gray-600">
                Multiple financing options tailored to your specific business needs and goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6" style={{ color: '#85abe4' }}>
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8" style={{ color: '#85abe4' }}>
            Don't wait - secure the funding your business needs today.
          </p>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="px-8 py-4 rounded-lg font-semibold text-lg text-white hover:bg-[#7299d1] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: '#85abe4' }}
          >
            Apply for Funding Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}