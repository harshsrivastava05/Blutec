"use client";

import { useEffect, useRef } from "react";
import { pawPath } from "@/lib/paw";

const spacing = 41;
const lifespan = 1050;
type Print = { x: number; y: number; angle: number; born: number };

export function PawTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const pointer = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const paw = new Path2D(pawPath);
    let prints: Print[] = [];
    let previous: { x: number; y: number } | undefined;
    let traveled = 0;
    let sequence = 0;
    let frame = 0;
    let scale = 1;

    function paint(now: number) {
      frame = 0;
      ctx!.clearRect(0, 0, canvas!.width / scale, canvas!.height / scale);
      prints = prints.filter((print) => now - print.born < lifespan);
      ctx!.fillStyle = "#d17b3e";
      ctx!.strokeStyle = "#73320e";
      ctx!.lineWidth = 2.4;
      ctx!.lineJoin = "round";
      for (const { x, y, angle, born } of prints) {
        const progress = Math.max(0, (now - born) / lifespan);
        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(angle);
        ctx!.globalAlpha = 0.56 * (1 - progress) ** 1.1;
        ctx!.scale(0.35, 0.35);
        ctx!.translate(-32, -32);
        ctx!.stroke(paw);
        ctx!.fill(paw);
        ctx!.restore();
      }
      canvas!.toggleAttribute("data-drawing", prints.length > 0);
      if (prints.length) frame = requestAnimationFrame(paint);
    }

    function move(event: PointerEvent) {
      if (!pointer.matches || event.pointerType !== "mouse") {
        previous = undefined;
        return;
      }
      const next = { x: event.clientX, y: event.clientY };
      const start = previous;
      previous = next;
      if (!start) return;

      const dx = next.x - start.x;
      const dy = next.y - start.y;
      const length = Math.hypot(dx, dy);
      if (length < 1 || length > 520) {
        if (length > 520) traveled = 0;
        return;
      }

      const angle = Math.atan2(dy, dx);
      const now = performance.now();
      for (
        let distance = spacing - traveled;
        distance <= length;
        distance += spacing
      ) {
        const offset = sequence++ % 2 ? 9 : -9;
        prints.push({
          x: start.x + (dx * distance) / length - Math.sin(angle) * offset,
          y: start.y + (dy * distance) / length + Math.cos(angle) * offset,
          angle: angle + Math.PI / 2 + offset * 0.018,
          born: now,
        });
      }
      traveled = (traveled + length) % spacing;
      if (prints.length > 48) prints.splice(0, prints.length - 48);
      if (prints.length && !frame) frame = requestAnimationFrame(paint);
    }

    function resetPointer() {
      previous = undefined;
      traveled = 0;
    }

    function resize() {
      cancelAnimationFrame(frame);
      frame = 0;
      prints = [];
      canvas!.removeAttribute("data-drawing");
      resetPointer();
      scale = Math.min(devicePixelRatio || 1, 2);
      canvas!.width = pointer.matches ? Math.round(innerWidth * scale) : 1;
      canvas!.height = pointer.matches ? Math.round(innerHeight * scale) : 1;
      ctx!.setTransform(scale, 0, 0, scale, 0, 0);
    }

    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", resetPointer);
    addEventListener("blur", resetPointer);
    pointer.addEventListener("change", resize);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener(
        "pointerleave",
        resetPointer,
      );
      removeEventListener("blur", resetPointer);
      pointer.removeEventListener("change", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="paw-trail" aria-hidden="true" />;
}
