
'use client'

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// Constantes para PostHog
const POSTHOG_KEY = 'phc_UhNOOcWqzk50rYjZIH2YDDKXgFQtQhax7tGw9o5lQiJ';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

function PostHogPageView() {
  const location = useLocation();
  
  // Rastrear vistas de página
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
    // Inicializar PostHog
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // Desactivar la captura automática de vistas de página, las capturamos manualmente
      loaded: (posthog) => {
        if (import.meta.env.DEV) {
          // En desarrollo, registramos los eventos en la consola en lugar de enviarlos a PostHog
          posthog.debug();
        }
      }
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

// Función de utilidad para enviar eventos manualmente
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};
