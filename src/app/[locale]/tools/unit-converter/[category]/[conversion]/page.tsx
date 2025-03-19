// app/[locale]/tools/unit-converter/[category]/[conversion]/page.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Converter from '../../components/Converter';
import type { UnitCategoryEnum } from '@/shared';
import { getUnitCategoryObject } from '../../util/unitCategories';
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
	const unitCategories = getUnitCategoryObject(t);
	const categoryKeys = Object.keys(unitCategories) as UnitCategoryEnum[];

	// Validate category
	const category = resolvedParams.category as UnitCategoryEnum;
	if (!categoryKeys.includes(category)) {
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

	// Validate units exist in category
	if (
		!fromUnit ||
		!toUnit ||
		!(fromUnit in unitCategories[category].units) ||
		!(toUnit in unitCategories[category].units)
	) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh]">
				<h1 className="text-2xl font-bold text-error mb-4">
					{t('errors.invalidUnits')}
				</h1>
				<p className="text-base-content">
					{t('errors.pleaseSelectValidUnits')}
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold text-center mb-8">
				{unitCategories[category].name}
			</h1>
			<Converter category={category} fromUnit={fromUnit} toUnit={toUnit} />
		</div>
	);
}
