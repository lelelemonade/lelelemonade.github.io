import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    // Official gtag stub uses `arguments`, not rest params
    gtag: (...args: unknown[]) => void;
  }
}

type AnalyticsContextType = Record<string, never>;

const AnalyticsContext = createContext<AnalyticsContextType>({});

interface AnalyticsProviderProps {
  children: ReactNode;
}

let gaInitialized = false;

function initGoogleAnalytics(measurementId: string) {
  if (gaInitialized) return;
  gaInitialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Must push `arguments` (not a rest-params array) so gtag.js can process the queue
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
  });
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (MEASUREMENT_ID) {
      initGoogleAnalytics(MEASUREMENT_ID);
    }
  }, []);

  useEffect(() => {
    if (MEASUREMENT_ID && typeof window.gtag === 'function') {
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
