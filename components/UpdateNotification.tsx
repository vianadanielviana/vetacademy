import React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

const UpdateNotification: React.FC = () => {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[200] md:left-auto md:right-6 md:w-80">
      <div className="bg-[hsl(270_50%_20%)] border border-purple-500/40 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
        <div className="flex-1">
          <p className="text-sm font-bold text-white">Nova versão disponível</p>
          <p className="text-xs text-white/60 mt-0.5">Toque em Atualizar para aplicar.</p>
        </div>
        <button
          onClick={() => updateServiceWorker(true)}
          className="px-4 py-2 bg-gradient-button rounded-xl text-sm font-bold text-white shadow-glow hover:opacity-90 transition-all flex-shrink-0"
        >
          Atualizar
        </button>
      </div>
    </div>
  );
};

export default UpdateNotification;
