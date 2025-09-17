import { Button } from "@/components/ui/button";
import { HeroImage } from "@/components/ui/optimized-image";
import heroImage from "@assets/pexels-sanaan-3125171_1758003830156.jpg";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.location.href = '/apply-now';
  };

  return (
    <section 
      className="hero-section relative"
      style={{ 
        width: '100%', 
        height: '100dvh', 
        minHeight: '600px', 
        maxHeight: '100dvh',
        contain: 'layout style paint size'
      }}
      data-testid="section-hero"
      role="banner"
      aria-label="Business funding hero section"
    >
      {/* Optimized background image with WebP support and stable dimensions */}
      <div className="hero-background absolute inset-0 z-0">
        <HeroImage
          src={heroImage}
          alt="Professional business funding consultation"
          className="w-full h-full object-cover"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            backgroundColor: '#193a59',
            contain: 'layout'
          }}
          priority={true}
          quality={90}
          data-testid="image-hero-background"
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-[#193a59]/70 to-black/50 z-10"
          aria-hidden="true"
        />
      </div>
      {/* Text Content Overlay with stable positioning */}
      <div className="hero-content absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full pt-8 md:pt-12">
          <div className="max-w-2xl" style={{ contain: 'layout' }}>
            <h1 
              className="font-bold mb-4 text-white drop-shadow-lg" 
              style={{ fontSize: 'clamp(2.25rem, 6vw, 4rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-title"
            >
              Get Business Funding <span style={{ color: '#193a59' }}>Fast & Simple</span>
            </h1>
            
            <h2 
              className="mb-3 max-w-2xl text-white font-semibold drop-shadow-lg" 
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-subtitle"
            >
              Fast approvals, flexible terms, and funding solutions designed for your business success.
            </h2>
            
            <h3 
              className="mb-4 text-white font-medium drop-shadow-lg" 
              style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.75rem)', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-phone"
            >
              Call <a 
                href="https://calendly.com/sam-lenduracapital/30min"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#193a59' }} 
                className="font-semibold hover:underline"
                data-testid="link-phone-calendly"
              >
                (305) 834-7168
              </a> or apply online today.
            </h3>
            
            <Button 
              onClick={handleApplyNow}
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#1d4ed8] text-white font-semibold rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 bg-[#193a59] text-left w-full sm:w-auto px-4 py-3 text-base sm:px-6 sm:py-4 sm:text-lg md:px-8 md:text-[20px] h-auto min-h-[44px]"
              data-testid="button-hero-apply"
            >
              Apply Now - 24 Hour Approval
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}