import Link from 'next/link';
import { available } from '@/lib/puppies';

export function PuppyParade() {
  return (
    <section className="parade" aria-labelledby="meet-title">
      <div className="parade-sticky">
        <div className="wrap section-heading parade-heading">
          <div>
            <h2 id="meet-title">Meet the pups</h2>
            <p>Real puppies, real photos, looking for their families right now.</p>
          </div>
          <Link className="button primary" href="/puppies">See all available puppies</Link>
        </div>
        <div className="parade-window">
          <div className="parade-track">
            {available.map(puppy => (
              <Link href={'/puppies/' + puppy.slug} key={puppy.slug} className="parade-pup">
                <h3>{puppy.name}</h3>
                <p>{[puppy.name !== puppy.breed && puppy.breed, puppy.sex, puppy.age, puppy.video && 'with video'].filter(Boolean).join(', ')}</p>
                <div className="parade-door">
                  <img src={puppy.image} alt={puppy.name + ' puppy'} loading="lazy" />
                  <span className="door-panel" aria-hidden="true"><i /><b /></span>
                  <span className="door-badge">Available</span>
                </div>
              </Link>
            ))}
            <Link href="/puppies" className="parade-end">Meet them all ↗</Link>
          </div>
        </div>
        <div className="parade-floor" aria-hidden="true" />
      </div>
    </section>
  );
}
