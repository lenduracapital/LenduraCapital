import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM (1)_1749675966252.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-transparent fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-4">
          {/* Navigation Menu */}
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => window.location.href = "/"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => window.location.href = "/solutions"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Solutions
            </button>
            <button 
              onClick={() => window.location.href = "/cre-lending"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              CRE Lending
            </button>
            <button 
              onClick={() => window.location.href = "/pmf-advisory"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              PMF Advisory
            </button>
            <button 
              onClick={handleApplyNow}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Apply Now
            </button>
            <button 
              onClick={() => window.location.href = "/careers"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Careers
            </button>
            <button 
              onClick={() => window.location.href = "/pmf-partner"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              PMF Partner
            </button>
            <button 
              onClick={() => window.location.href = "/resources"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Resources
            </button>
            <button 
              onClick={() => window.location.href = "/customer-support"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Customer Support
            </button>
            <button 
              onClick={() => window.location.href = "/credit-portal"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Credit Portal
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
