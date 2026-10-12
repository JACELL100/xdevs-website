"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { EmblemSVG } from "@/components/ui/EmblemSVG";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Mode = "static" | "3d";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero visual. Renders the static chrome X immediately (fast LCP, no JS cost),
 * then upgrades to the interactive 3D scene on capable desktop devices once
 * the browser is idle. Reduced motion, touch devices, data saver and
 * low-power hardware keep the lightweight version.
 */
export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [mode, setMode] = useState<Mode>("static");
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const lowPower =
      (nav.hardwareConcurrency ?? 8) < 4 ||
      (nav.deviceMemory ?? 8) < 4 ||
      nav.connection?.saveData === true;
    if (reduce || !fine || !wide || lowPower || !hasWebGL()) return;

    const start = () => setMode("3d");
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  // Pointer parallax (window-wide) and pause when off-screen / hidden.
  useEffect(() => {
    if (mode !== "3d") return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    let onScreen = true;
    const update = () => setActive(visible && onScreen);
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    if (wrap.current) io.observe(wrap.current);
    const onVis = () => {
      visible = document.visibilityState === "visible";
      update();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, [mode]);

  return (
    <div ref={wrap} className="relative h-full w-full">
      {/* Static / fallback emblem */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div aria-hidden className="absolute aspect-square w-[min(78%,520px)] rounded-full border border-line animate-[spin_60s_linear_infinite]" />
        <div aria-hidden className="absolute aspect-square w-[min(62%,420px)] rounded-full border border-dashed border-white/10 animate-[spin_90s_linear_infinite_reverse]" />
        <div aria-hidden className="spotlight absolute aspect-square w-[min(70%,460px)] rounded-full" />
        <div className="hero-float relative w-[min(48%,300px)]">
          <EmblemSVG className="h-auto w-full" idSuffix="hero" />
        </div>
      </div>

      {mode === "3d" && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroScene active={active} lite={false} pointer={pointer} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
