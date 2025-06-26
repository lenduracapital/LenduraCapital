import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize performance monitoring only in browser
if (typeof window !== 'undefined') {
  import("./utils/performance-monitor").then(({ performanceMonitor }) => {
    // Performance monitor automatically initializes
  });
}

// Service Worker registration handled by external script

createRoot(document.getElementById("root")!).render(<App />);
