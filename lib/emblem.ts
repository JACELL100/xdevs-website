/**
 * Geometry for the xDEVS chrome "X", traced from /public/brand/xdevs-logo.png.
 * The mark is three stroked polylines (centrelines). The same data drives the
 * 3D hero (extruded THREE.Shape), the static SVG fallback and the loader.
 *
 * Coordinates are in "logo space": x right, y down, roughly 0..2000 on the
 * source image. `toUnit()` converts to a centred, y-up space.
 */

export type Pt = readonly [number, number];

/** Stroke width in logo space. */
export const STROKE = 60;

export const strokes: Pt[][] = [
  // Outer frame: upper-left diagonal → top bar → left chevron → bottom bar
  // → long main diagonal → top-right bar → short return.
  [
    [1124, 610],
    [730, 100],
    [392, 100],
    [796, 690],
    [392, 1296],
    [730, 1296],
    [1620, 100],
    [1222, 100],
    [1040, 350],
  ],
  // Inner chevron.
  [
    [670, 240],
    [1010, 690],
    [670, 1136],
  ],
  // Lower-right leg with bottom bar.
  [
    [1234, 764],
    [1620, 1296],
    [1250, 1296],
    [1050, 1024],
  ],
];

export const BOUNDS = { minX: 320, maxX: 1700, minY: 50, maxY: 1346 };
export const CENTER: Pt = [(BOUNDS.minX + BOUNDS.maxX) / 2, (BOUNDS.minY + BOUNDS.maxY) / 2];

/** Convert logo space → centred, y-up units (height ≈ 4 units). */
export function toUnit([x, y]: Pt, scale = 1 / 400): Pt {
  return [(x - CENTER[0]) * scale, -(y - CENTER[1]) * scale];
}

type V = [number, number];
const sub = (a: Pt, b: Pt): V => [a[0] - b[0], a[1] - b[1]];
const norm = (v: V): V => {
  const l = Math.hypot(v[0], v[1]) || 1;
  return [v[0] / l, v[1] / l];
};
const perp = (v: V): V => [-v[1], v[0]];

/**
 * Offset an open polyline by ±w/2 with mitred joins and return the outline
 * polygon (left side forward, right side backward). Ends are cut square.
 */
export function outline(points: Pt[], width: number): Pt[] {
  const h = width / 2;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    let n: V;
    let scale = 1;
    if (i === 0) {
      n = perp(norm(sub(points[1], p)));
    } else if (i === points.length - 1) {
      n = perp(norm(sub(p, points[i - 1])));
    } else {
      const d0 = norm(sub(p, points[i - 1]));
      const d1 = norm(sub(points[i + 1], p));
      const n0 = perp(d0);
      const n1 = perp(d1);
      const m = norm([n0[0] + n1[0], n0[1] + n1[1]]);
      const cos = m[0] * n0[0] + m[1] * n0[1];
      scale = 1 / Math.max(cos, 0.25);
      n = m;
    }
    left.push([p[0] + n[0] * h * scale, p[1] + n[1] * h * scale]);
    right.push([p[0] - n[0] * h * scale, p[1] - n[1] * h * scale]);
  }
  return [...left, ...right.reverse()];
}

/** SVG path data for each stroke outline (logo space). */
export function strokePaths(width = STROKE): string[] {
  return strokes.map((s) => {
    const poly = outline(s, width);
    return "M" + poly.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";
  });
}

/** SVG centreline paths (used for the loader's line-draw). */
export function centrePaths(): string[] {
  return strokes.map((s) => "M" + s.map(([x, y]) => `${x} ${y}`).join("L"));
}

export const viewBox = `${BOUNDS.minX} ${BOUNDS.minY} ${BOUNDS.maxX - BOUNDS.minX} ${
  BOUNDS.maxY - BOUNDS.minY
}`;
