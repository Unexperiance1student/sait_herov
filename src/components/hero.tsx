import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const HERO_FEATURES = [
  'Собственное производство',
  'Проекты под ключ',
  'Гарантия качества',
] as const;

export function Hero() {
  return (
    <section className="relative hero-bg overflow-hidden" aria-labelledby="hero-heading">
      <div className="container px-4 md:px-6 py-20 md:py-28 grid items-center gap-10 lg:grid-cols-2">
        {/* Текстовый блок */}
        <div className="max-w-xl">
          <h1 
            id="hero-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            Производство алюминиевых окон и дверей{' '}
            <span className="text-primary/80">в Краснодаре и Краснодарском крае</span>
          </h1>
          
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Собственное производство алюминиевых конструкций в Краснодарском крае. Окна, двери, раздвижные и фасадные системы. Профили: Красал, Алнэо, Алрокс, Алютех. Проекты под ключ от замера до монтажа.
          </p>

          {/* Преимущества */}
          <ul className="mt-6 flex flex-wrap gap-4">
            {HERO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-600 shrink-0" aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
          
          {/* CTA кнопки */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <a href="#contact">
                Оставить заявку
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Смотреть услуги</a>
            </Button>
          </div>
        </div>

        {/* Визуальный блок */}
        <div 
          className="relative h-[280px] sm:h-[340px] md:h-[420px] hidden lg:block"
          aria-hidden="true"
        >
          {/* Декоративные круги */}
          <div className="absolute right-6 top-6 size-24 rounded-full bg-blue-500/20 blur-2xl floaty" />
          <div 
            className="absolute bottom-4 left-8 size-32 rounded-full bg-indigo-500/20 blur-2xl floaty" 
            style={{ animationDelay: '-2s' }} 
          />
          
          {/* Основной блок с изображением/placeholder */}
          <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-white to-white/60 shadow-xl ring-1 ring-black/5 overflow-hidden">
            {/* SVG декор алюминиевого профиля */}
            <svg 
              viewBox="0 0 400 400" 
              className="absolute inset-0 w-full h-full opacity-10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="50" y="50" width="300" height="300" rx="8" stroke="currentColor" strokeWidth="4" />
              <rect x="70" y="70" width="120" height="120" rx="4" stroke="currentColor" strokeWidth="2" />
              <rect x="210" y="70" width="120" height="120" rx="4" stroke="currentColor" strokeWidth="2" />
              <rect x="70" y="210" width="260" height="120" rx="4" stroke="currentColor" strokeWidth="2" />
              <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="6" />
              <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="6" />
            </svg>
            
            {/* Текст placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="text-4xl font-bold text-primary/20">AL</div>
              <div className="text-sm text-muted-foreground/50 mt-2">Алюминиевые конструкции</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
