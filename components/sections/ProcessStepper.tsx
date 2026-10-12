"use client";

import { useEffect } from "react";

/**
 * Tracks scroll progress through the sticky process track and writes the
 * active step to `data-active` / `data-state` attributes and the progress to
 * `--p`. All visuals are CSS (see "Process" in globals.css).
 */
export function ProcessStepper({ trackId, steps }: { trackId: string; steps: number }) {
  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return;
    const items = Array.from(track.querySelectorAll<HTMLElement>("[data-step]"));
    const panels = Array.from(track.querySelectorAll<HTMLElement>("[data-panel]"));
    let current = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = track.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -r.top / total));
      track.style.setProperty("--p", p.toFixed(4));
      const active = Math.min(steps - 1, Math.floor(p * steps));
      if (active === current) return;
      current = active;
      track.dataset.active = String(active);
      items.forEach((el, i) => {
        el.dataset.state = i === active ? "current" : "idle";
        if (i === active) el.setAttribute("aria-current", "step");
        else el.removeAttribute("aria-current");
      });
      panels.forEach((el, i) => {
        const d = i - active;
        el.dataset.state = d === 0 ? "current" : d < 0 ? "past" : `next${Math.min(d, 3)}`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackId, steps]);

  return null;
}
