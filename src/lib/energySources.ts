export const CLEAN_ENERGY_SOURCES = [
  "biomass",
  "nuclear",
  "hydro",
  "wind",
  "solar",
] as const;

export const SOURCE_COLORS: Record<string, string> = {
  wind: "#064e3b",
  solar: "#0284c7",
  hydro: "#38bdf8",
  nuclear: "#0f766e",
  biomass: "#65a30d",
  gas: "#334155",
  coal: "#111827",
  imports: "#94a3b8",
  other: "#cbd5e1",
};

export function isCleanEnergySource(source: string): boolean {
  return CLEAN_ENERGY_SOURCES.includes(
    source.toLowerCase() as (typeof CLEAN_ENERGY_SOURCES)[number],
  );
}