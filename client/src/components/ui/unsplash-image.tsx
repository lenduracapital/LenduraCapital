import { OptimizedImage } from './optimized-image';

// Unsplash image optimization utility - only transforms Unsplash URLs
export function generateUnsplashUrl(baseUrl: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpg';
  fit?: 'crop' | 'scale' | 'fill';
  crop?: string;
} = {}) {
  const {
    width = 800,
    height = 450,
    quality = 85,
    format = 'webp',
    fit = 'crop',
    crop = 'faces,center'
  } = options;

  // Only transform Unsplash URLs - fall back to original for all other sources
  if (!isUnsplashUrl(baseUrl)) {
    return baseUrl;
  }

  // Extract photo ID from Unsplash URL
  const photoId = baseUrl.match(/photo-([^?]+)/)?.[1] || baseUrl.split('/').pop()?.split('?')[0];
  
  if (!photoId) return baseUrl;

  // Generate optimized Unsplash URL with modern formats
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    q: quality.toString(),
    fit,
    crop,
    fm: format,
    auto: 'format,compress'
  });

  return `https://images.unsplash.com/photo-${photoId}?${params.toString()}`;
}

// Helper function to detect Unsplash URLs
function isUnsplashUrl(url: string): boolean {
  return url.includes('unsplash.com') || url.includes('images.unsplash.com');
}

interface UnsplashImageProps {
  src: string;
  alt: string;
  className?: string;
  lazy?: boolean;
  width?: number;
  height?: number;
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  responsive?: boolean;
  'data-testid'?: string;
}

export function UnsplashImage({ 
  src,
  alt,
  className = '',
  lazy = true,
  width = 800,
  height = 450,
  aspectRatio = '16/9',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  quality = 85,
  responsive = true,
  'data-testid': testId,
  ...props
}: UnsplashImageProps) {
  // Check if this is an Unsplash URL - if not, use OptimizedImage directly
  const isUnsplash = isUnsplashUrl(src);
  
  if (!isUnsplash) {
    // For non-Unsplash images (local, attached_assets, etc.), use OptimizedImage directly
    return (
      <OptimizedImage
        src={src}
        alt={alt}
        className={className}
        lazy={lazy}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        sizes={sizes}
        priority={priority}
        data-testid={testId}
        {...props}
      />
    );
  }

  // For Unsplash images, apply optimization and format conversion
  const webpSrc = generateUnsplashUrl(src, {
    width,
    height,
    quality,
    format: 'webp'
  });

  // Generate responsive srcSet for different screen sizes (only for Unsplash)
  const generateSrcSet = (format: 'webp' | 'avif' | 'jpg') => {
    if (!responsive) return undefined;
    
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => {
      const url = generateUnsplashUrl(src, {
        width: size,
        height: Math.round(size * (height / width)),
        quality,
        format
      });
      return `${url} ${size}w`;
    }).join(', ');
  };

  return (
    <picture>
      {/* AVIF for modern browsers */}
      <source
        srcSet={generateSrcSet('avif')}
        sizes={sizes}
        type="image/avif"
      />
      
      {/* WebP for most browsers */}
      <source
        srcSet={generateSrcSet('webp')}
        sizes={sizes}
        type="image/webp"
      />
      
      {/* JPG fallback */}
      <source
        srcSet={generateSrcSet('jpg')}
        sizes={sizes}
        type="image/jpeg"
      />
      
      <OptimizedImage
        src={webpSrc}
        alt={alt}
        className={className}
        lazy={lazy}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        sizes={sizes}
        priority={priority}
        data-testid={testId}
        {...props}
      />
    </picture>
  );
}

