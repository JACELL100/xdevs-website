import { stackGroups } from "@/content/stack";
import { FadeIn } from "@/components/motion/Reveal";
import { SectionHeader } from "./SectionHeader";
import { TechOrbit } from "./TechOrbit";

export function TechStack() {
  return (
    <section id="tech-stack" className="cv-auto relative overflow-hidden py-28 md:py-40" aria-label="Tech stack">
      <div className="container-x">
        <SectionHeader
          label="tech stack"
          align="center"
          lines={["Modern stack.", "Zero legacy compromises."]}
          intro="Proven tools, chosen for speed, security and long-term maintainability."
        />
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <FadeIn>
            <TechOrbit />
          </FadeIn>
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {stackGroups.map((g, i) => (
              <FadeIn key={g.title} delay={(i % 2) * 0.06} className="card p-6">
                <dt className="label text-grey-400">{g.title}</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-sm text-white">
                      {t}
                    </span>
                  ))}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
