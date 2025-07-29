import { Button } from "@/components/ui/button";

// STABLE: Completely safe hero section without complex hooks or video
const backgroundImage = "/attached_assets/pexels-mikhail-nilov-6963857 (1)_1752762912598.jpg";

export default function HeroSection() {

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
    window.open('https://calendly.com/fundtekcapitalgroup/15min', '_blank');
  };

  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#1e293b'
      }}
    >
      {/* CRITICAL: Disable video entirely for maximum performance */}
      {false && shouldPlayVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          preload="none"
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
      
      {/* Static background image for maximum performance */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${videoPoster})`,
          zIndex: 0
        }}
      />
      
      {/* Background image is now always visible until video loads */}
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