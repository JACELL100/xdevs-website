import type { CSSProperties, ReactNode } from "react";

/*
 * Scroll reveals with zero hydration cost: these render plain markup marked
 * with `data-reveal`; a single IntersectionObserver (<RevealObserver />)
 * adds `.is-in` when they enter the viewport and CSS does the animation.
 * Reduced motion and no-JS show everything immediately (see globals.css).
 */

/**
 * Masked line-by-line headline reveal. Pass the headline as explicit lines so
 * the break points are designed, not left to the browser.
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
}) {
  return (
    <Tag className={className} data-reveal="lines">
      {lines.map((l, i) => (
        <span key={i} className="reveal-mask">
          <span className="reveal-lines-item" style={{ "--d": `${delay + i * 0.09}s` } as CSSProperties}>
            {l}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Fade + rise on scroll into view. */
export function FadeIn({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Kept for API compatibility; the rise distance is set in CSS. */
  y?: number;
  as?: "div" | "li" | "section" | "article" | "p";
}) {
  return (
    <Tag className={className} data-reveal="fade" style={{ "--d": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}
