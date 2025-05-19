
'use client'

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// PostHog constants - using the provided API key for US region
const POSTHOG_KEY = 'phc_usuvjrfhAg0rcyzxMHfXDATEVIUOG5nFkVDSuYdOhZ';
const POSTHOG_HOST = 'https://us.i.posthog.com';

// Extend Window interface to include PostHog
declare global {
  interface Window {
    posthog: typeof posthog;
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

// Dedicated component for tracking page views
function PostHogPageView() {
  const location = useLocation();
  
  // Track page views on location changes
  useEffect(() => {
    // Wait a moment to ensure PostHog is fully loaded
    const trackPageView = () => {
      if (window.posthog && posthog.__loaded) {
        let url = window.origin + location.pathname;
        if (location.search) {
          url = url + location.search;
        }
        
        console.log('Capturing pageview for:', url);
        posthog.capture('$pageview', { 
          '$current_url': url,
          timestamp: new Date().toISOString(),
          referrer: document.referrer,
          pageTitle: document.title,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight
          },
          deviceType: getDeviceType()
        });
      } else {
        console.log('PostHog not loaded yet, retrying in 100ms');
        setTimeout(trackPageView, 100);
      }
    };
    
    trackPageView();
  }, [location]);

  // Helper to determine device type
  const getDeviceType = () => {
    const userAgent = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  };

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Remove any existing PostHog instance to prevent duplicates
    if (window.posthog) {
      console.log('Removing existing PostHog instance');
      delete window.posthog;
    }
    
    // Initialize PostHog
    console.log('Initializing PostHog');
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // We'll handle pageviews manually
      persistence: 'localStorage+cookie', // Use both localStorage and cookies for better persistence
      capture_pageleave: true, // Enable capturing pageleave events
      loaded: (posthogInstance) => {
        console.log('PostHog loaded successfully');
      },
      bootstrap: {
        distinctID: localStorage.getItem('distinct_id') || undefined
      }
    });
    
    // Debug mode in development
    if (import.meta.env.DEV) {
      posthog.debug();
      console.log("PostHog initialized in debug mode");
    }

    // Register core properties
    try {
      posthog.register({
        screen_width: window.screen.width,
        screen_height: window.screen.height,
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        has_touch: 'ontouchstart' in window,
        browser_language: navigator.language,
        browser_type: navigator.userAgent,
      });
    } catch (err) {
      console.error("Error registering properties in PostHog:", err);
    }
    
    // Clean up function
    return () => {
      console.log('Cleaning up PostHog');
      if (window.posthog) {
        posthog.reset();
      }
    };
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

// Utility function to send events manually
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window.posthog && posthog.__loaded) {
      console.log(`Capturing event: ${eventName}`, properties);
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        ...properties
      });
    } else {
      // Queue event for when PostHog is initialized
      console.log(`Queueing event: ${eventName} (PostHog not loaded yet)`, properties);
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.posthog) {
          console.log(`Capturing delayed event: ${eventName}`, properties);
          posthog.capture(eventName, {
            timestamp: new Date().toISOString(),
            delayed: true,
            ...properties
          });
        }
      }, 100);
    }
  } catch (error) {
    console.error("PostHog event capture error:", error);
  }
};
