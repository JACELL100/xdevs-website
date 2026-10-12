"use client";

import { useEffect } from "react";

/**
 * One delegated pointer handler for every `[data-tilt]` card (3D tilt +
 * cursor spotlight) and `[data-magnetic]` button (magnetic pull). Keeping
 * this in a single listener means the cards and buttons themselves are plain
 * server-rendered markup with no hydration cost.
 * Desktop pointers only; reduced motion keeps the spotlight but drops movement.
 */
export function Interactions() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tiltEl: HTMLElement | null = null;
    let magEl: HTMLElement | null = null;
    let last: PointerEvent | null = null;
    let raf = 0;

    const resetTilt = () => {
      if (!tiltEl) return;
      tiltEl.style.transform = "";
      tiltEl.style.setProperty("--spot", "0");
      tiltEl = null;
    };
    const resetMag = () => {
      if (!magEl) return;
      magEl.style.transform = "";
      magEl = null;
    };

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const tilt = target?.closest?.<HTMLElement>("[data-tilt]") ?? null;
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        tilt.style.setProperty("--mx", `${px * 100}%`);
        tilt.style.setProperty("--my", `${py * 100}%`);
        tilt.style.setProperty("--spot", "1");
        if (!reduce) {
          const max = Number(tilt.dataset.tilt) || 6;
          tilt.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${
            (px - 0.5) * max
          }deg)`;
        }
      }

      const mag = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
      if (mag !== magEl) resetMag();
      if (mag && !reduce) {
        magEl = mag;
        const r = mag.getBoundingClientRect();
        const s = Number(mag.dataset.magnetic) || 10;
        const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
        const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
        mag.style.transform = `translate3d(${x * s}px, ${y * s * 0.6}px, 0)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      resetTilt();
      resetMag();
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return null;
}
