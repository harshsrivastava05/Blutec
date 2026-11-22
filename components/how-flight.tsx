"use client";

import { useEffect, useRef } from "react";
import { PuppyFlight } from "@/components/puppy-flight";

export function HowFlight() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = scene.current;
    const marker = element?.querySelector<SVGGElement>(".flight-marker");
    if (!element || !marker) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function update() {
      frame = 0;
      if (!element || !marker) return;
      const rect = element.getBoundingClientRect();
      const progress = reduced.matches
        ? 0.55
        : Math.max(
            0,
            Math.min(
              1,
              (innerHeight - rect.top) / (innerHeight + rect.height * 0.595),
            ),
          );
      const u = 1 - progress;
      const x =
        40 * u ** 3 +
        510 * u ** 2 * progress +
        1410 * u * progress ** 2 +
        620 * progress ** 3;
      const y =
        250 * u ** 3 +
        120 * u ** 2 * progress +
        60 * u * progress ** 2 +
        168 * progress ** 3;
      const dx = 130 * u ** 2 + 600 * u * progress + 150 * progress ** 2;
      const dy = -210 * u ** 2 - 40 * u * progress + 148 * progress ** 2;
      marker.setAttribute(
        "transform",
        `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((Math.atan2(dy, dx) * 180) / Math.PI).toFixed(1)})`,
      );
      marker.style.opacity = String(
        Math.min(1, progress / 0.1, (1 - progress) / 0.09),
      );
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    schedule();
    return () => {
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="how-flight" ref={scene}>
      <img
        className="how-flight__skyline"
        src="/media/journey-skyline.svg"
        alt=""
      />
      <PuppyFlight showPuppy={false} />
    </div>
  );
}
