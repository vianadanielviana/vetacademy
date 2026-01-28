import React from "react";
import { ICONS } from "../constants";

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[hsl(270_50%_12%)] border border-white/10 rounded-3xl p-8 max-w-md w-full relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
        >
          <ICONS.X size={24} />
        </button>

        {/* Crown Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <ICONS.Crown
              size={80}
              className="text-purple-500"
              strokeWidth={1.5}
            />
            {/* Sparkles */}
            <div className="absolute -top-1 -right-1">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
                  fill="#a855f7"
                  opacity="0.8"
                />
              </svg>
            </div>
            <div className="absolute top-2 -left-2">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
                  fill="#a855f7"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-white text-center mb-4">
          Recurso Premium
        </h2>

        {/* Description */}
        <p className="text-white/70 text-center mb-2">
          Este recurso estará disponível na versão paga do aplicativo.
        </p>
        <p className="text-white/50 text-center text-sm mb-8">
          Estamos trabalhando para trazer ainda mais funcionalidades
          profissionais para você.
        </p>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors"
          >
            Entendi
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl border border-white/20 hover:bg-white/5 text-white font-medium transition-colors"
          >
            Notifique-me quando disponível
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumModal;
