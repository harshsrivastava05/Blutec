"use client";
import { useState, type CSSProperties } from "react";
const choices = {
  local: {
    title: "Meet your puppy in person",
    intro:
      "Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. We source healthy, well-socialized puppies from trusted local breeders, ensuring they’re raised with care, proper nutrition, and veterinary checks.",
    steps: [
      [
        "Explore our puppies",
        "Browse our website to view the available puppies. Each listing includes photos, breed details, age, and health information.",
      ],
      [
        "Choose your puppy",
        "Once you find a puppy you love, open their profile for more information or to enquire further. You can also reach out to us directly if you have any questions.",
      ],
      [
        "Meet before you choose",
        "Spend time bonding before making your decision.",
      ],
      [
        "Pick-up or delivery",
        "Pick up your puppy from us or have them delivered to your home within Dubai. Our delivery service is safe and reliable, ensuring your puppy arrives comfortably.",
      ],
    ],
  },
  imported: {
    title: "Order upon request",
    intro:
      "Looking for a truly exceptional companion? Our Order Upon Request service gives you access to some of the world’s most sought-after teacup breeds — ethically sourced from the most reputable, certified breeders across Europe, Korea, and beyond.",
    steps: [
      [
        "Reserve your puppy",
        "Browse our selection of available breeds and place a reservation for the teacup puppy that captures your heart. Our reservation-only model ensures that each puppy is specifically sourced to meet your preferences.",
      ],
      [
        "Personalized consultation",
        "Once your reservation is confirmed, we will work closely with you to finalize details and provide updates on your puppy’s journey.",
      ],
      [
        "Import and arrival",
        "We manage all aspects of the import process, including health checks, travel arrangements, and necessary documentation. Your puppy will be carefully transported and will arrive ready to join your family.",
      ],
      [
        "Welcome home",
        "Upon arrival, we provide support to help your new puppy acclimate to their new environment. Our team is available for any additional assistance and to ensure a smooth transition into your home.",
      ],
    ],
  },
};
export function JourneyTabs() {
  const [tab, setTab] = useState<"local" | "imported">("local");
  const active = choices[tab];
  return (
    <>
      <div className="journey-heading">
        <div>
          <p className="hand">choose your way</p>
          <h2>Two ways home</h2>
        </div>
        <div className="switch-and-dog">
          <div
            className="journey-switch"
            style={{ "--switch-at": tab === "local" ? 0 : 1 } as CSSProperties}
            role="tablist"
            aria-label="Ways to bring your puppy home"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                const next = tab === "local" ? "imported" : "local";
                setTab(next);
                document.getElementById("tab-" + next)?.focus();
              }
            }}
          >
            <span className="journey-switch__thumb" aria-hidden="true" />
            {(["local", "imported"] as const).map((x) => (
              <button
                role="tab"
                id={"tab-" + x}
                aria-selected={tab === x}
                aria-controls={"panel-" + x}
                tabIndex={tab === x ? 0 : -1}
                onClick={() => setTab(x)}
                key={x}
              >
                <strong>{x === "local" ? "In Dubai" : "Imported"}</strong>
                <small>
                  {x === "local" ? "meet in person" : "order upon request"}
                </small>
              </button>
            ))}
          </div>
          <img
            className="switch-dog"
            src="/media/teddy-journey.svg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      <div
        className="journey-panel"
        role="tabpanel"
        id={"panel-" + tab}
        aria-labelledby={"tab-" + tab}
        key={tab}
      >
        <div>
          <h3>{active.title}</h3>
          <p>{active.intro}</p>
          {tab === "imported" && (
            <p className="hand journey-extra">
              From Korean teacup poodles to rare Maltese, Pom, and Yorkie lines,
              we bring the world’s finest puppies to Dubai, just for you.
            </p>
          )}
        </div>
        <div
          className={
            "journey-illustration postcard " +
            (tab === "imported" ? "postcard-sky" : "postcard-dubai")
          }
          aria-hidden="true"
        >
          {tab === "local" ? (
            <>
              <span className="hand postcard-place">Downtown Dubai</span>
              <span className="postcard-sun" />
              <img
                className="postcard-city"
                src="/media/journey-skyline.svg"
                alt=""
              />
            </>
          ) : (
            <>
              <img
                className="postcard-route"
                src="/media/journey-route.svg"
                alt=""
              />
              <img
                className="postcard-plane"
                src="/media/journey-small-plane.svg"
                alt=""
              />
              <span className="hand postcard-from">Europe · Korea</span>
              <span className="hand postcard-to">Dubai</span>
            </>
          )}
        </div>
        <ol>
          {active.steps.map(([title, text], i) => (
            <li key={title} style={{ animationDelay: `${i * 90}ms` }}>
              <span className="journey-icon">
                <img
                  src={
                    "/media/journey-" +
                    (tab === "local"
                      ? ["search", "heart", "puppy", "delivery"]
                      : ["reserve", "consult", "import", "home"])[i] +
                    ".svg"
                  }
                  alt=""
                />
              </span>
              <span className="hand">Step {i + 1}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
