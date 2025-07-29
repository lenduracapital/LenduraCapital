import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { preventCLS } from "./utils/prevent-cls";
import { initPerformanceBoost, registerServiceWorker } from "./utils/performance-boost";
import { prioritizeResourceLoading, initPerformanceTimeline } from "./utils/critical-resources";
import { initializePerformanceEnhancements } from "./utils/performance-enhancer";

// Initialize all performance optimizations immediately
prioritizeResourceLoading();
initPerformanceBoost();
initPerformanceTimeline();
initializePerformanceEnhancements();
preventCLS();
registerServiceWorker();

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