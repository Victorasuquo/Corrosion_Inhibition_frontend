import { useEffect, useState } from 'react'

import { api, type ModelInfo, API_BASE_URL } from '@/lib/api'
import { ATTRIBUTION, CITATIONS, PRODUCT_NAME, THESIS_TITLE } from '@/lib/constants'
import { RAMP_GRADIENT } from '@/lib/ramp'
import { AblationChart, Leaderboard } from '@/components/Charts'
import { BatchPanel } from '@/components/BatchPanel'
import { Predictor } from '@/components/Predictor'

export default function App() {
  const [model, setModel] = useState<ModelInfo | null>(null)
  const [modelError, setModelError] = useState(false)

  useEffect(() => {
    api
      .model()
      .then(setModel)
      .catch(() => setModelError(true))
  }, [])

  return (
    <>
      <SkipLink />
      <Masthead />
      <main id="main">
        <Problem />
        <PredictSection />
        <Method model={model} />
        <Results model={model} modelError={modelError} />
        <Learned />
        <Limits model={model} />
        <BatchSection />
        <Figures />
      </main>
      <Colophon model={model} />
    </>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                       */
/* -------------------------------------------------------------------------- */

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-card"
    >
      Skip to content
    </a>
  )
}

function Masthead() {
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
        <nav className="flex items-center gap-5" aria-label="Sections">
          {[
            ['#predict', 'Predict'],
            ['#method', 'Method'],
            ['#results', 'Results'],
            ['#limits', 'Limits'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="patch-label hidden text-ink-2 transition-colors hover:text-ink sm:block"
            >
              {label}
            </a>
          ))}
          <a
            href="#predict"
            className="patch-label bg-ink px-3 py-2 text-card transition-opacity hover:opacity-90"
          >
            Predict
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
  { pct: 0, label: 'Bare steel, corroding freely', hex: '#7b2e12' },
  { pct: 40, label: 'Partial film', hex: '#c08a2e' },
  { pct: 80, label: 'Protective film forming', hex: '#2e8b7a' },
  { pct: 100, label: 'Passivated, protected', hex: '#008751' },
] as const

function Problem() {
  return (
    <section className="border-b border-ink" aria-labelledby="problem-title">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
        <p className="patch-label mb-6 text-ink-3">
          {ATTRIBUTION.institution} · {ATTRIBUTION.department}
        </p>

        <h1
          id="problem-title"
          className="max-w-4xl font-display text-[2.6rem] font-800 leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl"
        >
          Nigeria loses pipelines
          <br />
          to rust one
          <br />
          molecule at a time.
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">
              In the Niger Delta, high humidity, salinity and corrosive bacteria attack carbon
              steel from the inside. Between 1989 and 1998 a single operator recorded{' '}
              <strong className="font-mono text-ink tabular">810</strong> oil-spill incidents
              totalling <strong className="font-mono text-ink tabular">46,758</strong> barrels —
              of which <strong className="font-mono text-ink tabular">310</strong> incidents and{' '}
              <strong className="font-mono text-ink tabular">24,342</strong> barrels were
              attributed to pipeline corrosion.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              The defence is an <strong>organic corrosion inhibitor</strong>: a molecule dosed at
              parts per million that adsorbs onto the steel and forms a protective film. Dosed
              well, it has taken a measured corrosion rate from{' '}
              <strong className="font-mono text-ink tabular">42.7</strong> down to{' '}
              <strong className="font-mono text-ink tabular">1.3</strong> mils per year.
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
              Finding the right molecule means bench testing candidates one at a time, for weeks.
              This model estimates the answer first.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#predict"
                className="bg-ink px-6 py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-card transition-opacity hover:opacity-90"
              >
                Make a prediction
              </a>
              <a
                href="#method"
                className="border border-rule px-6 py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-ink-2 transition-colors hover:border-ink hover:text-ink"
              >
                How it works
              </a>
            </div>
          </div>

          {/* The ramp introduced as a physical fact, before it is used as a UI device. */}
          <figure className="panel registered self-start p-6">
            <figcaption className="patch-label mb-4 text-ink-3">
              The scale this instrument reads
            </figcaption>
            {/* Patches share one row so their heights cannot drift with caption length. */}
            <div className="flex h-40 gap-0.5">
              {HERO_PATCHES.map((patch) => (
                <div key={patch.pct} className="flex-1" style={{ backgroundColor: patch.hex }} />
              ))}
            </div>
            <div className="flex gap-0.5 pt-2">
              {HERO_PATCHES.map((patch) => (
                <div key={patch.pct} className="flex-1">
                  <div className="font-mono text-sm font-600 tabular">{patch.pct}%</div>
                  <div className="mt-1 text-[11px] leading-tight text-ink-3">{patch.label}</div>
                </div>
              ))}
            </div>
            <p className="mt-5 border-t border-rule pt-3 text-xs text-ink-2">
              Inhibition efficiency is not an abstract score. It is the difference between a metal
              that dissolves and one that does not — and it has a colour.
            </p>
          </figure>
        </div>

        <p className="mt-12 max-w-3xl border-t border-rule pt-4 text-xs text-ink-3">
          Sources:{' '}
          <a className="underline hover:text-ink" href={CITATIONS.spdcSpills.url} target="_blank" rel="noreferrer">
            {CITATIONS.spdcSpills.source}
          </a>{' '}
          ·{' '}
          <a className="underline hover:text-ink" href={CITATIONS.inhibitorEffect.url} target="_blank" rel="noreferrer">
            {CITATIONS.inhibitorEffect.source}
          </a>{' '}
          ·{' '}
          <a className="underline hover:text-ink" href={CITATIONS.nigerDelta.url} target="_blank" rel="noreferrer">
            {CITATIONS.nigerDelta.source}
          </a>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. The instrument                                                           */
/* -------------------------------------------------------------------------- */

function PredictSection() {
  return (
    <Section
      id="predict"
      eyebrow="The instrument"
      title="Read an efficiency."
      lead={
        <>
          Enter a molecule and the conditions it will face. You get a calibrated band, not a
          false point — and a plain statement of whether this is chemistry the model actually
          knows.
        </>
      }
    >
      <Predictor />
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. Method                                                                   */
/* -------------------------------------------------------------------------- */

function Method({ model }: { model: ModelInfo | null }) {
  return (
    <Section
      id="method"
      tone="sunk"
      eyebrow="Method"
      title="Efficiency depends on conditions. So the model is given them."
      lead={
        <>
          Most published structure–property models predict from molecular structure alone, while
          the efficiency they are trained against depends on temperature, concentration, duration
          and substrate. This project carried those conditions through and handed them to the
          model. That decision is the research.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <ol className="space-y-6">
            {[
              {
                n: '01',
                h: 'Three datasets, one schema',
                p: 'Inhibitor 1368, DataCor aluminium and the Excorr database — 7,991 raw measurements harmonised onto a common scale, with SMILES canonicalised and salts stripped.',
              },
              {
                n: '02',
                h: 'Deduplicate without discarding conditions',
                p: 'An earlier pipeline averaged each molecule across every condition, collapsing ~8,000 rows to 717. Keying on molecule, metal, temperature, duration and concentration instead preserves distinct measurements — and yields 5,170 usable rows.',
              },
              {
                n: '03',
                h: '220 features',
                p: '209 non-constant RDKit descriptors, plus temperature, duration, log₁₀ concentration, a was-missing indicator for each, and a one-hot substrate.',
              },
              {
                n: '04',
                h: 'Two evaluation splits, always reported together',
                p: 'Random five-fold, and Bemis–Murcko scaffold five-fold where molecules sharing a core stay in the same fold. The gap between them is the honest story.',
              },
            ].map((step) => (
              <li key={step.n} className="grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="font-mono text-sm text-ink-3 tabular">{step.n}</span>
                <div>
                  <h3 className="font-display text-base font-700">{step.h}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{step.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3">
            {[
              ['5,170', 'measurements'],
              ['945', 'unique molecules'],
              ['5', 'metals'],
              ['209', 'descriptors'],
              ['11', 'condition features'],
              ['0', 'pH features'],
            ].map(([value, label]) => (
              <div key={label} className="bg-card px-4 py-5">
                <div className="font-mono text-2xl font-600 tabular">{value}</div>
                <div className="patch-label mt-1.5 text-ink-3">{label}</div>
              </div>
            ))}
          </div>

          <figure className="panel p-4">
            <img
              src="/figures/fig04_pipeline_architecture.png"
              alt="Pipeline architecture: three source datasets feed inspection and preprocessing into a master table, which feeds feature analysis and four modelling streams, which feed ensemble construction."
              className="w-full"
              loading="lazy"
            />
            <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-3">
              <strong className="text-ink-2">Figure 4.</strong> The executed pipeline, from three
              source datasets through to ensemble construction and conformal calibration.
            </figcaption>
          </figure>

          {model && (
            <p className="font-mono text-xs text-ink-3">
              Serving {model.algorithm.replace('_', ' ')} · {model.features.total} features ·
              seed {model.provenance.seed} · run {model.provenance.source_run}
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

function Results({ model, modelError }: { model: ModelInfo | null; modelError: boolean }) {
  return (
    <Section
      id="results"
      eyebrow="Results"
      title="Two numbers, never one."
      lead={
        <>
          The model scores <strong className="font-mono text-ink">R² 0.806</strong> on a random
          split and <strong className="font-mono text-ink">R² 0.310</strong> on a scaffold split.
          Both are true, and they answer different questions. Quoting only the first would be the
          easiest way to mislead you, so this page refuses to.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="panel registered p-6 sm:p-7">
          <h3 className="patch-label mb-4 text-ink-3">Random split — R² 0.806</h3>
          <p className="text-sm leading-relaxed text-ink-2">
            Folds drawn at random. A test molecule may already appear in training under different
            conditions, so this measures how well the model predicts a{' '}
            <strong>new measurement of a molecule it has met</strong>. Useful, and not the
            question a screening chemist is asking.
          </p>
        </div>
        <div className="panel registered p-6 sm:p-7" style={{ borderColor: '#008751' }}>
          <h3 className="patch-label mb-4" style={{ color: '#008751' }}>
            Scaffold split — R² 0.310
          </h3>
          <p className="text-sm leading-relaxed text-ink-2">
            Molecules sharing a Bemis–Murcko core are held in the same fold, so every test
            molecule is structurally unfamiliar. This measures performance on{' '}
            <strong>genuinely new chemistry</strong>. It is the number to quote for an untested
            candidate, and the one this service uses whenever your molecule is new to it.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-lg font-700">The central result</h3>
          <p className="mb-6 text-sm text-ink-2">
            The same random forest, with and without experimental conditions. The lift is
            systematic — it held for every classical model tested, which is what makes it signal
            rather than luck.
          </p>
          {model ? (
            <AblationChart ablation={model.ablation} />
          ) : (
            <Placeholder error={modelError} />
          )}
        </div>

        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-lg font-700">Every model tested</h3>
          <p className="mb-6 text-sm text-ink-2">
            Four model families across both splits. The condition-aware random forest wins
            everywhere — including against the graph networks and the fine-tuned transformer,
            which read structure only.
          </p>
          {model ? (
            <Leaderboard rows={model.all_models} />
          ) : (
            <Placeholder error={modelError} />
          )}
        </div>
      </div>
    </Section>
  )
}

function Placeholder({ error }: { error: boolean }) {
  return (
    <div className="flex min-h-40 items-center justify-center border border-dashed border-rule px-4 py-8 text-center">
      <p className="max-w-xs text-sm text-ink-3">
        {error ? (
          <>
            Live metrics unavailable — the prediction service at{' '}
            <code className="font-mono">{API_BASE_URL}</code> is not reachable.
          </>
        ) : (
          'Loading metrics…'
        )}
      </p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 5. What the model learned                                                   */
/* -------------------------------------------------------------------------- */

function Learned() {
  return (
    <Section
      tone="sunk"
      eyebrow="Interpretability"
      title="Did it learn chemistry, or just arithmetic?"
      lead={
        <>
          Shapley values over the whole corpus name what the model leans on. The answer is
          reassuring: substrate identity, molecular size and the dosing conditions — which is
          what corrosion science would predict.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <figure className="panel p-4">
          <img
            src="/figures/fig07_shap_summary.png"
            alt="SHAP summary plot. The strongest features are metal equals aluminium, molar refractivity, log concentration, temperature and duration, followed by connectivity and partial-charge descriptors."
            className="w-full"
            loading="lazy"
          />
          <figcaption className="mt-3 border-t border-rule pt-3 text-xs text-ink-3">
            <strong className="text-ink-2">Figure 7.</strong> Global SHAP summary for the tuned
            random forest. Each point is one molecule; position shows the effect on predicted
            efficiency.
          </figcaption>
        </figure>

        <div className="space-y-5">
          {[
            {
              h: 'Substrate dominates',
              p: 'Which metal you are protecting is the single strongest feature. Aluminium and magnesium behave differently enough from steel that the model treats them almost as separate problems.',
            },
            {
              h: 'Size governs coverage',
              p: 'Molar refractivity and connectivity indices rank high. Bulkier molecules cover more surface per adsorbed molecule — the physical picture corrosion science already holds.',
            },
            {
              h: 'Dose and heat matter, in that order',
              p: 'Log concentration outranks temperature, and both outrank most structural descriptors. This is the conditions hypothesis confirmed from the inside.',
            },
            {
              h: 'Electron-rich sites appear',
              p: 'Partial-charge and electrotopological descriptors surface below the leaders, consistent with adsorption through nitrogen, sulfur and oxygen donor atoms.',
            },
          ].map((item) => (
            <div key={item.h} className="border-l-2 border-rule pl-4">
              <h3 className="font-display text-base font-700">{item.h}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{item.p}</p>
            </div>
          ))}
          <p className="border-t border-rule pt-4 text-xs text-ink-3">
            Attribution shows what the model relies on. It is evidence that the model learned
            something physically sensible — not a measurement of adsorption chemistry itself.
          </p>
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 6. Limits                                                                   */
/* -------------------------------------------------------------------------- */

function Limits({ model }: { model: ModelInfo | null }) {
  const limits = [
    {
      h: 'The scaffold gap is large, and it did not close',
      p: 'Conditions lifted scaffold R² from 0.124 to 0.310 — real, but far below the 0.806 random-split figure. Knowing the conditions cannot substitute for having seen the chemistry.',
    },
    {
      h: 'Duration is missing for 46% of the corpus',
      p: 'Imputation with a was-missing indicator is honest bookkeeping, but it cannot recover information that was never measured.',
    },
    {
      h: 'pH is excluded by design',
      p: 'It is recorded for only 32% of rows and is carried for analysis only. Adding it would have meant imputing a majority of the column.',
    },
    {
      h: 'Iron and carbon steel are still separate',
      p: 'Carbon steel is iron-based and both are usually tested in acid, but the sources do not record the distinction reliably. Whether to merge them into one ferrous group is an open scientific decision, deliberately unresolved.',
    },
    {
      h: 'Tuning was 10 trials, not nested cross-validation',
      p: 'A direct Optuna search against the scaffold objective. The tuning curve was flat across all trials, so the model is not hyperparameter-limited — but the methodology labels nested CV as planned, not done.',
    },
    {
      h: 'This is not a substitute for testing',
      p: 'It is a research demonstrator for screening and ranking. Weight-loss and electrochemical measurement remain the evidence.',
    },
  ]

  return (
    <Section
      id="limits"
      eyebrow="Limits"
      title="Where this model stops working."
      lead={
        <>
          Every item here is one an examiner would otherwise have to find. Calibrated uncertainty
          of{' '}
          <strong className="font-mono text-ink">
            ±{model?.calibration.half_width_ie_points.toFixed(1) ?? '19.5'}
          </strong>{' '}
          efficiency points at{' '}
          <strong className="font-mono text-ink">
            {model ? Math.round(model.calibration.empirical_coverage * 100) : 95}%
          </strong>{' '}
          empirical coverage is wide — and stating it plainly is the point.
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

function BatchSection() {
  return (
    <Section
      eyebrow="Batch"
      title="Rank a whole candidate series."
      lead="Upload a CSV of molecules under one service condition and get them back ordered by predicted efficiency, each with its own band and trust verdict."
    >
      <BatchPanel />
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* 8. Figures                                                                  */
/* -------------------------------------------------------------------------- */

const FIGURES = [
  ['fig01_target_distributions_raw.png', 'Figure 1', 'Raw target distributions across the three source datasets, before harmonisation.'],
  ['fig03_target_distribution_harmonised.png', 'Figure 3', 'The harmonised efficiency distribution after canonicalisation, deduplication and metal scoping.'],
  ['fig05_mutual_information.png', 'Figure 5', 'Top 30 descriptors by mutual information with the target.'],
  ['fig06_descriptor_correlation.png', 'Figure 6', 'Correlation among the leading descriptors, exposing redundancy in the size and connectivity families.'],
  ['fig08_ig_atom_saliency.png', 'Figure 8', 'Integrated-gradients atom saliency on the message-passing network.'],
  ['fig09_attention_rollout.png', 'Figure 9', 'Attention rollout over a SMILES string from the fine-tuned ChemBERTa.'],
  ['fig10_conformal_intervals.png', 'Figure 10', 'Predictions with 90% conformal intervals against observed values.'],
] as const

function Figures() {
  return (
    <Section
      tone="sunk"
      eyebrow="Appendix"
      title="Figures from the executed run."
      lead="Produced directly by the notebook, reproduced here unaltered."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FIGURES.map(([file, label, caption]) => (
          <figure key={file} className="panel p-4">
            <img
              src={`/figures/${file}`}
              alt={caption}
              className="w-full bg-white"
              loading="lazy"
            />
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

function Colophon({ model }: { model: ModelInfo | null }) {
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
                ['Author', ATTRIBUTION.author],
                ['Supervisor', ATTRIBUTION.supervisor],
                ['Co-supervisor', ATTRIBUTION.coSupervisor],
                ['Institution', `${ATTRIBUTION.department}, ${ATTRIBUTION.institution}`],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="patch-label mb-1 text-card/50">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="text-sm">
            <h3 className="patch-label mb-4 text-card/50">Provenance</h3>
            {model ? (
              <dl className="space-y-2 font-mono text-xs text-card/80">
                <Prov label="Model version" value={`v${model.version}`} />
                <Prov label="Source run" value={model.provenance.source_run} />
                <Prov label="Seed" value={String(model.provenance.seed)} />
                <Prov label="scikit-learn" value={model.provenance.pins['scikit-learn'] ?? '—'} />
                <Prov label="RDKit" value={model.provenance.rdkit_runtime} />
                <Prov
                  label="Model SHA-256"
                  value={model.provenance.artifact_hashes['model.joblib'] ?? '—'}
                />
              </dl>
            ) : (
              <p className="text-xs text-card/50">Service unavailable.</p>
            )}
            <p className="mt-6 text-xs leading-relaxed text-card/60">
              Every artefact is verified against a SHA-256 manifest before the service will
              start. Dataset citations are still being traced; the three source datasets are
              linked to rather than redistributed.
            </p>
          </div>
        </div>

        <p className="mt-12 border-t border-card/20 pt-6 text-xs text-card/50">
          {PRODUCT_NAME} is a research demonstrator. Predictions are hypotheses to test, never a
          substitute for weight-loss or electrochemical measurement, and never a basis for
          engineering sign-off.
        </p>
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
