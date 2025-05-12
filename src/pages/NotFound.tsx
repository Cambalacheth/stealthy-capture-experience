
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { captureEvent } from "@/providers/PostHogProvider";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    captureEvent('404_error', {
      path: location.pathname,
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    });
  }, [location.pathname]);

  const handleGoHome = () => {
    captureEvent('404_navigation_home', {
      from_path: location.pathname,
      timestamp: new Date().toISOString()
    });
    navigate("/main");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ghost-black">
      <div className="text-center text-ghost-white p-8 backdrop-blur-sm bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-ghost-white/60 mb-8">Página no encontrada</p>
        <Button 
          onClick={handleGoHome}
          className="bg-ghost-white/10 hover:bg-ghost-white/20 text-ghost-white"
        >
          <Home className="mr-2 h-4 w-4" />
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
