import { MetadataRoute } from 'next';
import { LOCALES, UNITS_CATEGORIES } from '@/shared';
import {
  getSimpleUnitsFromCategoryKey,
  UnitCategoryKey,
} from './[locale]/tools/unit-converter/util/unitCategories';
import { getTranslations } from 'next-intl/server';

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: 'daily' | 'weekly';
  priority: number;
};

// Helper to generate URLs for all locales
const generateLocalizedUrls = (path: string): SitemapEntry[] => {
  return LOCALES.map((locale) => ({
    url: `https://toolboxes.app/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));
};

// Generate homepage entries for all locales
const generateHomePageEntries = (): SitemapEntry[] => {
  return LOCALES.map((locale) => ({
    url: `https://toolboxes.app/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));
};

// Get all tool routes
const getToolRoutes = (): SitemapEntry[] => {
  const tools = [
    '/tools/unit-converter',
    '/tools/file-converter',
    '/tools/password-generator',
    '/tools/qr-code-generator',
    '/tools/tip-calculator',
    '/tools/json-validator',
  ];

  return tools.flatMap(generateLocalizedUrls);
};

// Generate category-specific entries for unit converter
const generateCategoryEntry = (locale: string, category: UnitCategoryKey): SitemapEntry => {
  return {
    url: `https://toolboxes.app/${locale}/tools/unit-converter/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };
};

// Get unit converter category routes
const getUnitConverterCategoriesRoutes = (): SitemapEntry[] => {
  return UNITS_CATEGORIES.flatMap((category) =>
    LOCALES.map((locale) => generateCategoryEntry(locale, category))
  );
};

// Generate unit conversion entry
const generateUnitConversionEntry = (
  locale: string,
  category: UnitCategoryKey,
  fromUnit: string,
  toUnit: string
): SitemapEntry => {
  return {
    url: `https://toolboxes.app/${locale}/tools/unit-converter/${category}/${fromUnit}/${toUnit}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  };
};

// Generate all possible unit conversion combinations for a category and locale
const generateCategoryUnitCombinations = async (
  category: UnitCategoryKey,
  locale: string
): Promise<SitemapEntry[]> => {
  const t = await getTranslations(locale);
  const simpleUnits = getSimpleUnitsFromCategoryKey(category, t);

  return simpleUnits.flatMap((fromUnit) =>
    simpleUnits
      .filter((toUnit) => toUnit.value !== fromUnit.value)
      .map((toUnit) => generateUnitConversionEntry(locale, category, fromUnit.value, toUnit.value))
  );
};

// Get all possible unit converter routes
const getAllUnitConverterRoutes = async (): Promise<SitemapEntry[]> => {
  const allRoutesPromises = UNITS_CATEGORIES.flatMap((category) =>
    LOCALES.map((locale) => generateCategoryUnitCombinations(category, locale))
  );

  const resolvedRoutes = await Promise.all(allRoutesPromises);
  return resolvedRoutes.flat();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const unitConverterRoutes = await getAllUnitConverterRoutes();

  // Combine all routes
  return [
    ...generateHomePageEntries(),
    ...getToolRoutes(),
    ...getUnitConverterCategoriesRoutes(),
    ...unitConverterRoutes,
  ];
}
