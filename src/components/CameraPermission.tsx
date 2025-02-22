
import { useState, useEffect } from "react";

interface CameraPermissionProps {
  onComplete: () => void;
}

const CameraPermission = ({ onComplete }: CameraPermissionProps) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    requestCamera();
  }, []);

  const requestCamera = async () => {
    setIsRequesting(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      
      document.body.classList.add("animate-flash");
      const flash = new Audio("/camera_shutter.mp3");
      await flash.play();
      
      setIsRequesting(false);
      setShowMessage(true);
      
      setTimeout(() => {
        document.body.classList.remove("animate-flash");
        onComplete();
      }, 2000);
      
    } catch (error) {
      const interference = new Audio("/interference.mp3");
      await interference.play();
      
      setIsRequesting(false);
      setShowMessage(true);
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-ghost-black bg-opacity-90 flex items-center justify-center z-50">
      {isRequesting && (
        <div className="text-center space-y-4">
          <p className="text-ghost-white text-2xl animate-pulse">
            Para ver la verdad, primero hay que mirar.
          </p>
          <p className="text-ghost-white text-xl">
            El Fotógrapher quierte verte. ¿Aceptás?
          </p>
        </div>
      )}
      {!isRequesting && showMessage && (
        <p className="text-ghost-white text-xl animate-pulse">
          Algunas sombras no pueden ser capturadas...
        </p>
      )}
    </div>
  );
};

export default CameraPermission;
