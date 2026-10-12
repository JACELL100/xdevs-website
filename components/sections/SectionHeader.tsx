import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines, FadeIn } from "@/components/motion/Reveal";

export function SectionHeader({
  label,
  lines,
  intro,
  align = "left",
  as = "h2",
  aside,
}: {
  label: string;
  lines: ReactNode[];
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  aside?: ReactNode;
}) {
  const center = align === "center";
  return (
    <div
      className={`mb-14 flex flex-col gap-6 md:mb-20 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={center ? "flex flex-col items-center" : "max-w-3xl"}>
        <FadeIn y={10}>
          <SectionLabel>{label}</SectionLabel>
        </FadeIn>
        <RevealLines
          as={as}
          lines={lines}
          className={`mt-6 font-semibold text-white ${as === "h1" ? "text-display" : "text-display"}`}
        />
        {intro && (
          <FadeIn delay={0.15}>
            <p
              className={`mt-6 max-w-xl text-[17px] leading-relaxed text-grey-400 ${center ? "mx-auto" : ""}`}
            >
              {intro}
            </p>
          </FadeIn>
        )}
      </div>
      {aside}
    </div>
  );
}
