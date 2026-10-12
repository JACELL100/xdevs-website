"use client";

import { EmblemSVG } from "@/components/ui/EmblemSVG";

export default function Error({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <section className="flex min-h-[80vh] items-center pt-32">
      <div className="container-x flex flex-col items-center text-center">
        <EmblemSVG idSuffix="err" className="w-20 opacity-70" />
        <h1 className="mt-8 text-title font-semibold text-white">Something went wrong.</h1>
        <p className="mt-3 text-grey-400">Please try again.</p>
        <button
          type="button"
          onClick={retry}
          className="btn-primary mt-8 h-11 rounded-full px-6 text-sm font-semibold"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
