import React, { useState, useMemo } from "react";
import { ICONS } from "../constants";
import { Drug } from "../types";

const INITIAL_EMERGENCY_DRUGS: Drug[] = [
  {
    id: "1",
    name: "Amiodarona",
    concentration: 50,
    unit: "mg",
    dosageRange: { min: 2.5, max: 5, unit: "mg/kg" },
    indication: "Arritmias ventriculares",
    route: "IV Lento",
  },
  {
    id: "2",
    name: "Atipamezole (Antisedan)",
    concentration: 5,
    unit: "mg",
    dosageRange: { min: 0.1, max: 0.2, unit: "mg/kg" },
    indication: "Reversão de alfa-2 agonistas",
    route: "IM",
  },
  {
    id: "3",
    name: "Sulfato de Atropina",
    concentration: 0.5,
    concentrationOptions: [0.25, 0.5],
    unit: "mg",
    dosageRange: { min: 0.02, max: 0.04, unit: "mg/kg" },
    indication: "Bradicardia",
    route: "IV, IM",
  },
  {
    id: "4",
    name: "Gluconato de Cálcio",
    concentration: 100,
    unit: "mg",
    dosageRange: { min: 50, max: 100, unit: "mg/kg" },
    indication: "Hipocalcemia/Hipercalemia",
    route: "IV Lento",
  },
  {
    id: "5",
    name: "Dexametasona",
    concentration: 4,
    concentrationOptions: [2, 4],
    unit: "mg",
    dosageRange: { min: 0.1, max: 2, unit: "mg/kg" },
    indication: "Anti-inflamatório/Choque",
    route: "IV, IM",
  },
  {
    id: "6",
    name: "Desfibrilador Externo",
    concentration: 1,
    unit: "J",
    dosageRange: { min: 2, max: 5, unit: "J/kg" },
    indication: "Fibrilação Ventricular",
    route: "Externo",
    isDefibrillator: true,
  },
  {
    id: "7",
    name: "Desfibrilador Interno",
    concentration: 1,
    unit: "J",
    dosageRange: { min: 0.2, max: 0.5, unit: "J/kg" },
    indication: "Fibrilação Ventricular",
    route: "Interno",
    isDefibrillator: true,
  },
  {
    id: "8",
    name: "Diazepam",
    concentration: 5,
    unit: "mg",
    dosageRange: { min: 0.5, max: 1, unit: "mg/kg" },
    indication: "Status Epilepticus",
    route: "IV, IR",
  },
  {
    id: "9",
    name: "Difenidramina",
    concentration: 50,
    unit: "mg",
    dosageRange: { min: 1, max: 2, unit: "mg/kg" },
    indication: "Reação Anafilática",
    route: "IV, IM",
  },
  {
    id: "10",
    name: "Dobutamina",
    concentration: 12.5,
    unit: "mg",
    dosageRange: { min: 2, max: 20, unit: "mcg/kg/min" },
    indication: "Suporte Inotrópico",
    route: "IV Infusão",
  },
  {
    id: "11",
    name: "Dopamina",
    concentration: 5,
    unit: "mg",
    dosageRange: { min: 2, max: 10, unit: "mcg/kg/min" },
    indication: "Suporte Vasopressor",
    route: "IV Infusão",
  },
  {
    id: "12",
    name: "Doxapram",
    concentration: 20,
    unit: "mg",
    dosageRange: { min: 1, max: 5, unit: "mg/kg" },
    indication: "Estimulante Respiratório",
    route: "IV",
  },
  {
    id: "13",
    name: "Epinefrina (Dose Alta)",
    concentration: 1,
    unit: "mg",
    dosageRange: { min: 0.1, max: 0.2, unit: "mg/kg" },
    indication: "PCR Prolongada",
    route: "IV, IT",
  },
  {
    id: "14",
    name: "Epinefrina (Dose Baixa)",
    concentration: 1,
    unit: "mg",
    dosageRange: { min: 0.01, max: 0.02, unit: "mg/kg" },
    indication: "PCR/Anafilaxia",
    route: "IV, IT",
  },
  {
    id: "15",
    name: "Flumazenil",
    concentration: 0.1,
    unit: "mg",
    dosageRange: { min: 0.01, max: 0.02, unit: "mg/kg" },
    indication: "Reversão Benzodiazepínicos",
    route: "IV",
  },
  {
    id: "16",
    name: "Furosemida",
    concentration: 10,
    unit: "mg",
    dosageRange: { min: 1, max: 4, unit: "mg/kg" },
    indication: "Edema Pulmonar",
    route: "IV, IM",
  },
  {
    id: "17",
    name: "Glicopirrolato",
    concentration: 0.2,
    unit: "mg",
    dosageRange: { min: 0.005, max: 0.01, unit: "mg/kg" },
    indication: "Bradicardia",
    route: "IV, IM",
  },
  {
    id: "18",
    name: "Heparina",
    concentration: 5000,
    unit: "UI",
    dosageRange: { min: 100, max: 200, unit: "UI/kg" },
    indication: "Anticoagulação",
    route: "IV, SC",
  },
  {
    id: "19",
    name: "Lidocaína",
    concentration: 20,
    concentrationOptions: [10, 20],
    unit: "mg",
    dosageRange: { min: 2, max: 4, unit: "mg/kg" },
    indication: "Taquicardia Ventricular",
    route: "IV",
  },
  {
    id: "20",
    name: "Manitol",
    concentration: 200,
    unit: "mg",
    dosageRange: { min: 0.5, max: 1, unit: "g/kg" },
    indication: "Edema Cerebral",
    route: "IV Lento",
  },
  {
    id: "21",
    name: "Midazolam",
    concentration: 5,
    concentrationOptions: [1, 5],
    unit: "mg",
    dosageRange: { min: 0.2, max: 0.5, unit: "mg/kg" },
    indication: "Sedação/Convulsões",
    route: "IV, IM, IN",
  },
  {
    id: "22",
    name: "Naloxona",
    concentration: 0.4,
    unit: "mg",
    dosageRange: { min: 0.01, max: 0.04, unit: "mg/kg" },
    indication: "Reversão de Opioides",
    route: "IV, IM",
  },
  {
    id: "23",
    name: "Norepinefrina",
    concentration: 1,
    unit: "mg",
    dosageRange: { min: 0.1, max: 2, unit: "mcg/kg/min" },
    indication: "Choque Vasoplégico",
    route: "IV Infusão",
  },
  {
    id: "24",
    name: "Fenobarbital",
    concentration: 100,
    concentrationOptions: [100, 200],
    unit: "mg",
    dosageRange: { min: 2, max: 4, unit: "mg/kg" },
    indication: "Status Epilepticus",
    route: "IV Lento",
  },
  {
    id: "25",
    name: "Vasopressina",
    concentration: 20,
    unit: "UI",
    dosageRange: { min: 0.4, max: 0.8, unit: "UI/kg" },
    indication: "PCR Refratária",
    route: "IV",
  },
];

const EmergencyCalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [drugs, setDrugs] = useState<Drug[]>(INITIAL_EMERGENCY_DRUGS);

  const actualWeight = useMemo(() => {
    const val = parseFloat(weight);
    if (isNaN(val)) return 0;
    return val;
  }, [weight]);

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

  const calculateResult = (drug: Drug, weightVal: number) => {
    const minDose = weightVal * drug.dosageRange.min;
    const maxDose = weightVal * drug.dosageRange.max;

    if (drug.isDefibrillator) {
      // Para desfibriladores, o resultado é em Joules diretamente
      return {
        minResult: minDose,
        maxResult: maxDose,
        unit: "Joules",
      };
    }

    // Para medicamentos, calcular volume
    const minVol = minDose / drug.concentration;
    const maxVol = maxDose / drug.concentration;
    return {
      minResult: minVol,
      maxResult: maxVol,
      unit: "ml",
    };
  };

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

      <div className="p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 sticky top-0 z-40 shadow-2xl bg-[hsl(270,40%,18%)] border border-white/10">
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
            <div className="flex bg-white/10 border border-white/10 rounded-xl p-1 items-center">
              <span className="px-4 rounded-lg bg-purple-600 shadow-glow text-white font-bold">
                kg
              </span>
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
                <th className="px-6 py-5 border-b border-white/5">Dose</th>
                <th className="px-6 py-5 border-b border-white/5 text-purple-400">
                  Resultado
                </th>
                <th className="px-6 py-5 border-b border-white/5">Via</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDrugs.map((drug) => {
                const result = calculateResult(drug, actualWeight);

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
                      {drug.isDefibrillator ? (
                        <span className="text-sm text-muted-foreground">—</span>
                      ) : drug.concentrationOptions &&
                        drug.concentrationOptions.length > 1 ? (
                        <select
                          value={drug.concentration}
                          onChange={(e) =>
                            handleConcentrationChange(drug.id, e.target.value)
                          }
                          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono focus:ring-1 ring-purple-500/50 outline-none cursor-pointer hover:bg-white/10 transition-colors"
                        >
                          {drug.concentrationOptions.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-[#1a1a2e] text-white"
                            >
                              {opt} {drug.unit === "UI" ? "UI/ml" : "mg/ml"}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="number"
                          step="0.01"
                          value={drug.concentration}
                          onChange={(e) =>
                            handleConcentrationChange(drug.id, e.target.value)
                          }
                          className="w-24 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-sm font-mono focus:ring-1 ring-purple-500/50 outline-none"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono whitespace-nowrap">
                      {drug.dosageRange.min === drug.dosageRange.max
                        ? `${drug.dosageRange.min} ${drug.dosageRange.unit}`
                        : `${drug.dosageRange.min} - ${drug.dosageRange.max} ${drug.dosageRange.unit}`}
                    </td>
                    <td className="px-6 py-4">
                      {actualWeight > 0 ? (
                        <div
                          className={`px-4 py-2 ${
                            drug.isDefibrillator
                              ? "bg-red-500/20 border-red-500/40"
                              : "bg-purple-500/20 border-purple-500/40"
                          } border rounded-xl inline-flex flex-col items-center min-w-[100px] shadow-glow animate-in zoom-in-95`}
                        >
                          <span
                            className={`text-lg font-black leading-tight ${
                              drug.isDefibrillator
                                ? "text-red-200"
                                : "text-purple-200"
                            }`}
                          >
                            {result.minResult.toFixed(2)}
                            {result.minResult !== result.maxResult &&
                              ` - ${result.maxResult.toFixed(2)}`}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-bold ${
                              drug.isDefibrillator
                                ? "text-red-400/80"
                                : "text-purple-400/80"
                            }`}
                          >
                            {result.unit}
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
    </div>
  );
};

export default EmergencyCalculator;
