import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Производство алюминиевых окон и дверей в Краснодаре и Краснодарском крае | ИП Дисяцкий',
  description:
    'Собственное производство алюминиевых окон, дверей, раздвижных и фасадных систем в Краснодаре и Краснодарском крае. Проекты под ключ: от замера до монтажа. Профили: Красал, Алнэо, Алрокс, Алютех. Сроки от 3 дней. Гарантия качества.',
  metadataBase: new URL('https://alumpro.vercel.app'),
  keywords: [
    'производство алюминиевых окон краснодар',
    'алюминиевые окна краснодар',
    'алюминиевые двери краснодар',
    'производство алюминиевых конструкций краснодарский край',
    'алюминиевые окна краснодарский край',
    'остекление краснодар',
    'фасадные системы краснодар',
    'раздвижные системы краснодар',
    'алюминиевые конструкции краснодар',
    'окна под ключ краснодар',
    'Красал краснодар',
    'Алнэо краснодар',
    'Алрокс краснодар',
    'Алютех краснодар',
    'производство окон новотитаровская',
    'алюминиевые окна юфо',
  ],
  authors: [{ name: 'ИП Дисяцкий' }],
  creator: 'ИП Дисяцкий',
  publisher: 'ИП Дисяцкий',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    title: 'Производство алюминиевых окон и дверей в Краснодаре | ИП Дисяцкий',
    description:
      'Собственное производство алюминиевых окон, дверей, раздвижных и фасадных систем в Краснодаре и Краснодарском крае. Проекты под ключ. Сроки от 3 дней.',
    siteName: 'ИП Дисяцкий - Производство алюминиевых конструкций',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Производство алюминиевых окон и дверей в Краснодаре | ИП Дисяцкий',
    description:
      'Собственное производство алюминиевых конструкций в Краснодаре и Краснодарском крае. Проекты под ключ.',
  },
  alternates: {
    canonical: '/',
  },
  category: 'Производство алюминиевых конструкций',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ИП Дисяцкий - Производство алюминиевых окон и дверей в Краснодаре',
    description: 'Собственное производство алюминиевых окон, дверей, раздвижных и фасадных систем в Краснодаре и Краснодарском крае. Проекты под ключ от замера до монтажа.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'станица Новотитаровская',
      addressRegion: 'Краснодарский край',
      addressCountry: 'RU',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Краснодар',
      },
      {
        '@type': 'State',
        name: 'Краснодарский край',
      },
      {
        '@type': 'GeoRegion',
        name: 'ЮФО',
      },
    ],
    serviceType: [
      'Производство алюминиевых окон',
      'Производство алюминиевых дверей',
      'Фасадные системы',
      'Раздвижные системы',
      'Остекление под ключ',
      'Монтаж алюминиевых конструкций',
    ],
    brand: {
      '@type': 'Brand',
      name: 'ИП Дисяцкий',
    },
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Производство алюминиевых окон в Краснодаре',
          description: 'Производство и монтаж алюминиевых окон в Краснодаре и Краснодарском крае',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Производство алюминиевых дверей в Краснодаре',
          description: 'Производство и монтаж алюминиевых дверей в Краснодаре и Краснодарском крае',
        },
      },
    ],
    keywords: 'производство алюминиевых окон краснодар, алюминиевые двери краснодар, производство алюминиевых конструкций краснодарский край',
  };

  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}