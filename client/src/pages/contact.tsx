import Header from "@/components/header";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header transparent={true} />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 lg:pt-40 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-black mb-6">
              Contact <span style={{ color: '#85abe4' }}>FundTek Capital Group</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to secure funding for your business? Our team of financial experts is here to help you find the perfect financing solution.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form Section */}
      <section className="py-20" style={{ backgroundColor: '#f5f6f6' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Whether you need working capital, equipment financing, or any other business funding solution, we're here to help. Contact us today to discuss your financing needs.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Phone</h3>
                    <p className="text-gray-600">(305) 307-4658</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Email</h3>
                    <p className="text-gray-600">admin@fundtekcapital.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>
              </div>

              {/* Quick Response Promise */}
              <div style={{ backgroundColor: '#85abe4' }} className="p-6 rounded-lg">
                <h3 className="text-white font-semibold text-lg mb-2">
                  Fast Response Guarantee
                </h3>
                <p className="text-white">
                  We respond to all inquiries within 24 hours. For urgent funding needs, call us directly at (305) 307-4658.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-6">
                Request Information
              </h3>
              
              <div className="w-full">
                <iframe
                  src="https://form.jotform.com/251674789886078"
                  width="100%"
                  height="680"
                  frameBorder="0"
                  scrolling="no"
                  title="Contact Form"
                  className="rounded-lg"
                  style={{ display: 'block', border: 'none', overflow: 'hidden' }}
                ></iframe>
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
      <section className="py-20" style={{ backgroundColor: '#85abe4' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white mb-8">
            Don't wait - secure the funding your business needs today.
          </p>
          <button 
            onClick={() => window.open("https://form.jotform.com/251417715331047", "_blank")}
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Apply for Funding Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}