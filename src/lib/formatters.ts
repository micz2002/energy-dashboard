export function formatDate(date: string): string {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(value);
}

export function formatDateTime(dateTime: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(new Date(dateTime));
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatSourceName(source: string): string {
  return source.charAt(0).toUpperCase() + source.slice(1);
}

export function getDayLabel(index: number): string {
  if (index === 0) {
    return "Today";
  }

  if (index === 1) {
    return "Tomorrow";
  }

  return "Day after";
}