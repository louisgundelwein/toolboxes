// app/[locale]/unit-converter/[category]/[conversion]/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Converter from '../../components/Converter';
import locales from '../../util/locales.json';

export default function ConversionDetailPage() {
	const { locale, category, conversion } = useParams() as {
		locale: 'de' | 'en' | 'es' | 'fr' | 'uk' | 'zh';
		category:
			| ''
			| 'length'
			| 'weight'
			| 'area'
			| 'volume'
			| 'temperature'
			| 'speed'
			| 'time'
			| 'pressure'
			| 'energy'
			| 'power'
			| 'dataStorage'
			| 'angle'
			| 'frequency'
			| 'force'
			| 'density';
		conversion: string;
	};

	// Annahme: Der Conversion-Slug hat das Format "fromUnit-filler-toUnit"
	// Beispiel: "meter-in-kilometer" oder "pounds-to-kilograms"
	const parts = conversion.split('-');
	let initialFromUnit = '';
	let initialToUnit = '';
	if (parts.length >= 3) {
		initialFromUnit = parts[0];
		initialToUnit = parts[parts.length - 1];
	}

	return (
		<div className="w-full bg-base-100 flex flex-col items-center py-10">
			<h1 className="text-4xl font-bold text-accent mb-6">
				{locales[locale]?.['unit-converter'].description || 'Unit Converter'}
			</h1>
			<Converter
				locale={locale}
				initialCategory={category}
				initialFromUnit={initialFromUnit}
				initialToUnit={initialToUnit}
			/>
		</div>
	);
}
