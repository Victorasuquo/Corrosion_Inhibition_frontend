import type { ModelInfo } from '@/lib/api'
import { CITATIONS } from '@/lib/constants'
import type { Translations } from '@/i18n/config'
import { AblationChart, Leaderboard } from '@/components/Charts'
import { BatchPanel } from '@/components/BatchPanel'
import { Predictor } from '@/components/Predictor'
import { Placeholder, Section } from '@/components/Shell'

interface PageProps {
  t: Translations
  model: ModelInfo | null
  modelError: boolean
}

/**
 * The full single-page tour, preserved exactly as it was before routing existed.
 * The focused subpages are direct entry points into the same components.
 */
export default function Home({ t, model, modelError }: PageProps) {
  return (
    <>
      <Problem t={t} />
      <PredictSection t={t} />
      <Method t={t} model={model} />
      <Results t={t} model={model} modelError={modelError} />
      <Learned t={t} />
      <Limits t={t} model={model} />
      <BatchSection t={t} />
      <Figures t={t} />
    </>
  )
}

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

function PredictSection({ t }: { t: Translations }) {
  return (
    <Section id="predict" eyebrow={t.predictor.eyebrow} title={t.predictor.title} lead={t.predictor.lead}>
      <Predictor />
    </Section>
  )
}

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

function BatchSection({ t }: { t: Translations }) {
  return (
    <Section eyebrow={t.batch.eyebrow} title={t.batch.title} lead={t.batch.lead}>
      <BatchPanel />
    </Section>
  )
}

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

export { Problem, PredictSection, Method, Results, Learned, Limits, BatchSection, Figures }
