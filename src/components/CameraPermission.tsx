
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CameraPermissionProps {
  onComplete: () => void;
}

const CameraPermission = ({ onComplete }: CameraPermissionProps) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const requestCamera = async () => {
    setIsRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      
      const flash = new Audio("/camera_shutter.mp3");
      flash.play();
      
      document.body.classList.add("animate-flash");
      setTimeout(() => {
        document.body.classList.remove("animate-flash");
        onComplete();
      }, 500);
    } catch (error) {
      const interference = new Audio("/interference.mp3");
      interference.play();
      setTimeout(onComplete, 500);
    }
    setIsRequesting(false);
  };

  return isRequesting ? (
    <div className="fixed inset-0 bg-ghost-black bg-opacity-90 flex items-center justify-center">
      <p className="text-ghost-white text-xl animate-pulse">
        El Fotógrapher quiere verte. ¿Aceptás?
      </p>
    </div>
  ) : null;
};

export default CameraPermission;
