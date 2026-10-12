import { centrePaths, strokePaths, viewBox } from "@/lib/emblem";

const lines = centrePaths();
const fills = strokePaths();

/**
 * Intro loader: the X draws itself line by line, fills with chrome, then the
 * curtain lifts. Pure CSS (no JS gate), so it never blocks content. It plays
 * once per session (see the inline script in the root layout) and is skipped
 * under reduced motion.
 */
export function Loader() {
  return (
    <div id="xd-loader" aria-hidden="true" className="xd-loader">
      <svg viewBox={viewBox} className="h-24 w-auto md:h-28">
        <defs>
          <linearGradient id="ld-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6B7078" />
            <stop offset="0.45" stopColor="#F2F3F5" />
            <stop offset="0.6" stopColor="#B9BDC4" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        {lines.map((d, i) => (
          <path
            key={`l${i}`}
            d={d}
            pathLength={1}
            className="xd-loader-line"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
        {fills.map((d, i) => (
          <path key={`f${i}`} d={d} fill="url(#ld-g)" className="xd-loader-fill" />
        ))}
      </svg>
      <span className="label xd-loader-word text-grey-400">
        THE &lt;<span className="text-white">xDEVS</span>&gt;
      </span>
    </div>
  );
}

/**
 * Runs before paint: skip the loader if it already played this session, and
 * enable scroll reveals (they stay visible without JS or with reduced motion).
 */
export const loaderScript = `try{var d=document.documentElement,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('reveal-ready');if(sessionStorage.getItem('xd-intro')||r){d.classList.add('xd-no-loader')}else{sessionStorage.setItem('xd-intro','1')}}catch(e){}`;
