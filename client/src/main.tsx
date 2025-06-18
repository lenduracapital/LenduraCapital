import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { performanceMonitor } from "./utils/performance-monitor";

// Initialize performance monitoring
performanceMonitor;

// Register Service Worker for enhanced caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => console.log('SW registered successfully'))
      .catch(() => console.log('SW registration failed'));
  });
}

createRoot(document.getElementById("root")!).render(<App />);
