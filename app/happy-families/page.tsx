import { FamilyWall } from "@/components/family-wall";
import { FamilyTestimonial } from "@/components/family-testimonial";
import photos from "@/lib/families.json";

export const metadata = { title: "Happy families | TeddyPups U.A.E." };

export default function Families() {
  return (
    <main id="main" className="tp-memories">
      <div className="tp-wide gutter tp-memories__body">
        <header className="tp-memories__head">
          <div>
            <p className="font-scrawl tp-memories__kicker">
              our wall of happy endings
            </p>
            <h1 className="font-plush text-giant tp-memories__title">
              Happy families
              <svg
                className="tp-memories__heart"
                viewBox="0 0 48 44"
                aria-hidden="true"
              >
                <path
                  d="M24 40C10 30 4 22 4 14.5 4 8.7 8.6 4 14.3 4c4.1 0 7.6 2.4 9.7 6 2.1-3.6 5.6-6 9.7-6C39.4 4 44 8.7 44 14.5 44 22 38 30 24 40z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </h1>
            <p className="text-lede">
              Nothing makes us happier than seeing our puppies in loving homes!
              Here are some beautiful moments shared by our amazing clients
              after welcoming their furry friends.
            </p>
            <p className="font-scrawl tp-memories__count">
              {photos.length} moments and counting
            </p>
          </div>
          <FamilyTestimonial className="tp-memories__note" />
        </header>
        <div className="tp-memories__gallery">
          <FamilyWall />
        </div>
        <div className="tp-memories__foot">
          <img src="/media/teddy-sit.svg" alt="" />
          <p className="font-scrawl">every one of them was a Teddy Pup once</p>
        </div>
      </div>
    </main>
  );
}
