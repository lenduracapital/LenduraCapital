import { FaInstagram, FaFacebook, FaPhone, FaShieldAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

// Using the white and blue Lendura logo
const lenduraLogo = "/ChatGPT Image Aug 26, 2025, 04_32_58 PM_1756258409289.png";


export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    setLocation(href);
  };

  const handleApplyNow = () => {
    window.location.href = '/apply-now';
  };

  return (
    <footer className="bg-[#193a59] text-white">
      {/* Main CTA Section */}
      <div className="bg-[#2a4a6b] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Fund Your Business Growth?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get pre-approved in minutes. No collateral required. Funding in as fast as 24 hours.
          </p>
          
          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              <span>500+ Businesses Funded</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-400" />
              <span>24 Hour Approval</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-orange-400" />
              <span>A+ BBB Rating</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleApplyNow}
              className="bg-white text-[#193a59] hover:bg-gray-100 font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
              data-testid="footer-cta-apply"
            >
              Apply Now - Get Pre-Approved
            </Button>
            <a 
              href="tel:3058347168"
              className="flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#193a59] font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105"
              data-testid="footer-cta-call"
            >
              <FaPhone />
              Call (305) 834-7168
            </a>
          </div>
        </div>
      </div>

      {/* Links Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Column */}
            <div>
              <div className="mb-6">
                <img 
                  src={lenduraLogo} 
                  alt="Lendura Capital" 
                  className="h-12 w-auto mb-4"
                />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Brooklyn's trusted business funding partner. We've helped 500+ businesses secure over $50M in funding.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/lenduracapital/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href="https://x.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on X"
                >
                  <span className="text-xl leading-none font-bold">𝕏</span>
                </a>
                <a 
                  href="https://www.facebook.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>

            {/* Popular Solutions */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Popular Solutions</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation("/solutions/sba-loans")} className="text-gray-300 hover:text-white text-sm transition-colors">SBA Loans</button></li>
                <li><button onClick={() => handleNavigation("/solutions/term-loans")} className="text-gray-300 hover:text-white text-sm transition-colors">Business Term Loans</button></li>
                <li><button onClick={() => handleNavigation("/solutions/lines-of-credit")} className="text-gray-300 hover:text-white text-sm transition-colors">Lines of Credit</button></li>
                <li><button onClick={() => handleNavigation("/solutions/equipment-financing")} className="text-gray-300 hover:text-white text-sm transition-colors">Equipment Financing</button></li>
                <li><button onClick={() => handleNavigation("/solutions/merchant-cash-advance")} className="text-gray-300 hover:text-white text-sm transition-colors">Cash Advance</button></li>
                <li><button onClick={() => handleNavigation("/solutions")} className="text-white hover:text-gray-300 text-sm font-semibold transition-colors">View All Solutions →</button></li>
              </ul>
            </div>

            {/* Industries We Serve */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Industries We Fund</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation("/industries/restaurant-food-service")} className="text-gray-300 hover:text-white text-sm transition-colors">Restaurant & Food</button></li>
                <li><button onClick={() => handleNavigation("/industries/medical-healthcare")} className="text-gray-300 hover:text-white text-sm transition-colors">Medical & Healthcare</button></li>
                <li><button onClick={() => handleNavigation("/industries/construction")} className="text-gray-300 hover:text-white text-sm transition-colors">Construction</button></li>
                <li><button onClick={() => handleNavigation("/industries/retail-e-commerce")} className="text-gray-300 hover:text-white text-sm transition-colors">Retail & E-commerce</button></li>
                <li><button onClick={() => handleNavigation("/industries/professional-services")} className="text-gray-300 hover:text-white text-sm transition-colors">Professional Services</button></li>
                <li><button onClick={() => handleNavigation("/qualified-industries")} className="text-white hover:text-gray-300 text-sm font-semibold transition-colors">View All Industries →</button></li>
              </ul>
            </div>

            {/* Company & Resources */}
            <div>
              <h3 className="font-bold text-white text-lg mb-4">Company & Resources</h3>
              <ul className="space-y-2 mb-6">
                <li><button onClick={() => handleNavigation("/about")} className="text-gray-300 hover:text-white text-sm transition-colors">About Lendura</button></li>
                <li><button onClick={() => handleNavigation("/more-testimonials")} className="text-gray-300 hover:text-white text-sm transition-colors">Success Stories</button></li>
                <li><button onClick={() => handleNavigation("/guides")} className="text-gray-300 hover:text-white text-sm transition-colors">Funding Guides</button></li>
                <li><button onClick={() => handleNavigation("/blog")} className="text-gray-300 hover:text-white text-sm transition-colors">Industry Blog</button></li>
                <li><button onClick={() => handleNavigation("/contact")} className="text-gray-300 hover:text-white text-sm transition-colors">Contact Us</button></li>
              </ul>
              
              {/* Quick Contact */}
              <div className="bg-[#2a4a6b] rounded-lg p-4 text-center">
                <p className="text-xs text-gray-300 mb-2">Need Funding Fast?</p>
                <a 
                  href="tel:3058347168"
                  className="text-white font-bold text-sm hover:underline block"
                >
                  (305) 834-7168
                </a>
                <p className="text-xs text-gray-400 mt-1">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-600 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2025 Lendura Capital. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <button onClick={() => handleNavigation("/privacy")} className="hover:text-white transition-colors">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => handleNavigation("/terms")} className="hover:text-white transition-colors">Terms & Conditions</button>
              <span>•</span>
              <button onClick={() => handleNavigation("/cookies")} className="hover:text-white transition-colors">Cookies Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
