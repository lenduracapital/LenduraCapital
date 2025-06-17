# Performance Optimization Implementation Guide

## Video Optimization (Priority: High)

### Current Issue
- Hero video: ~8.5MB file size
- Impacts Largest Contentful Paint (LCP)
- Mobile data usage concerns

### Implementation Steps

#### 1. Video Format Optimization
```javascript
// client/src/components/hero-section.tsx
const VideoComponent = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video 
      ref={videoRef}
      preload="metadata"
      poster="/optimized-poster.webp"
      className="w-full h-full object-cover"
      onLoadStart={() => console.log('Video loading started')}
    >
      <source src="/hero-video.webm" type="video/webm" />
      <source src="/hero-video.mp4" type="video/mp4" />
    </video>
  );
};
```

#### 2. Lazy Loading Implementation
```javascript
// Enhanced intersection observer for video loading
const useLazyVideo = (threshold = 0.1) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [elementRef, shouldLoad];
};
```

#### 3. Progressive Enhancement
```javascript
// Fallback for slow connections
const useConnectionAware = () => {
  const [connection, setConnection] = useState(null);
  
  useEffect(() => {
    if ('connection' in navigator) {
      const conn = navigator.connection;
      setConnection(conn);
      
      const updateConnection = () => setConnection({...conn});
      conn.addEventListener('change', updateConnection);
      return () => conn.removeEventListener('change', updateConnection);
    }
  }, []);
  
  return connection;
};
```

## Core Web Vitals Monitoring

### Implementation
```javascript
// client/src/lib/performance-monitor.ts
export const reportWebVitals = (metric) => {
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
};

// Usage in main.tsx
import { reportWebVitals } from './lib/performance-monitor';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(reportWebVitals);
getFID(reportWebVitals);
getFCP(reportWebVitals);
getLCP(reportWebVitals);
getTTFB(reportWebVitals);
```

## Bundle Optimization

### Current Metrics
- JavaScript: ~180KB (within 250KB budget)
- CSS: ~45KB (within 50KB budget)
- Total page: ~11.2MB (exceeds 8MB budget)

### Optimization Strategy
1. **Code Splitting**: Implement route-based chunks
2. **Tree Shaking**: Remove unused dependencies
3. **Asset Optimization**: Compress images, use WebP/AVIF
4. **Caching Strategy**: Service worker implementation

## Recommended Performance Budgets

| Resource Type | Current | Target | Priority |
|---------------|---------|---------|----------|
| JS Bundle | 180KB | <200KB | Medium |
| CSS Bundle | 45KB | <50KB | Low |
| Hero Video | 8.5MB | <3MB | High |
| Images | 2.1MB | <1.5MB | Medium |
| Total Page | 11.2MB | <5MB | High |

## Implementation Timeline

### Week 1: Critical Optimizations
- [ ] Video format conversion (WebM)
- [ ] Lazy loading implementation
- [ ] Performance monitoring setup

### Week 2: Advanced Optimizations
- [ ] Image optimization pipeline
- [ ] Service worker caching
- [ ] Bundle analysis and optimization

### Week 3: Monitoring & Validation
- [ ] Real user monitoring setup
- [ ] Performance regression testing
- [ ] Mobile performance validation