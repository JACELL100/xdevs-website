import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="cv-auto relative mt-24 overflow-hidden border-t border-line bg-graphite-900">
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute -top-40 left-1/2 h-80 w-[900px] -translate-x-1/2"
      />
      <div className="container-x relative pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-grey-400">&lt; THE xDEVS /&gt;</p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-grey-400">
              {site.industry}. Intelligent, secure and scalable software for businesses that want
              to grow.
            </p>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-white transition-colors hover:bg-white/[0.06]"
            >
              <Icon name="linkedin" size={16} />
              LinkedIn
              <Icon name="arrowUpRight" size={14} className="text-grey-400" />
            </a>
          </div>

          <nav aria-label="Services" className="md:col-span-3">
            <p className="label text-grey-400">&lt; services /&gt;</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="text-grey-400 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Studio" className="md:col-span-2">
            <p className="label text-grey-400">&lt; studio /&gt;</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.studio.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-grey-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="md:col-span-2">
            <p className="label text-grey-400">&lt; legal /&gt;</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-grey-400 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          aria-hidden
          className="pointer-events-none mt-20 select-none whitespace-nowrap text-center font-bold leading-[0.8] tracking-[-0.06em]"
          style={{ fontSize: "clamp(4rem, 19vw, 19rem)" }}
        >
          <span className="text-metal opacity-90">xDEVS</span>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-8 text-xs text-grey-400 md:flex-row md:items-center">
          <p>
            © <Year /> {site.name}. All rights reserved.
          </p>
          <p className="label">{site.industry}</p>
        </div>
      </div>
    </footer>
  );
}
