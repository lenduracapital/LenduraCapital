import { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  placeholder?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  webp?: boolean;
  'data-testid'?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  lazy = true, 
  placeholder,
  width,
  height,
  aspectRatio = '16/9',
  sizes = '100vw',
  priority = false,
  quality = 85,
  webp = false, // Disabled until we have actual WebP images
  'data-testid': testId,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy || priority);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Enhanced intersection observer with performance optimization
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const shouldLoad = !lazy || isInView || priority;

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
      data-testid={testId}
    >
      {/* Enhanced skeleton placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-skeleton-loading"
          style={{ 
            backgroundSize: '200px 100%',
            backgroundRepeat: 'no-repeat',
            aspectRatio
          }}
          aria-label="Loading image..."
        />
      )}
      
      {/* Error fallback */}
      {hasError && (
        <div 
          className="absolute inset-0 bg-gray-100 flex items-center justify-center text-gray-400"
          style={{ aspectRatio }}
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
      
      {/* Simple image without complex srcset generation */}
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-all duration-300 ease-out
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
            w-full h-full object-cover
          `}
          loading={lazy && !priority ? 'lazy' : 'eager'}
          decoding="async"
          {...props}
        />
      )}
    </div>
  );
}

// Higher-order component for critical images
export function CriticalImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage 
      {...props} 
      lazy={false} 
      priority={true}
      webp={false}
    />
  );
}

// Responsive hero image component
export function HeroImage({ 
  src, 
  alt, 
  className = '',
  ...props 
}: OptimizedImageProps) {
  return (
    <CriticalImage
      src={src}
      alt={alt}
      className={`w-full h-screen object-cover ${className}`}
      sizes="100vw"
      aspectRatio="16/9"
      quality={90}
      {...props}
    />
  );
}