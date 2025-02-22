
import { HelpCircle } from "lucide-react";

const Mystery = () => {
  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <HelpCircle className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">????</h1>
        </div>
        <div className="h-64 flex items-center justify-center">
          <p className="text-ghost-white/60 text-xl animate-pulse">
            Próximamente...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mystery;
