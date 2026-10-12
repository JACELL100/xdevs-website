"use client";

import { useEffect, useRef } from "react";

/**
 * Stylised dotted 3D globe drawn on a 2D canvas (no WebGL). Rotates slowly,
 * pauses off-screen and renders a single still frame under reduced motion.
 */
export function ContactGlobe() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Points on a sphere (lat/long grid with jitter-free spacing).
    const pts: [number, number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 8) {
      const r = Math.cos((lat * Math.PI) / 180);
      const count = Math.max(6, Math.round(48 * r));
      for (let i = 0; i < count; i++) {
        const lon = (i / count) * Math.PI * 2;
        pts.push([r * Math.cos(lon), Math.sin((lat * Math.PI) / 180), r * Math.sin(lon)]);
      }
    }
    const arcs: [number, number][] = [
      [12, 210],
      [80, 330],
      [150, 420],
      [260, 30],
    ];

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let angle = 0;
    const tilt = -0.35;
    const project = ([x, y, z]: [number, number, number]) => {
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const y2 = y * Math.cos(tilt) - z1 * Math.sin(tilt);
      const z2 = y * Math.sin(tilt) + z1 * Math.cos(tilt);
      const R = Math.min(w, h) * 0.38;
      return { x: w / 2 + x1 * R, y: h / 2 - y2 * R, z: z2 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.38;
      const g = ctx.createRadialGradient(w / 2 - R * 0.3, h / 2 - R * 0.4, 0, w / 2, h / 2, R * 1.3);
      g.addColorStop(0, "rgba(242,243,245,0.10)");
      g.addColorStop(1, "rgba(242,243,245,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      for (const p of pts) {
        const q = project(p);
        const a = q.z > 0 ? 0.25 + q.z * 0.7 : 0.08;
        ctx.fillStyle = `rgba(242,243,245,${a})`;
        ctx.fillRect(q.x, q.y, q.z > 0 ? 1.6 : 1.1, q.z > 0 ? 1.6 : 1.1);
      }
      ctx.lineWidth = 1;
      for (const [a, b] of arcs) {
        const pa = project(pts[a % pts.length]);
        const pb = project(pts[b % pts.length]);
        if (pa.z < 0 && pb.z < 0) continue;
        const mx = (pa.x + pb.x) / 2;
        const my = (pa.y + pb.y) / 2 - 40;
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.quadraticCurveTo(mx, my, pb.x, pb.y);
        ctx.stroke();
        for (const p of [pa, pb]) {
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      angle += 0.0025;
      draw();
      if (running) raf = requestAnimationFrame(loop);
    };
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);
    if (reduce) return () => ro.disconnect();

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <canvas ref={ref} aria-hidden className="block aspect-square w-full" />
      <p className="label absolute bottom-5 left-6 text-grey-400">Let&apos;s build something together</p>
    </div>
  );
}
