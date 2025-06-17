import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/IMG_4080_1750166138303.png";

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
          {/* Logo on Left */}
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <img 
                src={logoPath} 
                alt="FundTek Capital Group" 
                className="h-12 w-auto"
              />
              <span className="text-white text-xs font-light tracking-wider mt-1">
                Capital Group
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
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
              onClick={() => window.location.href = "/who-we-fund"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Who We Fund
            </button>
            <button 
              onClick={handleApplyNow}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Apply Now
            </button>
            <button 
              onClick={() => window.location.href = "/resources"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Resources
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Contact
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
              onClick={() => { window.location.href = "/who-we-fund"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Who We Fund
            </button>
            <button 
              onClick={() => { handleApplyNow(); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Apply Now
            </button>
            <button 
              onClick={() => { window.location.href = "/resources"; setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Resources
            </button>
            <button 
              onClick={() => { scrollToSection("contact"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Contact
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
