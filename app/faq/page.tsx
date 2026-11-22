import { FaqBoard } from '@/components/faq-board';

export const metadata = { title: 'Questions & answers | TeddyPups U.A.E.' };

export default function FAQ() {
  return (
    <main id="main" className="faq-reference">
      <section className="tp-scene tp-faqroom" data-tone="dark" aria-labelledby="faq-title">
        <div className="tp-wide gutter faq-reference__content">
          <header className="faq-reference__intro">
            <h1 id="faq-title" className="font-plush text-giant">Questions &amp; answers</h1>
            <p className="text-lede">Can&apos;t find what you&apos;re looking for? Message us on WhatsApp — our team is available 24/7.</p>
          </header>
          <div className="faq-reference__board"><FaqBoard /></div>
        </div>
      </section>
    </main>
  );
}
