import { useEffect, useRef } from "react";

// One shared interval, so the feature cards that should move together — the
// credit-score dial and the live "approved car" feed — advance at the exact
// same moments. A single timer driving every subscriber means they can never
// drift out of phase (which two separate setIntervals eventually would).
export const FEATURE_TICK_MS = 2200;

const subscribers = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(fn: () => void): () => void {
  subscribers.add(fn);
  if (!timer) timer = setInterval(() => subscribers.forEach((s) => s()), FEATURE_TICK_MS);
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

// Run `onTick` on every shared tick while mounted (and `enabled`). The latest
// callback is always used, so it can safely close over fresh state.
export function useFeatureTick(onTick: () => void, enabled = true) {
  const cb = useRef(onTick);
  cb.current = onTick;
  useEffect(() => {
    if (!enabled) return;
    return subscribe(() => cb.current());
  }, [enabled]);
}
