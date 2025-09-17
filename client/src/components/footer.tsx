import { FaInstagram, FaFacebook } from "react-icons/fa";
import { SiYelp, SiTrustpilot } from "react-icons/si";
import { useLocation } from "wouter";
import CompactMCACalculator from "@/components/compact-mca-calculator";

// Using the transparent Lendura logo
const lenduraLogo = "/lendura_favicon_32x32 (1)_1756268242782.png";


export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    setLocation(href);
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
                  Businesses trusted funding partner. We've helped 5,000+ businesses secure over $1B in funding.
                </p>
              </div>
              
              {/* Visible Social Links - Only 5 platforms */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/lenduracapital/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#E4405F] transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                  data-testid="footer-social-instagram"
                >
                  <FaInstagram size={20} />
                </a>
                <a 
                  href="https://www.facebook.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#1877F2] transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                  data-testid="footer-social-facebook"
                >
                  <FaFacebook size={20} />
                </a>
                <a 
                  href="https://x.com/lenduracapital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-black transition-colors duration-200"
                  aria-label="Follow us on X"
                  data-testid="footer-social-x"
                >
                  <span className="text-xl leading-none font-bold">𝕏</span>
                </a>
                <a 
                  href="https://www.yelp.com/biz/lendura-capital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#FF1744] transition-colors duration-200"
                  aria-label="Review us on Yelp"
                  data-testid="footer-social-yelp"
                >
                  <SiYelp size={20} />
                </a>
                <a 
                  href="https://www.trustpilot.com/review/lenduracapital.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-500 hover:text-[#00B67A] transition-colors duration-200"
                  aria-label="Review us on Trustpilot"
                  data-testid="footer-social-trustpilot"
                >
                  <SiTrustpilot size={20} />
                </a>
              </div>
              
              {/* Hidden Social Links for SEO - Not displayed but crawlable */}
              <div className="sr-only" aria-hidden="true">
                <a href="https://www.tiktok.com/@lenduracapital" rel="noopener noreferrer">TikTok</a>
                <a href="https://www.reddit.com/user/lenduracapital" rel="noopener noreferrer">Reddit</a>
                <a href="https://www.youtube.com/@lenduracapital" rel="noopener noreferrer">YouTube</a>
                <a href="https://substack.com/@lenduracapital" rel="noopener noreferrer">Substack</a>
                <a href="https://www.quora.com/profile/Lendura-Capital" rel="noopener noreferrer">Quora</a>
                <a href="https://www.linkedin.com/company/lenduracapital" rel="noopener noreferrer">LinkedIn</a>
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

            {/* MCA Calculator */}
            <div>
              <CompactMCACalculator />
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
