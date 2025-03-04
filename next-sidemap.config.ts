
import { getUnitCategories } from '@/app/[locale]/unit-converter/util/unitCategories';
import locales from '@/app/[locale]/unit-converter/util/locales.json';
import type { IConfig } from 'next-sitemap';

const supportedLanguages = ['en', 'de', 'fr', 'es', 'uk', 'zh', 'pt'];

// Mapping für das Verbindungswort je Sprache
const conversionConnector: Record<string, string> = {
	en: 'to',
	de: 'zu',
	fr: 'à',
	es: 'a',
	uk: 'до',
	zh: '到',
	pt: 'para',
};

const config: IConfig = {
	siteUrl: 'https://toolboxes.app',
	generateRobotsTxt: true,
	exclude: ['/server-sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: ['https://toolboxes.app/server-sitemap.xml'],
	},
	alternateRefs: [
		{ href: 'https://toolboxes.app/en', hreflang: 'en' },
		{ href: 'https://toolboxes.app/de', hreflang: 'de' },
		{ href: 'https://toolboxes.app/fr', hreflang: 'fr' },
		{ href: 'https://toolboxes.app/es', hreflang: 'es' },
		{ href: 'https://toolboxes.app/uk', hreflang: 'uk' },
		{ href: 'https://toolboxes.app/zh', hreflang: 'zh' },
		{ href: 'https://toolboxes.app/pt', hreflang: 'pt' },
	],
	// Dynamische Einträge für die Unit-Converter-Seiten
	additionalPaths: async () => {
		const paths: { loc: string; lastmod: string }[] = [];
		supportedLanguages.forEach((lang) => {
			// Hole die Kategorien für die jeweilige Sprache
			const categories = getUnitCategories(lang as keyof typeof locales);
			Object.keys(categories).forEach((categoryKey) => {
				const category = categories[categoryKey];
				const unitKeys = Object.keys(category.units);
				// Erstelle für jedes Paar (from, to) einen Eintrag, wenn sie unterschiedlich sind
				unitKeys.forEach((from) => {
					unitKeys.forEach((to) => {
						if (from !== to) {
							const connector = conversionConnector[lang];
							const urlPath = `/${lang}/unit-converter/${categoryKey}/${from}-${connector}-${to}`;
							paths.push({
								loc: urlPath,
								lastmod: new Date().toISOString(),
							});
						}
					});
				});
			});
		});
		return paths;
	},
};

export default config;
