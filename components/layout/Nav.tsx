"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { nav, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { getLenis } from "./SmoothScroll";

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

/*
 * The current path is read from `location` instead of `usePathname()`.
 * usePathname in the root layout suspends while the shared static shell is
 * built (some routes have dynamic params), which made the whole nav stream in
 * later and delayed first paint. Client navigations update <title>, so a
 * MutationObserver on <head> (plus popstate) is a reliable change signal.
 */
function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.head, { subtree: true, childList: true, characterData: true });
  window.addEventListener("popstate", cb);
  return () => {
    mo.disconnect();
    window.removeEventListener("popstate", cb);
  };
}
const getPath = () => window.location.pathname;
const getServerPath = () => "";

export function Nav() {
  const pathname = useSyncExternalStore(subscribe, getPath, getServerPath);
  return <NavBar pathname={pathname} />;
}

function NavBar({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pages are kept alive in <Activity>; make sure the menu is closed when hidden.
  useLayoutEffect(() => () => setOpen(false), []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:px-6 md:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>
      <div
        className={`glass flex h-14 w-full max-w-[1280px] items-center justify-between rounded-full pl-5 pr-2 transition-shadow duration-500 md:h-16 md:pl-6 ${
          scrolled ? "shadow-[0_20px_50px_-20px_rgb(0_0_0/0.9)]" : ""
        }`}
      >
        <Link href="/" aria-label={`${site.name} home`} onClick={close} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-white/[0.02] p-1">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-1.5 text-sm transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "text-grey-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <MagneticButton href="/contact" size="md">
              Start a project
            </MagneticButton>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? "close" : "menu"} size={18} />
          </button>
        </div>
      </div>

      {/* Mobile menu: always mounted, toggled with CSS so it can transition. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        data-open={open}
        className="mobile-menu fixed inset-0 -z-10 flex flex-col bg-black/90 px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex-1">
          <ul className="space-y-1">
            {[{ label: "Home", href: "/" }, ...nav, { label: "About", href: "/about" }].map((item, i) => (
              <li key={item.href} className="mobile-menu-item" style={{ transitionDelay: open ? `${0.05 + i * 0.05}s` : "0s" }}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline justify-between border-b border-line py-4 text-4xl font-semibold tracking-tight text-white"
                >
                  {item.label}
                  <span className="label text-grey-400">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-4">
          <MagneticButton href="/contact" size="lg" icon="arrowRight" onClick={close} className="w-full">
            Start a project
          </MagneticButton>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="label flex items-center justify-center gap-2 text-grey-400"
          >
            <Icon name="linkedin" size={16} /> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}
