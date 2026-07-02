"use client";

import { useEffect, useState } from "react";
import { getChargingWindow, getEnergyMix } from "@/lib/api";
import {
  formatDate,
  formatDateTime,
  formatPercentage,
  formatSourceName,
  getDayLabel,
} from "@/lib/formatters";
import type {
  ChargingWindowResponse,
  EnergyMixResponse,
} from "@/types/energy";

export default function Home() {
  const [energyMix, setEnergyMix] = useState<EnergyMixResponse | null>(null);
  const [chargingWindow, setChargingWindow] =
    useState<ChargingWindowResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const [energyMixResponse, chargingWindowResponse] = await Promise.all([
          getEnergyMix(),
          getChargingWindow(3),
        ]);

        setEnergyMix(energyMixResponse);
        setChargingWindow(chargingWindowResponse);
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Could not load dashboard data.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p className="text-slate-700">Loading energy dashboard...</p>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
          <h1 className="mb-2 text-xl font-semibold">Something went wrong</h1>
          <p>{errorMessage}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            EcoGrid GB
          </p>
          <h1 className="mt-2 text-4xl font-bold">
            Great Britain Energy Mix Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Frontend is connected to the Spring Boot backend. This temporary
            view will be replaced with the final dashboard layout.
          </p>
        </div>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Energy Mix Forecast</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {energyMix?.days.map((day, index) => (
              <article
                key={day.date}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {getDayLabel(index)}
                    </p>
                    <h3 className="mt-1 text-xl font-bold">
                      {formatDate(day.date)}
                    </h3>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                    {formatPercentage(day.cleanEnergyPercentage)} clean
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {day.sources.slice(0, 6).map((source) => (
                    <li
                      key={source.source}
                      className="flex justify-between border-b border-slate-100 pb-2 text-sm"
                    >
                      <span>{formatSourceName(source.source)}</span>
                      <span className="font-semibold">
                        {formatPercentage(source.percentage)}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold">EV Charging Optimization</h2>

          {chargingWindow && (
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-slate-500">Start time</p>
                <p className="text-lg font-semibold">
                  {formatDateTime(chargingWindow.startDateTime)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">End time</p>
                <p className="text-lg font-semibold">
                  {formatDateTime(chargingWindow.endDateTime)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Average clean energy</p>
                <p className="text-lg font-semibold text-emerald-700">
                  {formatPercentage(chargingWindow.cleanEnergyPercentage)}
                </p>
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}