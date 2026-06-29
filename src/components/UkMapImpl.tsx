import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { BadgeCheck } from "./icons";

/**
 * Mapbox globe centred on the United Kingdom — a genuine 3D globe with a live
 * "approvals feed": one city dot pops in at a time, in sequence, and a badge at
 * the bottom announces "<Name> from <City> · Approved" with a verified tick.
 *
 * Loaded lazily (see UkMap) so mapbox-gl is code-split out of the main bundle,
 * the same way visitors.now splits its globe-impl chunk.
 */

type Approval = { name: string; city: string; lng: number; lat: number };

const APPROVALS: Approval[] = [
  { name: "James", city: "Liverpool", lng: -2.9916, lat: 53.4084 },
  { name: "Sophie", city: "Manchester", lng: -2.2426, lat: 53.4808 },
  { name: "Mohammed", city: "London", lng: -0.1276, lat: 51.5072 },
  { name: "Emma", city: "Glasgow", lng: -4.2518, lat: 55.8642 },
  { name: "Daniel", city: "Cardiff", lng: -3.1791, lat: 51.4816 },
  { name: "Grace", city: "Belfast", lng: -5.9301, lat: 54.5973 },
  { name: "Oliver", city: "Leeds", lng: -1.5491, lat: 53.8008 },
  { name: "Ava", city: "Newcastle", lng: -1.6178, lat: 54.9783 },
];

const CYCLE_MS = 2800; // how long each approval is shown before the next

function dotElement(): HTMLDivElement {
  const el = document.createElement("div");
  el.className = "uk-pin";
  el.innerHTML = `<span class="uk-pin__ring"></span><span class="uk-pin__dot"></span>`;
  return el;
}

export default function UkMapImpl({ token }: { token: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);

  // Create the globe once.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-2.8, 15], // rotate the sphere so the UK rides up into the visible cap (disc position unchanged)
      zoom: 2.9, // enlarged so the globe's top curve meets the top of the clip
      projection: { name: "globe" },
      interactive: false, // showcase only — don't steal page scroll
    });
    mapRef.current = map;

    map.on("error", (e) => console.error("[mapbox]", e?.error?.message ?? e));

    map.on("style.load", () => {
      // Tint the ocean blue so the sphere stands out from the (white) page.
      try {
        map.setPaintProperty("water", "fill-color", "#aed3ee");
      } catch {
        /* layer name varies by style; ignore if absent */
      }
      // Strip every label (country/sea/city names) — bare land + ocean globe.
      for (const layer of map.getStyle().layers ?? []) {
        if (layer.type === "symbol") map.setLayoutProperty(layer.id, "visibility", "none");
      }
      // No atmosphere glow and a fully transparent "space" so just the bare
      // earth floats on the card — no box behind it, no white halo.
      map.setFog({
        color: "rgba(0, 0, 0, 0)",
        "high-color": "rgba(0, 0, 0, 0)",
        "horizon-blend": 0,
        "space-color": "rgba(0, 0, 0, 0)",
        "star-intensity": 0,
      });
    });

    map.on("load", () => {
      map.resize(); // the container may have laid out after init — match it
      setReady(true);
    });

    // Keep the canvas matched to the container (fixes a 0-height init when the
    // card lays out after the map is created, and any later resizes).
    const ro = new ResizeObserver(() => map.resize());
    ro.observe(container);

    return () => {
      ro.disconnect();
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, [token]);

  // Advance through the approvals one at a time.
  useEffect(() => {
    const id = window.setInterval(() => setIdx((i) => (i + 1) % APPROVALS.length), CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  // Show only the current approval's dot (replace the previous one).
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    markerRef.current?.remove();
    const a = APPROVALS[idx];
    markerRef.current = new mapboxgl.Marker({ element: dotElement(), anchor: "center" })
      .setLngLat([a.lng, a.lat])
      .addTo(map);
  }, [idx, ready]);

  const current = APPROVALS[idx];

  return (
    <>
      {/* Render the map as a square that overflows the short card (centred), so
          the round limb of the globe is visible rather than a flat slice; the
          card's overflow-hidden clips it. h-full/w-full (not absolute inset-0)
          because mapbox-gl forces .mapboxgl-map to position:relative. */}
      <div
        className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[25%] h-[450%] aspect-square"
        aria-label="Active across the United Kingdom"
      >
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {/* Live approval badge — re-keyed each cycle so it re-animates in. */}
      <div
        key={idx}
        className="uk-badge absolute bottom-4 left-1/2 z-10 flex items-center gap-2 rounded-md bg-white py-2 pl-2.5 pr-4 shadow-md ring-1 ring-black/5"
      >
        <BadgeCheck width={20} height={20} className="text-primary shrink-0" />
        <span className="whitespace-nowrap text-sm leading-none">
          <span className="font-semibold text-foreground">
            {current.name} from {current.city}
          </span>
          <span className="text-muted-foreground"> · Approved</span>
        </span>
      </div>
    </>
  );
}
