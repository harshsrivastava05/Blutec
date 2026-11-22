import Link from 'next/link';
import { pawPath } from '@/lib/paw';

const steps = [
  { title: 'Choose your breed', body: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { title: 'Get photos & details', body: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.' },
  { title: 'Secure & safe delivery', body: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
];

const breeds = ['Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];
const snaps = ['54.3% 48.3%', '46% 44.4%', '43.7% 40.2%', '45.3% 44.4%'];

export function PuppyJourney() {
  return (
    <section className="tp-scene tp-chat" aria-labelledby="journey-title">
      <div className="tp-chat__grid gutter">
        <div className="tp-chat__story">
          <h2 id="journey-title" className="font-plush text-huge">Your puppy journey</h2>
          <p className="text-lede">A premium, step-by-step concierge experience. We make adoption simple, secure, and purely joyful.</p>
          <ol className="tp-chat__steps">
            {steps.map(({ title, body }, index) => (
              <li className="tp-chat__step" key={title}>
                <span className="tp-chat__num font-plush" aria-hidden="true">{index + 1}</span>
                <h3 className="tp-chat__title font-plush">{title}</h3>
                <p className="tp-chat__text">{body}</p>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="btn btn-ghost tp-chat__cta">How it works</Link>
        </div>
        <div className="tp-chat__side">
          <div className="tp-phone" aria-label="Example puppy enquiry conversation">
            <div className="tp-phone__bar">
              <img className="tp-phone__avatar" src="/media/journey-avatar.webp" alt="" />
              <div><b className="tp-phone__name">TeddyPups U.A.E.</b><small className="tp-phone__status">online</small></div>
            </div>
            <div className="tp-phone__screen">
              <p className="tp-msg tp-msg--me">Hi TeddyPups! I&apos;d love to know more about your puppies.</p>
              <div className="tp-msg-group">
                <div className="tp-msg tp-msg--them">
                  <p>{steps[0].body}</p>
                  <div className="tp-chips">
                    {breeds.map(breed => <Link key={breed} href={'/puppies?breed=' + breed.toLowerCase().replace(' ', '-')}>{breed}</Link>)}
                  </div>
                </div>
              </div>
              <div className="tp-msg-group">
                <div className="tp-msg tp-msg--them tp-msg--media">
                  <div className="tp-snaps">
                    {snaps.map((position, index) => (
                      <span className="tp-snaps__one" key={position}>
                        <img src={'/media/journey-snap-' + (index + 1) + '.webp'} alt="" style={{ objectPosition: position }} />
                      </span>
                    ))}
                  </div>
                </div>
                <p className="tp-msg tp-msg--them">{steps[1].body}</p>
              </div>
              <div className="tp-msg-group">
                <div className="tp-msg tp-msg--them">
                  <p>{steps[2].body}</p>
                  <svg viewBox="0 0 220 70" className="tp-route" aria-hidden="true">
                    <path d="M14 52 C60 6 120 70 170 28" className="tp-route__line" />
                    <circle cx="14" cy="52" r="5" className="tp-route__dot" />
                    <path d="M164 32 l12 -12 l12 12 v14 h-24 z" className="tp-route__home" />
                    <path d="M176 42 c-2-3-7-2-6 2c1 3 6 5 6 5s5-2 6-5c1-4-4-5-6-2z" className="tp-route__heart" />
                    <path d={pawPath} transform="translate(70 22) scale(.3) rotate(70 32 32)" className="tp-route__paw" />
                    <path d={pawPath} transform="translate(104 38) scale(.3) rotate(100 32 32)" className="tp-route__paw" />
                  </svg>
                </div>
              </div>
              <div className="tp-typing" aria-hidden="true"><span /><span /><span /></div>
            </div>
            <Link href="/contact" className="tp-phone__compose">
              Say hello on WhatsApp
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20l18-8L3 4v6l12 2-12 2z" /></svg>
            </Link>
          </div>
          <img className="tp-chat__teddy" src="/media/teddy-sit.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
