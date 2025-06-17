import { useState, useEffect, useRef } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "100vw"
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string | undefined>(priority ? src : undefined);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  // Generate WebP and fallback sources
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'original' = 'original') => {
    if (originalSrc.startsWith('http')) {
      // External images - add query params for optimization
      const url = new URL(originalSrc);
      if (format === 'webp') {
        url.searchParams.set('fm', 'webp');
      }
      url.searchParams.set('q', '85');
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    
    // Local images - return as-is (Vite handles optimization)
    return originalSrc;
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {imageSrc ? (
        <picture>
          <source 
            srcSet={getOptimizedSrc(imageSrc, 'webp')} 
            type="image/webp" 
            sizes={sizes}
          />
          <img
            src={getOptimizedSrc(imageSrc)}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } w-full h-full object-cover`}
            onLoad={() => setIsLoaded(true)}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
      ) : (
        <div 
          className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        >
          <div className="w-8 h-8 bg-gray-300 rounded"></div>
        </div>
      )}
    </div>
  );
}