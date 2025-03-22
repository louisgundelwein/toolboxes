// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AdSense from './components/ads';
import NavBar from './components/navbar';
import Footer from './components/footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Advanced Toolbox for Developers, Designers, and Enthusiasts',
  description:
    'Toolboxes.app offers a comprehensive suite of advanced tools for developers, designers, and creative professionals to boost productivity.',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params?: { locale?: string };
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locale = params?.locale || 'en';

  return (
    <html lang={locale} className="min-h-screen" data-theme="dim">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6105108199502947" />
        <AdSense publisherId="6105108199502947" />
        <Analytics />
        <SpeedInsights />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <div className="flex min-h-screen flex-col">
          <NavBar />
          <main className="flex flex-grow bg-base-100">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
