import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

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

  // Transparent initially, black background when scrolled
  const headerClass = isScrolled 
    ? 'fixed w-full top-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-md'
    : 'fixed w-full top-0 z-50 transition-all duration-300';

  return (
    <header className={headerClass}>
      <nav className="w-full px-0">
        <div className="flex items-center justify-between w-full py-1">
          {/* Logo on the left - aligned with hero text */}
          <div className="flex items-center ml-4 md:ml-8 lg:ml-8">
            <img 
              src={logoPath}
              alt="FundTek Capital Group Logo" 
              className="h-20 sm:h-24 md:h-28 lg:h-36 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation - Positioned more to the right */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center ml-32" aria-label="Main navigation">
            <button 
              onClick={() => setLocation("/")}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Go to homepage"
            >
              Home
            </button>
            
            {/* Solutions Dropdown */}
            <div 
              className="relative dropdown-container"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={() => setLocation("/solutions")}
                className="text-white hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                aria-label="View business funding solutions"
              >
                Solutions
              </button>

              {/* Dropdown Menu - Clean Rectangle */}
              {isDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 bg-white border-t-4 border-[#85abe4] shadow-xl z-50 p-6"
                  style={{ width: '900px', height: '320px' }}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="grid grid-cols-2 gap-12">
                    {/* Left Column - Custom Business Financing Solutions */}
                    <div>
                      <h3 className="font-semibold mb-3 text-sm border-b border-gray-300 pb-1" style={{ color: '#85abe4' }}>Custom Business Financing Solutions</h3>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                        <button
                          onClick={() => { setLocation("/solutions/term-loans"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Term Loans
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/sba-loans"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          SBA Loans
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/equipment-financing"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Equipment Financing
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/lines-of-credit"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Lines of Credit
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/merchant-cash-advance"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Cash Advance
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/invoice-factoring"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Invoice Factoring
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/debt-consolidation"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Debt Consolidation
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/po-financing"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          P.O. Financing
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/cre-lending"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          CRE Lending
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/mortgage-financing"); setIsDropdownOpen(false); }}
                          className="text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Mortgage Financing
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Personalized Small Business Solutions */}
                    <div>
                      <h3 className="font-semibold mb-3 text-sm border-b border-gray-300 pb-1" style={{ color: '#85abe4' }}>Personalized Small Business Solutions</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/solutions/credit-services"); setIsDropdownOpen(false); }}
                          className="block text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Credit Services
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/credit-card-processing"); setIsDropdownOpen(false); }}
                          className="block text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Credit Card Processing
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/digital-marketing"); setIsDropdownOpen(false); }}
                          className="block text-left text-xs text-gray-600 hover:text-[#85abe4] transition-colors py-0.5"
                        >
                          Digital Marketing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button 
              onClick={() => setLocation("/who-we-fund")}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="See qualified industries"
            >
              Qualified Industries
            </button>
            <button 
              onClick={handleApplyNow}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Apply for business funding - Opens in new window"
            >
              Apply Now
            </button>
            <button 
              onClick={() => setLocation("/contact")}
              className="text-white hover:text-[--primary] transition-colors duration-200 font-medium px-3 py-2 min-h-[44px] rounded focus-ring"
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
