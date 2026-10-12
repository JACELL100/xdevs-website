"use client";

import { useEffect, useMemo, useRef } from "react";
import { stackFlat } from "@/content/stack";

const R = 1; // unit sphere, scaled in CSS

/** Fibonacci sphere distribution so labels spread evenly. */
function spherePoints(n: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push([Math.cos(t) * r * R, y * 0.86 * R, Math.sin(t) * r * R]);
  }
  return pts;
}

const MERIDIANS = 6;
const PARALLELS = [-0.66, -0.33, 0, 0.33, 0.66];

/**
 * Rotating wireframe globe with the tech stack orbiting on its surface.
 * Decorative: the accessible list lives next to it. Pauses off-screen and
 * stays still under reduced motion.
 */
export function TechOrbit() {
  const wrap = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLLIElement | null)[]>([]);
  const meridians = useRef<(SVGEllipseElement | null)[]>([]);
  const pts = useMemo(() => spherePoints(stackFlat.length), []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = 0.6;
    let tilt = -0.28;
    let targetTilt = tilt;
    let raf = 0;
    let running = false;
    let last = performance.now();

    const render = () => {
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      pts.forEach(([x, y, z], i) => {
        const li = labels.current[i];
        if (!li) return;
        // rotate around Y, then X
        const x1 = x * cosA + z * sinA;
        const z1 = -x * sinA + z * cosA;
        const y2 = y * cosT - z1 * sinT;
        const z2 = y * sinT + z1 * cosT;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const s = 0.7 + depth * 0.45;
        li.style.transform = `translate(-50%, -50%) translate3d(${x1 * 42}cqmin, ${-y2 * 42}cqmin, 0) scale(${s})`;
        li.style.opacity = String(0.18 + depth * 0.82);
        li.style.zIndex = String(Math.round(depth * 100));
        li.style.filter = depth < 0.35 ? "blur(1px)" : "";
      });
      meridians.current.forEach((m, i) => {
        if (!m) return;
        const a = angle + (i * Math.PI) / MERIDIANS;
        m.setAttribute("rx", String(Math.abs(Math.cos(a)) * 100));
      });
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      angle += dt * 0.22;
      tilt += (targetTilt - tilt) * 0.05;
      render();
      if (running) raf = requestAnimationFrame(loop);
    };

    render();
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      targetTilt = -0.28 + ((e.clientY - r.top) / r.height - 0.5) * 0.4;
    };
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
    };
  }, [pts]);

  return (
    <div
      ref={wrap}
      aria-hidden
      className="relative mx-auto aspect-square w-full max-w-[560px] [container-type:size]"
    >
      <div className="spotlight absolute inset-[-10%] rounded-full" />
      <svg viewBox="-110 -110 220 220" className="absolute inset-[8%] h-[84%] w-[84%] overflow-visible">
        <defs>
          <radialGradient id="globe-fill" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle r="100" fill="url(#globe-fill)" stroke="#B9BDC4" strokeOpacity="0.35" strokeWidth="0.6" />
        <g transform="rotate(-16)">
          {PARALLELS.map((p) => (
            <ellipse
              key={p}
              cx="0"
              cy={p * 100}
              rx={Math.sqrt(1 - p * p) * 100}
              ry={Math.sqrt(1 - p * p) * 22}
              fill="none"
              stroke="#B9BDC4"
              strokeOpacity="0.18"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: MERIDIANS }).map((_, i) => (
            <ellipse
              key={i}
              ref={(el) => void (meridians.current[i] = el)}
              cx="0"
              cy="0"
              rx="100"
              ry="100"
              fill="none"
              stroke="#B9BDC4"
              strokeOpacity="0.22"
              strokeWidth="0.5"
            />
          ))}
        </g>
      </svg>
      <ul className="absolute inset-0">
        {stackFlat.map((t, i) => (
          <li
            key={t}
            ref={(el) => void (labels.current[i] = el)}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-line-strong bg-black/70 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-silver-100 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.9)] md:text-xs"
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
