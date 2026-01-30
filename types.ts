export enum CPRProtocol {
  ALS = "ALS",
  BLS = "BLS",
}

export enum CPRState {
  CONFIG = "CONFIG",
  ACTIVE = "ACTIVE",
  PAUSE = "PAUSE",
}

export interface Drug {
  id: string;
  name: string;
  concentration: number; // mg/ml ou UI/ml
  concentrationOptions?: number[]; // opções de concentração disponíveis
  unit: string; // ml, mg, UI
  dosageRange: {
    min: number;
    max: number;
    unit: string; // mg/kg, UI/kg, J/kg
  };
  indication: string;
  route: string;
  isDefibrillator?: boolean; // para desfibriladores (resultado em Joules)
}

export interface CalculationResult {
  drugId: string;
  weight: number;
  doseUsed: number;
  volume: number;
}
