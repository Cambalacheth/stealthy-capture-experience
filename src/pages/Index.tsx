
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RandomMessage from "@/components/RandomMessage";
import CameraPermission from "@/components/CameraPermission";
import BackgroundImage from "@/components/BackgroundImage";

const Index = () => {
  const [showPermission, setShowPermission] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setShowPermission(true);
  };

  const handlePermissionComplete = () => {
    setShowContent(true);
  };

  const handlePostItClick = (route: string) => {
    // Reproducir sonido de papel
    const paperSound = new Audio("/paper_sound.mp3");
    paperSound.play();
    
    // Navegar a la ruta correspondiente
    navigate(route);
  };

  if (showContent) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-ghost-black">
        {/* Wall texture background */}
        <div 
          className="absolute inset-0 bg-ghost-gray/10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.2) 100%)
            `,
            backgroundSize: '40px 40px, 40px 40px, 100% 100%'
          }}
        />
        
        {/* Flickering neon effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-ghost-accent/5 to-transparent opacity-50 animate-flicker" />
        
        {/* Post-its container */}
        <div className="relative z-10 min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
          {/* Trailer Post-it */}
          <div className="transform rotate-[-2deg] hover:rotate-0 transition-all duration-300">
            <div 
              onClick={() => handlePostItClick("/trailer")}
              className="w-64 h-64 bg-[#fef7cd] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-full h-8 bg-[#fef7cd]/80" />
              <p className="font-mono text-ghost-black mt-4 transform -rotate-1">
                "Trailer"
              </p>
              <p className="font-mono text-xs text-ghost-black/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                "Un vistazo a lo que nunca debimos ver..."
              </p>
            </div>
          </div>
          
          {/* Equipo Post-it */}
          <div className="transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
            <div 
              onClick={() => handlePostItClick("/equipo")}
              className="w-64 h-64 bg-[#f2fce2] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 right-0 w-full h-8 bg-[#f2fce2]/80" />
              <p className="font-mono text-ghost-black mt-4 transform rotate-1">
                "Equipo"
              </p>
              <p className="font-mono text-xs text-ghost-black/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                "¿Quién está detrás de todo esto?"
              </p>
            </div>
          </div>
          
          {/* Derechos Post-it */}
          <div className="transform rotate-[-1deg] hover:rotate-0 transition-all duration-300">
            <div 
              onClick={() => handlePostItClick("/derechos")}
              className="w-64 h-64 bg-[#e2fcf2] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-full h-8 bg-[#e2fcf2]/80" />
              <p className="font-mono text-ghost-black mt-4">
                "Derechos"
              </p>
              <p className="font-mono text-xs text-ghost-black/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                "Si el arte callejero no tiene dueño..."
              </p>
            </div>
          </div>
          
          {/* Contacto Post-it */}
          <div className="transform rotate-[2deg] hover:rotate-0 transition-all duration-300">
            <div 
              onClick={() => handlePostItClick("/contacto")}
              className="w-64 h-64 bg-[#fce2e2] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 right-0 w-full h-8 bg-[#fce2e2]/80" />
              <p className="font-mono text-ghost-black mt-4 transform -rotate-1">
                "Contacto"
              </p>
              <p className="font-mono text-xs text-ghost-black/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                "¿Tenés algo que decir?"
              </p>
            </div>
          </div>
          
          {/* Misterioso Post-it */}
          <div className="transform rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 animate-pulse">
            <div 
              onClick={() => handlePostItClick("/proximamente")}
              className="w-64 h-64 bg-[#e2e2fc] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            >
              <div className="absolute top-0 left-0 w-full h-8 bg-[#e2e2fc]/80" />
              <p className="font-mono text-ghost-black mt-4 blur-sm hover:blur-none transition-all duration-500">
                "🔲"
              </p>
              <p className="font-mono text-xs text-ghost-black/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300 blur-sm">
                "..."
              </p>
            </div>
          </div>
        </div>
        
        {/* Moisture and damage effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0.4) 0%, transparent 70%)',
              filter: 'url(#noise)'
            }}
          />
        </div>
        
        {/* SVG Filters */}
        <svg className="hidden">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
        </svg>
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
              El Fotógrapher
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
