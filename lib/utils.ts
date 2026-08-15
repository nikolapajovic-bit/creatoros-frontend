import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Kompaktni format velikih brojeva — 128400 -> "128.4K"
 * Koristi se za pratioce, prikaze, lajkove itd. (AnalyticsOS)
 */
export function formatCompactNumber(
  value: number,
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Format novčanog iznosa — podrazumevano USD, prilagodljivo po valuti/lokalu
 * Koristi se u Finance i Deals modulima
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  locale: string = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format procentualne promene sa predznakom — 4.2 -> "+4.2%", -1.4 -> "-1.4%"
 * Koristi se za rast/pad metrika (dashboard, analytics)
 */
export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Skraćuje dugačak tekst na zadati broj karaktera i dodaje "..."
 * Koristi se za preview poruka, opisa deals-a, media naslova itd.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

/**
 * Generiše inicijale iz imena — "Ana Nikolić" -> "AN"
 * Koristi se kao Avatar fallback
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
