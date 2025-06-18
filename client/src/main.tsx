import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { performanceMonitor } from "./utils/performance-monitor";

// Initialize performance monitoring
performanceMonitor;

// Service Worker registration handled by external script

createRoot(document.getElementById("root")!).render(<App />);
