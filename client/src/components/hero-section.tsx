import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Professional_business_financing_hero_5b4196fa.png";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.location.href = '/apply-now';
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(25, 58, 89, 0.7), rgba(25, 58, 89, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      data-testid="section-hero"
    >
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-6 md:pt-8" style={{ contain: 'layout' }}>
            <h1 
              className="font-bold mb-2 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight text-[62px]" 
              style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}
              data-testid="text-hero-title"
            >
              Get Business Funding <span style={{ color: '#193a59' }}>Fast & Simple</span>
            </h1>
            
            <p 
              className="mb-2 max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-[22px] lg:leading-relaxed text-[24px] font-medium" 
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' }}
              data-testid="text-hero-description"
            >
              Fast approvals, flexible terms, and funding solutions designed for your business success.
            </p>
            
            <p 
              className="mb-4 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-[20px] lg:leading-relaxed text-[22px] font-medium" 
              style={{ fontSize: 'clamp(0.875rem, 2.2vw, 1.25rem)' }}
              data-testid="text-hero-phone"
            >
              Call <span style={{ color: '#193a59' }}>(305) 834-7168</span> or apply online today.
            </p>
            
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