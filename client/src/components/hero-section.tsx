import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
const videoPath = "/video/optimized/hero-video-720p.mp4";
const newLogoPath = "/image_1750273835191.webp";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoQuality, setVideoQuality] = useState('720p');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };

  // Detect optimal video quality based on viewport and connection
  useEffect(() => {
    const getOptimalQuality = () => {
      const width = window.innerWidth;
      const connection = (navigator as any).connection;
      
      if (width <= 768 || (connection && connection.effectiveType === '3g')) {
        return '480p';
      }
      return '720p';
    };

    setVideoQuality(getOptimalQuality());
    
    const handleResize = () => setVideoQuality(getOptimalQuality());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Enhanced intersection observer with performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Delay video loading slightly to prioritize critical content
          const timer = setTimeout(() => {
            setVideoLoaded(true);
          }, 150);
          observer.disconnect();
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
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
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          poster="/video/optimized/hero-poster.webp"
          onLoadStart={() => setVideoLoaded(true)}
          onCanPlayThrough={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          aria-label="FundTek Capital Group business financing solutions showcase"
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            contain: 'layout style paint'
          }}
        >
          <source src="/video/optimized/hero-video-720p.mp4" type="video/mp4" />
          <source src="/video/optimized/hero-video-480p.mp4" type="video/mp4" media="(max-width: 768px)" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/video/optimized/hero-poster.webp')"
          }}
        />
      )}
      

      
      {/* Content on Left */}
      <div className="relative z-10 h-full flex items-start justify-start px-4 sm:px-6 lg:px-8 pt-32 md:pt-40">
        <div className="max-w-md text-left ml-0 md:ml-0 lg:ml-0 w-full md:w-auto">
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
            className="bg-[--primary] hover:bg-[--primary-dark] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 transform hover:scale-105 shadow-lg w-full sm:w-auto min-h-[44px]"
          >
            Get Approved in 24 Hours
          </Button>
        </div>
      </div>
    </section>
  );
}
