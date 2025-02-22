
import { useState } from "react";
import RandomMessage from "@/components/RandomMessage";
import CameraPermission from "@/components/CameraPermission";

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
      <div className="noise" />
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div
          onClick={handleLogoClick}
          className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 border border-ghost-white/20 rounded-full flex items-center justify-center hover:animate-glitch">
            <span className="text-4xl md:text-6xl font-bold">F</span>
          </div>
        </div>
        <RandomMessage />
      </div>
      {showPermission && <CameraPermission onComplete={handlePermissionComplete} />}
    </>
  );
};

export default Index;
