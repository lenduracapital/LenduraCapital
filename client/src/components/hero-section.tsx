import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

import videoPath from "@assets/Video (FundTek)_1751295081956.webm";
import newLogoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";


export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Aggressive video preloading and instant start
    const startVideoImmediately = () => {
      if (videoRef.current && !videoStarted) {
        const video = videoRef.current;
        video.muted = true;
        video.currentTime = 0;
        
        // Force immediate load and play
        video.load();
        video.play().then(() => {
          setVideoStarted(true);
          setVideoLoaded(true);
        }).catch(() => {
          // Fallback for autoplay restrictions
          setVideoLoaded(true);
        });
      }
    };

    // Start video immediately when component mounts
    startVideoImmediately();

    // Also try on any user interaction for mobile
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    const handleInteraction = () => startVideoImmediately();
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, [videoStarted]);

  useEffect(() => {
    // Enhanced autoplay with performance optimization
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Apply safe video performance optimizations
      video.style.transform = 'translateZ(0)';
      video.style.willChange = 'transform, opacity';
      video.preload = 'auto';
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('x5-playsinline', 'true');
      
      // Force remove any controls
      video.removeAttribute('controls');
      video.controls = false;
      
      // Aggressive play button removal
      const hidePlayButton = () => {
        const playButtons = video.querySelectorAll('*');
        playButtons.forEach(button => {
          if (button instanceof HTMLElement) {
            button.style.display = 'none';
            button.style.visibility = 'hidden';
            button.style.opacity = '0';
          }
        });
      };
      
      // Hide play button repeatedly
      hidePlayButton();
      setInterval(hidePlayButton, 100);
      
      // Optimize video loading
      video.load();
      
      // Force immediate playback with aggressive retry
      const attemptPlay = () => {
        video.muted = true; // Ensure muted for autoplay
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setVideoLoaded(true);
          }).catch(() => {
            // Fallback for autoplay restrictions
            const startVideoOnInteraction = () => {
              video.play().catch(console.error);
              document.removeEventListener('touchstart', startVideoOnInteraction);
              document.removeEventListener('click', startVideoOnInteraction);
              document.removeEventListener('keydown', startVideoOnInteraction);
            };
            
            document.addEventListener('touchstart', startVideoOnInteraction, { once: true });
            document.addEventListener('click', startVideoOnInteraction, { once: true });
            document.addEventListener('keydown', startVideoOnInteraction, { once: true });
          });
        }
      };

      // Attempt play when metadata loads
      video.addEventListener('loadedmetadata', attemptPlay);
      video.addEventListener('canplay', attemptPlay);
      
      return () => {
        video.removeEventListener('loadedmetadata', attemptPlay);
        video.removeEventListener('canplay', attemptPlay);
      };
    }
  }, []);

  const handleApplyNow = () => {
    window.open("https://form.jotform.com/251417715331047", "_blank");
  };



  return (
    <section 
      className="hero-section relative h-screen overflow-hidden" 
      style={{ 
        marginTop: 0, 
        paddingTop: 0,
        backgroundColor: '#1e3a8a'
      }}
    >
      {/* Background Video with play button blocking overlay */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          x5-video-player-type="h5"
          x5-video-player-fullscreen="false"
          x5-video-orientation="portraint"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onError={() => setVideoLoaded(false)}
          onContextMenu={(e) => e.preventDefault()}
          aria-label="FundTek Capital Group business financing solutions showcase"
          style={{ 
            objectFit: 'cover',
            WebkitTransform: 'translate3d(0,0,0)',
            transform: 'translate3d(0,0,0)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: 1,
            pointerEvents: 'none',
            outline: 'none',
            border: 'none',
            contain: 'strict'
          }}
        >
          <source src={videoPath} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Click overlay to start video */}
        {!videoStarted && (
          <div 
            className="absolute inset-0 w-full h-full cursor-pointer"
            style={{
              zIndex: 2,
              background: 'transparent'
            }}
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play();
                setVideoStarted(true);
                setVideoLoaded(true);
              }
            }}
          />
        )}
      </div>

      {/* Content on Left */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="max-w-md text-left ml-0 md:ml-0 lg:ml-0 w-full md:w-auto">
          <h1 className="responsive-heading-lg font-bold text-white mb-4 leading-tight hero-text" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>
            Flexible Financing for <span style={{ color: '#85abe4', textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0px 0px 8px rgba(0,0,0,0.6)' }}>Every Industry</span>
          </h1>
          <p className="text-white text-base md:text-lg mb-6 leading-relaxed" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0px 0px 6px rgba(0,0,0,0.6)' }}>
            Empower your business with <span className="text-[#85abe4] font-semibold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0px 0px 6px rgba(0,0,0,0.6)' }}>custom tailored</span> financial and <span className="text-[#85abe4] font-semibold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0px 0px 6px rgba(0,0,0,0.6)' }}>business solutions</span>
          </p>
          <p className="text-white text-base md:text-lg mb-8" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0px 0px 6px rgba(0,0,0,0.6)' }}>
            Call us at <a href="https://calendly.com/admin-fundtekcapitalgroup/30min" target="_blank" rel="noopener noreferrer" className="text-[#85abe4] font-bold hover:text-[#7299d1] transition-colors duration-200 cursor-pointer" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.8), 0px 0px 6px rgba(0,0,0,0.6)' }}>(305) 307-4658</a> to see your options
          </p>
          
          <Button 
            onClick={handleApplyNow}
            className="bg-[#85abe4] hover:bg-[#7299d1] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-1 shadow-lg w-full sm:w-auto min-h-[44px] active:scale-95"
          >
            Get Approved in 24 Hours
          </Button>
        </div>
      </div>
    </section>
  );
}
