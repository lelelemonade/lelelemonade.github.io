import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This is a placeholder for your Google Analytics measurement ID
// In production, this should be loaded from an environment variable
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Only initialize Google Analytics if measurement ID is provided
    if (MEASUREMENT_ID) {
      // Load Google Analytics script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
      document.head.appendChild(script);

      // Initialize Google Analytics
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (MEASUREMENT_ID && window.gtag) {
      window.gtag('config', MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <AnalyticsContext.Provider value={{}}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => useContext(AnalyticsContext);
