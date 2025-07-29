import { useState, useEffect, useRef } from "react";

// STABLE: Hero section with lightweight video implementation
export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simple video loading without complex hooks
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, []);

  const handleApplyNow = () => {
    try {
      window.open('https://form.jotform.com/251965461165159', '_blank');
    } catch (error) {
      console.error('Apply now error:', error);
    }
  };

  const handlePhoneClick = () => {
    try {
      window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
    } catch (error) {
      console.error('Phone click error:', error);
    }
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1e293b'
      }}
      aria-label="Hero section with business funding solutions"
      role="banner"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg"
        aria-label="Background video showing business professionals discussing funding solutions"
        title="FundTek Capital Group - Business Funding Solutions"
      >
        <source src="/attached_assets/Video (FundTek)_1751295081956.webm" type="video/webm" />
        <track kind="captions" src="" label="No audio track" default />
      </video>

      {/* Background image fallback */}
      {!videoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(/attached_assets/pexels-mikhail-nilov-6963857\ \(1\)_1752762912598.jpg)`
          }}
        />
      )}
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-2 md:pt-3">
            <h1 className="font-bold mb-2 text-4xl md:text-5xl lg:text-6xl leading-tight" id="main-heading">
              Flexible<br />
              Financing for<br />
              <span style={{ color: '#85abe4' }} aria-label="Every Industry - highlighted text">Every Industry</span>
            </h1>
            
            <p className="mb-2 max-w-2xl text-lg md:text-xl lg:text-2xl font-medium" aria-describedby="main-heading">
              Empower your business with <span style={{ color: '#85abe4' }} aria-label="custom tailored - highlighted text">custom tailored</span><br />
              loan programs designed to fuel your growth and success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                onClick={handleApplyNow}
                className="text-white px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 focus:ring-4 focus:ring-blue-300 focus:outline-none transform hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#85abe4',
                  borderColor: '#85abe4',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6b9bd8';
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 15px rgba(107, 155, 216, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#85abe4';
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                }}
                aria-label="Get approved for business funding in 24 hours - Opens application form in new window"
                role="button"
                tabIndex={0}
              >
                Get Approved in 24 Hours
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
    </section>
  );
}