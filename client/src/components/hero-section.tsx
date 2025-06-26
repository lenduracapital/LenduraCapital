import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import videoPath from "@assets/Video (FundTek) (3)_1749674184351.mp4";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={videoPath} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white pt-16 md:pt-20">
        <div className="flex items-center min-h-screen">
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-wider">
              Flexible Financing for Every Industry
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Get the working capital your business needs with our comprehensive funding solutions. 
              Fast approval, competitive rates, and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleApplyNow}
                className="bg-white text-black px-8 py-4 text-lg font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Apply Now
              </Button>
              <Button
                onClick={() => document.getElementById('process-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-white text-white px-8 py-4 text-lg font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}