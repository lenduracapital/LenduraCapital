import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  placeholder?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  lazy = true, 
  placeholder,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [isInView, setIsInView] = useState(!lazy);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const shouldLoad = !lazy || isInView;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse rounded"
          style={{ aspectRatio: '16/9' }}
        />
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={shouldLoad ? src : placeholder}
        alt={alt}
        onLoad={handleLoad}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />
    </div>
  );
}