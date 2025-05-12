
import { useCallback, useEffect } from 'react';
import { captureEvent } from '@/providers/PostHogProvider';

export function useAnalytics() {
  // Track when users arrive on a page with timestamp and device info
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    captureEvent('page_visited', {
      timestamp: new Date().toISOString(),
      userAgent,
      screenSize,
      referrer: document.referrer,
      path: window.location.pathname
    });
  }, []);
  
  // Track clicks on specific elements
  const trackElementClick = useCallback((elementName: string, additionalProps?: Record<string, any>) => {
    captureEvent('element_clicked', {
      elementName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...additionalProps
    });
  }, []);
  
  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    captureEvent('form_submitted', {
      formName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...formData
    });
  }, []);
  
  // Track time spent on page
  const trackTimeSpent = useCallback(() => {
    let startTime = Date.now();
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeSpent = Date.now() - startTime;
        captureEvent('time_spent', {
          seconds: Math.floor(timeSpent / 1000),
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        });
      } else {
        // Reset timer when page becomes visible again
        startTime = Date.now();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      // Capture time when component unmounts
      const timeSpent = Date.now() - startTime;
      captureEvent('time_spent', {
        seconds: Math.floor(timeSpent / 1000),
        path: window.location.pathname,
        timestamp: new Date().toISOString()
      });
    };
  }, []);
  
  return {
    trackElementClick,
    trackFormSubmission,
    trackTimeSpent
  };
}
