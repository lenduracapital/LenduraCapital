import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
// Performance monitoring temporarily disabled

// Service Worker registration handled by external script

createRoot(document.getElementById("root")!).render(<App />);
