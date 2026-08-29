import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

import { en } from './en'
import { fr } from './fr'
import { es } from './es'
import { pt } from './pt'
import { ar } from './ar'
import { zh } from './zh'
import { LANGUAGES, STORAGE_KEY, type LanguageCode, type Translations } from './config'

const DICTIONARIES: Record<LanguageCode, Translations> = { en, fr, es, pt, zh, ar }

function detect(): LanguageCode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in DICTIONARIES) return stored as LanguageCode
  } catch {
    /* private browsing, blocked storage — fall through to the browser preference */
  }
  const preferred = navigator.languages ?? [navigator.language]
  for (const tag of preferred) {
    const base = tag.split('-')[0].toLowerCase()
    if (base in DICTIONARIES) return base as LanguageCode
  }
  return 'en'
}

interface I18nValue {
  lang: LanguageCode
  dir: 'ltr' | 'rtl'
  t: Translations
  setLang: (code: LanguageCode) => void
}

const I18nContext = createContext<I18nValue | null>(null)

// The provider and its hooks belong together; fast refresh simply cannot
// hot-reload a file that exports both.
/* eslint-disable react-refresh/only-export-components */

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>('en')

  // Detection runs after mount so the server-rendered/initial HTML is stable.
  useEffect(() => setLangState(detect()), [])

  const dir = useMemo(
    () => LANGUAGES.find((l) => l.code === lang)?.dir ?? 'ltr',
    [lang],
  )

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.title = DICTIONARIES[lang].meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', DICTIONARIES[lang].meta.description)
  }, [lang, dir])

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* the choice simply will not persist */
    }
  }, [])

  const value = useMemo(
    () => ({ lang, dir, t: DICTIONARIES[lang], setLang }),
    [lang, dir, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used inside I18nProvider')
  return context
}

/** Shorthand for the common case of only needing the strings. */
export function useT(): Translations {
  return useI18n().t
}
