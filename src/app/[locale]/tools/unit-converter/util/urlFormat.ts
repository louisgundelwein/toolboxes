/**
 * Formats a unit name for use in URLs by replacing special characters with hyphens.
 *
 * @param unit The unit name to format.
 * @returns The formatted unit name.
 */
export function formatUnitForUrl(unit: string): string {
  return unit
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^a-zA-Z0-9-]/g, (match) => {
      // Replace special characters with their encoded version
      return encodeURIComponent(match);
    });
}

/**
 * Parses a unit name from a URL by decoding special characters.
 *
 * @param urlUnit The unit name from the URL.
 * @returns The decoded unit name.
 */
export function parseUnitFromUrl(urlUnit: string): string {
  return decodeURIComponent(urlUnit);
}

/**
 * Creates a URL path for a unit conversion.
 *
 * @param category The unit category.
 * @param fromUnit The unit to convert from.
 * @param toUnit The unit to convert to.
 * @returns The formatted URL path.
 */
export function createConversionPath(
  category: string,
  fromUnit: string,
  toUnit: string,
): string {
  const formattedFromUnit = formatUnitForUrl(fromUnit);
  const formattedToUnit = formatUnitForUrl(toUnit);
  return `${category}/${formattedFromUnit}-to-${formattedToUnit}`;
}

/**
 * Parses a conversion path from a URL.
 *
 * @param conversion The conversion path from the URL.
 * @returns The parsed conversion units.
 */
export function parseConversionPath(conversion: string): {
  fromUnit: string;
  toUnit: string;
} {
  const [fromUnit, toUnit] = conversion.split("-to-");
  return {
    fromUnit: parseUnitFromUrl(fromUnit),
    toUnit: parseUnitFromUrl(toUnit),
  };
}
