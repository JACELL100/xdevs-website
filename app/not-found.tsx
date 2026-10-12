import type { Metadata } from "next";
import { EmblemSVG } from "@/components/ui/EmblemSVG";
import { MagneticButton } from "@/components/motion/MagneticButton";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-32">
      <div aria-hidden className="spotlight pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1100px] -translate-x-1/2" />
      <div className="container-x relative flex flex-col items-center text-center">
        <EmblemSVG idSuffix="404" className="hero-float w-24 opacity-80" />
        <p className="label mt-10 text-grey-400">&lt; error code=&quot;404&quot; /&gt;</p>
        <h1 className="mt-6 text-display font-semibold text-white">
          This page <span className="text-metal">doesn&apos;t exist.</span>
        </h1>
        <p className="mt-5 max-w-md text-[17px] text-grey-400">
          The link may be broken or the page may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <MagneticButton href="/" icon="arrowRight">
            Back to home
          </MagneticButton>
          <MagneticButton href="/contact" variant="ghost">
            Contact us
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
