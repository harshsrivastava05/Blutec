import Link from "next/link";
import type { CSSProperties } from "react";
import { JourneyTabs } from "@/components/journey-tabs";
import { HowFlight } from "@/components/how-flight";

export const metadata = { title: "How it works | TeddyPups U.A.E." };
const promises = [
  {
    icon: "vet",
    shape: "round",
    color: "#a24a1a",
    tilt: -8,
    title: "Hand-selected breeders",
    body: "We work only with breeders who uphold the highest ethical and health standards.",
  },
  {
    icon: "plane",
    shape: "ticket",
    color: "#1f6b45",
    tilt: 5,
    title: "Full transparency",
    body: "Photos, videos, and health certificates are shared before your puppy travels.",
  },
  {
    icon: "chat",
    shape: "oval",
    color: "#5a3a28",
    tilt: -4,
    title: "Safe, stress-free delivery",
    body: "We handle every detail of the import process, so your puppy arrives happy, healthy, and ready to love you.",
  },
];
const delivery = [
  [
    "Take your puppy home the same day",
    "Local puppies are available immediately — visit, fall in love, and go home together.",
  ],
  [
    "Delivery within Dubai",
    "Prefer to stay home? We deliver your puppy to your door within Dubai, safely and comfortably.",
  ],
  [
    "Safe international cargo",
    "We handle all the paperwork and ensure comfortable travel so your puppy arrives happy and stress-free.",
  ],
  [
    "Worldwide delivery",
    "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.",
  ],
];
const reasons = [
  [
    "plane",
    "International cargo",
    "We safely deliver puppies to loving homes all around the world. Our trusted international cargo partners ensure your new furry friend travels comfortably and arrives safely, no matter the distance.",
  ],
  [
    "chat",
    "Support 24/7",
    "Our team is available 24/7 to answer your questions and assist you through every step of the adoption process. From choosing your puppy to post-delivery support — we’re just a message away.",
  ],
  [
    "vet",
    "Health guarantee",
    "All our puppies come with a verified health certificate from licensed vets. We ensure every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.",
  ],
];
export default function How() {
  return (
    <main id="main" className="how-page">
      <div className="wrap">
        <header className="inner-hero">
          <h1>How it works</h1>
          <p>
            Whether you choose to visit us locally or order a premium breed from
            overseas, TeddyPups is here to make the experience unforgettable.
          </p>
        </header>
        <nav className="chapter-nav" aria-label="On this page">
          {[
            ["Two ways home", "two-ways"],
            ["Our premium puppy promise", "promise"],
            ["Delivery & collection", "delivery"],
            ["Why choose us", "why"],
          ].map(([name, id], i) => (
            <a href={"#" + id} key={id}>
              <b>{i + 1}</b> {name}
            </a>
          ))}
        </nav>
        <section id="two-ways" className="how-section">
          <JourneyTabs />
        </section>
        <section id="promise" className="how-promise">
          <p className="hand">puppy passport</p>
          <h2>Our premium puppy promise</h2>
          <ul>
            {promises.map(({ icon, shape, color, tilt, title, body }, i) => (
              <li
                className="tp-entry"
                key={title}
                style={
                  {
                    "--ink-stamp": color,
                    "--tilt": `${tilt}deg`,
                    "--i": i,
                  } as CSSProperties
                }
              >
                <span className={"tp-stamp tp-stamp--" + shape}>
                  <img
                    className="tp-stamp__icon"
                    src={"/media/stamp-" + icon + ".svg"}
                    alt=""
                  />
                  <span className="tp-stamp__title font-plush">{title}</span>
                </span>
                <p className="tp-entry__text">{body}</p>
              </li>
            ))}
          </ul>
        </section>
        <section id="delivery" className="how-delivery">
          <div>
            <h2>Delivery &amp; collection</h2>
            <p className="how-lede">
              From a same-day visit in Downtown Dubai to a flight from Korea,
              every puppy travels comfortably and arrives safely.
            </p>
            <ul>
              {delivery.map(([title, body]) => (
                <li key={title}>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </li>
              ))}
            </ul>
          </div>
          <HowFlight />
        </section>
        <section id="why" className="how-why">
          <div>
            <h2>Why choose us</h2>
            <p className="how-lede">
              We&apos;re here to help you find a new family member. From the
              moment you visit our site to the joyful day your puppy arrives at
              your door, we&apos;re with you every step of the way. Our mission
              is to make the entire adoption process smooth, transparent, and
              full of love.
            </p>
          </div>
          <ul>
            {reasons.map(([icon, title, body]) => (
              <li key={title}>
                <img src={"/media/stamp-" + icon + ".svg"} alt="" />
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className="how-care">
          <div>
            <h2>Unique and high quality puppies</h2>
            <p className="how-lede">
              When you choose TeddyPups, you can trust that you&apos;re getting
              a puppy of the highest quality. We also provide guidance and
              support to new pet owners, offering advice on training, nutrition,
              and general care to ensure a smooth transition for you and your
              new furry friend.
            </p>
            <div className="actions">
              <Link href="/contact" className="btn btn-whatsapp">
                Ask us on WhatsApp
              </Link>
              <Link href="/puppies" className="btn btn-ghost">
                See available puppies
              </Link>
            </div>
          </div>
          <img src="/media/teddy-bow.svg" alt="Teddy, ready to play" />
        </section>
      </div>
    </main>
  );
}
