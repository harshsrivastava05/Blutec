"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { available } from "@/lib/puppies";
import { GonePreview } from "@/components/gone-preview";
const portraitCrops = [
  "53.8% 44.3%",
  "52.5% 42.6%",
  "54.5% 45.7%",
  "44.7% 29.5%",
  "65.4% 44.7%",
  "64.6% 42.3%",
  "40.3% 44.3%",
  "43% 50.5%",
  "44.8% 42.5%",
  "40.3% 43.6%",
  "47.5% 50.5%",
  "56.9% 49.2%",
  "49.9% 51.3%",
  "49.9% 48.6%",
  "48.9% 44.1%",
];
const portraitWashes = [
  "#f2be6b",
  "#bfddf5",
  "#bfddf5",
  "#f2be6b",
  "#bfddf5",
  "#bfddf5",
  "#fbe3b4",
  "#fbe3b4",
  "#f2be6b",
  "#fbe3b4",
  "#e8c39a",
  "#bfddf5",
  "#f9cdbf",
  "#f9cdbf",
  "#fbe3b4",
];
export function Catalogue() {
  const params = useSearchParams();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".sketch-card, [data-gone-reveal]",
      ),
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sketch-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    items.forEach((item) => {
      item.classList.add("sketch-armed");
      observer.observe(item);
    });
    return () => observer.disconnect();
  }, [params]);
  const router = useRouter(),
    path = usePathname();
  const origin =
      params.get("collection") === "korean-teacup"
        ? "korean"
        : params.get("origin") || "",
    breed = params.get("breed") || "",
    sex = params.get("gender") || "";
  function set(key: string, value: string) {
    const q = new URLSearchParams(params.toString());
    if (key === "origin") {
      q.delete("origin");
      q.delete("collection");
      if (value && value !== origin)
        q.set(
          value === "korean" ? "collection" : "origin",
          value === "korean" ? "korean-teacup" : value,
        );
    } else if (!value || q.get(key) === value) q.delete(key);
    else q.set(key, value);
    router.replace(path + (q.size ? "?" + q.toString() : ""), {
      scroll: false,
    });
  }
  const shown = available.filter(
    (p) =>
      (!origin ||
        (origin === "korean"
          ? p.breed.toLowerCase().includes("korean")
          : p.origin === origin)) &&
      (!breed || p.breed.toLowerCase().replaceAll(" ", "-").includes(breed)) &&
      (!sex || p.sex.includes(sex === "female" ? "girl" : "boy")),
  );
  return (
    <main id="main" className="catalogue">
      <div className="wrap">
        <div className="catalogue-heading">
          <div>
            <p className="hand">from Teddy&apos;s sketchbook</p>
            <h1>
              Available puppies
              <svg
                aria-hidden="true"
                viewBox="0 0 400 24"
                preserveAspectRatio="none"
                className="catalogue-underline"
              >
                <path d="M4 15c40-9 70 5 112-2s70-9 112 0 74 8 116-1 38-4 52 1" />
              </svg>
            </h1>
            <p>
              Every listing shows real photos of the actual puppy. Open a
              profile to see them all, then ask us about them on WhatsApp.
            </p>
          </div>
          <div className="portrait">
            <img src="/media/teddy-sit.svg" alt="Teddy, the TeddyPups puppy" />
            <span className="hand">self-portrait</span>
          </div>
        </div>
        <div className="filter-board" aria-label="Filter puppies">
          {[
            [
              "where",
              [
                ["Everywhere", ""],
                ["Imported", "imported"],
                ["Korean Teacup", "korean"],
              ],
              "origin",
              origin,
            ],
            [
              "breed",
              [
                ["Maltipoo", "maltipoo"],
                ["Pomeranian", "pomeranian"],
                ["Poodle", "poodle"],
                ["Cavapoo", "cavapoo"],
                ["Shih Tzu", "shih-tzu"],
              ],
              "breed",
              breed,
            ],
            [
              "boy or girl",
              [
                ["Boys", "male"],
                ["Girls", "female"],
              ],
              "gender",
              sex,
            ],
          ].map(([label, options, key, current]) => (
            <div className="filter-row" key={label as string}>
              <span className="hand">{label as string}</span>
              <div>
                {(options as string[][]).map(([name, val]) => (
                  <button
                    key={name}
                    aria-pressed={current === val}
                    className={current === val ? "selected" : ""}
                    onClick={() => set(key as string, val)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {(origin || breed || sex) && (
            <button
              className="clear-filter"
              onClick={() => router.replace(path, { scroll: false })}
            >
              Clear filters ×
            </button>
          )}
        </div>
        <p className="hand results">
          {shown.length}{" "}
          {origin || breed || sex
            ? "puppies match"
            : "puppies looking for a home"}
        </p>
        {shown.length ? (
          <div className="catalogue-grid">
            {shown.map((p, i) => (
              <Link
                href={"/puppies/" + p.slug}
                key={p.slug}
                className="sketch-card"
                style={
                  {
                    "--tilt": `${i % 2 ? 2 : -2}deg`,
                    "--wash": portraitWashes[available.indexOf(p)],
                  } as React.CSSProperties
                }
              >
                <div className="sketch-image">
                  <img
                    src={p.image}
                    alt={p.name + " puppy"}
                    style={{
                      objectPosition: portraitCrops[available.indexOf(p)],
                    }}
                  />
                  <div
                    className="sketch-art"
                    aria-hidden="true"
                    style={{
                      backgroundImage: `url(/media/sketch-ink-${available.indexOf(p) + 1}.svg)`,
                    }}
                  />
                  <span>Available</span>
                  {p.video && <small>▶ video</small>}
                </div>
                <h2>{p.name}</h2>
                <p>
                  {[p.name !== p.breed ? p.breed : "", p.sex, p.age]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <span className="card-arrow">↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No puppies match just yet.</h2>
            <p>Try another filter to meet more puppies.</p>
            <button onClick={() => router.replace(path, { scroll: false })}>
              Clear filters
            </button>
          </div>
        )}
      </div>
      <GonePreview />
    </main>
  );
}
