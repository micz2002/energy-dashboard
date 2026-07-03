"use client";

import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { DailyEnergyMix } from "@/types/energy";
import {
  formatDate,
  formatPercentage,
  formatSourceName,
  getDayLabel,
} from "@/lib/formatters";
import { SOURCE_COLORS } from "@/lib/energySources";

type EnergyMixCardProps = {
  day: DailyEnergyMix;
  index: number;
};

type ChartSlice = {
  name: string;
  value: number;
  fill: string;
};

type PieShapeProps = {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;
  payload?: ChartSlice;
};

function getBadgeLabel(cleanEnergyPercentage: number) {
  if (cleanEnergyPercentage >= 60) {
    return "Clean";
  }

  if (cleanEnergyPercentage >= 45) {
    return "Moderate";
  }

  return "Carbon heavy";
}

function getBadgeClass(cleanEnergyPercentage: number) {
  if (cleanEnergyPercentage >= 60) {
    return "bg-emerald-100 text-emerald-800";
  }

  if (cleanEnergyPercentage >= 45) {
    return "bg-sky-100 text-sky-800";
  }

  return "bg-amber-100 text-amber-900";
}

function renderPieSlice(props: PieShapeProps) {
  return <Sector {...props} fill={props.payload?.fill ?? props.fill} />;
}

export function EnergyMixCard({ day, index }: EnergyMixCardProps) {
  const chartData: ChartSlice[] = day.sources
    .filter((source) => source.percentage > 0)
    .map((source) => ({
      name: source.source,
      value: source.percentage,
      fill: SOURCE_COLORS[source.source] ?? "#64748b",
    }));

  const visibleSources = day.sources
    .filter((source) => source.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
            {getDayLabel(index)}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">
            {formatDate(day.date)}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${getBadgeClass(
            day.cleanEnergyPercentage,
          )}`}
        >
          {formatPercentage(day.cleanEnergyPercentage)}{" "}
          {getBadgeLabel(day.cleanEnergyPercentage)}
        </span>
      </div>

      <div className="mt-8 grid items-center gap-6 sm:grid-cols-[1fr_1.1fr] md:grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
        <div className="relative h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={52}
                outerRadius={74}
                paddingAngle={2}
                stroke="none"
                shape={renderPieSlice}
              />
              <Tooltip
                formatter={(value, name) => [
                  formatPercentage(Number(value)),
                  formatSourceName(String(name)),
                ]}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-slate-950">
              {Math.round(day.cleanEnergyPercentage)}%
            </span>
          </div>
        </div>

        <div className="space-y-2.5">
          {visibleSources.map((source) => (
            <div
              key={source.source}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      SOURCE_COLORS[source.source] ?? "#64748b",
                  }}
                />
                <span className="truncate text-slate-700">
                  {formatSourceName(source.source)}
                </span>
              </div>

              <span className="shrink-0 font-bold text-slate-950">
                {formatPercentage(source.percentage)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}