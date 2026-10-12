import { site } from "@/content/site";
import { HeroVisual } from "@/components/three/HeroVisual";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { CSSProperties } from "react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 md:pt-40" aria-label="Introduction">
      {/* Light bloom */}
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute -top-56 left-1/2 -z-10 h-[760px] w-[1200px] -translate-x-1/2 opacity-90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(255_255_255/0.06),transparent)]"
      />

      <div className="container-x flex flex-col items-center text-center">
        <div className="hero-in">
          <p className="label inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-grey-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            &lt; future-ready technology /&gt;
          </p>
        </div>

        {/* CSS-only masked reveal so the headline never waits on hydration. */}
        <h1 className="mt-8 text-hero font-bold text-white">
          <span className="reveal-mask">
            <span className="reveal-line" style={{ "--d": "0.15s" } as CSSProperties}>
              We build
            </span>
          </span>
          <span className="reveal-mask">
            <span className="reveal-line text-metal" style={{ "--d": "0.27s" } as CSSProperties}>
              what&apos;s next.
            </span>
          </span>
        </h1>

        {/* Static on purpose: it is the LCP element on mobile. */}
        <div>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-grey-400 md:text-lg">
            {site.heroSub}
          </p>
        </div>

        <div
          className="hero-in mt-10 flex flex-col items-center gap-3 sm:flex-row"
          style={{ "--d": "0.5s" } as CSSProperties}
        >
          <MagneticButton href="/contact" size="lg" icon="arrowRight">
            Start a project
          </MagneticButton>
          <MagneticButton href="/work" size="lg" variant="ghost">
            See our work
          </MagneticButton>
        </div>
      </div>

      <div className="relative mx-auto -mt-4 h-[380px] w-full max-w-[1200px] sm:h-[460px] md:h-[620px] lg:h-[700px]">
        <HeroVisual />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black"
        />
      </div>

      <div className="label -mt-10 flex flex-col items-center gap-2 pb-10 text-grey-400">
        <span>Scroll to explore</span>
        <span aria-hidden className="h-8 w-px animate-pulse bg-gradient-to-b from-silver-400 to-transparent" />
      </div>
    </section>
  );
}
