import { useEffect, useState } from 'react'

import { api, type ModelInfo, API_BASE_URL } from '@/lib/api'
import { ATTRIBUTION, CITATIONS, PRODUCT_NAME, THESIS_TITLE } from '@/lib/constants'
import { RAMP_GRADIENT } from '@/lib/ramp'
import { useT } from '@/i18n'
import type { Translations } from '@/i18n/config'
import { AblationChart, Leaderboard } from '@/components/Charts'
import { BatchPanel } from '@/components/BatchPanel'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Predictor } from '@/components/Predictor'

export default function App() {
  const [model, setModel] = useState<ModelInfo | null>(null)
  const [modelError, setModelError] = useState(false)
  const t = useT()

  useEffect(() => {
    api
      .model()
      .then(setModel)
      .catch(() => setModelError(true))
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-card"
      >
        {t.nav.skip}
      </a>
      <Masthead t={t} />
      <main id="main">
        <Problem t={t} />
        <PredictSection t={t} />
        <Method t={t} model={model} />
        <Results t={t} model={model} modelError={modelError} />
        <Learned t={t} />
        <Limits t={t} model={model} />
        <BatchSection t={t} />
        <Figures t={t} />
      </main>
      <Colophon t={t} model={model} />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                       */
/* -------------------------------------------------------------------------- */

function Masthead({ t }: { t: Translations }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#main" className="flex items-center gap-3">
          <span
            className="h-6 w-9 shrink-0 border border-ink"
            style={{ background: RAMP_GRADIENT }}
            aria-hidden
          />
          <span className="font-display text-base font-800 tracking-tight">{PRODUCT_NAME}</span>
        </a>
        <nav className="flex items-center gap-4 sm:gap-5" aria-label={t.nav.sections}>
          {[
            ['#predict', t.nav.predict],
            ['#method', t.nav.method],
            ['#results', t.nav.results],
            ['#limits', t.nav.limits],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="patch-label hidden text-ink-2 transition-colors hover:text-ink lg:block"
            >
              {label}
            </a>
          ))}
          <LanguageSwitcher />
          <a
            href="#predict"
            className="patch-label bg-ink px-3 py-2 text-card transition-opacity hover:opacity-90"
          >
            {t.nav.predict}
          </a>
        </nav>
      </div>
    </header>
  )
}

function Section({
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

/* -------------------------------------------------------------------------- */
/* 1. The problem                                                              */
/* -------------------------------------------------------------------------- */

const HERO_PATCHES = [
  { pct: 0, key: 'patch0', hex: '#7b2e12' },
  { pct: 40, key: 'patch40', hex: '#c08a2e' },
  { pct: 80, key: 'patch80', hex: '#2e8b7a' },
  { pct: 100, key: 'patch100', hex: '#008751' },
] as const

function Problem({ t }: { t: Translations }) {
  return (
    <section className="border-b border-ink" aria-labelledby="problem-title">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <h1
          id="problem-title"
          className="max-w-4xl font-display text-[2.6rem] font-800 leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {t.hero.titleA}
          <br />
          {t.hero.titleB}
          <br />
          {t.hero.titleC}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">{t.hero.p1}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{t.hero.p2}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{t.hero.p3}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#predict"
                className="bg-ink px-6 py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-card transition-opacity hover:opacity-90"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#method"
                className="border border-rule px-6 py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* The ramp introduced as a physical fact, before it is used as a UI device. */}
          <figure className="panel registered self-start p-6">
            <figcaption className="patch-label mb-4 text-ink-3">{t.hero.scaleTitle}</figcaption>
            {/* Patches share one row so their heights cannot drift with caption length. */}
            <div className="flex h-40 gap-0.5">
              {HERO_PATCHES.map((patch) => (
                <div key={patch.pct} className="flex-1" style={{ backgroundColor: patch.hex }} />
              ))}
            </div>
            <div className="flex gap-0.5 pt-2">
              {HERO_PATCHES.map((patch) => (
                // pe-3 keeps neighbouring captions from running into each other when
                // one wraps to two lines and its neighbour does not.
                <div key={patch.pct} className="min-w-0 flex-1 pe-3">
                  <div className="font-mono text-sm font-600 tabular">{patch.pct}%</div>
                  <div className="mt-1 text-[11px] leading-tight text-ink-3">
                    {t.hero[patch.key]}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-rule pt-3 text-xs text-ink-2">{t.hero.scaleNote}</p>
          </figure>
        </div>

        <p className="mt-12 max-w-3xl border-t border-rule pt-4 text-xs text-ink-3">
          {t.hero.sources}:{' '}
          {[CITATIONS.globalCost, CITATIONS.savings, CITATIONS.fullReport].map((c, i) => (
            <span key={c.url}>
              {i > 0 && ' · '}
              <a className="underline hover:text-ink" href={c.url} target="_blank" rel="noreferrer">
                {c.source}
              </a>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. The instrument                                                           */
/* -------------------------------------------------------------------------- */

function PredictSection({ t }: { t: Translations }) {
  return (
    <Section id="predict" eyebrow={t.predictor.eyebrow} title={t.predictor.title} lead={t.predictor.lead}>
      <Predictor />
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. Method                                                                   */
/* -------------------------------------------------------------------------- */

function Method({ t, model }: { t: Translations; model: ModelInfo | null }) {
  const steps = [
    { n: '01', h: t.method.s1h, p: t.method.s1p },
    { n: '02', h: t.method.s2h, p: t.method.s2p },
    { n: '03', h: t.method.s3h, p: t.method.s3p },
    { n: '04', h: t.method.s4h, p: t.method.s4p },
  ]
  const stats = [
    ['5,170', t.method.statMeasurements],
    ['945', t.method.statMolecules],
    ['5', t.method.statMetals],
    ['209', t.method.statDescriptors],
    ['11', t.method.statConditions],
    ['0', t.method.statPh],
  ]

  return (
    <Section id="method" tone="sunk" eyebrow={t.method.eyebrow} title={t.method.title} lead={t.method.lead}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <ol className="space-y-6">
          {steps.map((step) => (
            <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4">
              <span className="font-mono text-sm text-ink-3 tabular">{step.n}</span>
              <div>
                <h3 className="font-display text-base font-700">{step.h}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{step.p}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3">
            {stats.map(([value, label]) => (
              <div key={label} className="bg-card px-4 py-5">
                <div className="font-mono text-2xl font-600 tabular">{value}</div>
                <div className="patch-label mt-1.5 text-ink-3">{label}</div>
              </div>
            ))}
          </div>

          <figure className="panel p-4">
            <img
              src="/figures/fig04_pipeline_architecture.png"
              alt={t.method.figure4Alt}
              className="w-full"
              loading="lazy"
            />
            <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-3">
              <strong className="text-ink-2">Figure 4.</strong> {t.method.figure4}
            </figcaption>
          </figure>

          {model && (
            <p className="font-mono text-xs text-ink-3" dir="ltr">
              {t.method.serving} {model.algorithm.replace('_', ' ')} · {model.features.total}{' '}
              {t.method.features} · {t.method.seed} {model.provenance.seed} · {t.method.run}{' '}
              {model.provenance.source_run}
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 4. Results                                                                  */
/* -------------------------------------------------------------------------- */

function Results({
  t,
  model,
  modelError,
}: {
  t: Translations
  model: ModelInfo | null
  modelError: boolean
}) {
  return (
    <Section
      id="results"
      eyebrow={t.results.eyebrow}
      title={t.results.title}
      lead={
        <>
          {t.results.leadA} <strong className="font-mono text-ink">R² 0.806</strong>{' '}
          {t.results.leadB} <strong className="font-mono text-ink">R² 0.310</strong>{' '}
          {t.results.leadC}
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel registered p-6 sm:p-7">
          <h3 className="patch-label mb-4 text-ink-3">{t.results.randomTitle}</h3>
          <p className="text-sm leading-relaxed text-ink-2">{t.results.randomBody}</p>
        </div>
        <div className="panel registered p-6 sm:p-7" style={{ borderColor: '#008751' }}>
          <h3 className="patch-label mb-4" style={{ color: '#008751' }}>
            {t.results.scaffoldTitle}
          </h3>
          <p className="text-sm leading-relaxed text-ink-2">{t.results.scaffoldBody}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-lg font-700">{t.results.ablationTitle}</h3>
          <p className="mb-6 text-sm text-ink-2">{t.results.ablationLead}</p>
          {model ? <AblationChart ablation={model.ablation} /> : <Placeholder t={t} error={modelError} />}
        </div>

        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-lg font-700">{t.results.leaderboardTitle}</h3>
          <p className="mb-6 text-sm text-ink-2">{t.results.leaderboardLead}</p>
          {model ? <Leaderboard rows={model.all_models} /> : <Placeholder t={t} error={modelError} />}
        </div>
      </div>
    </Section>
  )
}

function Placeholder({ t, error }: { t: Translations; error: boolean }) {
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

/* -------------------------------------------------------------------------- */
/* 5. What the model learned                                                   */
/* -------------------------------------------------------------------------- */

function Learned({ t }: { t: Translations }) {
  const insights = [
    { h: t.learned.i1h, p: t.learned.i1p },
    { h: t.learned.i2h, p: t.learned.i2p },
    { h: t.learned.i3h, p: t.learned.i3p },
    { h: t.learned.i4h, p: t.learned.i4p },
  ]

  return (
    <Section tone="sunk" eyebrow={t.learned.eyebrow} title={t.learned.title} lead={t.learned.lead}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <figure className="panel p-4">
          <img
            src="/figures/fig07_shap_summary.png"
            alt={t.learned.figure7Alt}
            className="w-full"
            loading="lazy"
          />
          <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-3">
            <strong className="text-ink-2">Figure 7.</strong> {t.learned.figure7}
          </figcaption>
        </figure>

        <div className="space-y-5">
          {insights.map((item) => (
            <div key={item.h} className="border-s-2 border-rule ps-4">
              <h3 className="font-display text-base font-700">{item.h}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{item.p}</p>
            </div>
          ))}
          <p className="border-t border-rule pt-4 text-xs text-ink-3">{t.learned.footer}</p>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 6. Limits                                                                   */
/* -------------------------------------------------------------------------- */

function Limits({ t, model }: { t: Translations; model: ModelInfo | null }) {
  const limits = [
    { h: t.limits.l1h, p: t.limits.l1p },
    { h: t.limits.l2h, p: t.limits.l2p },
    { h: t.limits.l3h, p: t.limits.l3p },
    { h: t.limits.l4h, p: t.limits.l4p },
    { h: t.limits.l5h, p: t.limits.l5p },
    { h: t.limits.l6h, p: t.limits.l6p },
  ]

  return (
    <Section
      id="limits"
      eyebrow={t.limits.eyebrow}
      title={t.limits.title}
      lead={
        <>
          {t.limits.leadA}{' '}
          <strong className="font-mono text-ink">
            ±{model?.calibration.half_width_ie_points.toFixed(1) ?? '19.5'}
          </strong>{' '}
          {t.limits.leadB}{' '}
          <strong className="font-mono text-ink">
            {model ? Math.round(model.calibration.empirical_coverage * 100) : 95}%
          </strong>{' '}
          {t.limits.leadC}
        </>
      }
    >
      <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {limits.map((l) => (
          <div key={l.h} className="bg-card p-6">
            <h3 className="font-display text-base font-700 leading-snug">{l.h}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{l.p}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 7. Batch                                                                    */
/* -------------------------------------------------------------------------- */

function BatchSection({ t }: { t: Translations }) {
  return (
    <Section eyebrow={t.batch.eyebrow} title={t.batch.title} lead={t.batch.lead}>
      <BatchPanel />
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 8. Figures                                                                  */
/* -------------------------------------------------------------------------- */

function Figures({ t }: { t: Translations }) {
  const figures = [
    ['fig01_target_distributions_raw.png', 'Figure 1', t.figures.f1],
    ['fig03_target_distribution_harmonised.png', 'Figure 3', t.figures.f3],
    ['fig05_mutual_information.png', 'Figure 5', t.figures.f5],
    ['fig06_descriptor_correlation.png', 'Figure 6', t.figures.f6],
    ['fig08_ig_atom_saliency.png', 'Figure 8', t.figures.f8],
    ['fig09_attention_rollout.png', 'Figure 9', t.figures.f9],
    ['fig10_conformal_intervals.png', 'Figure 10', t.figures.f10],
  ]

  return (
    <Section tone="sunk" eyebrow={t.figures.eyebrow} title={t.figures.title} lead={t.figures.lead}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {figures.map(([file, label, caption]) => (
          <figure key={file} className="panel p-4">
            <img src={`/figures/${file}`} alt={caption} className="w-full bg-white" loading="lazy" />
            <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-3">
              <strong className="text-ink-2">{label}.</strong> {caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* Colophon                                                                    */
/* -------------------------------------------------------------------------- */

function Colophon({ t, model }: { t: Translations; model: ModelInfo | null }) {
  return (
    <footer className="bg-ink text-card">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
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
