// app/[locale]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import translations from '../../lang/locales.json';
import Converter from './components/Converter';

interface Params {
	locale: string;
}

interface PageProps {
	params: Promise<Params>;
}

export default function Home({ params }: PageProps) {
	const resolvedParams = React.use(params);
	const router = useRouter();
	const [locale, setLocale] = useState<string>('de');
	const [conversionTitle, setConversionTitle] = useState<string>('');

	useEffect(() => {
		if (resolvedParams.locale && resolvedParams.locale in translations) {
			setLocale(resolvedParams.locale);
		} else {
			const browserLocale = navigator.language.slice(0, 2);
			const newLocale = browserLocale in translations ? browserLocale : 'de';
			setLocale(newLocale);
			router.replace(`/${newLocale}`);
		}
	}, [resolvedParams.locale, router]);

	const t = translations[locale as keyof typeof translations];

	return (
		<div className="w-full bg-base-100 flex flex-col items-center py-10">
			<h1 className="text-4xl font-bold text-accent mb-6">
				{conversionTitle ? `${conversionTitle}` : t.description}
			</h1>
			<Converter onConversionChange={setConversionTitle} />
		</div>
	);
}
