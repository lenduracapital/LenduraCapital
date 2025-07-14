import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { PerformanceEnhancer } from "./utils/performance-enhancer";
import { preventCLS } from "./utils/prevent-cls";

// Initialize performance enhancements
const performanceEnhancer = PerformanceEnhancer.getInstance();
performanceEnhancer.init();
performanceEnhancer.measurePerformance();

// Prevent Cumulative Layout Shift
preventCLS();

// Simple font preloading after page loads
window.addEventListener('load', () => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
  fontLink.as = 'style';
  document.head.appendChild(fontLink);
});

createRoot(document.getElementById("root")!).render(<App />);