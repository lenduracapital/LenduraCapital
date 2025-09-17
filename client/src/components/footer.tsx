import { FaInstagram, FaFacebook } from "react-icons/fa";
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
    <footer className="bg-slate-50 text-gray-800">
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
                <p className="text-gray-600 text-sm leading-relaxed">
                  Brooklyn's trusted business funding partner. We've helped 500+ businesses secure over $50M in funding.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/lenduracapital/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#193a59] transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href="https://x.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#193a59] transition-colors duration-200"
                  aria-label="Follow us on X"
                >
                  <span className="text-xl leading-none font-bold">𝕏</span>
                </a>
                <a 
                  href="https://www.facebook.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#193a59] transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              </div>
            </div>

            {/* Popular Solutions */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">Popular Solutions</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation("/solutions/sba-loans")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">SBA Loans</button></li>
                <li><button onClick={() => handleNavigation("/solutions/term-loans")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Business Term Loans</button></li>
                <li><button onClick={() => handleNavigation("/solutions/lines-of-credit")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Lines of Credit</button></li>
                <li><button onClick={() => handleNavigation("/solutions/equipment-financing")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Equipment Financing</button></li>
                <li><button onClick={() => handleNavigation("/solutions/merchant-cash-advance")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Cash Advance</button></li>
                <li><button onClick={() => handleNavigation("/solutions")} className="text-[#193a59] hover:text-gray-700 text-sm font-semibold transition-colors">View All Solutions →</button></li>
              </ul>
            </div>

            {/* Industries We Serve */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">Industries We Fund</h3>
              <ul className="space-y-2">
                <li><button onClick={() => handleNavigation("/industries/restaurant-food-service")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Restaurant & Food</button></li>
                <li><button onClick={() => handleNavigation("/industries/medical-healthcare")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Medical & Healthcare</button></li>
                <li><button onClick={() => handleNavigation("/industries/construction")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Construction</button></li>
                <li><button onClick={() => handleNavigation("/industries/retail-e-commerce")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Retail & E-commerce</button></li>
                <li><button onClick={() => handleNavigation("/industries/professional-services")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Professional Services</button></li>
                <li><button onClick={() => handleNavigation("/qualified-industries")} className="text-[#193a59] hover:text-gray-700 text-sm font-semibold transition-colors">View All Industries →</button></li>
              </ul>
            </div>

            {/* Company & Resources */}
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-4">Company & Resources</h3>
              <ul className="space-y-2 mb-6">
                <li><button onClick={() => handleNavigation("/about")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">About Lendura</button></li>
                <li><button onClick={() => handleNavigation("/more-testimonials")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Success Stories</button></li>
                <li><button onClick={() => handleNavigation("/guides")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Funding Guides</button></li>
                <li><button onClick={() => handleNavigation("/blog")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Industry Blog</button></li>
                <li><button onClick={() => handleNavigation("/contact")} className="text-gray-600 hover:text-[#193a59] text-sm transition-colors">Contact Us</button></li>
              </ul>
              
              {/* CTA Section */}
              <div className="bg-[#193a59] rounded-lg p-4 text-center text-white">
                <p className="text-xs mb-3">Ready to Get Funded?</p>
                <Button
                  onClick={handleApplyNow}
                  className="bg-white text-[#193a59] hover:bg-gray-100 font-bold text-sm px-4 py-2 rounded mb-2 w-full transition-all duration-300"
                  data-testid="footer-cta-apply"
                >
                  Apply Now
                </Button>
                <a 
                  href="tel:3058347168"
                  className="text-white font-bold text-sm hover:underline block"
                >
                  (305) 834-7168
                </a>
                <p className="text-xs text-gray-300 mt-1">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              © 2025 Lendura Capital. All rights reserved.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <button onClick={() => handleNavigation("/privacy")} className="hover:text-[#193a59] transition-colors">Privacy Policy</button>
              <span>•</span>
              <button onClick={() => handleNavigation("/terms")} className="hover:text-[#193a59] transition-colors">Terms & Conditions</button>
              <span>•</span>
              <button onClick={() => handleNavigation("/cookies")} className="hover:text-[#193a59] transition-colors">Cookies Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
