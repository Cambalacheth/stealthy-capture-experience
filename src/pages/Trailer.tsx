
import { Film } from "lucide-react";
import { useEffect, useRef } from "react";
import { captureEvent } from "@/providers/PostHogProvider";

const Trailer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Capture video load event
    captureEvent('video_page_loaded', { 
      timestamp: new Date().toISOString() 
    });
  }, []);

  const handleVideoPlay = () => {
    captureEvent('video_played', { 
      timestamp: new Date().toISOString() 
    });
  };

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Film className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">Intro</h1>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden relative">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            onPlay={handleVideoPlay}
            poster="/lovable-uploads/03903497-8640-499a-9909-1ae31d4537ac.png"
          >
            <source src="/intro-video.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Trailer;
