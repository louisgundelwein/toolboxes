// app/[locale]/tools/unit-converter/page.tsx
'use client';

import React from 'react';
import Converter from './components/Converter';
import { useTranslations } from 'next-intl';

export default function UnitConverterPage() {
  const t = useTranslations('UnitConverterPage');

  return (
    <div className="flex w-full flex-col items-center bg-base-100 py-10">
      <h1 className="mb-6 text-4xl font-bold text-accent">
        {t('description') || 'Unit Converter'}
      </h1>
      <Converter />
    </div>
  );
}
