import { ChartLine } from "lucide-react";
import { FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const services = [
  "Working Capital",
  "Equipment Financing", 
  "Revenue-Based Financing",
  "SBA Loans",
  "Real Estate"
];

const company = [
  { name: "About Us", href: "#about" },
  { name: "Our Team", href: "#" },
  { name: "Careers", href: "#" },
  { name: "Press", href: "#" },
  { name: "Contact", href: "#contact" }
];

const resources = [
  "FAQ",
  "Blog",
  "Case Studies", 
  "Privacy Policy",
  "Terms of Service"
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
              Empowering businesses with innovative funding solutions and exceptional service since 2015.
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
            <h4 className="text-[--text-primary] font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-[--text-primary] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[--text-primary] font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {company.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => item.href.startsWith("#") ? scrollToSection(item.href) : null}
                    className="hover:text-[--text-primary] transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[--text-primary] font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-[--text-secondary]">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-[--text-primary] transition-colors">
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[--bg-tertiary]/30 mt-8 pt-8 text-center">
          <p className="text-[--text-secondary] text-sm">
            © 2024 FundTek Capital Group. All rights reserved. | NMLS ID: 123456
          </p>
        </div>
      </div>
    </footer>
  );
}
