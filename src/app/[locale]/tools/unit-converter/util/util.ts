// util/slugify.ts
export function slugifyUnit(unit: string): string {
  return unit
    .toLowerCase()
    .replace(/\s+/g, "-") // Leerzeichen in Bindestriche
    .replace(/\//g, "-") // Schrägstriche ersetzen
    .replace(/[^\w-]+/g, ""); // Entferne alle nicht alphanumerischen Zeichen (außer Bindestrich)
}

export function findUnitKey(
  slug: string,
  units: Record<string, unknown>,
): string {
  const keys = Object.keys(units);
  return keys.find((key) => slugifyUnit(key) === slug) || "";
}
