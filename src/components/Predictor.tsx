import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, api, type Explanation, type Prediction, type ValidationResult } from '@/lib/api'
import { EXAMPLES, METALS, type MetalValue } from '@/lib/constants'
import { DOMAIN_COLOR } from '@/lib/ramp'
import { useT } from '@/i18n'
import type { Translations } from '@/i18n/config'
import { ComparatorScale, ReferenceStrip } from '@/components/ComparatorScale'
import { ContributionChart } from '@/components/Charts'

type ConditionKey = 'temperature_k' | 'duration_h' | 'concentration_mm'

interface FormState {
  smiles: string
  metal: MetalValue
  temperature_k: string
  duration_h: string
  concentration_mm: string
  recorded: Record<ConditionKey, boolean>
}

const INITIAL: FormState = {
  smiles: EXAMPLES[0].smiles,
  metal: EXAMPLES[0].metal,
  temperature_k: String(EXAMPLES[0].temperature_k),
  duration_h: String(EXAMPLES[0].duration_h),
  concentration_mm: String(EXAMPLES[0].concentration_mm),
  recorded: { temperature_k: true, duration_h: true, concentration_mm: true },
}

const CONDITION_META: { key: ConditionKey; unit: string; step: string; min: number; max: number }[] = [
  { key: 'temperature_k', unit: 'K', step: '0.05', min: 200, max: 800 },
  { key: 'duration_h', unit: 'h', step: '0.5', min: 0, max: 10000 },
  { key: 'concentration_mm', unit: 'mM', step: 'any', min: 0, max: 100000 },
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
}

export function Predictor() {
  const t = useT()
  const [form, setForm] = useState<FormState>(INITIAL)
  const [validation, setValidation] = useState<ValidationResult | null>(null)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const [explanation, setExplanation] = useState<Explanation | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const toPayload = useCallback(
    () => ({
      smiles: form.smiles.trim(),
      metal: form.metal,
      temperature_k: form.recorded.temperature_k ? Number(form.temperature_k) : null,
      duration_h: form.recorded.duration_h ? Number(form.duration_h) : null,
      concentration_mm: form.recorded.concentration_mm ? Number(form.concentration_mm) : null,
    }),
    [form],
  )

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
      temperature_k: String(example.temperature_k),
      duration_h: String(example.duration_h),
      concentration_mm: String(example.concentration_mm),
      recorded: { temperature_k: true, duration_h: true, concentration_mm: true },
    })
    setPrediction(null)
    setExplanation(null)
    setError(null)
  }

  const smilesInvalid = validation !== null && !validation.valid

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      {/* ---------------------------------------------------------------- */}
      {/* Inputs                                                            */}
      {/* ---------------------------------------------------------------- */}
      <form onSubmit={submit} className="panel registered p-6 sm:p-7">
        <div className="mb-6 flex items-baseline justify-between border-b border-ink pb-3">
          <h3 className="font-display text-lg font-700">{t.predictor.formTitle}</h3>
          <span className="patch-label text-ink-3">{t.predictor.inputCount}</span>
        </div>

        {/* Molecule */}
        <div className="mb-6">
          <label htmlFor="smiles" className="patch-label mb-2 block text-ink-2">
            {t.predictor.smilesLabel}
          </label>
          <textarea
            id="smiles"
            value={form.smiles}
            onChange={(e) => setForm({ ...form, smiles: e.target.value })}
            rows={2}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-invalid={smilesInvalid}
            aria-describedby="smiles-feedback"
            className={`w-full resize-y border bg-card px-3 py-2.5 font-mono text-sm text-ink outline-none ${
              smilesInvalid ? 'border-ie-00' : 'border-rule focus:border-ink'
            }`}
          />
          <div id="smiles-feedback" className="mt-2 min-h-[2.5rem] text-xs" aria-live="polite">
            {validation?.valid && (
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-ink-2">
                <span className="font-mono">{validation.formula}</span>
                <span className="font-mono tabular">
                  {validation.molecular_weight?.toFixed(1)} {t.predictor.gramsPerMol}
                </span>
                <span className="font-mono tabular">
                  {validation.heavy_atoms} {t.predictor.heavyAtoms}
                </span>
                {validation.in_training_corpus && (
                  <span className="text-ie-100">{t.predictor.inCorpus}</span>
                )}
              </div>
            )}
            {smilesInvalid && <p className="text-ie-00">{validation?.error}</p>}
          </div>

          <div className="mt-1 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.name}
                type="button"
                onClick={() => loadExample(ex)}
                title={ex.note}
                className="patch-label border border-rule px-2.5 py-1.5 text-ink-2 transition-colors hover:border-ink hover:bg-card-2"
              >
                {ex.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-3">
            {t.predictor.examplesHint}
          </p>
        </div>

        {/* Metal */}
        <fieldset className="mb-6">
          <legend className="patch-label mb-2 text-ink-2">{t.predictor.metalLabel}</legend>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
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
                      {label} <span className="font-mono text-xs text-ink-3">({c.unit})</span>
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
                </div>
              )
            })}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending || smilesInvalid || !form.smiles.trim()}
          className="w-full bg-ink py-3.5 font-display text-sm font-700 uppercase tracking-[0.08em] text-card transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {pending ? t.predictor.submitPending : t.predictor.submit}
        </button>

        <p className="mt-3 text-center text-xs text-ink-3">{t.predictor.phNote}</p>
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

function Reading({
  prediction,
  explanation,
}: {
  prediction: Prediction
  explanation: Explanation | null
}) {
  const t = useT()
  const ad = prediction.applicability_domain
  const color = DOMAIN_COLOR[ad.verdict]

  return (
    <div className="animate-settle space-y-6">
      <div className="panel registered p-6 sm:p-7">
        <div className="mb-5 flex items-baseline justify-between border-b border-ink pb-3">
          <h3 className="font-display text-lg font-700">{t.predictor.readingTitle}</h3>
          <span className="patch-label font-mono text-ink-3">
            {t.predictor.modelVersion} v{prediction.model_version}
          </span>
        </div>

        <div className="mb-5 flex items-end gap-4">
          <div>
            <div className="patch-label mb-1 text-ink-3">{t.predictor.efficiencyLabel}</div>
            <div className="font-mono text-6xl font-600 leading-none tabular">
              {prediction.inhibition_efficiency.toFixed(1)}
              <span className="ml-1 text-3xl text-ink-3">%</span>
            </div>
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
          <Fact label={t.predictor.substrate} value={t.metals[prediction.metal as keyof typeof t.metals] ?? prediction.metal} />
        </dl>

        {prediction.imputed_conditions.length > 0 && (
          <p className="mt-4 border-l-2 border-ie-40 bg-card-2 px-3 py-2 text-xs text-ink-2">
            <strong>
              {prediction.imputed_conditions.length}{' '}
              {prediction.imputed_conditions.length > 1
                ? t.predictor.imputedMany
                : t.predictor.imputedOne}
            </strong>{' '}
            ({prediction.imputed_conditions.map((c) => c.replace(/_/g, ' ')).join(', ')}).{' '}
            {t.predictor.imputedBody}
          </p>
        )}
      </div>

      {/* Applicability domain — the honesty machinery, given its own panel. */}
      <div className="panel p-6 sm:p-7" style={{ borderColor: color }}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="patch-label px-2.5 py-1.5 text-card"
            style={{ backgroundColor: color }}
          >
            {t.domain[ad.verdict]}
          </span>
          <h3 className="font-display text-base font-700">{t.predictor.trustTitle}</h3>
        </div>

        <p className="mb-5 text-sm text-ink-2">{ad.rationale}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 text-sm sm:grid-cols-4">
          <Fact label={t.predictor.nearestMatch} value={ad.max_tanimoto.toFixed(2)} mono />
          <Fact
            label={t.predictor.scaffoldSeen}
            value={ad.scaffold_in_training ? t.predictor.yes : t.predictor.no}
          />
          <Fact
            label={`R² (${ad.reference_split})`}
            value={ad.reference_r2.toFixed(3)}
            mono
          />
          <Fact
            label={t.predictor.interval}
            value={`±${prediction.interval_half_width.toFixed(1)}`}
            mono
          />
        </dl>

        <p className="mt-4 text-xs text-ink-3">{t.predictor.trustFooter}</p>
      </div>

      {explanation && explanation.contributions.length > 0 && (
        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-base font-700">{t.predictor.shapTitle}</h3>
          <p className="mb-5 text-sm text-ink-2">{t.predictor.shapLead}</p>
          <ContributionChart explanation={explanation} />
        </div>
      )}
    </div>
  )
}

function Fact({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="patch-label mb-1 text-ink-3">{label}</dt>
      <dd className={`${mono ? 'font-mono tabular' : 'capitalize'} text-ink`}>{value}</dd>
    </div>
  )
}
