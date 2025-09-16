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
    ? 'pt-40 md:pt-48 pb-24 md:pb-32' 
    : 'pt-32 md:pt-40 pb-16 md:pb-24';

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
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav 
            className="mb-8" 
            aria-label="Breadcrumb"
            data-testid="hero-breadcrumbs"
          >
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <button
                  onClick={() => handleBreadcrumbClick('/')}
                  className={`${overlay === 'dark' ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200 flex items-center`}
                  data-testid="breadcrumb-home"
                  aria-label="Go to homepage"
                >
                  <Home className="w-4 h-4" />
                  <span className="sr-only">Home</span>
                </button>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  <ChevronRight className={`w-4 h-4 mx-2 ${overlay === 'dark' ? 'text-blue-300' : 'text-gray-400'}`} />
                  {index === breadcrumbs.length - 1 ? (
                    <span 
                      className={`${overlay === 'dark' ? 'text-blue-100' : 'text-gray-700'} font-medium`}
                      data-testid={`breadcrumb-current`}
                      aria-current="page"
                    >
                      {crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleBreadcrumbClick(crumb.href)}
                      className={`${overlay === 'dark' ? 'text-blue-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'} transition-colors duration-200`}
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
            className={`text-3xl md:text-5xl lg:text-6xl font-bold ${textColorClass} mb-4 md:mb-6 leading-tight tracking-wider responsive-heading-lg`}
            data-testid="hero-title"
          >
            {title}
          </h1>
          <p 
            className={`text-base md:text-xl ${descriptionColorClass} leading-relaxed mb-8 md:mb-12 px-0 md:px-0 responsive-text`}
            data-testid="hero-description"
          >
            {description}
          </p>

          {/* CTA Button */}
          <div className={`${alignment === 'center' ? 'flex justify-center' : ''}`}>
            <Button 
              onClick={handleCTAClick}
              size="lg"
              style={{ backgroundColor: '#193a59', color: 'white' }}
              className="hover:bg-[#285d8a] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg px-8 py-3 font-semibold shadow-lg cta-button"
              data-testid="hero-cta-button"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}