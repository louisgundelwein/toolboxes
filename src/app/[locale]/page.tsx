// LandingPage.tsx
import React from 'react';
import ToolCard from './components/Tool-Card';

export default function LandingPage() {
	return (
		<div className="bg-base-100 flex flex-col py-10 w-full">
			{/* Hero Section */}
			<section className="hero">
				<div className="hero-content flex-col text-center">
					<h1 className="text-6xl font-extrabold text-accent mb-4">
						Toolboxes
					</h1>
					<p className="text-xl text-info mb-8 max-w-2xl mx-auto">
						Entdecke moderne Tools, die deinen Alltag vereinfachen – von
						präzisen Einheiten-Convertern bis hin zu vielseitigen
						Dateityp-Konvertern und vielem mehr.
					</p>
				</div>
			</section>

			{/* Tools Übersicht */}
			<section className="py-12 px-4">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-4xl font-bold text-accent mb-8 text-center">
						Unsere Tools im Überblick
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <ToolCard title="Einheiten-Converter" description="Konvertiere Längen, Gewichte, Temperaturen und mehr im Handumdrehen." href="/de/unit-converter" />
            <ToolCard title="Dateityp-Konverter" description="Wandle Dateien in verschiedene Formate um – schnell und zuverlässig." href="/de/file-converter" />
            <ToolCard title="Online-Rechner" description="Rechne Finanz- und technische Werte mit unseren modernen Rechnern." href="/de/calculator" />
					</div>

				</div>
			</section>
		</div>
	);
}
