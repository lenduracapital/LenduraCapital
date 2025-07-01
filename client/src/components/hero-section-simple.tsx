import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useLocation } from "wouter";

import videoPath from "@assets/Video (FundTek)_1751295081956.webm";
import newLogoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";

export default function HeroSectionSimple() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  const handleScheduleCall = () => {
    window.open("https://calendly.com/fundtekcapitalgroup/consultation", "_blank");
  };

  return (
    <section className="hero-section relative h-screen overflow-hidden">
      {/* Simple Background Video - No Fallbacks */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        preload="auto"
        aria-label="FundTek Capital Group business financing solutions showcase"
      >
        <source src={videoPath} type="video/webm" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Logo */}
          <div className="flex justify-center lg:justify-start">
            <img 
              src={logoPath} 
              alt="FundTek Capital Group" 
              className="h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 object-contain filter brightness-110 contrast-110"
            />
          </div>
          
          {/* Right Side - Text Content */}
          <div className="text-left text-white space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-wider">
              Flexible Financing for Every Industry
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl mb-6 max-w-2xl leading-relaxed" 
               style={{ fontSize: '22px' }}>
              Empower your business with fast, tailored funding solutions designed to accelerate growth and overcome cash flow challenges.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                onClick={handleApplyNow}
                className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 active:scale-95"
              >
                Get Approved in 24 Hours
              </Button>
              
              <p className="text-white text-lg sm:text-xl font-medium cursor-pointer hover:text-blue-200 transition-colors" 
                 onClick={handleScheduleCall}
                 style={{ fontSize: '20px' }}>
                Call us: (305) 307-4658
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}