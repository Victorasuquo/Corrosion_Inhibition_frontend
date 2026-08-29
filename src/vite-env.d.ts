/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the FastAPI backend, no trailing slash. Set in Vercel for production. */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
