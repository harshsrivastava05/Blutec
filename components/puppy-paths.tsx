import Link from 'next/link';
import { PuppyFlight } from '@/components/puppy-flight';

export function PuppyPaths() {
  return (
    <section className="tp-scene tp-paths" aria-labelledby="paths-title">
      <div className="tp-wide gutter">
        <h2 id="paths-title" className="tp-paths__title font-plush text-huge"><span id="ways-title">Two ways to meet your puppy</span></h2>
        <div className="tp-fork">
          <div className="tp-fork__post" aria-hidden="true" />
          <article className="tp-way tp-way--left">
            <h3 className="tp-sign tp-sign--left font-plush">Puppies in Dubai</h3>
            <div className="tp-way__scene">
              <svg viewBox="0 0 300 120" className="tp-way__skyline" aria-hidden="true">
                <path d="M4 116h292M20 116V78h16v38M44 116V60h18v56M70 116V84h12v32M150 116V36l4-6v-14l3-4 3 4v14l4 6v80M118 116V70l12-8v54M174 116V64l14 8v44M200 116V82h18v34M226 116V56h14v60M248 116V88h22v28" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <figure className="tp-window">
                <span className="tp-window__glass"><img src="/media/showroom.jpg" alt="A puppy in the showroom" /></span>
                <figcaption className="font-scrawl">In our showroom</figcaption>
              </figure>
            </div>
            <p className="tp-way__text">See them, love them, take them home. Come meet our locally available puppies before you decide.</p>
            <Link className="btn btn-primary" href="/puppies?origin=local">Meet local puppies</Link>
          </article>
          <article className="tp-way tp-way--right">
            <h3 className="tp-sign tp-sign--right font-plush">Imported for you</h3>
            <div className="tp-way__scene"><PuppyFlight /></div>
            <p className="tp-way__text">Exclusive Korean teacup puppies, delivered. Order from the world&apos;s most reputable breeders and let us handle the import.</p>
            <Link className="btn btn-primary" href="/puppies?origin=imported">See imported puppies</Link>
          </article>
          <img className="tp-fork__teddy" src="/media/teddy-sit.svg" alt="" />
        </div>
      </div>
    </section>
  );
}
