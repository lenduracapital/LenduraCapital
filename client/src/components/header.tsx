import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-4">
          {/* Logo on the left - aligned with hero text */}
          <div className="flex items-center ml-4 md:ml-8 lg:ml-16">
            <img 
              src={logoPath}
              alt="FundTek Capital Group Logo" 
              className="h-20 md:h-32 w-auto"
            />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-8">
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
              onClick={() => window.location.href = "/contact"}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium"
            >
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-[--primary]"
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
              onClick={() => { window.location.href = "/contact"; setIsMobileMenuOpen(false); }}
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
