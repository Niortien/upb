/** Luminance relative (WCAG) d'une couleur #rrggbb. */
function luminance(hex: string): number {
  const v = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Encre lisible sur un fond de couleur donné : blanche sur fond sombre, nuit sur fond clair. */
export function encreSur(fond: string): string {
  return luminance(fond) > 0.34 ? "#14174a" : "#ffffff";
}
