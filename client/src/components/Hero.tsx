import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import { useLocation } from "wouter";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeroProps {
  title: string;
  description: string;
  backgroundImage?: string;
  breadcrumbs?: BreadcrumbItem[];
  ctaText?: string;
  ctaHref?: string;
  ctaAction?: () => void;
  size?: 'default' | 'large';
  overlay?: 'light' | 'dark';
  alignment?: 'left' | 'center';
}

export default function Hero({
  title,
  description,
  backgroundImage,
  breadcrumbs,
  ctaText = "Get Approved in 24 Hours",
  ctaHref,
  ctaAction,
  size = 'default',
  overlay = 'dark',
  alignment = 'left'
}: HeroProps) {
  const [, setLocation] = useLocation();

  const handleCTAClick = () => {
    if (ctaAction) {
      ctaAction();
    } else if (ctaHref) {
      if (ctaHref.startsWith('http')) {
        window.open(ctaHref, '_blank');
      } else {
        setLocation(ctaHref);
      }
    } else {
      // Default action - open application form
      window.open("https://form.jotform.com/251965461165159", "_blank");
    }
  };

  const handleBreadcrumbClick = (href: string) => {
    if (href === '/') {
      setLocation('/');
      window.scrollTo(0, 0);
    } else {
      setLocation(href);
      window.scrollTo(0, 0);
    }
  };

  const paddingClass = size === 'large' 
    ? 'pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-16 sm:pb-20 md:pb-24 lg:pb-32' 
    : 'pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24';

  const overlayClass = overlay === 'dark'
    ? 'bg-gradient-to-br from-slate-900 to-slate-800'
    : 'bg-gradient-to-br from-white to-gray-50';

  const textColorClass = overlay === 'dark' ? 'text-white' : 'text-gray-900';
  const descriptionColorClass = overlay === 'dark' ? 'text-gray-200' : 'text-gray-600';

  const alignmentClass = alignment === 'center' 
    ? 'text-center' 
    : 'text-left';

  const maxWidthClass = alignment === 'center' 
    ? 'max-w-4xl mx-auto' 
    : 'max-w-4xl';

  return (
    <section 
      className={`relative ${paddingClass} ${overlayClass} overflow-hidden`}
      data-testid="hero-section"
      role="banner"
      aria-label={`Hero section: ${title}`}
    >
      {/* Background Image */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('${backgroundImage}')`
            }}
            data-testid="hero-background-image"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#193a59]/20 to-transparent"></div>
        </>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs - Mobile optimized */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav 
            className="mb-4 sm:mb-6 md:mb-8" 
            aria-label="Breadcrumb"
            data-testid="hero-breadcrumbs"
          >
            <ol className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleBreadcrumbClick('/')}
                  className={`${overlay === 'dark' ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200 flex items-center min-h-[44px] min-w-[44px] justify-center rounded-lg hover:bg-white/10 active:bg-white/20`}
                  data-testid="breadcrumb-home"
                  aria-label="Go to homepage"
                >
                  <Home className="w-4 h-4" />
                  <span className="sr-only">Home</span>
                </button>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 ${overlay === 'dark' ? 'text-blue-300' : 'text-gray-400'}`} />
                  {index === breadcrumbs.length - 1 ? (
                    <span 
                      className={`${overlay === 'dark' ? 'text-blue-100' : 'text-gray-700'} font-medium text-xs sm:text-sm`}
                      data-testid={`breadcrumb-current`}
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBreadcrumbClick(crumb.href)}
                      className={`${overlay === 'dark' ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200 min-h-[44px] px-2 py-1 rounded-lg hover:bg-white/10 active:bg-white/20 text-xs sm:text-sm`}
                      data-testid={`breadcrumb-${index}`}
                    >
                      {crumb.label}
                    </button>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Content */}
        <div className={`${alignmentClass} ${maxWidthClass}`}>
          <h1 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold ${textColorClass} mb-4 sm:mb-6 leading-tight tracking-wide`}
            data-testid="hero-title"
          >
            {title}
          </h1>
          <p 
            className={`text-base sm:text-lg md:text-xl lg:text-2xl ${descriptionColorClass} leading-relaxed mb-6 sm:mb-8 md:mb-10`}
            data-testid="hero-description"
          >
            {description}
          </p>

          {/* CTA Button - Mobile optimized */}
          <div className={`${alignment === 'center' ? 'flex justify-center' : ''} mt-6 sm:mt-8`}>
            <Button 
              onClick={handleCTAClick}
              size="lg"
              style={{ backgroundColor: '#193a59', color: 'white' }}
              className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-semibold shadow-lg min-h-[48px] w-full sm:w-auto"
              data-testid="hero-cta-button"
              aria-label={`${ctaText} - Primary action button`}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}