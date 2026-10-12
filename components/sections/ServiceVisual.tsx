import type { IconName } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/**
 * 3D-feeling visual for a service: a glass slab floating over a perspective
 * grid, with the service glyph embossed in chrome. CSS only.
 */
export function ServiceVisual({ icon }: { icon: IconName }) {
  return (
    <div
      aria-hidden
      className="relative flex h-full min-h-[280px] items-center justify-center overflow-hidden rounded-[22px] border border-line bg-black/50 [perspective:900px]"
    >
      <div
        className="absolute inset-x-[-20%] bottom-[-30%] h-[90%] [transform:rotateX(70deg)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.09) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.09) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "linear-gradient(to top, #000, transparent)",
          WebkitMaskImage: "linear-gradient(to top, #000, transparent)",
        }}
      />
      <div className="spotlight absolute inset-0" />
      <div className="hero-float relative [transform-style:preserve-3d]">
        <div
          className="metal-border relative flex h-40 w-40 items-center justify-center rounded-[36px] [transform:rotateX(18deg)_rotateY(-24deg)] md:h-48 md:w-48"
          style={{
            background:
              "linear-gradient(145deg, rgb(255 255 255 / 0.18), rgb(255 255 255 / 0.03) 50%, rgb(255 255 255 / 0.1))",
            boxShadow:
              "inset 0 1px 0 rgb(255 255 255 / 0.35), 30px 40px 80px -20px rgb(0 0 0 / 0.95), 0 0 80px -20px rgb(242 243 245 / 0.25)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Icon name={icon} size={72} strokeWidth={1.1} className="text-white" />
        </div>
        <div className="absolute -bottom-10 left-1/2 h-8 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.14),transparent)]" />
      </div>
    </div>
  );
}
