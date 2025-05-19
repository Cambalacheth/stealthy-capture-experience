
import { Film } from "lucide-react";
import BackButton from "@/components/BackButton";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const BehindScenes = () => {
  const { trackTimeSpent } = useAnalytics();

  // Track time spent on behind scenes page
  useEffect(() => {
    return trackTimeSpent();
  }, [trackTimeSpent]);

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Detrás de Cámaras - El Fotógrapher</title>
        <meta name="description" content="Descubre el proceso creativo detrás de El Fotógrapher, un documental falso sobre arte urbano rodado en Valencia. Conoce las técnicas cinematográficas utilizadas." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "El proceso creativo detrás de El Fotógrapher",
              "description": "Descubre cómo se rodó El Fotógrapher en las calles de Valencia",
              "author": {
                "@type": "Person",
                "name": "Lautaro Director"
              },
              "publisher": {
                "@type": "Organization",
                "name": "El Fotógrapher Producciones"
              },
              "keywords": "making of, detrás de cámaras, rodaje en Valencia, mockumentary"
            }
          `}
        </script>
      </Helmet>
      
      <BackButton position="top-left" />
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Film className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">Detrás de Cámaras</h1>
        </div>
        
        <div className="space-y-8 text-ghost-white/80">
          <section>
            <h2 className="text-2xl font-semibold text-ghost-white mb-4">El Proceso Creativo</h2>
            <p className="mb-4">Un vistazo al proceso de creación de este documental falso que mezcla elementos de noir clásico con técnicas modernas de mockumentary.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-ghost-white/5 p-4 rounded-lg">
                <h3 className="text-xl text-ghost-white mb-2">Rodaje en Valencia</h3>
                <p>Las calles de Valencia se convirtieron en nuestro set principal, capturando la esencia urbana de la ciudad.</p>
              </div>
              
              <div className="bg-ghost-white/5 p-4 rounded-lg">
                <h3 className="text-xl text-ghost-white mb-2">Estética Visual</h3>
                <p>Combinamos fotografía en blanco y negro con elementos de color selectivo para evocar la atmósfera noir.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-ghost-white mb-4">Locaciones Principales</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Plaza de la Reina - Escenas principales de entrevistas</li>
              <li>Barrio del Carmen - Donde se encontraron las primeras pegatinas</li>
              <li>Paseo Marítimo - Secuencias contemplativas</li>
              <li>Ciudad de las Artes y las Ciencias - Escenas finales</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold text-ghost-white mb-4">Influencias Cinematográficas</h2>
            <p>El proyecto bebe de fuentes tan diversas como el cine noir clásico, The Office, las sátiras de Monty Python y el nuevo cine independiente español.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BehindScenes;
