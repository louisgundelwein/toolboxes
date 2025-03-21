import { useTranslations } from 'next-intl';

export interface Unit {
	name: string;
	abbrev: string;
	definition: string;
	wiki: string;
	factor: number;
}

export interface UnitCategory {
	name: string;
	units: { [unit: string]: Unit };
	convert?: (value: number, from: string, to: string) => number;
	precision?: number;
}

export type UnitCategoryKey =
	| 'length'
	| 'weight'
	| 'area'
	| 'volume'
	| 'temperature'
	| 'speed'
	| 'time'
	| 'pressure'
	| 'energy'
	| 'power'
	| 'dataStorage'
	| 'angle'
	| 'frequency'
	| 'force'
	| 'density'
	| 'volumeFlow'
	| 'acceleration'
	| 'areaDensity'
	| 'illuminance'
	| 'dataRate';

export type LengthUnit =
	| 'meter'
	| 'kilometer'
	| 'centimeter'
	| 'millimeter'
	| 'mile'
	| 'yard'
	| 'foot'
	| 'inch';
export type WeightUnit = 'gram' | 'milligram' | 'kilogram' | 'pound' | 'ounce';
export type AreaUnit =
	| 'square-meter'
	| 'square-kilometer'
	| 'square-centimeter'
	| 'square-millimeter'
	| 'square-mile'
	| 'square-yard'
	| 'square-foot'
	| 'square-inch'
	| 'acre';
export type VolumeUnit =
	| 'cubic-meter'
	| 'cubic-kilometer'
	| 'cubic-centimeter'
	| 'cubic-millimeter'
	| 'cubic-mile'
	| 'cubic-yard'
	| 'cubic-foot'
	| 'cubic-inch';
export type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';
export type SpeedUnit =
	| 'meter-per-second'
	| 'kilometer-per-hour'
	| 'mile-per-hour'
	| 'knot';
export type TimeUnit =
	| 'second'
	| 'minute'
	| 'hour'
	| 'day'
	| 'week'
	| 'month'
	| 'year';
export type PressureUnit = 'pascal' | 'bar' | 'atmosphere' | 'torr';
export type EnergyUnit =
	| 'joule'
	| 'kilojoule'
	| 'calorie'
	| 'kilocalorie'
	| 'watt-hour'
	| 'kilowatt-hour'
	| 'electronvolt'
	| 'hartree'
	| 'kilogram-force-meter'
	| 'kilopond-meter'
	| 'gram-force-meter'
	| 'pound-force-foot'
	| 'pound-force-inch'
	| 'ounce-force-foot'
	| 'ounce-force-inch'
	| 'ton-force-foot'
	| 'ton-force-inch'
	| 'poundal-foot'
	| 'poundal-inch'
	| 'ounceal-foot'
	| 'ounceal-inch'
	| 'tonal-foot'
	| 'tonal-inch'
	| 'poundal-foot'
	| 'poundal-inch'
	| 'ounceal-foot'
	| 'ounceal-inch'
	| 'tonal-foot'
	| 'tonal-inch';
export type PowerUnit =
	| 'watt'
	| 'kilowatt'
	| 'horsepower'
	| 'british-thermal-unit-per-hour'
	| 'calorie-per-second'
	| 'kilocalorie-per-second'
	| 'watt-per-square-meter'
	| 'kilowatt-per-square-meter'
	| 'horsepower-per-square-meter'
	| 'british-thermal-unit-per-hour-per-square-foot'
	| 'calorie-per-second-per-square-meter'
	| 'kilocalorie-per-second-per-square-meter'
	| 'watt-per-square-meter-kelvin'
	| 'kilowatt-per-square-meter-kelvin'
	| 'horsepower-per-square-meter-kelvin'
	| 'british-thermal-unit-per-hour-per-square-foot-kelvin'
	| 'calorie-per-second-per-square-meter-kelvin'
	| 'kilocalorie-per-second-per-square-meter-kelvin';
export type DataStorageUnit =
	| 'byte'
	| 'kilobyte'
	| 'megabyte'
	| 'gigabyte'
	| 'terabyte'
	| 'petabyte'
	| 'exabyte'
	| 'zettabyte'
	| 'yottabyte';
export type AngleUnit =
	| 'degree'
	| 'radian'
	| 'gradian'
	| 'minute'
	| 'second'
	| 'milliradian'
	| 'milligradian'
	| 'milliarc-second'
	| 'microarc-second'
	| 'microarc-minute'
	| 'microarc-second'
	| 'microarc-minute'
	| 'microarc-second'
	| 'microarc-minute'
	| 'microarc-second'
	| 'microarc-minute'
	| 'microarc-second';
export type FrequencyUnit =
	| 'hertz'
	| 'kilohertz'
	| 'megahertz'
	| 'gigahertz'
	| 'terahertz'
	| 'petahertz'
	| 'exahertz'
	| 'zettahertz'
	| 'yottahertz';
export type ForceUnit =
	| 'newton'
	| 'kilonewton'
	| 'meganewton'
	| 'giganewton'
	| 'teranewton'
	| 'petanewton'
	| 'exanewton'
	| 'zettanewton'
	| 'yottanewton'
	| 'dyne'
	| 'kilogram-force'
	| 'kilopond'
	| 'gram-force'
	| 'pound-force'
	| 'ounce-force'
	| 'ton-force'
	| 'poundal'
	| 'ounceal'
	| 'tonal';
export type DensityUnit =
	| 'kilogram-per-cubic-meter'
	| 'gram-per-cubic-centimeter'
	| 'kilogram-per-cubic-centimeter'
	| 'gram-per-cubic-meter'
	| 'kilogram-per-cubic-kilometer'
	| 'gram-per-cubic-kilometer'
	| 'kilogram-per-cubic-millimeter'
	| 'gram-per-cubic-millimeter'
	| 'kilogram-per-cubic-mile'
	| 'gram-per-cubic-mile'
	| 'kilogram-per-cubic-yard'
	| 'gram-per-cubic-yard'
	| 'kilogram-per-cubic-foot'
	| 'gram-per-cubic-foot'
	| 'kilogram-per-cubic-inch'
	| 'gram-per-cubic-inch';
export type VolumeFlowUnit =
	| 'cubic-meter-per-second'
	| 'cubic-kilometer-per-second'
	| 'cubic-centimeter-per-second'
	| 'cubic-millimeter-per-second'
	| 'cubic-mile-per-second'
	| 'cubic-yard-per-second'
	| 'cubic-foot-per-second'
	| 'cubic-inch-per-second'
	| 'cubic-meter-per-hour'
	| 'cubic-kilometer-per-hour'
	| 'cubic-centimeter-per-hour'
	| 'cubic-millimeter-per-hour'
	| 'cubic-mile-per-hour'
	| 'cubic-yard-per-hour'
	| 'cubic-foot-per-hour'
	| 'cubic-inch-per-hour';
export type AccelerationUnit =
	| 'meter-per-second-squared'
	| 'kilometer-per-second-squared'
	| 'centimeter-per-second-squared'
	| 'millimeter-per-second-squared'
	| 'mile-per-second-squared'
	| 'yard-per-second-squared'
	| 'foot-per-second-squared'
	| 'inch-per-second-squared'
	| 'meter-per-hour-squared'
	| 'kilometer-per-hour-squared'
	| 'centimeter-per-hour-squared'
	| 'millimeter-per-hour-squared'
	| 'mile-per-hour-squared'
	| 'yard-per-hour-squared'
	| 'foot-per-hour-squared'
	| 'inch-per-hour-squared';
export type AreaDensityUnit =
	| 'kilogram-per-square-meter'
	| 'gram-per-square-centimeter'
	| 'kilogram-per-square-centimeter'
	| 'gram-per-square-meter'
	| 'kilogram-per-square-kilometer'
	| 'gram-per-square-kilometer'
	| 'kilogram-per-square-millimeter'
	| 'gram-per-square-millimeter'
	| 'kilogram-per-square-mile'
	| 'gram-per-square-mile'
	| 'kilogram-per-square-yard'
	| 'gram-per-square-yard'
	| 'kilogram-per-square-foot'
	| 'gram-per-square-foot'
	| 'kilogram-per-square-inch'
	| 'gram-per-square-inch';
export type IlluminanceUnit =
	| 'lux'
	| 'lumen-per-square-meter'
	| 'lumen-per-square-centimeter'
	| 'lumen-per-square-millimeter'
	| 'lumen-per-square-foot'
	| 'lumen-per-square-inch'
	| 'lumen-per-square-yard'
	| 'lumen-per-square-kilometer'
	| 'lumen-per-square-mile'
	| 'lumen-per-square-yard'
	| 'lumen-per-square-foot'
	| 'lumen-per-square-inch'
	| 'lumen-per-square-yard'
	| 'lumen-per-square-kilometer'
	| 'lumen-per-square-mile';
export type DataRateUnit =
	| 'bit-per-second'
	| 'kilobit-per-second'
	| 'megabit-per-second'
	| 'gigabit-per-second'
	| 'terabit-per-second'
	| 'petabit-per-second'
	| 'exabit-per-second'
	| 'zettabit-per-second'
	| 'yottabit-per-second'
	| 'byte-per-second'
	| 'kilobyte-per-second'
	| 'megabyte-per-second'
	| 'gigabyte-per-second'
	| 'terabyte-per-second'
	| 'petabyte-per-second'
	| 'exabyte-per-second'
	| 'zettabyte-per-second'
	| 'yottabyte-per-second';

export type SimpleUnitCategory = {
	key: UnitCategoryKey;
	name: string;
};

export function getSimpleUnitCategory(
	t: ReturnType<typeof useTranslations>
): SimpleUnitCategory[] {
	return [
		{
			key: 'length',
			name: t('units.length.name'),
		},
		{
			key: 'weight',
			name: t('units.weight.name'),
		},
		{
			key: 'area',
			name: t('units.area.name'),
		},
		{
			key: 'volume',
			name: t('units.volume.name'),
		},
		{
			key: 'temperature',
			name: t('units.temperature.name'),
		},
		{
			key: 'speed',
			name: t('units.speed.name'),
		},
		{
			key: 'time',
			name: t('units.time.name'),
		},
		{
			key: 'pressure',
			name: t('units.pressure.name'),
		},
		{
			key: 'energy',
			name: t('units.energy.name'),
		},
		{
			key: 'power',
			name: t('units.power.name'),
		},
		{
			key: 'dataStorage',
			name: t('units.data-storage.name'),
		},
		{
			key: 'angle',
			name: t('units.angle.name'),
		},
		{
			key: 'frequency',
			name: t('units.frequency.name'),
		},
		{
			key: 'force',
			name: t('units.force.name'),
		},
		{
			key: 'density',
			name: t('units.density.name'),
		},
		{
			key: 'volumeFlow',
			name: t('units.volume-flow.name'),
		},
		{
			key: 'acceleration',
			name: t('units.acceleration.name'),
		},
		{
			key: 'areaDensity',
			name: t('units.area-density.name'),
		},
		{
			key: 'illuminance',
			name: t('units.illuminance.name'),
		},
		{
			key: 'dataRate',
			name: t('units.data-rate.name'),
		},
	];
}

export function getUnitCategoryObject(
	key: UnitCategoryKey,
	t: ReturnType<typeof useTranslations>
): UnitCategory | undefined {
	switch (key) {
		case 'length':
			return {
				name: t('units.length.name'),
				units: {
					meter: {
						name: t('units.length.meter.name'),
						factor: 1,
						abbrev: t('units.length.meter.abbr'),
						definition: t('units.length.meter.definition'),
						wiki: t('units.length.meter.wiki'),
					},
					kilometer: {
						name: t('units.length.kilometer.name'),
						factor: 1000,
						abbrev: t('units.length.kilometer.abbr'),
						definition: t('units.length.kilometer.definition'),
						wiki: t('units.length.kilometer.wiki'),
					},
					centimeter: {
						name: t('units.length.centimeter.name'),
						factor: 0.01,
						abbrev: t('units.length.centimeter.abbr'),
						definition: t('units.length.centimeter.definition'),
						wiki: t('units.length.centimeter.wiki'),
					},
					millimeter: {
						name: t('units.length.millimeter.name'),
						factor: 0.001,
						abbrev: t('units.length.millimeter.abbr'),
						definition: t('units.length.millimeter.definition'),
						wiki: t('units.length.millimeter.wiki'),
					},
					mile: {
						name: t('units.length.mile.name'),
						factor: 1609.34,
						abbrev: t('units.length.mile.abbr'),
						definition: t('units.length.mile.definition'),
						wiki: t('units.length.mile.wiki'),
					},
					yard: {
						name: t('units.length.yard.name'),
						factor: 0.9144,
						abbrev: t('units.length.yard.abbr'),
						definition: t('units.length.yard.definition'),
						wiki: t('units.length.yard.wiki'),
					},
					foot: {
						name: t('units.length.foot.name'),
						factor: 0.3048,
						abbrev: t('units.length.foot.abbr'),
						definition: t('units.length.foot.definition'),
						wiki: t('units.length.foot.wiki'),
					},
					inch: {
						name: t('units.length.inch.name'),
						factor: 0.0254,
						abbrev: t('units.length.inch.abbr'),
						definition: t('units.length.inch.definition'),
						wiki: t('units.length.inch.wiki'),
					},
				},
				precision: 4,
			};
		case 'weight':
			return {
				name: t('units.weight.name'),
				precision: 3,
				units: {
					gram: {
						name: t('units.weight.gram.name'),
						factor: 1,
						abbrev: t('units.weight.gram.abbr'),
						definition: t('units.weight.gram.definition'),
						wiki: t('units.weight.gram.wiki'),
					},
					milligram: {
						name: t('units.weight.milligram.name'),
						factor: 0.001,
						abbrev: t('units.weight.milligram.abbr'),
						definition: t('units.weight.milligram.definition'),
						wiki: t('units.weight.milligram.wiki'),
					},
					kilogram: {
						name: t('units.weight.kilogram.name'),
						factor: 1000,
						abbrev: t('units.weight.kilogram.abbr'),
						definition: t('units.weight.kilogram.definition'),
						wiki: t('units.weight.kilogram.wiki'),
					},
					pound: {
						name: t('units.weight.pound.name'),
						factor: 0.453592,
						abbrev: t('units.weight.pound.abbr'),
						definition: t('units.weight.pound.definition'),
						wiki: t('units.weight.pound.wiki'),
					},
					ounce: {
						name: t('units.weight.ounce.name'),
						factor: 0.0283495,
						abbrev: t('units.weight.ounce.abbr'),
						definition: t('units.weight.ounce.definition'),
						wiki: t('units.weight.ounce.wiki'),
					},
				},
			};
		case 'area':
			return {
				name: t('units.area.name'),
				precision: 3,
				units: {
					'square-meter': {
						name: t('units.area.square-meter.name'),
						factor: 1,
						abbrev: t('units.area.square-meter.abbr'),
						definition: t('units.area.square-meter.definition'),
						wiki: t('units.area.square-meter.wiki'),
					},
					'square-kilometer': {
						name: t('units.area.square-kilometer.name'),
						factor: 1000000,
						abbrev: t('units.area.square-kilometer.abbr'),
						definition: t('units.area.square-kilometer.definition'),
						wiki: t('units.area.square-kilometer.wiki'),
					},
					'square-centimeter': {
						name: t('units.area.square-centimeter.name'),
						factor: 0.0001,
						abbrev: t('units.area.square-centimeter.abbr'),
						definition: t('units.area.square-centimeter.definition'),
						wiki: t('units.area.square-centimeter.wiki'),
					},
					'square-millimeter': {
						name: t('units.area.square-millimeter.name'),
						factor: 0.000001,
						abbrev: t('units.area.square-millimeter.abbr'),
						definition: t('units.area.square-millimeter.definition'),
						wiki: t('units.area.square-millimeter.wiki'),
					},
					'square-mile': {
						name: t('units.area.square-mile.name'),
						factor: 2589988.1103,
						abbrev: t('units.area.square-mile.abbr'),
						definition: t('units.area.square-mile.definition'),
						wiki: t('units.area.square-mile.wiki'),
					},
					'square-yard': {
						name: t('units.area.square-yard.name'),
						factor: 0.836127,
						abbrev: t('units.area.square-yard.abbr'),
						definition: t('units.area.square-yard.definition'),
						wiki: t('units.area.square-yard.wiki'),
					},
					'square-foot': {
						name: t('units.area.square-foot.name'),
						factor: 0.092903,
						abbrev: t('units.area.square-foot.abbr'),
						definition: t('units.area.square-foot.definition'),
						wiki: t('units.area.square-foot.wiki'),
					},
					'square-inch': {
						name: t('units.area.square-inch.name'),
						factor: 0.00064516,
						abbrev: t('units.area.square-inch.abbr'),
						definition: t('units.area.square-inch.definition'),
						wiki: t('units.area.square-inch.wiki'),
					},
					acre: {
						name: t('units.area.acre.name'),
						factor: 4046.86,
						abbrev: t('units.area.acre.abbr'),
						definition: t('units.area.acre.definition'),
						wiki: t('units.area.acre.wiki'),
					},
				},
			};
		case 'volume':
			return {
				name: t('units.volume.name'),
				precision: 3,
				units: {
					'cubic-meter': {
						name: t('units.volume.cubic-meter.name'),
						factor: 1,
						abbrev: t('units.volume.cubic-meter.abbr'),
						definition: t('units.volume.cubic-meter.definition'),
						wiki: t('units.volume.cubic-meter.wiki'),
					},
					'cubic-kilometer': {
						name: t('units.volume.cubic-kilometer.name'),
						factor: 1000000000,
						abbrev: t('units.volume.cubic-kilometer.abbr'),
						definition: t('units.volume.cubic-kilometer.definition'),
						wiki: t('units.volume.cubic-kilometer.wiki'),
					},
					'cubic-centimeter': {
						name: t('units.volume.cubic-centimeter.name'),
						factor: 0.000001,
						abbrev: t('units.volume.cubic-centimeter.abbr'),
						definition: t('units.volume.cubic-centimeter.definition'),
						wiki: t('units.volume.cubic-centimeter.wiki'),
					},
					'cubic-millimeter': {
						name: t('units.volume.cubic-millimeter.name'),
						factor: 0.000000001,
						abbrev: t('units.volume.cubic-millimeter.abbr'),
						definition: t('units.volume.cubic-millimeter.definition'),
						wiki: t('units.volume.cubic-millimeter.wiki'),
					},
					'cubic-mile': {
						name: t('units.volume.cubic-mile.name'),
						factor: 4168181825.4405795,
						abbrev: t('units.volume.cubic-mile.abbr'),
						definition: t('units.volume.cubic-mile.definition'),
						wiki: t('units.volume.cubic-mile.wiki'),
					},
					'cubic-yard': {
						name: t('units.volume.cubic-yard.name'),
						factor: 0.764555,
						abbrev: t('units.volume.cubic-yard.abbr'),
						definition: t('units.volume.cubic-yard.definition'),
						wiki: t('units.volume.cubic-yard.wiki'),
					},
				},
			};
		case 'temperature':
			return {
				name: t('units.temperature.name'),
				precision: 2,
				units: {
					celsius: {
						name: t('units.temperature.celsius.name'),
						factor: 1,
						abbrev: t('units.temperature.celsius.abbr'),
						definition: t('units.temperature.celsius.definition'),
						wiki: t('units.temperature.celsius.wiki'),
					},
					fahrenheit: {
						name: t('units.temperature.fahrenheit.name'),
						factor: 1,
						abbrev: t('units.temperature.fahrenheit.abbr'),
						definition: t('units.temperature.fahrenheit.definition'),
						wiki: t('units.temperature.fahrenheit.wiki'),
					},
					kelvin: {
						name: t('units.temperature.kelvin.name'),
						factor: 1,
						abbrev: t('units.temperature.kelvin.abbr'),
						definition: t('units.temperature.kelvin.definition'),
						wiki: t('units.temperature.kelvin.wiki'),
					},
				},
				convert: (value: number, from: string, to: string) => {
					if (from === 'celsius' && to === 'fahrenheit') {
						return (value * 9) / 5 + 32;
					} else if (from === 'fahrenheit' && to === 'celsius') {
						return ((value - 32) * 5) / 9;
					} else if (from === 'celsius' && to === 'kelvin') {
						return value + 273.15;
					} else if (from === 'kelvin' && to === 'celsius') {
						return value - 273.15;
					} else if (from === 'fahrenheit' && to === 'kelvin') {
						return ((value - 32) * 5) / 9 + 273.15;
					} else if (from === 'kelvin' && to === 'fahrenheit') {
						return ((value - 273.15) * 9) / 5 + 32;
					}
					return value;
				},
			};
		case 'speed':
			return {
				name: t('units.speed.name'),
				precision: 2,
				units: {
					'meter-per-second': {
						name: t('units.speed.meters-per-second.name'),
						factor: 1,
						abbrev: t('units.speed.meters-per-second.abbr'),
						definition: t('units.speed.meters-per-second.definition'),
						wiki: t('units.speed.meters-per-second.wiki'),
					},
					'kilometer-per-hour': {
						name: t('units.speed.kilometers-per-hour.name'),
						factor: 0.277778,
						abbrev: t('units.speed.kilometers-per-hour.abbr'),
						definition: t('units.speed.kilometers-per-hour.definition'),
						wiki: t('units.speed.kilometers-per-hour.wiki'),
					},
					'mile-per-hour': {
						name: t('units.speed.miles-per-hour.name'),
						factor: 0.44704,
						abbrev: t('units.speed.miles-per-hour.abbr'),
						definition: t('units.speed.miles-per-hour.definition'),
						wiki: t('units.speed.miles-per-hour.wiki'),
					},
				},
			};
		case 'time':
			return {
				name: t('units.time.name'),
				precision: 2,
				units: {
					second: {
						name: t('units.time.second.name'),
						factor: 1,
						abbrev: t('units.time.second.abbr'),
						definition: t('units.time.second.definition'),
						wiki: t('units.time.second.wiki'),
					},
					minute: {
						name: t('units.time.minute.name'),
						factor: 60,
						abbrev: t('units.time.minute.abbr'),
						definition: t('units.time.minute.definition'),
						wiki: t('units.time.minute.wiki'),
					},
					hour: {
						name: t('units.time.hour.name'),
						factor: 3600,
						abbrev: t('units.time.hour.abbr'),
						definition: t('units.time.hour.definition'),
						wiki: t('units.time.hour.wiki'),
					},
					day: {
						name: t('units.time.day.name'),
						factor: 86400,
						abbrev: t('units.time.day.abbr'),
						definition: t('units.time.day.definition'),
						wiki: t('units.time.day.wiki'),
					},
				},
			};
		case 'pressure':
			return {
				name: t('units.pressure.name'),
				precision: 2,
				units: {
					pascal: {
						name: t('units.pressure.pascal.name'),
						factor: 1,
						abbrev: t('units.pressure.pascal.abbr'),
						definition: t('units.pressure.pascal.definition'),
						wiki: t('units.pressure.pascal.wiki'),
					},
					bar: {
						name: t('units.pressure.bar.name'),
						factor: 100000,
						abbrev: t('units.pressure.bar.abbr'),
						definition: t('units.pressure.bar.definition'),
						wiki: t('units.pressure.bar.wiki'),
					},
				},
			};
		case 'energy':
			return {
				name: t('units.energy.name'),
				precision: 2,
				units: {
					joule: {
						name: t('units.energy.joule.name'),
						factor: 1,
						abbrev: t('units.energy.joule.abbr'),
						definition: t('units.energy.joule.definition'),
						wiki: t('units.energy.joule.wiki'),
					},
					kilojoule: {
						name: t('units.energy.kilojoule.name'),
						factor: 1000,
						abbrev: t('units.energy.kilojoule.abbr'),
						definition: t('units.energy.kilojoule.definition'),
						wiki: t('units.energy.kilojoule.wiki'),
					},
					calorie: {
						name: t('units.energy.calorie.name'),
						factor: 4.184,
						abbrev: t('units.energy.calorie.abbr'),
						definition: t('units.energy.calorie.definition'),
						wiki: t('units.energy.calorie.wiki'),
					},
					kilocalorie: {
						name: t('units.energy.kilocalorie.name'),
						factor: 4184,
						abbrev: t('units.energy.kilocalorie.abbr'),
						definition: t('units.energy.kilocalorie.definition'),
						wiki: t('units.energy.kilocalorie.wiki'),
					},
					'kilowatt-hour': {
						name: t('units.energy.kilowatt-hour.name'),
						factor: 3600000,
						abbrev: t('units.energy.kilowatt-hour.abbr'),
						definition: t('units.energy.kilowatt-hour.definition'),
						wiki: t('units.energy.kilowatt-hour.wiki'),
					},
				},
			};
		case 'power':
			return {
				name: t('units.power.name'),
				precision: 2,
				units: {
					watt: {
						name: t('units.power.watt.name'),
						factor: 1,
						abbrev: t('units.power.watt.abbr'),
						definition: t('units.power.watt.definition'),
						wiki: t('units.power.watt.wiki'),
					},
					kilowatt: {
						name: t('units.power.kilowatt.name'),
						factor: 1000,
						abbrev: t('units.power.kilowatt.abbr'),
						definition: t('units.power.kilowatt.definition'),
						wiki: t('units.power.kilowatt.wiki'),
					},
					horsepower: {
						name: t('units.power.horsepower.name'),
						factor: 745.7,
						abbrev: t('units.power.horsepower.abbr'),
						definition: t('units.power.horsepower.definition'),
						wiki: t('units.power.horsepower.wiki'),
					},
				},
			};
		case 'dataStorage':
			return {
				name: t('units.data-storage.name'),
				precision: 2,
				units: {
					byte: {
						name: t('units.data-storage.byte.name'),
						factor: 1,
						abbrev: t('units.data-storage.byte.abbr'),
						definition: t('units.data-storage.byte.definition'),
						wiki: t('units.data-storage.byte.wiki'),
					},
					kilobyte: {
						name: t('units.data-storage.kilobyte.name'),
						factor: 1024,
						abbrev: t('units.data-storage.kilobyte.abbr'),
						definition: t('units.data-storage.kilobyte.definition'),
						wiki: t('units.data-storage.kilobyte.wiki'),
					},
					megabyte: {
						name: t('units.data-storage.megabyte.name'),
						factor: 1048576,
						abbrev: t('units.data-storage.megabyte.abbr'),
						definition: t('units.data-storage.megabyte.definition'),
						wiki: t('units.data-storage.megabyte.wiki'),
					},
					gigabyte: {
						name: t('units.data-storage.gigabyte.name'),
						factor: 1073741824,
						abbrev: t('units.data-storage.gigabyte.abbr'),
						definition: t('units.data-storage.gigabyte.definition'),
						wiki: t('units.data-storage.gigabyte.wiki'),
					},
				},
			};
		case 'angle':
			return {
				name: t('units.angle.name'),
				precision: 4,
				units: {
					degree: {
						name: t('units.angle.degree.name'),
						factor: 1,
						abbrev: t('units.angle.degree.abbr'),
						definition: t('units.angle.degree.definition'),
						wiki: t('units.angle.degree.wiki'),
					},
					radian: {
						name: t('units.angle.radian.name'),
						factor: 57.2958,
						abbrev: t('units.angle.radian.abbr'),
						definition: t('units.angle.radian.definition'),
						wiki: t('units.angle.radian.wiki'),
					},
					grad: {
						name: t('units.angle.grad.name'),
						factor: 0.9,
						abbrev: t('units.angle.grad.abbr'),
						definition: t('units.angle.grad.definition'),
						wiki: t('units.angle.grad.wiki'),
					},
				},
			};
		case 'frequency':
			return {
				name: t('units.frequency.name'),
				precision: 2,
				units: {
					hertz: {
						name: t('units.frequency.hertz.name'),
						factor: 1,
						abbrev: t('units.frequency.hertz.abbr'),
						definition: t('units.frequency.hertz.definition'),
						wiki: t('units.frequency.hertz.wiki'),
					},
					kilohertz: {
						name: t('units.frequency.kilohertz.name'),
						factor: 1000,
						abbrev: t('units.frequency.kilohertz.abbr'),
						definition: t('units.frequency.kilohertz.definition'),
						wiki: t('units.frequency.kilohertz.wiki'),
					},
					megahertz: {
						name: t('units.frequency.megahertz.name'),
						factor: 1000000,
						abbrev: t('units.frequency.megahertz.abbr'),
						definition: t('units.frequency.megahertz.definition'),
						wiki: t('units.frequency.megahertz.wiki'),
					},
					gigahertz: {
						name: t('units.frequency.gigahertz.name'),
						factor: 1000000000,
						abbrev: t('units.frequency.gigahertz.abbr'),
						definition: t('units.frequency.gigahertz.definition'),
						wiki: t('units.frequency.gigahertz.wiki'),
					},
				},
			};
		case 'force':
			return {
				name: t('units.force.name'),
				precision: 2,
				units: {
					newton: {
						name: t('units.force.newton.name'),
						factor: 1,
						abbrev: t('units.force.newton.abbr'),
						definition: t('units.force.newton.definition'),
						wiki: t('units.force.newton.wiki'),
					},
					kilonewton: {
						name: t('units.force.kilonewton.name'),
						factor: 1000,
						abbrev: t('units.force.kilonewton.abbr'),
						definition: t('units.force.kilonewton.definition'),
						wiki: t('units.force.kilonewton.wiki'),
					},
					'pound-force': {
						name: t('units.force.pound-force.name'),
						factor: 4.44822,
						abbrev: t('units.force.pound-force.abbr'),
						definition: t('units.force.pound-force.definition'),
						wiki: t('units.force.pound-force.wiki'),
					},
				},
			};
		case 'density':
			return {
				name: t('units.density.name'),
				precision: 3,
				units: {
					'kilogram-per-cubic-meter': {
						name: t('units.density.kilogram-per-cubic-meter.name'),
						factor: 1,
						abbrev: t('units.density.kilogram-per-cubic-meter.abbr'),
						definition: t('units.density.kilogram-per-cubic-meter.definition'),
						wiki: t('units.density.kilogram-per-cubic-meter.wiki'),
					},
					'gram-per-cubic-centimeter': {
						name: t('units.density.gram-per-cubic-centimeter.name'),
						factor: 1000,
						abbrev: t('units.density.gram-per-cubic-centimeter.abbr'),
						definition: t('units.density.gram-per-cubic-centimeter.definition'),
						wiki: t('units.density.gram-per-cubic-centimeter.wiki'),
					},
				},
			};
		case 'volumeFlow':
			return {
				name: t('units.volume-flow.name'),
				precision: 2,
				units: {
					'cubic-meters-per-second': {
						name: t('units.volume-flow.cubic-meters-per-second.name'),
						factor: 1,
						abbrev: t('units.volume-flow.cubic-meters-per-second.abbr'),
						definition: t(
							'units.volume-flow.cubic-meters-per-second.definition'
						),
						wiki: t('units.volume-flow.cubic-meters-per-second.wiki'),
					},
					'liters-per-second': {
						name: t('units.volume-flow.liters-per-second.name'),
						factor: 0.001,
						abbrev: t('units.volume-flow.liters-per-second.abbr'),
						definition: t('units.volume-flow.liters-per-second.definition'),
						wiki: t('units.volume-flow.liters-per-second.wiki'),
					},
					'gallons-per-minute': {
						name: t('units.volume-flow.gallons-per-minute.name'),
						factor: 0.0000631,
						abbrev: t('units.volume-flow.gallons-per-minute.abbr'),
						definition: t('units.volume-flow.gallons-per-minute.definition'),
						wiki: t('units.volume-flow.gallons-per-minute.wiki'),
					},
				},
			};
		case 'acceleration':
			return {
				name: t('units.acceleration.name'),
				precision: 2,
				units: {
					'meters-per-second-squared': {
						name: t('units.acceleration.meters-per-second-squared.name'),
						factor: 1,
						abbrev: t('units.acceleration.meters-per-second-squared.abbr'),
						definition: t(
							'units.acceleration.meters-per-second-squared.definition'
						),
						wiki: t('units.acceleration.meters-per-second-squared.wiki'),
					},
					'feet-per-second-squared': {
						name: t('units.acceleration.feet-per-second-squared.name'),
						factor: 0.3048,
						abbrev: t('units.acceleration.feet-per-second-squared.abbr'),
						definition: t(
							'units.acceleration.feet-per-second-squared.definition'
						),
						wiki: t('units.acceleration.feet-per-second-squared.wiki'),
					},
				},
			};
		case 'areaDensity':
			return {
				name: t('units.area-density.name'),
				precision: 3,
				units: {
					'kilogram-per-square-meter': {
						name: t('units.area-density.kilogram-per-square-meter.name'),
						factor: 1,
						abbrev: t('units.area-density.kilogram-per-square-meter.abbr'),
						definition: t(
							'units.area-density.kilogram-per-square-meter.definition'
						),
						wiki: t('units.area-density.kilogram-per-square-meter.wiki'),
					},
					'gram-per-square-centimeter': {
						name: t('units.area-density.gram-per-square-centimeter.name'),
						factor: 10000,
						abbrev: t('units.area-density.gram-per-square-centimeter.abbr'),
						definition: t(
							'units.area-density.gram-per-square-centimeter.definition'
						),
						wiki: t('units.area-density.gram-per-square-centimeter.wiki'),
					},
				},
			};
		case 'illuminance':
			return {
				name: t('units.illuminance.name'),
				precision: 2,
				units: {
					lux: {
						name: t('units.illuminance.lux.name'),
						factor: 1,
						abbrev: t('units.illuminance.lux.abbr'),
						definition: t('units.illuminance.lux.definition'),
						wiki: t('units.illuminance.lux.wiki'),
					},
					'foot-candle': {
						name: t('units.illuminance.foot-candle.name'),
						factor: 10.764,
						abbrev: t('units.illuminance.foot-candle.abbr'),
						definition: t('units.illuminance.foot-candle.definition'),
						wiki: t('units.illuminance.foot-candle.wiki'),
					},
				},
			};
		case 'dataRate':
			return {
				name: t('units.data-rate.name'),
				precision: 2,
				units: {
					'bits-per-second': {
						name: t('units.data-rate.bits-per-second.name'),
						factor: 1,
						abbrev: t('units.data-rate.bits-per-second.abbr'),
						definition: t('units.data-rate.bits-per-second.definition'),
						wiki: t('units.data-rate.bits-per-second.wiki'),
					},
					'kilobits-per-second': {
						name: t('units.data-rate.kilobits-per-second.name'),
						factor: 1000,
						abbrev: t('units.data-rate.kilobits-per-second.abbr'),
						definition: t('units.data-rate.kilobits-per-second.definition'),
						wiki: t('units.data-rate.kilobits-per-second.wiki'),
					},
					'megabits-per-second': {
						name: t('units.data-rate.megabits-per-second.name'),
						factor: 1000000,
						abbrev: t('units.data-rate.megabits-per-second.abbr'),
						definition: t('units.data-rate.megabits-per-second.definition'),
						wiki: t('units.data-rate.megabits-per-second.wiki'),
					},
					'gigabits-per-second': {
						name: t('units.data-rate.gigabits-per-second.name'),
						factor: 1000000000,
						abbrev: t('units.data-rate.gigabits-per-second.abbr'),
						definition: t('units.data-rate.gigabits-per-second.definition'),
						wiki: t('units.data-rate.gigabits-per-second.wiki'),
					},
				},
			};
	}
}

export function getUnitsFromCategoryKey(
	key: UnitCategoryKey,
	t: ReturnType<typeof useTranslations>
): { value: string; label: string }[] {
	const category = getUnitCategoryObject(key, t);
	if (!category) return [];

	return Object.entries(category.units).map(([unitKey, unit]) => ({
		value: unitKey,
		label: `${unit.name} (${unit.abbrev})`,
	}));
}

export default getUnitCategoryObject;
