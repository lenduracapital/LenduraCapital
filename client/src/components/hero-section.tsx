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
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2">
              Flexible Financing for<br />
              Every Industry
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-3 max-w-2xl leading-relaxed" style={{ fontSize: '22px' }}>
              Empower your business with working capital funding from $10K to $20M. 
              Quick approvals, competitive rates, and flexible terms designed for your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button 
                onClick={handleApplyNow}
                size="lg" 
                className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Get Approved in 24 Hours
              </Button>
              
              <Button 
                onClick={handlePhoneClick}
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                Schedule Consultation
              </Button>
            </div>
            
            <div className="text-lg md:text-xl">
              <span style={{ fontSize: '20px' }}>Call us today: </span>
              <button 
                onClick={handlePhoneClick}
                className="text-white hover:text-blue-200 font-semibold transition-colors duration-300"
              >
                (305) 307-4658
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}