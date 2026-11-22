"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pups } from "@/lib/pups";

const initial = [0, 3, 7, 6, 1, 2];
// Match each image change to the point at which its CSS duck is hidden.
const delays = [1100, 4000, 7000, 2600, 5700, 8500];

export function HeroLineup() {
  const [indices, setIndices] = useState(initial);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const intervals: number[] = [];
    const timers = delays.map((delay, slot) =>
      window.setTimeout(() => {
        const advance = () =>
          setIndices((current) =>
            current.map((value, i) =>
              i === slot ? (value + 6) % pups.length : value,
            ),
          );
        advance();
        intervals.push(window.setInterval(advance, 10000));
      }, delay + 8950),
    );
    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, []);

  const portrait = (index: number, slot: number) => (
    <Link
      className={"peek peek-" + slot}
      href={"/puppies/" + pups[index][4]}
      key={slot}
      aria-label={"Meet " + pups[index][0]}
    >
      <img src={"/media/pup-" + (index + 1) + ".webp"} alt="" />
    </Link>
  );

  return (
    <div className="lineup" aria-label="Some of the puppies in our showroom">
      {indices.slice(0, 3).map(portrait)}
      <img
        className="teddy-peek"
        src="/media/teddy-peek.svg"
        alt="Teddy, the TeddyPups puppy"
      />
      {indices.slice(3).map((index, slot) => portrait(index, slot + 3))}
    </div>
  );
}
