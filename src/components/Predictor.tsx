import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ApiError,
  api,
  type Categories,
  type Explanation,
  type Prediction,
  type PredictionInput,
  type ReliabilityWarning,
  type ValidationResult,
} from '@/lib/api'
import {
  EXAMPLES,
  METALS,
  PERFORMANCE,
  PH_SOURCES,
  POOLED_LABELS,
  UNKNOWN_DEFAULTS,
  type MetalValue,
  type PhSourceValue,
} from '@/lib/constants'
import { DOMAIN_COLOR } from '@/lib/ramp'
import { useT } from '@/i18n'
import type { Translations } from '@/i18n/config'
import { ComparatorScale, ReferenceStrip } from '@/components/ComparatorScale'
import { ContributionChart } from '@/components/Charts'

/** The five numeric conditions the user may leave unrecorded. */
type ConditionKey =
  | 'temperature_k'
  | 'duration_h'
  | 'concentration_mm'
  | 'ph'
  | 'salt_concentration_m'

interface FormState {
  smiles: string
  metal: MetalValue
  alloy: string
  methodology: string
  ph_source: PhSourceValue
  temperature_k: string
  duration_h: string
  concentration_mm: string
  ph: string
  salt_concentration_m: string
  synergist_present: boolean
  recorded: Record<ConditionKey, boolean>
}

const FIRST = EXAMPLES[0]

const INITIAL: FormState = {
  smiles: FIRST.smiles,
  metal: FIRST.metal,
  alloy: FIRST.alloy,
  methodology: FIRST.methodology,
  ph_source: FIRST.ph_source,
  temperature_k: String(FIRST.temperature_k),
  duration_h: String(FIRST.duration_h),
  concentration_mm: String(FIRST.concentration_mm),
  ph: String(FIRST.ph),
  salt_concentration_m: String(FIRST.salt_concentration_m ?? ''),
  synergist_present: false,
  recorded: {
    temperature_k: true,
    duration_h: true,
    concentration_mm: true,
    ph: true,
    salt_concentration_m: FIRST.salt_concentration_m !== null,
  },
}

const CONDITION_META: {
  key: ConditionKey
  unit: string
  step: string
  min: number
  max: number
}[] = [
  { key: 'temperature_k', unit: 'K', step: '0.05', min: 200, max: 800 },
  { key: 'duration_h', unit: 'h', step: '0.5', min: 0, max: 10000 },
  { key: 'concentration_mm', unit: 'mM', step: 'any', min: 0, max: 100000 },
  // pH runs negative in this corpus: concentrated acid reaches -1.0.
  { key: 'ph', unit: '', step: '0.1', min: -2, max: 16 },
  { key: 'salt_concentration_m', unit: 'M', step: 'any', min: 0, max: 100 },
]

const CONDITION_TEXT: Record<
  ConditionKey,
  (t: Translations) => { label: string; hint: string }
> = {
  temperature_k: (t) => ({ label: t.predictor.temperature, hint: t.predictor.temperatureHint }),
  duration_h: (t) => ({ label: t.predictor.duration, hint: t.predictor.durationHint }),
  concentration_mm: (t) => ({
    label: t.predictor.concentration,
    hint: t.predictor.concentrationHint,
  }),
  ph: (t) => ({ label: t.predictor.ph, hint: t.predictor.phHint }),
  salt_concentration_m: (t) => ({ label: t.predictor.salt, hint: t.predictor.saltHint }),
}

export function Predictor() {
  const t = useT()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [categories, setCategories] = useState<Categories | null>(null)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [explanation, setExplanation] = useState<Explanation | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  /* The vocabularies the selects bind to.
   *
   * Loaded from the service rather than hardcoded, because the encoders treat an unknown
   * value as an all-zero block instead of an error. Binding to the model's own category list
   * is what stops a typed alloy from silently becoming no alloy at all. */
  useEffect(() => {
    api
      .categories()
      .then(setCategories)
      .catch(() => setCategories(null))
  }, [])

  const toPayload = useCallback(
    (): PredictionInput => ({
      smiles: form.smiles.trim(),
      metal: form.metal,
      alloy: form.alloy.trim() || UNKNOWN_DEFAULTS.alloy,
      methodology: form.methodology.trim() || UNKNOWN_DEFAULTS.methodology,
      ph_source: form.recorded.ph ? form.ph_source : UNKNOWN_DEFAULTS.ph_source,
      temperature_k: form.recorded.temperature_k ? Number(form.temperature_k) : null,
      duration_h: form.recorded.duration_h ? Number(form.duration_h) : null,
      concentration_mm: form.recorded.concentration_mm ? Number(form.concentration_mm) : null,
      ph: form.recorded.ph ? Number(form.ph) : null,
      salt_concentration_m: form.recorded.salt_concentration_m
        ? Number(form.salt_concentration_m)
        : null,
      synergist_present: form.synergist_present ? 1 : 0,
    }),
    [form],
  )

  /* Warnings we can raise before the request, from the category tables. */
  const preflight = useMemo(() => {
    if (!categories) return []
    const notes: { subject: string; message: string }[] = []
    const alloy = categories.alloy.find((a) => a.value === form.alloy)
    const method = categories.method.find((m) => m.value === form.methodology)
    if (alloy?.unreliable) {
      notes.push({ subject: form.alloy, message: t.predictor.warnUnreliableAlloy })
    }
    if (method?.unreliable) {
      notes.push({ subject: form.methodology, message: t.predictor.warnUnreliableMethod })
    }
    return notes
  }, [categories, form.alloy, form.methodology, t])

  /* Live SMILES validation, debounced. */
  useEffect(() => {
    const smiles = form.smiles.trim()
    if (!smiles) {
      setValidation(null)
      return
    }
    const timer = setTimeout(() => {
      api
        .validate(smiles)
        .then(setValidation)
        .catch(() => setValidation(null))
    }, 400)
    return () => clearTimeout(timer)
  }, [form.smiles])

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setPending(true)
    setError(null)
    try {
      const payload = toPayload()
      const [result, detail] = await Promise.all([
        api.predict(payload),
        api.explain(payload).catch(() => null),
      ])
      setPrediction(result)
      setExplanation(detail)
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
      )
    } catch (err) {
      setPrediction(null)
      setExplanation(null)
      setError(err instanceof ApiError ? err.message : t.predictor.genericError)
    } finally {
      setPending(false)
    }
  }

  function loadExample(example: (typeof EXAMPLES)[number]) {
    setForm({
      smiles: example.smiles,
      metal: example.metal,
      alloy: example.alloy,
      methodology: example.methodology,
      ph_source: example.ph_source,
      temperature_k: String(example.temperature_k),
      duration_h: String(example.duration_h),
      concentration_mm: String(example.concentration_mm),
      ph: String(example.ph),
      salt_concentration_m: String(example.salt_concentration_m ?? ''),
      synergist_present: false,
      recorded: {
        temperature_k: true,
        duration_h: true,
        concentration_mm: true,
        ph: true,
        salt_concentration_m: example.salt_concentration_m !== null,
      },
    })
    setPrediction(null)
    setExplanation(null)
    setError(null)
  }

  const smilesInvalid = validation !== null && !validation.valid
  const alloyOptions = categories?.alloy ?? []
  const methodOptions = categories?.method ?? []

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      {/* ---------------------------------------------------------------- */}
      {/* Inputs                                                            */}
      {/* ---------------------------------------------------------------- */}
      <form onSubmit={submit} className="panel p-6 sm:p-7" noValidate>
        <div className="mb-5 flex items-baseline justify-between border-b border-ink pb-3">
          <h2 className="font-display text-lg font-700">{t.predictor.title}</h2>
          <span className="patch-label text-ink-3">{t.predictor.inputCount}</span>
        </div>

        {/* SMILES */}
        <div className="mb-6">
          <label htmlFor="smiles" className="patch-label mb-2 block text-ink-2">
            {t.predictor.smilesLabel}
          </label>
          <textarea
            id="smiles"
            rows={2}
            value={form.smiles}
            onChange={(e) => setForm({ ...form, smiles: e.target.value })}
            spellCheck={false}
            className={`w-full resize-none border bg-card px-3 py-2 font-mono text-sm outline-none focus:border-ink ${
              smilesInvalid ? 'border-ie-00' : 'border-rule'
            }`}
            placeholder="c1ccc2[nH]nnc2c1"
          />
          <SmilesFeedback validation={validation} />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {EXAMPLES.map((example) => (
              <button
                key={example.name}
                type="button"
                onClick={() => loadExample(example)}
                title={example.note}
                className="patch-label border border-rule px-2.5 py-1.5 text-ink-2 transition-colors hover:border-ink hover:bg-card-2"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>

        {/* Metal */}
        <fieldset className="mb-6">
          <legend className="patch-label mb-2 text-ink-2">{t.predictor.metalLabel}</legend>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {METALS.map((m) => (
              <label
                key={m.value}
                className={`flex cursor-pointer flex-col border px-3 py-2 transition-colors ${
                  form.metal === m.value
                    ? 'border-ink bg-ink text-card'
                    : 'border-rule text-ink-2 hover:bg-card-2'
                }`}
              >
                <input
                  type="radio"
                  name="metal"
                  value={m.value}
                  checked={form.metal === m.value}
                  onChange={() => setForm({ ...form, metal: m.value })}
                  className="sr-only"
                />
                <span className="text-sm font-500">{t.metals[m.value]}</span>
                <span
                  className={`font-mono text-[11px] tabular ${
                    form.metal === m.value ? 'text-card/70' : 'text-ink-3'
                  }`}
                >
                  {m.rows.toLocaleString()} {t.predictor.rows}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Substrate and technique — the blocks this model version added. */}
        <fieldset className="mb-6">
          <legend className="patch-label mb-1 text-ink-2">{t.predictor.contextLabel}</legend>
          <p className="mb-3 text-xs text-ink-3">{t.predictor.contextHint}</p>

          <div className="space-y-3">
            <VocabularySelect
              id="alloy"
              label={t.predictor.alloyLabel}
              hint={t.predictor.alloyHint}
              value={form.alloy}
              options={alloyOptions}
              pooledLabel={POOLED_LABELS.alloy}
              unreliableNote={t.predictor.unreliableTag}
              onChange={(value) => setForm({ ...form, alloy: value })}
            />
            <VocabularySelect
              id="methodology"
              label={t.predictor.methodLabel}
              hint={t.predictor.methodHint}
              value={form.methodology}
              options={methodOptions}
              pooledLabel={POOLED_LABELS.method}
              unreliableNote={t.predictor.unreliableTag}
              onChange={(value) => setForm({ ...form, methodology: value })}
            />

            <label className="flex cursor-pointer items-start gap-2 border border-rule px-3 py-2.5 text-sm text-ink-2 hover:bg-card-2">
              <input
                type="checkbox"
                checked={form.synergist_present}
                onChange={(e) => setForm({ ...form, synergist_present: e.target.checked })}
                className="mt-0.5 h-3.5 w-3.5 accent-ie-100"
              />
              <span>
                {t.predictor.synergistLabel}
                <span className="mt-0.5 block text-[11px] text-ink-3">
                  {t.predictor.synergistHint}
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        {/* Conditions */}
        <fieldset className="mb-7">
          <legend className="patch-label mb-1 text-ink-2">{t.predictor.conditionsLabel}</legend>
          <p className="mb-3 text-xs text-ink-3">{t.predictor.conditionsHint}</p>

          <div className="space-y-3">
            {CONDITION_META.map((c) => {
              const on = form.recorded[c.key]
              const { label, hint } = CONDITION_TEXT[c.key](t)
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor={c.key} className="text-sm text-ink-2">
                      {label}
                      {c.unit && <span className="font-mono text-xs text-ink-3"> ({c.unit})</span>}
                    </label>
                    <label className="flex cursor-pointer items-center gap-1.5 text-xs text-ink-3">
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            recorded: { ...form.recorded, [c.key]: e.target.checked },
                          })
                        }
                        className="h-3.5 w-3.5 accent-ie-100"
                      />
                      {t.predictor.recorded}
                    </label>
                  </div>
                  <input
                    id={c.key}
                    type="number"
                    inputMode="decimal"
                    step={c.step}
                    min={c.min}
                    max={c.max}
                    disabled={!on}
                    required={on}
                    value={form[c.key]}
                    onChange={(e) => setForm({ ...form, [c.key]: e.target.value })}
                    className="mt-1.5 w-full border border-rule bg-card px-3 py-2 font-mono text-sm outline-none tabular focus:border-ink disabled:bg-card-2 disabled:text-ink-3"
                    placeholder={on ? undefined : t.predictor.notRecorded}
                  />
                  <p className="mt-1 text-[11px] text-ink-3">{hint}</p>

                  {/* pH provenance sits with pH, because it only means anything next to it. */}
                  {c.key === 'ph' && on && (
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-ink-3">{t.predictor.phSourceLabel}</span>
                      {PH_SOURCES.filter((p) => p.value !== 'missing').map((p) => (
                        <label
                          key={p.value}
                          className={`cursor-pointer border px-2 py-1 text-[11px] transition-colors ${
                            form.ph_source === p.value
                              ? 'border-ink bg-ink text-card'
                              : 'border-rule text-ink-2 hover:bg-card-2'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ph_source"
                            checked={form.ph_source === p.value}
                            onChange={() => setForm({ ...form, ph_source: p.value })}
                            className="sr-only"
                          />
                          {t.phSources[p.value]}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </fieldset>

        {preflight.length > 0 && (
          <div className="mb-5 border-l-2 border-ie-40 bg-card-2 px-3 py-2.5">
            <p className="patch-label mb-1 text-ink-2">{t.predictor.preflightTitle}</p>
            <ul className="space-y-1 text-xs text-ink-2">
              {preflight.map((note) => (
                <li key={note.subject}>
                  <strong className="font-mono">{note.subject}</strong> — {note.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={pending || smilesInvalid || !form.smiles.trim()}
          className="w-full bg-ink py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-card transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {pending ? t.predictor.submitPending : t.predictor.submit}
        </button>

        <p className="mt-3 text-center text-xs text-ink-3">{t.predictor.intervalNote}</p>
      </form>

      {/* ---------------------------------------------------------------- */}
      {/* Reading                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div ref={resultRef} className="space-y-6">
        {error && (
          <div className="panel border-ie-00 p-6" role="alert">
            <h3 className="patch-label mb-2 text-ie-00">{t.predictor.errorTitle}</h3>
            <p className="text-sm text-ink-2">{error}</p>
          </div>
        )}

        {!prediction && !error && (
          <div className="panel registered flex min-h-[22rem] flex-col justify-center p-8 text-center">
            <ReferenceStrip />
            <h3 className="mt-6 font-display text-lg font-700">{t.predictor.emptyTitle}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">{t.predictor.emptyBody}</p>
          </div>
        )}

        {prediction && <Reading prediction={prediction} explanation={explanation} />}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function SmilesFeedback({ validation }: { validation: ValidationResult | null }) {
  const t = useT()
  if (!validation) return null
  if (!validation.valid) {
    return <p className="mt-1.5 text-xs text-ie-00">{validation.error}</p>
  }
  return (
    <p className="mt-1.5 font-mono text-xs text-ink-3">
      {validation.formula}
      {validation.salt_stripped && <> · {t.predictor.saltStripped}</>}
      {validation.in_training_corpus && <> · {t.predictor.inCorpus}</>}
    </p>
  )
}

/**
 * A select bound to the model's own category list.
 *
 * The encoders were fitted with `handle_unknown="ignore"`, so a value they have not seen
 * produces an all-zero block and a confident prediction with nothing to warn about. Offering
 * only the values the model encodes is what prevents that; the pooled bucket is offered
 * explicitly, and labelled, for anything genuinely outside the list.
 */
function VocabularySelect({
  id,
  label,
  hint,
  value,
  options,
  pooledLabel,
  unreliableNote,
  onChange,
}: {
  id: string
  label: string
  hint: string
  value: string
  options: Categories['alloy']
  pooledLabel: string
  unreliableNote: string
  onChange: (value: string) => void
}) {
  const selected = options.find((option) => option.value === value)

  return (
    <div>
      <label htmlFor={id} className="text-sm text-ink-2">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1.5 w-full border border-rule bg-card px-3 py-2 text-sm outline-none focus:border-ink"
      >
        {options.length === 0 && <option value={value}>{value}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value === pooledLabel ? `— ${option.value} —` : option.value}
            {option.rows ? ` (${option.rows.toLocaleString()})` : ''}
            {option.unreliable ? ` ${unreliableNote}` : ''}
          </option>
        ))}
      </select>
      <p className="mt-1 text-[11px] text-ink-3">{hint}</p>
      {selected?.unreliable && selected.group_r2 != null && (
        <p className="mt-1 font-mono text-[11px] text-ie-00">R² {selected.group_r2.toFixed(3)}</p>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

function Reading({
  prediction,
  explanation,
}: {
  prediction: Prediction
  explanation: Explanation | null
}) {
  const t = useT()
  const [explainOpen, setExplainOpen] = useState(false)
  const ad = prediction.applicability_domain
  const color = DOMAIN_COLOR[ad.verdict]
  const imputed = describeImputed(prediction.imputed_conditions, t)

  return (
    <div className="animate-settle space-y-6">
      <div className="panel registered p-6 sm:p-7">
        <div className="mb-5 flex items-baseline justify-between border-b border-ink pb-3">
          <h3 className="font-display text-lg font-700">{t.predictor.readingTitle}</h3>
          <span className="patch-label font-mono text-ink-3">
            {t.predictor.modelVersion} v{prediction.model_version}
          </span>
        </div>

        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="patch-label mb-1 text-ink-3">{t.predictor.efficiencyLabel}</div>
            <div className="font-mono text-6xl font-600 leading-none tabular">
              {prediction.inhibition_efficiency.toFixed(1)}
              <span className="ml-1 text-3xl text-ink-3">%</span>
            </div>
          </div>

          {/* The trust panel now lives behind this. Quiet by default, one click away. */}
          <div className="flex items-center gap-2">
            <span
              className="patch-label px-2.5 py-1.5 text-card"
              style={{ backgroundColor: color }}
            >
              {t.domain[ad.verdict]}
            </span>
            <button
              type="button"
              onClick={() => setExplainOpen(true)}
              className="border-b border-dotted border-ink-3 text-sm text-ink-2 transition-colors hover:border-ink hover:text-ink"
              aria-haspopup="dialog"
            >
              {t.predictor.explain}
            </button>
          </div>
        </div>

        <ComparatorScale
          value={prediction.inhibition_efficiency}
          low={prediction.interval_low}
          high={prediction.interval_high}
          coverage={prediction.nominal_coverage}
        />

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 text-sm sm:grid-cols-3">
          <Fact label={t.predictor.formula} value={prediction.formula} mono />
          <Fact
            label={t.predictor.mass}
            value={`${prediction.molecular_weight.toFixed(1)} ${t.predictor.gramsPerMol}`}
            mono
          />
          <Fact
            label={t.predictor.substrate}
            value={`${t.metals[prediction.metal as keyof typeof t.metals] ?? prediction.metal} · ${prediction.alloy}`}
          />
        </dl>

        {imputed.length > 0 && (
          <p className="mt-4 border-l-2 border-ie-40 bg-card-2 px-3 py-2 text-xs text-ink-2">
            <strong>
              {imputed.length}{' '}
              {imputed.length > 1 ? t.predictor.imputedMany : t.predictor.imputedOne}
            </strong>{' '}
            ({imputed.join(', ')}). {t.predictor.imputedBody}
          </p>
        )}
      </div>

      {/* Warnings are never hidden behind the disclosure: the bundle requires them surfaced. */}
      {prediction.reliability_warnings.length > 0 && (
        <WarningPanel warnings={prediction.reliability_warnings} />
      )}

      {explanation && explanation.contributions.length > 0 && (
        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-base font-700">{t.predictor.shapTitle}</h3>
          <p className="mb-5 text-sm text-ink-2">{t.predictor.shapLead}</p>
          <ContributionChart explanation={explanation} />
        </div>
      )}

      {explainOpen && (
        <ExplainDialog prediction={prediction} onClose={() => setExplainOpen(false)} />
      )}
    </div>
  )
}

function WarningPanel({ warnings }: { warnings: ReliabilityWarning[] }) {
  const t = useT()
  return (
    <div className="panel border-ie-00 p-6 sm:p-7">
      <h3 className="mb-3 font-display text-base font-700 text-ie-00">
        {t.predictor.warningsTitle}
      </h3>
      <ul className="space-y-3 text-sm text-ink-2">
        {warnings.map((warning, index) => (
          <li key={`${warning.kind}-${warning.subject}-${index}`} className="flex gap-2.5">
            <span className="patch-label mt-0.5 shrink-0 text-ink-3">
              {t.warningKinds[warning.kind]}
            </span>
            <span>{warning.message}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * The applicability-domain panel, as a dialog.
 *
 * It used to sit open on the page under the heading "How far can you trust this?", which put
 * a paragraph of caveat between the reader and every result. The content has not been
 * softened — it is the same measurement, one click away, and the warnings that matter for
 * action stay on the page whether this is opened or not.
 */
function ExplainDialog({
  prediction,
  onClose,
}: {
  prediction: Prediction
  onClose: () => void
}) {
  const t = useT()
  const ad = prediction.applicability_domain
  const color = DOMAIN_COLOR[ad.verdict]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const pooled = ad.categories.filter((c) => !c.in_vocabulary)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="explain-title"
        onClick={(event) => event.stopPropagation()}
        className="panel my-auto w-full max-w-xl bg-card p-6 sm:p-7"
        style={{ borderColor: color }}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="patch-label px-2.5 py-1.5 text-card"
              style={{ backgroundColor: color }}
            >
              {t.domain[ad.verdict]}
            </span>
            <h3 id="explain-title" className="font-display text-base font-700">
              {t.predictor.trustTitle}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="patch-label border border-rule px-2.5 py-1.5 text-ink-2 transition-colors hover:border-ink hover:bg-card-2"
          >
            {t.predictor.close}
          </button>
        </div>

        <p className="mb-5 text-sm text-ink-2">{ad.rationale}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 text-sm sm:grid-cols-4">
          <Fact label={t.predictor.nearestMatch} value={ad.max_tanimoto.toFixed(2)} mono />
          <Fact
            label={t.predictor.scaffoldSeen}
            value={ad.scaffold_in_training ? t.predictor.yes : t.predictor.no}
          />
          <Fact
            label={`R² (${splitLabel(ad.reference_split, t)})`}
            value={ad.reference_r2.toFixed(3)}
            mono
          />
          <Fact
            label={t.predictor.interval}
            value={`±${prediction.interval_half_width.toFixed(1)}`}
            mono
          />
        </dl>

        {ad.nearest_training_smiles && (
          <p className="mt-4 text-xs text-ink-3">
            {t.predictor.nearestIs}{' '}
            <span className="break-all font-mono text-ink-2">{ad.nearest_training_smiles}</span>
          </p>
        )}

        {pooled.length > 0 && (
          <div className="mt-4 border-l-2 border-ie-40 bg-card-2 px-3 py-2 text-xs text-ink-2">
            {pooled.map((c) => (
              <p key={c.field}>
                <strong className="font-mono">{c.supplied}</strong> {t.predictor.pooledInto}{' '}
                <strong className="font-mono">{c.encoded}</strong>.
              </p>
            ))}
          </div>
        )}

        <p className="mt-5 border-t border-rule pt-4 text-xs text-ink-3">
          {t.predictor.trustFooter}
        </p>
        <p className="mt-2 text-xs text-ink-3">
          {t.predictor.replicateNote.replace('{spread}', String(PERFORMANCE.replicateSpread))}
        </p>
      </div>
    </div>
  )
}

/**
 * Name the imputed conditions the way the form does.
 *
 * The API reports them by feature name, so temperature arrives as both `temperature_K` and
 * `inv_T`, and duration as both `duration_h` and `log10_duration_h` — two columns per
 * quantity. Showing that to a reader would imply four missing measurements where there were
 * two, so the pairs are collapsed onto the quantity the user actually left blank.
 */
function describeImputed(names: string[], t: Translations): string[] {
  const label: Record<string, string> = {
    temperature_K: t.predictor.temperature,
    inv_T: t.predictor.temperature,
    duration_h: t.predictor.duration,
    log10_duration_h: t.predictor.duration,
    log10_conc_mM: t.predictor.concentration,
    pH: t.predictor.ph,
    log10_salt_M: t.predictor.salt,
  }
  const seen = new Set<string>()
  for (const name of names) {
    seen.add(label[name] ?? name.replace(/_/g, ' '))
  }
  return [...seen].map((name) => name.toLowerCase())
}

/**
 * The split key as a reader-facing phrase.
 *
 * The raw keys are `grouped_molecule` and `scaffold`; the first is long enough to overflow
 * its column in the fact grid, and neither means anything to someone who has not read the
 * methodology.
 */
function splitLabel(split: string, t: Translations): string {
  if (split === 'grouped_molecule') return t.charts.groupedSplit.toLowerCase()
  if (split === 'scaffold') return t.charts.scaffoldSplit.toLowerCase()
  return split.replace(/_/g, ' ')
}

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="patch-label mb-1 text-ink-3">{label}</dt>
      <dd className={`${mono ? 'font-mono tabular' : ''} text-ink`}>{value}</dd>
    </div>
  )
}
