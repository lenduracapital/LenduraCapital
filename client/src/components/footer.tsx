import { ChartLine } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";
import fundTekLogo from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750170532483.png";

const businessFinancing = [
  { name: "Term Loans", href: "/solutions/term-loans" },
  { name: "Lines of Credit", href: "/solutions/lines-of-credit" },
  { name: "Equipment Financing", href: "/solutions/equipment-financing" },
  { name: "Invoice Factoring", href: "/solutions/invoice-factoring" },
  { name: "P.O. Financing", href: "/solutions/po-financing" }
];

const customSolutions = [
  { name: "Credit Services", href: "/solutions/credit-services" },
  { name: "SBA Loans", href: "/solutions/sba-loans" },
  { name: "Debt Consolidation", href: "/solutions/debt-consolidation" },
  { name: "Merchant Cash Advance", href: "/solutions/merchant-cash-advance" }
];

const fundTekPages = [
  { name: "About FundTek", href: "/about" },
  { name: "Who We Fund", href: "/who-we-fund" },
  { name: "Resources", href: "/resources" },
  { name: "Contact Us", href: "/contact" }
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={fundTekLogo} 
                alt="FundTek Capital Group" 
                className="h-32 w-auto"
              />
            </div>
            <p className="text-black text-sm">
              Would you like a free, no strings attached consultation?
            </p>
            <p className="text-black text-sm">
              Call us today at (305) 307-4658
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:opacity-75 transition-colors" style={{ color: '#85abe4' }}>
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:opacity-75 transition-colors" style={{ color: '#85abe4' }}>
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-600 hover:opacity-75 transition-colors" style={{ color: '#85abe4' }}>
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Premium Business Financing Services</h4>
            <ul className="space-y-2 text-sm text-black">
              {businessFinancing.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="hover:opacity-75 transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Custom Small Business Solutions</h4>
            <ul className="space-y-2 text-sm text-black">
              {customSolutions.map((solution, index) => (
                <li key={index}>
                  <a href={solution.href} className="hover:opacity-75 transition-colors">
                    {solution.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-black font-semibold mb-4">Premium Merchant Funding</h4>
            <ul className="space-y-2 text-sm text-black">
              {fundTekPages.map((page, index) => (
                <li key={index}>
                  <a href={page.href} className="hover:opacity-75 transition-colors">
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-black text-sm">
            Copyright 2025 FundTek Capital Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
