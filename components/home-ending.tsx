import Link from 'next/link';
import { starPath, Twinkles } from '@/components/twinkles';

const questions = [
  ['Are your puppies vaccinated and health-checked?', 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.'],
  ['Can I meet a puppy before I decide?', 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.'],
  ['Can I take my puppy home the same day?', 'Local puppies are available immediately, so you can take your puppy home the same day.'],
];

const nightStars = [[8, 12, 16.2], [22, 30, 9], [41, 8, 12.6], [57, 22, 8.1], [72, 6, 14.4], [88, 18, 10.8], [95, 42, 9], [4, 58, 10.8], [34, 70, 7.2], [63, 84, 9.9], [83, 66, 12.6]] as const;

export function HomeEnding() {
  return (
    <>
      <section className="tp-scene tp-night" data-tone="dark" aria-labelledby="questions-title">
        <div className="tp-night__stars" aria-hidden="true"><Twinkles stars={nightStars} /></div>
        <div className="tp-night__grid gutter">
          <div className="tp-night__intro">
            <h2 id="questions-title" className="font-plush text-huge">Questions, answered</h2>
            <Link className="btn btn-ghost tp-night__cta" href="/faq">Read all questions</Link>
            <div className="tp-night__pup" aria-hidden="true">
              <span className="tp-night__wonder font-plush">?</span>
              <img className="tp-night__teddy" src="/media/teddy-sit.svg" alt="" />
            </div>
          </div>
          <dl className="tp-night__list">
            {questions.map(([question, answer]) => (
              <div key={question} className="tp-qa">
                <dt className="font-plush tp-qa__q">
                  <svg viewBox="0 0 40 40" className="tp-qa__star" aria-hidden="true"><path d={starPath} fill="currentColor" /></svg>
                  {question}
                </dt>
                <dd className="tp-qa__a">{answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="tp-scene tp-home" data-tone="dark" aria-labelledby="cta-title">
        <div className="tp-home__copy gutter">
          <h2 id="cta-title" className="font-plush text-huge">Ready to meet your new best friend?</h2>
          <p className="tp-home__lede">Bring home a healthy, happy teacup or designer puppy with expert guidance every step of the way. We help you find the right match and ensure a smooth, safe delivery across the UAE.</p>
        </div>
        <div className="tp-house">
          <span className="tp-house__plant tp-house__plant--left" aria-hidden="true" />
          <span className="tp-house__lamp" aria-hidden="true" />
          <div className="tp-house__doorway">
            <span className="tp-house__inside"><img src="/media/welcome-max.webp" alt="Max, waiting inside" loading="lazy" /></span>
            <span className="tp-house__door" aria-hidden="true">
              <span className="tp-house__peep" />
              <span className="tp-house__knob" />
            </span>
          </div>
          <span className="tp-house__plant tp-house__plant--right" aria-hidden="true" />
          <span className="tp-house__mat font-scrawl">welcome home</span>
          <img className="tp-house__teddy" src="/media/teddy-bow.svg" alt="" />
        </div>
        <div className="tp-home__actions gutter">
          <Link href="/contact" className="btn btn-whatsapp">Enquire on WhatsApp</Link>
          <Link href="/contact" className="btn btn-ghost tp-home__ghost">Visit &amp; contact</Link>
        </div>
      </section>
    </>
  );
}
