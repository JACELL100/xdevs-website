/**
 * Minimal fixed-window rate limiter kept in memory.
 * Good enough for a single instance / low traffic. On serverless with many
 * instances, swap for a shared store (e.g. Upstash Redis) — see README.
 */
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  entry.count += 1;
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
  }
  return { ok: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}
