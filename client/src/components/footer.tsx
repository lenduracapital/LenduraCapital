import { FaReddit, FaYoutube, FaTiktok } from "react-icons/fa";
import { SiSubstack, SiQuora } from "react-icons/si";
import { useLocation } from "wouter";
// Using the white and blue Lendura logo
const lenduraLogo = "/ChatGPT Image Aug 26, 2025, 04_32_58 PM_1756258409289.png";

const businessFinancing = [
  { name: "Term Loans", href: "/solutions/term-loans" },
  { name: "Lines of Credit", href: "/solutions/lines-of-credit" },
  { name: "SBA Loans", href: "/solutions/sba-loans" },
  { name: "Debt Consolidation", href: "/solutions/debt-consolidation" },
  { name: "Equipment Financing", href: "/solutions/equipment-financing" },
  { name: "Invoice Factoring", href: "/solutions/invoice-factoring" },
  { name: "P.O. Financing", href: "/solutions/po-financing" },
  { name: "Merchant Cash Advance", href: "/solutions/merchant-cash-advance" }
];

const customSolutions = [
  { name: "Credit Repair", href: "/solutions/credit-services" },
  { name: "Marketing", href: "/solutions/seo-web-development" },
  { name: "Credit Card Processing", href: "/solutions/credit-card-processing" }
];

const lenduraPages = [
  { name: "About Lendura", href: "/about" },
  { name: "Qualified Industries", href: "/qualified-industries" },
  { name: "Contact Us", href: "/contact" },
  { name: "Testimonials", href: "/more-testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "CRE Lending", href: "/solutions/commercial-real-estate-lending" }
];

const legalPages = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookies Policy", href: "/cookies" }
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    setLocation(href);
  };

  return (
    <footer className="bg-[#d9d9d9] border-t border-gray-200 py-8 md:py-12 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start" style={{ pointerEvents: 'auto' }}>
          <div className="space-y-3 md:space-y-4 text-left sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-start space-x-3">
              <img 
                src={lenduraLogo} 
                alt="Lendura Capital" 
                className="h-20 sm:h-24 md:h-40 w-auto"
              />
            </div>
            <p className="text-black text-xs md:text-sm">
              Would you like a free, no strings attached consultation?
            </p>
            <p className="text-black text-xs md:text-sm">
              Call us today at <a href="https://calendly.com/sam-lenduracapital/30min" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-colors duration-200 font-semibold">(305) 834-7168</a>
            </p>
            <div className="flex items-center gap-0.5 justify-start">
              <a href="https://www.reddit.com/user/lenduracapital/" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <FaReddit size={24} />
              </a>
              <a href="https://substack.com/@lenduracapital?utm_source=user-menu" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <SiSubstack size={20} />
              </a>
              <a href="https://www.tiktok.com/@lendura_capital?lang=en" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <FaTiktok size={20} />
              </a>
              <a href="https://www.quora.com/profile/Lendura-Capital" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <SiQuora size={20} />
              </a>
              <a href="https://www.youtube.com/@LenduraCapital" target="_blank" rel="noopener noreferrer" className="text-[#193a59] hover:text-[#1d4ed8] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <FaYoutube size={24} />
              </a>
            </div>
            
            <div className="mt-4 text-left">
              <div className="flex items-center justify-start space-x-1">
                
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-[#193a59] font-semibold mb-4">Custom Business Financing Solutions</h4>
            <ul className="space-y-5 text-sm text-black">
              {businessFinancing.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(service.href)}
                    className="hover:text-[#193a59] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block bg-transparent border-none p-0 font-inherit text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#193a59] font-semibold mb-4">Personalized Small Business Solutions</h4>
            <ul className="space-y-5 text-sm text-black">
              {customSolutions.map((solution, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(solution.href)}
                    className="hover:text-[#193a59] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block bg-transparent border-none p-0 font-inherit text-left"
                  >
                    {solution.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#193a59] font-semibold mb-4">Lendura Capital</h4>
            <ul className="space-y-5 text-sm text-black">
              {lenduraPages.map((page, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(page.href)}
                    className="hover:text-[#193a59] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block bg-transparent border-none p-0 font-inherit text-left"
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-black text-sm mb-4">
            Copyright 2025 Lendura Capital. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {legalPages.map((page, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => handleNavigation(page.href)}
                  className="hover:text-[#193a59] transition-all duration-300 ease-in-out transform hover:scale-105 text-black text-xs md:text-sm cursor-pointer bg-transparent border-none p-0 font-inherit"
                >
                  {page.name}
                </button>
                {index < legalPages.length - 1 && (
                  <span className="ml-4 md:ml-6 text-black text-xs md:text-sm">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
