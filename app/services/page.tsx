import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { GlassIcon } from "@/components/ui/GlassIcon";
import { Icon } from "@/components/ui/Icon";
import { ServiceVisual } from "@/components/sections/ServiceVisual";
import { Process } from "@/components/sections/Process";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Custom software, AI-driven systems, cloud solutions, mobile apps, blockchain integration and UI/UX design from THE xDEVS.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="services"
        lines={["Everything you need", <span key="m" className="text-metal">to ship.</span>]}
        intro="Six disciplines under one roof, all built with the same focus: performance, security and scalability."
      >
        <nav aria-label="Services on this page" className="mt-12">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-silver-400 transition-colors hover:border-line-strong hover:text-white"
                >
                  <span className="label text-grey-400">{s.index}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-x space-y-6 pb-24 md:space-y-8">
        {services.map((s, i) => (
          <FadeIn key={s.slug}>
            <article id={s.slug} className="scroll-mt-28">
              <TiltCard max={2}>
                <div className="grid gap-10 p-7 md:p-12 lg:grid-cols-2 lg:gap-16">
                  <div className={i % 2 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-4">
                      <GlassIcon name={s.icon} size="lg" />
                      <span className="label text-grey-400">
                        {s.index} {"//"} service
                      </span>
                    </div>
                    <h2 className="mt-8 text-title font-semibold text-white">{s.title}</h2>
                    <p className="mt-4 text-[17px] leading-relaxed text-grey-400">{s.description}</p>
                    <div className="mt-10 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="label text-grey-400">What it covers</h3>
                        <ul className="mt-4 space-y-2.5">
                          {s.covers.map((c) => (
                            <li key={c} className="flex items-start gap-2.5 text-[15px] text-white">
                              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-silver-400" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="label text-grey-400">Typical deliverables</h3>
                        <ul className="mt-4 space-y-2.5">
                          {s.deliverables.map((d) => (
                            <li key={d} className="flex items-start gap-2.5 text-[15px] text-white">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-silver-400" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className={`min-h-[280px] ${i % 2 ? "lg:order-1" : ""}`}>
                    <ServiceVisual icon={s.icon} />
                  </div>
                </div>
              </TiltCard>
            </article>
          </FadeIn>
        ))}
      </div>

      <Process />
      <FinalCTA />
    </>
  );
}
