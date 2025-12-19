'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Список изображений из папки public
const PRODUCTION_IMAGES = [
  '/photo_2025-12-19 22.32.34.jpeg',
  '/photo_2025-12-19 22.32.36.jpeg',
  '/photo_2025-12-19 22.32.51.jpeg',
  '/photo_2025-12-19 22.32.54.jpeg',
  '/photo_2025-12-19 22.32.56.jpeg',
  '/photo_2025-12-19 22.32.58.jpeg',
  '/photo_2025-12-19 22.33.00.jpeg',
  '/photo_2025-12-19 22.33.02.jpeg',
  '/photo_2025-12-19 22.33.03.jpeg',
];

export function ProductionGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Автоматическое листание каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PRODUCTION_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? PRODUCTION_IMAGES.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTION_IMAGES.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div 
      className="relative rounded-2xl bg-gradient-to-br from-muted to-muted/50 h-64 md:h-80 lg:h-full min-h-64 overflow-hidden group"
      aria-label="Галерея производства"
    >
      {/* Изображения */}
      <div className="relative w-full h-full">
        {PRODUCTION_IMAGES.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={src}
              alt={`Производство алюминиевых окон и дверей в Краснодаре - производство в станице Новотитаровская, Краснодарский край`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Наложение с текстом */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end">
        <div className="w-full p-6 text-center">
          <div className="text-lg font-medium text-white">Производство</div>
          <div className="text-sm text-white/80">ст. Новотитаровская</div>
        </div>
      </div>

      {/* Кнопки навигации */}
      {PRODUCTION_IMAGES.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToPrevious}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={goToNext}
            aria-label="Следующее изображение"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Индикаторы точек */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {PRODUCTION_IMAGES.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Перейти к изображению ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}


