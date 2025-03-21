// app/[locale]/tools/unit-converter/[category]/[conversion]/page.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';
import { getUnitCategoryObject, UnitCategoryKey } from '../../util/unitCategories';
import { parseConversionPath } from '../../util/urlFormat';

interface PageProps {
	params: Promise<{
		locale: string;
		category: string;
		conversion: string;
	}>;
}

export default function ConversionPage({ params }: PageProps) {
	const t = useTranslations('UnitConverterPage');
	const resolvedParams = React.use(params);

	const categoryKey = resolvedParams.category as UnitCategoryKey;

	const unitCategory = getUnitCategoryObject(categoryKey, t);

	if (!unitCategory) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh]">
				<h1 className="text-2xl font-bold text-error mb-4">
					{t('errors.invalidCategory')}
				</h1>
				<p className="text-base-content">
					{t('errors.pleaseSelectValidCategory')}
				</p>
			</div>
		);
	}

	// Parse conversion path to get fromUnit and toUnit
	const { fromUnit, toUnit } = parseConversionPath(resolvedParams.conversion);


	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-8">
				{unitCategory.name}
			</h1>
			<Converter category={categoryKey} fromUnit={fromUnit} toUnit={toUnit} />
		</div>
	);
}
