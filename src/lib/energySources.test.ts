import { describe, expect, it } from "vitest";
import { isCleanEnergySource } from "@/lib/energySources";

describe("energy sources", () => {
  it("recognizes clean energy sources", () => {
    expect(isCleanEnergySource("biomass")).toBe(true);
    expect(isCleanEnergySource("nuclear")).toBe(true);
    expect(isCleanEnergySource("hydro")).toBe(true);
    expect(isCleanEnergySource("wind")).toBe(true);
    expect(isCleanEnergySource("solar")).toBe(true);
  });

  it("does not mark fossil or other sources as clean", () => {
    expect(isCleanEnergySource("gas")).toBe(false);
    expect(isCleanEnergySource("coal")).toBe(false);
    expect(isCleanEnergySource("imports")).toBe(false);
    expect(isCleanEnergySource("other")).toBe(false);
  });
});