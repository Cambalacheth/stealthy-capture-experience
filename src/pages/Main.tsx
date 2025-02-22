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
        {/* Trailer Photo */}
        <div className="transform rotate-[-2deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/trailer")}
            className="w-64 cursor-pointer group relative"
          >
            <img 
              src="/lovable-uploads/03903497-8640-499a-9909-1ae31d4537ac.png"
              alt="REC Trailer"
              className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-mono text-ghost-white text-xl">Ver Trailer</p>
            </div>
          </div>
        </div>
        
        {/* Contact Image */}
        <div className="transform rotate-[1deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/contact")}
            className="w-64 cursor-pointer group relative"
          >
            <img 
              src="/lovable-uploads/4b650a24-2571-4825-8086-584c47142d80.png"
              alt="Contact"
              className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-mono text-ghost-white text-xl">Contacto</p>
            </div>
          </div>
        </div>
        
        {/* Mystery Image */}
        <div className="transform rotate-[-1deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/mystery")}
            className="w-64 cursor-pointer group relative"
          >
            <img 
              src="/lovable-uploads/a61698d7-00a1-4a30-ad5b-d33b5dbd6b4f.png"
              alt="Mystery"
              className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-mono text-ghost-white text-xl">Misterio</p>
            </div>
          </div>
        </div>
        
        {/* Team Image */}
        <div className="transform rotate-[2deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/team")}
            className="w-64 cursor-pointer group relative"
          >
            <img 
              src="/lovable-uploads/14a25997-fcc2-4d7e-9690-762bfa71d24d.png"
              alt="Team"
              className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-mono text-ghost-white text-xl">Equipo</p>
            </div>
          </div>
        </div>
        
        {/* Rights Image */}
        <div className="transform rotate-[-1.5deg] hover:rotate-0 transition-all duration-300">
          <div 
            onClick={() => handlePostItClick("/rights")}
            className="w-64 cursor-pointer group relative"
          >
            <img 
              src="/lovable-uploads/ee571921-3630-4a7d-b1a1-3927547fa64b.png"
              alt="Rights"
              className="w-full shadow-xl hover:shadow-2xl transition-all duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-mono text-ghost-white text-xl">Derechos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Background graffiti and urban art */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large graffiti pieces */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10"
          style={{
            backgroundImage: "url('/lovable-uploads/7f06db24-c185-4e94-9eb5-69825cfcad19.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'rotate(15deg)'
          }}
        />
        
        {/* Additional urban art elements */}
        <div className="absolute top-20 right-20 text-[200px] opacity-5 transform -rotate-12 font-bold">
          RECC
        </div>
        <div className="absolute bottom-40 left-20 text-[150px] opacity-5 transform rotate-45 font-bold">
          X
        </div>
        
        {/* Texture overlays */}
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
