
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
    setShowMessage(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      
      // Flash effect
      document.body.classList.add("animate-flash");
      const flash = new Audio("/camera_shutter.mp3");
      await flash.play();
      
      setTimeout(() => {
        document.body.classList.remove("animate-flash");
        setShowMessage(false);
        onComplete();
      }, 2000);
      
    } catch (error) {
      // Interference effect for denied permission
      const interference = new Audio("/interference.mp3");
      await interference.play();
      
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        onComplete();
      }, 2000);
    } finally {
      setIsRequesting(false);
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
            El Fotógrapher quiere verte. ¿Aceptás?
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
