
import { Film } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { captureEvent } from "@/providers/PostHogProvider";
import { useAnalytics } from "@/hooks/useAnalytics";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const Trailer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const { trackElementClick, trackTimeSpent } = useAnalytics();

  // Track page visit and time spent
  useEffect(() => {
    // Track video page load
    captureEvent('video_page_loaded', { 
      timestamp: new Date().toISOString() 
    });
    
    // Track time spent on page
    return trackTimeSpent();
  }, [trackTimeSpent]);

  const handleVideoPlay = () => {
    trackElementClick('video_play_button', {
      videoSrc: '/intro-video.mp4',
      currentTime: videoRef.current?.currentTime || 0
    });
  };
  
  const handleVideoPause = () => {
    trackElementClick('video_pause_button', {
      videoSrc: '/intro-video.mp4',
      currentTime: videoRef.current?.currentTime || 0,
      progress: `${Math.floor(videoProgress * 100)}%`
    });
  };
  
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = videoRef.current.currentTime / videoRef.current.duration;
      setVideoProgress(progress);
      
      // Track progress milestones (25%, 50%, 75%, 100%)
      const percentage = Math.floor(progress * 100);
      if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
        captureEvent('video_milestone', {
          percentage: `${percentage}%`,
          timestamp: new Date().toISOString(),
          videoSrc: '/intro-video.mp4'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
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
                Analytics enabled
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-ghost-black border border-ghost-white/20 text-ghost-white p-4">
              <p className="text-sm">
                We're tracking your interactions with this video to improve the experience.
                Data collected includes play/pause actions and viewing progress.
              </p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden relative">
          <video 
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onTimeUpdate={handleTimeUpdate}
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
