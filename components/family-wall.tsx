"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import photos from "@/lib/families.json";
import { pawPath } from "@/lib/paw";
import type { CSSProperties } from "react";

const highlights = photos.filter((photo) => photo.caption);
const previewOrder = [
  ...highlights,
  ...photos.filter((photo) => !photo.caption),
];
const alt = "A TeddyPups family with their puppy";
const tilts = [-2.2, 1.6, -0.9, 2.4, -1.5, 0.8, -2.6, 1.2];
const colors = ["#f6d79a", "#f9cdbf", "#cfe5f6", "#f6d79a", "#e9dcc4"];
const placements = [
  ["center"],
  ["left"],
  ["right"],
  ["tl", "tr"],
  ["center"],
  ["right"],
  ["left"],
  ["center"],
];
const previewDelays = [330, 0, 550, 110, 660, 220, 770, 440];

export function FamilyWall({ preview = false }: { preview?: boolean }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const wall = useRef<HTMLUListElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const gallery = preview ? previewOrder : photos;
  const photo = gallery[index];

  useEffect(() => {
    const element = wall.current;
    if (
      !element ||
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const items = Array.from(element.querySelectorAll("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ isIntersecting, target }) => {
          if (isIntersecting) {
            target.setAttribute("data-revealed", "");
            observer.unobserve(target);
          }
        });
      },
      { threshold: 0.12 },
    );
    items.forEach((item) => {
      item.setAttribute("data-armed", "");
      observer.observe(item);
    });
    return () => {
      observer.disconnect();
      items.forEach((item) => {
        item.removeAttribute("data-armed");
        item.removeAttribute("data-revealed");
      });
    };
  }, []);

  const move = (delta: number) =>
    setIndex((current) => (current + photos.length + delta) % photos.length);

  const prints = (
    <ul
      ref={wall}
      className={preview ? "tp-photowall__prints" : "tp-wall"}
      aria-label="Photos from TeddyPups families"
    >
      {(preview ? highlights : photos).map((item, position) => {
        const styleIndex = position % tilts.length;
        const delay = preview ? previewDelays[position] : 60 * (position % 4);
        return (
          <li
            key={item.src}
            className={preview ? undefined : "tp-wall__item"}
            data-reveal
            style={{ "--d": delay + "ms" } as CSSProperties}
          >
            <button
              type="button"
              className={preview ? "tp-photowall__print" : "tp-wall__print"}
              aria-label={
                "Open photo " +
                (position + 1) +
                " of " +
                photos.length +
                (item.caption ? ": " + item.caption : "")
              }
              onClick={() => {
                setIndex(position);
                dialog.current?.showModal();
              }}
            >
              <span
                className="tp-polaroid"
                style={
                  {
                    "--tilt": tilts[styleIndex] + "deg",
                    "--tape": colors[position % colors.length],
                    "--i": position,
                  } as CSSProperties
                }
              >
                {placements[styleIndex].map((placement) => (
                  <span
                    key={placement}
                    className={"tp-tape tp-tape--" + placement}
                    aria-hidden="true"
                  />
                ))}
                <span className="tp-polaroid__photo">
                  <img
                    src={item.src}
                    width={item.width}
                    height={item.height}
                    loading={preview || position > 3 ? "lazy" : "eager"}
                    alt={alt}
                  />
                </span>
                <span className="tp-polaroid__caption font-scrawl">
                  {item.caption}
                </span>
              </span>
              {!preview && (
                <svg
                  className="tp-wall__paw"
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <path d={pawPath} fill="currentColor" />
                </svg>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {preview ? (
        <div className="tp-photowall">
          <div className="tp-photowall__wall">
            {prints}
            <div className="tp-facade__ground">
              <span className="tp-facade__door" aria-hidden="true" />
              <span className="tp-lamp" aria-hidden="true">
                <span className="tp-lamp__light" />
              </span>
              <Link
                className="btn btn-primary tp-facade__cta"
                href="/happy-families"
              >
                See every happy family
              </Link>
              <img
                className="tp-dusk__teddy"
                src="/media/teddy-sit.svg"
                alt=""
              />
            </div>
          </div>
          <div className="tp-street__pavement" aria-hidden="true" />
        </div>
      ) : (
        prints
      )}
      <dialog
        className="family-dialog"
        ref={dialog}
        aria-label="Photo viewer"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="family-dialog__layout">
          <div className="family-dialog__bar">
            <span className="font-scrawl" aria-live="polite">
              {index + 1} / {photos.length}
            </span>
            <button
              className="family-dialog__close"
              type="button"
              onClick={() => dialog.current?.close()}
            >
              Close
            </button>
          </div>
          <figure
            className="family-dialog__frame"
            onPointerDown={(event) => {
              if (event.pointerType === "touch")
                touchStart.current = { x: event.clientX, y: event.clientY };
            }}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
            onPointerUp={(event) => {
              const origin = touchStart.current;
              touchStart.current = null;
              if (!origin || event.pointerType !== "touch") return;
              const horizontal = event.clientX - origin.x;
              if (
                Math.abs(horizontal) > 45 &&
                Math.abs(horizontal) > Math.abs(event.clientY - origin.y)
              )
                move(horizontal > 0 ? -1 : 1);
            }}
          >
            <img src={photo.src} alt={alt} draggable={false} />
            {photo.caption && (
              <figcaption className="font-scrawl">{photo.caption}</figcaption>
            )}
          </figure>
          <div className="family-dialog__controls">
            <button type="button" onClick={() => move(-1)}>
              Previous
            </button>
            <button type="button" onClick={() => move(1)}>
              Next
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
