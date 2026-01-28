import React, { useState } from "react";
import { ICONS } from "../constants";
import PremiumModal from "../components/PremiumModal";

type TabType = "videos" | "artigos" | "guias";

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("videos");
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  const videos = [
    {
      id: 1,
      title: "Anestesia em Pequenos Animais",
      duration: "45:30",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      tags: [
        { label: "Anestesiologia", color: "bg-purple-500" },
        { label: "Avançado", color: "bg-orange-500" },
      ],
      isPro: true,
    },
    {
      id: 2,
      title: "Cardiologia Veterinária - Parte 1",
      duration: "32:15",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
      tags: [
        { label: "Cardiologia", color: "bg-purple-500" },
        { label: "Intermediário", color: "bg-orange-500" },
      ],
      isPro: true,
    },
    {
      id: 3,
      title: "Técnicas Cirúrgicas Básicas",
      duration: "58:40",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop",
      tags: [
        { label: "Cirurgia", color: "bg-purple-500" },
        { label: "Básico", color: "bg-green-500" },
      ],
      isPro: true,
    },
  ];

  const artigos = [
    {
      id: 1,
      title: "Protocolo de Emergência em Cardiologia",
      readTime: "8 min de leitura",
      tags: [
        { label: "Cardiologia", color: "bg-purple-500" },
        { label: "Avançado", color: "bg-orange-500" },
      ],
      isPro: true,
    },
    {
      id: 2,
      title: "Manejo de Dor Pós-Operatória",
      readTime: "12 min de leitura",
      tags: [
        { label: "Anestesiologia", color: "bg-purple-500" },
        { label: "Intermediário", color: "bg-orange-500" },
      ],
      isPro: true,
    },
    {
      id: 3,
      title: "Dermatologia: Diagnóstico Diferencial",
      readTime: "15 min de leitura",
      tags: [
        { label: "Dermatologia", color: "bg-purple-500" },
        { label: "Avançado", color: "bg-orange-500" },
      ],
      isPro: true,
    },
  ];

  const guias = [
    {
      id: 1,
      title: "Guia Completo de Antibioticoterapia",
      pages: "45 páginas",
      tags: [{ label: "Farmacologia", color: "bg-purple-500" }],
      isPro: true,
    },
    {
      id: 2,
      title: "Manual de Procedimentos Cirúrgicos",
      pages: "120 páginas",
      tags: [{ label: "Cirurgia", color: "bg-yellow-500" }],
      isPro: true,
    },
    {
      id: 3,
      title: "Protocolos de Urgência e Emergência",
      pages: "68 páginas",
      tags: [{ label: "Emergência", color: "bg-orange-500" }],
      isPro: true,
    },
  ];

  const tabs = [
    {
      id: "videos" as TabType,
      label: "Vídeos",
      icon: <ICONS.Play size={18} />,
    },
    {
      id: "artigos" as TabType,
      label: "Artigos",
      icon: <ICONS.FileText size={18} />,
    },
    {
      id: "guias" as TabType,
      label: "Guias",
      icon: <ICONS.BookOpen size={18} />,
    },
  ];

  const handleContentClick = (isPro: boolean) => {
    if (isPro) {
      setIsPremiumModalOpen(true);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center">
          <ICONS.GraduationCap size={28} className="text-pink-400" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-white">Conteúdo Didático</h1>
          <p className="text-white/60">
            Vídeos, artigos e guias para seu aprendizado
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white/5 rounded-2xl p-1.5 border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? "tab-active text-white"
                : "text-white/70 hover:text-white hover:bg-white/5"
            }`}
          >
            <span className={activeTab === tab.id ? "text-white" : "icon-pink"}>
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "videos" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleContentClick(video.isPro)}
              className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay escuro no hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                {/* PRO Badge */}
                {video.isPro && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      Pro
                    </span>
                  </div>
                )}
                {/* Duration */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {video.duration}
                  </span>
                </div>
                {/* Play Button - aparece no hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <ICONS.Play
                      size={28}
                      className="text-white ml-1"
                      fill="white"
                    />
                  </div>
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="text-white font-bold mb-3">{video.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`${tag.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "artigos" && (
        <div className="space-y-3 animate-in fade-in duration-300">
          {artigos.map((artigo) => (
            <div
              key={artigo.id}
              onClick={() => handleContentClick(artigo.isPro)}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg mb-2">
                    {artigo.title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      {artigo.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`${tag.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
                        >
                          {tag.label}
                        </span>
                      ))}
                    </div>
                    <span className="text-white/50 text-sm">
                      {artigo.readTime}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {artigo.isPro && (
                    <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                      Pro
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <ICONS.FileText size={20} className="text-white/50" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "guias" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
          {guias.map((guia) => (
            <div
              key={guia.id}
              onClick={() => handleContentClick(guia.isPro)}
              className="relative p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <ICONS.BookOpen size={24} className="text-pink-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-white font-bold text-lg pr-4">
                      {guia.title}
                    </h3>
                    {guia.isPro && (
                      <span className="bg-yellow-500 text-yellow-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex-shrink-0">
                        Pro
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    {guia.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`${tag.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
                      >
                        {tag.label}
                      </span>
                    ))}
                    <span className="text-white/50 text-sm">{guia.pages}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Premium Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default Content;
