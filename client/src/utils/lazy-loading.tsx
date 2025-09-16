import React, { lazy, Suspense, ComponentType } from 'react';

// Loading skeleton components
export function ComponentSkeleton({ height = '200px' }: { height?: string }) {
  return (
    <div 
      className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
      style={{ 
        height,
        backgroundSize: '200px 100%',
        backgroundRepeat: 'no-repeat'
      }}
      role="status"
      aria-label="Loading content..."
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-4 w-3/4 mb-4" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-4 w-1/2 mb-2" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-20 w-full" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-4">
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-10 w-full rounded" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-10 w-full rounded" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-32 w-full rounded" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
      <div className="animate-skeleton-loading bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-10 w-32 rounded" style={{ backgroundSize: '200px 100%', backgroundRepeat: 'no-repeat' }} />
    </div>
  );
}

// Error fallback component
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div 
      className="p-6 text-center bg-red-50 border border-red-200 rounded-lg"
      role="alert"
    >
      <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
      <p className="text-red-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        data-testid="button-retry"
      >
        Try again
      </button>
    </div>
  );
}

// Simple Error Boundary Component
class SimpleErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      return <FallbackComponent error={this.state.error} resetErrorBoundary={() => this.setState({ hasError: false, error: null })} />;
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with error boundary
export function withLazyLoading<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType,
  errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>
) {
  const LazyComponent = lazy(importFunc);
  const FallbackComponent = fallback || ComponentSkeleton;
  const ErrorComponent = errorFallback || ErrorFallback;

  return function LazyWrapper(props: React.ComponentProps<T>) {
    return (
      <SimpleErrorBoundary fallback={ErrorComponent}>
        <Suspense fallback={<FallbackComponent />}>
          <LazyComponent {...props} />
        </Suspense>
      </SimpleErrorBoundary>
    );
  };
}

// Intersection Observer Hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isInView;
}

// Component for lazy loading sections
export function LazySection({ 
  children, 
  fallback = <ComponentSkeleton />,
  className = '',
  'data-testid': testId
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref);

  return (
    <div ref={ref} className={className} data-testid={testId}>
      {isInView ? children : fallback}
    </div>
  );
}

// Performance monitoring for lazy loaded components
export function withPerformanceMonitoring<T extends ComponentType<any>>(
  Component: T,
  componentName: string
) {
  return function PerformanceWrapper(props: React.ComponentProps<T>) {
    React.useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        // Log to performance API if available
        if ('performance' in window && 'measure' in performance) {
          performance.measure(`${componentName}-render`, {
            start: startTime,
            end: endTime,
          });
        }
        
        // Log slow components in development
        if (process.env.NODE_ENV === 'development' && renderTime > 100) {
          console.warn(`Slow component render: ${componentName} took ${renderTime.toFixed(2)}ms`);
        }
      };
    }, []);

    return <Component {...props} />;
  };
}

// Preload component data
export function preloadComponent(importFunc: () => Promise<{ default: ComponentType<any> }>) {
  return importFunc();
}

// Resource preloader utility
export function preloadResources(resources: Array<{ href: string; as: string; type?: string }>) {
  resources.forEach(({ href, as, type }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  });
}

// Dynamic import with error handling
export async function safeDynamicImport<T>(importFunc: () => Promise<T>): Promise<T | null> {
  try {
    return await importFunc();
  } catch (error) {
    console.error('Dynamic import failed:', error);
    return null;
  }
}