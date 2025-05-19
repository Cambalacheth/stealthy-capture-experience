
import { Users } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useEffect } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Helmet } from "react-helmet";

const Team = () => {
  const { trackTimeSpent } = useAnalytics();

  // Track time spent on team page
  useEffect(() => {
    return trackTimeSpent();
  }, [trackTimeSpent]);

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>El Equipo - El Fotógrapher</title>
        <meta name="description" content="Conoce al equipo detrás de El Fotógrapher: Guadalupe Gonzalez, periodista, y Mariano Moreno, psicólogo. Un documental falso sobre arte urbano en Valencia." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "name": "El Fotógrapher - Equipo",
              "creator": [
                {
                  "@type": "Person",
                  "name": "Guadalupe Gonzalez",
                  "jobTitle": "Periodista"
                },
                {
                  "@type": "Person",
                  "name": "Mariano Moreno",
                  "jobTitle": "Psicólogo"
                }
              ]
            }
          `}
        </script>
      </Helmet>
      
      <BackButton position="top-left" />
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Users className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">El Equipo</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Guadalupe */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 relative overflow-hidden rounded-lg border-2 border-ghost-white/20">
              <img 
                src="/lovable-uploads/0f7ff837-39b3-45fe-a9af-a021ae9c0706.png"
                alt="Silueta Guadalupe"
                className="w-full h-full object-cover filter grayscale contrast-200"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-ghost-white">Guadalupe Gonzalez</h2>
              <p className="text-ghost-white/60 italic">Periodista</p>
            </div>
            <div className="text-ghost-white/70 text-sm text-center max-w-xs">
              <p>Investigadora principal del caso. Siguió las pistas desde el primer avistamiento de las pegatinas misteriosas en Valencia.</p>
            </div>
          </div>

          {/* Mariano */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 relative overflow-hidden rounded-lg border-2 border-ghost-white/20">
              <img 
                src="/lovable-uploads/photo-1581092795360-fd1ca04f0952"
                alt="Silueta Mariano"
                className="w-full h-full object-cover filter grayscale contrast-200"
              />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-ghost-white">Mariano Moreno</h2>
              <p className="text-ghost-white/60 italic">Psicólogo</p>
            </div>
            <div className="text-ghost-white/70 text-sm text-center max-w-xs">
              <p>Especialista en perfiles psicológicos de artistas urbanos. Analiza las motivaciones detrás del fenómeno del Fotógrapher.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
