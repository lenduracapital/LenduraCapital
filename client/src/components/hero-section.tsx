import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { videoPreloader } from "@/utils/video-preloader";


// Optimized video paths with multiple quality options
const videoSources = {
  webm720: "/video/optimized/hero-video-720p.webm",
  mp4720: "/video/optimized/hero-video-720p.mp4", 
  mp4480: "/video/optimized/hero-video-480p.mp4",
  fallback: "/attached_assets/Video (FundTek)_1751295081956.webm"
};
const videoPoster = "/video/optimized/hero-poster.jpg";
import logoPath from "@assets/image_1752182868701.png";
import heroBackgroundPath from "@assets/image_1752190793949.png";

// Enhanced video optimization hook with intelligent loading
function useVideoOptimization() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [connectionSpeed, setConnectionSpeed] = useState<'fast' | 'slow'>('fast');
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Detect connection speed
    const checkConnectionSpeed = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          // If effective type is 3g or slower, or downlink is less than 1.5 Mbps
          if (connection.effectiveType && (connection.effectiveType === '3g' || connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g')) {
            setConnectionSpeed('slow');
          } else if (connection.downlink && connection.downlink < 1.5) {
            setConnectionSpeed('slow');
          }
        }
      }
    };
    
    checkMobile();
    checkConnectionSpeed();
    window.addEventListener('resize', checkMobile);
    
    // Start preloading video immediately
    videoPreloader.preloadVideo({
      videoSources,
      poster: videoPoster
    });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile, isVideoPlaying, setIsVideoPlaying, connectionSpeed };
}

export default function HeroSection() {
  const [, setLocation] = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { isVideoLoaded, setIsVideoLoaded, shouldPlayVideo, isMobile, isVideoPlaying, setIsVideoPlaying, connectionSpeed } = useVideoOptimization();

  // Optimized video loading with adaptive streaming
  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) return;

    const video = videoRef.current;
    
    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      setIsVideoPlaying(true);
      video.classList.add('loaded');
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      setIsVideoPlaying(true);
    };

    const handlePlay = () => {
      setIsVideoPlaying(true);
    };

    // Intelligent video loading based on device and connection
    const loadVideo = () => {
      // Check if video is already preloaded for instant playback
      const bestSource = (isMobile || connectionSpeed === 'slow') ? 
        videoSources.mp4480 : videoSources.webm720;
        
      if (videoPreloader.isPreloaded(bestSource)) {
        // Video is preloaded - start immediately
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      } else {
        // Not preloaded - load and play
        video.load();
        video.play().catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    // Start loading immediately for fast connections, brief delay for slow ones
    const delay = connectionSpeed === 'slow' ? 200 : 0;
    const videoTimer = setTimeout(loadVideo, delay);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);

    return () => {
      clearTimeout(videoTimer);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
    };
  }, [shouldPlayVideo, setIsVideoLoaded, setIsVideoPlaying, connectionSpeed]);

  const handleApplyNow = () => {
    window.open('https://form.jotform.com/251965461165159', '_blank');
  };

  const handlePhoneClick = () => {
    window.open('https://calendly.com/lenduracapital/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1e293b'
      }}
    >
      {/* Optimized Video Background with Adaptive Quality */}
      {shouldPlayVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={videoPoster}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          x5-playsinline="true"
          webkit-playsinline="true"
          style={{
            zIndex: isVideoLoaded ? 1 : 0,
            transform: 'translateZ(0)', // GPU acceleration
            willChange: 'transform',
            filter: isVideoLoaded ? 'none' : 'blur(4px)'
          }}
        >
          {/* Serve appropriate quality based on device and connection */}
          {!isMobile && connectionSpeed === 'fast' && (
            <source src={videoSources.webm720} type="video/webm" />
          )}
          {!isMobile && connectionSpeed === 'fast' && (
            <source src={videoSources.mp4720} type="video/mp4" />
          )}
          {(isMobile || connectionSpeed === 'slow') && (
            <source src={videoSources.mp4480} type="video/mp4" />
          )}
          <source src={videoSources.fallback} type="video/webm" />
        </video>
      )}
      
      {/* Poster image fallback when video is loading */}
      {!isVideoLoaded && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${videoPoster})`,
            zIndex: 0
          }}
        />
      )}
      
      {/* Background image is now always visible until video loads */}
      {/* Text Content Overlay */}
      <div className="absolute left-0 top-0 z-20 text-white pl-4 md:pl-8 w-full h-full">
        <div className="flex items-center h-full">
          <div className="max-w-2xl pt-6 md:pt-8" style={{ contain: 'layout' }}>
            <h1 className="font-bold mb-2 sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight text-[62px]" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)' }}>
              Get Business Funding <span style={{ color: '#2563eb' }}>Without the Wait</span>
            </h1>
            
            <p className="mb-2 max-w-2xl sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed lg:text-[22px] lg:leading-relaxed text-[24px] font-medium" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.375rem)' }}>
              Fast approvals, flexible terms, and funding designed for your business needs.
            </p>
            
            <p className="mb-4 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed lg:text-[20px] lg:leading-relaxed text-[22px] font-medium" style={{ fontSize: 'clamp(0.875rem, 2.2vw, 1.25rem)' }}>
              Call <span style={{ color: '#2563eb' }}>(305) 834-7168</span> or apply online in minutes.
            </p>
            
            <Button 
              onClick={handleApplyNow}
              size="lg" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#1d4ed8] text-white font-semibold rounded-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 active:scale-95 bg-[#2563eb] text-left w-full sm:w-auto px-4 py-3 text-base sm:px-6 sm:py-4 sm:text-lg md:px-8 md:text-[20px] h-auto min-h-[44px]"
            >
              Get Approved in 24 Hours
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}