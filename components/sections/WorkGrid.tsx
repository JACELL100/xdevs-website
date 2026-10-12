"use client";

import { useState, type ReactNode } from "react";
import { workCategories, type WorkCategory } from "@/content/work";

/**
 * Filterable grid of case studies by service type. Cards are rendered on the
 * server and passed in; filtering just hides the ones that don't match.
 */
export function WorkGrid({
  items,
}: {
  items: { slug: string; categories: WorkCategory[]; card: ReactNode }[];
}) {
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const visible = items.filter((c) => filter === "all" || c.categories.includes(filter));

  return (
    <section className="container-x pb-12" aria-label="Projects">
      <div role="group" aria-label="Filter projects" className="mb-10 flex flex-wrap gap-2">
        {workCategories.map((c) => {
          const on = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c.key)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                on
                  ? "border-white bg-white text-black"
                  : "border-line bg-white/[0.03] text-silver-400 hover:border-line-strong hover:text-white"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {items.map((c) => {
          const shown = visible.includes(c);
          return (
            <li key={c.slug} hidden={!shown} className="animate-[hero-in_0.5s_var(--ease-out-expo)_both]">
              {c.card}
            </li>
          );
        })}
      </ul>
      <p className="label mt-8 text-grey-400" aria-live="polite">
        Showing {visible.length} of {items.length} projects
      </p>
    </section>
  );
}
