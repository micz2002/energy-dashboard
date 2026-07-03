import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EnergyMixCard } from "@/components/EnergyMixCard";
import type { DailyEnergyMix } from "@/types/energy";

describe("EnergyMixCard", () => {
  it("displays day label, clean energy percentage and source shares", () => {
    const day: DailyEnergyMix = {
      date: "2026-07-03",
      cleanEnergyPercentage: 62.82,
      sources: [
        { source: "wind", percentage: 32.7 },
        { source: "solar", percentage: 13.53 },
        { source: "nuclear", percentage: 11.36 },
        { source: "biomass", percentage: 5.1 },
        { source: "gas", percentage: 20.08 },
      ],
    };

    render(<EnergyMixCard day={day} index={0} />);

    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("3 Jul 2026")).toBeInTheDocument();
    expect(screen.getByText("62.82% Clean")).toBeInTheDocument();

    expect(screen.getByText("Wind")).toBeInTheDocument();
    expect(screen.getByText("32.70%")).toBeInTheDocument();

    expect(screen.getByText("Gas")).toBeInTheDocument();
    expect(screen.getByText("20.08%")).toBeInTheDocument();
  });
});