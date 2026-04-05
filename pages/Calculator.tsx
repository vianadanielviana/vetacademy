import React, { useState, useEffect, useRef } from "react";
import { ICONS } from "../constants";
import { supabase, Medication } from "../lib/supabase";

const Calculator: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  // Autocomplete
  const [medications, setMedications] = useState<Medication[]>([]);
  const [suggestions, setSuggestions] = useState<Medication[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Buscar todos os medicamentos do Supabase ao montar
  useEffect(() => {
    const fetchMedications = async () => {
      const { data, error } = await supabase
        .from("medications_")
        .select("*")
        .order("name");
      if (!error && data) {
        setMedications(data as Medication[]);
      }
    };
    fetchMedications();
  }, []);

  // Filtrar sugestões conforme digitação
  useEffect(() => {
    if (medication.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = medications.filter((m) =>
      m.name.toLowerCase().includes(medication.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 8));
    setShowSuggestions(filtered.length > 0);
  }, [medication, medications]);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMedication = (med: Medication) => {
    setMedication(med.name);
    setSelectedMed(med);
    setShowSuggestions(false);
  };

  const handleMedicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMedication(e.target.value);
    // Se o usuário editar manualmente, limpar seleção
    if (selectedMed && e.target.value !== selectedMed.name) {
      setSelectedMed(null);
    }
  };

  const calculateDosage = () => {
    const weightNum = parseFloat(weight);
    const dosageNum = parseFloat(dosage);
    if (weightNum > 0 && dosageNum > 0) {
      setResult(weightNum * dosageNum);
    }
  };

  const clearForm = () => {
    setWeight("");
    setMedication("");
    setDosage("");
    setResult(null);
    setSelectedMed(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Calculadora de Dosagem
        </h1>
        <p className="text-muted-foreground font-medium">
          Calcule dosagens precisas para seus pacientes.
        </p>
      </div>

      {/* Calculator Form */}
      <section className="glass rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
          <ICONS.Calculator size={20} className="text-purple-400" />
          Dados do Cálculo
        </h2>

        <div className="space-y-5">
          {/* Medication Name com Autocomplete */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/70 uppercase tracking-wider">
              Nome do Medicamento
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={medication}
                onChange={handleMedicationChange}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                placeholder="Ex: Meloxicam, Dipirona..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:ring-2 ring-purple-500/50 transition-all text-base placeholder:text-white/30"
                autoComplete="off"
              />
              {/* Dropdown de sugestões */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute left-0 right-0 top-full mt-1 z-50 bg-[hsl(270,40%,14%)] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                >
                  {suggestions.map((med) => (
                    <button
                      key={med.id}
                      type="button"
                      onMouseDown={() => handleSelectMedication(med)}
                      className="w-full text-left px-5 py-3 hover:bg-purple-500/20 transition-colors flex items-center justify-between group border-b border-white/5 last:border-b-0"
                    >
                      <div>
                        <p className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                          {med.name}
                        </p>
                        <p className="text-xs text-white/40">{med.category}</p>
                      </div>
                      <ICONS.ChevronRight size={14} className="text-white/20 group-hover:text-purple-400" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/70 uppercase tracking-wider">
              Peso do Animal (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 10"
              min="0"
              step="0.1"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:ring-2 ring-purple-500/50 transition-all text-base placeholder:text-white/30"
            />
          </div>

          {/* Dosage per kg */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/70 uppercase tracking-wider">
              Dosagem por kg (mg/kg)
            </label>
            <input
              type="number"
              value={dosage}
              onChange={(e) => setDosage(e.target.value)}
              placeholder="Ex: 0.2"
              min="0"
              step="0.01"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:ring-2 ring-purple-500/50 transition-all text-base placeholder:text-white/30"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={calculateDosage}
              className="flex-1 bg-gradient-button py-4 px-6 rounded-xl font-bold text-white shadow-glow hover:opacity-90 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ICONS.Calculator size={20} />
              Calcular
            </button>
            <button
              onClick={clearForm}
              className="px-6 py-4 rounded-xl font-bold bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-[0.98]"
            >
              <ICONS.RotateCcw size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Result */}
      {result !== null && (
        <section className="glass rounded-2xl p-6 border border-purple-500/30 bg-purple-500/10 animate-in slide-in-from-bottom-4 duration-300">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ICONS.Activity size={20} className="text-green-400" />
            Resultado do Cálculo
          </h2>
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <p className="text-sm text-white/50 uppercase tracking-wider font-bold mb-2">
              Dose Total Calculada
            </p>
            <p className="text-5xl font-black text-white">
              {result.toFixed(2)}
              <span className="text-2xl text-purple-400 ml-2">mg</span>
            </p>
            {medication && (
              <p className="text-sm text-white/70 mt-3">
                {medication} — {weight}kg
              </p>
            )}
          </div>
        </section>
      )}

      {/* Referência Rápida */}
      <section className="glass rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <ICONS.BookOpen size={20} className="text-purple-400" />
          Referência Rápida
        </h2>

        {selectedMed ? (
          /* Dados do medicamento selecionado */
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-black text-white">{selectedMed.name}</h3>
                <span className="inline-block mt-1 px-2 py-1 bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded">
                  {selectedMed.category}
                </span>
              </div>
            </div>

            {selectedMed.indication && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-1">
                  Indicação
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedMed.indication}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-blue-500/5">
                <p className="text-xs font-black text-blue-300 uppercase tracking-widest mb-2">
                  Cães
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedMed.dosagedog || "Não disponível"}
                </p>
              </div>
              <div className="p-4 rounded-xl border-l-4 border-pink-500 bg-pink-500/5">
                <p className="text-xs font-black text-pink-300 uppercase tracking-widest mb-2">
                  Gatos
                </p>
                <p className="text-sm text-white/80 leading-relaxed">
                  {selectedMed.dosagecat || "Não disponível"}
                </p>
              </div>
            </div>

            {selectedMed.notes && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-2">
                  <ICONS.Activity size={12} /> Observações Clínicas
                </p>
                <p className="text-sm text-amber-200/80 leading-relaxed">
                  {selectedMed.notes}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Estado vazio — sem medicamento selecionado */
          <div className="text-center py-10 text-white/30">
            <ICONS.Search size={36} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">
              Digite o nome de um medicamento acima para ver as informações de referência.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Calculator;
