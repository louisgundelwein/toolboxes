import { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `QR Code Generator - Toolboxes.app`,
    description: 'Create QR codes quickly and easily for URLs, text, and more.',
    alternates: {
      canonical: `https://toolboxes.app/${locale}/qr-code-generator`,
      languages: {
        en: `https://toolboxes.app/en/qr-code-generator`,
        de: `https://toolboxes.app/de/qr-code-generator`,
        fr: `https://toolboxes.app/fr/qr-code-generator`,
        es: `https://toolboxes.app/es/qr-code-generator`,
        uk: `https://toolboxes.app/uk/qr-code-generator`,
        zh: `https://toolboxes.app/zh/qr-code-generator`,
        pt: `https://toolboxes.app/pt/qr-code-generator`,
        mn: `https://toolboxes.app/mn/qr-code-generator`,
      },
    },
  };
}

export default function QRCodeGeneratorPage() {
  return (
    <div className="flex w-full flex-col items-center bg-base-100 py-10">
      <h1 className="mb-6 text-4xl font-bold text-accent">QR Code Generator</h1>
    </div>
  );
}
