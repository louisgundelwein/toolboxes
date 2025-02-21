// components/Converter.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { getUnitCategories } from '../util/unitCategories';
import { roundValue } from '../util/rounding';
import Dropdown from '@/app/components/dropdown';
import locales from '../util/locales.json';

export interface ConverterProps {
	onConversionChange?: (conversionTitle: string) => void;
}

const Converter: React.FC<ConverterProps> = ({ onConversionChange }) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const searchParamsString = useMemo(
		() => searchParams.toString(),
		[searchParams]
	);
	const { locale = 'en' } = useParams() as { locale: keyof typeof locales };

	const unitCategories = useMemo(() => getUnitCategories(locale), [locale]);
	const labels = useMemo(
		() => locales[locale]['unit-converter'].labels,
		[locale]
	);
	const categoryKeys = useMemo(
		() => Object.keys(unitCategories),
		[unitCategories]
	);

	// Alle Felder starten leer (auch Kategorie)
	const [category, setCategory] = useState<string>('');
	const [fromUnit, setFromUnit] = useState<string>('');
	const [toUnit, setToUnit] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [result, setResult] = useState<string>('');

	// Beim ersten Laden: Falls URL-Parameter vorhanden sind, diese übernehmen.
	useEffect(() => {
		const urlCategory = searchParams.get('category');
		const urlFrom = searchParams.get('from');
		const urlTo = searchParams.get('to');
		if (urlCategory && categoryKeys.includes(urlCategory)) {
			setCategory(urlCategory);
			const cat = unitCategories[urlCategory];
			if (
				urlFrom &&
				urlTo &&
				urlFrom in cat.units &&
				urlTo in cat.units &&
				urlFrom !== urlTo
			) {
				setFromUnit(urlFrom);
				setToUnit(urlTo);
			} else {
				const units = Object.keys(cat.units);
				if (units.length >= 2) {
					setFromUnit(units[0]);
					setToUnit(units[1]);
				} else if (units.length === 1) {
					setFromUnit(units[0]);
					setToUnit('');
				}
			}
		}
	}, [searchParamsString, categoryKeys, unitCategories, onConversionChange]);

	useEffect(() => {
		if (fromUnit && toUnit) {
			if (onConversionChange) onConversionChange(`${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)} ${locales[locale]['unit-converter'].to} ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`);
		} else {
			if (onConversionChange) onConversionChange('');
		}
	}, [fromUnit, toUnit, onConversionChange]);

	// Beim Kategorienwechsel: Wenn eine Kategorie ausgewählt wurde,
	// werden automatisch (sofern vorhanden) die ersten beiden Einheiten gesetzt.
	// Außerdem wird die URL aktualisiert.
	useEffect(() => {
		if (category) {
			const units = Object.keys(unitCategories[category].units);
			if (units.length >= 2) {
				setFromUnit(units[0]);
				setToUnit(units[1]);
			} else if (units.length === 1) {
				setFromUnit(units[0]);
				setToUnit('');
			}
			setValue('');
			setResult('');
			router.replace(`?category=${encodeURIComponent(category)}`);
		} else {
			router.replace(``);
			setFromUnit('');
			setToUnit('');
			setResult('');
		}
	}, [category, unitCategories, router, onConversionChange]);

	// Automatische Umrechnung: Nur wenn alle Felder gültig sind.
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
		// URL-Parameter aktualisieren
		router.replace(
			`?category=${encodeURIComponent(category)}&from=${encodeURIComponent(
				fromUnit
			)}&to=${encodeURIComponent(toUnit)}`
		);	}, [
		value,
		fromUnit,
		toUnit,
		category,
		unitCategories,
		labels,
		router,
		onConversionChange,
	]);

	// Dropdown-Items für Kategorien
	const categoryItems = categoryKeys.map((key) => ({
		label: unitCategories[key].name,
		onClick: () => setCategory(key),
	}));

	// Für "From": Zeige alle Einheiten der aktuellen Kategorie außer der in "To" gewählten.
	const unitItemsForFrom = category
		? Object.keys(unitCategories[category].units)
				.filter((unit) => unit !== toUnit)
				.map((unit) => ({
					label: unitCategories[category].units[unit].abbrev,
					onClick: () => setFromUnit(unit),
				}))
		: [];

	// Für "To": Zeige alle Einheiten der aktuellen Kategorie außer der in "From" gewählten.
	const unitItemsForTo = category
		? Object.keys(unitCategories[category].units)
				.filter((unit) => unit !== fromUnit)
				.map((unit) => ({
					label: unitCategories[category].units[unit].abbrev,
					onClick: () => setToUnit(unit),
				}))
		: [];

	return (
		<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
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
						// Beim Öffnen des Kategorie-Dropdowns soll die Kategorie zurückgesetzt werden.
						onOpen={() => {
							setCategory('');
						}}
					/>
				</div>
				{/* Nur anzeigen, wenn eine Kategorie gewählt ist */}
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
	);
};

export default Converter;
