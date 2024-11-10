// src/reportWebVitals.js
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

export const sendToGoogleAnalytics = ({ name, delta, id }) => {
  if (typeof window.gtag !== 'function') {
    console.warn('Google Analytics is not initialized');
    return;
  }

  window.gtag('event', name, {
    event_category: 'Web Vitals',
    value: Math.round(delta),
    event_label: id,
    non_interaction: true,
  });
};

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    onCLS(onPerfEntry);
    onINP(onPerfEntry);
    onLCP(onPerfEntry);
    onFCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

export default reportWebVitals;
