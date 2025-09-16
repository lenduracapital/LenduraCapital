import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
// Using the white and blue Lendura logo
const lenduraLogo = "/ChatGPT Image Aug 26, 2025, 04_32_58 PM_1756258409289.png";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
  
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if ((isSolutionsDropdownOpen || isIndustriesDropdownOpen) && !(event.target as Element).closest('.dropdown-container')) {
        setIsSolutionsDropdownOpen(false);
        setIsIndustriesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSolutionsDropdownOpen, isIndustriesDropdownOpen]);

  const handleApplyNow = () => {
    window.location.href = '/apply-now';
  };


  const handleHomeClick = () => {
    if (location === "/") {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If not on homepage, navigate there
      setLocation("/");
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location === "/") {
      // If already on homepage, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If not on homepage, navigate there
      setLocation("/");
    }
  };

  // Transparent initially, black background when scrolled
  const headerClass = isScrolled 
    ? 'fixed w-full top-0 z-50 transition-all duration-300 bg-black/90 backdrop-blur-md'
    : 'fixed w-full top-0 z-50 transition-all duration-300';

  return (
    <header className={headerClass}>
      <nav className="w-full px-0">
        <div className="flex items-center justify-between w-full py-1 mb-4">
          {/* Logo on the left - aligned with hero text */}
          <div className="flex items-center pl-6 md:pl-8 lg:pl-10">
            <button 
              onClick={handleLogoClick}
              className="focus:outline-none transition-transform duration-300 hover:scale-105"
              aria-label="Go to homepage"
            >
              <img 
                src={lenduraLogo}
                alt="Lendura Capital Logo" 
                className="h-16 sm:h-18 md:h-20 lg:h-24 w-auto object-contain ml-[-3px] mr-[-3px] pl-[-8px] pr-[-8px] pt-[-7px] pb-[-7px] mt-[-3px] mb-[-3px]"
              />
            </button>
          </div>

          {/* Desktop Navigation - Positioned more to the right */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center ml-32" aria-label="Main navigation">
            <button 
              onClick={handleHomeClick}
              className="text-white hover:text-[--primary] transition-all duration-300 font-medium px-3 py-2 min-h-[44px] rounded focus-ring hover:scale-105 hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Go to homepage"
            >
              Home
            </button>
            
            {/* Solutions Dropdown */}
            <div 
              className="relative dropdown-container group"
              onMouseEnter={() => setIsSolutionsDropdownOpen(true)}
              onMouseLeave={() => setIsSolutionsDropdownOpen(false)}
            >
              <button 
                onClick={() => setLocation("/solutions")}
                className="flex items-center text-white hover:text-[#193a59] transition-all duration-300 font-medium px-4 py-2 min-h-[44px] rounded-lg focus-ring hover:scale-105 hover:bg-white/10"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                aria-label="View business funding solutions"
              >
                Solutions
              </button>

              {/* Invisible bridge to prevent dropdown closing */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent z-40" />

              {/* Enhanced Dropdown Menu */}
              {isSolutionsDropdownOpen && (
                <div 
                  className="absolute top-full left-0 bg-white rounded-lg border border-gray-200 shadow-2xl z-50 p-6 transition-all duration-200 transform animate-in slide-in-from-top-2"
                  style={{ width: '640px', marginTop: '8px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-2 gap-8">
                    {/* Left Column - Custom Business Financing Solutions */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-6 bg-[#193a59] rounded-full mr-3"></div>
                        <h3 className="font-bold text-[#193a59] text-sm uppercase tracking-wide">Financing Solutions</h3>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/solutions/term-loans"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Term Loans
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/lines-of-credit"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Lines of Credit
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/merchant-cash-advance"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Cash Advance
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/sba-loans"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          SBA Loans
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/debt-consolidation"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Debt Consolidation
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/equipment-financing"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Equipment Loans
                        </button>
                      </div>
                    </div>

                    {/* Right Column - Additional Solutions */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-6 bg-[#193a59] rounded-full mr-3"></div>
                        <h3 className="font-bold text-[#193a59] text-sm uppercase tracking-wide">Business Services</h3>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/solutions/invoice-factoring"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Factoring
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/po-financing"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          P.O. Financing
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/commercial-real-estate-lending"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          CRE Lending
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/credit-card-processing"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Card Processing
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/credit-services"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Credit Repair
                        </button>
                        <button
                          onClick={() => { setLocation("/solutions/seo-web-development"); setIsSolutionsDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Marketing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Qualified Industries Dropdown */}
            <div 
              className="relative dropdown-container group"
              onMouseEnter={() => setIsIndustriesDropdownOpen(true)}
              onMouseLeave={() => setIsIndustriesDropdownOpen(false)}
            >
              <button 
                onClick={() => setLocation("/qualified-industries")}
                className="flex items-center text-white hover:text-[#193a59] transition-all duration-300 font-medium px-4 py-2 min-h-[44px] rounded-lg focus-ring hover:scale-105 hover:bg-white/10"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
                aria-label="See qualified industries"
              >
                Qualified Industries
              </button>

              {/* Invisible bridge to prevent dropdown closing */}
              <div className="absolute top-full left-0 w-full h-2 bg-transparent z-40" />

              {/* Enhanced Industries Dropdown Menu */}
              {isIndustriesDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white rounded-lg border border-gray-200 shadow-2xl z-50 p-6 transition-all duration-200 animate-in slide-in-from-top-2"
                  style={{ width: '680px', marginTop: '8px' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {/* Column 1 */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-6 bg-[#193a59] rounded-full mr-3"></div>
                        <h3 className="font-bold text-[#193a59] text-sm uppercase tracking-wide">Service Industries</h3>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/industries/beauty-wellness"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Beauty & Wellness
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/cleaning-janitorial-services"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Cleaning Services
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/education-training"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Education & Training
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/entertainment-events"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Entertainment
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/home-services-contracting"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Home Services
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/professional-services"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Professional Services
                        </button>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-6 bg-[#193a59] rounded-full mr-3"></div>
                        <h3 className="font-bold text-[#193a59] text-sm uppercase tracking-wide">Commerce & Trade</h3>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/industries/auto-transportation"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Auto & Transportation
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/franchises"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Franchises
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/hospitality-tourism"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Hospitality & Tourism
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/real-estate"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Real Estate
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/restaurant-food-service"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Restaurant & Food
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/retail-e-commerce"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Retail & E-commerce
                        </button>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-2 h-6 bg-[#193a59] rounded-full mr-3"></div>
                        <h3 className="font-bold text-[#193a59] text-sm uppercase tracking-wide">Production & Tech</h3>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => { setLocation("/industries/agriculture"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Agriculture
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/construction"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Construction
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/manufacturing"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Manufacturing
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/medical-healthcare"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Medical & Healthcare
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/technology-software"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Technology & Software
                        </button>
                        <button
                          onClick={() => { setLocation("/industries/trucking-transportation"); setIsIndustriesDropdownOpen(false); }}
                          className="block w-full text-left text-sm text-gray-700 hover:text-[#193a59] hover:bg-[#193a59]/5 transition-all duration-150 py-2 px-3 rounded-lg font-medium"
                        >
                          Trucking & Logistics
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            

            <button 
              onClick={handleApplyNow}
              className="text-white hover:text-[--primary] transition-all duration-300 font-medium px-3 py-2 min-h-[44px] rounded focus-ring hover:scale-105 hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Apply for business funding - Opens in new window"
            >
              Apply Now
            </button>
            <button 
              onClick={() => setLocation("/contact")}
              className="text-white hover:text-[--primary] transition-all duration-300 font-medium px-3 py-2 min-h-[44px] rounded focus-ring hover:scale-105 hover:bg-white/10"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              aria-label="Contact Lendura Capital"
            >
              Contact Us
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:text-[--primary] min-h-[44px] min-w-[44px] mr-4 transition-all duration-300 hover:scale-110 hover:bg-white/10"
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
              onClick={handleHomeClick}
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
              onClick={() => { setLocation("/qualified-industries"); setIsMobileMenuOpen(false); }}
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
