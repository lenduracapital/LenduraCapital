import { useState } from "react";

function App() {
  const [test, setTest] = useState("React is working!");
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#85abe4' }}>FundTek Capital Group</h1>
      <p>{test}</p>
      <button 
        onClick={() => setTest("Button clicked - React is functional!")}
        style={{ 
          backgroundColor: '#85abe4', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px' 
        }}
      >
        Test React
      </button>
    </div>
  );
}

export default App;