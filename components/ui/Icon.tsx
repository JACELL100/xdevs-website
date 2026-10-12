import type { SVGProps } from "react";

const paths = {
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14",
  spark:
    "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z",
  cloud: "M7 18h10.5a4 4 0 00.6-7.96A6 6 0 006.2 9.1 4.5 4.5 0 007 18zM12 12v4M10 14l2 2 2-2",
  phone: "M8 3h8a1.5 1.5 0 011.5 1.5v15A1.5 1.5 0 0116 21H8a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 018 3zM11 18h2",
  chain:
    "M12 2.5l7.5 4.3v8.6L12 19.7l-7.5-4.3V6.8L12 2.5zM12 11v8.7M12 11l7.5-4.2M12 11L4.5 6.8M12 21.5v0",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  gauge: "M4.5 17a8.5 8.5 0 1115 0M12 13l4-5M12 13a1 1 0 100 .01",
  shield: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3zM9 12l2 2 4-4",
  scale: "M4 20V10M10 20V4M16 20v-7M22 20H2M16 9l3-3 3 3M19 6v6",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17L17 7M8 7h9v9",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6L6 18",
  linkedin:
    "M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.75c0-1.8 1.2-3.25 3-3.25s3 1.45 3 3.25v4.75M10.5 9.5v8",
  globe:
    "M12 3a9 9 0 100 18 9 9 0 000-18zM3.5 9h17M3.5 15h17M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  send: "M4 12l16-8-6 16-2.5-6.5L4 12zM11.5 13.5L20 4",
  clock: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 7v5l3 2",
  pin: "M12 21s7-5.6 7-11.5A7 7 0 005 9.5C5 15.4 12 21 12 21zM12 7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z",
  badge: "M12 3l2.4 1.8 3-.2.8 2.9 2.5 1.7-1 2.8 1 2.8-2.5 1.7-.8 2.9-3-.2L12 21l-2.4-1.8-3 .2-.8-2.9-2.5-1.7 1-2.8-1-2.8 2.5-1.7.8-2.9 3 .2L12 3zM9 12l2 2 4-4",
} as const;

export type IconKey = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  ...props
}: { name: IconKey; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
