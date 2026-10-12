import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconKey } from "@/components/ui/Icon";

type Variant = "primary" | "ghost";

type Props = {
  children: ReactNode;
  variant?: Variant;
  icon?: IconKey;
  size?: "md" | "lg";
  className?: string;
  /** Magnetic pull strength in px. */
  strength?: number;
} & (
  | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
);

/**
 * Pill button with a magnetic hover pull and a metallic sheen sweep.
 * The pull is applied by <Interactions /> (desktop pointers, not under
 * reduced motion); the sheen is pure CSS.
 */
export function MagneticButton({
  children,
  variant = "primary",
  icon,
  size = "md",
  className = "",
  strength = 10,
  ...rest
}: Props) {
  const base =
    "sheen group inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-[transform,background,box-shadow] duration-500 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";
  const sizes = size === "lg" ? "h-14 px-8 text-[15px]" : "h-11 px-6 text-sm";
  const variants = variant === "primary" ? "btn-primary" : "btn-ghost";
  const cls = `${base} ${sizes} ${variants} ${className}`;

  const inner = (
    <>
      <span className="relative z-[2]">{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={16}
          className="relative z-[2] transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  return (
    <span
      data-magnetic={strength}
      className={`${
        className.includes("w-full") ? "block w-full" : "inline-block"
      } transition-transform duration-500 ease-[var(--ease-out-expo)]`}
    >
      {"href" in rest && rest.href !== undefined ? (
        <Link {...(rest as ComponentProps<typeof Link>)} className={cls}>
          {inner}
        </Link>
      ) : (
        <button {...(rest as ComponentProps<"button">)} className={cls}>
          {inner}
        </button>
      )}
    </span>
  );
}
