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
      gtag('config', MEASUREMENT_ID);

      return () => {
        document.head.removeChild(script);
      };
    }
    return undefined;
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

export const useAnalytics = (): AnalyticsContextType => useContext(AnalyticsContext);
