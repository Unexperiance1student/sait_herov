import { Phone, Mail, Send, MapPin } from 'lucide-react';

const CONTACT_INFO = {
  phone: '+7 905 494 4349',
  email: 'adisyatskiy@bk.ru',
  telegram: 'alexandr_alumportl',
  address: 'Ст. Новотитаровская, Краснодарский край',
} as const;

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Логотип и описание */}
          <div>
            <div className="font-semibold text-lg text-foreground">ИП Дисяцкий</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Производство и монтаж алюминиевых конструкций в Краснодарском крае
            </p>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Контакты</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`} 
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a 
                  href={`https://t.me/${CONTACT_INFO.telegram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Send className="h-4 w-4" />
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Адрес */}
          <div>
            <h3 className="font-medium text-foreground mb-3">Адрес</h3>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              {CONTACT_INFO.address}
            </p>
          </div>
        </div>

        {/* Копирайт */}
        <div className="mt-10 pt-6 border-t text-center text-xs text-muted-foreground">
          © {currentYear} ИП Дисяцкий. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
