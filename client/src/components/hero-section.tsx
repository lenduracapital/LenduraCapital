import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import videoPath from "@assets/Video (FundTek) (3)_1749674184351.mp4";
import newLogoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750167134599.png";
import logoPath from "@assets/ChatGPT Image Jun 5, 2025, 12_13_54 PM_1750176250237.png";
import cityscapeImage from "@assets/image_1750955621069.png";

export default function HeroSection() {
  const [videoLoaded, setVideoLoaded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Enhanced autoplay with performance optimization
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Optimize video loading
      video.load();
      
      // Try immediate playback
      const attemptPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
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
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${cityscapeImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Video with improved loading */}
      <video 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        preload="metadata"
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => setVideoLoaded(false)}
        onCanPlay={() => setVideoLoaded(true)}
        aria-label="FundTek Capital Group business financing solutions showcase"
        style={{ 
          objectFit: 'cover',
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          zIndex: videoLoaded ? 1 : 0
        }}
      >
        <source src={videoPath} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content on Left */}
      <div className="relative z-10 h-full flex items-center justify-start px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
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
