import { lazy, Suspense } from "react";

/**
 * UK lender coverage map. Needs a Mapbox token in `VITE_MAPBOX_TOKEN`; the
 * heavy mapbox-gl implementation is lazy-loaded (code-split) only when a token
 * is present. Without a token (or while the chunk loads) nothing is rendered.
 */
const UkMapImpl = lazy(() => import("./UkMapImpl"));

export function UkMap() {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!token) return null;
  return (
    <Suspense fallback={null}>
      <UkMapImpl token={token} />
    </Suspense>
  );
}
