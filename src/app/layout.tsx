import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'ИП Дисяцкий — Алюминиевые окна, двери и фасады',
  description:
    'Производство и монтаж алюминиевых окон, дверей, раздвижных и фасадных систем в Краснодарском крае. Проекты под ключ: от замера до монтажа. Профиль: Красал, Алнэо, Алрокс, Алютех.',
  metadataBase: new URL('https://example.com'),
  openGraph: {
    title: 'ИП Дисяцкий — Алюминиевые конструкции',
    description:
      'Окна, двери, раздвижные и фасадные системы. Собственное производство: ст. Новотитаровская, Краснодарский край.',
    type: 'website',
  },
  keywords: ['алюминиевые окна', 'алюминиевые двери', 'фасады', 'остекление', 'Краснодар', 'ЮФО', 'Красал', 'Алнэо', 'Алрокс', 'Алютех'],
  authors: [{ name: 'ИП Дисяцкий' }],
  robots: 'index, follow',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
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