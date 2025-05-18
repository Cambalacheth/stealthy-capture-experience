
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home, Instagram } from "lucide-react";
import { captureEvent } from "@/providers/PostHogProvider";

interface BackButtonProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "default" | "secondary" | "ghost";
  showSocial?: boolean;
}

const BackButton = ({ 
  position = "top-left", 
  variant = "ghost",
  showSocial = true
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    captureEvent('navigation_home_click', {
      from_page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    navigate("/main");
  };

  const handleSocialClick = () => {
    captureEvent('social_media_click', {
      platform: 'instagram',
      from_page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    window.open("https://www.instagram.com/el_fotographer/", "_blank");
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex gap-2`}>
      <Button
        variant={variant}
        size="sm"
        onClick={handleClick}
        className="text-ghost-white bg-ghost-black/50 hover:bg-ghost-black/70 backdrop-blur-sm"
      >
        <Home className="mr-2 h-4 w-4" />
        Inicio
      </Button>
      
      {showSocial && (
        <Button
          variant={variant}
          size="sm"
          onClick={handleSocialClick}
          className="text-ghost-white bg-ghost-black/50 hover:bg-ghost-black/70 backdrop-blur-sm"
        >
          <Instagram className="mr-2 h-4 w-4" />
          Instagram
        </Button>
      )}
    </div>
  );
};

export default BackButton;
