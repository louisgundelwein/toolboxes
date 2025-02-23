// components/Converter.tsx
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getUnitCategories } from '../util/unitCategories';
import { roundValue } from '../util/rounding';
import locales from '../util/locales.json';
import UnitDefinitions, { UnitCategoryKey } from './UnitDefinitions';
import Dropdown from '@/app/components/dropdown';

export interface ConverterProps {
	onConversionChange?: (conversionTitle: string) => void;
	locale: keyof typeof locales;
	initialCategory?: UnitCategoryKey | '';
	initialFromUnit?: string;
	initialToUnit?: string;
}

const Converter: React.FC<ConverterProps> = ({
	onConversionChange,
	locale,
	initialCategory = '',
	initialFromUnit = '',
	initialToUnit = '',
}) => {
	const router = useRouter();
	const unitCategories = useMemo(() => getUnitCategories(locale), [locale]);
	const labels = useMemo(
		() => locales[locale]['unit-converter'].labels,
		[locale]
	);
	const defaultDescription =
		locales[locale]['unit-converter'].description || 'Unit Converter';
	const categoryKeys = useMemo(
		() => Object.keys(unitCategories),
		[unitCategories]
	);

	// State – initial Werte
	const [category, setCategory] = useState<UnitCategoryKey | ''>(
		initialCategory
	);
	const [fromUnit, setFromUnit] = useState<string>(initialFromUnit);
	const [toUnit, setToUnit] = useState<string>(initialToUnit);
	const [value, setValue] = useState<string>('');
	const [result, setResult] = useState<string>('');

	// Falls noch keine from/to-Einheit gesetzt ist, Fallback-Titel übergeben
	useEffect(() => {
		if (onConversionChange && (!fromUnit || !toUnit)) {
			onConversionChange(defaultDescription);
		}
	}, [fromUnit, toUnit, defaultDescription, onConversionChange]);

	// Effekt: Beim Kategorienwechsel (abhängig von [category, unitCategories])
	useEffect(() => {
		if (category) {
			const units = Object.keys(unitCategories[category].units);
			// Setze Standardwerte, falls noch nicht gesetzt
			if (!fromUnit || !toUnit) {
				if (units.length >= 2) {
					setFromUnit(units[0]);
					setToUnit(units[1]);
				} else if (units.length === 1) {
					setFromUnit(units[0]);
					setToUnit('');
				}
			}
			setValue('');
			setResult('');
		} else {
			setFromUnit('');
			setToUnit('');
			setResult('');
		}
	}, [category, unitCategories]);

	// Effekt: Aktualisiere URL und Conversion-Titel, wenn Kategorie, fromUnit und toUnit gesetzt sind
	useEffect(() => {
		if (category && fromUnit && toUnit) {
			const filler = locales[locale]['unit-converter'].to || 'in';
			const slug = `${fromUnit}-${filler}-${toUnit}`;
			router.replace(`/${locale}/unit-converter/${category}/${slug}`);
			if (onConversionChange) {
				const toWord = locales[locale]['unit-converter'].to;
				const title = `${
					fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)
				} ${toWord} ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`;
				onConversionChange(title);
			}
		}
	}, [category, fromUnit, toUnit, locale, router, onConversionChange]);

	// Effekt: Berechne das Conversion-Ergebnis, sobald alle Eingaben vorhanden sind
	useEffect(() => {
		if (!category) {
			setResult('');
			return;
		}
		const cat = unitCategories[category];
		if (
			value === '' ||
			!fromUnit ||
			!toUnit ||
			fromUnit === toUnit ||
			!(fromUnit in cat.units) ||
			!(toUnit in cat.units)
		) {
			setResult('');
			return;
		}
		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			setResult(labels.invalidNumber);
			return;
		}
		let converted: number;
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
	}, [value, fromUnit, toUnit, category, unitCategories, labels]);

	// Dropdown-Items für Kategorien (mit extra Property "value")
	const categoryItems = categoryKeys.map((key) => ({
		label: unitCategories[key].name,
		value: key,
	}));

	// Dropdown-Items für "From" und "To"
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

	// Erzeuge einen Conversion-Titel, der "FromUnit to ToUnit" anzeigt, wenn beide gesetzt sind
	const conversionTitle =
		fromUnit && toUnit
			? `${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} ${
					locales[locale]['unit-converter'].to
			  } ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`
			: '';

	return (
		<div className='flex flex-col w-full items-center '>
		<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
			{/* Ganz oben: H2 mit Conversion-Titel, falls vorhanden */}
			{conversionTitle && (
				<h2 className="text-2xl font-semibold text-secondary text-center w-full mb-4">
					{conversionTitle}
				</h2>
			)}
			<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
				{/* Kategorie-Dropdown */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">{labels.category}</span>
					</label>
					<Dropdown
						label={category ? unitCategories[category].name : labels.select}
						items={categoryItems}
						buttonClassName="btn btn-outline w-full"
						onSelect={(item) => {
							const newCategory = item.value as UnitCategoryKey;
							if (newCategory && newCategory !== category) {
								// Neue Kategorie setzen und vorhandene Units zurücksetzen,
								// damit der Kategorienwechsel-Effekt die Standardwerte setzt.
								setCategory(newCategory);
								setFromUnit('');
								setToUnit('');
							}
						}}
					/>
				</div>
				{category && (
					<>
						<div className="form-control">
							<label htmlFor="value" className="label">
								<span className="label-text">{labels.value}</span>
							</label>
							<input
								id="value"
								type="text"
								value={value}
								onChange={(e) => setValue(e.target.value)}
								placeholder={labels.value}
								className="input input-bordered w-full"
							/>
						</div>
						<div className="flex gap-2">
							<div className="form-control flex-1">
								<label className="label">
									<span className="label-text">{labels.from}</span>
								</label>
								<Dropdown
									label={
										fromUnit
											? unitCategories[category].units[fromUnit].abbrev
											: labels.select
									}
									items={unitItemsForFrom}
									buttonClassName="btn btn-outline w-full"
								/>
							</div>
							<div className="form-control flex-1">
								<label className="label">
									<span className="label-text">{labels.to}</span>
								</label>
								<Dropdown
									label={
										toUnit
											? unitCategories[category].units[toUnit].abbrev
											: labels.select
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
						{labels.result}: {result}
					</span>
				</div>
			)}
		</div>
		<div>
				{category && fromUnit && toUnit && (
				<UnitDefinitions
					locale={locale}
					category={category}
					fromUnit={fromUnit}
					toUnit={toUnit}
				/>
			)}
			</div>
			</div>
	);
};

export default Converter;
