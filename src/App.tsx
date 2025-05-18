
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostHogProvider } from "./providers/PostHogProvider";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Trailer from "./pages/Trailer";
import Team from "./pages/Team";
import Rights from "./pages/Rights";
import Contact from "./pages/Contact";
import Mystery from "./pages/Mystery";
import NotFound from "./pages/NotFound";
import { useEffect, lazy, Suspense } from "react";
import { captureEvent } from "./providers/PostHogProvider";

// Create a loading component for suspense fallback
const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-ghost-black">
    <div className="animate-pulse text-ghost-white text-2xl">Cargando...</div>
  </div>
);

// Create a scroll to top component to improve navigation
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    captureEvent('page_navigation', {
      timestamp: new Date().toISOString(),
      path: window.location.pathname
    });
  }, [window.location.pathname]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogProvider>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen />}>
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
          </Suspense>
        </PostHogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
