import { ChartLine } from "lucide-react";
import { FaInstagram, FaYelp, FaFacebook } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";
import { useLocation } from "wouter";
// Using the white and blue FundTek logo
import fundTekLogo from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1752722086552.png";

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

const fundTekPages = [
  { name: "About FundTek", href: "/about" },
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
    console.log('Navigating to:', href);
    setLocation(href);
  };

  return (
    <footer className="bg-[#d9d9d9] border-t border-gray-200 py-8 md:py-12 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-start" style={{ pointerEvents: 'auto' }}>
          <div className="space-y-3 md:space-y-4 text-left sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-start space-x-3">
              <img 
                src={fundTekLogo} 
                alt="FundTek Capital Group" 
                className="h-20 sm:h-24 md:h-40 w-auto"
              />
            </div>
            <p className="text-black text-xs md:text-sm">
              Would you like a free, no-obligation business-funding consultation?
            </p>
            <p className="text-black text-xs md:text-sm">
              Call us today at <a href="https://calendly.com/admin-fundtekcapitalgroup/30min" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#7299d1] transition-colors duration-200 font-semibold">(305) 307-4658</a>
            </p>
            <div className="flex items-center gap-0.5 justify-start">
              <a href="https://www.instagram.com/fundtekcapitalgroup/" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#6b90d1] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <FaInstagram size={24} />
              </a>
              <a href="https://x.com/fundtekcapital" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#6b90d1] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <span className="text-2xl leading-none font-bold">𝕏</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577926551810" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#6b90d1] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                <FaFacebook size={24} />
              </a>
            </div>
            
            <div className="mt-4 text-left">
              <p className="text-black text-xs md:text-sm mb-2">
                Leave us a Review
              </p>
              <div className="flex items-center justify-start space-x-1">
                <a href="https://biz.yelp.com/biz_info/afSWaUVJaOUl0Nbj9-dzOA" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#6b90d1] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                  <FaYelp size={24} />
                </a>
                <a href="https://www.trustpilot.com/review/fundtekcapitalgroup.com" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] hover:text-[#6b90d1] transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-6 h-6">
                  <SiTrustpilot size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-[#85abe4] font-semibold mb-4">Custom Business Financing Solutions</h4>
            <ul className="space-y-5 text-sm text-black">
              {businessFinancing.map((service, index) => (
                <li key={index}>
                  <span
                    onClick={() => handleNavigation(service.href)}
                    className="hover:text-[#85abe4] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block"
                  >
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#85abe4] font-semibold mb-4">Personalized Small Business Solutions</h4>
            <ul className="space-y-5 text-sm text-black">
              {customSolutions.map((solution, index) => (
                <li key={index}>
                  <span
                    onClick={() => handleNavigation(solution.href)}
                    className="hover:text-[#85abe4] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block"
                  >
                    {solution.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[#85abe4] font-semibold mb-4">FundTek Capital Group</h4>
            <ul className="space-y-5 text-sm text-black">
              {fundTekPages.map((page, index) => (
                <li key={index}>
                  <span
                    onClick={() => handleNavigation(page.href)}
                    className="hover:text-[#85abe4] transition-all duration-300 ease-in-out transform hover:scale-105 text-black cursor-pointer inline-block"
                  >
                    {page.name}
                  </span>
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
                <span
                  onClick={() => handleNavigation(page.href)}
                  className="hover:text-[#85abe4] transition-all duration-300 ease-in-out transform hover:scale-105 text-black text-xs md:text-sm cursor-pointer"
                >
                  {page.name}
                </span>
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
