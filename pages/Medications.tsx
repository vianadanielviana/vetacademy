import React, { useState, useEffect } from "react";
import { ICONS } from "../constants";
import { supabase, Medication } from "../lib/supabase";

const Medications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [activeTab, setActiveTab] = useState<"dosages" | "info">("dosages");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar medicamentos do Supabase
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("medications_")
          .select("*")
          .order("name");

        if (fetchError) {
          console.error("Supabase error:", fetchError);
          setError(
            `Erro ao carregar medicamentos: ${fetchError.message}. Verifique sua conexão e tente novamente.`,
          );
          return;
        }

        const safeMedications = (data || []).map((med) => ({
          ...med,
          name: med.name || "",
          category: med.category || "",
          indication: med.indication || "",
          dosagedog: med.dosagedog || "",
          dosagecat: med.dosagecat || "",
        }));

        setMedications(safeMedications);
      } catch (err) {
        console.error("Erro ao buscar medicamentos:", err);
        setError("Erro ao carregar medicamentos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const filteredMedications = medications.filter((med) => {
    const query = searchQuery.toLowerCase();
    return (
      (med.name || "").toLowerCase().includes(query) ||
      (med.category || "").toLowerCase().includes(query) ||
      (med.indication || "").toLowerCase().includes(query)
    );
  });

  const openDetail = (med: Medication) => {
    setSelectedMed(med);
    setActiveTab("dosages");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gradient-button rounded-2xl shadow-glow">
          <ICONS.BookOpen size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-black">Biblioteca de Medicamentos</h1>
          <p className="text-muted-foreground font-medium">
            Transcrição técnica integral do guia clínico VetAcademy.
          </p>
        </div>
      </div>

      <div className="relative group">
        <ICONS.Search
          className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-purple-400 transition-colors"
          size={22}
        />
        <input
          type="text"
          placeholder="Buscar por nome, categoria ou indicação..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 outline-none focus:ring-2 ring-purple-500/50 backdrop-blur-sm transition-all text-lg shadow-xl"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 glass rounded-3xl">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando medicamentos...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-20 glass rounded-3xl border-red-500/20">
          <ICONS.Activity size={48} className="mx-auto text-red-400/50 mb-4" />
          <p className="text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Medications Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedications.map((med) => (
            <div
              key={med.id}
              onClick={() => openDetail(med)}
              className="group p-6 rounded-2xl glass hover:bg-white/10 transition-all border border-white/5 hover:border-white/20 cursor-pointer flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold group-hover:text-purple-300 transition-colors">
                    {med.name || "Sem nome"}
                  </h3>
                </div>
                <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded">
                  {med.category || "Sem categoria"}
                </span>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {med.indication || "Sem indicação"}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between text-xs font-bold text-purple-400/80 uppercase tracking-tighter">
                <span>Ver Detalhes</span>
                <ICONS.ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredMedications.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl border-dashed">
          <ICONS.Search
            size={48}
            className="mx-auto text-muted-foreground/30 mb-4"
          />
          <p className="text-muted-foreground italic">
            {searchQuery
              ? `Nenhum medicamento encontrado para "${searchQuery}"`
              : "Nenhum medicamento cadastrado."}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedMed && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedMed(null)}
          />
          <div className="relative w-full max-w-2xl bg-[hsl(var(--background))] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 my-auto">
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-2xl md:text-3xl font-black text-white">
                    {selectedMed.name}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest rounded-full">
                    {selectedMed.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMed(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
                >
                  <ICONS.X />
                </button>
              </div>

              {/* Tab Selector */}
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setActiveTab("dosages")}
                  className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                    activeTab === "dosages"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Dosagens
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 text-sm font-bold uppercase tracking-widest transition-all ${
                    activeTab === "info"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-muted-foreground hover:text-white"
                  }`}
                >
                  Informações
                </button>
              </div>

              <div className="space-y-4 min-h-[350px]">
                {activeTab === "dosages" ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="glass p-5 rounded-2xl border-white/5">
                      <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-2">
                        Resumo da Indicação
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {selectedMed.indication}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="glass p-5 rounded-2xl border-l-4 border-blue-500 bg-blue-500/5">
                        <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-blue-300">
                          Cães
                        </h4>
                        <p className="text-sm font-medium leading-relaxed text-gray-200">
                          {selectedMed.dosagedog || "Dosagem não disponível"}
                        </p>
                      </div>
                      <div className="glass p-5 rounded-2xl border-l-4 border-pink-500 bg-pink-500/5">
                        <h4 className="text-sm font-bold flex items-center gap-2 mb-3 text-pink-300">
                          Gatos
                        </h4>
                        <p className="text-sm font-medium leading-relaxed text-gray-200">
                          {selectedMed.dosagecat || "Dosagem não disponível"}
                        </p>
                      </div>
                    </div>

                    {selectedMed.notes && (
                      <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-2xl">
                        <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <ICONS.Activity size={14} /> Observações Clínicas
                        </h4>
                        <p className="text-sm text-amber-200/80 leading-relaxed font-medium">
                          {selectedMed.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="glass p-6 rounded-2xl border-white/5 border-l-4 border-purple-500">
                      <h4 className="text-xs font-black text-purple-400 uppercase tracking-widest mb-4">
                        Mecanismo e Detalhes Integrais
                      </h4>
                      {selectedMed.description ? (
                        <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                          {selectedMed.description}
                        </p>
                      ) : (
                        <div className="text-center py-10 opacity-50 italic text-sm">
                          Sem informações complementares cadastradas para este
                          item.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedMed(null)}
                className="w-full h-14 bg-gradient-button rounded-2xl font-bold text-lg shadow-glow text-white mt-4"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medications;
