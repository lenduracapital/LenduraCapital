import { useState } from "react";
import CookieBanner from "./components/CookieBanner";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ color: '#85abe4', marginBottom: '20px' }}>FundTek Capital Group</h1>
      <p>React is now working! The site is being restored...</p>
      
      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setShowMessage(!showMessage)}
          style={{ 
            backgroundColor: '#85abe4', 
            color: 'white', 
            padding: '12px 24px', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {showMessage ? 'Hide Message' : 'Test Interactivity'}
        </button>
      </div>
      
      {showMessage && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f0f8ff', 
          border: '1px solid #85abe4',
          borderRadius: '8px'
        }}>
          <p>✓ React components are working</p>
          <p>✓ State management is functional</p>
          <p>✓ Ready to restore full website</p>
        </div>
      )}
      
      <CookieBanner />
    </div>
  );
}

export default App;