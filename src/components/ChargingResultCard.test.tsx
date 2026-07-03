import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChargingResultCard } from "@/components/ChargingResultCard";

describe("ChargingResultCard", () => {
  it("displays recommended charging window result", () => {
    render(
      <ChargingResultCard
        isLoading={false}
        result={{
          startDateTime: "2026-07-04T13:30:00+01:00",
          endDateTime: "2026-07-04T16:30:00+01:00",
          cleanEnergyPercentage: 67.17,
        }}
      />,
    );

    expect(screen.getByText("Recommended slot")).toBeInTheDocument();
    expect(screen.getByText("Start time")).toBeInTheDocument();
    expect(screen.getByText("End time")).toBeInTheDocument();
    expect(screen.getByText("Average clean energy")).toBeInTheDocument();
    expect(screen.getByText("67.17%")).toBeInTheDocument();
  });

  it("displays empty state when result is not available", () => {
    render(<ChargingResultCard isLoading={false} result={null} />);

    expect(
      screen.getByText(
        "Select charging duration to calculate the cleanest charging window.",
      ),
    ).toBeInTheDocument();
  });
});