
import { Film } from "lucide-react";

const Trailer = () => {
  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Film className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">El Trailer</h1>
        </div>
        <div className="aspect-video bg-ghost-gray/20 rounded-lg flex items-center justify-center">
          <p className="text-ghost-white/60">Video próximamente...</p>
        </div>
      </div>
    </div>
  );
};

export default Trailer;
