export interface Unit {
	factor: number;
	abbrev: string;
}

export interface UnitCategory {
	name: string;
	units: { [unit: string]: Unit };
	convert?: (value: number, from: string, to: string) => number;
	precision?: number;
}

// Type for the keys of the units object - we assume all localizations have the same keys
export type UnitCategoryObjectKey = string;

// Type for the translation function
type TranslationFunction = (key: string) => string;

export const getUnitCategoryObject = (
	t: TranslationFunction
): { [key: string]: UnitCategory } => ({
	length: {
		name: t('length'),
		units: {
			meter: {
				factor: 1,
				abbrev: t('units.length.meter.abbr'),
			},
			kilometer: {
				factor: 1000,
				abbrev: t('units.length.kilometer.abbr'),
			},
			centimeter: {
				factor: 0.01,
				abbrev: t('units.length.centimeter.abbr'),
			},
			millimeter: {
				factor: 0.001,
				abbrev: t('units.length.millimeter.abbr'),
			},
			mile: {
				factor: 1609.34,
				abbrev: t('units.length.mile.abbr'),
			},
			yard: {
				factor: 0.9144,
				abbrev: t('units.length.yard.abbr'),
			},
			foot: {
				factor: 0.3048,
				abbrev: t('units.length.foot.abbr'),
			},
			inch: {
				factor: 0.0254,
				abbrev: t('units.length.inch.abbr'),
			},
		},
		precision: 4,
	},
	weight: {
		name: t('weight'),
		units: {
			kilogram: {
				factor: 1,
				abbrev: t('units.weight.kilogram.abbr'),
			},
			gram: {
				factor: 0.001,
				abbrev: t('units.weight.gram.abbr'),
			},
			milligram: {
				factor: 0.000001,
				abbrev: t('units.weight.milligram.abbr'),
			},
			pound: {
				factor: 0.453592,
				abbrev: t('units.weight.pound.abbr'),
			},
			ounce: {
				factor: 0.0283495,
				abbrev: t('units.weight.ounce.abbr'),
			},
		},
		precision: 3,
	},
	area: {
		name: t('area'),
		units: {
			'square meter': {
				factor: 1,
				abbrev: t('units.area.square meter.abbr'),
			},
			'square kilometer': {
				factor: 1000000,
				abbrev: t('units.area.square kilometer.abbr'),
			},
			'square centimeter': {
				factor: 0.0001,
				abbrev: t('units.area.square centimeter.abbr'),
			},
			'square foot': {
				factor: 0.092903,
				abbrev: t('units.area.square foot.abbr'),
			},
			acre: {
				factor: 4046.86,
				abbrev: t('units.area.acre.abbr'),
			},
		},
		precision: 2,
	},
	volume: {
		name: t('volume'),
		units: {
			'cubic meter': {
				factor: 1,
				abbrev: t('units.volume.cubic meter.abbr'),
			},
			liter: {
				factor: 0.001,
				abbrev: t('units.volume.liter.abbr'),
			},
			milliliter: {
				factor: 0.000001,
				abbrev: t('units.volume.milliliter.abbr'),
			},
			'cubic centimeter': {
				factor: 0.000001,
				abbrev: t('units.volume.cubic centimeter.abbr'),
			},
			'gallon (US)': {
				factor: 0.00378541,
				abbrev: t('units.volume.gallon (US).abbr'),
			},
		},
		precision: 4,
	},
	temperature: {
		name: t('temperature'),
		units: {
			celsius: {
				factor: 1,
				abbrev: t('units.temperature.celsius.abbr'),
			},
			fahrenheit: {
				factor: 1,
				abbrev: t('units.temperature.fahrenheit.abbr'),
			},
			kelvin: {
				factor: 1,
				abbrev: t('units.temperature.kelvin.abbr'),
			},
		},
		convert: (value: number, from: string, to: string) => {
			if (from === to) return value;
			let celsius: number;
			switch (from) {
				case 'fahrenheit':
					celsius = (value - 32) * (5 / 9);
					break;
				case 'kelvin':
					celsius = value - 273.15;
					break;
				default:
					celsius = value;
			}
			switch (to) {
				case 'fahrenheit':
					return celsius * (9 / 5) + 32;
				case 'kelvin':
					return celsius + 273.15;
				default:
					return celsius;
			}
		},
		precision: 2,
	},
	speed: {
		name: t('speed'),
		units: {
			'm/s': {
				factor: 1,
				abbrev: t('units.speed.m/s.abbr'),
			},
			'km/h': {
				factor: 0.277778,
				abbrev: t('units.speed.km/h.abbr'),
			},
			mph: {
				factor: 0.44704,
				abbrev: t('units.speed.mph.abbr'),
			},
		},
		precision: 3,
	},
	time: {
		name: t('time'),
		units: {
			second: {
				factor: 1,
				abbrev: t('units.time.second.abbr'),
			},
			minute: {
				factor: 60,
				abbrev: t('units.time.minute.abbr'),
			},
			hour: {
				factor: 3600,
				abbrev: t('units.time.hour.abbr'),
			},
			day: {
				factor: 86400,
				abbrev: t('units.time.day.abbr'),
			},
		},
		precision: 0,
	},
	pressure: {
		name: t('pressure'),
		units: {
			pascal: {
				factor: 1,
				abbrev: t('units.pressure.pascal.abbr'),
			},
			kilopascal: {
				factor: 1000,
				abbrev: t('units.pressure.kilopascal.abbr'),
			},
			bar: {
				factor: 100000,
				abbrev: t('units.pressure.bar.abbr'),
			},
			psi: {
				factor: 6894.76,
				abbrev: t('units.pressure.psi.abbr'),
			},
		},
		precision: 2,
	},
	energy: {
		name: t('energy'),
		units: {
			joule: {
				factor: 1,
				abbrev: t('units.energy.joule.abbr'),
			},
			kilojoule: {
				factor: 1000,
				abbrev: t('units.energy.kilojoule.abbr'),
			},
			calorie: {
				factor: 4.184,
				abbrev: t('units.energy.calorie.abbr'),
			},
			kilocalorie: {
				factor: 4184,
				abbrev: t('units.energy.kilocalorie.abbr'),
			},
			'kilowatt-hour': {
				factor: 3600000,
				abbrev: t('units.energy.kilowatt-hour.abbr'),
			},
		},
		precision: 2,
	},
	power: {
		name: t('power'),
		units: {
			watt: {
				factor: 1,
				abbrev: t('units.power.watt.abbr'),
			},
			kilowatt: {
				factor: 1000,
				abbrev: t('units.power.kilowatt.abbr'),
			},
			horsepower: {
				factor: 745.7,
				abbrev: t('units.power.horsepower.abbr'),
			},
		},
		precision: 2,
	},
	dataStorage: {
		name: t('dataStorage'),
		units: {
			byte: {
				factor: 1,
				abbrev: t('units.dataStorage.byte.abbr'),
			},
			kilobyte: {
				factor: 1024,
				abbrev: t('units.dataStorage.kilobyte.abbr'),
			},
			megabyte: {
				factor: 1048576,
				abbrev: t('units.dataStorage.megabyte.abbr'),
			},
			gigabyte: {
				factor: 1073741824,
				abbrev: t('units.dataStorage.gigabyte.abbr'),
			},
		},
		precision: 0,
	},
	angle: {
		name: t('angle'),
		units: {
			radian: {
				factor: 1,
				abbrev: t('units.angle.radian.abbr'),
			},
			degree: {
				factor: Math.PI / 180,
				abbrev: t('units.angle.degree.abbr'),
			},
			grad: {
				factor: Math.PI / 200,
				abbrev: t('units.angle.grad.abbr'),
			},
		},
		precision: 4,
	},
	frequency: {
		name: t('frequency'),
		units: {
			hertz: {
				factor: 1,
				abbrev: t('units.frequency.hertz.abbr'),
			},
			kilohertz: {
				factor: 1000,
				abbrev: t('units.frequency.kilohertz.abbr'),
			},
			megahertz: {
				factor: 1e6,
				abbrev: t('units.frequency.megahertz.abbr'),
			},
			gigahertz: {
				factor: 1e9,
				abbrev: t('units.frequency.gigahertz.abbr'),
			},
		},
		precision: 2,
	},
	force: {
		name: t('force'),
		units: {
			newton: {
				factor: 1,
				abbrev: t('units.force.newton.abbr'),
			},
			kilonewton: {
				factor: 1000,
				abbrev: t('units.force.kilonewton.abbr'),
			},
			'pound-force': {
				factor: 4.44822,
				abbrev: t('units.force.pound-force.abbr'),
			},
		},
		precision: 2,
	},
	density: {
		name: t('density'),
		units: {
			'kg/m³': {
				factor: 1,
				abbrev: t('units.density.kg/m³.abbr'),
			},
			'g/cm³': {
				factor: 1000,
				abbrev: t('units.density.g/cm³.abbr'),
			},
			'lb/ft³': {
				factor: 16.0185,
				abbrev: t('units.density.lb/ft³.abbr'),
			},
		},
		precision: 3,
	},
	volumeFlow: {
		name: t('volumeFlow'),
		units: {
			'm³/s': {
				factor: 1,
				abbrev: t('units.volumeFlow.m³/s.abbr'),
			},
			'liter/s': {
				factor: 0.001,
				abbrev: t('units.volumeFlow.liter/s.abbr'),
			},
			'gallon/min': {
				factor: 0.00378541 / 60,
				abbrev: t('units.volumeFlow.gallon/min.abbr'),
			},
		},
		precision: 4,
	},
	acceleration: {
		name: t('acceleration'),
		units: {
			'm/s²': {
				factor: 1,
				abbrev: t('units.acceleration.m/s².abbr'),
			},
			'ft/s²': {
				factor: 0.3048,
				abbrev: t('units.acceleration.ft/s².abbr'),
			},
			'km/h/s': {
				factor: 0.277778,
				abbrev: t('units.acceleration.km/h/s.abbr'),
			},
		},
		precision: 3,
	},
	areaDensity: {
		name: t('areaDensity'),
		units: {
			'kg/m²': {
				factor: 1,
				abbrev: t('units.areaDensity.kg/m².abbr'),
			},
			'g/cm²': {
				factor: 10,
				abbrev: t('units.areaDensity.g/cm².abbr'),
			},
		},
		precision: 2,
	},
	illuminance: {
		name: t('illuminance'),
		units: {
			lux: {
				factor: 1,
				abbrev: t('units.illuminance.lux.abbr'),
			},
			'foot-candle': {
				factor: 10.764,
				abbrev: t('units.illuminance.foot-candle.abbr'),
			},
		},
		precision: 2,
	},
	dataRate: {
		name: t('dataRate'),
		units: {
			'bit/s': {
				factor: 1,
				abbrev: t('units.dataRate.bit/s.abbr'),
			},
			'kilobit/s': {
				factor: 1000,
				abbrev: t('units.dataRate.kilobit/s.abbr'),
			},
			'megabit/s': {
				factor: 1e6,
				abbrev: t('units.dataRate.megabit/s.abbr'),
			},
			'gigabit/s': {
				factor: 1e9,
				abbrev: t('units.dataRate.gigabit/s.abbr'),
			},
			'byte/s': {
				factor: 8,
				abbrev: t('units.dataRate.byte/s.abbr'),
			},
			'kilobyte/s': {
				factor: 8000,
				abbrev: t('units.dataRate.kilobyte/s.abbr'),
			},
			'megabyte/s': {
				factor: 8e6,
				abbrev: t('units.dataRate.megabyte/s.abbr'),
			},
		},
		precision: 0,
	},
});
