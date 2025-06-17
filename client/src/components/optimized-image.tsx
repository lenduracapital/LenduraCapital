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

  // Generate optimized sources with multiple formats and sizes
  const getOptimizedSrc = (originalSrc: string, format: 'avif' | 'webp' | 'original' = 'original') => {
    if (originalSrc.startsWith('http')) {
      // External images - add query params for optimization
      const url = new URL(originalSrc);
      if (format === 'avif') {
        url.searchParams.set('fm', 'avif');
        url.searchParams.set('q', '75');
      } else if (format === 'webp') {
        url.searchParams.set('fm', 'webp');
        url.searchParams.set('q', '85');
      } else {
        url.searchParams.set('q', '90');
      }
      if (width) url.searchParams.set('w', width.toString());
      if (height) url.searchParams.set('h', height.toString());
      return url.toString();
    }
    
    // Local images - create optimized versions
    if (format === 'avif') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    } else if (format === 'webp') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return originalSrc;
  };

  // Generate responsive srcset for different screen densities
  const getResponsiveSrcset = (src: string, format: 'avif' | 'webp' | 'original' = 'original') => {
    if (!width) return getOptimizedSrc(src, format);
    
    const densities = [1, 1.5, 2];
    return densities
      .map(density => {
        const scaledWidth = Math.round(width * density);
        if (src.startsWith('http')) {
          const url = new URL(src);
          if (format === 'avif') {
            url.searchParams.set('fm', 'avif');
            url.searchParams.set('q', '75');
          } else if (format === 'webp') {
            url.searchParams.set('fm', 'webp');
            url.searchParams.set('q', '85');
          }
          url.searchParams.set('w', scaledWidth.toString());
          if (height) url.searchParams.set('h', Math.round(height * density).toString());
          return `${url.toString()} ${density}x`;
        }
        return `${getOptimizedSrc(src, format)} ${density}x`;
      })
      .join(', ');
  };

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {imageSrc ? (
        <picture>
          <source 
            srcSet={getResponsiveSrcset(imageSrc, 'avif')} 
            type="image/avif" 
            sizes={sizes}
          />
          <source 
            srcSet={getResponsiveSrcset(imageSrc, 'webp')} 
            type="image/webp" 
            sizes={sizes}
          />
          <img
            src={getOptimizedSrc(imageSrc)}
            srcSet={getResponsiveSrcset(imageSrc)}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
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