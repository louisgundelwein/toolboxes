// components/ToolsDropdown.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import locales from '../[locale]/util/locales.json';

type LocaleKeys = keyof typeof locales;

const ToolsDropdown: React.FC = () => {
	const { locale } = useParams() as { locale?: string };

	// Standard-Sprache auf 'en' setzen, falls locale nicht gültig ist
	const validLocale =
		locale && locales.hasOwnProperty(locale) ? (locale as LocaleKeys) : 'en';
	const texts = locales[validLocale];

	// Items mit lokalisierten Labels und Links, die das Locale enthalten (z. B. /de/unit-converter)
	const items = [
		{
			label: texts.toolCard1Title,
			href: `/${validLocale}/unit-converter`,
		},
		{
			label: texts.toolCard2Title,
			href: `/${validLocale}/file-converter`,
		},
		{
			label: texts.toolCard3Title,
			href: `/${validLocale}/password-generator`,
		},
		{
			label: texts.toolCard4Title,
			href: `/${validLocale}/qr-code-generator`,
		},
		{
			label: texts.toolCard5Title,
			href: `/${validLocale}/tip-calculator`,
		},
		{
			label: texts.toolCard6Title,
			href: `/${validLocale}/json-validator`,
		},
	];

	return (
		<div className="dropdown dropdown-bottom dropdown-end">
			<div tabIndex={0} role="button" className="btn m-1">
				Tools
				<svg
					width="12px"
					height="12px"
					className="inline-block h-2 w-2 fill-current opacity-60 ml-1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 2048 2048"
				>
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
				</svg>
			</div>
			<ul
				tabIndex={0}
				className="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl"
			>
				{items.map((item, index) => (
					<li key={index}>
						<Link href={item.href}>
							<span className="btn btn-sm btn-block btn-ghost justify-start">
								{item.label}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ToolsDropdown;
