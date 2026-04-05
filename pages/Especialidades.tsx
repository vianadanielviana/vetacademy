import React, { useState } from "react";
import { ICONS } from "../constants";

interface Especialidade {
  id: string;
  nome: string;
  icone: React.ReactNode;
  conteudo: string | null;
}

const ESPECIALIDADES: Especialidade[] = [
  {
    id: "anestesiologia",
    nome: "Anestesiologia",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "afeccoes-respiratorias",
    nome: "Afecções Respiratórias",
    icone: <ICONS.HeartPulse size={24} />,
    conteudo: null,
  },
  {
    id: "afeccoes-reprodutivo",
    nome: "Afecções do Sistema Reprodutivo",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "cardiologia",
    nome: "Cardiologia",
    icone: <ICONS.HeartPulse size={24} />,
    conteudo: null,
  },
  {
    id: "dermatologia",
    nome: "Dermatologia",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "doencas-infecciosas",
    nome: "Doenças Infecciosas",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "endocrinologia",
    nome: "Endocrinologia",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "gastroenterologia",
    nome: "Gastroenterologia",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "hematologia",
    nome: "Hematologia",
    icone: <ICONS.HeartPulse size={24} />,
    conteudo: null,
  },
  {
    id: "toxicologia",
    nome: "Toxicologia",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "nefrologia",
    nome: "Nefrologia",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "neonatologia",
    nome: "Neonatologia",
    icone: <ICONS.HeartPulse size={24} />,
    conteudo: null,
  },
  {
    id: "neurologia",
    nome: "Neurologia",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "oftalmologia",
    nome: "Oftalmologia",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "oncologia",
    nome: "Oncologia",
    icone: <ICONS.Activity size={24} />,
    conteudo: null,
  },
  {
    id: "ortopedia",
    nome: "Ortopedia",
    icone: <ICONS.Stethoscope size={24} />,
    conteudo: null,
  },
  {
    id: "vacinacao",
    nome: "Vacinação e Imunização",
    icone: <ICONS.HeartPulse size={24} />,
    conteudo: null,
  },
];

const Especialidades: React.FC = () => {
  const [selecionada, setSelecionada] = useState<Especialidade | null>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-button rounded-2xl shadow-glow">
          <ICONS.BookOpen size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Especialidades</h1>
          <p className="text-muted-foreground font-medium">
            Selecione uma especialidade para acessar o conteúdo.
          </p>
        </div>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ESPECIALIDADES.map((esp) => (
          <button
            key={esp.id}
            onClick={() => setSelecionada(esp)}
            className="group p-5 rounded-2xl glass border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all text-left flex flex-col gap-3 active:scale-[0.97]"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 group-hover:text-purple-300 transition-all">
              {esp.icone}
            </div>
            <div>
              <p className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors leading-tight">
                {esp.nome}
              </p>
              {esp.conteudo ? (
                <p className="text-xs text-green-400 mt-1 font-medium">
                  Conteúdo disponível
                </p>
              ) : (
                <p className="text-xs text-white/30 mt-1">Em breve</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal de conteúdo */}
      {selecionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelecionada(null)}
          />
          <div className="relative w-full max-w-2xl bg-[hsl(var(--background))] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Header do modal */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  {selecionada.icone}
                </div>
                <h2 className="text-xl font-black text-white">
                  {selecionada.nome}
                </h2>
              </div>
              <button
                onClick={() => setSelecionada(null)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
              >
                <ICONS.X size={20} />
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6 min-h-[300px]">
              {selecionada.conteudo ? (
                <div className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                  {selecionada.conteudo}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[260px] gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <ICONS.BookOpen size={28} className="text-purple-400/50" />
                  </div>
                  <div>
                    <p className="font-bold text-white/40 text-lg">
                      Conteúdo em preparação
                    </p>
                    <p className="text-sm text-white/25 mt-1">
                      O material de {selecionada.nome} será adicionado em breve.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelecionada(null)}
                className="w-full h-12 bg-gradient-button rounded-2xl font-bold text-white shadow-glow hover:opacity-90 transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Especialidades;
