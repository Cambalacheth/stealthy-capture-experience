
import { useEffect, useState } from "react";

const messages = [
  "El Fotógrapher estuvo aquí.",
  "Si mirás demasiado tiempo, el arte te mirará a vos.",
  "Las calles tienen memoria. ¿Vos la tenés?",
  "Cuidado con lo que buscás. Podría encontrarte primero.",
  "Click para ver, pero... ¿quién está mirando?",
  "Click. Flash. You're already part of the picture.",
  "The city is his canvas. His signature is everywhere.",
  "Some images never fade, even if no one sees them.",
  "If you search for him, you might find yourself instead.",
  "Every wall has a memory. Every shadow tells a story.",
  "Who took the picture, and who is being captured?",
  "No todos los fantasmas son del pasado.",
  "Si no lo viste, es porque no estabas mirando bien.",
  "Las calles saben su nombre, aunque vos no lo sepas.",
  "La foto la sacó él. La historia la contás vos.",
  "Todo lo que desaparece deja un rastro.",
  "No se compra, no se vende. Solo queda.",
  "Les parets parlen, però no a tothom.",
  "No mires on creus que està, mira on no esperes trobar-lo.",
  "Els seus passos no fan soroll, però deixen marques.",
  "L'art est un crime que personne ne peut arrêter.",
  "Chaque photo est un mensonge et une vérité à la fois.",
  "Regarde mieux. Il est déjà passé par ici.",
  "Er ist nicht zu sehen, aber überall zu finden.",
  "Тени не исчезают, они просто двигаются.",
  "Le strade raccontano storie che nessuno ascolta.",
  "墙上留下的，不只是影子。"
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
