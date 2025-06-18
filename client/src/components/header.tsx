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
  const textColor = 'text-white';

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${headerBg}`}>
      <nav className="w-full px-0">
        <div className="flex items-center justify-between py-0 w-full">
          {/* Logo on the left - aligned with hero text */}
          <div className="flex items-center ml-4 md:ml-8 lg:ml-8">
            <img 
              src={logoPath}
              alt="FundTek Capital Group Logo" 
              className="h-28 sm:h-32 md:h-40 lg:h-56 w-auto object-contain max-h-[80vh]"
            />
          </div>

          {/* Desktop Navigation - Positioned more to the right */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center ml-32" aria-label="Main navigation">
            <button 
              onClick={() => setLocation("/")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring`}
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Go to homepage"
            >
              Home
            </button>
            <button 
              onClick={() => setLocation("/solutions")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring`}
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="View business funding solutions"
            >
              Solutions
            </button>
            <button 
              onClick={() => setLocation("/who-we-fund")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring`}
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="See qualified industries"
            >
              Qualified Industries
            </button>
            <button 
              onClick={handleApplyNow}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring`}
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Apply for business funding - Opens in new window"
            >
              Apply Now
            </button>
            <button 
              onClick={() => setLocation("/contact")}
              className={`${textColor} hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring`}
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Contact FundTek Capital Group"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-[--primary] min-h-[44px] min-w-[44px] mr-4"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/20 p-4 space-y-2 absolute left-0 right-0 top-full z-50">
            <button 
              onClick={() => { setLocation("/"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-3 px-4 w-full text-left min-h-[44px] rounded hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Home
            </button>
            <button 
              onClick={() => { setLocation("/solutions"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-3 px-4 w-full text-left min-h-[44px] rounded hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Solutions
            </button>
            <button 
              onClick={() => { setLocation("/who-we-fund"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-3 px-4 w-full text-left min-h-[44px] rounded hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Qualified Industries
            </button>
            <button 
              onClick={() => { handleApplyNow(); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-3 px-4 w-full text-left min-h-[44px] rounded hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Apply Now
            </button>
            <button 
              onClick={() => { setLocation("/contact"); setIsMobileMenuOpen(false); }}
              className="block text-white hover:text-[--primary] transition-colors py-3 px-4 w-full text-left min-h-[44px] rounded hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
