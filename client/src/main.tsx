import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./utils/performance-monitor";

// Service Worker registration handled by external script

createRoot(document.getElementById("root")!).render(<App />);
