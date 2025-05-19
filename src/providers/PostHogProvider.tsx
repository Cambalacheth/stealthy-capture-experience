
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
    if (location && posthog.__loaded) {
      let url = window.origin + location.pathname;
      if (location.search) {
        url = url + location.search;
      }
      
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
    }
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
    // Initialize PostHog if it hasn't been initialized already
    if (!window.posthog || !posthog.__loaded) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        capture_pageview: false, // We'll handle pageviews manually
        persistence: 'localStorage+cookie', // Use both localStorage and cookies for better persistence
        capture_pageleave: true, // Track when users leave the page
        session_recording: {
          maskAllInputs: false, // Record user inputs
          maskInputOptions: {
            password: true, // But hide passwords
          },
        },
        enable_recording_console_log: true, // Record console logs
      });
    }
    
    // Additional configuration for development environments
    if (import.meta.env.DEV) {
      posthog.debug();
      console.log("PostHog initialized in debug mode");
    }

    // Capture additional user information
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
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        ...properties
      });
    } else {
      // Queue event for when PostHog is initialized
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.posthog) {
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
