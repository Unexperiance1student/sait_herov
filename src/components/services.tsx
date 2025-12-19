import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DoorOpen, PanelsTopLeft, PanelRight, Square, View, type LucideIcon } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  { 
    id: 'windows',
    icon: Square, 
    title: 'Окна', 
    description: 'Остекление домов и балконов. Тёплые и холодные алюминиевые системы для любых задач.' 
  },
  { 
    id: 'doors',
    icon: DoorOpen, 
    title: 'Двери', 
    description: 'Входные и межкомнатные алюминиевые двери. Надёжность и современный дизайн.' 
  },
  { 
    id: 'sliding',
    icon: PanelsTopLeft, 
    title: 'Раздвижные системы', 
    description: 'Перегородки, террасы, портальные решения. Максимум света и пространства.' 
  },
  { 
    id: 'facades',
    icon: PanelRight, 
    title: 'Фасадные системы', 
    description: 'Витражи и стеклянные фасады. Современный облик вашего здания.' 
  },
  { 
    id: 'turnkey',
    icon: View, 
    title: 'Остекление под ключ', 
    description: 'Полный цикл: замер, проект, производство и монтаж. Без лишних хлопот.' 
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading">
      <h2 
        id="services-heading" 
        className="text-2xl md:text-3xl font-semibold tracking-tight mb-8"
      >
        Производство и монтаж алюминиевых конструкций в Краснодаре
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ id, icon: Icon, title, description }) => (
          <Card 
            key={id} 
            className="hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Icon 
                    className="h-5 w-5 text-primary/70" 
                    aria-hidden="true" 
                  />
                </div>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}