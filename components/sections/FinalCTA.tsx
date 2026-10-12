import { site } from "@/content/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Icon } from "@/components/ui/Icon";

export function FinalCTA() {
  return (
    <section id="contact" className="cv-auto relative scroll-mt-24 overflow-hidden py-28 md:py-40" aria-label="Start a project">
      <div aria-hidden className="spotlight pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1100px] -translate-x-1/2" />
      <div className="container-x relative">
        <SectionLabel>start a project</SectionLabel>
        <RevealLines
          lines={["Let's build", <span key="x" className="text-metal">something extraordinary.</span>]}
          className="mt-6 text-[clamp(2.5rem,1rem+6vw,7rem)] font-bold leading-[0.98] tracking-[-0.045em] text-white"
        />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <FadeIn className="lg:col-span-4">
            <p className="text-[17px] leading-relaxed text-grey-400">
              Tell us about your idea, your users and your timeline. We will reply with clear next
              steps.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-silver-400">
              {["Engineering-led from day one", "Security built in", "Clear, honest communication"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line-strong">
                    <Icon name="check" size={13} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-sm text-grey-400 transition-colors hover:text-white"
            >
              <Icon name="linkedin" size={16} /> Prefer LinkedIn? Message us there
              <Icon name="arrowUpRight" size={14} />
            </a>
          </FadeIn>
          <FadeIn delay={0.1} className="lg:col-span-8">
            <div className="card glass p-6 md:p-10">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
