
import { Users } from "lucide-react";

const Team = () => {
  return (
    <div className="min-h-screen bg-ghost-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-ghost-black/80 border-2 border-ghost-white/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-8">
          <Users className="w-8 h-8 text-ghost-white" />
          <h1 className="text-4xl font-bold text-ghost-white">El Equipo</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((member) => (
            <div
              key={member}
              className="bg-ghost-gray/20 rounded-lg p-4 border border-ghost-white/10"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-ghost-gray/30 mb-4" />
              <h3 className="text-ghost-white text-center">Miembro {member}</h3>
              <p className="text-ghost-white/60 text-center text-sm mt-2">Rol</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
