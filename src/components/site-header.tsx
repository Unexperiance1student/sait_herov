'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const NAV_LINKS = [
  { href: '#about', label: 'О компании' },
  { href: '#services', label: 'Услуги' },
  { href: '#contact', label: 'Контакты' },
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Логотип */}
        <Link 
          href="/" 
          className="font-semibold tracking-tight text-lg hover:opacity-80 transition-opacity"
        >
          ИП Дисяцкий
        </Link>

        {/* Desktop навигация */}
        <nav className="hidden gap-6 md:flex" aria-label="Главная навигация">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button asChild size="sm">
            <a href="#contact">Оставить заявку</a>
          </Button>
        </div>

        {/* Mobile меню */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden" aria-label="Открыть меню">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent className="bg-background" side="right">
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4" aria-label="Мобильная навигация">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={handleLinkClick}
                  className="text-sm py-2 hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Button asChild className="mt-2" onClick={handleLinkClick}>
                <a href="#contact">Оставить заявку</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}