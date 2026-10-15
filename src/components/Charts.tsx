import { useId, useState } from 'react'

import { CATEGORICAL, DIVERGING, FAMILY_COLOR, FAMILY_LABEL, MODEL_LABEL, REP_LABEL } from '@/lib/charts'
import type { Explanation, ModelInfo } from '@/lib/api'
import { useT } from '@/i18n'

/* -------------------------------------------------------------------------- */
/* Ablation — the project's central quantitative result                        */
/* -------------------------------------------------------------------------- */

interface AblationProps {
  ablation: ModelInfo['ablation']
}

/**
 * The cumulative ablation: what each block of features actually bought.
 *
 * Both honest splits are shown together, because the gap between them *is* the finding. The
 * row-wise control split is not an option here — it is stripped from the served artefact.
 *
 * One axis (R²), one bar per step, direct-labelled. The marginal column is the change on
 * adding that block, which is the number the thesis argues from.
 */
export function AblationChart({ ablation }: AblationProps) {
  const t = useT()
  const [split, setSplit] = useState<'grouped_molecule' | 'scaffold'>('grouped_molecule')

  const steps = ablation.filter((row) => row.split === split)
  if (steps.length === 0) return null

  const pct = (value: number) => `${Math.max(0, Math.min(1, value)) * 100}%`

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <SplitToggle value={split} onChange={setSplit} />
        <span className="text-xs text-ink-3">
          {split === 'grouped_molecule' ? t.charts.groupedSub : t.charts.scaffoldSub}
        </span>
      </div>

      <div className="space-y-2">
        {steps.map((step, index) => {
          const previous = index === 0 ? null : steps[index - 1]
          const marginal = previous === null ? null : step.r2 - previous.r2
          return (
            <div key={step.step} className="flex items-center gap-3">
              <span className="w-[8.5rem] shrink-0 text-xs text-ink-2">{step.step}</span>
              <span className="w-12 shrink-0 text-right font-mono text-[11px] text-ink-3 tabular">
                {step.n_features.toLocaleString()}
              </span>
              <div className="relative h-6 flex-1 bg-card-2">
                <div
                  className="h-full"
                  style={{ width: pct(step.r2), backgroundColor: CATEGORICAL[0] }}
                />
              </div>
              <span className="w-14 shrink-0 text-right font-mono text-sm font-500 tabular">
                {step.r2.toFixed(3)}
              </span>
              <span
                className={`w-14 shrink-0 text-right font-mono text-xs tabular ${
                  marginal === null
                    ? 'text-ink-3'
                    : marginal >= 0
                      ? 'text-ink-2'
                      : 'text-ie-00'
                }`}
              >
                {marginal === null ? '—' : `${marginal >= 0 ? '+' : ''}${marginal.toFixed(3)}`}
              </span>
            </div>
          )
        })}
      </div>

      <div className="mt-3 flex items-center gap-3 border-t border-rule pt-2 text-[11px] text-ink-3">
        <span className="w-[8.5rem] shrink-0">{t.charts.colStep}</span>
        <span className="w-12 shrink-0 text-right">{t.charts.colFeatures}</span>
        <span className="flex-1" />
        <span className="w-14 shrink-0 text-right">R²</span>
        <span className="w-14 shrink-0 text-right">{t.charts.colMarginal}</span>
      </div>

      <p className="mt-4 font-mono text-xs text-ink-3 tabular">{t.charts.r2Note}</p>
    </div>
  )
}

/** Shared control: the only two evaluation schemes this service will quote. */
function SplitToggle({
  value,
  onChange,
}: {
  value: 'grouped_molecule' | 'scaffold'
  onChange: (next: 'grouped_molecule' | 'scaffold') => void
}) {
  const t = useT()
  return (
    <div className="inline-flex border border-rule" role="group" aria-label={t.charts.splitGroup}>
      {(
        [
          ['grouped_molecule', t.charts.groupedSplit],
          ['scaffold', t.charts.scaffoldSplit],
        ] as const
      ).map(([key, label]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          aria-pressed={value === key}
          className={`patch-label px-3.5 py-2 transition-colors ${
            value === key ? 'bg-ink text-card' : 'bg-card text-ink-2 hover:bg-card-2'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-ink-2">
      <span className="h-3 w-3 shrink-0" style={{ backgroundColor: swatch }} aria-hidden />
      {label}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/* Model leaderboard                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Every model in the benchmark, under whichever honest scheme is selected.
 *
 * The service serves only these two. Fourteen configurations were trained; the point of the
 * table is that they cluster — no architecture escapes the ceiling the data imposes.
 */
export function Leaderboard({ leaderboard }: { leaderboard: ModelInfo['leaderboard'] }) {
  const t = useT()
  const [split, setSplit] = useState<'grouped_molecule' | 'scaffold'>('grouped_molecule')

  const filtered = [...(leaderboard[split] ?? [])].sort((a, b) => b.r2 - a.r2)
  const families = [...new Set(filtered.map((r) => r.family))]

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <SplitToggle value={split} onChange={setSplit} />

        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {families.map((f) => (
            <Legend key={f} swatch={FAMILY_COLOR[f] ?? '#4a514c'} label={FAMILY_LABEL[f] ?? f} />
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-2">
        {split === 'scaffold' ? t.charts.scaffoldExplain : t.charts.groupedExplain}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <caption className="sr-only">
            {t.charts.tableCaption}
          </caption>
          <thead>
            <tr className="border-b border-ink text-left">
              <th scope="col" className="patch-label py-2 pr-3 text-ink-3">{t.charts.colModel}</th>
              <th scope="col" className="patch-label py-2 pr-3 text-ink-3">{t.charts.colRepresentation}</th>
              <th scope="col" className="patch-label py-2 pr-3 text-right text-ink-3">R²</th>
              <th scope="col" className="patch-label w-[34%] py-2 text-ink-3">&nbsp;</th>
              <th scope="col" className="patch-label py-2 pl-3 text-right text-ink-3">{t.charts.colMae}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => {
              const color = FAMILY_COLOR[r.family] ?? '#4a514c'
              const width = `${Math.max(0, Math.min(1, r.r2)) * 100}%`
              return (
                <tr
                  key={`${r.model}-${r.representation}-${i}`}
                  className="border-b border-rule last:border-0"
                >
                  <td className="py-2.5 pr-3">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 shrink-0"
                        style={{ backgroundColor: color }}
                        aria-hidden
                      />
                      {MODEL_LABEL[r.model] ?? r.model}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-ink-2">
                    {REP_LABEL[r.representation] ?? r.representation}
                  </td>
                  <td className="py-2.5 pr-3 text-right font-mono font-500 tabular">
                    {r.r2.toFixed(3)}
                  </td>
                  <td className="py-2.5">
                    <div className="relative h-3.5 w-full bg-card-2">
                      {r.r2 > 0 && (
                        <div className="h-full" style={{ width, backgroundColor: color }} />
                      )}
                      {r.r2 <= 0 && (
                        <span className="absolute inset-y-0 left-1 flex items-center font-mono text-[10px] text-ink-3">
                          {t.charts.negative}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2.5 pl-3 text-right font-mono text-ink-2 tabular">
                    {r.mae.toFixed(1)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-ink-3">{t.charts.ridgeNote}</p>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* SHAP contributions — diverging                                              */
/* -------------------------------------------------------------------------- */

export function ContributionChart({ explanation }: { explanation: Explanation }) {
  const t = useT()
  const id = useId()
  const items = explanation.contributions.slice(0, 8)
  const max = Math.max(...items.map((c) => Math.abs(c.contribution)), 0.001)

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Legend swatch={DIVERGING.positive} label={t.charts.raises} />
        <Legend swatch={DIVERGING.negative} label={t.charts.lowers} />
      </div>

      <ul className="space-y-2.5">
        {items.map((c) => {
          const positive = c.contribution >= 0
          const width = (Math.abs(c.contribution) / max) * 50
          return (
            <li key={`${id}-${c.feature}`} className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="truncate text-xs text-ink-2" title={c.feature}>
                    {c.label}
                    {c.kind === 'condition' && (
                      <span className="patch-label ml-2 text-ink-3">{t.charts.condition}</span>
                    )}
                  </span>
                </div>
                {/* Diverging axis: neutral grey at zero, one pole each side. */}
                <div className="relative h-4 w-full bg-card-2">
                  <div
                    className="absolute inset-y-0 w-px"
                    style={{ left: '50%', backgroundColor: DIVERGING.zero }}
                    aria-hidden
                  />
                  <div
                    className="absolute inset-y-0"
                    style={{
                      backgroundColor: positive ? DIVERGING.positive : DIVERGING.negative,
                      left: positive ? '50%' : `${50 - width}%`,
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
              <span className="w-14 text-right font-mono text-sm font-500 tabular">
                {c.contribution > 0 ? '+' : ''}
                {c.contribution.toFixed(1)}
              </span>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 border-t border-rule pt-3 text-xs text-ink-3">{explanation.note}</p>
    </div>
  )
}
