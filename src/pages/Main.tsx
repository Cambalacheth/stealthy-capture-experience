
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
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1a2937]">
      {/* Brick wall texture */}
      <div 
        className="absolute inset-0 bg-[#1a2937]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 50px 30px, 30px 50px'
        }}
      />

      {/* Ambient light effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.15), transparent 70%)'
        }}
      />

      {/* Water damage and wall texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(`
            <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8"/>
              </filter>
              <rect width="100" height="100" filter="url(#noise)"/>
            </svg>
          `)}')`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Post-its container */}
      <div className="relative z-10 min-h-screen p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-items-center">
        {/* Trailer Post-it */}
        <div className="transform rotate-[-2deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/trailer")}
            className="w-64 h-64 bg-[#94a3b8]/20 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-[#94a3b8]/10" />
            <p className="font-mono text-ghost-white mt-4 transform -rotate-1">
              "Trailer"
            </p>
            <p className="font-mono text-xs text-ghost-white/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              "Un vistazo a lo que nunca debimos ver..."
            </p>
          </div>
        </div>
        
        {/* Team Post-it */}
        <div className="transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/team")}
            className="w-64 h-64 bg-[#94a3b8]/20 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 right-0 w-full h-8 bg-[#94a3b8]/10" />
            <p className="font-mono text-ghost-white mt-4 transform rotate-1">
              "Equipo"
            </p>
            <p className="font-mono text-xs text-ghost-white/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              "¿Quién está detrás de todo esto?"
            </p>
          </div>
        </div>
        
        {/* Rights Post-it */}
        <div className="transform rotate-[-1deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/rights")}
            className="w-64 h-64 bg-[#94a3b8]/20 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-[#94a3b8]/10" />
            <p className="font-mono text-ghost-white mt-4">
              "Derechos"
            </p>
            <p className="font-mono text-xs text-ghost-white/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              "Si el arte callejero no tiene dueño..."
            </p>
          </div>
        </div>
        
        {/* Contact Post-it */}
        <div className="transform rotate-[2deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/contact")}
            className="w-64 h-64 bg-[#94a3b8]/20 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 right-0 w-full h-8 bg-[#94a3b8]/10" />
            <p className="font-mono text-ghost-white mt-4 transform -rotate-1">
              "Contacto"
            </p>
            <p className="font-mono text-xs text-ghost-white/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
              "¿Tenés algo que decir?"
            </p>
          </div>
        </div>
        
        {/* Mystery Post-it */}
        <div className="transform rotate-[-1.5deg] hover:rotate-0 transition-all duration-300 animate-pulse">
          <div 
            onClick={() => handlePostItClick("/mystery")}
            className="w-64 h-64 bg-[#94a3b8]/20 backdrop-blur-sm p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden cursor-pointer group"
            style={{
              boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="absolute top-0 left-0 w-full h-8 bg-[#94a3b8]/10" />
            <p className="font-mono text-ghost-white mt-4 blur-sm hover:blur-none transition-all duration-500">
              "🔲"
            </p>
            <p className="font-mono text-xs text-ghost-white/70 mt-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300 blur-sm">
              "..."
            </p>
          </div>
        </div>
      </div>

      {/* Background graffiti and details */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5"
          style={{
            backgroundImage: "url('/lovable-uploads/7f06db24-c185-4e94-9eb5-69825cfcad19.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotate(15deg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2937]/50 to-[#0f172a]/50" />
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
