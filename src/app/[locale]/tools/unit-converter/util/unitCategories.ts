import locales from './locales.json';

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

// Typ für die Schlüssel des Einheitenobjekts – wir gehen davon aus, dass alle Lokalisierungen dieselben Schlüssel haben
export type UnitCategoryKey =
	keyof (typeof locales)['en']['unit-converter']['units'];

export const getUnitCategories = (
	locale: keyof typeof locales
): { [key: string]: UnitCategory } => ({
	length: {
		name: locales[locale]['unit-converter'].length,
		units: {
			meter: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.length.meter.abbr,
			},
			kilometer: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.length.kilometer.abbr,
			},
			centimeter: {
				factor: 0.01,
				abbrev: locales[locale]['unit-converter'].units.length.centimeter.abbr,
			},
			millimeter: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.length.millimeter.abbr,
			},
			mile: {
				factor: 1609.34,
				abbrev: locales[locale]['unit-converter'].units.length.mile.abbr,
			},
			yard: {
				factor: 0.9144,
				abbrev: locales[locale]['unit-converter'].units.length.yard.abbr,
			},
			foot: {
				factor: 0.3048,
				abbrev: locales[locale]['unit-converter'].units.length.foot.abbr,
			},
			inch: {
				factor: 0.0254,
				abbrev: locales[locale]['unit-converter'].units.length.inch.abbr,
			},
		},
		precision: 4,
	},
	weight: {
		name: locales[locale]['unit-converter'].weight,
		units: {
			kilogram: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.weight.kilogram.abbr,
			},
			gram: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.weight.gram.abbr,
			},
			milligram: {
				factor: 0.000001,
				abbrev: locales[locale]['unit-converter'].units.weight.milligram.abbr,
			},
			pound: {
				factor: 0.453592,
				abbrev: locales[locale]['unit-converter'].units.weight.pound.abbr,
			},
			ounce: {
				factor: 0.0283495,
				abbrev: locales[locale]['unit-converter'].units.weight.ounce.abbr,
			},
		},
		precision: 3,
	},
	area: {
		name: locales[locale]['unit-converter'].area,
		units: {
			'square meter': {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.area['square meter'].abbr,
			},
			'square kilometer': {
				factor: 1000000,
				abbrev:
					locales[locale]['unit-converter'].units.area['square kilometer'].abbr,
			},
			'square centimeter': {
				factor: 0.0001,
				abbrev:
					locales[locale]['unit-converter'].units.area['square centimeter']
						.abbr,
			},
			'square foot': {
				factor: 0.092903,
				abbrev:
					locales[locale]['unit-converter'].units.area['square foot'].abbr,
			},
			acre: {
				factor: 4046.86,
				abbrev: locales[locale]['unit-converter'].units.area.acre.abbr,
			},
		},
		precision: 2,
	},
	volume: {
		name: locales[locale]['unit-converter'].volume,
		units: {
			'cubic meter': {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.volume['cubic meter'].abbr,
			},
			liter: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.volume.liter.abbr,
			},
			milliliter: {
				factor: 0.000001,
				abbrev: locales[locale]['unit-converter'].units.volume.milliliter.abbr,
			},
			'cubic centimeter': {
				factor: 0.000001,
				abbrev:
					locales[locale]['unit-converter'].units.volume['cubic centimeter']
						.abbr,
			},
			'gallon (US)': {
				factor: 0.00378541,
				abbrev:
					locales[locale]['unit-converter'].units.volume['gallon (US)'].abbr,
			},
		},
		precision: 4,
	},
	temperature: {
		name: locales[locale]['unit-converter'].temperature,
		units: {
			celsius: {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.temperature.celsius.abbr,
			},
			fahrenheit: {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.temperature.fahrenheit.abbr,
			},
			kelvin: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.temperature.kelvin.abbr,
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
		name: locales[locale]['unit-converter'].speed,
		units: {
			'm/s': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.speed['m/s'].abbr,
			},
			'km/h': {
				factor: 0.277778,
				abbrev: locales[locale]['unit-converter'].units.speed['km/h'].abbr,
			},
			mph: {
				factor: 0.44704,
				abbrev: locales[locale]['unit-converter'].units.speed.mph.abbr,
			},
		},
		precision: 3,
	},
	time: {
		name: locales[locale]['unit-converter'].time,
		units: {
			second: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.time.second.abbr,
			},
			minute: {
				factor: 60,
				abbrev: locales[locale]['unit-converter'].units.time.minute.abbr,
			},
			hour: {
				factor: 3600,
				abbrev: locales[locale]['unit-converter'].units.time.hour.abbr,
			},
			day: {
				factor: 86400,
				abbrev: locales[locale]['unit-converter'].units.time.day.abbr,
			},
		},
		precision: 0,
	},
	pressure: {
		name: locales[locale]['unit-converter'].pressure,
		units: {
			pascal: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.pressure.pascal.abbr,
			},
			kilopascal: {
				factor: 1000,
				abbrev:
					locales[locale]['unit-converter'].units.pressure.kilopascal.abbr,
			},
			bar: {
				factor: 100000,
				abbrev: locales[locale]['unit-converter'].units.pressure.bar.abbr,
			},
			psi: {
				factor: 6894.76,
				abbrev: locales[locale]['unit-converter'].units.pressure.psi.abbr,
			},
		},
		precision: 2,
	},
	energy: {
		name: locales[locale]['unit-converter'].energy,
		units: {
			joule: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.energy.joule.abbr,
			},
			kilojoule: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.energy.kilojoule.abbr,
			},
			calorie: {
				factor: 4.184,
				abbrev: locales[locale]['unit-converter'].units.energy.calorie.abbr,
			},
			kilocalorie: {
				factor: 4184,
				abbrev: locales[locale]['unit-converter'].units.energy.kilocalorie.abbr,
			},
			'kilowatt-hour': {
				factor: 3600000,
				abbrev:
					locales[locale]['unit-converter'].units.energy['kilowatt-hour'].abbr,
			},
		},
		precision: 2,
	},
	power: {
		name: locales[locale]['unit-converter'].power,
		units: {
			watt: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.power.watt.abbr,
			},
			kilowatt: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.power.kilowatt.abbr,
			},
			horsepower: {
				factor: 745.7,
				abbrev: locales[locale]['unit-converter'].units.power.horsepower.abbr,
			},
		},
		precision: 2,
	},
	dataStorage: {
		name: locales[locale]['unit-converter'].dataStorage,
		units: {
			byte: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.dataStorage.byte.abbr,
			},
			kilobyte: {
				factor: 1024,
				abbrev:
					locales[locale]['unit-converter'].units.dataStorage.kilobyte.abbr,
			},
			megabyte: {
				factor: 1048576,
				abbrev:
					locales[locale]['unit-converter'].units.dataStorage.megabyte.abbr,
			},
			gigabyte: {
				factor: 1073741824,
				abbrev:
					locales[locale]['unit-converter'].units.dataStorage.gigabyte.abbr,
			},
		},
		precision: 0,
	},
	angle: {
		name: locales[locale]['unit-converter'].angle,
		units: {
			radian: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.angle.radian.abbr,
			},
			degree: {
				factor: Math.PI / 180,
				abbrev: locales[locale]['unit-converter'].units.angle.degree.abbr,
			},
			grad: {
				factor: Math.PI / 200,
				abbrev: locales[locale]['unit-converter'].units.angle.grad.abbr,
			},
		},
		precision: 4,
	},
	frequency: {
		name: locales[locale]['unit-converter'].frequency,
		units: {
			hertz: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.frequency.hertz.abbr,
			},
			kilohertz: {
				factor: 1000,
				abbrev:
					locales[locale]['unit-converter'].units.frequency.kilohertz.abbr,
			},
			megahertz: {
				factor: 1e6,
				abbrev:
					locales[locale]['unit-converter'].units.frequency.megahertz.abbr,
			},
			gigahertz: {
				factor: 1e9,
				abbrev:
					locales[locale]['unit-converter'].units.frequency.gigahertz.abbr,
			},
		},
		precision: 2,
	},
	force: {
		name: locales[locale]['unit-converter'].force,
		units: {
			newton: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.force.newton.abbr,
			},
			kilonewton: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.force.kilonewton.abbr,
			},
			'pound-force': {
				factor: 4.44822,
				abbrev:
					locales[locale]['unit-converter'].units.force['pound-force'].abbr,
			},
		},
		precision: 2,
	},
	density: {
		name: locales[locale]['unit-converter'].density,
		units: {
			'kg/m³': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.density['kg/m³'].abbr,
			},
			'g/cm³': {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.density['g/cm³'].abbr,
			},
			'lb/ft³': {
				factor: 16.0185,
				abbrev: locales[locale]['unit-converter'].units.density['lb/ft³'].abbr,
			},
		},
		precision: 3,
	},
	volumeFlow: {
		name: locales[locale]['unit-converter'].volumeFlow,
		units: {
			'm³/s': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.volumeFlow['m³/s'].abbr,
			},
			'liter/s': {
				factor: 0.001,
				abbrev:
					locales[locale]['unit-converter'].units.volumeFlow['liter/s'].abbr,
			},
			'gallon/min': {
				factor: 0.00378541 / 60,
				abbrev:
					locales[locale]['unit-converter'].units.volumeFlow['gallon/min'].abbr,
			},
		},
		precision: 4,
	},
	acceleration: {
		name: locales[locale]['unit-converter'].acceleration,
		units: {
			'm/s²': {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.acceleration['m/s²'].abbr,
			},
			'ft/s²': {
				factor: 0.3048,
				abbrev:
					locales[locale]['unit-converter'].units.acceleration['ft/s²'].abbr,
			},
			'km/h/s': {
				factor: 0.277778,
				abbrev:
					locales[locale]['unit-converter'].units.acceleration['km/h/s'].abbr,
			},
		},
		precision: 3,
	},
	areaDensity: {
		name: locales[locale]['unit-converter'].areaDensity,
		units: {
			'kg/m²': {
				factor: 1,
				abbrev:
					locales[locale]['unit-converter'].units.areaDensity['kg/m²'].abbr,
			},
			'g/cm²': {
				factor: 10,
				abbrev:
					locales[locale]['unit-converter'].units.areaDensity['g/cm²'].abbr,
			},
		},
		precision: 2,
	},
	illuminance: {
		name: locales[locale]['unit-converter'].illuminance,
		units: {
			lux: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.illuminance.lux.abbr,
			},
			'foot-candle': {
				factor: 10.764,
				abbrev:
					locales[locale]['unit-converter'].units.illuminance['foot-candle']
						.abbr,
			},
		},
		precision: 2,
	},
	dataRate: {
		name: locales[locale]['unit-converter'].dataRate,
		units: {
			'bit/s': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.dataRate['bit/s'].abbr,
			},
			'kilobit/s': {
				factor: 1000,
				abbrev:
					locales[locale]['unit-converter'].units.dataRate['kilobit/s'].abbr,
			},
			'megabit/s': {
				factor: 1e6,
				abbrev:
					locales[locale]['unit-converter'].units.dataRate['megabit/s'].abbr,
			},
			'gigabit/s': {
				factor: 1e9,
				abbrev:
					locales[locale]['unit-converter'].units.dataRate['gigabit/s'].abbr,
			},
			'byte/s': {
				factor: 8,
				abbrev: locales[locale]['unit-converter'].units.dataRate['byte/s'].abbr,
			},
			'kilobyte/s': {
				factor: 8000,
				abbrev:
					locales[locale]['unit-converter'].units.dataRate['kilobyte/s'].abbr,
			},
			'megabyte/s': {
				factor: 8e6,
				abbrev:
					locales[locale]['unit-converter'].units.dataRate['megabyte/s'].abbr,
			},
		},
		precision: 0,
	},
});
