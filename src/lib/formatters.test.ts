import { describe, expect, it } from "vitest";
import {
  formatPercentage,
  formatSourceName,
  getDayLabel,
} from "@/lib/formatters";

describe("formatters", () => {
  it("formats percentage with two decimal places", () => {
    expect(formatPercentage(62.823)).toBe("62.82%");
  });

  it("formats energy source name", () => {
    expect(formatSourceName("wind")).toBe("Wind");
  });

  it("returns correct day labels", () => {
    expect(getDayLabel(0)).toBe("Today");
    expect(getDayLabel(1)).toBe("Tomorrow");
    expect(getDayLabel(2)).toBe("Day after");
  });
});