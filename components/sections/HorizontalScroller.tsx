"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins its content on large screens and converts vertical scroll into
 * horizontal travel of the list. Below `lg`, or with reduced motion, it is a
 * plain swipeable row and the pinning height collapses.
 */
export function HorizontalScroller({ header, children }: { header: ReactNode; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    if (!o || !t) return;
    const wide = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let distance = 0;
    let x = 0;
    let target = 0;
    let raf = 0;
    let enabled = false;

    const measure = () => {
      enabled = wide.matches && !reduce.matches;
      o.dataset.pinned = String(enabled);
      if (!enabled) {
        t.style.transform = "";
        o.style.height = "";
        return;
      }
      distance = Math.max(0, t.scrollWidth - window.innerWidth + 64);
      o.style.height = `${window.innerHeight + distance * 1.1}px`;
      onScroll();
    };

    const tick = () => {
      x += (target - x) * 0.14;
      if (Math.abs(target - x) < 0.3) x = target;
      t.style.transform = `translate3d(${-x}px, 0, 0)`;
      raf = x === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!enabled) return;
      const r = o.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      target = p * distance;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    wide.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div ref={outer} data-pinned="false" className="group/pin relative">
      <div className="flex flex-col gap-12 py-28 group-data-[pinned=true]/pin:sticky group-data-[pinned=true]/pin:top-0 group-data-[pinned=true]/pin:h-screen group-data-[pinned=true]/pin:justify-center group-data-[pinned=true]/pin:overflow-hidden group-data-[pinned=true]/pin:py-0 lg:gap-14">
        {header}
        <ul
          ref={track}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] md:px-10 lg:gap-6 lg:px-16 group-data-[pinned=true]/pin:snap-none group-data-[pinned=true]/pin:overflow-visible group-data-[pinned=true]/pin:pb-0 group-data-[pinned=true]/pin:pl-[max(4rem,calc((100vw-1440px)/2+4rem))] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </ul>
      </div>
    </div>
  );
}
