import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { ContactForm } from '@/components/contact-form';
import { Separator } from '@/components/ui/separator';

export default function Page() {
  return (
    <>
      <Hero />
      
      <div className="container px-4 md:px-6 py-16 md:py-20">
        <About />
      </div>

      <Separator className="container" />

      <div className="container px-4 md:px-6 py-16 md:py-20">
        <Services />
      </div>

      <div className="container px-4 md:px-6 py-16 md:py-20 bg-muted/30">
        <ContactForm />
      </div>
    </>
  );
}