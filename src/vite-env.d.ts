/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Mapbox GL access token for the UK realtime map (see UkMap). Optional —
   *  when unset the card falls back to the self-contained CSS globe. */
  readonly VITE_MAPBOX_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
