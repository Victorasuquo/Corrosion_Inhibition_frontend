import type { Dictionary } from './en'

/** Every locale is structurally identical to English; only the leaf strings differ. */
export type Translations = {
  [K in keyof Dictionary]: { [P in keyof Dictionary[K]]: string }
}

export const LANGUAGES = [
  { code: 'en', label: 'English', endonym: 'English', dir: 'ltr' },
  { code: 'fr', label: 'French', endonym: 'Français', dir: 'ltr' },
  { code: 'es', label: 'Spanish', endonym: 'Español', dir: 'ltr' },
  { code: 'pt', label: 'Portuguese', endonym: 'Português', dir: 'ltr' },
  { code: 'zh', label: 'Chinese', endonym: '中文', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', endonym: 'العربية', dir: 'rtl' },
] as const

export type LanguageCode = (typeof LANGUAGES)[number]['code']

export const STORAGE_KEY = 'inhibiepdt.lang'
