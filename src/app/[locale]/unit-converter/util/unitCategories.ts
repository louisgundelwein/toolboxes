// util/unitCategories.ts
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

export const getUnitCategories = (
	locale: keyof typeof locales
): { [key: string]: UnitCategory } => ({
	length: {
		name: locales[locale]['unit-converter'].length,
		units: {
			meter: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.length.meter,
			},
			kilometer: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.length.kilometer,
			},
			centimeter: {
				factor: 0.01,
				abbrev: locales[locale]['unit-converter'].units.length.centimeter,
			},
			millimeter: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.length.millimeter,
			},
			mile: {
				factor: 1609.34,
				abbrev: locales[locale]['unit-converter'].units.length.mile,
			},
			yard: {
				factor: 0.9144,
				abbrev: locales[locale]['unit-converter'].units.length.yard,
			},
			foot: {
				factor: 0.3048,
				abbrev: locales[locale]['unit-converter'].units.length.foot,
			},
			inch: {
				factor: 0.0254,
				abbrev: locales[locale]['unit-converter'].units.length.inch,
			},
		},
		precision: 4,
	},
	weight: {
		name: locales[locale]['unit-converter'].weight,
		units: {
			kilogram: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.weight.kilogram,
			},
			gram: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.weight.gram,
			},
			milligram: {
				factor: 0.000001,
				abbrev: locales[locale]['unit-converter'].units.weight.milligram,
			},
			pound: {
				factor: 0.453592,
				abbrev: locales[locale]['unit-converter'].units.weight.pound,
			},
			ounce: {
				factor: 0.0283495,
				abbrev: locales[locale]['unit-converter'].units.weight.ounce,
			},
		},
		precision: 3,
	},
	area: {
		name: locales[locale]['unit-converter'].area,
		units: {
			'square meter': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.area['square meter'],
			},
			'square kilometer': {
				factor: 1000000,
				abbrev:
					locales[locale]['unit-converter'].units.area['square kilometer'],
			},
			'square centimeter': {
				factor: 0.0001,
				abbrev:
					locales[locale]['unit-converter'].units.area['square centimeter'],
			},
			'square foot': {
				factor: 0.092903,
				abbrev: locales[locale]['unit-converter'].units.area['square foot'],
			},
			acre: {
				factor: 4046.86,
				abbrev: locales[locale]['unit-converter'].units.area.acre,
			},
		},
		precision: 2,
	},
	volume: {
		name: locales[locale]['unit-converter'].volume,
		units: {
			'cubic meter': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.volume['cubic meter'],
			},
			liter: {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.volume.liter,
			},
			milliliter: {
				factor: 0.000001,
				abbrev: locales[locale]['unit-converter'].units.volume.milliliter,
			},
			'cubic centimeter': {
				factor: 0.000001,
				abbrev:
					locales[locale]['unit-converter'].units.volume['cubic centimeter'],
			},
			'gallon (US)': {
				factor: 0.00378541,
				abbrev: locales[locale]['unit-converter'].units.volume['gallon (US)'],
			},
		},
		precision: 4,
	},
	temperature: {
		name: locales[locale]['unit-converter'].temperature,
		units: {
			celsius: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.temperature.celsius,
			},
			fahrenheit: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.temperature.fahrenheit,
			},
			kelvin: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.temperature.kelvin,
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
				abbrev: locales[locale]['unit-converter'].units.speed['m/s'],
			},
			'km/h': {
				factor: 0.277778,
				abbrev: locales[locale]['unit-converter'].units.speed['km/h'],
			},
			mph: {
				factor: 0.44704,
				abbrev: locales[locale]['unit-converter'].units.speed.mph,
			},
		},
		precision: 3,
	},
	time: {
		name: locales[locale]['unit-converter'].time,
		units: {
			second: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.time.second,
			},
			minute: {
				factor: 60,
				abbrev: locales[locale]['unit-converter'].units.time.minute,
			},
			hour: {
				factor: 3600,
				abbrev: locales[locale]['unit-converter'].units.time.hour,
			},
			day: {
				factor: 86400,
				abbrev: locales[locale]['unit-converter'].units.time.day,
			},
		},
		precision: 0,
	},
	pressure: {
		name: locales[locale]['unit-converter'].pressure,
		units: {
			pascal: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.pressure.pascal,
			},
			kilopascal: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.pressure.kilopascal,
			},
			bar: {
				factor: 100000,
				abbrev: locales[locale]['unit-converter'].units.pressure.bar,
			},
			psi: {
				factor: 6894.76,
				abbrev: locales[locale]['unit-converter'].units.pressure.psi,
			},
		},
		precision: 2,
	},
	energy: {
		name: locales[locale]['unit-converter'].energy,
		units: {
			joule: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.energy.joule,
			},
			kilojoule: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.energy.kilojoule,
			},
			calorie: {
				factor: 4.184,
				abbrev: locales[locale]['unit-converter'].units.energy.calorie,
			},
			kilocalorie: {
				factor: 4184,
				abbrev: locales[locale]['unit-converter'].units.energy.kilocalorie,
			},
			'kilowatt-hour': {
				factor: 3600000,
				abbrev: locales[locale]['unit-converter'].units.energy['kilowatt-hour'],
			},
		},
		precision: 2,
	},
	power: {
		name: locales[locale]['unit-converter'].power,
		units: {
			watt: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.power.watt,
			},
			kilowatt: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.power.kilowatt,
			},
			horsepower: {
				factor: 745.7,
				abbrev: locales[locale]['unit-converter'].units.power.horsepower,
			},
		},
		precision: 2,
	},
	dataStorage: {
		name: locales[locale]['unit-converter'].dataStorage,
		units: {
			byte: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.dataStorage.byte,
			},
			kilobyte: {
				factor: 1024,
				abbrev: locales[locale]['unit-converter'].units.dataStorage.kilobyte,
			},
			megabyte: {
				factor: 1048576,
				abbrev: locales[locale]['unit-converter'].units.dataStorage.megabyte,
			},
			gigabyte: {
				factor: 1073741824,
				abbrev: locales[locale]['unit-converter'].units.dataStorage.gigabyte,
			},
		},
		precision: 0,
	},
	angle: {
		name: locales[locale]['unit-converter'].angle,
		units: {
			radian: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.angle.radian,
			},
			degree: {
				factor: Math.PI / 180,
				abbrev: locales[locale]['unit-converter'].units.angle.degree,
			},
			grad: {
				factor: Math.PI / 200,
				abbrev: locales[locale]['unit-converter'].units.angle.grad,
			},
		},
		precision: 4,
	},
	frequency: {
		name: locales[locale]['unit-converter'].frequency,
		units: {
			hertz: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.frequency.hertz,
			},
			kilohertz: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.frequency.kilohertz,
			},
			megahertz: {
				factor: 1e6,
				abbrev: locales[locale]['unit-converter'].units.frequency.megahertz,
			},
			gigahertz: {
				factor: 1e9,
				abbrev: locales[locale]['unit-converter'].units.frequency.gigahertz,
			},
		},
		precision: 2,
	},
	force: {
		name: locales[locale]['unit-converter'].force,
		units: {
			newton: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.force.newton,
			},
			kilonewton: {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.force.kilonewton,
			},
			'pound-force': {
				factor: 4.44822,
				abbrev: locales[locale]['unit-converter'].units.force['pound-force'],
			},
		},
		precision: 2,
	},
	density: {
		name: locales[locale]['unit-converter'].density,
		units: {
			'kg/m³': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.density['kg/m³'],
			},
			'g/cm³': {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.density['g/cm³'],
			},
			'lb/ft³': {
				factor: 16.0185,
				abbrev: locales[locale]['unit-converter'].units.density['lb/ft³'],
			},
		},
		precision: 3,
	},
	volumeFlow: {
		name: locales[locale]['unit-converter'].volumeFlow,
		units: {
			'm³/s': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.volumeFlow['m³/s'],
			},
			'liter/s': {
				factor: 0.001,
				abbrev: locales[locale]['unit-converter'].units.volumeFlow['liter/s'],
			},
			'gallon/min': {
				factor: 0.00378541 / 60,
				abbrev:
					locales[locale]['unit-converter'].units.volumeFlow['gallon/min'],
			},
		},
		precision: 4,
	},
	acceleration: {
		name: locales[locale]['unit-converter'].acceleration,
		units: {
			'm/s²': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.acceleration['m/s²'],
			},
			'ft/s²': {
				factor: 0.3048,
				abbrev: locales[locale]['unit-converter'].units.acceleration['ft/s²'],
			},
			'km/h/s': {
				factor: 0.277778,
				abbrev: locales[locale]['unit-converter'].units.acceleration['km/h/s'],
			},
		},
		precision: 3,
	},
	areaDensity: {
		name: locales[locale]['unit-converter'].areaDensity,
		units: {
			'kg/m²': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.areaDensity['kg/m²'],
			},
			'g/cm²': {
				factor: 10,
				abbrev: locales[locale]['unit-converter'].units.areaDensity['g/cm²'],
			},
		},
		precision: 2,
	},
	illuminance: {
		name: locales[locale]['unit-converter'].illuminance,
		units: {
			lux: {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.illuminance.lux,
			},
			'foot-candle': {
				factor: 10.764,
				abbrev:
					locales[locale]['unit-converter'].units.illuminance['foot-candle'],
			},
		},
		precision: 2,
	},
	dataRate: {
		name: locales[locale]['unit-converter'].dataRate,
		units: {
			'bit/s': {
				factor: 1,
				abbrev: locales[locale]['unit-converter'].units.dataRate['bit/s'],
			},
			'kilobit/s': {
				factor: 1000,
				abbrev: locales[locale]['unit-converter'].units.dataRate['kilobit/s'],
			},
			'megabit/s': {
				factor: 1e6,
				abbrev: locales[locale]['unit-converter'].units.dataRate['megabit/s'],
			},
			'gigabit/s': {
				factor: 1e9,
				abbrev: locales[locale]['unit-converter'].units.dataRate['gigabit/s'],
			},
			'byte/s': {
				factor: 8,
				abbrev: locales[locale]['unit-converter'].units.dataRate['byte/s'],
			},
			'kilobyte/s': {
				factor: 8000,
				abbrev: locales[locale]['unit-converter'].units.dataRate['kilobyte/s'],
			},
			'megabyte/s': {
				factor: 8e6,
				abbrev: locales[locale]['unit-converter'].units.dataRate['megabyte/s'],
			},
		},
		precision: 0,
	},
});
