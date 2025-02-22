
import { useEffect, useState } from "react";

const images = [
  "/lovable-uploads/913b377e-d7a6-4888-b55c-d9eb685824c3.png",
  "/lovable-uploads/f65b4da2-f763-4f67-8f15-68bb323ff5b7.png",
  "/lovable-uploads/335520d8-0d38-45cf-98c4-7194995e1f26.png",
  "/lovable-uploads/ab3b2d9c-bc1d-434d-ac1e-3c512db4baf1.png",
  "/lovable-uploads/d955eb31-9f3c-4dc0-b1fb-b2fb6c26335b.png",
  "/lovable-uploads/eea0dac4-7722-45fc-af55-5ee67769d8f4.png",
  "/lovable-uploads/0f7ff837-39b3-45fe-a9af-a021ae9c0706.png",
  "/lovable-uploads/b0e8f498-f041-4d2b-94f7-a6bcf3b25ded.png",
];

const BackgroundImage = () => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    setSelectedImage(images[randomIndex]);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
      style={{ backgroundImage: `url(${selectedImage})` }}
    />
  );
};

export default BackgroundImage;
