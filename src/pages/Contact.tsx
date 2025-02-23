
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const mailtoLink = `mailto:lautaro.sarni@gmail.com?subject=Contacto desde El Fotógrapher&body=Nombre: ${name}%0D%0AEmail: ${email}%0D%0AMensaje: ${message}`;
      window.location.href = mailtoLink;
      
      toast({
        title: "Correo preparado",
        description: "Se abrirá tu cliente de correo para enviar el mensaje.",
      });
      
      // Limpiar el formulario
      setName("");
      setEmail("");
      setMessage("");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al intentar enviar el mensaje.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Mail className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">Contacto</h1>
        </div>
        <div className="space-y-6">
          <div className="bg-ghost-gray/20 rounded-lg p-6 border border-ghost-white/10">
            <p className="text-ghost-white/80 text-center text-lg">
              ¿Querés contactarnos? Dejanos tu mensaje...
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-ghost-black/50 border border-ghost-white/20 rounded-lg p-3 text-ghost-white"
              />
              <input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-ghost-black/50 border border-ghost-white/20 rounded-lg p-3 text-ghost-white"
              />
              <textarea
                placeholder="Tu mensaje"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                className="w-full bg-ghost-black/50 border border-ghost-white/20 rounded-lg p-3 text-ghost-white"
              />
              <button
                type="submit"
                className="w-full bg-ghost-white/10 hover:bg-ghost-white/20 text-ghost-white py-3 rounded-lg transition-colors"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
