"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { getChargingWindow } from "@/lib/api";
import { ChargingResultCard } from "@/components/ChargingResultCard";
import { ErrorMessage } from "@/components/ErrorMessage";
import type { ChargingWindowResponse } from "@/types/energy";

export function ChargingOptimizer() {
  const [durationHours, setDurationHours] = useState(3);
  const [result, setResult] = useState<ChargingWindowResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let shouldIgnore = false;

    async function loadChargingWindow() {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await getChargingWindow(durationHours);

        if (!shouldIgnore) {
          setResult(response);
        }
      } catch (error) {
        if (!shouldIgnore) {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : "Could not calculate charging window.",
          );
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoading(false);
        }
      }
    }

    void loadChargingWindow();

    return () => {
      shouldIgnore = true;
    };
  }, [durationHours]);

  return (
    <section className="mx-auto max-w-7xl px-5 pb-16">
      <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-emerald-50 p-6 shadow-sm sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm">
              <SlidersHorizontal size={16} />
              EV charging optimization
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-emerald-950">
              Find the cleanest time to charge
            </h2>

            <p className="mt-3 max-w-xl text-slate-600">
              Select your required charging duration. The application will ask
              the backend for the best charging window over the next two days.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <label
                  htmlFor="duration"
                  className="font-semibold text-slate-950"
                >
                  Charging duration
                </label>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-bold text-emerald-900">
                  {durationHours} {durationHours === 1 ? "hour" : "hours"}
                </span>
              </div>

              <input
                id="duration"
                type="range"
                min={1}
                max={6}
                step={1}
                value={durationHours}
                onChange={(event) =>
                  setDurationHours(Number(event.target.value))
                }
                className="mt-6 w-full accent-emerald-800"
              />

              <div className="mt-3 flex justify-between text-xs font-medium text-slate-500">
                {[1, 2, 3, 4, 5, 6].map((hour) => (
                  <span key={hour}>{hour}h</span>
                ))}
              </div>
            </div>
          </div>

          <div>
            {errorMessage ? (
              <ErrorMessage message={errorMessage} />
            ) : (
              <ChargingResultCard result={result} isLoading={isLoading} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}