"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Current year, resolved on the client so the static build stays deterministic. */
export function Year() {
  return useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "2026",
  );
}
