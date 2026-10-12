import { strokePaths, viewBox } from "@/lib/emblem";

/** The chrome X as a standalone SVG data URI (for ImageResponse / icons). */
export function emblemDataUri(background?: string) {
  const [minX, minY, w, h] = viewBox.split(" ").map(Number);
  const pad = background ? Math.max(w, h) * 0.22 : 0;
  const size = Math.max(w, h) + pad * 2;
  const ox = minX - pad - (size - pad * 2 - w) / 2;
  const oy = minY - pad - (size - pad * 2 - h) / 2;
  const paths = strokePaths()
    .map((d) => `<path d="${d}" fill="url(#g)"/>`)
    .join("");
  const bg = background
    ? `<rect x="${ox}" y="${oy}" width="${size}" height="${size}" rx="${size * 0.22}" fill="${background}"/>`
    : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${ox} ${oy} ${size} ${size}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B7078"/><stop offset="0.45" stop-color="#F2F3F5"/><stop offset="0.6" stop-color="#B9BDC4"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs>${bg}${paths}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}
