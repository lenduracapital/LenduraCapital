import Header from "@/components/header";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Contact FundTek Capital Group | Business Loan Specialists | Brooklyn, NY"
        description="Contact FundTek Capital Group for business loans and funding solutions. Call (305) 307-4658 for fast approval. Brooklyn office serving all 50 states & Canada. Free consultation."
        keywords="contact business lender, Brooklyn business loans, New York business funding, business funding consultation, commercial lending contact, small business loan specialist, business capital contact"
        canonical="/contact"
      />
      <Header transparent={false} />
      
      {/* Clean Contact Layout */}
      <section className="pt-32 md:pt-40 pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Company Name */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#85abe4] mb-6">
              FundTek Capital Group
            </h1>
            <p className="text-gray-600 text-lg">
              2727 Coney Island Ave, Brooklyn, New York 11235, United States
            </p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            
            {/* Left Column - Contact Details */}
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-800">T: </span>
                <a 
                  href="https://calendly.com/admin-fundtekcapitalgroup/30min" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#85abe4] transition-colors"
                >
                  (305) 307-4658
                </a>
              </div>
              
              <div>
                <span className="font-semibold text-gray-800">F: </span>
                <span className="text-gray-600">(305) 307-4658</span>
              </div>
              
              <div>
                <span className="font-semibold text-gray-800">E: </span>
                <a 
                  href="mailto:admin@fundtekcapitalgroup.com"
                  className="text-gray-600 hover:text-[#85abe4] transition-colors"
                >
                  admin@fundtekcapitalgroup.com
                </a>
              </div>
            </div>

            {/* Right Column - Business Hours */}
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Mon : 09:00 am – 06:00 pm</span>
              </div>
              <div>
                <span className="text-gray-600">Tue : 09:00 am – 06:00 pm</span>
              </div>
              <div>
                <span className="text-gray-600">Wed : 09:00 am – 06:00 pm</span>
              </div>
              <div>
                <span className="text-gray-600">Thu : 09:00 am – 06:00 pm</span>
              </div>
              <div>
                <span className="text-gray-600">Fri : 9:00 am – 06:00 pm</span>
              </div>
              <div>
                <span className="text-gray-600">Sat & Sun : Closed</span>
              </div>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-[#f4a261] mb-6">Connect With Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61577926551810"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#85abe4] rounded-full flex items-center justify-center text-white hover:bg-[#7299d1] transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#85abe4] rounded-full flex items-center justify-center text-white hover:bg-[#7299d1] transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/fundtekcapitalgroup"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#85abe4] rounded-full flex items-center justify-center text-white hover:bg-[#7299d1] transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Form Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => window.open('https://form.jotform.com/251674789886078', '_blank')}
              className="bg-[#85abe4] hover:bg-[#7299d1] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-105 active:scale-95 inline-flex items-center gap-2"
            >
              Get Working Capital Today
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}