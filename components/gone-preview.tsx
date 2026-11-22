import Link from 'next/link';
import { gone } from '@/lib/puppies';
import type { CSSProperties } from 'react';
import { goneArtwork } from '@/lib/gone-artwork';

const positions = ['52.8% 46.2%', '52.1% 38%', '50.3% 43.2%', '47.9% 41.8%', '52.3% 51.6%'];
const tilts = [-.63, .28, -.47, .31, 2.49];

export function GonePreview() {
  return (
    <section className="gone-strip" aria-labelledby="gone-title">
      <div className="gone-strip__inner">
        <div className="gone-strip__intro" data-gone-reveal>
          <h2 id="gone-title">Already gone home</h2>
          <p>These puppies have found their families.</p>
          <Link href="/gone-home" className="btn btn-primary">See the puppies who&apos;ve gone home</Link>
        </div>
        <ul className="gone-strip__row" aria-label="Some puppies who have gone home">
          {gone.slice(0, 5).map((puppy, index) => (
            <li key={puppy.slug}>
              <Link
                href={'/puppies/' + puppy.slug}
                className="gone-sketch"
                data-gone-reveal
                aria-label={puppy.name + ', ' + puppy.breed + ', ' + puppy.sex + ', ' + puppy.age + ', gone home'}
                style={{ '--tilt': tilts[index] + 'deg', '--delay': index * 70 + 'ms' } as CSSProperties}
              >
                <span className="gone-sketch__frame">
                  <img className="gone-sketch__wash" src={'/media/gone-' + (index + 1) + '-wash.svg'} alt="" />
                  <span className="gone-sketch__photo">
                    <img src={puppy.image} alt="" loading="lazy" style={{ objectPosition: positions[index] }} />
                  </span>
                  <span className="gone-sketch__ink" aria-hidden="true" dangerouslySetInnerHTML={{ __html: goneArtwork[index] }} />
                  <span className="gone-sketch__sticker">gone home ♥</span>
                </span>
                <span className="gone-sketch__name">{puppy.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
