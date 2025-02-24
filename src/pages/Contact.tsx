
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      await emailjs.send(
        'service_bjuj5li', // Tu Service ID
        'template_fv7cr22', // Tu Template ID
        {
          to_email: 'lautaro.sarni@gmail.com',
          from_name: name,
          from_email: email,
          message: message,
        },
        'pMx34sH3rphECE9m1' // Tu Public Key
      );
      
      toast({
        title: "Mensaje enviado",
        description: "Tu mensaje ha sido enviado exitosamente.",
      });
      
      // Limpiar el formulario
      setName("");
      setEmail("");
      setMessage("");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Hubo un problema al intentar enviar el mensaje. Por favor intenta nuevamente.",
      });
    } finally {
      setIsSending(false);
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
                disabled={isSending}
                className="w-full bg-ghost-white/10 hover:bg-ghost-white/20 text-ghost-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
