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
        <div className="flex justify-between items-center py-4">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8 w-full justify-center">
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-[--primary] ml-auto"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black bg-opacity-90 backdrop-blur-sm border-t border-white/20 p-4 space-y-4 absolute left-0 right-0 top-full">
            <button 
              onClick={() => { window.location.href = "/"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => { window.location.href = "/solutions"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Solutions
            </button>
            <button 
              onClick={() => { window.location.href = "/cre-lending"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              CRE Lending
            </button>
            <button 
              onClick={() => { window.location.href = "/pmf-advisory"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              PMF Advisory
            </button>
            <button 
              onClick={() => { handleApplyNow(); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Apply Now
            </button>
            <button 
              onClick={() => { window.location.href = "/careers"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Careers
            </button>
            <button 
              onClick={() => { window.location.href = "/pmf-partner"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              PMF Partner
            </button>
            <button 
              onClick={() => { window.location.href = "/resources"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Resources
            </button>
            <button 
              onClick={() => { window.location.href = "/customer-support"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Customer Support
            </button>
            <button 
              onClick={() => { window.location.href = "/credit-portal"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Credit Portal
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
