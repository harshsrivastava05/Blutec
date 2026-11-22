import Link from 'next/link';
import { HeroLineup } from '@/components/hero-lineup';
import { FamilyWall } from '@/components/family-wall';
import { PuppyJourney } from '@/components/puppy-journey';
import { PuppyPassport } from '@/components/puppy-passport';
import { PuppyPaths } from '@/components/puppy-paths';
import { FamilyTestimonial } from '@/components/family-testimonial';
import { PuppyParade } from '@/components/puppy-parade';
import { HomeMotion } from '@/components/home-motion';
import { HomeEnding } from '@/components/home-ending';
export default function Home(){return <main id="main" className="home-page"><HomeMotion/><section className="hero"><div className="hero-copy"><p className="hand underline">every puppy is family</p><h1>Premium teacup<br/> puppies in Dubai</h1><p>Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide.</p><div className="actions"><Link className="button primary" href="/puppies">View available puppies</Link><Link className="button outline" href="/contact">Enquire on WhatsApp</Link></div></div><HeroLineup/><div className="quilt" aria-hidden="true"/></section>
<PuppyParade/>
<PuppyPaths />
<PuppyJourney />
<PuppyPassport />
<section className="tp-scene tp-dusk" data-tone="dark" aria-labelledby="dusk-title">
  <div className="tp-dusk__sky gutter">
    <div className="tp-dusk__head">
      <h2 className="font-plush text-huge" id="dusk-title">Happy families &amp; puppies</h2>
      <p className="text-lede">We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.</p>
    </div>
    <FamilyTestimonial className="tp-dusk__note" />
  </div>
  <FamilyWall preview />
</section>
<HomeEnding />
</main>}
