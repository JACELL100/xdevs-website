import { strokePaths, viewBox } from "@/lib/emblem";

const d = strokePaths();

/**
 * Static, vector version of the chrome X. Used as the hero fallback (reduced
 * motion, low-power devices, before WebGL loads) and as the small nav mark.
 */
export function EmblemSVG({
  className,
  title,
  idSuffix = "a",
  detailed = true,
}: {
  className?: string;
  title?: string;
  idSuffix?: string;
  /** Adds bevel highlights. Turn off for tiny sizes. */
  detailed?: boolean;
}) {
  const g = `xg-${idSuffix}`;
  const h = `xh-${idSuffix}`;
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={g} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6B7078" />
          <stop offset="0.42" stopColor="#F2F3F5" />
          <stop offset="0.55" stopColor="#B9BDC4" />
          <stop offset="0.7" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#8E939B" />
        </linearGradient>
        <linearGradient id={h} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {d.map((p, i) => (
        <path key={i} d={p} fill={`url(#${g})`} />
      ))}
      {detailed &&
        d.map((p, i) => (
          <path
            key={`h${i}`}
            d={p}
            fill="none"
            stroke={`url(#${h})`}
            strokeWidth={6}
            strokeLinejoin="miter"
            opacity={0.55}
          />
        ))}
    </svg>
  );
}
