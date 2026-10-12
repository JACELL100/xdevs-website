import { EmblemSVG } from "./EmblemSVG";

/** Horizontal lockup: chrome X + "THE <xDEVS>" wordmark. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <EmblemSVG className="h-7 w-auto" idSuffix="nav" detailed={false} />
      <span className="flex items-baseline gap-1.5 text-[15px] font-bold tracking-tight text-white">
        THE
        <span className="font-mono text-[13px] font-medium text-silver-400">
          &lt;<span className="text-white">xDEVS</span>&gt;
        </span>
      </span>
    </span>
  );
}
