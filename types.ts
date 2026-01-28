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
  concentration: number; // mg/ml
  unit: string; // ml, mg
  dosageRange: {
    min: number;
    max: number;
    unit: string; // mg/kg
  };
  indication: string;
  route: string;
}

export interface CalculationResult {
  drugId: string;
  weight: number;
  doseUsed: number;
  volume: number;
}
