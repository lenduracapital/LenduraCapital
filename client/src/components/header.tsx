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
    <header className="bg-[--bg-secondary]/95 backdrop-blur-sm fixed w-full top-0 z-50 border-b border-[--bg-tertiary]/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src={logoPath} 
              alt="FundTek Capital Group" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-[--text-primary] hidden sm:block">FundTek Capital Group</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-200"
            >
              Services
            </button>
            <button 
              onClick={() => window.location.href = "/about"}
              className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-200"
            >
              About Us
            </button>
            <button 
              onClick={() => window.location.href = "/who-we-fund"}
              className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-200"
            >
              Who We Fund
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-[--text-secondary] hover:text-[--text-primary] transition-colors duration-200"
            >
              Contact
            </button>
            <Button 
              onClick={handleApplyNow}
              className="bg-[--primary] hover:bg-[--primary-dark] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
            >
              Apply Now
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-[--text-primary]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[--bg-secondary] border-t border-[--bg-tertiary]/30 p-4 space-y-4">
            <button 
              onClick={() => scrollToSection("services")}
              className="block text-[--text-secondary] hover:text-[--text-primary] transition-colors py-2 w-full text-left"
            >
              Services
            </button>
            <button 
              onClick={() => window.location.href = "/about"}
              className="block text-[--text-secondary] hover:text-[--text-primary] transition-colors py-2 w-full text-left"
            >
              About Us
            </button>
            <button 
              onClick={() => window.location.href = "/who-we-fund"}
              className="block text-[--text-secondary] hover:text-[--text-primary] transition-colors py-2 w-full text-left"
            >
              Who We Fund
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="block text-[--text-secondary] hover:text-[--text-primary] transition-colors py-2 w-full text-left"
            >
              Contact
            </button>
            <Button 
              onClick={handleApplyNow}
              className="w-full bg-[--primary] hover:bg-[--primary-dark] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Apply Now
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
