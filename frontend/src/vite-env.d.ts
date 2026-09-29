/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL for the FastAPI backend, including the `/api` prefix. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
