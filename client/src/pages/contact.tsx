import Header from "@/components/header";
import Footer from "@/components/footer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
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
                  Partner with FundTek Capital Group
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  Ready to accelerate your business growth? Our dedicated funding specialists provide personalized solutions tailored to your unique business needs. From same-day approvals to flexible terms, we make business financing simple and accessible.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Direct Line</h3>
                    <p className="text-gray-600">(305) 307-4658</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Email</h3>
                    <p className="text-gray-600">admin@fundtekcapitalgroup.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div style={{ backgroundColor: '#85abe4' }} className="p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:30 AM - 7:30 PM EST</p>
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
                <iframe
                  src="https://form.jotform.com/251674789886078"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="yes"
                  title="Contact Form"
                  className="rounded-lg"
                  style={{ display: 'block', border: 'none' }}
                ></iframe>
                
                <script dangerouslySetInnerHTML={{
                  __html: `
                    // Listen for any errors from the iframe
                    window.addEventListener('message', function(event) {
                      if (event.origin === 'https://form.jotform.com') {
                        console.log('Jotform message received:', event.data);
                        
                        // Check if it's a redirect attempt
                        if (event.data && typeof event.data === 'object' && event.data.type === 'redirect') {
                          console.log('Jotform trying to redirect to:', event.data.url);
                          // Allow the redirect by navigating parent window
                          if (event.data.url) {
                            window.location.href = event.data.url;
                          }
                        }
                      }
                    });
                    
                    // Log any iframe loading issues
                    const iframe = document.querySelector('iframe[src*="jotform"]');
                    if (iframe) {
                      iframe.onload = function() {
                        console.log('Jotform iframe loaded successfully');
                      };
                      iframe.onerror = function(e) {
                        console.error('Jotform iframe error:', e);
                      };
                    }
                  `
                }}</script>
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
            className="px-8 py-4 rounded-lg font-semibold text-lg text-white hover:opacity-90 transition-colors"
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