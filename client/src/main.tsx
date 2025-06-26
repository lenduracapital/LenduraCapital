import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

console.log("Starting React app mount...");

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

if (rootElement) {
  try {
    const root = createRoot(rootElement);
    console.log("React root created successfully");
    root.render(<App />);
    console.log("App component rendered");
  } catch (error) {
    console.error("Error during React mount:", error);
  }
} else {
  console.error("Root element not found!");
}