"use client";
import { useRef, useState } from "react";
import type { Puppy } from "@/lib/puppies";
export function PuppyGallery({ puppy: p }: { puppy: Puppy }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const items = p.gallery.length
      ? p.gallery
      : [{ kind: "image", src: p.image }],
    count = items.length;
  const prev = () => setIndex((i) => (i + count - 1) % count),
    next = () => setIndex((i) => (i + 1) % count);
  const item = items[index];
  const media = () =>
    item.kind === "video" ? (
      <video
        key={item.src}
        controls
        playsInline
        poster={item.poster}
        src={item.src}
        aria-label={"Video of " + p.name}
      />
    ) : (
      <img
        src={item.src}
        alt={p.name + ", " + p.breed + " puppy, photo " + (index + 1)}
      />
    );
  return (
    <>
      <div className="gallery-frame">
        <div className="gallery-media">
          {media()}
          {item.kind === "image" && (
            <button
              className="enlarge"
              onClick={() => dialog.current?.showModal()}
              aria-label={"Open " + p.name + " media full screen"}
            ></button>
          )}
        </div>
        {count > 1 && (
          <div className="gallery-controls">
            <button onClick={prev} aria-label="Previous photo">
              ‹
            </button>
            <span>
              {index + 1} / {count}
            </span>
            <button onClick={next} aria-label="Next photo">
              ›
            </button>
          </div>
        )}
      </div>
      {count > 1 && (
        <div className="gallery-thumbs">
          {items.map((entry, i) => (
            <button
              key={entry.src}
              className={index === i ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={
                p.name +
                ", " +
                (entry.kind === "video" ? "video" : "photo") +
                " " +
                (i + 1) +
                " of " +
                count
              }
            >
              <img
                src={
                  entry.kind === "video" ? entry.poster || p.image : entry.src
                }
                alt=""
              />
              {entry.kind === "video" && <span>▶</span>}
            </button>
          ))}
        </div>
      )}
      <dialog
        className="photo-dialog"
        ref={dialog}
        aria-label="Photo viewer"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") prev();
          if (e.key === "ArrowRight") next();
        }}
      >
        <button className="photo-close" onClick={() => dialog.current?.close()}>
          Close ✕
        </button>
        <div className="photo-view">
          {count > 1 && (
            <button onClick={prev} aria-label="Previous photo">
              ‹
            </button>
          )}
          <figure>
            {media()}
            <figcaption>
              {p.name} · {index + 1} / {count}
            </figcaption>
          </figure>
          {count > 1 && (
            <button onClick={next} aria-label="Next photo">
              ›
            </button>
          )}
        </div>
      </dialog>
    </>
  );
}
