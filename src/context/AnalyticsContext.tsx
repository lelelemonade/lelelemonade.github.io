import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

// This is a placeholder for your Google Analytics measurement ID
// In production, this should be loaded from an environment variable
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

// Extend the Window interface to include gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

type AnalyticsContextType = Record<string, never>;

const AnalyticsContext = createContext<AnalyticsContextType>({});

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
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
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID, {
        send_page_view: false // We'll handle page views manually
      });

      return () => {
        // Clean up script when component unmounts
        const scriptElement = document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`);
        if (scriptElement && scriptElement.parentNode) {
          scriptElement.parentNode.removeChild(scriptElement);
        }
      };
    }
    return undefined;
  }, []);

  // Track page views
  useEffect(() => {
    if (MEASUREMENT_ID && window.gtag) {
      console.log(`Tracking page view: ${location.pathname}${location.search}`);
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
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

export const useAnalytics = (): AnalyticsContextType => useContext(AnalyticsContext);
