export const starPath =
  "M20 3c1.6 9.4 7.6 15.4 17 17-9.4 1.6-15.4 7.6-17 17-1.6-9.4-7.6-15.4-17-17 9.4-1.6 15.4-7.6 17-17z";

export function Twinkles({
  stars,
}: {
  stars: readonly (readonly [number, number, number])[];
}) {
  return stars.map(([left, top, size], index) => (
    <svg
      key={left}
      viewBox="0 0 40 40"
      className="tp-twinkle"
      aria-hidden="true"
      style={{
        left: left + "%",
        top: top + "%",
        width: size,
        animationDelay: index * 0.4 + "s",
      }}
    >
      <path d={starPath} fill="currentColor" />
    </svg>
  ));
}
