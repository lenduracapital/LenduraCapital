import { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
}

export default function OptimizedImage({ src, alt, className = '', style = {}, priority = false }: OptimizedImageProps) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={`relative ${className}`} style={style}>
      {/* Placeholder with blur effect */}
      {!hasLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ filter: 'blur(20px)' }}
        />
      )}
      
      {/* Actual image */}
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${hasLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{
            ...style,
            transition: 'opacity 0.3s ease-in-out',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          onLoad={() => setHasLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}
    </div>
  );
}