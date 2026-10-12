import type { CSSProperties, ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Header for inner pages. CSS-only line reveal so the H1 paints immediately. */
export function PageHero({
  label,
  lines,
  intro,
  children,
}: {
  label: string;
  lines: ReactNode[];
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48">
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute -top-64 left-1/2 h-[700px] w-[1100px] -translate-x-1/2"
      />
      <div className="container-x relative">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="mt-7 text-[clamp(2.75rem,1rem+6.5vw,7.5rem)] font-bold leading-[0.95] tracking-[-0.045em] text-white">
          {lines.map((l, i) => (
            <span key={i} className="reveal-mask">
              <span className="reveal-line" style={{ "--d": `${0.05 + i * 0.1}s` } as CSSProperties}>
                {l}
              </span>
            </span>
          ))}
        </h1>
        {intro && (
          <div className="mt-8 max-w-2xl text-[17px] leading-relaxed text-grey-400 md:text-lg">
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
