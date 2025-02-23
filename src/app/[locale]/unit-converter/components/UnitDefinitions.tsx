// components/UnitDefinitions.tsx
import React from 'react';
import locales from '../util/locales.json';

// Typ für die Detailinformationen einer Einheit
interface UnitDetail {
	abbr: string;
	definition: string;
	wiki: string;
}

// Wir leiten den Typ der Kategorien anhand der Struktur in "en" ab
export type UnitCategoryKey =
	keyof (typeof locales)['en']['unit-converter']['units'];

// Typ für das gesamte Einheitenobjekt: In jeder Kategorie können beliebige Einheiten (string-Schlüssel) vorhanden sein.
type Units = {
	[key in UnitCategoryKey]: {
		[unit: string]: UnitDetail;
	};
};

export interface UnitDefinitionsProps {
	locale: keyof typeof locales;
	// category muss einer der erlaubten Schlüssel sein
	category: UnitCategoryKey;
	fromUnit: string;
	toUnit: string;
}

const UnitDefinitions: React.FC<UnitDefinitionsProps> = ({
	locale,
	category,
	fromUnit,
	toUnit,
}) => {
	// Casten des units-Objekts in den Typ "Units", sodass wir beliebig indexieren können.
	const units = locales[locale]['unit-converter'].units as Units;
	const unitData = units[category];
	if (!unitData) return null;
	const fromData = unitData[fromUnit];
	const toData = unitData[toUnit];

	const definition = locales[locale].definitions.for;
	const forMore = locales[locale].definitions.more;

	return (
		<div className="flex flex-col mt-4 gap-2">
			{fromData && (
				<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
					<h4>
						{`${definition} `}
						{fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}
					</h4>
					<p>{fromData.definition}</p>
					<a
						href={fromData.wiki}
						target="_blank"
						rel="noopener noreferrer"
						className="text-info"
					>
						{forMore}
					</a>
				</div>
			)}
			{toData && (
				<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
					<h4>
						{`${definition} `}
						{toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
					</h4>
					<p>{toData.definition}</p>
					<a
						href={toData.wiki}
						target="_blank"
						rel="noopener noreferrer"
						className="text-info"
					>
						{forMore}
					</a>
				</div>
			)}
		</div>
	);
};

export default UnitDefinitions;
