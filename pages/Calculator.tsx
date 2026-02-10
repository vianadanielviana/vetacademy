import React, { useState } from "react";
import { ICONS } from "../constants";

const Calculator: React.FC = () => {
  const [weight, setWeight] = useState("");
  const [medication, setMedication] = useState("");
  const [dosage, setDosage] = useState("");
  const [result, setResult] = useState<number | null>(null);

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
          {/* Medication Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white/70 uppercase tracking-wider">
              Nome do Medicamento
            </label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="Ex: Meloxicam, Dipirona..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-5 outline-none focus:ring-2 ring-purple-500/50 transition-all text-base placeholder:text-white/30"
            />
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

      {/* Quick Reference */}
      <section className="glass rounded-2xl p-6 border border-white/5">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <ICONS.BookOpen size={20} className="text-purple-400" />
          Referência Rápida
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              name: "Meloxicam",
              dose: "0.1-0.2 mg/kg",
              species: "Cães e Gatos",
            },
            { name: "Dipirona", dose: "25 mg/kg", species: "Cães e Gatos" },
            {
              name: "Amoxicilina",
              dose: "10-20 mg/kg",
              species: "Cães e Gatos",
            },
            {
              name: "Enrofloxacina",
              dose: "5-10 mg/kg",
              species: "Cães e Gatos",
            },
          ].map((med, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group"
              onClick={() => {
                setMedication(med.name);
              }}
            >
              <div>
                <p className="font-bold text-sm">{med.name}</p>
                <p className="text-xs text-muted-foreground">{med.species}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-purple-400">{med.dose}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Calculator;
