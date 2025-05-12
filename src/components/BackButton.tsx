
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { captureEvent } from "@/providers/PostHogProvider";

interface BackButtonProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "default" | "secondary" | "ghost";
}

const BackButton = ({ 
  position = "top-left", 
  variant = "ghost" 
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    captureEvent('navigation_home_click', {
      from_page: window.location.pathname,
      timestamp: new Date().toISOString()
    });
    navigate("/main");
  };

  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4"
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <Button
        variant={variant}
        size="sm"
        onClick={handleClick}
        className="text-ghost-white bg-ghost-black/50 hover:bg-ghost-black/70 backdrop-blur-sm"
      >
        <Home className="mr-2 h-4 w-4" />
        Inicio
      </Button>
    </div>
  );
};

export default BackButton;
