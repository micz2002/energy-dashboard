export type EnergySourceShare = {
  source: string;
  percentage: number;
};

export type DailyEnergyMix = {
  date: string;
  cleanEnergyPercentage: number;
  sources: EnergySourceShare[];
};

export type EnergyMixResponse = {
  days: DailyEnergyMix[];
};

export type ChargingWindowResponse = {
  startDateTime: string;
  endDateTime: string;
  cleanEnergyPercentage: number;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
};