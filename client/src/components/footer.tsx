import { FaInstagram, FaFacebook } from "react-icons/fa";
import { useLocation } from "wouter";

// Using the white and blue Lendura logo
const lenduraLogo = "/ChatGPT Image Aug 26, 2025, 04_32_58 PM_1756258409289.png";

const financingSolutions = [
  { name: "Small Business Term Loans", href: "/solutions/term-loans" },
  { name: "Business Lines of Credit", href: "/solutions/lines-of-credit" },
  { name: "Merchant Cash Advance", href: "/solutions/merchant-cash-advance" },
  { name: "SBA Loan Programs", href: "/solutions/sba-loans" },
  { name: "Business Debt Consolidation", href: "/solutions/debt-consolidation" },
  { name: "Equipment Financing", href: "/solutions/equipment-financing" },
  { name: "Invoice Factoring Services", href: "/solutions/invoice-factoring" },
  { name: "Purchase Order Financing", href: "/solutions/po-financing" },
  { name: "Business Credit Repair", href: "/solutions/credit-services" },
  { name: "Digital Marketing Services", href: "/solutions/seo-web-development" },
  { name: "Credit Card Processing", href: "/solutions/credit-card-processing" },
  { name: "Commercial Real Estate Lending", href: "/solutions/commercial-real-estate-lending" }
];

const companyPages = [
  { name: "About Lendura", href: "/about" },
  { name: "Qualified Industries", href: "/qualified-industries" },
  { name: "Testimonials", href: "/more-testimonials" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQ", href: "/faq" },
  { name: "CRE Lending", href: "/solutions/commercial-real-estate-lending" }
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    setLocation(href);
  };

  return (
    <footer className="bg-[#d9d9d9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Three-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column - Company Info */}
          <div className="space-y-6">
            <div>
              <img 
                src={lenduraLogo} 
                alt="Lendura Capital" 
                className="h-16 w-auto"
              />
            </div>
            
            <p className="text-gray-800 text-sm">
              Looking for funding? Call us at{" "}
              <a 
                href="tel:3058347168" 
                className="font-semibold text-gray-800 hover:underline"
              >
                (305) 834-7168
              </a>{" "}
              or apply online today.
            </p>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://www.instagram.com/lenduracapital/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#2AD0C5] transition-colors duration-200"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://x.com/lenduracapital" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#2AD0C5] transition-colors duration-200"
              >
                <span className="text-2xl leading-none font-bold">𝕏</span>
              </a>
              <a 
                href="https://www.facebook.com/lenduracapital" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-[#2AD0C5] transition-colors duration-200"
              >
                <FaFacebook size={24} />
              </a>
            </div>
          </div>

          {/* Middle Column - Financing Solutions */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6">Financing Solutions</h3>
            <ul className="space-y-3">
              {financingSolutions.map((solution, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(solution.href)}
                    className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-colors duration-200 text-left bg-transparent border-none p-0 cursor-pointer"
                  >
                    {solution.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Company Pages */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {companyPages.map((page, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(page.href)}
                    className="text-gray-700 hover:text-gray-900 hover:underline text-sm transition-colors duration-200 text-left bg-transparent border-none p-0 cursor-pointer"
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Legal Links */}
            <div className="mt-8 pt-6 border-t border-gray-400">
              <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                <button
                  onClick={() => handleNavigation("/privacy")}
                  className="hover:underline bg-transparent border-none p-0 cursor-pointer text-xs text-gray-600"
                >
                  Privacy Policy
                </button>
                <span>|</span>
                <button
                  onClick={() => handleNavigation("/terms")}
                  className="hover:underline bg-transparent border-none p-0 cursor-pointer text-xs text-gray-600"
                >
                  Terms
                </button>
                <span>|</span>
                <button
                  onClick={() => handleNavigation("/cookies")}
                  className="hover:underline bg-transparent border-none p-0 cursor-pointer text-xs text-gray-600"
                >
                  Cookies
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-gray-400 mt-12 pt-8 text-center">
          <p className="text-gray-700 text-sm">
            © 2025 Lendura Capital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
