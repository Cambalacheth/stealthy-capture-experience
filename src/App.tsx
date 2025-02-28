
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostHogProvider } from "./providers/PostHogProvider";
import Index from "./pages/Index";
import Main from "./pages/Main";
import Trailer from "./pages/Trailer";
import Team from "./pages/Team";
import Rights from "./pages/Rights";
import Contact from "./pages/Contact";
import Mystery from "./pages/Mystery";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PostHogProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/main" element={<Main />} />
            <Route path="/trailer" element={<Trailer />} />
            <Route path="/team" element={<Team />} />
            <Route path="/rights" element={<Rights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mystery" element={<Mystery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PostHogProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
