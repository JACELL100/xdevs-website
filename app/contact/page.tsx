import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { FadeIn } from "@/components/motion/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ContactGlobe } from "@/components/sections/ContactGlobe";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Start a project with THE xDEVS. Tell us what you are building and we will reply with clear next steps.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="contact"
        lines={["Let's talk about", <span key="m" className="text-metal">what&apos;s next.</span>]}
        intro="Tell us about your idea, your users and your timeline. We read every message and reply with clear next steps."
      />

      <section className="container-x grid gap-10 pb-24 lg:grid-cols-12" aria-label="Contact form">
        <FadeIn className="lg:col-span-7">
          <div className="card glass p-6 md:p-10">
            <ContactForm withService />
          </div>
        </FadeIn>

        <div className="space-y-4 lg:col-span-5">
          <FadeIn delay={0.08}>
            <div className="card relative overflow-hidden">
              <ContactGlobe />
            </div>
          </FadeIn>
          <FadeIn delay={0.14}>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="card group flex items-center gap-5 p-6 transition-colors hover:border-line-strong"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line-strong">
                <Icon name="linkedin" size={20} />
              </span>
              <span className="flex-1">
                <span className="label block text-grey-400">LinkedIn</span>
                <span className="mt-1 block text-white">linkedin.com/company/the-xdevs</span>
              </span>
              <Icon
                name="arrowUpRight"
                size={18}
                className="text-grey-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </FadeIn>
          {/* [TBD] Email and phone are not decided yet; add them here once confirmed. */}
        </div>
      </section>
    </>
  );
}
