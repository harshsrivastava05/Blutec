"use client";
import { useEffect } from "react";

/** Reveal tickets as they enter the viewport, while keeping the archive usable without JS. */
export function ArchiveMotion() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const tickets = Array.from(
      document.querySelectorAll<HTMLElement>(".ticket-grid .ticket"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ticket = entry.target as HTMLElement;
            ticket.dataset.revealed = "";
            observer.unobserve(ticket);
          }
        });
      },
      { threshold: 0.08 },
    );
    tickets.forEach((ticket, i) => {
      ticket.style.setProperty("--ticket-delay", `${(i % 3) * 80}ms`);
      ticket.dataset.armed = "";
      observer.observe(ticket);
    });
    return () => {
      observer.disconnect();
      tickets.forEach((ticket) => {
        delete ticket.dataset.armed;
        delete ticket.dataset.revealed;
        ticket.style.removeProperty("--ticket-delay");
      });
    };
  }, []);
  return null;
}
