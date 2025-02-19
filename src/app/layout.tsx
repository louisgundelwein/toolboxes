import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AdSense from './components/ads';
import NavBar from './components/navbar';
import Footer from './components/footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Toolboxes.app',
	description: 'An advanced toolbox for everyone.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" data-theme="dark">
			<head>
				<meta name="google-adsense-account" content="ca-pub-6105108199502947" />
				<AdSense publisherId="6105108199502947" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
			>
				<div className="flex flex-col h-full">
          <NavBar />
					<main className="flex-grow h-full">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
