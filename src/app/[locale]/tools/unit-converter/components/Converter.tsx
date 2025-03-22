// components/Converter.tsx
'use client';

import React, { useState, useEffect } from 'react';
//import { roundValue } from '../util/rounding';
import UnitDefinitions from './UnitDefinitions';
import Dropdown from '@/app/components/dropdown';
import { useTranslations } from 'next-intl';
import type { UnitCategoryEnum } from '@/shared';
import {
	getSimpleUnitCategory,
	getUnitCategoryObject,
	getSimpleUnitsFromCategoryKey,
	UnitCategoryKey,
} from '../util/unitCategories';
import { useRouter, usePathname } from 'next/navigation';
import { createConversionPath } from '../util/urlFormat';
import { roundValue } from '../util/rounding';

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
	const [categoryKey, setCategoryKey] = useState<UnitCategoryKey | undefined>(
		initialCategory
	);
	const [fromUnit, setFromUnit] = useState<string | undefined>(initialFromUnit);
	const [toUnit, setToUnit] = useState<string | undefined>(initialToUnit);
	const [result, setResult] = useState('');
	const [value, setValue] = useState('');

	// Update state when props change
	useEffect(() => {
		if (initialCategory) setCategoryKey(initialCategory);
		if (initialFromUnit) setFromUnit(initialFromUnit);
		if (initialToUnit) setToUnit(initialToUnit);
	}, [initialCategory, initialFromUnit, initialToUnit]);

	// Get unit categories for the current locale
	const unitCategory =
		categoryKey !== undefined
			? getUnitCategoryObject(categoryKey, t)
			: undefined;

	// Effect: Update URL when both units are selected
	useEffect(() => {
		if (categoryKey && fromUnit && toUnit) {
			const newPath = `/tools/unit-converter/${createConversionPath(
				categoryKey,
				fromUnit,
				toUnit
			)}`;
			if (pathname !== newPath) {
				router.push(newPath, { scroll: false });
			}
		}
	}, [categoryKey, fromUnit, toUnit, router, pathname]);

	// Effect: Calculate conversion result when all inputs are present
	useEffect(() => {
		if (!unitCategory) {
			setResult('');
			return;
		}

		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			setResult(t('labels.invalidNumber'));
			return;
		}

		let converted: number;

		if (fromUnit === toUnit || fromUnit === undefined || toUnit === undefined) {
			return;
		}

		if (unitCategory?.convert) {
			converted = unitCategory.convert(numValue, fromUnit, toUnit);
		} else {
			const fromFactor = unitCategory.units[fromUnit].factor;
			const toFactor = unitCategory.units[toUnit].factor;
			converted = numValue * (fromFactor / toFactor);
		}

		const precision = unitCategory.precision ?? 2;
		const rounded = roundValue(converted, precision).toString();
		setResult(rounded);
	}, [value, fromUnit, toUnit, t, unitCategory]);

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
							label={unitCategory ? unitCategory.name : t('labels.select')}
							items={getSimpleUnitCategory(t).map((category) => ({
								label: category.name,
								value: category.key,
							}))}
							buttonClassName="btn btn-outline w-full"
							onSelect={(item) => {
								const newCategory = item.value as UnitCategoryEnum;
								if (newCategory && newCategory !== categoryKey) {
									router.push(`/tools/unit-converter/${newCategory}`);
								}
							}}
						/>
					</div>
					{unitCategory && (
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
												? unitCategory.units[fromUnit].abbrev
												: t('labels.select')
										}
										items={
											categoryKey
												? getSimpleUnitsFromCategoryKey(categoryKey, t)
												: []
										}
										buttonClassName="btn btn-outline w-full"
										onSelect={(item) => {
											setFromUnit(item.value);
										}}
									/>
								</div>
								<div className="form-control flex-1">
									<label className="label">
										<span className="label-text">{t('labels.to')}</span>
									</label>
									<Dropdown
										label={
											toUnit
												? unitCategory.units[toUnit].abbrev
												: t('labels.select')
										}
										items={
											categoryKey
												? getSimpleUnitsFromCategoryKey(categoryKey, t)
												: []
										}
										buttonClassName="btn btn-outline w-full"
										onSelect={(item) => {
											setToUnit(item.value);
										}}
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
				{categoryKey && fromUnit && toUnit && (
					<UnitDefinitions
						category={categoryKey}
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
