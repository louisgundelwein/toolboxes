'use client';

import React, { useRef } from 'react';
import ToolCard from './components/Tool-Card';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function LandingPage() {
  const t = useTranslations('HomePage');
  const targetRef = useRef<HTMLDivElement>(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex w-full flex-col bg-base-100 py-10">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content flex-col text-center">
          <h1 className="mb-4 text-6xl font-extrabold text-accent">{t('heroTitle')}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-info">{t('heroSubtitle')}</p>
          <p className="mx-auto mb-8 max-w-3xl text-lg text-base-content">{t('heroDescription')}</p>
          <p className="text-md mx-auto mb-8 max-w-3xl text-secondary">{t('usageInstructions')}</p>
          <button onClick={scrollToTarget} className="btn btn-primary">
            {t('ctaButton')}
          </button>
        </div>
      </section>

      {/* Tools Overview Section */}
      <section ref={targetRef} className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-4xl font-bold text-accent">
            {t('toolsOverviewTitle')}
          </h2>
          <p className="mb-8 text-center text-lg text-info">{t('toolsOverviewSubtitle')}</p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            <ToolCard
              title={t('toolCard1Title')}
              description={t('toolCard1Description')}
              href={`/unit-converter`}
            />
            <ToolCard
              title={t('toolCard2Title')}
              description={t('toolCard2Description')}
              href={`/file-converter`}
            />
            <ToolCard
              title={t('toolCard3Title')}
              description={t('toolCard3Description')}
              href={`/password-generator`}
            />
            <ToolCard
              title={t('toolCard4Title')}
              description={t('toolCard4Description')}
              href={`/qr-code-generator`}
            />
            <ToolCard
              title={t('toolCard5Title')}
              description={t('toolCard5Description')}
              href={`/tip-calculator`}
            />
            <ToolCard
              title={t('toolCard6Title')}
              description={t('toolCard6Description')}
              href={`/json-validator`}
            />
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="rounded-md bg-base-100 px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-4 text-3xl font-bold text-accent">{t('additionalTitle')}</h3>
          <p className="mb-8 text-lg text-info">{t('additionalDescription')}</p>
          <Link className="btn btn-secondary" href={'https://github.com/louisgundelwein/toolboxes'}>
            {t('learnMoreButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
