import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import { DeviceStage } from "@/components/ui/Devices";
import { Icon } from "@/components/ui/Icon";

export function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="card group flex h-full flex-col overflow-hidden transition-colors hover:border-line-strong"
    >
      <div className="relative aspect-[16/11] overflow-hidden border-b border-line bg-black/50">
        <DeviceStage devices={study.devices} />
        <span className="label absolute left-5 top-5 rounded-full border border-line bg-black/60 px-3 py-1 text-grey-400 backdrop-blur">
          {String(index + 1).padStart(2, "0")} {"//"} {study.platforms.join(" + ")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7 md:p-9">
        <h3 className="text-2xl font-semibold tracking-tight text-white md:text-[28px]">{study.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-grey-400">{study.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {study.stack.map((t) => (
            <li key={t} className="label rounded-full border border-line px-3 py-1.5 text-silver-400">
              {t}
            </li>
          ))}
        </ul>
        <span className="label mt-auto flex items-center gap-2 pt-8 text-white">
          View case study
          <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
