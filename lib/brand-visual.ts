const GRADIENT_PAIRS: [string, string][] = [
  ["#7C5CFC", "#9B7BFF"], // brand
  ["#F5A623", "#FFC978"], // gold
  ["#4ADE80", "#7CF0A8"], // rise
  ["#F0577A", "#FF8FA8"], // fall
  ["#7C5CFC", "#F5A623"], // brand → gold
  ["#4ADE80", "#7C5CFC"], // rise → brand
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function brandGradient(brand: string): string {
  const [from, to] = GRADIENT_PAIRS[hashString(brand) % GRADIENT_PAIRS.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

export function brandInitial(brand: string): string {
  return brand.trim().charAt(0).toUpperCase();
}
