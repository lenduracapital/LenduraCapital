import { createElement } from "react";

function App() {
  return createElement('div', 
    { style: { padding: '20px', fontFamily: 'Arial, sans-serif' } },
    createElement('h1', 
      { style: { color: '#85abe4', marginBottom: '20px' } }, 
      'FundTek Capital Group'
    ),
    createElement('p', null, 'React is working! Website restored.'),
    createElement('button', 
      { 
        style: { 
          backgroundColor: '#85abe4', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer'
        },
        onClick: () => alert('React is functional!')
      }, 
      'Test Button'
    )
  );
}

export default App;