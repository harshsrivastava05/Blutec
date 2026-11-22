import Link from 'next/link';
import { Twinkles } from '@/components/twinkles';

const stars = [[6, 18, 12.6], [14, 42, 8.4], [23, 12, 9.8], [31, 30, 7], [44, 9, 11.2], [52, 36, 7.7], [63, 15, 10.5], [71, 40, 7], [92, 33, 8.4]] as const;
const explore = [
  ['Available puppies', '/puppies'],
  ['Gone home', '/gone-home'],
  ['Happy families', '/happy-families'],
  ['How it works', '/how-it-works'],
  ['Delivery & collection', '/how-it-works#delivery'],
  ['FAQ', '/faq'],
  ['Visit & contact', '/contact'],
];

function TeddyBasket() {
  return (
    <div className="tp-basket">
      <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__back">
        <ellipse cx="212" cy="145" rx="96" ry="12" className="tp-basket__hollow" />
        <path d="M116 145 A96 12 0 0 1 308 145" className="tp-basket__rim-line" />
        <path d="M116 145 A96 12 0 0 1 308 145" className="tp-basket__rim" />
      </svg>
      <img src="/media/teddy-snug.svg" className="tp-basket__pup" alt="Teddy, sitting snug in his basket" />
      <svg aria-hidden="true" viewBox="0 0 300 240" className="tp-basket__front">
        <path d="M116 145 C118 180 126 214 138 232 L286 232 C298 214 306 180 308 145 A96 12 0 0 1 116 145 Z" className="tp-basket__body" />
        <path d="M121 178 Q212 197 303 178 M127 206 Q212 223 297 206" className="tp-basket__weave" />
        <path d="M150 164 L158 230 M182 168 L185 232 M212 169 V232 M242 168 L239 232 M274 164 L266 230" className="tp-basket__weave tp-basket__weave--stakes" />
        <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim-line" />
        <path d="M116 145 A96 12 0 0 0 308 145" className="tp-basket__rim" />
      </svg>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="tp-footer">
      <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="tp-footer__hill">
        <path d="M0 80V44c120-30 240-44 360-30s240 46 360 34 240-58 360-46 240 40 360 26v52z" />
      </svg>
      <div className="tp-footer__sky" aria-hidden="true">
        <Twinkles stars={stars} />
        <span className="tp-moon" />
      </div>
      <div className="tp-footer__grid tp-wide gutter">
        <div className="tp-footer__intro">
          <p className="font-plush text-big">Home, at last.</p>
          <p>TeddyPups U.A.E. is a Dubai-based brand specializing in miniature puppies, offering premium services and worldwide shipping.</p>
        </div>
        <div className="tp-footer__basket"><TeddyBasket /></div>
        <nav className="tp-footer__explore" aria-label="Explore">
          <h2 className="font-scrawl">Explore</h2>
          <ul>{explore.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
        </nav>
        <div className="tp-footer__contact">
          <h2 className="font-scrawl">Say hello</h2>
          <ul>
            <li><Link href="/contact">WhatsApp +971 50 000 0000</Link></li>
            <li><a href="mailto:info@instabizweb.com">info@instabizweb.com</a></li>
            <li>Downtown Dubai, United Arab Emirates</li>
          </ul>
          <ul className="tp-footer__social">
            {['Instagram', 'TikTok', 'Facebook'].map(label => <li key={label}><a href="https://www.instabizweb.com/" target="_blank" rel="noopener noreferrer">{label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="tp-footer__bottom tp-wide gutter">
        <span><img src="/media/logo.webp" width={36} height={36} alt="" /> © 2026 TeddyPups U.A.E.</span>
        <span className="font-scrawl">every puppy is family</span>
      </div>
    </footer>
  );
}
