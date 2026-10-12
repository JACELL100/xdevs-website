/**
 * Illustrative CSS device mockups with abstract UI. They contain no real
 * client screens; swap in approved screenshots later via the `screen` prop.
 */
import type { ReactNode } from "react";

/** Abstract marketplace screen (SVG keeps the DOM tiny). */
function AbstractListings() {
  const cards = Array.from({ length: 6 }, (_, i) => ({ x: 12 + (i % 3) * 102, y: 52 + Math.floor(i / 3) * 70 }));
  return (
    <svg viewBox="0 0 320 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dv-img" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#24272C" />
          <stop offset="0.5" stopColor="#6B7078" />
          <stop offset="1" stopColor="#24272C" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="#0B0B0C" />
      <rect x="12" y="10" width="54" height="6" rx="3" fill="#F2F3F5" opacity="0.85" />
      <rect x="208" y="10" width="28" height="6" rx="3" fill="#6B7078" />
      <rect x="242" y="10" width="28" height="6" rx="3" fill="#6B7078" />
      <rect x="276" y="10" width="32" height="6" rx="3" fill="#fff" />
      <rect x="12" y="24" width="296" height="18" rx="5" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.1" />
      {cards.map(({ x, y }, i) => (
        <g key={i}>
          <rect x={x} y={y} width="94" height="62" rx="5" fill="#fff" fillOpacity="0.03" stroke="#fff" strokeOpacity="0.1" />
          <rect x={x} y={y} width="94" height="38" rx="5" fill="url(#dv-img)" opacity={0.6 + (i % 3) * 0.15} />
          <rect x={x + 6} y={y + 44} width="56" height="4" rx="2" fill="#B9BDC4" opacity="0.7" />
          <rect x={x + 6} y={y + 52} width="36" height="4" rx="2" fill="#6B7078" />
        </g>
      ))}
    </svg>
  );
}

/** Abstract mobile app screen. */
function AbstractApp({ variant = 0 }: { variant?: number }) {
  return (
    <svg viewBox="0 0 100 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`dv-app-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={variant % 2 ? "#B9BDC4" : "#24272C"} />
          <stop offset="0.55" stopColor="#6B7078" />
          <stop offset="1" stopColor="#24272C" />
        </linearGradient>
      </defs>
      <rect width="100" height="200" fill="#0B0B0C" />
      <rect x="8" y="22" width="36" height="5" rx="2.5" fill="#F2F3F5" opacity="0.85" />
      <rect x="8" y="34" width="84" height="54" rx="6" fill={`url(#dv-app-${variant})`} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(8 ${96 + i * 20})`}>
          <rect width="84" height="16" rx="4" fill="#fff" fillOpacity="0.03" stroke="#fff" strokeOpacity="0.1" />
          <rect x="4" y="3.5" width="9" height="9" rx="2" fill="#6B7078" opacity="0.6" />
          <rect x="17" y="4" width="44" height="3" rx="1.5" fill="#B9BDC4" opacity="0.7" />
          <rect x="17" y="9.5" width="28" height="3" rx="1.5" fill="#6B7078" />
        </g>
      ))}
      <rect x="8" y="178" width="84" height="12" rx="6" fill="#fff" />
    </svg>
  );
}

export function Laptop({ screen }: { screen?: ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="rounded-t-[14px] border border-white/15 bg-gradient-to-b from-[#2b2e33] to-[#141518] p-[2.2%] shadow-[inset_0_1px_0_rgb(255_255_255/0.2)]">
        <div className="aspect-[16/10] overflow-hidden rounded-[6px] bg-black">{screen ?? <AbstractListings />}</div>
      </div>
      <div className="relative mx-[-6%] h-3 rounded-b-[14px] bg-gradient-to-b from-[#d9dce1] via-[#9a9fa7] to-[#4b4f56] shadow-[0_30px_50px_-10px_rgb(0_0_0/0.9)]">
        <div className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#6B7078]" />
      </div>
    </div>
  );
}

export function Phone({ screen, variant = 0 }: { screen?: ReactNode; variant?: number }) {
  return (
    <div className="relative aspect-[9/19] w-full rounded-[22%/10.5%] border border-white/20 bg-gradient-to-b from-[#3a3d43] via-[#1a1b1e] to-[#2b2e33] p-[5%] shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_30px_60px_-15px_rgb(0_0_0/0.95)]">
      <div className="relative h-full overflow-hidden rounded-[18%/8.5%] bg-black">
        <div className="absolute left-1/2 top-[2.2%] z-10 h-[3.2%] w-[32%] -translate-x-1/2 rounded-full bg-black" />
        {screen ?? <AbstractApp variant={variant} />}
      </div>
    </div>
  );
}

/** Angled composition of the devices for a case study card. */
export function DeviceStage({ devices }: { devices: ("laptop" | "phone")[] }) {
  const hasLaptop = devices.includes("laptop");
  return (
    <div className="relative h-full w-full [perspective:1600px]" aria-hidden>
      <div className="spotlight absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center [transform-style:preserve-3d] [transform:rotateX(12deg)_rotateY(-18deg)_rotateZ(2deg)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:[transform:rotateX(8deg)_rotateY(-10deg)_rotateZ(1deg)]">
        {hasLaptop ? (
          <>
            <div className="w-[78%] [transform:translateZ(0)]">
              <Laptop />
            </div>
            <div className="absolute bottom-[6%] right-[8%] w-[20%] [transform:translateZ(90px)]">
              <Phone />
            </div>
          </>
        ) : (
          <>
            <div className="w-[30%] [transform:translateZ(40px)_translateX(-30%)]">
              <Phone variant={0} />
            </div>
            <div className="absolute w-[30%] [transform:translateZ(110px)_translateX(55%)_translateY(8%)]">
              <Phone variant={1} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
