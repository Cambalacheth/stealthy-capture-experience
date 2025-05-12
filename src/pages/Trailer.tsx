
import { Film } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { captureEvent } from "@/providers/PostHogProvider";
import { useAnalytics } from "@/hooks/useAnalytics";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import BackButton from "@/components/BackButton";

const Trailer = () => {
  const youtubeRef = useRef<HTMLIFrameElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const { trackElementClick, trackTimeSpent } = useAnalytics();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "ur9ThNgVrhU";

  // Track page visit and time spent
  useEffect(() => {
    // Track video page load
    captureEvent('video_page_loaded', { 
      timestamp: new Date().toISOString(),
      videoId: videoId
    });
    
    // Track time spent on page
    return trackTimeSpent();
  }, [trackTimeSpent]);

  // Inicializa la API de YouTube cuando el iframe se carga
  useEffect(() => {
    // Función que se llamará cuando la API de YouTube esté lista
    const onYouTubeIframeAPIReady = () => {
      if (!window.YT || !youtubeRef.current) return;

      let player: any;
      let progressInterval: NodeJS.Timeout | null = null;

      try {
        player = new window.YT.Player(youtubeRef.current, {
          events: {
            onReady: () => {
              // Listo para reproducir
              trackElementClick('youtube_player_ready', { videoId });
            },
            onStateChange: (event: any) => {
              // Estados: -1 (no iniciado), 0 (terminado), 1 (reproduciendo), 2 (pausado), 3 (buffering), 5 (video en cola)
              const playerState = event.data;
              const playerInstance = event.target; // Get the actual player instance
              
              if (playerState === 1) { // reproduciendo
                setIsPlaying(true);
                trackElementClick('youtube_video_play', { 
                  videoId,
                  currentTime: Math.floor(playerInstance.getCurrentTime())
                });
                
                // Iniciar seguimiento del progreso
                if (progressInterval) clearInterval(progressInterval);
                progressInterval = setInterval(() => {
                  if (playerInstance && typeof playerInstance.getCurrentTime === 'function' && typeof playerInstance.getDuration === 'function') {
                    const currentTime = playerInstance.getCurrentTime();
                    const duration = playerInstance.getDuration();
                    const progress = currentTime / duration;
                    setVideoProgress(progress);
                    
                    // Reportar milestones
                    const percentage = Math.floor(progress * 100);
                    if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
                      captureEvent('youtube_video_milestone', {
                        percentage: `${percentage}%`,
                        timestamp: new Date().toISOString(),
                        videoId,
                        currentTime: Math.floor(currentTime),
                        duration: Math.floor(duration)
                      });
                    }
                  }
                }, 1000);
              } 
              else if (playerState === 2) { // pausado
                setIsPlaying(false);
                if (progressInterval) clearInterval(progressInterval);
                trackElementClick('youtube_video_pause', {
                  videoId,
                  currentTime: Math.floor(playerInstance.getCurrentTime()),
                  progress: `${Math.floor(videoProgress * 100)}%`
                });
              }
              else if (playerState === 0) { // terminado
                setIsPlaying(false);
                if (progressInterval) clearInterval(progressInterval);
                trackElementClick('youtube_video_ended', {
                  videoId,
                  duration: Math.floor(playerInstance.getDuration())
                });
              }
            }
          }
        });
      } catch (error) {
        console.error("Error inicializando YouTube player:", error);
      }

      return () => {
        if (progressInterval) clearInterval(progressInterval);
        if (player && player.destroy) player.destroy();
      };
    };

    // Cargar la API de YouTube
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    } else {
      onYouTubeIframeAPIReady();
    }
  }, [trackElementClick, videoId, videoProgress]);

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <BackButton position="top-left" />
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Film className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">Intro</h1>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <div 
                className="ml-auto cursor-help text-ghost-white/60 hover:text-ghost-white text-sm"
                onClick={() => trackElementClick('analytics_help_button')}
              >
                Analytics {isPlaying ? 'grabando' : 'habilitado'}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-ghost-black border border-ghost-white/20 text-ghost-white p-4">
              <p className="text-sm">
                Estamos registrando tus interacciones con este video para mejorar la experiencia.
                Los datos recopilados incluyen acciones de reproducción/pausa y progreso de visualización.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden relative">
          {/* Progress bar overlay */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-ghost-white/20">
            <div 
              className="h-1 bg-ghost-white transition-all duration-300" 
              style={{ width: `${videoProgress * 100}%` }}
            />
          </div>
          
          {/* YouTube iframe */}
          <iframe
            ref={youtubeRef}
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
            title="Video de introducción"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Trailer;
