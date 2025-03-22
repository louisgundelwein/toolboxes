// components/UnitDefinitions.tsx
import React from 'react';
import { useTranslations } from 'next-intl';
import { UnitCategoryKey } from '../util/unitCategories';
export interface UnitDefinitionsProps {
  category: UnitCategoryKey;
  fromUnit: string;
  toUnit: string;
}

const UnitDefinitions: React.FC<UnitDefinitionsProps> = ({ category, fromUnit, toUnit }) => {
  const t = useTranslations('UnitConverterPage');
  const fromData = t(`units.${category}.${fromUnit}.definition`);
  const toData = t(`units.${category}.${toUnit}.definition`);

  const definition = t('definitions.for');
  const forMore = t('definitions.more');

  return (
    <div className="mt-4 flex flex-col gap-2">
      {fromData && (
        <div className="card w-full max-w-lg bg-base-100 p-6 shadow-xl">
          <h4>
            {`${definition} `}
            {fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}
          </h4>
          <p>{fromData}</p>
          <a
            href={t(`units.${category}.${fromUnit}.wiki`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-info"
          >
            {forMore}
          </a>
        </div>
      )}
      {toData && (
        <div className="card w-full max-w-lg bg-base-100 p-6 shadow-xl">
          <h4>
            {`${definition} `}
            {toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}
          </h4>
          <p>{toData}</p>
          <a
            href={t(`units.${category}.${toUnit}.wiki`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-info"
          >
            {forMore}
          </a>
        </div>
      )}
    </div>
  );
};

export default UnitDefinitions;
