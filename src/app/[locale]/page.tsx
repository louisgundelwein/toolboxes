// components/LandingPage.tsx
'use client';
import React from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
	return (
		<div className="hero min-h-screen bg-base-100">
			<div className="hero-content text-center">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold text-accent">
						Willkommen bei Toolboxes.app
					</h1>
					<p className="py-6 text-accent-content">
						Toolboxes.app bietet dir eine Vielzahl von nützlichen Tools – von
						Einheiten- und Dateityp-Convertern bis hin zu weiteren praktischen
						Funktionen. Entdecke, wie du deinen Alltag mit nur wenigen Klicks
						vereinfachen kannst.
					</p>
					<Link href="/de/unit-converter" className="btn btn-primary">
						Mehr erfahren
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
