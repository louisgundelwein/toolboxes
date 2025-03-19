// components/Converter.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { roundValue } from '../util/rounding';
import UnitDefinitions from './UnitDefinitions';
import Dropdown from '@/app/components/dropdown';
import { useTranslations } from 'next-intl';
import type { UnitCategoryEnum } from '@/shared';
import { getUnitCategoryObject } from '../util/unitCategories';
import { useRouter, usePathname } from 'next/navigation';
import { createConversionPath } from '../util/urlFormat';

interface ConverterProps {
	fromUnit?: string;
	toUnit?: string;
	category?: UnitCategoryEnum;
}

export default function Converter({
	fromUnit: initialFromUnit,
	toUnit: initialToUnit,
	category: initialCategory,
}: ConverterProps) {
	const t = useTranslations('UnitConverterPage');
	const router = useRouter();
	const pathname = usePathname();

	// Initialize state with URL parameters
	const [category, setCategory] = useState<UnitCategoryEnum | undefined>(
		initialCategory
	);
	const [fromUnit, setFromUnit] = useState<string | undefined>(initialFromUnit);
	const [toUnit, setToUnit] = useState<string | undefined>(initialToUnit);
	const [result, setResult] = useState('');
	const [value, setValue] = useState('');

	// Update state when props change
	useEffect(() => {
		if (initialCategory) setCategory(initialCategory);
		if (initialFromUnit) setFromUnit(initialFromUnit);
		if (initialToUnit) setToUnit(initialToUnit);
	}, [initialCategory, initialFromUnit, initialToUnit]);

	// Get unit categories for the current locale
	const unitCategories = getUnitCategoryObject(t);
	const categoryKeys = Object.keys(unitCategories) as UnitCategoryEnum[];

	// Effect: Update URL when both units are selected
	useEffect(() => {
		if (category && fromUnit && toUnit) {
			const newPath = `/tools/unit-converter/${createConversionPath(
				category,
				fromUnit,
				toUnit
			)}`;
			if (pathname !== newPath) {
				router.push(newPath, { scroll: false });
			}
		}
	}, [category, fromUnit, toUnit, router, pathname]);

	// Effect: Calculate conversion result when all inputs are present
	useEffect(() => {
		if (!category) {
			setResult('');
			return;
		}

		if (
			value === '' ||
			!fromUnit ||
			!toUnit ||
			fromUnit === toUnit ||
			!(fromUnit in unitCategories[category].units) ||
			!(toUnit in unitCategories[category].units)
		) {
			setResult('');
			return;
		}

		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			setResult(t('labels.invalidNumber'));
			return;
		}

		let converted: number;
		const cat = unitCategories[category];

		if (cat.convert) {
			converted = cat.convert(numValue, fromUnit, toUnit);
		} else {
			const fromFactor = cat.units[fromUnit].factor;
			const toFactor = cat.units[toUnit].factor;
			converted = numValue * (fromFactor / toFactor);
		}

		const precision = cat.precision ?? 2;
		const rounded = roundValue(converted, precision).toString();
		setResult(rounded);
	}, [value, fromUnit, toUnit, category, unitCategories, t]);

	// Dropdown items for categories
	const categoryItems = categoryKeys.map((key) => ({
		label: unitCategories[key].name,
		value: key,
	}));

	// Dropdown items for "From" and "To"
	const unitItemsForFrom = category
		? Object.keys(unitCategories[category].units)
				.filter((unit) => unit !== toUnit)
				.map((unit) => ({
					label: unitCategories[category].units[unit].abbrev,
					onClick: () => setFromUnit(unit),
				}))
		: [];

	const unitItemsForTo = category
		? Object.keys(unitCategories[category].units)
				.filter((unit) => unit !== fromUnit)
				.map((unit) => ({
					label: unitCategories[category].units[unit].abbrev,
					onClick: () => setToUnit(unit),
				}))
		: [];

	return (
		<div className="flex flex-col w-full items-center">
			<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
				{/* Title with conversion type */}
				{fromUnit && toUnit && (
					<h2 className="text-2xl font-semibold text-secondary text-center w-full mb-4">
						{getConversionTitleWithUpperCase(fromUnit, toUnit, t)}
					</h2>
				)}
				<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
					{/* Category dropdown */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">{t('labels.category')}</span>
						</label>
						<Dropdown
							label={
								category ? unitCategories[category].name : t('labels.select')
							}
							items={categoryItems}
							buttonClassName="btn btn-outline w-full"
							onSelect={(item) => {
								const newCategory = item.value as UnitCategoryEnum;
								if (newCategory && newCategory !== category) {
									router.push(`/tools/unit-converter/${newCategory}`);
								}
							}}
						/>
					</div>
					{category && (
						<>
							<div className="form-control">
								<label htmlFor="value" className="label">
									<span className="label-text">{t('labels.value')}</span>
								</label>
								<input
									id="value"
									type="text"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									placeholder={t('labels.value')}
									className="input input-bordered w-full"
								/>
							</div>
							<div className="flex gap-2">
								<div className="form-control flex-1">
									<label className="label">
										<span className="label-text">{t('labels.from')}</span>
									</label>
									<Dropdown
										label={
											fromUnit
												? unitCategories[category].units[fromUnit].abbrev
												: t('labels.select')
										}
										items={unitItemsForFrom}
										buttonClassName="btn btn-outline w-full"
									/>
								</div>
								<div className="form-control flex-1">
									<label className="label">
										<span className="label-text">{t('labels.to')}</span>
									</label>
									<Dropdown
										label={
											toUnit
												? unitCategories[category].units[toUnit].abbrev
												: t('labels.select')
										}
										items={unitItemsForTo}
										buttonClassName="btn btn-outline w-full"
									/>
								</div>
							</div>
						</>
					)}
				</form>
				{result && (
					<div className="alert alert-info mt-4">
						<span>
							{t('labels.result')}: {result}
						</span>
					</div>
				)}
			</div>
			<div>
				{category && fromUnit && toUnit && (
					<UnitDefinitions
						category={category}
						fromUnit={fromUnit}
						toUnit={toUnit}
					/>
				)}
			</div>
		</div>
	);
}

/**
 * Generates a conversion title with the given units.
 *
 * @param fromUnit The unit being converted from.
 * @param toUnit The unit being converted to.
 * @param t The translation function.
 * @returns A string representing the conversion title.
 */
function getConversionTitleWithUpperCase(
	fromUnit: string,
	toUnit: string,
	t: ReturnType<typeof useTranslations>
) {
	return `${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} ${t('to')} ${
		toUnit.charAt(0).toUpperCase() + toUnit.slice(1)
	}`;
}
