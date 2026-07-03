import { EnergyMixCard } from "@/components/EnergyMixCard";
import type { EnergyMixResponse } from "@/types/energy";

type EnergyMixSectionProps = {
  energyMix: EnergyMixResponse;
};

export function EnergyMixSection({ energyMix }: EnergyMixSectionProps) {
  return (
    <section id="energy-mix" className="mx-auto max-w-7xl px-5 py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-emerald-950">
            Energy Mix Forecast
          </h2>
          <p className="mt-2 text-slate-600">
            Average generation mix forecast for today, tomorrow and the day
            after tomorrow.
          </p>
        </div>

        <p className="text-sm font-medium text-slate-500">
          Data source: Carbon Intensity API
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {energyMix.days.map((day, index) => (
          <EnergyMixCard key={day.date} day={day} index={index} />
        ))}
      </div>
    </section>
  );
}