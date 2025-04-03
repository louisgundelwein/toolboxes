'use client';

import React from 'react';
import TipCalculator from './components/TipCalculator';
import { useTranslations } from 'next-intl';

export default function TipCalculatorPage() {
  const t = useTranslations('TipCalculatorPage');

  return (
    <div className="flex w-full flex-col items-center bg-base-100 py-10">
      <h1 className="mb-6 text-4xl font-bold text-accent">
        {t('description') || 'Tip Calculator'}
      </h1>
      <TipCalculator />
    </div>
  );
}
