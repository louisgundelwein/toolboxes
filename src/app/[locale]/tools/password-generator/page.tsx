'use client';

import React from 'react';
import PasswordGenerator from './components/PasswordGenerator';
import { useTranslations } from 'next-intl';

export default function PasswordGeneratorPage() {
  const t = useTranslations('PasswordGeneratorPage');

  return (
    <div className="flex w-full flex-col items-center bg-base-100 py-10">
      <h1 className="mb-6 text-4xl font-bold text-accent">
        {t('description') || 'Password Generator'}
      </h1>
      <PasswordGenerator />
    </div>
  );
}
