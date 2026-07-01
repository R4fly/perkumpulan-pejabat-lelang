// lib/format.ts
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function currentYear(): number {
  return new Date().getFullYear();
}