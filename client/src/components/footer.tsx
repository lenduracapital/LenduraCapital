import { ChartLine } from "lucide-react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import { useLocation } from "wouter";
import fundTekLogo from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750170532483.png";

const businessFinancing = [
  { name: "Term Loans", href: "/solutions/term-loans" },
  { name: "Lines of Credit", href: "/solutions/lines-of-credit" },
  { name: "SBA Loans", href: "/solutions/sba-loans" },
  { name: "Debt Consolidation", href: "/solutions/debt-consolidation" },
  { name: "Equipment Financing", href: "/solutions/equipment-financing" },
  { name: "Invoice Factoring", href: "/solutions/invoice-factoring" },
  { name: "Merchant Cash Advance", href: "/solutions/merchant-cash-advance" }
];

const customSolutions = [
  { name: "Credit Services", href: "/solutions/credit-services" },
  { name: "Digital Marketing", href: "/solutions/seo-web-development" },
  { name: "Credit Card Processing", href: "/solutions/credit-card-processing" }
];

const fundTekPages = [
  { name: "About FundTek", href: "/about" },
  { name: "Who We Fund", href: "/who-we-fund" },
  { name: "Contact Us", href: "/contact" },
  { name: "Testimonials", href: "/more-testimonials" },
  { name: "FAQ", href: "/faq" },
  { name: "CRE Lending", href: "/solutions/commercial-real-estate-lending" },
  { name: "Mortgage Loans", href: "/solutions/mortgage-financing" }
];

const legalPages = [
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Cookies Policy", href: "/cookies" }
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    console.log('Navigating to:', href);
    setLocation(href);
  };

  return (
    <footer className="bg-[#d9d9d9] border-t border-gray-200 py-8 md:py-12 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8" style={{ pointerEvents: 'auto' }}>
          <div className="space-y-3 md:space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <img 
                src={fundTekLogo} 
                alt="FundTek Capital Group" 
                className="h-24 md:h-40 w-auto filter brightness-110 contrast-110"
              />
            </div>
            <p className="text-black text-xs md:text-sm">
              Would you like a free, no strings attached consultation?
            </p>
            <p className="text-black text-xs md:text-sm">
              Call us today at (305) 307-4658
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/fundtekcapitalgroup/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:opacity-75 transition-colors" style={{ color: '#85abe4' }}>
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://x.com/fundtekcapital" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:opacity-75 transition-colors flex items-center justify-center" style={{ color: '#85abe4' }}>
                <span className="text-xl leading-none">𝕏</span>
              </a>
              <a href="https://www.tiktok.com/@fundtekcapitalgroup?lang=en" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:opacity-75 transition-colors" style={{ color: '#85abe4' }}>
                <FaTiktok className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Custom Business Financing Solutions</h4>
            <ul className="space-y-2 text-sm text-black">
              {businessFinancing.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(service.href)}
                    className="hover:opacity-75 transition-colors text-black underline block w-full py-1 text-left bg-transparent border-none cursor-pointer"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Personalized Small Business Solutions</h4>
            <ul className="space-y-2 text-sm text-black">
              {customSolutions.map((solution, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(solution.href)}
                    className="hover:opacity-75 transition-colors text-black underline block w-full py-1 text-left bg-transparent border-none cursor-pointer"
                  >
                    {solution.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">FundTek Capital Group</h4>
            <ul className="space-y-2 text-sm text-black">
              {fundTekPages.map((page, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavigation(page.href)}
                    className="hover:opacity-75 transition-colors text-black underline block w-full py-1 text-left bg-transparent border-none cursor-pointer"
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
            Copyright 2025 FundTek Capital Group. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {legalPages.map((page, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => handleNavigation(page.href)}
                  className="hover:opacity-75 transition-colors text-black underline text-xs md:text-sm bg-transparent border-none cursor-pointer"
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
