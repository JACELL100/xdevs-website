import { careers, roles } from "@/content/careers";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { FadeIn, RevealLines } from "@/components/motion/Reveal";
import { EmblemSVG } from "@/components/ui/EmblemSVG";

export function CareersBanner() {
  return (
    <section className="cv-auto container-x py-16" aria-label="Careers">
      <FadeIn>
        <div className="card metal-border relative overflow-hidden p-8 md:p-14">
          <EmblemSVG
            idSuffix="careers"
            detailed={false}
            className="pointer-events-none absolute -right-16 -top-10 h-[130%] w-auto opacity-[0.06]"
          />
          <div className="spotlight pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px]" />
          <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="label inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                {careers.totalOpenings} internships open
              </p>
              <RevealLines lines={[careers.headline]} className="mt-6 text-display font-semibold text-white" />
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-grey-400">
                Internships open across four tracks. {careers.details[0].value}, remote, on-site or
                hybrid.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {roles.map((r) => (
                  <li
                    key={r.slug}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-2 text-sm text-white"
                  >
                    {r.title.replace(" Intern", "")}
                    <span className="label rounded-full bg-white/10 px-1.5 py-0.5 text-silver-100">
                      ×{r.openings}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex lg:justify-end">
              <MagneticButton href="/careers" size="lg" icon="arrowRight">
                Apply
              </MagneticButton>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
