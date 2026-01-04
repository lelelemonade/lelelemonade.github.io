import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const rootElement = document.getElementById('stickers-root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Navigate to stickers route on load
window.addEventListener('load', () => {
  if (window.location.hash === '') {
    window.location.hash = '#/stickers';
  }
});

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/stickers-sw.js')
      .catch((error) => {
        console.log('SW registration failed: ', error);
      });
  });
}
