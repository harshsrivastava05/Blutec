'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { pawPath } from '@/lib/paw';

export function ReferenceHeader({
  path, links, openMenu,
}: {
  path: string;
  links: string[][];
  openMenu: () => void;
}) {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = header.current;
    if (!element) return;
    let previous = window.scrollY;
    let checkpoint = previous;
    let frame = 0;
    element.dataset.scrolled = String(previous > 12);
    element.dataset.hidden = 'false';

    function update() {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      if (!element) return;
      element.dataset.scrolled = String(y > 12);
      const threshold = element.offsetHeight * 1.8;
      if (y < threshold) {
        element.dataset.hidden = 'false';
        checkpoint = y;
      } else {
        if (Math.sign(y - previous) !== Math.sign(y - checkpoint)) checkpoint = previous;
        if (Math.abs(y - checkpoint) > 18) {
          if (!element.contains(document.activeElement)) element.dataset.hidden = String(y > checkpoint);
          checkpoint = y;
        }
      }
      previous = y;
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [path]);

  return (
    <header
      ref={header}
      className="tp-header"
      data-home={path === '/' ? '' : undefined}
      onFocus={() => { if (header.current) header.current.dataset.hidden = 'false'; }}
    >
      <div className="tp-header__bar gutter">
        <Link className="tp-header__brand" href="/" aria-label="TeddyPups U.A.E. — home">
          <img className="tp-header__logo" src="/media/logo.webp" width={56} height={56} alt="" />
          <span className="font-plush tp-header__name">TeddyPups</span>
        </Link>
        <nav className="tp-header__nav" aria-label="Main">
          <ul>
            {links.map(([label, href]) => (
              <li key={href}>
                <Link className="tp-nav-link" href={href} aria-current={path === href ? 'page' : undefined} data-active={path === href}>
                  <span>{label}</span>
                  <svg viewBox="0 0 64 64" className="tp-nav-link__paw" aria-hidden="true"><path d={pawPath} fill="currentColor" /></svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="tp-header__end">
          <Link className="btn btn-whatsapp tp-header__wa" href="/contact">WhatsApp us</Link>
          <button className="tp-header__menu" type="button" aria-haspopup="dialog" onClick={openMenu}>
            <svg viewBox="0 0 64 64" aria-hidden="true"><path d={pawPath} fill="currentColor" /></svg>
            Menu
          </button>
        </div>
      </div>
      <svg aria-hidden="true" className="tp-header__hem" width="100%" height="14" preserveAspectRatio="none">
        <defs>
          <pattern id="tp-hem" width="44" height="14" patternUnits="userSpaceOnUse">
            <path d="M0 0H44V2A22 11 0 0 1 0 2Z" className="tp-header__hem-fill" />
            <path d="M0 2A22 11 0 0 0 44 2" className="tp-header__hem-line" />
          </pattern>
        </defs>
        <rect width="100%" height="14" fill="url(#tp-hem)" />
      </svg>
    </header>
  );
}
