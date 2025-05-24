
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Google Analytics tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }

    // Custom event tracking
    const trackPageView = () => {
      console.log('Page view:', location.pathname);
      // In production, send to your analytics service
    };

    trackPageView();
  }, [location]);

  // Helper function to track events
  const trackEvent = (eventName: string, parameters?: any) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, parameters);
    }
    console.log('Event tracked:', eventName, parameters);
  };

  // Make tracking available globally
  useEffect(() => {
    (window as any).trackEvent = trackEvent;
  }, []);

  return null;
};

export default Analytics;
