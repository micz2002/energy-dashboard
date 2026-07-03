import { BatteryCharging, Clock3 } from "lucide-react";
import { formatDateTime, formatPercentage } from "@/lib/formatters";
import type { ChargingWindowResponse } from "@/types/energy";

type ChargingResultCardProps = {
  result: ChargingWindowResponse | null;
  isLoading: boolean;
};

export function ChargingResultCard({
  result,
  isLoading,
}: ChargingResultCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="h-4 w-36 animate-pulse rounded bg-slate-200" />
        <div className="mt-6 h-12 w-48 animate-pulse rounded bg-slate-200" />
        <div className="mt-8 h-24 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div>
          <Clock3 className="mx-auto text-emerald-950" size={42} />
          <p className="mt-4 text-sm text-slate-600">
            Select charging duration to calculate the cleanest charging window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-emerald-900">
        <BatteryCharging size={16} />
        Recommended slot
      </div>

      <div className="mt-7 rounded-2xl bg-emerald-50 p-5">
        <p className="text-sm font-medium text-emerald-900">Start time</p>
        <p className="mt-1 text-3xl font-black tracking-tight text-emerald-950">
          {formatDateTime(result.startDateTime)}
        </p>
      </div>

      <div className="mt-6 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">End time</p>
          <p className="mt-1 font-bold text-slate-950">
            {formatDateTime(result.endDateTime)}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">Average clean energy</p>
          <p className="mt-1 font-bold text-emerald-800">
            {formatPercentage(result.cleanEnergyPercentage)}
          </p>
        </div>
      </div>
    </article>
  );
}