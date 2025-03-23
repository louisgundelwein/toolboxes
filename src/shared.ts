import { UnitCategoryKey } from './app/[locale]/tools/unit-converter/util/unitCategories';

export type LocaleEnum = 'en' | 'de' | 'fr' | 'es' | 'pt' | 'uk' | 'zh';
export const LOCALES = ['en', 'de', 'fr', 'es', 'uk', 'zh', 'pt'];
export const UNITS_CATEGORIES: UnitCategoryKey[] = [
  'length',
  'weight',
  'area',
  'volume',
  'temperature',
  'speed',
  'time',
  'pressure',
  'energy',
  'power',
  'data-storage',
  'angle',
  'frequency',
  'force',
  'density',
  'volume-flow',
  'acceleration',
  'area-density',
  'illuminance',
  'data-rate',
];
export type UnitCategoryEnum =
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
  | 'data-storage'
  | 'angle'
  | 'frequency'
  | 'force'
  | 'density'
  | 'volume-flow'
  | 'acceleration'
  | 'area-density'
  | 'illuminance'
  | 'data-rate';
