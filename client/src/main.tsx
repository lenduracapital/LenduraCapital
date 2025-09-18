import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { preventCLS } from "./utils/prevent-cls";
import { initPerformanceBoost } from "./utils/performance-boost";
import { prioritizeResourceLoading, initPerformanceTimeline } from "./utils/critical-resources";
import { reportWebVitals } from "./utils/performance-monitor";
import { initAdvancedPerformance } from "./utils/advanced-performance";
import { initPerformanceOptimization } from "./utils/performance-optimization";
import AccessibilityEnhancer from "./utils/accessibility-enhancements";

// Initialize all performance optimizations immediately
prioritizeResourceLoading();
initPerformanceBoost();
initPerformanceTimeline();
preventCLS();
// Service worker registration moved to service-worker-registration.ts

// Initialize advanced performance optimizations for 90+ Lighthouse scores
initAdvancedPerformance();

// Initialize comprehensive performance optimization
initPerformanceOptimization();

// Initialize service worker for aggressive caching
if (import.meta.env.PROD) {
  import('./utils/service-worker-registration').then(({ initServiceWorker }) => {
    initServiceWorker();
  });
}

// Performance monitoring and resource optimization will be handled by other utilities

// Initialize accessibility enhancements
AccessibilityEnhancer.initialize();

// Report web vitals to console (could be sent to analytics)
reportWebVitals((metric) => {
  console.log(`Web Vitals ${metric.name}:`, metric.value);
  
  // Optional: Send to analytics
  // gtag('event', metric.name, {
  //   custom_parameter_1: metric.value
  // });
});

// Critical font preloading
const fontLink = document.createElement('link');
fontLink.rel = 'preload';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
fontLink.as = 'style';
fontLink.onload = () => {
  fontLink.rel = 'stylesheet';
};
document.head.appendChild(fontLink);

// Render app immediately
createRoot(document.getElementById("root")!).render(<App />);