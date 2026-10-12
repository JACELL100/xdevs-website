import type { ReactNode } from "react";

/**
 * Card with a subtle 3D tilt and a cursor-following inner spotlight.
 * Behaviour lives in <Interactions /> (one delegated listener), so this is
 * plain markup that works in server and client components alike.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  return (
    <div
      data-tilt={max}
      className={`card group overflow-hidden transition-transform duration-500 ease-[var(--ease-out-expo)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[var(--spot,0)] transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgb(242 243 245 / 0.10), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
