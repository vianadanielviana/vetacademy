import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ICONS } from "../constants";
import PremiumModal from "../components/PremiumModal";

const Home: React.FC = () => {
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const quickLinks = [
    {
      title: "RCP",
      path: "/cpr",
    },
    {
      title: "Calculadora de Emergência",
      path: "/emergencia",
    },
    {
      title: "Calculadora Geral",
      path: "/calculadora",
    },
  ];

  const specialties = [
    { name: "Cardiologia", icon: "🫀" },
    { name: "Anestesiologia", icon: "💤" },
    { name: "Nefrologia", icon: "🩺" },
    { name: "Oncologia", icon: "🧬" },
    { name: "Dermatologia", icon: "🐾" },
    { name: "Neurologia", icon: "🧠" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10 max-w-3xl mx-auto">
      {/* Filtros Avançados */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowPremiumModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 transition-all text-sm font-medium"
        >
          <ICONS.Filter size={16} />
          <span>Filtros Avançados</span>
          <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
            Pro
          </span>
        </button>
      </div>

      {/* Conteúdo Didático - Link para página */}
      <Link to="/conteudo" className="block group">
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-500/30 border border-white/10 hover:border-purple-500/50 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                <ICONS.GraduationCap size={28} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Conteúdo Didático
                </h2>
                <p className="text-sm text-muted-foreground">
                  Vídeos, artigos e guias para seu aprendizado
                </p>
              </div>
            </div>
            <ICONS.ChevronRight
              size={24}
              className="text-white/50 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
            />
          </div>
        </div>
      </Link>

      {/* Quick Links - Lista Vertical */}
      <div className="space-y-3">
        {quickLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="block w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
          >
            <span className="text-lg font-bold text-white">{link.title}</span>
          </Link>
        ))}
        <Link
          to="/medicamentos"
          className="block w-full p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
        >
          <span className="text-lg font-bold text-white">Medicamentos</span>
        </Link>
      </div>

      {/* Card Intermediário com Favorito */}
      <div
        onClick={() => setShowPremiumModal(true)}
        className="relative p-5 rounded-2xl bg-gradient-to-r from-purple-600/40 to-pink-500/40 border border-white/10 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all"
      >
        <div className="absolute top-3 right-3">
          <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
            Pro
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-bold">
              Intermediário
            </span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ICONS.Star
              size={24}
              className="text-white/50 hover:text-yellow-400 transition-colors"
            />
          </button>
        </div>
      </div>

      {/* Premium Modal */}
      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
      />
    </div>
  );
};

export default Home;
