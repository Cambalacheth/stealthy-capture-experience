
import { useCallback, useEffect, useState } from 'react';
import { captureEvent } from '@/providers/PostHogProvider';

export function useAnalytics() {
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMovements, setMouseMovements] = useState<Array<{ x: number, y: number, timestamp: number }>>([]);
  const [clickCount, setClickCount] = useState(0);
  
  // Track when users arrive on a page with timestamp and device info
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    // Capturar más datos sobre el usuario
    const language = navigator.language;
    const platform = navigator.platform;
    const connection = 'connection' in navigator && 
      //@ts-ignore - algunos navegadores modernos tienen esta API
      navigator.connection ? {
      //@ts-ignore
      effectiveType: navigator.connection?.effectiveType,
      //@ts-ignore
      downlink: navigator.connection?.downlink,
      //@ts-ignore
      rtt: navigator.connection?.rtt,
    } : undefined;
    
    captureEvent('page_visited', {
      timestamp: new Date().toISOString(),
      userAgent,
      screenSize,
      referrer: document.referrer,
      path: window.location.pathname,
      language,
      platform,
      connection
    });
  }, []);
  
  // Enhanced click tracking that counts total clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      
      // Track all clicks globally for heatmapping
      const clickTarget = e.target as HTMLElement;
      const tagName = clickTarget.tagName.toLowerCase();
      const className = clickTarget.className;
      const id = clickTarget.id;
      const text = clickTarget.textContent?.slice(0, 30);
      
      captureEvent('global_click', {
        count: newCount,
        position: {
          x: e.clientX, 
          y: e.clientY,
          relativeX: Math.round((e.clientX / window.innerWidth) * 100), 
          relativeY: Math.round((e.clientY / window.innerHeight) * 100)
        },
        target: {
          tagName,
          className: typeof className === 'string' ? className : 'complex-class',
          id: id || undefined,
          text: text || undefined
        },
        timestamp: new Date().toISOString(),
        path: window.location.pathname,
        sessionClickCount: newCount
      });
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [clickCount]);
  
  // Track clicks on specific elements
  const trackElementClick = useCallback((elementName: string, additionalProps?: Record<string, any>) => {
    setClickCount(prev => prev + 1);
    captureEvent('element_clicked', {
      elementName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      position: lastMousePosition,
      clickCount,
      ...additionalProps
    });
  }, [lastMousePosition, clickCount]);
  
  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, formData?: Record<string, any>) => {
    captureEvent('form_submitted', {
      formName,
      timestamp: new Date().toISOString(),
      path: window.location.pathname,
      ...formData
    });
  }, []);
  
  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      setLastMousePosition({ x: clientX, y: clientY });
      
      // Guardamos movimientos pero limitamos para no sobrecargar
      setMouseMovements(prev => {
        const now = Date.now();
        const newMovements = [...prev, { x: clientX, y: clientY, timestamp: now }];
        
        // Solo guardar últimos 100 movimientos
        if (newMovements.length > 100) {
          return newMovements.slice(-100);
        }
        return newMovements;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      
      // Enviar heatmap de movimientos al finalizar
      if (mouseMovements.length > 0) {
        captureEvent('mouse_movements', {
          movements: mouseMovements,
          path: window.location.pathname,
        });
      }
    };
  }, [mouseMovements]);
  
  // Track time spent on page
  const trackTimeSpent = useCallback(() => {
    let startTime = Date.now();
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    let isIdle = false;
    
    const resetIdleTimer = () => {
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
      
      if (isIdle) {
        // Si estaba inactivo, resetear el contador
        startTime = Date.now();
        isIdle = false;
      }
      
      // Marcar como inactivo después de 2 minutos sin interacción
      idleTimeout = setTimeout(() => {
        isIdle = true;
        captureEvent('user_idle', {
          timestamp: new Date().toISOString(),
          path: window.location.pathname
        });
      }, 120000); // 2 minutos
    };
    
    const handleActivity = () => {
      resetIdleTimer();
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeSpent = Date.now() - startTime;
        captureEvent('time_spent', {
          seconds: Math.floor(timeSpent / 1000),
          path: window.location.pathname,
          timestamp: new Date().toISOString(),
          isIdle
        });
      } else {
        // Reset timer when page becomes visible again
        startTime = Date.now();
      }
    };
    
    // Eventos de actividad
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('scroll', handleActivity);
    
    // Iniciar timer de inactividad
    resetIdleTimer();
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      
      if (idleTimeout) {
        clearTimeout(idleTimeout);
      }
      
      // Capture time when component unmounts
      const timeSpent = Date.now() - startTime;
      captureEvent('time_spent', {
        seconds: Math.floor(timeSpent / 1000),
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
        isIdle,
        totalClicks: clickCount
      });
    };
  }, [clickCount]);
  
  return {
    trackElementClick,
    trackFormSubmission,
    trackTimeSpent,
    lastMousePosition,
    mouseMovements,
    clickCount
  };
}
