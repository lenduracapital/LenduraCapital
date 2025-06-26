import { createRoot } from "react-dom/client";
import { createElement } from "react";

// Simple fallback function
function createFallback(message: string) {
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial;">
      <h1 style="color: #85abe4;">FundTek Capital Group</h1>
      <p>${message}</p>
      <button onclick="location.reload()" style="background: #85abe4; color: white; padding: 10px 20px; border: none; border-radius: 5px;">Reload Page</button>
    </div>
  `;
}

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    createFallback("Root element not found - check HTML structure");
  } else {
    // Simple React component without JSX
    const App = () => createElement('div', 
      { style: { padding: '20px', fontFamily: 'Arial' } },
      createElement('h1', { style: { color: '#85abe4' } }, 'FundTek Capital Group'),
      createElement('p', null, 'React is working! Site restored.'),
      createElement('button', {
        style: { background: '#85abe4', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' },
        onClick: () => alert('React functional!')
      }, 'Test React')
    );
    
    const root = createRoot(rootElement);
    root.render(createElement(App));
    console.log("React mounted successfully");
  }
} catch (error: any) {
  console.error("React error:", error);
  createFallback(`React error: ${error?.message || 'Unknown error'}`);
}
