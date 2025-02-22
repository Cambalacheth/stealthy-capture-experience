
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handlePostItClick = (route: string) => {
    // Reproducir sonido de papel
    const paperSound = new Audio("/paper_sound.mp3");
    paperSound.play();
    
    // Navegar a la ruta correspondiente
    navigate(route);
  };

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
};

export default Main;
