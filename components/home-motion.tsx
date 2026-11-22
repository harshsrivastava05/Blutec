'use client';

import { useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const ease = (amount: number) => amount * amount * (3 - 2 * amount);
const between = (value: number, from: number, to: number) => clamp((value - from) / Math.max(.00001, to - from));

type ActorPosition = {
  x: number;
  bottom: number;
  width: number;
  height: number;
  facing: number;
  pose: 'peek' | 'walk' | 'sit' | 'bow';
  opacity: number;
};

export function HomeMotion() {
  const actorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const actor = actorRef.current;
    const root = actor?.closest('main');
    const hero = root?.querySelector<HTMLElement>('.hero');
    const peek = root?.querySelector<HTMLElement>('.teddy-peek');
    const parade = root?.querySelector<HTMLElement>('.parade');
    const sticky = parade?.querySelector<HTMLElement>('.parade-sticky');
    const track = parade?.querySelector<HTMLElement>('.parade-track');
    const hall = parade?.querySelector<HTMLElement>('.parade-window');
    const ways = root?.querySelector<HTMLElement>('.tp-paths');
    const sign = ways?.querySelector<HTMLElement>('.tp-fork__teddy');
    if (!actor || !root || !hero || !peek || !parade || !sticky || !track || !hall || !ways || !sign) return;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const wide = matchMedia('(min-width: 1024px)');
    const doors = Array.from(track.querySelectorAll<HTMLElement>('.parade-pup'));
    const mobile = matchMedia('(max-width: 767px), (pointer: coarse) and (max-height: 519px)');
    const journey = root.querySelector<HTMLElement>('.tp-chat');
    const steps = Array.from(journey?.querySelectorAll<HTMLElement>('.tp-chat__step') ?? []);
    const messages = Array.from(journey?.querySelectorAll<HTMLElement>('.tp-msg-group') ?? []);
    const typing = journey?.querySelector<HTMLElement>('.tp-typing');
    const flight = ways.querySelector<HTMLElement>('.tp-flight');
    const plane = flight?.querySelector<SVGGElement>('.flight-marker');
    const passport = root.querySelector<HTMLElement>('.tp-passport');
    const dusk = root.querySelector<HTMLElement>('.tp-dusk');
    const night = root.querySelector<HTMLElement>('.tp-night');
    const welcome = root.querySelector<HTMLElement>('.tp-home');
    const house = welcome?.querySelector('.tp-house');
    const basket = document.querySelector<HTMLElement>('.tp-basket');
    const mobileStops = [ways, journey, passport, dusk, night, welcome];
    const desktopStops = [
      { scene: journey, anchor: journey?.querySelector('.tp-chat__teddy'), facing: 1 },
      { scene: passport, anchor: passport?.querySelector('.tp-book__teddy'), facing: 1 },
      { scene: dusk, anchor: dusk?.querySelector('.tp-dusk__teddy'), facing: -1 },
      { scene: night, anchor: night?.querySelector('.tp-night__teddy'), facing: -1 },
      { scene: welcome, anchor: welcome?.querySelector('.tp-house__teddy'), facing: 1 },
    ];

    let activeStep = -2;
    let revealedStep = -1;
    let typingTimer = 0;

    function chatStage(active: number) {
      if (activeStep === active) return;
      activeStep = active;
      clearTimeout(typingTimer);

      steps.forEach((step, index) => {
        step.toggleAttribute('data-active', index === active);
        step.toggleAttribute('data-done', index < active);
      });
      if (reduced.matches) {
        messages.forEach(message => { message.dataset.show = 'true'; });
        if (typing) typing.dataset.show = 'false';
        return;
      }

      const isTyping = active >= 0 && active > revealedStep;
      messages.forEach((message, index) => { message.dataset.show = String(index < active || (index === active && !isTyping)); });
      if (typing) typing.dataset.show = String(isTyping);
      if (isTyping) {
        typingTimer = window.setTimeout(() => {
          revealedStep = Math.max(revealedStep, active);
          messages[active].dataset.show = 'true';
          if (typing) typing.dataset.show = 'false';
        }, [680, 780, 700][active]);
      }
    }

    let frame = 0;
    let travel = 0;
    let runway = 0;
    let doorStops: number[] = [];
    let actorFrame = 0;
    let actorTarget: ActorPosition | undefined;
    let actorPosition: ActorPosition | undefined;
    let previousPaint = 0;
    let previousScroll = window.scrollY;
    const initialHash = location.hash;
    let anchorFrame = 0;
    let mounted = true;

    function paint(now: number) {
      actorFrame = 0;
      if (!actorTarget || reduced.matches) return;
      const target = actorTarget;
      const previous = actorPosition ?? target;
      const amount = previousPaint ? 1 - Math.exp(-Math.min(now - previousPaint, 48) / 27) : 1;
      previousPaint = now;
      const x = mix(previous.x, target.x, amount);
      const bottom = mix(previous.bottom, target.bottom, amount);
      const width = mix(previous.width, target.width, amount);
      const height = mix(previous.height, target.height, amount);
      const close = Math.max(
        Math.abs(x - target.x), Math.abs(bottom - target.bottom),
        Math.abs(width - target.width), Math.abs(height - target.height),
      ) < .35;
      const position = close ? target : { ...target, x, bottom, width, height };
      actorPosition = position;

      actor!.style.transform = `translate3d(${position.x - position.width / 2}px,${position.bottom - position.height}px,0)`;
      actor!.style.width = `${position.width}px`;
      actor!.style.height = `${position.height}px`;
      actor!.style.setProperty('--teddy-face', String(position.facing));
      actor!.dataset.pose = position.pose;
      actor!.style.opacity = String(position.opacity);
      actor!.style.visibility = position.opacity > 0 && position.bottom > 0 && position.bottom - position.height < innerHeight ? 'visible' : 'hidden';
      if (!close) actorFrame = requestAnimationFrame(paint);
    }

    function update() {
      frame = 0;
      if (reduced.matches) { chatStage(steps.length - 1); return; }
      const h = window.innerHeight;
      const w = document.documentElement.clientWidth;
      const y = window.scrollY;
      const heroBox = hero!.getBoundingClientRect();
      const peekBox = peek!.getBoundingClientRect();
      const paradeBox = parade!.getBoundingClientRect();
      const signBox = sign!.getBoundingClientRect();
      const mobileLane = mobile.matches;
      const landing = signBox.width ? signBox : ways!.getBoundingClientRect();
      const wideMode = wide.matches;
      const paradeStart = y + paradeBox.top;

      // The pinning distance is derived from the rendered track, including the final CTA.
      const run = wideMode ? between(y, paradeStart, paradeStart + runway) : 0;
      const shift = run * travel;
      if (wideMode) {
        track!.style.transform = `translate3d(${-shift}px,0,0)`;
        const openingLine = w * .44;
        for (const [index, door] of doors.entries()) {
          const crossed = doorStops[index] - shift <= openingLine;
          door.classList.toggle('door-open', run > 0 && (crossed || run >= .999));
        }
      } else {
        track!.style.removeProperty('transform');
      }

      const enterStart = Math.max(0, y + heroBox.bottom - h * .67);
      const enterEnd = paradeStart + (wideMode ? runway * .10 : h * .20);
      const leaveStart = wideMode ? paradeStart + runway * .82 : y + paradeBox.bottom - h * 1.25;
      const leaveEnd = Math.max(leaveStart + h * .16, y + landing.bottom - h * .82);
      const entering = ease(between(y, enterStart, enterEnd));
      const leaving = ease(between(y, leaveStart, leaveEnd));
      const footY = h * (wideMode ? .945 : .87);
      const walkWidth = wideMode ? Math.min(218, w * .16) : 86;
      const walkX = w * (wideMode ? .22 : .12);

      const approach = ease(between(y, leaveStart, leaveEnd - h * .15));
      const settle = ease(between(y, leaveEnd - h * .68, leaveEnd));
      const signCenter = signBox.left + signBox.width / 2;
      let x = mix(mix(peekBox.left + peekBox.width / 2, walkX, entering), signCenter, approach);
      let bottom = mix(mix(peekBox.bottom + (wideMode ? 40 : 0), footY, entering), Math.min(signBox.bottom, h * .99), leaving);
      let width = mix(mix(peekBox.width, walkWidth, entering), signBox.width, settle);
      let height = mix(mix(peekBox.height, walkWidth * .8, entering), signBox.height, settle);
      let pose: ActorPosition['pose'] = entering < .28 ? 'peek' : 'walk';
      let facing = entering > .10 && entering < 1 && leaving === 0 ? -1 : 1;

      if (mobileLane) {
        const merge = ease(between(entering, .55, 1));
        const left = w * .048;
        const right = w * .763;
        let laneX = left;
        let hop = 0;
        let welcomeProgress = 0;
        facing = 1;
        for (const [index, stop] of mobileStops.entries()) {
          if (!stop) continue;
          const top = stop.getBoundingClientRect().top;
          const progress = 1 - between(top, h * .04, h * .58);
          if (progress === 0) break;
          const next = stop === welcome ? w * .21 : index % 2 === 0 ? right : left;
          if (stop === welcome) welcomeProgress = ease(progress);
          laneX = mix(laneX, next, ease(progress));
          // Teddy faces inward while waiting and toward the next stop on the hop.
          facing = next === right ? (progress === 1 ? -1 : 1) : (progress === 1 ? 1 : -1);
          if (progress < 1) {
            hop = Math.sin(progress * Math.PI) * 26;
            break;
          }
        }
        x = mix(mix(peekBox.left + peekBox.width / 2, walkX, entering), laneX, merge);
        bottom = mix(mix(peekBox.bottom + (wideMode ? 40 : 0), footY, entering), h - 23 - hop, merge);
        width = mix(mix(peekBox.width, walkWidth, entering), Math.min(180, w * .48), merge);
        if (welcomeProgress && house) {
          const step = Math.max(h * .88, Math.min(h - 23, house.getBoundingClientRect().bottom + 30));
          bottom = mix(bottom, step, welcomeProgress);
          facing = -1;
        }
        height = width * .8;
        // On the narrow parade the reference rests Teddy's head and paws on
        // the bottom ledge while the puppy doors scroll past him.
        if (paradeBox.top < -h * .15 && paradeBox.bottom > h * .95) pose = 'peek';
      } else if (y >= leaveEnd) {
        let previous = signBox;
        let restingFacing = 1;
        x = previous.left + previous.width / 2;
        bottom = previous.bottom;
        pose = 'sit';
        for (const { scene, anchor, facing: nextFacing } of desktopStops) {
          if (!scene || !anchor) continue;
          const next = anchor.getBoundingClientRect();
          if (!next.width) continue;
          const sceneTop = y + scene.getBoundingClientRect().top;
          // The Journey phone is sticky. Its arrival threshold must use the
          // scene position, while the sitting pose follows the rendered phone.
          const arrival = scene === journey ? sceneTop - h * .025
            : Math.max(sceneTop - h * .18, y + next.bottom - h * .965);
          const progress = between(y, arrival - h * .52, arrival);
          if (progress < 1) {
            const transition = ease(progress);
            const release = ease(1 - between(previous.bottom, h * .33, h * .70));
            const launch = mix(previous.bottom, h * .91, release);
            x = mix(previous.left + previous.width / 2, next.left + next.width / 2, transition);
            bottom = mix(launch, Math.min(next.bottom, h * .985), transition) - Math.sin(progress * Math.PI) * 25;
            width = mix(previous.width, next.width, transition);
            height = mix(previous.height, next.height, transition);
            pose = progress > .04 || release > .12 ? 'walk' : 'sit';
            restingFacing = pose === 'walk' && next.left < previous.left ? -1 : pose === 'walk' ? 1 : restingFacing;
            break;
          }
          previous = next;
          restingFacing = nextFacing;
          x = next.left + next.width / 2;
          bottom = next.bottom;
          const scale = scene === welcome ? 1.12 : 1;
          width = next.width * scale;
          height = next.height * scale;
          if (scene === welcome) pose = 'bow';
        }
        facing = restingFacing;
      }

      let opacity = 1;
      if (basket) {
        const rect = basket.getBoundingClientRect();
        const scrollEnd = document.documentElement.scrollHeight - h;
        const available = h - (rect.top + y - scrollEnd);
        const progress = between(h - rect.top, h * .08, Math.min(h * .46, available));
        const approachBasket = ease(progress);
        const tuckedIn = ease(between(progress, .80, 1));
        basket.style.setProperty('--basket-tuck', String(tuckedIn));
        if (progress > 0) {
          // The travelling sprite passes between the back and front rim.
          // Dock its head at the same point as the footer's resting sprite.
          x = mix(x, rect.left + rect.width * .87, approachBasket);
          const jump = Math.sin(progress * Math.PI) * Math.min(80, h * .1);
          const launch = Math.max(h * .86, bottom);
          bottom = mix(launch, rect.bottom, approachBasket) - jump;
          width = mix(width, rect.width, approachBasket);
          height = width * .8;
          facing = -1;
          pose = 'walk';
          opacity = 1 - tuckedIn;
        } else if (welcome && welcome.getBoundingClientRect().bottom < h * .92) {
          // Keep the actor on the floor while the basket is still below the fold.
          const carry = ease(1 - between(bottom, h * .32, h * .82));
          bottom = mix(bottom, h * .88, carry);
          if (carry > .12) pose = 'walk';
        }
      }
      if (welcome) welcome.toggleAttribute('data-visited', welcome.getBoundingClientRect().top < h * .14);
      actorTarget = { x, bottom, width, height, facing, pose, opacity };
      const journeyTop = journey?.getBoundingClientRect().top ?? Infinity;
      actor!.toggleAttribute('data-calling', journeyTop > h * .1 && journeyTop < h * .75 && pose === 'walk');
      if (Math.abs(y - previousScroll) > h * .85) actorPosition = undefined;
      previousScroll = y;
      if (!actorFrame) actorFrame = requestAnimationFrame(paint);
      hero!.style.setProperty('--hero-scroll', String(clamp(-heroBox.top / (heroBox.height * .65))));

      if (flight && plane) {
        const rect = flight.getBoundingClientRect();
        const progress = between(h - rect.top, 0, h + rect.height * .595);
        const u = 1 - progress;
        const px = 40 * u ** 3 + 3 * 170 * u ** 2 * progress + 3 * 470 * u * progress ** 2 + 620 * progress ** 3;
        const py = 250 * u ** 3 + 3 * 40 * u ** 2 * progress + 3 * 20 * u * progress ** 2 + 168 * progress ** 3;
        const dx = 130 * u ** 2 + 600 * u * progress + 150 * progress ** 2;
        const dy = -210 * u ** 2 - 40 * u * progress + 148 * progress ** 2;
        const tilt = Math.atan2(dy, dx) * 180 / Math.PI;
        plane.setAttribute('transform', `translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${tilt.toFixed(1)})`);
        plane.style.opacity = String(ease(between(progress, 0, .10)) * (1 - ease(between(progress, .91, 1))));
      }

      if (journey) {
        const threshold = h * (wide.matches ? .42 : .77);
        const active = steps.reduce((last, step, index) => step.getBoundingClientRect().top <= threshold ? index : last, -1);
        chatStage(active);
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    function measure() {
      const enabled = !reduced.matches;
      activeStep = -2;
      root!.classList.toggle('motion-ready', enabled);
      basket?.toggleAttribute('data-animated', enabled);
      actorPosition = undefined;
      const pin = enabled && wide.matches;
      parade!.toggleAttribute('data-pinned', pin);
      travel = pin ? Math.max(0, track!.scrollWidth - hall!.clientWidth) : 0;
      runway = travel * .781;
      doorStops = pin ? doors.map(door => door.offsetLeft + door.offsetWidth / 2) : [];
      parade!.style.setProperty('--parade-distance', `${runway}px`);
      if (!pin) {
        track!.style.removeProperty('transform');
        doors.forEach(door => door.classList.remove('door-open'));
      }
      if (!enabled) actor!.style.visibility = 'hidden';
      schedule();
    }

    function revealFocused(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof HTMLAnchorElement) || !target.matches(':focus-visible') || !wide.matches || reduced.matches) return;
      const w = hall!.clientWidth;
      const offset = target.offsetLeft + target.offsetWidth / 2 - w * .40;
      const start = window.scrollY + parade!.getBoundingClientRect().top;
      window.scrollTo({ top: start + clamp(offset / Math.max(1, travel)) * runway, behavior: 'instant' });
    }

    const resize = new ResizeObserver(measure);
    resize.observe(track);
    resize.observe(sticky);
    resize.observe(sign);
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', measure);
    reduced.addEventListener('change', measure);
    wide.addEventListener('change', measure);
    track.addEventListener('focusin', revealFocused);
    measure();
    // Resolve an incoming fragment after the font metrics and parade height settle.
    if (initialHash) {
      document.fonts.ready.then(() => {
        if (!mounted || location.hash !== initialHash) return;
        anchorFrame = requestAnimationFrame(() => {
          const target = document.getElementById(initialHash.slice(1));
          if (target && root!.contains(target)) target.scrollIntoView({ behavior: 'instant' });
        });
      });
    }

    return () => {
      mounted = false;
      cancelAnimationFrame(anchorFrame);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(actorFrame);
      clearTimeout(typingTimer);
      resize.disconnect();
      removeEventListener('scroll', schedule);
      removeEventListener('resize', measure);
      reduced.removeEventListener('change', measure);
      wide.removeEventListener('change', measure);
      track.removeEventListener('focusin', revealFocused);
      root.classList.remove('motion-ready');
      parade.removeAttribute('data-pinned');
      basket?.removeAttribute('data-animated');
      basket?.style.removeProperty('--basket-tuck');
      welcome?.removeAttribute('data-visited');
    };
  }, []);

  return (
    <>
      <div ref={actorRef} className="home-actor" aria-hidden="true">
        <img className="actor-peek" src="/media/teddy-peek.svg" alt="" />
        <img className="actor-walk" src="/media/teddy-walk.svg" alt="" />
        <img className="actor-sit" src="/media/teddy-sit.svg" alt="" />
        <img className="actor-bow" src="/media/teddy-bow.svg" alt="" />
        <span className="actor-bubble">coming?</span>
      </div>
    </>
  );
}
