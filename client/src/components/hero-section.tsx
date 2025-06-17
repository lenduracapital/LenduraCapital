import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import videoPath from "@assets/Video (FundTek) (3)_1749674184351.mp4";
import newLogoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  useEffect(() => {
    // Progressive video loading with intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Load video only when hero section is visible
          const timer = setTimeout(() => {
            setVideoLoaded(true);
          }, 100);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const heroElement = document.querySelector('.hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section relative h-screen overflow-hidden">
      {/* Background Video with Enhanced Optimization */}
      {videoLoaded ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlayThrough={() => console.log('Video ready to play')}
        >
          <source src={videoPath} type="video/mp4" />
          <source src={videoPath.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80')"
          }}
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content on Left */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8">
        <div className="max-w-md text-left ml-4 md:ml-8 lg:ml-16 w-full md:w-auto">
          <h1 className="responsive-heading-lg font-bold text-white mb-4 leading-tight hero-text">
            Flexible Financing for <span style={{ color: '#85abe4' }}>Every Industry</span>
          </h1>
          <p className="text-white text-base md:text-lg mb-6 leading-relaxed text-shadow">
            Empower your business with custom tailored financial and business solutions
          </p>
          <p className="text-white text-base md:text-lg mb-8 text-shadow">
            Call us at <span className="text-[--primary] font-bold">(305) 307-4658</span> to see your options
          </p>
          
          <Button 
            onClick={handleApplyNow}
            className="bg-[--primary] hover:bg-[--primary-dark] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}
