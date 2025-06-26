import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeSpeedOptimizations } from "./utils/speedOptimizations";

// Initialize our speed optimizations
initializeSpeedOptimizations();

createRoot(document.getElementById("root")!).render(<App />);