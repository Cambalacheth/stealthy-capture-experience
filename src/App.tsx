
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PostHogProvider, captureEvent } from "./providers/PostHogProvider";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Trailer from "./pages/Trailer";
import Team from "./pages/Team";
import Rights from "./pages/Rights";
import Contact from "./pages/Contact";
import Mystery from "./pages/Mystery";
import NotFound from "./pages/NotFound";
import { useEffect, lazy, Suspense } from "react";

// Create a loading component for suspense fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-ghost-black">
    <div className="animate-pulse text-ghost-white text-2xl">Cargando...</div>
  </div>
);

// Create a scroll to top component to improve navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // PageView is now handled by PostHogPageView component
    captureEvent('page_navigation', {
      path: pathname,
      timestamp: new Date().toISOString()
    });
    
    console.log('Navigation to:', pathname);
  }, [pathname]);

  return null;
};

// Create a proper config for the query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

// Main App component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="/">
          <PostHogProvider>
            <Suspense fallback={<LoadingScreen />}>
              <AppRoutes />
            </Suspense>
          </PostHogProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

// Separate routes component to use the useLocation hook
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/main" element={<Main />} />
        <Route path="/trailer" element={<Trailer />} />
        <Route path="/team" element={<Team />} />
        <Route path="/rights" element={<Rights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mystery" element={<Mystery />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </>
  );
};

export default App;
