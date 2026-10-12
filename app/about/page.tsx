import { founderNote, site, values } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn, RevealLines } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { EmblemSVG } from "@/components/ui/EmblemSVG";
import { Why } from "@/components/sections/Why";
import { CareersBanner } from "@/components/sections/CareersBanner";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMetadata({
  title: "About",
  description: site.description[0],
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="about"
        lines={["Where innovation", <span key="m" className="text-metal">meets technology.</span>]}
      />

      <section className="container-x grid gap-12 pb-24 lg:grid-cols-12" aria-label="Who we are">
        <FadeIn className="lg:col-span-7">
          <div className="space-y-6 text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-medium leading-snug tracking-tight text-white">
            {site.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.1} className="lg:col-span-5">
          <div className="card relative flex aspect-square items-center justify-center overflow-hidden">
            <div className="spotlight absolute inset-0" />
            <div className="absolute aspect-square w-[80%] rounded-full border border-line" aria-hidden />
            <div className="absolute aspect-square w-[60%] rounded-full border border-dashed border-white/10" aria-hidden />
            <EmblemSVG idSuffix="about" className="hero-float relative w-[46%]" />
          </div>
        </FadeIn>
      </section>

      <section className="container-x py-24" aria-label="Our values">
        <SectionLabel>values</SectionLabel>
        <RevealLines lines={["How we work."]} className="mt-6 text-display font-semibold text-white" />
        <ul className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {values.map((v, i) => (
            <FadeIn as="li" key={v.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="p-8 md:p-10">
                  <p className="label text-grey-400">0{i + 1}</p>
                  <h3 className="mt-10 text-2xl font-semibold tracking-tight text-white">{v.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-grey-400">{v.body}</p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </ul>
      </section>

      {/* [CONFIRM copy] Founder note is a draft until approved. */}
      <section className="container-x py-24" aria-label="A note from our founder">
        <FadeIn>
          <figure className="card metal-border relative overflow-hidden p-8 md:p-16">
            <div aria-hidden className="spotlight absolute -left-40 -top-40 h-[500px] w-[500px]" />
            <SectionLabel>founder&apos;s note</SectionLabel>
            <blockquote className="relative mt-10 max-w-4xl space-y-6 text-[clamp(1.375rem,1rem+1.2vw,2.25rem)] font-medium leading-snug tracking-tight text-white">
              {founderNote.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </blockquote>
            <figcaption className="relative mt-10 flex items-center gap-4">
              <span className="h-px w-10 bg-silver-400" />
              <span>
                <span className="block font-semibold text-white">{founderNote.signature}</span>
                <span className="label text-grey-400">{founderNote.role}</span>
              </span>
            </figcaption>
          </figure>
        </FadeIn>
      </section>

      <Why />
      <CareersBanner />
      <FinalCTA />
    </>
  );
}
