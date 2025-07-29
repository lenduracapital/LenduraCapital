import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { prioritizeResourceLoading } from './utils/critical-resources'
import { optimizeJavaScriptExecution } from './utils/performance-enhancer'
import { enableUltraPerformanceOptimizations, applyCriticalContainment } from './utils/advanced-performance'

// Initialize all ultra-performance optimizations immediately for 90+ scores
const startTime = performance.now();
prioritizeResourceLoading();
optimizeJavaScriptExecution();
enableUltraPerformanceOptimizations();
applyCriticalContainment();

// Critical font preloading
const fontLink = document.createElement('link');
fontLink.rel = 'preload';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
fontLink.as = 'style';
fontLink.onload = () => {
  fontLink.rel = 'stylesheet';
};
document.head.appendChild(fontLink);

// Render app immediately
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Log performance
const loadTime = performance.now() - startTime;
console.log(`🚀 FundTek app loaded in ${Math.round(loadTime)}ms`);