import React, { useState } from "react";
import { ICONS } from "../constants";
import { DERMATOLOGIA_TOPICS, DermaTopic } from "./data/dermatologia";

interface Especialidade {
  id: string;
  nome: string;
  icone: React.ReactNode;
  topicos?: DermaTopic[];
}

const ESPECIALIDADES: Especialidade[] = [
  { id: "anestesiologia", nome: "Anestesiologia", icone: <ICONS.Activity size={24} /> },
  { id: "afeccoes-respiratorias", nome: "Afecções Respiratórias", icone: <ICONS.HeartPulse size={24} /> },
  { id: "afeccoes-reprodutivo", nome: "Afecções do Sistema Reprodutivo", icone: <ICONS.Stethoscope size={24} /> },
  { id: "cardiologia", nome: "Cardiologia", icone: <ICONS.HeartPulse size={24} /> },
  { id: "dermatologia", nome: "Dermatologia", icone: <ICONS.Stethoscope size={24} />, topicos: DERMATOLOGIA_TOPICS },
  { id: "doencas-infecciosas", nome: "Doenças Infecciosas", icone: <ICONS.Activity size={24} /> },
  { id: "endocrinologia", nome: "Endocrinologia", icone: <ICONS.Stethoscope size={24} /> },
  { id: "gastroenterologia", nome: "Gastroenterologia", icone: <ICONS.Activity size={24} /> },
  { id: "hematologia", nome: "Hematologia", icone: <ICONS.HeartPulse size={24} /> },
  { id: "toxicologia", nome: "Toxicologia", icone: <ICONS.Activity size={24} /> },
  { id: "nefrologia", nome: "Nefrologia", icone: <ICONS.Stethoscope size={24} /> },
  { id: "neonatologia", nome: "Neonatologia", icone: <ICONS.HeartPulse size={24} /> },
  { id: "neurologia", nome: "Neurologia", icone: <ICONS.Activity size={24} /> },
  { id: "oftalmologia", nome: "Oftalmologia", icone: <ICONS.Stethoscope size={24} /> },
  { id: "oncologia", nome: "Oncologia", icone: <ICONS.Activity size={24} /> },
  { id: "ortopedia", nome: "Ortopedia", icone: <ICONS.Stethoscope size={24} /> },
  { id: "vacinacao", nome: "Vacinação e Imunização", icone: <ICONS.HeartPulse size={24} /> },
];

// Renderiza o conteúdo formatado de cada tópico
const renderContent = (text: string) => {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("### ")) {
      return (
        <h4 key={i} className="text-xs font-black text-purple-400 uppercase tracking-widest mt-5 mb-2 first:mt-0">
          {line.slice(4)}
        </h4>
      );
    }
    if (line === "---") {
      return <hr key={i} className="border-white/10 my-3" />;
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return (
        <p key={i} className="font-bold text-white text-sm mt-3 mb-1">
          {line.slice(2, -2)}
        </p>
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li key={i} className="text-sm text-white/75 ml-4 list-disc leading-relaxed">
          {line.slice(2)}
        </li>
      );
    }
    if (line.startsWith("  - ")) {
      return (
        <li key={i} className="text-sm text-white/60 ml-8 list-disc leading-relaxed">
          {line.slice(4)}
        </li>
      );
    }
    if (line === "") {
      return <div key={i} className="h-1" />;
    }
    return (
      <p key={i} className="text-sm text-white/75 leading-relaxed">
        {line}
      </p>
    );
  });
};

const Especialidades: React.FC = () => {
  const [selecionada, setSelecionada] = useState<Especialidade | null>(null);
  const [topicoSelecionado, setTopicoSelecionado] = useState<DermaTopic | null>(null);

  const fecharModal = () => {
    setSelecionada(null);
    setTopicoSelecionado(null);
  };

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
              {esp.topicos ? (
                <p className="text-xs text-green-400 mt-1 font-medium">
                  {esp.topicos.length} tópicos
                </p>
              ) : (
                <p className="text-xs text-white/30 mt-1">Em breve</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selecionada && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={fecharModal} />

          <div className="relative w-full max-w-2xl bg-[hsl(var(--background))] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

            {/* Header do modal */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-3">
                {topicoSelecionado && (
                  <button
                    onClick={() => setTopicoSelecionado(null)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white mr-1"
                  >
                    <ICONS.ChevronLeft size={18} />
                  </button>
                )}
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  {selecionada.icone}
                </div>
                <div>
                  <h2 className="text-lg font-black text-white leading-tight">
                    {topicoSelecionado ? topicoSelecionado.title : selecionada.nome}
                  </h2>
                  {topicoSelecionado && (
                    <p className="text-xs text-white/40">{selecionada.nome}</p>
                  )}
                </div>
              </div>
              <button
                onClick={fecharModal}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/60 hover:text-white"
              >
                <ICONS.X size={20} />
              </button>
            </div>

            {/* Conteúdo do modal — scrollável */}
            <div className="overflow-y-auto flex-1 p-6">

              {/* Lista de tópicos */}
              {!topicoSelecionado && selecionada.topicos && (
                <div className="space-y-2">
                  {selecionada.topicos.map((topico) => (
                    <button
                      key={topico.id}
                      onClick={() => setTopicoSelecionado(topico)}
                      className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-purple-500/15 border border-white/5 hover:border-purple-500/30 transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-xs font-black flex-shrink-0">
                          {topico.id}
                        </span>
                        <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                          {topico.title}
                        </span>
                      </div>
                      <ICONS.ChevronRight size={16} className="text-white/30 group-hover:text-purple-400 flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* Conteúdo do tópico selecionado */}
              {topicoSelecionado && (
                <div className="space-y-0.5">
                  {renderContent(topicoSelecionado.content)}
                </div>
              )}

              {/* Sem conteúdo */}
              {!selecionada.topicos && (
                <div className="flex flex-col items-center justify-center h-[260px] gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <ICONS.BookOpen size={28} className="text-purple-400/50" />
                  </div>
                  <div>
                    <p className="font-bold text-white/40 text-lg">Conteúdo em preparação</p>
                    <p className="text-sm text-white/25 mt-1">
                      O material de {selecionada.nome} será adicionado em breve.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Rodapé */}
            <div className="p-6 pt-0 flex-shrink-0">
              <button
                onClick={topicoSelecionado ? () => setTopicoSelecionado(null) : fecharModal}
                className="w-full h-12 bg-gradient-button rounded-2xl font-bold text-white shadow-glow hover:opacity-90 transition-all"
              >
                {topicoSelecionado ? "Voltar aos Tópicos" : "Fechar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Especialidades;
