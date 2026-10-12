import { careers, roles } from "@/content/careers";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { FadeIn, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Icon } from "@/components/ui/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { RoleCard } from "@/components/sections/RoleCard";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "THE xDEVS is hiring 10 interns across Full-Stack Development, Business Development & Sales, Social Media, and Design & Video Editing.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        label="careers"
        lines={[careers.headline + ".", <span key="m" className="text-metal">Build what&apos;s next.</span>]}
        intro={careers.intro}
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href={careers.applyUrl} target="_blank" rel="noreferrer" size="lg" icon="arrowUpRight">
            Apply on LinkedIn
          </MagneticButton>
          <a href="#roles" className="label text-grey-400 transition-colors hover:text-white">
            View {careers.totalOpenings} openings ↓
          </a>
        </div>
      </PageHero>

      <section className="container-x pb-20" aria-label="Internship details">
        <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {careers.details.map((d, i) => (
            <FadeIn key={d.label} delay={i * 0.05} className="card p-6">
              <dt className="label text-grey-400">{d.label}</dt>
              <dd className="mt-3 text-lg font-semibold tracking-tight text-white">{d.value}</dd>
            </FadeIn>
          ))}
        </dl>
      </section>

      <section id="roles" className="container-x scroll-mt-28 py-16" aria-label="Open roles">
        <SectionLabel>open roles</SectionLabel>
        <RevealLines lines={["Four tracks.", "Ten seats."]} className="mt-6 text-display font-semibold text-white" />
        <ul className="mt-14 space-y-4">
          {roles.map((r) => (
            <li key={r.slug}>
              <RoleCard role={r} applyUrl={careers.applyUrl} />
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x py-20" aria-label="What you get">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionLabel>what you get</SectionLabel>
            <RevealLines lines={["Real work.", "Real recognition."]} className="mt-6 text-display font-semibold text-white" />
          </div>
          <ul className="grid gap-3 self-end">
            {careers.recognition.map((r, i) => (
              <FadeIn as="li" key={r} delay={i * 0.06} className="card flex items-center gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong">
                  <Icon name="badge" size={18} />
                </span>
                <span className="text-lg text-white">{r}</span>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-20" aria-label="How to apply">
        <FadeIn>
          <div className="card metal-border relative overflow-hidden p-8 text-center md:p-16">
            <div aria-hidden className="spotlight absolute inset-0" />
            <h2 className="relative text-title font-semibold text-white">How to apply</h2>
            <p className="relative mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-grey-400">
              Applications are open through our LinkedIn company page. Shortlisted candidates are
              invited to an in-person interview.
            </p>
            <div className="relative mt-8 flex justify-center">
              <MagneticButton href={careers.applyUrl} target="_blank" rel="noreferrer" size="lg" icon="arrowUpRight">
                Apply on LinkedIn
              </MagneticButton>
            </div>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
