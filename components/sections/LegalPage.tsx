import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

/** Shared layout for legal placeholder pages. */
export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero label="legal" lines={[title]} />
      <div className="container-x pb-24">
        <div className="max-w-3xl space-y-6 text-[16px] leading-relaxed text-grey-400 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white">
          <p className="rounded-2xl border border-line-strong bg-white/[0.03] px-5 py-4 text-sm text-silver-100">
            Placeholder: this page must be reviewed and replaced with final legal text before launch.
          </p>
          {children}
        </div>
      </div>
    </>
  );
}
