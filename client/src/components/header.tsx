import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
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
  
  // Mobile menu collapsible states
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  
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

  // Sticky navigation with enhanced mobile support - transparent by default
  const headerClass = (isScrolled || isMobileMenuOpen)
    ? 'fixed top-0 z-50 transition-all duration-300 bg-black/95 backdrop-blur-md shadow-lg'
    : 'fixed top-0 z-50 transition-all duration-300 bg-transparent';

  return (
    <>
      <header className={`${headerClass} w-full pointer-events-auto`} data-testid="header-navigation">
        <nav className="w-full px-0" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between w-full py-2 mb-2 md:py-1 md:mb-4">
          {/* Logo on the left - mobile optimized */}
          <div className="flex items-center pl-4 sm:pl-6 md:pl-8 lg:pl-10">
            <button 
              onClick={handleLogoClick}
              className="focus:outline-none transition-transform duration-300 hover:scale-105 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Go to homepage"
              data-testid="button-logo"
            >
              <img 
                src={lenduraLogo}
                alt="Lendura Capital Logo" 
                className="h-12 sm:h-16 md:h-18 lg:h-20 xl:h-24 w-auto object-contain"
              />
            </button>
          </div>

          {/* Mobile Menu Button - Enhanced touch target */}
          <button
            className="lg:hidden text-white hover:text-[--primary] min-h-[48px] min-w-[48px] mr-4 sm:mr-6 transition-all duration-300 hover:scale-110 hover:bg-white/20 active:bg-white/30 rounded-lg flex items-center justify-center border border-white/20 bg-black/30 backdrop-blur-sm relative z-50 pointer-events-auto"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
            type="button"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

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
        </div>

        </nav>
      </header>

      {/* Mobile Menu - Professional Card-Based Design with Brand Colors */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[60] bg-gradient-to-br from-slate-50 via-white to-slate-100 pointer-events-auto" 
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="mobile-menu"
        >
          <div className="p-6 space-y-6 overflow-y-auto min-h-screen" onClick={(e) => e.stopPropagation()}>
            {/* Header with Logo and Close Button */}
            <div className="flex items-center justify-between mb-8 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-primary-hover bg-clip-text text-transparent">
                  Lendura Capital
                </h2>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-gray-500 hover:text-gray-700 hover:bg-white/80 rounded-full transition-all duration-200 shadow-sm"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Our Services Section */}
            <div className="bg-white rounded-xl shadow-lg border-0 ring-1 ring-gray-200/60 backdrop-blur-sm">
              <button
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-primary-light/5 transition-all duration-200 rounded-t-xl"
              >
                <span className="text-lg font-semibold text-[#193a59]">Our Services</span>
                {mobileSolutionsOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#193a59]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#193a59]" />
                )}
              </button>
              {mobileSolutionsOpen && (
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => { setLocation("/solutions/term-loans"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    Business Term Loans
                  </button>
                  <button
                    onClick={() => { setLocation("/solutions/lines-of-credit"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    Business Line of Credit
                  </button>
                  <button
                    onClick={() => { setLocation("/solutions/merchant-cash-advance"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    Merchant Cash Advance
                  </button>
                  <button
                    onClick={() => { setLocation("/solutions/sba-loans"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    SBA Loans
                  </button>
                  <button
                    onClick={() => { setLocation("/solutions/equipment-financing"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    Equipment Financing
                  </button>
                  <button
                    onClick={() => { setLocation("/solutions/debt-consolidation"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] transition-all duration-200 font-medium rounded-b-xl"
                  >
                    Debt Consolidation
                  </button>
                </div>
              )}
            </div>

            {/* Our Company Section */}
            <div className="bg-white rounded-xl shadow-lg border-0 ring-1 ring-gray-200/60 backdrop-blur-sm">
              <button
                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gradient-to-r hover:from-brand-primary/5 hover:to-brand-primary-light/5 transition-all duration-200 rounded-t-xl"
              >
                <span className="text-lg font-semibold text-[#193a59]">Our Company</span>
                {mobileIndustriesOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#193a59]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#193a59]" />
                )}
              </button>
              {mobileIndustriesOpen && (
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => { setLocation("/about"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    About
                  </button>
                  <button
                    onClick={() => { setLocation("/testimonials"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] border-b border-gray-50 last:border-b-0 transition-all duration-200 font-medium"
                  >
                    Reviews
                  </button>
                  <button
                    onClick={() => { setLocation("/qualified-industries"); setIsMobileMenuOpen(false); }}
                    className="block w-full text-left px-6 py-4 text-gray-900 hover:bg-[#193a59]/10 hover:text-[#193a59] transition-all duration-200 font-medium rounded-b-xl"
                  >
                    Industries
                  </button>
                </div>
              )}
            </div>


            {/* CTA Buttons - Enhanced with Brand Colors */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => { handleApplyNow(); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-gradient-to-r from-brand-secondary to-brand-secondary-light hover:from-brand-secondary-dark hover:to-brand-secondary text-white font-bold py-5 px-6 rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ring-2 ring-brand-secondary/20 hover:ring-brand-secondary/40"
                data-testid="mobile-button-apply"
              >
                <span className="relative">
                  Apply Now
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </button>
              <button
                onClick={() => { setLocation("/contact"); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-gradient-to-r from-brand-primary to-brand-primary-hover hover:from-brand-primary-dark hover:to-brand-primary text-white font-bold py-5 px-6 rounded-2xl text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 ring-2 ring-brand-primary/20 hover:ring-brand-primary/40"
                data-testid="mobile-button-contact"
              >
                <span className="relative">
                  Call Support
                  <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
