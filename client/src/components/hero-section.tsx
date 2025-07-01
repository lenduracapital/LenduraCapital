import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import videoPath from "@assets/Video (FundTek)_1751295081956.webm";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";
import cityBackgroundPath from "@assets/image_1751304641909.png";

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleApplyNow = () => {
    window.open('https://form.jotform.com/251417715331047', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${cityBackgroundPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
        style={{
          zIndex: 1
        }}
      >
        <source src={videoPath} type="video/webm" />
      </video>



      {/* Text Content Overlay */}
      <div className="relative z-20 text-white px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center h-full">
          <div className="w-full lg:w-1/2 space-y-8 pt-2 md:pt-3">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '900' }}>
              Flexible Financing for Every Industry
            </h1>
            
            <p className="mb-4 max-w-2xl leading-relaxed" style={{ fontSize: '22px' }}>
              Empower your business today with custom and tailor made business solutions
            </p>
            
            <div className="mb-6" style={{ fontSize: '20px' }}>
              Call us today: 
              <button 
                onClick={handlePhoneClick}
                className="text-white hover:text-blue-200 font-semibold transition-colors duration-300 ml-2"
              >
                (305) 307-4658
              </button>
            </div>
            
            <Button 
              onClick={handleApplyNow}
              size="lg" 
              className="bg-[#85abe4] hover:bg-[#7299d1] text-white font-semibold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
            >
              Get Approved in 24 Hours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}