
import { Mail } from "lucide-react";

const Contact = () => {
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
            <form className="mt-6 space-y-4">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-ghost-black/50 border border-ghost-white/20 rounded-lg p-3 text-ghost-white"
              />
              <textarea
                placeholder="Tu mensaje"
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
