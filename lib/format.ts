/**
 * Locale-aware formatting helpers used by Server Components.
 * Centralized so all dates and numbers follow the same rules.
 */

const LOCALE = "id-ID";

/**
 * Formats a date as e.g. "20 Juni 2026".
 */
export function formatDateLong(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Formats a date as e.g. "20 Jun 2026" — shorter variant for card metadata.
 */
export function formatDateShort(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString(LOCALE, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Formats a number using Indonesian locale, e.g. 1.234.567.
 */
export function formatNumber(value: number): string {
  return value.toLocaleString(LOCALE);
}

/**
 * Returns the current year (server-side, no `new Date()` in render path
 * surprises).
 */
export function currentYear(): number {
  return new Date().getFullYear();
}
