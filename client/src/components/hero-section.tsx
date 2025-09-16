import { Button } from "@/components/ui/button";
import heroImage from "@assets/pexels-sanaan-3125171_1758003830156.jpg";

export default function HeroSection() {
  const handleApplyNow = () => {
    window.location.href = '/apply-now';
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(25, 58, 89, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      data-testid="section-hero"
    >
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-start h-full pt-48 md:pt-56">
          <div className="max-w-2xl" style={{ contain: 'layout' }}>
            <h1 
              className="font-bold mb-4 text-white drop-shadow-lg" 
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-title"
            >
              Get Business Funding <span style={{ color: '#193a59' }}>Fast & Simple</span>
            </h1>
            
            <h2 
              className="mb-4 max-w-2xl text-white font-semibold drop-shadow-lg" 
              style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-subtitle"
            >
              Fast approvals, flexible terms, and funding solutions designed for your business success.
            </h2>
            
            <h3 
              className="mb-6 text-white font-medium drop-shadow-lg" 
              style={{ fontSize: 'clamp(1rem, 2.2vw, 1.375rem)', textShadow: '1px 1px 3px rgba(0,0,0,0.8)' }}
              data-testid="text-hero-phone"
            >
              Call <span style={{ color: '#193a59' }} className="font-semibold">(305) 834-7168</span> or apply online today.
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