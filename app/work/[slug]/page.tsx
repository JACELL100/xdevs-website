import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DeviceStage } from "@/components/ui/Devices";
import { FadeIn } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { WorkCard } from "@/components/sections/WorkCard";
import { FinalCTA } from "@/components/sections/FinalCTA";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Project not found" };
  return pageMetadata({ title: study.title, description: study.summary, path: `/work/${study.slug}` });
}

export default function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  // Params are read inside <Suspense> so the App Shell stays static (Partial Prefetching).
  return (
    <Suspense fallback={<CaseStudyFallback />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

function CaseStudyFallback() {
  return (
    <section className="container-x min-h-[80vh] pt-44" aria-busy="true">
      <div className="h-4 w-24 rounded-full bg-white/[0.06]" />
      <div className="mt-10 h-20 max-w-3xl rounded-2xl bg-white/[0.04]" />
      <div className="mt-6 h-6 max-w-xl rounded-full bg-white/[0.04]" />
    </section>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/work/[slug]">["params"] }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <>
      <section className="relative overflow-hidden pb-12 pt-36 md:pt-44">
        <div aria-hidden className="spotlight pointer-events-none absolute -top-64 left-1/2 h-[700px] w-[1100px] -translate-x-1/2" />
        <div className="container-x relative">
          <Link
            href="/work"
            className="label group inline-flex items-center gap-2 text-grey-400 transition-colors hover:text-white"
          >
            <Icon name="arrowRight" size={14} className="rotate-180 transition-transform group-hover:-translate-x-1" />
            All work
          </Link>
          <div className="mt-10">
            <SectionLabel>case study</SectionLabel>
          </div>
          <h1 className="mt-7 max-w-5xl text-[clamp(2.5rem,1rem+5vw,6rem)] font-bold leading-[0.98] tracking-[-0.04em] text-white">
            <span className="reveal-mask">
              <span className="reveal-line">{study.title}</span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-grey-400">{study.summary}</p>

          <dl className="mt-10 grid max-w-3xl grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-3">
            <div>
              <dt className="label text-grey-400">Platforms</dt>
              <dd className="mt-2 text-white">{study.platforms.join(", ")}</dd>
            </div>
            <div>
              <dt className="label text-grey-400">Stack</dt>
              <dd className="mt-2 text-white">{study.stack.join(", ")}</dd>
            </div>
            <div>
              <dt className="label text-grey-400">Client</dt>
              <dd className="mt-2 text-white">Private</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="container-x">
        <FadeIn className="card group relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden">
          <DeviceStage devices={study.devices} />
          <p className="label absolute bottom-5 left-5 text-grey-400">Illustrative mockup</p>
        </FadeIn>
      </div>

      <article className="container-x grid gap-16 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label sticky top-28 text-grey-400">&lt; problem · approach · stack · result /&gt;</p>
        </div>
        <div className="space-y-16 lg:col-span-8">
          <FadeIn>
            <h2 className="text-title font-semibold text-white">The problem</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-grey-400">{study.problem}</p>
          </FadeIn>
          <FadeIn>
            <h2 className="text-title font-semibold text-white">Our approach</h2>
            <ol className="mt-6 space-y-4">
              {study.approach.map((a, i) => (
                <li key={i} className="flex gap-5 border-t border-line pt-4 text-[17px] leading-relaxed text-silver-400">
                  <span className="label mt-1.5 text-grey-400">0{i + 1}</span>
                  {a}
                </li>
              ))}
            </ol>
          </FadeIn>
          <FadeIn>
            <h2 className="text-title font-semibold text-white">Stack</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <li key={t} className="rounded-full border border-line-strong px-4 py-2 text-sm text-white">
                  {t}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn>
            <h2 className="text-title font-semibold text-white">The result</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {study.result.map((r) => (
                <li key={r} className="card p-5 text-[15px] leading-relaxed text-white">
                  <Icon name="check" size={18} className="mb-3 text-silver-400" />
                  {r}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </article>

      {others.length > 0 && (
        <section className="container-x" aria-label="More work">
          <h2 className="label mb-6 text-grey-400">More work</h2>
          <ul className="grid gap-5 md:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <WorkCard study={c} index={caseStudies.indexOf(c)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <FinalCTA />
    </>
  );
}
