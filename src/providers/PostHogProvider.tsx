
'use client'

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// PostHog constants - match the ones in the HTML
const POSTHOG_KEY = 'phc_UhNOOcWqzk50rYjZIH2YDDKXgFQtQhax7tGw9o5lQiJ';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

// Extiende la interfaz Window para incluir la API de YouTube
declare global {
  interface Window {
    posthog: typeof posthog;
    YT: any;
    onYouTubeIframeAPIReady: () => void;
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
      
      posthog.capture('$pageview', { 
        '$current_url': url,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        pageTitle: document.title,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        // Identificar si es móvil/tablet/desktop
        deviceType: getDeviceType()
      });
    }
  }, [location]);

  // Helper para determinar el tipo de dispositivo
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
    if (!posthog.__loaded) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        person_profiles: 'identified_only',
        capture_pageview: false, // We'll handle pageviews manually
        persistence: 'localStorage+cookie', // Usar localStorage y cookies para mejor persistencia
        capture_pageleave: true, // Capturar cuando los usuarios dejan la página
        session_recording: {
          maskAllInputs: false, // Grabar entradas de usuario
          maskInputOptions: {
            password: true, // Pero ocultar contraseñas
          },
          recordCanvas: true, // Capturar elementos canvas si hay
        },
        enable_recording_console_log: true, // Registrar logs de consola
      });
    }
    
    // Configuración adicional para entornos de desarrollo
    if (import.meta.env.DEV) {
      posthog.debug();
      console.log("PostHog inicializado en modo debug");
    }

    // Capturar información adicional sobre el usuario
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
      console.error("Error al registrar propiedades en PostHog:", err);
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

// Utility function to send events manually - now properly initialized
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  if (posthog.__loaded) {
    posthog.capture(eventName, {
      timestamp: new Date().toISOString(),
      ...properties
    });
  } else {
    // Queue event for when PostHog is initialized
    setTimeout(() => {
      posthog.capture(eventName, {
        timestamp: new Date().toISOString(),
        delayed: true,
        ...properties
      });
    }, 100);
  }
};
