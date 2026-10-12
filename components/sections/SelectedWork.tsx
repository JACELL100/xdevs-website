import Link from "next/link";
import { caseStudies } from "@/content/work";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { WorkCard } from "./WorkCard";
import { HorizontalScroller } from "./HorizontalScroller";

function NextProjectCard() {
  return (
    <div className="card flex h-full flex-col justify-between overflow-hidden p-8 md:p-10">
      <div>
        <p className="label text-grey-400">&lt; next /&gt;</p>
        <h3 className="mt-6 text-display font-semibold text-white">
          Your project
          <br />
          <span className="text-metal">could be next.</span>
        </h3>
        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-grey-400">
          Tell us what you are building. We will reply with a clear plan for how we would approach it.
        </p>
      </div>
      <div className="mt-10">
        <MagneticButton href="/contact" icon="arrowRight">
          Start a project
        </MagneticButton>
      </div>
    </div>
  );
}

/**
 * Selected work. On large screens the section pins and the cards travel
 * horizontally as you scroll; on smaller screens (and with reduced motion)
 * it is a native swipe row.
 */
export function SelectedWork() {
  return (
    <section id="work" className="relative scroll-mt-20" aria-label="Selected work">
      <HorizontalScroller
        header={
          <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>selected work</SectionLabel>
              <RevealLines
                lines={["Proven systems", "in the wild."]}
                className="mt-6 text-display font-semibold text-white"
              />
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <p className="max-w-sm text-[15px] leading-relaxed text-grey-400 md:text-right">
                A look at products we have designed, built and shipped. Client names are kept private.
              </p>
              <Link
                href="/work"
                className="label group inline-flex items-center gap-2 text-grey-400 transition-colors hover:text-white"
              >
                All work
                <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        }
      >
        {caseStudies.map((c, i) => (
          <li key={c.slug} className="w-[86vw] shrink-0 snap-start sm:w-[70vw] lg:w-[min(56vw,820px)]">
            <WorkCard study={c} index={i} />
          </li>
        ))}
        <li className="w-[86vw] shrink-0 snap-start sm:w-[70vw] lg:w-[min(40vw,560px)]">
          <NextProjectCard />
        </li>
      </HorizontalScroller>
    </section>
  );
}
