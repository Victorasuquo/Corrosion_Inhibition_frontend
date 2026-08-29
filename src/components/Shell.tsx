import { Link, NavLink } from 'react-router-dom'

import { ATTRIBUTION, PRODUCT_NAME, THESIS_TITLE } from '@/lib/constants'
import { RAMP_GRADIENT } from '@/lib/ramp'
import { API_BASE_URL, type ModelInfo } from '@/lib/api'
import type { Translations } from '@/i18n/config'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

/** Routes offered in the header, in order. */
export const ROUTES = [
  { to: '/predict', key: 'predict' },
  { to: '/batch', key: 'batch' },
  { to: '/method', key: 'method' },
  { to: '/results', key: 'results' },
  { to: '/limits', key: 'limits' },
  { to: '/cite', key: 'cite' },
] as const

export function Masthead({ t }: { t: Translations }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span
            className="h-6 w-9 shrink-0 border border-ink"
            style={{ background: RAMP_GRADIENT }}
            aria-hidden
          />
          <span className="font-display text-base font-800 tracking-tight">{PRODUCT_NAME}</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-4" aria-label={t.nav.sections}>
          {ROUTES.map((route) => (
            <NavLink
              key={route.to}
              to={route.to}
              className={({ isActive }) =>
                `patch-label hidden transition-colors xl:block ${
                  isActive ? 'text-ink underline underline-offset-4' : 'text-ink-2 hover:text-ink'
                }`
              }
            >
              {t.nav[route.key]}
            </NavLink>
          ))}
          <LanguageSwitcher />
          <Link
            to="/predict"
            className="patch-label bg-ink px-3 py-2 text-card transition-opacity hover:opacity-90"
          >
            {t.nav.predict}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  tone = 'card',
}: {
  id?: string
  eyebrow: string
  title: string
  lead?: React.ReactNode
  children: React.ReactNode
  tone?: 'card' | 'sunk'
}) {
  return (
    <section
      id={id}
      className={`border-b border-rule ${tone === 'sunk' ? 'bg-card-2/55' : ''}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="patch-label mb-4 text-ink-3">{eyebrow}</p>
          <h2
            id={id ? `${id}-title` : undefined}
            className="font-display text-3xl font-800 leading-[1.1] tracking-tight sm:text-4xl"
          >
            {title}
          </h2>
          {lead && <div className="mt-5 text-lg leading-relaxed text-ink-2">{lead}</div>}
        </div>
        {children}
      </div>
    </section>
  )
}

export function Placeholder({ t, error }: { t: Translations; error: boolean }) {
  return (
    <div className="flex min-h-40 items-center justify-center border border-dashed border-rule px-4 py-8 text-center">
      <p className="max-w-xs text-sm text-ink-3">
        {error ? (
          <>
            {t.results.unavailable} <code className="font-mono">{API_BASE_URL}</code>{' '}
            {t.results.unreachable}
          </>
        ) : (
          t.results.loading
        )}
      </p>
    </div>
  )
}

export function Colophon({ t, model }: { t: Translations; model: ModelInfo | null }) {
  return (
    <footer className="bg-ink text-card">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <nav className="mb-12 flex flex-wrap gap-x-6 gap-y-3 border-b border-card/20 pb-8" aria-label={t.nav.sections}>
          {[{ to: '/', key: 'home' as const }, ...ROUTES, { to: '/figures', key: 'figures' as const }, { to: '/history', key: 'history' as const }].map(
            (route) => (
              <Link
                key={route.to}
                to={route.to}
                className="patch-label text-card/60 transition-colors hover:text-card"
              >
                {t.nav[route.key]}
              </Link>
            ),
          )}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div>
            <div
              className="mb-6 h-2 w-40 border border-card/30"
              style={{ background: RAMP_GRADIENT }}
              aria-hidden
            />
            <h2 className="max-w-xl font-display text-xl font-700 leading-snug">{THESIS_TITLE}</h2>
            <dl className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {[
                [t.colophon.author, ATTRIBUTION.author],
                [t.colophon.supervisor, ATTRIBUTION.supervisor],
                [t.colophon.coSupervisor, ATTRIBUTION.coSupervisor],
                [t.colophon.institution, `${ATTRIBUTION.department}, ${ATTRIBUTION.institution}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="patch-label mb-1 text-card/50">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="text-sm">
            <h3 className="patch-label mb-4 text-card/50">{t.colophon.provenance}</h3>
            {model ? (
              <dl className="space-y-2 font-mono text-xs text-card/80" dir="ltr">
                <Prov label={t.colophon.modelVersion} value={`v${model.version}`} />
                <Prov label={t.colophon.sourceRun} value={model.provenance.source_run} />
                <Prov label={t.colophon.seed} value={String(model.provenance.seed)} />
                <Prov label="scikit-learn" value={model.provenance.pins['scikit-learn'] ?? '—'} />
                <Prov label="RDKit" value={model.provenance.rdkit_runtime} />
                <Prov
                  label={t.colophon.modelHash}
                  value={model.provenance.artifact_hashes['model.joblib'] ?? '—'}
                />
              </dl>
            ) : (
              <p className="text-xs text-card/50">{t.colophon.unavailable}</p>
            )}
            <p className="mt-6 text-xs leading-relaxed text-card/60">{t.colophon.provenanceNote}</p>
          </div>
        </div>

      </div>
    </footer>
  )
}

function Prov({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-card/50">{label}</dt>
      <dd className="truncate" title={value}>
        {value}
      </dd>
    </div>
  )
}
