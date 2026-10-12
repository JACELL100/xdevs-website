import type { CSSProperties } from "react";
import { process } from "@/content/process";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines, FadeIn } from "@/components/motion/Reveal";
import { ProcessVisual } from "./ProcessVisuals";
import { ProcessStepper } from "./ProcessStepper";

const title = ["How we build:", "from concept", "to production."];

/**
 * "How we build": a sticky, scroll-driven sequence on large screens where
 * layered panels move along the z-axis as each phase becomes active.
 * Server-rendered; <ProcessStepper /> only flips data attributes on scroll.
 * Small screens get a simple stacked list.
 */
export function Process({ id = "process" }: { id?: string }) {
  const trackId = `${id}-track`;
  return (
    <section id={id} className="relative scroll-mt-20 bg-graphite-900/40" aria-label="How we build">
      {/* Large screens: sticky storytelling */}
      <div
        id={trackId}
        data-active="0"
        className="process-track relative hidden lg:block"
        style={{ height: `${process.length * 85 + 40}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-x grid grid-cols-12 items-center gap-10">
            <div className="col-span-5">
              <SectionLabel>methodology</SectionLabel>
              <RevealLines lines={title} className="mt-6 text-display font-semibold text-white" />
              <ol className="mt-12 space-y-1">
                {process.map((s, i) => (
                  <li
                    key={s.key}
                    data-step={i}
                    data-state={i === 0 ? "current" : "idle"}
                    aria-current={i === 0 ? "step" : undefined}
                    className="process-step relative rounded-2xl border px-5 py-4"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="label text-grey-400">{s.index}</span>
                      <h3 className="text-xl font-semibold tracking-tight text-white">{s.title}</h3>
                    </div>
                    <div className="process-step-body grid">
                      <p className="overflow-hidden pl-9 pt-2 text-[15px] leading-relaxed text-grey-400">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-8 h-px w-full bg-line" aria-hidden>
                <div className="process-progress h-px origin-left bg-gradient-to-r from-grey-500 via-silver-100 to-white" />
              </div>
            </div>

            <div className="col-span-7 flex justify-center" aria-hidden>
              <div className="relative h-[520px] w-full max-w-[620px] [perspective:1400px]">
                <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(14deg)_rotateY(-22deg)]">
                  {process.map((s, i) => (
                    <div
                      key={s.key}
                      data-panel={i}
                      data-state={i === 0 ? "current" : `next${Math.min(i, 3)}`}
                      className="process-panel card glass absolute inset-x-8 bottom-14 top-14 p-8"
                      style={{ "--i": i } as CSSProperties}
                    >
                      <div className="flex items-center justify-between">
                        <span className="label text-grey-400">{s.tag}</span>
                        <span className="label text-white">{s.index} / 04</span>
                      </div>
                      <div className="mt-6 h-[calc(100%-3rem)]">
                        <ProcessVisual step={s.key} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="spotlight pointer-events-none absolute -inset-20 -z-10" />
              </div>
            </div>
          </div>
        </div>
        <ProcessStepper trackId={trackId} steps={process.length} />
      </div>

      {/* Small screens: stacked */}
      <div className="container-x py-28 lg:hidden">
        <SectionLabel>methodology</SectionLabel>
        <RevealLines lines={title} className="mt-6 text-display font-semibold text-white" />
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {process.map((s, i) => (
            <FadeIn as="li" key={s.key} delay={(i % 2) * 0.08} className="card p-6">
              <div className="aspect-[16/10] rounded-2xl border border-line bg-black/40 p-4">
                <ProcessVisual step={s.key} />
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span className="label text-grey-400">{s.index}</span>
                <h3 className="text-xl font-semibold tracking-tight text-white">{s.title}</h3>
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-grey-400">{s.body}</p>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
