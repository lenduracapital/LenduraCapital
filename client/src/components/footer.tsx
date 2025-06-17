import { ChartLine } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

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
    <footer className="bg-[--bg-primary] border-t border-[--bg-tertiary]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[--primary] rounded-lg flex items-center justify-center">
                <ChartLine className="text-white text-sm" />
              </div>
              <span className="text-lg font-bold text-[--text-primary]">FundTek Capital</span>
            </div>
            <p className="text-[--text-secondary] text-sm">
              Would you like a free, no strings attached consultation?
            </p>
            <p className="text-[--text-secondary] text-sm">
              Call us today at (646) 329-4622
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[--text-secondary] hover:text-[--primary] transition-colors">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="text-[--text-secondary] hover:text-[--primary] transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="text-[--text-secondary] hover:text-[--primary] transition-colors">
                <FaFacebook className="text-xl" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[--text-primary] font-semibold mb-4">Premium Business Financing Services</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {businessFinancing.map((service, index) => (
                <li key={index}>
                  <a href={service.href} className="hover:text-[--text-primary] transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[--text-primary] font-semibold mb-4">Custom Small Business Solutions</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {customSolutions.map((solution, index) => (
                <li key={index}>
                  <a href={solution.href} className="hover:text-[--text-primary] transition-colors">
                    {solution.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[--text-primary] font-semibold mb-4">Premium Merchant Funding</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {fundTekPages.map((page, index) => (
                <li key={index}>
                  <a href={page.href} className="hover:text-[--text-primary] transition-colors">
                    {page.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[--bg-tertiary]/30 mt-8 pt-8 text-center">
          <p className="text-[--text-secondary] text-sm">
            Copyright 2025 FundTek Capital Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
