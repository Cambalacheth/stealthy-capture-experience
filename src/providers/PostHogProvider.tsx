
'use client'

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// PostHog constants - match the ones in the HTML
const POSTHOG_KEY = 'phc_UhNOOcWqzk50rYjZIH2YDDKXgFQtQhax7tGw9o5lQiJ';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

// Extend Window interface to include PostHog
declare global {
  interface Window {
    posthog?: typeof posthog;
  }
}

function PostHogPageView() {
  const location = useLocation();
  
  // Track page views
  useEffect(() => {
    if (location) {
      let url = window.origin + location.pathname;
      if (location.search) {
        url = url + location.search;
      }
      
      posthog.capture('$pageview', { '$current_url': url });
    }
  }, [location]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // We don't need to initialize again since it's already initialized in the HTML
    // But we can set debug mode in development
    if (import.meta.env.DEV && window.posthog) {
      posthog.debug();
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
  posthog.capture(eventName, properties);
};
