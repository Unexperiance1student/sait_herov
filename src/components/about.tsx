import { Factory, Clock, Shield, Award } from 'lucide-react';
import { ProductionGallery } from '@/components/production-gallery';

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
      {/* Визуальный блок с галереей */}
      <ProductionGallery />

      {/* Текстовый блок */}
      <div>
        <h2 
          id="about-heading" 
          className="text-2xl md:text-3xl font-semibold tracking-tight"
        >
          Производство алюминиевых конструкций в Краснодаре и Краснодарском крае
        </h2>
        
        <p className="mt-4 text-muted-foreground leading-relaxed">
          <strong className="text-foreground">ИП Дисяцкий</strong> — собственное производство алюминиевых 
          конструкций любой сложности в Краснодарском крае: окна, двери, фасадные и раздвижные системы. 
          Работаем с профилями Красал, Алнэо, Алрокс, Алютех.
        </p>
        
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Наше производство расположено в станице Новотитаровская (Краснодарский край). 
          Обслуживаем частных клиентов в Краснодаре и по всему Краснодарскому краю, коммерческие объекты и застройщиков. 
          Выполняем проекты под ключ: от замера до монтажа. Сроки производства — от 3 дней.
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