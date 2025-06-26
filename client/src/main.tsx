import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { preloadCriticalImages, enableResourceHints } from "./utils/performance";

// Quick performance optimizations
preloadCriticalImages();
enableResourceHints();

createRoot(document.getElementById("root")!).render(<App />);