import { useEffect, useRef, useState } from 'react'

import { useI18n } from '@/i18n'
import { LANGUAGES, type LanguageCode } from '@/i18n/config'

/**
 * Language selector.
 *
 * Each language is offered in its own script — a reader looking for 中文 is not
 * helped by the word "Chinese". Selecting Arabic also flips the document to RTL,
 * which the provider handles.
 */
export function LanguageSwitcher() {
  const { lang, t, setLang } = useI18n()
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function choose(code: LanguageCode) {
    setLang(code)
    setOpen(false)
  }

  return (
    <div ref={container} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
        className="patch-label flex items-center gap-1.5 border border-rule px-2.5 py-2 text-ink-2 transition-colors hover:border-ink hover:text-ink"
      >
        <GlobeIcon />
        <span>{current.endonym}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.nav.language}
          className="absolute end-0 top-[calc(100%+4px)] z-50 min-w-44 border border-ink bg-card py-1"
        >
          {LANGUAGES.map((language) => (
            <li key={language.code}>
              <button
                type="button"
                role="option"
                aria-selected={language.code === lang}
                onClick={() => choose(language.code)}
                lang={language.code}
                dir={language.dir}
                className={`flex w-full items-baseline justify-between gap-4 px-3 py-2 text-start text-sm transition-colors ${
                  language.code === lang ? 'bg-ink text-card' : 'text-ink-2 hover:bg-card-2'
                }`}
              >
                <span>{language.endonym}</span>
                <span
                  className={`patch-label ${
                    language.code === lang ? 'text-card/60' : 'text-ink-3'
                  }`}
                  dir="ltr"
                >
                  {language.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.4" />
      <ellipse cx="8" cy="8" rx="2.8" ry="6.4" />
      <path d="M1.9 5.9h12.2M1.9 10.1h12.2" />
    </svg>
  )
}
