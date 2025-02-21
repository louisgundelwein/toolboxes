// app/[locale]/page.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import locales from './util/locales.json';
import ToolCard from './components/Tool-Card';
import Link from 'next/link';

interface Params {
	locale: string;
}

interface PageProps {
	params: Promise<Params>;
}

type LocaleKeys = keyof typeof locales;

export default function LandingPage({ params }: PageProps) {
	// Unwrap the promise (experimental hook)
	const resolvedParams = React.use(params);
	const router = useRouter();
	// We'll use a state variable to hold the current locale.
	const [locale, setLocale] = useState<LocaleKeys>('en');
	const [texts, setTexts] = useState(locales['en']);
	const targetRef = useRef<HTMLDivElement>(null);

	const scrollToTarget = () => {
		targetRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		if (resolvedParams.locale && resolvedParams.locale in locales) {
			const loc = resolvedParams.locale as LocaleKeys;
			setLocale(loc);
			setTexts(locales[loc]);
		} else {
			const browserLocale = navigator.language.slice(0, 2);
			const newLocale = (
				browserLocale in locales ? browserLocale : 'en'
			) as LocaleKeys;
			setLocale(newLocale);
			setTexts(locales[newLocale]);
			router.replace(`/${newLocale}`);
		}
	}, [resolvedParams.locale, router]);

	return (
		<div className="bg-base-100 flex flex-col py-10 w-full">
			{/* Hero Section */}
			<section className="hero">
				<div className="hero-content flex-col text-center">
					<h1 className="text-6xl font-extrabold text-accent mb-4">
						{texts.heroTitle}
					</h1>
					<p className="text-xl text-info mb-8 max-w-2xl mx-auto">
						{texts.heroSubtitle}
					</p>
					<p className="text-lg text-base-content mb-8 max-w-3xl mx-auto">
						{texts.heroDescription}
					</p>
					<p className="text-md text-secondary mb-8 max-w-3xl mx-auto">
						Use the burger menu in the top-right corner to choose your tools,
						change the theme, or switch the language between English, German,
						French, Spanish, Portuguese, Ukrainian, and Chinese.
					</p>
					<button onClick={scrollToTarget} className="btn btn-primary">
						{texts.ctaButton}
					</button>
				</div>
			</section>

			{/* Tools Overview Section */}
			<section ref={targetRef} className="py-12 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-accent mb-8 text-center">
						{texts.toolsOverviewTitle}
					</h2>
					<p className="text-lg text-info mb-8 text-center">
						{texts.toolsOverviewSubtitle}
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						<ToolCard
							title={texts.toolCard1Title}
							description={texts.toolCard1Description}
							href={`/${locale}/unit-converter`}
							lang={locale}
						/>
						<ToolCard
							title={texts.toolCard2Title}
							description={texts.toolCard2Description}
							href={`/${locale}/file-converter`}
							lang={locale}
						/>
						<ToolCard
							title={texts.toolCard3Title}
							description={texts.toolCard3Description}
							href={`/${locale}/calculator`}
							lang={locale}
						/>
					</div>
				</div>
			</section>

			{/* Additional Information Section */}
			<section className="py-12 px-4 bg-base-100 rounded-md">
				<div className="max-w-4xl mx-auto text-center">
					<h3 className="text-3xl font-bold text-accent mb-4">
						{texts.additionalTitle}
					</h3>
					<p className="text-lg text-info mb-8">
						{texts.additionalDescription}
					</p>
					<Link
						className="btn btn-secondary"
						href={'https://github.com/louisgundelwein/toolboxes'}
					>
						{texts.learnMoreButton}
					</Link>
				</div>
			</section>
		</div>
	);
}
