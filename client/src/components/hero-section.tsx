import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

import videoPath from "@assets/Video (FundTek)_1751295081956.webm";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const handleApplyClick = () => {
    window.open('https://form.jotform.com/251417715331047', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-blue-900">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={videoPath} type="video/webm" />
      </video>

      {/* Logo Overlay */}
      <div className="absolute top-4 left-8 md:top-8 md:left-16 z-30">
        <img 
          src={logoPath} 
          alt="FundTek Capital Group" 
          className="h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 w-auto object-contain brightness-110 contrast-110"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 text-white px-4 md:px-8 lg:px-16 max-w-7xl mx-auto w-full">
        <div className="flex items-center h-full">
          <div className="w-full lg:w-1/2 space-y-8 pt-2 md:pt-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2">
              <span style={{ fontSize: '22px' }}>Flexible Financing for</span><br />
              Every Industry
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl mb-3 max-w-2xl leading-relaxed">
              Empower your business with working capital funding from $10K to $20M. 
              Quick approvals, competitive rates, and flexible terms designed for your success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                onClick={handleApplyClick}
              >
                Get Approved in 24 Hours
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 text-lg rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95"
                onClick={handlePhoneClick}
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