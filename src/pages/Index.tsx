
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomMessage from "@/components/RandomMessage";
import CameraPermission from "@/components/CameraPermission";
import BackgroundImage from "@/components/BackgroundImage";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { captureEvent } from "@/providers/PostHogProvider";

const Index = () => {
  const [showPermission, setShowPermission] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setShowPermission(true);
  };

  const handlePermissionComplete = () => {
    console.log("Navigating to main...");
    navigate("/main");
  };

  const goToMainDirectly = () => {
    captureEvent('skip_permission_click', {
      timestamp: new Date().toISOString()
    });
    navigate("/main");
  };

  return (
    <>
      <BackgroundImage />
      <div className="noise" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div
          onClick={handleLogoClick}
          className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-72 h-40 md:w-[28rem] md:h-56 bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl flex flex-col items-center justify-center hover:animate-glitch backdrop-blur-sm shadow-lg">
            <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ghost-white via-ghost-white/80 to-ghost-white/60 bg-clip-text text-transparent px-4">
              El Fotógrapher
            </span>
            <div className="w-16 h-1 bg-ghost-white/20 mt-4 rounded-full" />
          </div>
        </div>
        <RandomMessage />
        <div className="mt-8">
          <Button 
            variant="ghost" 
            className="text-ghost-white bg-ghost-black/50 hover:bg-ghost-black/70 backdrop-blur-sm"
            onClick={goToMainDirectly}
          >
            <Home className="mr-2 h-4 w-4" />
            Ir al inicio
          </Button>
        </div>
      </div>
      {showPermission && <CameraPermission onComplete={handlePermissionComplete} />}
    </>
  );
};

export default Index;
