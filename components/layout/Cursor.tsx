"use client";

import { useEffect, useRef } from "react";

/**
 * Soft-glow cursor follower for desktop. The native cursor stays visible
 * (accessibility); this only adds a halo that swells over interactive elements.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let scale = 1;
    let target = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        cx = x;
        cy = y;
        el.style.opacity = "1";
      }
      const t = e.target as Element | null;
      target = t?.closest("a, button, [role='button'], input, textarea, select, label") ? 2.4 : 1;
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      scale += (target - scale) * 0.15;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-6 w-6 rounded-full opacity-0 mix-blend-screen transition-opacity duration-300 [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{
        background:
          "radial-gradient(circle, rgb(255 255 255 / 0.55) 0%, rgb(242 243 245 / 0.18) 40%, transparent 70%)",
        boxShadow: "0 0 40px 10px rgb(242 243 245 / 0.06)",
      }}
    />
  );
}
