import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./lib/performance-monitor";

createRoot(document.getElementById("root")!).render(<App />);
