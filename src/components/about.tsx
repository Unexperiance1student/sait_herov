import { Factory, Clock, Shield, Award } from 'lucide-react';

const ABOUT_FEATURES = [
  { 
    id: 'profiles', 
    icon: Factory,
    text: 'Профили: Красал, Алнэо, Алрокс, Алютех' 
  },
  { 
    id: 'timing', 
    icon: Clock,
    text: 'Сроки производства — от 3 дней' 
  },
  { 
    id: 'quality', 
    icon: Shield,
    text: 'Работа по ГОСТ, гарантия качества' 
  },
  { 
    id: 'experience', 
    icon: Award,
    text: 'Многолетний опыт работы' 
  },
] as const;

export function About() {
  return (
    <section id="about" className="grid gap-8 lg:grid-cols-2 items-center" aria-labelledby="about-heading">
      {/* Визуальный блок */}
      <div 
        className="relative rounded-2xl bg-gradient-to-br from-muted to-muted/50 h-64 md:h-80 lg:h-full min-h-64 overflow-hidden"
        aria-hidden="true"
      >
        {/* Декоративный паттерн */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Центральный контент */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <Factory className="h-16 w-16 mx-auto text-primary/30" />
            <div className="mt-4 text-lg font-medium text-primary/50">Производство</div>
            <div className="text-sm text-muted-foreground">ст. Новотитаровская</div>
          </div>
        </div>
      </div>

      {/* Текстовый блок */}
      <div>
        <h2 
          id="about-heading" 
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          О компании
        </h2>
        
        <p className="mt-4 text-muted-foreground leading-relaxed">
          <strong className="text-foreground">ИП Дисяцкий</strong> — производим алюминиевые 
          конструкции любой сложности: окна, двери, фасадные и раздвижные системы.
        </p>
        
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Производство расположено в станице Новотитаровская (Краснодарский край). 
          Обслуживаем частных клиентов, коммерческие объекты и застройщиков. 
          Выполняем проекты под ключ: от замера до монтажа.
        </p>
        
        <p className="mt-3 text-muted-foreground leading-relaxed">
          В приоритете — <strong className="text-foreground">качество</strong>, 
          <strong className="text-foreground"> скорость</strong> и 
          <strong className="text-foreground"> индивидуальный подход</strong>.
        </p>

        {/* Преимущества */}
        <ul className="mt-6 grid gap-3">
          {ABOUT_FEATURES.map(({ id, icon: Icon, text }) => (
            <li key={id} className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="p-1.5 rounded-md bg-primary/5">
                <Icon className="h-4 w-4 text-primary/70" aria-hidden="true" />
              </div>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}