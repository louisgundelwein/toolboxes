// components/Converter.tsx
'use client';
import { useState, useEffect } from 'react';
import { unitCategories } from '../util/unitCategories';
import { roundValue } from '../util/rounding';
import Dropdown from '@/app/components/dropdown';

const Converter: React.FC = () => {
	const categoryKeys = Object.keys(unitCategories);
	const [category, setCategory] = useState(categoryKeys[0]);
	const [fromUnit, setFromUnit] = useState<string>('');
	const [toUnit, setToUnit] = useState<string>('');
	const [value, setValue] = useState<string>('');
	const [result, setResult] = useState<string>('');

	useEffect(() => {
		const units = Object.keys(unitCategories[category].units);
		setFromUnit(units[0]);
		setToUnit(units[0]);
		setValue('');
		setResult('');
	}, [category]);

	const handleConversion = (e: React.FormEvent) => {
		e.preventDefault();
		const numValue = parseFloat(value);
		if (isNaN(numValue)) {
			setResult('Bitte eine gültige Zahl eingeben.');
			return;
		}
		const cat = unitCategories[category];
		let converted: number;

		if (cat.convert) {
			converted = cat.convert(numValue, fromUnit, toUnit);
		} else {
			const fromFactor = cat.units[fromUnit];
			const toFactor = cat.units[toUnit];
			converted = numValue * (fromFactor / toFactor);
		}
		const precision = cat.precision ?? 2;
		setResult(roundValue(converted, precision).toString());
	};

	// Erstelle Dropdown-Items für die Kategorieauswahl
	const categoryItems = categoryKeys.map((key) => ({
		label: unitCategories[key].name,
		onClick: () => setCategory(key),
	}));

	// Erstelle Dropdown-Items für die Einheitenauswahl
	const unitItemsForFrom = Object.keys(unitCategories[category].units).map(
		(unit) => ({
			label: unit,
			onClick: () => setFromUnit(unit),
		})
	);

	const unitItemsForTo = Object.keys(unitCategories[category].units).map(
		(unit) => ({
			label: unit,
			onClick: () => setToUnit(unit),
		})
	);

	return (
		<div className="card w-full max-w-lg bg-base-100 shadow-xl p-6">
			<form onSubmit={handleConversion} className="space-y-4">
				{/* Kategorie-Dropdown */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">Kategorie</span>
					</label>
					<Dropdown
						label={unitCategories[category].name}
						items={categoryItems}
						buttonClassName="btn btn-outline w-full"
					/>
				</div>

				{/* Wert Eingabe */}
				<div className="form-control">
					<label htmlFor="value" className="label">
						<span className="label-text">Wert</span>
					</label>
					<input
						id="value"
						type="text"
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder="Zahl eingeben"
						className="input input-bordered w-full"
					/>
				</div>

				<div className="flex gap-2">
					{/* Von-Dropdown */}
					<div className="form-control flex-1">
						<label className="label">
							<span className="label-text">Von</span>
						</label>
						<Dropdown
							label={fromUnit || 'Auswählen'}
							items={unitItemsForFrom}
							buttonClassName="btn btn-outline w-full"
						/>
					</div>

					{/* Zu-Dropdown */}
					<div className="form-control flex-1">
						<label className="label">
							<span className="label-text">Zu</span>
						</label>
						<Dropdown
							label={toUnit || 'Auswählen'}
							items={unitItemsForTo}
							buttonClassName="btn btn-outline w-full"
						/>
					</div>
				</div>

				<button type="submit" className="btn btn-primary w-full">
					Umrechnen
				</button>
			</form>

			{result && (
				<div className="alert alert-info mt-4">
					<span>Ergebnis: {result}</span>
				</div>
			)}
		</div>
	);
};

export default Converter;
