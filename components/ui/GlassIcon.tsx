import { Icon, type IconKey } from "./Icon";

/** Glass "tile" icon with a chrome edge and soft inner bloom. */
export function GlassIcon({ name, size = "md" }: { name: IconKey; size?: "md" | "lg" }) {
  const box = size === "lg" ? "h-16 w-16 rounded-[20px]" : "h-12 w-12 rounded-2xl";
  return (
    <span
      className={`metal-border relative inline-flex ${box} items-center justify-center overflow-hidden text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_12px_30px_-10px_rgb(0_0_0/0.9)] [transform:perspective(400px)_rotateX(8deg)] transition-transform duration-500 group-hover:[transform:perspective(400px)_rotateX(0deg)_translateZ(12px)]`}
      style={{
        background:
          "linear-gradient(145deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.02) 55%, rgb(255 255 255 / 0.08))",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 60% at 50% 0%, rgb(255 255 255 / 0.28), transparent 70%)" }}
      />
      <Icon name={name} size={size === "lg" ? 28 : 22} className="relative" />
    </span>
  );
}
