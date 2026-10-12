import Link from "next/link";
import { services } from "@/content/services";
import { TiltCard } from "@/components/motion/TiltCard";
import { FadeIn } from "@/components/motion/Reveal";
import { GlassIcon } from "@/components/ui/GlassIcon";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "./SectionHeader";

// Bento rhythm on large screens: 2+1, 1+2, 1+2.
const spans = ["lg:col-span-2", "", "", "lg:col-span-2", "", "lg:col-span-2"];

export function ServicesBento() {
  return (
    <section id="services" className="cv-auto container-x scroll-mt-28 py-28 md:py-40" aria-label="Services">
      <SectionHeader
        label="services"
        lines={["Engineered for", "performance and scale."]}
        intro="Six disciplines, one team. We take products from idea to production and keep them fast, secure and ready to grow."
        aside={
          <Link
            href="/services"
            className="label group inline-flex items-center gap-2 text-grey-400 transition-colors hover:text-white"
          >
            All services
            <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {services.map((s, i) => {
          const wide = spans[i] !== "";
          return (
            <FadeIn as="li" key={s.slug} delay={(i % 3) * 0.08} className={spans[i]}>
              <TiltCard className="h-full" max={wide ? 3 : 6}>
                <Link
                  href={`/services#${s.slug}`}
                  className="flex h-full min-h-[300px] flex-col justify-between p-7 md:p-9"
                >
                  <div className={wide ? "lg:flex lg:items-start lg:justify-between lg:gap-10" : ""}>
                    <div className={wide ? "lg:max-w-md" : ""}>
                      <GlassIcon name={s.icon} />
                      <p className="label mt-8 text-grey-400">
                        {s.index} {"//"} service
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{s.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-grey-400">{s.short}</p>
                    </div>
                    {wide && (
                      <ul className="mt-8 hidden space-y-2 lg:mt-1 lg:block lg:min-w-[220px]">
                        {s.covers.map((c) => (
                          <li
                            key={c}
                            className="flex items-center gap-2.5 rounded-full border border-line bg-white/[0.02] px-3.5 py-2 text-sm text-silver-400"
                          >
                            <span className="h-1 w-1 rounded-full bg-silver-400" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="label mt-10 flex items-center justify-between border-t border-line pt-5 text-grey-400 transition-colors group-hover:text-white">
                    Learn more
                    <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </TiltCard>
            </FadeIn>
          );
        })}
      </ul>
    </section>
  );
}
