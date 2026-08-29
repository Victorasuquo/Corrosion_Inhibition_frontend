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
 * Grouped bars: the same random forest, with and without experimental conditions,
 * under both evaluation splits.
 *
 * Two series, direct-labelled and legended. One axis (R²), never two.
 */
export function AblationChart({ ablation }: AblationProps) {
  const t = useT()
  const groups = [
    {
      split: t.charts.randomSplit,
      sub: t.charts.randomSub,
      without: ablation.descriptors_only.random_split_r2,
      with: ablation.descriptors_plus_conditions.random_split_r2,
    },
    {
      split: t.charts.scaffoldSplit,
      sub: t.charts.scaffoldSub,
      without: ablation.descriptors_only.scaffold_split_r2,
      with: ablation.descriptors_plus_conditions.scaffold_split_r2,
    },
  ]

  const max = 1
  const pct = (v: number) => `${Math.max(0, (v / max) * 100)}%`

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <Legend swatch={CATEGORICAL[1]} label={t.charts.structureOnly} />
        <Legend swatch={CATEGORICAL[0]} label={t.charts.structurePlusConditions} />
      </div>

      <div className="space-y-7">
        {groups.map((g) => (
          <div key={g.split}>
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-4">
              <h4 className="font-display text-sm font-700">{g.split}</h4>
              <span className="text-xs text-ink-3">{g.sub}</span>
            </div>

            <div className="space-y-1.5">
              {(
                [
                  { label: t.charts.structureOnly, value: g.without, color: CATEGORICAL[1] },
                  {
                    label: t.charts.structurePlusShort,
                    value: g.with,
                    color: CATEGORICAL[0],
                  },
                ] as const
              ).map((bar) => (
                <div key={bar.label} className="flex items-center gap-3">
                  <div className="relative h-7 flex-1 bg-card-2">
                    <div
                      className="h-full"
                      style={{ width: pct(bar.value), backgroundColor: bar.color }}
                    />
                  </div>
                  <span className="w-14 shrink-0 text-right font-mono text-sm font-500 tabular">
                    {bar.value.toFixed(3)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-rule pt-3 font-mono text-xs text-ink-3 tabular">
        {t.charts.r2Note}
      </p>
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

type Row = ModelInfo['all_models'][number]

export function Leaderboard({ rows }: { rows: Row[] }) {
  const t = useT()
  const [split, setSplit] = useState<'random' | 'scaffold'>('scaffold')

  const filtered = rows
    .filter((r) =>
      split === 'scaffold'
        ? r.split === 'scaffold'
        : r.split === 'random' || r.split === 'random_fold0',
    )
    .sort((a, b) => b.r2 - a.r2)

  const families = [...new Set(filtered.map((r) => r.family))]

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div
          className="inline-flex border border-rule"
          role="group"
          aria-label={t.charts.splitGroup}
        >
          {(
            [
              ['scaffold', t.charts.scaffoldSplit],
              ['random', t.charts.randomSplit],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSplit(key)}
              aria-pressed={split === key}
              className={`patch-label px-3.5 py-2 transition-colors ${
                split === key
                  ? 'bg-ink text-card'
                  : 'bg-card text-ink-2 hover:bg-card-2'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {families.map((f) => (
            <Legend key={f} swatch={FAMILY_COLOR[f] ?? '#4a514c'} label={FAMILY_LABEL[f] ?? f} />
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-ink-2">
        {split === 'scaffold' ? t.charts.scaffoldExplain : t.charts.randomExplain}
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
                  key={`${r.model}-${r.rep}-${r.split}-${i}`}
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
                  <td className="py-2.5 pr-3 text-ink-2">{REP_LABEL[r.rep] ?? r.rep}</td>
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
