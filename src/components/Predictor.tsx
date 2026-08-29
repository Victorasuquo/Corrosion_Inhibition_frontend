import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiError, api, type Explanation, type Prediction, type ValidationResult } from '@/lib/api'
import { EXAMPLES, METALS, type MetalValue } from '@/lib/constants'
import { DOMAIN_STYLE } from '@/lib/ramp'
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

const CONDITIONS: {
  key: ConditionKey
  label: string
  unit: string
  hint: string
  step: string
  min: number
  max: number
}[] = [
  {
    key: 'temperature_k',
    label: 'Temperature',
    unit: 'K',
    hint: '283–606 K in training. 298 K is room temperature.',
    step: '0.05',
    min: 200,
    max: 800,
  },
  {
    key: 'duration_h',
    label: 'Exposure duration',
    unit: 'h',
    hint: 'Recorded for only 54% of the corpus.',
    step: '0.5',
    min: 0,
    max: 10000,
  },
  {
    key: 'concentration_mm',
    label: 'Inhibitor concentration',
    unit: 'mM',
    hint: 'Spans 3×10⁻⁵ to 3280 mM; the model sees log₁₀.',
    step: 'any',
    min: 0,
    max: 100000,
  },
]

export function Predictor() {
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
      setError(err instanceof ApiError ? err.message : 'Something went wrong.')
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
          <h3 className="font-display text-lg font-700">Specimen &amp; conditions</h3>
          <span className="patch-label text-ink-3">5 inputs</span>
        </div>

        {/* Molecule */}
        <div className="mb-6">
          <label htmlFor="smiles" className="patch-label mb-2 block text-ink-2">
            Molecule (SMILES)
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
                  {validation.molecular_weight?.toFixed(1)} g/mol
                </span>
                <span className="font-mono tabular">{validation.heavy_atoms} heavy atoms</span>
                {validation.in_training_corpus && (
                  <span className="text-ie-100">In the training corpus</span>
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
            No SMILES to hand? Load a real inhibitor above — these fill the same five inputs.
          </p>
        </div>

        {/* Metal */}
        <fieldset className="mb-6">
          <legend className="patch-label mb-2 text-ink-2">Substrate metal</legend>
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
                <span className="text-sm font-500">{m.label}</span>
                <span
                  className={`font-mono text-[11px] tabular ${
                    form.metal === m.value ? 'text-card/70' : 'text-ink-3'
                  }`}
                >
                  {m.rows.toLocaleString()} rows
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Conditions */}
        <fieldset className="mb-7">
          <legend className="patch-label mb-1 text-ink-2">Experimental conditions</legend>
          <p className="mb-3 text-xs text-ink-3">
            Untick anything you did not measure. The model was trained with missing-value
            indicators, so “not recorded” is an answer it understands — not a guess.
          </p>

          <div className="space-y-3">
            {CONDITIONS.map((c) => {
              const on = form.recorded[c.key]
              return (
                <div key={c.key}>
                  <div className="flex items-center justify-between gap-3">
                    <label htmlFor={c.key} className="text-sm text-ink-2">
                      {c.label}{' '}
                      <span className="font-mono text-xs text-ink-3">({c.unit})</span>
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
                      recorded
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
                    placeholder={on ? undefined : 'not recorded'}
                  />
                  <p className="mt-1 text-[11px] text-ink-3">{c.hint}</p>
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
          {pending ? 'Reading…' : 'Predict inhibition efficiency'}
        </button>

        <p className="mt-3 text-center text-xs text-ink-3">
          pH is not an input. It is carried through the research pipeline for analysis only and
          was never a model feature.
        </p>
      </form>

      {/* ---------------------------------------------------------------- */}
      {/* Reading                                                           */}
      {/* ---------------------------------------------------------------- */}
      <div ref={resultRef} className="space-y-6">
        {error && (
          <div className="panel border-ie-00 p-6" role="alert">
            <h3 className="patch-label mb-2 text-ie-00">Cannot read</h3>
            <p className="text-sm text-ink-2">{error}</p>
          </div>
        )}

        {!prediction && !error && (
          <div className="panel registered flex min-h-[22rem] flex-col justify-center p-8 text-center">
            <ReferenceStrip />
            <h3 className="mt-6 font-display text-lg font-700">The reading appears here</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">
              A prediction is read as a <strong>band</strong>, not a point — the way you read a
              colour against a comparator card. The band’s width is the model’s calibrated
              uncertainty.
            </p>
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
  const ad = prediction.applicability_domain
  const style = DOMAIN_STYLE[ad.verdict]

  return (
    <div className="animate-settle space-y-6">
      <div className="panel registered p-6 sm:p-7">
        <div className="mb-5 flex items-baseline justify-between border-b border-ink pb-3">
          <h3 className="font-display text-lg font-700">Reading</h3>
          <span className="patch-label font-mono text-ink-3">
            model v{prediction.model_version}
          </span>
        </div>

        <div className="mb-5 flex items-end gap-4">
          <div>
            <div className="patch-label mb-1 text-ink-3">Inhibition efficiency</div>
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
          <Fact label="Formula" value={prediction.formula} mono />
          <Fact label="Mass" value={`${prediction.molecular_weight.toFixed(1)} g/mol`} mono />
          <Fact label="Substrate" value={prediction.metal.replace('_', ' ')} />
        </dl>

        {prediction.imputed_conditions.length > 0 && (
          <p className="mt-4 border-l-2 border-ie-40 bg-card-2 px-3 py-2 text-xs text-ink-2">
            <strong>
              {prediction.imputed_conditions.length} condition
              {prediction.imputed_conditions.length > 1 ? 's were' : ' was'} not recorded
            </strong>{' '}
            ({prediction.imputed_conditions.map((c) => c.replace(/_/g, ' ')).join(', ')}). The
            model used the training median and was told the value was missing — the same
            treatment those rows received during training.
          </p>
        )}
      </div>

      {/* Applicability domain — the honesty machinery, given its own panel. */}
      <div className="panel p-6 sm:p-7" style={{ borderColor: style.hex }}>
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className="patch-label px-2.5 py-1.5 text-card"
            style={{ backgroundColor: style.hex }}
          >
            {style.label}
          </span>
          <h3 className="font-display text-base font-700">How far can you trust this?</h3>
        </div>

        <p className="mb-5 text-sm text-ink-2">{ad.rationale}</p>

        <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-rule pt-4 text-sm sm:grid-cols-4">
          <Fact label="Nearest match" value={ad.max_tanimoto.toFixed(2)} mono />
          <Fact label="Scaffold seen" value={ad.scaffold_in_training ? 'Yes' : 'No'} />
          <Fact
            label={`R² (${ad.reference_split})`}
            value={ad.reference_r2.toFixed(3)}
            mono
          />
          <Fact
            label="Interval"
            value={`±${prediction.interval_half_width.toFixed(1)}`}
            mono
          />
        </dl>

        <p className="mt-4 text-xs text-ink-3">
          The quoted R² is the one this request is entitled to. Familiar chemistry is measured by
          the random split; anything else is measured by the stricter scaffold split.
        </p>
      </div>

      {explanation && explanation.contributions.length > 0 && (
        <div className="panel p-6 sm:p-7">
          <h3 className="mb-1 font-display text-base font-700">What drove this number</h3>
          <p className="mb-5 text-sm text-ink-2">
            Exact Shapley values over the model’s own features, in efficiency points.
          </p>
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
