import type { Currency } from "@/types/menu";

const CURRENCY_LOCALE: Record<Currency, string> = {
  USD: "en-US",
  EUR: "en-IE",
  LBP: "en-LB",
  IQD: "en-IQ",
};

const CURRENCY_FRACTION: Record<Currency, number> = {
  USD: 2,
  EUR: 2,
  LBP: 0,
  IQD: 0,
};

/**
 * Format a numeric amount as currency.
 * Centralised so a future locale/currency switch is a one-line change.
 */
export function formatPrice(
  amount: number,
  currency: Currency = "IQD",
  opts?: { withSymbol?: boolean }
): string {
  const withSymbol = opts?.withSymbol ?? true;
  try {
    return new Intl.NumberFormat(CURRENCY_LOCALE[currency] ?? "en-US", {
      style: withSymbol ? "currency" : "decimal",
      currency,
      minimumFractionDigits: CURRENCY_FRACTION[currency] ?? 2,
      maximumFractionDigits: CURRENCY_FRACTION[currency] ?? 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(CURRENCY_FRACTION[currency] ?? 2)}`;
  }
}

/** Compact count formatting, e.g. 1_200 -> "1.2k". */
export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
}

/** Build a stable, URL-safe slug from a label. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pluralise a noun based on a count. */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`;
}
