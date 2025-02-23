// app/[locale]/unit-converter/page.tsx
'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import locales from './util/locales.json';
import Converter from './components/Converter';

export default function UnitConverterPage() {
	const { locale } = useParams() as { locale: "de" | "en" | "es" | "fr" | "uk" | "zh" };

	return (
		<div className="w-full bg-base-100 flex flex-col items-center py-10">
			<h1 className="text-4xl font-bold text-accent mb-6">
				{locales[locale]?.['unit-converter'].description || 'Unit Converter'}
			</h1>
			<Converter locale={locale} />
		</div>
	);
}
