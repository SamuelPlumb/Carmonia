import { lazy, Suspense } from "react";
import { Globe } from "./Globe";

/**
 * UK-focused realtime map. Needs a Mapbox token in `VITE_MAPBOX_TOKEN`; the
 * heavy mapbox-gl implementation is lazy-loaded (code-split) only when a token
 * is present. Without one — or while the chunk loads — we show the
 * self-contained CSS globe so the build/dev always works.
 */
const UkMapImpl = lazy(() => import("./UkMapImpl"));

export function UkMap() {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  if (!token) return <Globe />;
  return (
    <Suspense fallback={<Globe />}>
      <UkMapImpl token={token} />
    </Suspense>
  );
}
