
import { useState } from "react";
import RandomMessage from "@/components/RandomMessage";
import CameraPermission from "@/components/CameraPermission";
import BackgroundImage from "@/components/BackgroundImage";

const Index = () => {
  const [showPermission, setShowPermission] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLogoClick = () => {
    setShowPermission(true);
  };

  const handlePermissionComplete = () => {
    setShowContent(true);
  };

  if (showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ghost-white text-2xl">
          Bienvenido al mundo del Fotógrapher...
        </p>
      </div>
    );
  }

  return (
    <>
      <BackgroundImage />
      <div className="noise" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
        <div
          onClick={handleLogoClick}
          className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-64 h-32 md:w-96 md:h-48 bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl flex flex-col items-center justify-center hover:animate-glitch backdrop-blur-sm shadow-lg">
            <span className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-ghost-white via-ghost-white/80 to-ghost-white/60 bg-clip-text text-transparent">
              Fotógrapher
            </span>
            <div className="w-16 h-1 bg-ghost-white/20 mt-4 rounded-full" />
          </div>
        </div>
        <RandomMessage />
      </div>
      {showPermission && <CameraPermission onComplete={handlePermissionComplete} />}
    </>
  );
};

export default Index;
