/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Mapbox GL access token for the UK lender coverage map (see UkMap).
   *  Optional — when unset the map is not rendered. */
  readonly VITE_MAPBOX_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
