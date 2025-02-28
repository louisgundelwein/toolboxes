import { Metadata } from 'next'

type Props = {
  params: { locale: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `QR Code Generator - Toolboxes.app`,
    description: 'Create QR codes quickly and easily for URLs, text, and more.',
    alternates: {
      canonical: `https://toolboxes.app/${params.locale}/qr-code-generator`,
      languages: {
        'en': `https://toolboxes.app/en/qr-code-generator`,
        'de': `https://toolboxes.app/de/qr-code-generator`,
        'fr': `https://toolboxes.app/fr/qr-code-generator`,
        'es': `https://toolboxes.app/es/qr-code-generator`,
        'uk': `https://toolboxes.app/uk/qr-code-generator`,
        'zh': `https://toolboxes.app/zh/qr-code-generator`,
        'pt': `https://toolboxes.app/pt/qr-code-generator`,
        'mn': `https://toolboxes.app/mn/qr-code-generator`,
      }
    }
  }
}

export default function QRCodeGeneratorPage() {
  return (
    <div className="w-full bg-base-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-accent mb-6">
        QR Code Generator
      </h1>
    </div>
  );
}
