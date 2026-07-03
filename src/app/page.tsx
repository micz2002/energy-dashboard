"use client";

import { useEffect, useState } from "react";
import { ChargingOptimizer } from "@/components/ChargingOptimizer";
import { EnergyMixSection } from "@/components/EnergyMixSection";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LoadingState } from "@/components/LoadingState";
import { getEnergyMix } from "@/lib/api";
import type { EnergyMixResponse } from "@/types/energy";

export default function Home() {
  const [energyMix, setEnergyMix] = useState<EnergyMixResponse | null>(null);
  const [isLoadingEnergyMix, setIsLoadingEnergyMix] = useState(true);
  const [energyMixError, setEnergyMixError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let shouldIgnore = false;

    async function loadEnergyMix() {
      try {
        const response = await getEnergyMix();

        if (!shouldIgnore) {
          setEnergyMix(response);
          setEnergyMixError(null);
        }
      } catch (error) {
        if (!shouldIgnore) {
          setEnergyMixError(
            error instanceof Error ? error.message : "Could not load energy mix.",
          );
        }
      } finally {
        if (!shouldIgnore) {
          setIsLoadingEnergyMix(false);
        }
      }
    }

    void loadEnergyMix();

    return () => {
      shouldIgnore = true;
    };
  }, [reloadKey]);

  function handleRetry() {
    setIsLoadingEnergyMix(true);
    setEnergyMixError(null);
    setReloadKey((currentValue) => currentValue + 1);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <HeroSection />

      {isLoadingEnergyMix && (
        <section className="mx-auto max-w-7xl px-5 py-14">
          <LoadingState />
        </section>
      )}

      {energyMixError && !isLoadingEnergyMix && (
        <section className="mx-auto max-w-7xl px-5 py-14">
          <ErrorMessage message={energyMixError} onRetry={handleRetry} />
        </section>
      )}

      {energyMix && !isLoadingEnergyMix && (
        <>
          <EnergyMixSection energyMix={energyMix} />
          <ChargingOptimizer />
        </>
      )}
    </main>
  );
}