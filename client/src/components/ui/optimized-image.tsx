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
  avif?: boolean;
  responsive?: boolean;
  'data-testid'?: string;
}

// Image optimization utility functions
function generateImageSrcSet(src: string, widths: number[] = [480, 768, 1024, 1200, 1920]) {
  const baseSrc = src.replace(/\.(jpg|jpeg|png)$/i, '');
  const ext = src.match(/\.(jpg|jpeg|png)$/i)?.[1] || 'jpg';
  
  return widths.map(width => {
    // For production, we'd generate different sized versions
    // For now, we'll use the original but indicate desired width
    return `${src} ${width}w`;
  }).join(', ');
}

function generateModernImageSources(src: string, options: { webp?: boolean; avif?: boolean } = {}) {
  const sources: Array<{ srcSet: string; type: string; sizes?: string }> = [];
  
  if (options.avif) {
    sources.push({
      srcSet: src.replace(/\.(jpg|jpeg|png)$/i, '.avif'),
      type: 'image/avif'
    });
  }
  
  if (options.webp) {
    sources.push({
      srcSet: src.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
      type: 'image/webp'
    });
  }
  
  return sources;
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
  webp = true,
  avif = false,
  responsive = true,
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

  const handleError = (error?: any) => {
    // Silently handle the error to prevent unhandled rejections
    if (error) {
      console.warn('Image load failed:', src, error);
    }
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
      
      {/* Enhanced image with modern format support */}
      {shouldLoad && !hasError && (
        <>
          {(webp || avif) && responsive ? (
            <picture className="w-full h-full">
              {generateModernImageSources(src, { webp, avif }).map((source, index) => (
                <source 
                  key={index}
                  srcSet={source.srcSet}
                  type={source.type}
                  sizes={sizes}
                />
              ))}
              <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                onLoad={handleLoad}
                onError={(e) => handleError(e)}
                className={`
                  transition-all duration-300 ease-out
                  ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                  w-full h-full object-cover
                `}
                loading={lazy && !priority ? 'lazy' : 'eager'}
                decoding="async"
                sizes={sizes}
                srcSet={responsive ? generateImageSrcSet(src) : undefined}
                onAbort={(e) => handleError(e)}
                onStalled={(e) => handleError(e)}
                {...props}
              />
            </picture>
          ) : (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              onLoad={handleLoad}
              onError={(e) => handleError(e)}
              className={`
                transition-all duration-300 ease-out
                ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                w-full h-full object-cover
              `}
              loading={lazy && !priority ? 'lazy' : 'eager'}
              decoding="async"
              sizes={sizes}
              srcSet={responsive ? generateImageSrcSet(src) : undefined}
              onAbort={(e) => handleError(e)}
              onStalled={(e) => handleError(e)}
              {...props}
            />
          )}
        </>
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

// Responsive hero image component with enhanced CLS prevention
export function HeroImage({ 
  src, 
  alt, 
  className = '',
  style,
  ...props 
}: OptimizedImageProps & { style?: React.CSSProperties }) {
  return (
    <CriticalImage
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        backgroundColor: '#193a59',
        contain: 'layout',
        minHeight: '600px',
        ...style
      }}
      width={1920}
      height={1080}
      sizes="100vw"
      aspectRatio="16/9"
      quality={90}
      {...props}
    />
  );
}