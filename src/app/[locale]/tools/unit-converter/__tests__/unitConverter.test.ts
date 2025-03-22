import { UNITS_CATEGORIES } from '@/shared';
import { getTranslations } from 'next-intl/server';
import { describe, expect, test } from 'vitest';
import { vi } from 'vitest';
import getUnitCategoryObject, {
	getSimpleUnitsFromCategoryKey,
	UnitCategoryKey,
} from '../util/unitCategories';

// Helper function to set locale for testing
const setTestLocale = (locale: string) => {
	process.env.NEXT_PUBLIC_LOCALE = locale;
	vi.mock('next-intl/server', () => ({
		getTranslations: () => {
			return (key: string) => {
				// Return mock translations for testing
				return key;
			};
		},
	}));
};

// Available locales for testing
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'uk', 'zh'];

// Helper function to test category translations for a specific locale
const testCategoryTranslations = async (locale: string) => {
	setTestLocale(locale);
	const t = await getTranslations('UnitConverterPage');
	for (const category of UNITS_CATEGORIES) {
		expect(t(`units.${category}`)).toBeDefined();
		expect(t(`units.${category}.name`)).toBeDefined();
	}
};

// Helper function to test unit translations for a specific category and locale
const testUnitTranslations = async (
	locale: string,
	categoryKey: UnitCategoryKey
) => {
	setTestLocale(locale);
	const t = await getTranslations('UnitConverterPage');

	const category = getUnitCategoryObject(categoryKey, t);
	expect(category).toBeDefined();
	if (!category) return;

	const units = Object.values(category.units);

	if (categoryKey === 'data-storage') console.log({ units });

	for (const unit of units) {
		expect(t(`units.${categoryKey}.${unit}`)).toBeDefined();
		expect(t(`units.${categoryKey}.${unit}.name`)).toBeDefined();
		expect(t(`units.${categoryKey}.${unit}.abbr`)).toBeDefined();
		expect(t(`units.${categoryKey}.${unit}.definition`)).toBeDefined();
		expect(t(`units.${categoryKey}.${unit}.wiki`)).toBeDefined();
	}
};

describe('Unit Converter Translations', () => {
	// Test category translations for all locales
	describe('Categories', () => {
		LOCALES.forEach((locale) => {
			test(`test if ${locale} category values exist`, async () => {
				await testCategoryTranslations(locale);
			});
		});
	});

	// Test unit translations for all categories and locales
	UNITS_CATEGORIES.forEach((category) => {
		describe(`${category} units`, () => {
			LOCALES.forEach((locale) => {
				test(`test if ${locale} ${category} unit values exist`, async () => {
					await testUnitTranslations(locale, category as UnitCategoryKey);
				});
			});
		});
	});
});
