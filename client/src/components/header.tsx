import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [, setLocation] = useLocation();

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

  // Determine header background and text colors
  const isTransparent = transparent && !isScrolled;
  const headerBg = isTransparent ? 'bg-transparent' : 'bg-black/90 backdrop-blur-sm';
  const textColor = isTransparent ? 'text-white' : 'text-white';

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="w-full px-0">
        <div className="flex items-center justify-between py-2 md:py-4 w-full">
          {/* Logo on the left - aligned with hero text */}
          <div className="flex items-center ml-4 md:ml-8 lg:ml-8">
            <img 
              src={logoPath}
              alt="FundTek Capital Group Logo" 
              className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto"
            />
          </div>

          {/* Desktop Navigation - Positioned more to the right */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center ml-32" aria-label="Main navigation">
            <button 
              onClick={() => setLocation("/")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium touch-target focus-ring`}
              aria-label="Go to homepage"
            >
              Home
            </button>
            <button 
              onClick={() => setLocation("/solutions")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium touch-target focus-ring`}
              aria-label="View business funding solutions"
            >
              Solutions
            </button>
            <button 
              onClick={() => setLocation("/who-we-fund")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium touch-target focus-ring`}
              aria-label="See industries we fund"
            >
              Who We Fund
            </button>
            <button 
              onClick={handleApplyNow}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium touch-target focus-ring`}
              aria-label="Apply for business funding - Opens in new window"
            >
              Apply Now
            </button>
            <button 
              onClick={() => setLocation("/contact")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium touch-target focus-ring`}
              aria-label="Contact FundTek Capital Group"
            >
              Contact Us
            </button>
          </nav>

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
              onClick={() => { setLocation("/"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Home
            </button>
            <button 
              onClick={() => { setLocation("/solutions"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Solutions
            </button>
            <button 
              onClick={() => { setLocation("/who-we-fund"); setIsMobileMenuOpen(false); }}
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
              onClick={() => { setLocation("/contact"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-2 w-full text-left"
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
