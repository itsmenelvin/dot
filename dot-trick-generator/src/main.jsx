// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './components/context/ThemeContext';
import reportWebVitals, { sendToGoogleAnalytics } from './reportWebVitals';

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker Registered');
  }).catch((error) => {
    console.error('Service Worker Registration Failed:', error);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// Start measuring performance in your app, pass a function to send results to Google Analytics
reportWebVitals(sendToGoogleAnalytics);
