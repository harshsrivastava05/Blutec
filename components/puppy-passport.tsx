import type { CSSProperties } from "react";

const promises = [
  {
    icon: "vet",
    shape: "round",
    color: "#a24a1a",
    tilt: -8,
    title: "Vet-checked & healthy",
    body: "Every puppy comes vaccinated, dewormed, and with a verified health certificate.",
  },
  {
    icon: "plane",
    shape: "ticket",
    color: "#1f6b45",
    tilt: 5,
    title: "Korea to Dubai, safely",
    body: "Trusted breeders, safe travel, and premium care from start to finish.",
  },
  {
    icon: "chat",
    shape: "oval",
    color: "#5a3a28",
    tilt: -4,
    title: "Support 24/7",
    body: "Always here to help, from choosing your puppy to post-delivery support.",
  },
  {
    icon: "globe",
    shape: "scallop",
    color: "#c2622b",
    tilt: 7,
    title: "Trusted by families worldwide",
    body: "Puppies delivered to loving homes all around the world.",
  },
];

export function PuppyPassport() {
  return (
    <section className="tp-scene tp-passport" aria-labelledby="trust-title">
      <div className="gutter tp-passport-wrap">
        <div className="tp-book">
          <div className="tp-book__page tp-book__page--left">
            <p className="tp-book__kicker font-scrawl">puppy passport</p>
            <h2 id="trust-title" className="font-plush tp-book__title">
              Why families trust TeddyPups
            </h2>
            <img className="tp-book__teddy" src="/media/teddy-sit.svg" alt="" />
          </div>
          <ul className="tp-book__page tp-book__page--right">
            {promises.map(
              ({ icon, shape, color, tilt, title, body }, index) => (
                <li
                  className="tp-entry"
                  key={title}
                  style={
                    {
                      "--ink-stamp": color,
                      "--tilt": tilt + "deg",
                      "--i": index,
                    } as CSSProperties
                  }
                >
                  <div className={"tp-stamp tp-stamp--" + shape}>
                    <img
                      className="tp-stamp__icon"
                      src={"/media/stamp-" + icon + ".svg"}
                      alt=""
                    />
                    <span className="tp-stamp__title font-plush">{title}</span>
                  </div>
                  <p className="tp-entry__text">{body}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      <div className="tp-horizon" aria-hidden="true">
        <span className="tp-horizon__sun" />
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="tp-horizon__city"
        >
          <path d="M0 160V118h34v-14h22v-22h30v34h18V96h26v30h22v-18h16v-30h34v40h20V70h28v56h24V98h18v-26h30v54h20v-38h26v-40l14-6 14 6v40h22v46h18V84h26v-30h22v50h24V76h36v50h20V96h18v-58h30v44h14V96h22v-30h16v22h26v-52l6-8v-24l4-6v-30l3-18 3 18v30l4 6v24l6 8v52h26v30h22V82h30v-20h24v48h20V90h28v-36h26v56h18V74h30v36h22V94h26v-24h30v62h20V102h26v20h34v38z" />
        </svg>
      </div>
    </section>
  );
}
