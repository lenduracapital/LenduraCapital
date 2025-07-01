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
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl space-y-4 pt-2 md:pt-3">
            <h1 className="font-bold leading-tight mb-2" style={{ fontSize: '62px' }}>
              Flexible<br />
              Financing for<br />
              <span style={{ color: '#85abe4' }}>Every Industry</span>
            </h1>
            
            <p className="mb-2 max-w-2xl text-[23px]" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>
              Empower your business with <span style={{ color: '#85abe4', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>custom tailored</span><br />
              financial and <span style={{ color: '#85abe4', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>business solutions</span>
            </p>
            
            <p className="mb-4" style={{ fontSize: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>
              Call us at <span style={{ color: '#85abe4', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>(305) 307-4658</span> to see your options
            </p>
            
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