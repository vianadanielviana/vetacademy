import React, { useState, useMemo } from "react";
import { ICONS } from "../constants";
import { Drug } from "../types";

const INITIAL_EMERGENCY_DRUGS: Drug[] = [
  {
    id: "1",
    name: "Adrenalina (1:1000)",
    concentration: 1,
    unit: "mg",
    dosageRange: { min: 0.01, max: 0.02, unit: "mg/kg" },
    indication: "Parada Cardiorespiratória",
    route: "IV, IT",
  },
  {
    id: "2",
    name: "Atropina (0,5 mg/ml)",
    concentration: 0.5,
    unit: "mg",
    dosageRange: { min: 0.02, max: 0.04, unit: "mg/kg" },
    indication: "Bradicardia grave",
    route: "IV, IM",
  },
  {
    id: "3",
    name: "Lidocaína 2%",
    concentration: 20,
    unit: "mg",
    dosageRange: { min: 2, max: 4, unit: "mg/kg" },
    indication: "Taquicardia Ventricular",
    route: "IV",
  },
  {
    id: "4",
    name: "Diazepam (5 mg/ml)",
    concentration: 5,
    unit: "mg",
    dosageRange: { min: 0.5, max: 1.0, unit: "mg/kg" },
    indication: "Status Epilepticus",
    route: "IV, IR",
  },
  {
    id: "5",
    name: "Naloxona (0,4 mg/ml)",
    concentration: 0.4,
    unit: "mg",
    dosageRange: { min: 0.04, max: 0.04, unit: "mg/kg" },
    indication: "Reversão de Opioides",
    route: "IV, IM",
  },
  {
    id: "6",
    name: "Fentanil (0,05 mg/ml)",
    concentration: 0.05,
    unit: "mg",
    dosageRange: { min: 0.002, max: 0.005, unit: "mg/kg" },
    indication: "Analgesia/Indução",
    route: "IV",
  },
  {
    id: "7",
    name: "Gluconato de Cálcio 10%",
    concentration: 100,
    unit: "mg",
    dosageRange: { min: 50, max: 100, unit: "mg/kg" },
    indication: "Hipocalcemia/Hipercalemia",
    route: "IV Lento",
  },
];

const EmergencyCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [unit, setUnit] = useState<"kg" | "lb">("kg");
  const [searchTerm, setSearchTerm] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>(INITIAL_EMERGENCY_DRUGS);

  const actualWeight = useMemo(() => {
    const val = parseFloat(weight);
    if (isNaN(val)) return 0;
    return unit === "lb" ? val * 0.453592 : val;
  }, [weight, unit]);

  const handleConcentrationChange = (id: string, newConc: string) => {
    const val = parseFloat(newConc);
    if (isNaN(val) || val <= 0) return;
    setDrugs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, concentration: val } : d)),
    );
  };

  const filteredDrugs = drugs.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.indication.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const resetDrugs = () => setDrugs(INITIAL_EMERGENCY_DRUGS);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Calculadora de Emergência</h1>
          <p className="text-muted-foreground">
            Cálculos críticos instantâneos baseados no protocolo RECOVER.
          </p>
        </div>
        <button
          onClick={resetDrugs}
          className="text-xs text-purple-400 hover:text-white flex items-center gap-1 transition-colors px-3 py-1 bg-white/5 rounded-lg border border-white/10"
        >
          <ICONS.Settings size={14} /> Resetar Concentrações
        </button>
      </div>

      <div className="glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 sticky top-20 z-40 shadow-2xl">
        <div className="space-y-4">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Peso do Paciente
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              placeholder="0.0"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl h-14 px-4 text-2xl font-bold outline-none focus:ring-2 ring-purple-500/50 transition-all"
            />
            <div className="flex bg-white/10 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setUnit("kg")}
                className={`px-4 rounded-lg transition-all font-bold ${unit === "kg" ? "bg-purple-600 shadow-glow text-white" : "text-muted-foreground hover:bg-white/5"}`}
              >
                kg
              </button>
              <button
                onClick={() => setUnit("lb")}
                className={`px-4 rounded-lg transition-all font-bold ${unit === "lb" ? "bg-purple-600 shadow-glow text-white" : "text-muted-foreground hover:bg-white/5"}`}
              >
                lb
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Filtrar Medicamento
          </label>
          <div className="relative">
            <ICONS.Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar por nome ou indicação..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl h-14 pl-12 pr-4 outline-none focus:ring-2 ring-purple-500/50"
            />
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/10 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <tr>
                <th className="px-6 py-5 border-b border-white/5">
                  Medicamento / Indicação
                </th>
                <th className="px-6 py-5 border-b border-white/5">
                  Conc. (mg/ml)
                </th>
                <th className="px-6 py-5 border-b border-white/5">
                  Dose (mg/kg)
                </th>
                <th className="px-6 py-5 border-b border-white/5 text-purple-400">
                  Volume Total (ml)
                </th>
                <th className="px-6 py-5 border-b border-white/5">Via</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDrugs.map((drug) => {
                const weightVal = actualWeight;
                const minDose = weightVal * drug.dosageRange.min;
                const maxDose = weightVal * drug.dosageRange.max;
                const minVol = minDose / drug.concentration;
                const maxVol = maxDose / drug.concentration;

                return (
                  <tr
                    key={drug.id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white group-hover:text-purple-300 transition-colors">
                        {drug.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {drug.indication}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        step="0.01"
                        value={drug.concentration}
                        onChange={(e) =>
                          handleConcentrationChange(drug.id, e.target.value)
                        }
                        className="w-20 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm font-mono focus:ring-1 ring-purple-500/50 outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-mono whitespace-nowrap">
                      {drug.dosageRange.min === drug.dosageRange.max
                        ? drug.dosageRange.min
                        : `${drug.dosageRange.min} - ${drug.dosageRange.max}`}
                    </td>
                    <td className="px-6 py-4">
                      {weightVal > 0 ? (
                        <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/40 rounded-xl inline-flex flex-col items-center min-w-[100px] shadow-glow animate-in zoom-in-95">
                          <span className="text-lg font-black text-purple-200 leading-tight">
                            {minVol.toFixed(2)}{" "}
                            {minVol !== maxVol && `- ${maxVol.toFixed(2)}`}
                          </span>
                          <span className="text-[10px] uppercase font-bold text-purple-400/80">
                            Mililitros
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground/30 font-bold">
                          Aguardando peso
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-white/5 rounded text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
                        {drug.route}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filteredDrugs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-muted-foreground italic"
                  >
                    Nenhum medicamento encontrado para "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group glass p-6 rounded-2xl border-l-4 border-red-500 hover:bg-red-500/5 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ICONS.Activity className="text-red-500" /> Desfibrilação
            </h3>
            <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-1 rounded font-bold uppercase">
              RECOVER 2024
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-red-500/20">
              <span className="block text-xs text-muted-foreground uppercase font-bold mb-1">
                Externo (Bifásico)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">
                  {actualWeight > 0 ? (actualWeight * 3).toFixed(0) : "3-5"}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Joules
                </span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-red-500/20">
              <span className="block text-xs text-muted-foreground uppercase font-bold mb-1">
                Interno
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">
                  {actualWeight > 0
                    ? (actualWeight * 0.1).toFixed(1)
                    : "0.1-0.5"}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  Joules
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="group glass p-6 rounded-2xl border-l-4 border-blue-500 hover:bg-blue-500/5 transition-all space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ICONS.Activity className="text-blue-500" /> Fluido Choque (15
              min)
            </h3>
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded font-bold uppercase">
              Cristalóides
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/20">
              <span className="block text-xs text-muted-foreground uppercase font-bold mb-1">
                Cão (1/4 dose)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-300">
                  {actualWeight > 0 ? (actualWeight * 22).toFixed(0) : "22"}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  ml
                </span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:border-blue-500/20">
              <span className="block text-xs text-muted-foreground uppercase font-bold mb-1">
                Gato (1/4 dose)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-300">
                  {actualWeight > 0 ? (actualWeight * 15).toFixed(0) : "15"}
                </span>
                <span className="text-sm font-bold text-muted-foreground">
                  ml
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyCalculator;
