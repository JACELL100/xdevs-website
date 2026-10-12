"use client";

import { useId, useState } from "react";
import type { Role } from "@/content/careers";
import { careers } from "@/content/careers";
import { Icon } from "@/components/ui/Icon";

/** Expandable role card. Full JD detail is pending (see content/careers.ts). */
export function RoleCard({ role, applyUrl }: { role: Role; applyUrl: string }) {
  const [open, setOpen] = useState(false);
  const panel = useId();

  return (
    <div className={`card overflow-hidden transition-colors ${open ? "border-line-strong" : ""}`}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-6 p-6 text-left md:p-8"
        >
          <span className="flex-1">
            <span className="block text-xl font-semibold tracking-tight text-white md:text-2xl">{role.title}</span>
            <span className="mt-1 block text-[15px] text-grey-400">{role.focus}</span>
          </span>
          <span className="label hidden rounded-full border border-line px-3 py-1.5 text-white sm:inline-block">
            {role.openings} {role.openings === 1 ? "opening" : "openings"}
          </span>
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-white transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
          >
            <Icon name="plus" size={18} />
          </span>
        </button>
      </h3>
      <div id={panel} className="expand" data-open={open} inert={!open}>
        <div>
          <div className="grid gap-8 border-t border-line p-6 md:grid-cols-3 md:p-8">
            <div className="md:col-span-2">
              <p className="text-[17px] leading-relaxed text-silver-400">{role.summary}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {role.areas.map((a) => (
                  <li key={a} className="rounded-full border border-line px-3 py-1.5 text-sm text-white">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 text-sm">
              {careers.details.map((d) => (
                <div key={d.label} className="flex justify-between gap-4 border-b border-line pb-2">
                  <span className="text-grey-400">{d.label}</span>
                  <span className="text-right text-white">{d.value}</span>
                </div>
              ))}
              <a
                href={applyUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary sheen mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold"
              >
                <span className="relative z-[2]">Apply for this role</span>
                <Icon name="arrowUpRight" size={14} className="relative z-[2]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
