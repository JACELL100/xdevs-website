import { capabilities } from "@/content/site";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
      {capabilities.map((c) => (
        <li key={c} className="flex items-center gap-10 md:gap-16">
          <span className="whitespace-nowrap text-2xl font-semibold tracking-tight text-white/90 md:text-4xl">
            {c}
          </span>
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-silver-400 md:h-5 md:w-5">
            <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/** Infinite capabilities ticker. Pauses on hover; static under reduced motion. */
export function Marquee() {
  return (
    <section aria-label="Capabilities" className="relative border-y border-line bg-graphite-900/60 py-7 md:py-9">
      <div className="marquee-mask overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
