import type {
  ApiErrorResponse,
  ChargingWindowResponse,
  EnergyMixResponse,
} from "@/types/energy";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:8080";

export class ApiClientError extends Error {
  status?: number;
  response?: ApiErrorResponse;

  constructor(message: string, status?: number, response?: ApiErrorResponse) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.response = response;
  }
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let errorResponse: ApiErrorResponse | undefined;

    try {
      errorResponse = await response.json();
    } catch {
      errorResponse = undefined;
    }

    throw new ApiClientError(
      errorResponse?.message ?? "Request failed.",
      response.status,
      errorResponse,
    );
  }

  return response.json() as Promise<T>;
}

export function getEnergyMix(): Promise<EnergyMixResponse> {
  return request<EnergyMixResponse>("/api/energy-mix");
}

export function getChargingWindow(
  durationHours: number,
): Promise<ChargingWindowResponse> {
  const params = new URLSearchParams({
    durationHours: durationHours.toString(),
  });

  return request<ChargingWindowResponse>(
    `/api/charging-window?${params.toString()}`,
  );
}