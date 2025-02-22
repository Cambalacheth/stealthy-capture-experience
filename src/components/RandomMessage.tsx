
import { useEffect, useState } from "react";

const messages = [
  "El Fotógrapher estuvo aquí.",
  "Si mirás demasiado tiempo, el arte te mirará a vos.",
  "Las calles tienen memoria. ¿Vos la tenés?",
  "Cuidado con lo que buscás. Podría encontrarte primero.",
  "Click para ver, pero... ¿quién está mirando?",
];

const RandomMessage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  }, []);

  return (
    <p className="text-ghost-white text-lg md:text-xl opacity-80 mt-4 animate-flicker">
      {message}
    </p>
  );
};

export default RandomMessage;
