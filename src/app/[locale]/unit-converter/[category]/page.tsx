// app/[locale]/unit-converter/[category]/page.tsx
import { redirect } from 'next/navigation';
import locales from '../util/locales.json';

interface PageProps {
	params: {
		locale: keyof typeof locales;
		category: keyof (typeof locales)[keyof typeof locales]['unit-converter'];
	};
}

export default function CategoryRedirectPage({ params }: PageProps) {
	const { locale, category } = params;

	// Greife auf die Einheiten für die gegebene Kategorie zu
  const units = locales[locale]['unit-converter'][category];
	if (!units) {
		// Falls die Kategorie nicht gefunden wird, leite zur Hauptseite weiter
		redirect(`/${locale}/unit-converter`);
	}

	const unitKeys = Object.keys(units);
	if (unitKeys.length === 0) {
		redirect(`/${locale}/unit-converter`);
	}

	// Wähle die ersten beiden Einheiten aus.
	const fromUnit = unitKeys[0];
	const toUnit = unitKeys.length >= 2 ? unitKeys[1] : '';

	// Nutze das sprachspezifische Füllwort (z. B. "zu" in Deutsch, "to" in Englisch)
	const filler = locales[locale]['unit-converter'].to || 'to';

	// Direkt-Redirect auf die Detailseite, die den Slug im Format "fromUnit-filler-toUnit" erwartet.
	redirect(
		`/${locale}/unit-converter/${category}/${fromUnit}-${filler}-${toUnit}`
	);

	return null;
}
