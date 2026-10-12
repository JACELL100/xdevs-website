import type { ProcessStep } from "@/content/process";

/** Monochrome illustrations for each process phase (pure SVG, no assets). */
export function ProcessVisual({ step }: { step: ProcessStep["key"] }) {
  const common = "h-full w-full";
  switch (step) {
    case "discover":
      return (
        <svg viewBox="0 0 320 220" className={common} aria-hidden>
          <defs>
            <pattern id="pv-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="13" cy="13" r="1.4" fill="#6B7078" />
            </pattern>
            <radialGradient id="pv-d" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="7" y="7" width="312" height="208" fill="url(#pv-dots)" />
          <circle cx="160" cy="110" r="70" fill="url(#pv-d)" />
          <circle cx="150" cy="100" r="44" fill="none" stroke="#F2F3F5" strokeWidth="2" />
          <path d="M182 132l34 34" stroke="#F2F3F5" strokeWidth="6" strokeLinecap="round" />
          {[
            [124, 88],
            [150, 72],
            [170, 108],
            [138, 118],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={3.5} fill="#fff" />
          ))}
          <path d="M124 88L150 72L170 108L138 118Z" fill="none" stroke="#B9BDC4" strokeWidth="1" />
        </svg>
      );
    case "design":
      return (
        <svg viewBox="0 0 320 220" className={common} aria-hidden>
          <rect x="30" y="24" width="260" height="172" rx="14" fill="none" stroke="#B9BDC4" strokeWidth="1.5" />
          <rect x="30" y="24" width="260" height="26" rx="14" fill="#24272C" />
          <circle cx="46" cy="37" r="3" fill="#6B7078" />
          <circle cx="58" cy="37" r="3" fill="#6B7078" />
          <circle cx="70" cy="37" r="3" fill="#6B7078" />
          <rect x="46" y="66" width="120" height="14" rx="4" fill="#F2F3F5" />
          <rect x="46" y="88" width="90" height="8" rx="4" fill="#6B7078" />
          <rect x="46" y="112" width="70" height="68" rx="10" fill="none" stroke="#F2F3F5" strokeDasharray="4 4" />
          <rect x="124" y="112" width="70" height="68" rx="10" fill="#24272C" />
          <rect x="202" y="112" width="72" height="68" rx="10" fill="#24272C" />
          <rect x="190" y="62" width="84" height="26" rx="13" fill="#F2F3F5" />
          <path d="M248 150l18 30 6-12 14-2z" fill="#fff" stroke="#000" strokeWidth="1.5" />
        </svg>
      );
    case "develop":
      return (
        <svg viewBox="0 0 320 220" className={common} aria-hidden>
          <rect x="24" y="20" width="272" height="180" rx="14" fill="#0B0B0C" stroke="#B9BDC4" strokeWidth="1.5" />
          {[
            [44, 52, 60, "#F2F3F5"],
            [112, 52, 90, "#6B7078"],
            [60, 74, 120, "#B9BDC4"],
            [60, 96, 70, "#6B7078"],
            [138, 96, 80, "#F2F3F5"],
            [76, 118, 140, "#6B7078"],
            [60, 140, 50, "#B9BDC4"],
            [44, 162, 30, "#F2F3F5"],
          ].map(([x, y, w, c], i) => (
            <rect key={i} x={x as number} y={y as number} width={w as number} height="8" rx="4" fill={c as string} />
          ))}
          <rect x="82" y="160" width="2" height="12" fill="#fff" className="animate-pulse" />
          <g transform="translate(224 140)">
            <circle r="24" fill="#24272C" stroke="#F2F3F5" strokeWidth="1.5" />
            <path d="M-10 0l7 7 13-14" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "deploy":
      return (
        <svg viewBox="0 0 320 220" className={common} aria-hidden>
          <path d="M20 190H300" stroke="#6B7078" />
          {[40, 70, 100, 130, 160, 190, 220, 250, 280].map((x, i) => (
            <rect
              key={x}
              x={x - 8}
              y={190 - (30 + ((i * 37) % 60) + i * 8)}
              width="16"
              height={30 + ((i * 37) % 60) + i * 8}
              rx="4"
              fill={i === 8 ? "#F2F3F5" : "#24272C"}
              stroke="#B9BDC4"
              strokeOpacity="0.4"
            />
          ))}
          <path
            d="M32 150 C 90 140, 120 120, 160 100 S 240 50, 290 36"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
          />
          <circle cx="290" cy="36" r="6" fill="#fff" />
          <circle
            cx="290"
            cy="36"
            r="14"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.5"
            className="animate-ping [transform-box:fill-box] [transform-origin:center]"
          />
        </svg>
      );
  }
}
