"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import faq from "@/lib/faq.json";

const tilts = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.7, -1.9, 1.4];
const pins = ["#c2622b", "#2f6e9e", "#d9a13c", "#c45a6a"];

function highlight(text: string, query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return text;
  const result = [];
  const lower = text.toLowerCase();
  let start = 0;
  let index = lower.indexOf(term);
  while (index !== -1) {
    result.push(
      text.slice(start, index),
      <mark key={index}>{text.slice(index, index + term.length)}</mark>,
    );
    start = index + term.length;
    index = lower.indexOf(term, start);
  }
  result.push(text.slice(start));
  return result;
}

export function FaqBoard() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = faq
    .map((item, id) => ({ ...item, id }))
    .filter((item) =>
      (item.question + " " + item.answer)
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    );

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const notes = document.querySelectorAll<HTMLElement>(".tp-note");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    notes.forEach((note) => {
      note.setAttribute("data-armed", "");
      observer.observe(note);
    });
    return () => observer.disconnect();
  }, [query]);

  return (
    <div className="tp-notes" data-open={open !== null ? "" : undefined}>
      <aside className="tp-notes__side" aria-label="Find a question">
        <label htmlFor="faq-search" className="font-scrawl tp-notes__label">
          sniff out a question
        </label>
        <div className="tp-notes__search">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="tp-notes__lens"
          >
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
          <input
            id="faq-search"
            type="search"
            placeholder="delivery, Korea, vaccinated…"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <p className="tp-notes__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "note" : "notes"}{" "}
          {query.trim() ? "found" : "on the board"}
        </p>
        <div className="tp-notes__teddy">
          <span aria-hidden="true" className="tp-notes__bubble font-plush">
            <span className="tp-notes__q">?</span>
            <span className="tp-notes__a">!</span>
          </span>
          <img src="/media/teddy-sit.svg" alt="Teddy, reading the notes" />
        </div>
        <Link href="/contact" className="btn btn-whatsapp tp-notes__ask">
          Ask your own question
        </Link>
      </aside>
      <div className="tp-notes__board">
        {filtered.length ? (
          <ul className="tp-notes__list">
            {filtered.map(({ id, question, answer }, index) => (
              <li
                className="tp-note"
                key={id}
                data-unfolded={open === id ? "" : undefined}
                style={
                  {
                    "--tilt": tilts[id % tilts.length] + "deg",
                    "--pin": pins[id % pins.length],
                    "--i": index,
                  } as CSSProperties
                }
              >
                <span className="tp-note__pin" aria-hidden="true" />
                <h2 className="tp-note__q">
                  <button
                    id={"question-" + id}
                    type="button"
                    aria-expanded={open === id}
                    aria-controls={"answer-" + id}
                    onClick={() => setOpen(open === id ? null : id)}
                  >
                    <span className="font-plush-text">
                      {highlight(question, query)}
                    </span>
                    <span className="tp-note__chevron" aria-hidden="true" />
                  </button>
                </h2>
                <div
                  id={"answer-" + id}
                  role="region"
                  aria-labelledby={"question-" + id}
                  className="tp-note__answer"
                  inert={open !== id}
                >
                  <div className="tp-note__flap">
                    <p>{highlight(answer, query)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="tp-note tp-note--empty">
            <span className="tp-note__pin" aria-hidden="true" />
            <p className="font-plush-text">No note about “{query}” yet.</p>
            <p>
              <Link href="/contact">Ask us on WhatsApp</Link> and we&apos;ll
              answer.
            </p>
            <button onClick={() => setQuery("")}>Clear search</button>
          </div>
        )}
      </div>
    </div>
  );
}
