"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

let instance: Lenis | null = null;
export const getLenis = () => instance;

/**
 * Inertial smooth scrolling for mouse / trackpad users. Lenis is loaded on
 * demand, so touch devices and reduced-motion users never download it.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !fine) return;

    let cancelled = false;
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      instance = new LenisCtor({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        anchors: { offset: -96 },
        autoRaf: true,
      });
    });
    return () => {
      cancelled = true;
      instance?.destroy();
      instance = null;
    };
  }, []);

  return null;
}
