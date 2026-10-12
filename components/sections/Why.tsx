import { pillars } from "@/content/site";
import { TiltCard } from "@/components/motion/TiltCard";
import { FadeIn } from "@/components/motion/Reveal";
import { GlassIcon } from "@/components/ui/GlassIcon";
import { SectionHeader } from "./SectionHeader";

export function Why() {
  return (
    <section className="cv-auto container-x py-28 md:py-40" aria-label="Why xDEVS">
      <SectionHeader
        label="why xDEVS"
        align="center"
        lines={["Engineered without", "compromise."]}
        intro="Three promises behind everything we ship."
      />
      <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
        {pillars.map((p, i) => (
          <FadeIn as="li" key={p.key} delay={i * 0.08}>
            <TiltCard className="h-full">
              <div className="flex min-h-[380px] flex-col justify-between p-8 md:p-10">
                <GlassIcon name={p.icon} size="lg" />
                <div>
                  <p className="label text-grey-400">0{i + 1}</p>
                  <h3 className="mt-3 text-[2.5rem] font-semibold leading-none tracking-[-0.035em] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-grey-400">{p.body}</p>
                </div>
              </div>
            </TiltCard>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
