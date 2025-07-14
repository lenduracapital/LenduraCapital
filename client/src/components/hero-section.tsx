import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { trackCTAClick } from "@/hooks/use-analytics-tracking";
import videoPath from "@assets/Video (FundTek)_1751295081956.webm";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";
import heroBackgroundPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";

// Video optimization hook
function useVideoOptimization() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Delay video loading slightly for better perceived performance
    const timer = setTimeout(() => {
      setShouldPlayVideo(true);
    }, 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);
  
  return { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile };
}

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile } = useVideoOptimization();

  // Enhanced video loading with intersection observer
  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    // Progressive video loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVideoLoaded) {
            video.load();
            video.play().catch(() => {
              // Fallback for autoplay restrictions
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.classList.add('loaded');
    };

    const handleLoadedData = () => {
      // Video is ready to play
      video.style.opacity = '1';
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [shouldPlayVideo, isVideoLoaded, setIsVideoLoaded]);

  const handleApplyNow = () => {
    trackCTAClick('Apply Now - Hero', 'Homepage Hero Section', 'Jotform Application');
    window.open('https://form.jotform.com/251417715331047', '_blank');
  };

  const handlePhoneClick = () => {
    trackCTAClick('Phone Number - Hero', 'Homepage Hero Section', 'Calendly Booking');
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1e293b', // Dark navy fallback
        backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%), url(${heroBackgroundPath})`, // Overlay with hero background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* High-Performance Video Background */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroBackgroundPath}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          x5-playsinline="true"
          webkit-playsinline="true"
          style={{
            zIndex: 1,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            willChange: 'opacity, transform',
            WebkitTransform: 'translate3d(0, 0, 0)',
            WebkitBackfaceVisibility: 'hidden',
            imageRendering: 'optimizeSpeed',
            contain: 'strict'
          }}
        >
          <source src={videoPath} type="video/webm" />
          <source src={videoPath.replace('.webm', '.mp4')} type="video/mp4" />
        </video>
      )}
      
      {/* Optimized background fallback */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-300 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${heroBackgroundPath})`,
          zIndex: 0,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'opacity'
        }}
      />
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-2 md:pt-3" style={{ contain: 'layout' }}>
            <h1 className="font-bold mb-2 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight text-[62px]" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}>
              Flexible<br />
              Financing for<br />
              <span style={{ color: '#85abe4' }}>Every Industry</span>
            </h1>
            
            <p className="mb-2 max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-[22px] lg:leading-relaxed text-[24px] font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' }}>
              Empower your business with <span style={{ color: '#85abe4' }}>custom tailored</span><br />
              financial and <span style={{ color: '#85abe4' }}>business solutions</span>
            </p>
            
            <p className="mb-4 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-[20px] lg:leading-relaxed text-[22px] font-medium" style={{ fontSize: 'clamp(0.875rem, 2.2vw, 1.25rem)' }}>
              Call us at <span style={{ color: '#85abe4' }}>(305) 307-4658</span> to see your options
            </p>
            
            <Button 
              onClick={handleApplyNow}
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#7299d1] text-white font-semibold rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 bg-[#85abe4] text-left w-full sm:w-auto px-4 py-3 text-base sm:px-6 sm:py-4 sm:text-lg md:px-8 md:text-[20px] h-auto min-h-[44px]"
            >
              Get Approved in 24 Hours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}