/**
 * Chart primitives for the administrative surface.
 *
 * Drawn the way src/components/Charts.tsx draws the research charts: a track in
 * `bg-card-2` with a fill whose width is set inline. No SVG, no chart library. That
 * keeps the whole interface on one visual system, and it means a bar here is made of
 * the same parts as a bar on the results page rather than being a different kind of
 * object that happens to look similar.
 *
 * Every chart here states its denominator. A verdict mix over seven predictions and one
 * over seven thousand are identical as proportions and completely different as
 * evidence, and a dashboard that hides the difference invites a conclusion the data
 * cannot support.
 */

import { rampColor } from '@/lib/ramp'
import { CATEGORICAL } from '@/lib/charts'
import type { DayCount, Slice } from '@/lib/admin'

const pct = (value: number) => `${Math.max(0, Math.min(1, value)) * 100}%`

export function ChartFrame({
  title,
  denominator,
  children,
}: {
  title: string
  denominator: string
  children: React.ReactNode
}) {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-display text-base font-700">{title}</h3>
        <span className="font-mono text-[11px] text-ink-3">{denominator}</span>
      </div>
      {children}
    </div>
  )
}

export function Empty({ note }: { note: string }) {
  return (
    <p className="border border-dashed border-rule px-4 py-10 text-center text-sm text-ink-3">
      {note}
    </p>
  )
}

/* -------------------------------------------------------------------------- */
/* Counts over time                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Daily counts as a column chart.
 *
 * Days with nothing in them are kept rather than skipped: a gap is information, and a
 * chart that silently closes it turns four scattered predictions into a run of four
 * busy days.
 */
export function TimeSeriesBars({ data, colour = CATEGORICAL[0] }: { data: DayCount[]; colour?: string }) {
  if (data.length === 0) return <Empty note="Nothing recorded yet." />
  const peak = Math.max(...data.map((d) => d.count), 1)

  return (
    <div>
      <div className="flex h-36 items-end gap-[3px]">
        {data.map((d) => (
          <div key={d.day} className="group relative flex-1" title={`${d.day}: ${d.count}`}>
            <div className="flex h-36 items-end">
              <div
                className="w-full"
                style={{
                  height: pct(d.count / peak),
                  minHeight: d.count > 0 ? '2px' : '0',
                  backgroundColor: colour,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between border-t border-rule pt-2 font-mono text-[11px] text-ink-3">
        <span>{data[0]?.day}</span>
        <span>peak {peak}</span>
        <span>{data[data.length - 1]?.day}</span>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Composition                                                                */
/* -------------------------------------------------------------------------- */

/** A single stacked bar, with the counts named beneath it rather than only the shares. */
export function StackedShare({ slices }: { slices: Slice[] }) {
  const total = slices.reduce((sum, s) => sum + s.count, 0)
  if (total === 0) return <Empty note="Nothing recorded yet." />

  return (
    <div>
      <div className="flex h-7 w-full overflow-hidden">
        {slices
          .filter((s) => s.count > 0)
          .map((s) => (
            <div
              key={s.label}
              style={{ width: pct(s.count / total), backgroundColor: s.colour }}
              title={`${s.label}: ${s.count}`}
            />
          ))}
      </div>
      <ul className="mt-4 space-y-1.5">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm">
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: s.colour }}
            />
            <span className="flex-1 text-ink-2">{s.label}</span>
            <span className="font-mono tabular text-ink">{s.count}</span>
            <span className="w-12 text-right font-mono text-xs tabular text-ink-3">
              {total === 0 ? '—' : `${Math.round((s.count / total) * 100)}%`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Ranked categories                                                          */
/* -------------------------------------------------------------------------- */

export function RankedBars({
  rows,
  colour = CATEGORICAL[1],
  max: explicitMax,
}: {
  rows: { label: string; count: number }[]
  colour?: string
  max?: number
}) {
  if (rows.length === 0) return <Empty note="Nothing recorded yet." />
  const peak = explicitMax ?? Math.max(...rows.map((r) => r.count), 1)

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="w-[9rem] shrink-0 truncate text-xs text-ink-2" title={row.label}>
            {row.label}
          </span>
          <div className="relative h-5 flex-1 bg-card-2">
            <div
              className="h-full"
              style={{ width: pct(row.count / peak), backgroundColor: colour }}
            />
          </div>
          <span className="w-12 shrink-0 text-right font-mono text-xs tabular">{row.count}</span>
        </div>
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Efficiency distribution                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Predictions binned across the 0–100 efficiency range.
 *
 * Each bar is tinted with `rampColor`, so the distribution carries the same meaning the
 * comparator card does: rust at the unprotected end, passivation green at the
 * protected one. The bins are fixed to the full range rather than fitted to the data,
 * because a histogram that rescales to its contents makes three clustered readings look
 * like a broad spread.
 */
export function EfficiencyHistogram({ values, bins = 10 }: { values: number[]; bins?: number }) {
  if (values.length === 0) return <Empty note="No predictions yet." />

  const counts = new Array(bins).fill(0) as number[]
  for (const value of values) {
    const clamped = Math.max(0, Math.min(100, value))
    const index = Math.min(bins - 1, Math.floor((clamped / 100) * bins))
    counts[index] += 1
  }
  const peak = Math.max(...counts, 1)

  return (
    <div>
      <div className="flex h-32 items-end gap-1">
        {counts.map((count, index) => {
          const midpoint = ((index + 0.5) / bins) * 100
          return (
            <div
              key={index}
              className="flex h-32 flex-1 items-end"
              title={`${Math.round((index / bins) * 100)}–${Math.round(
                ((index + 1) / bins) * 100,
              )}%: ${count}`}
            >
              <div
                className="w-full"
                style={{
                  height: pct(count / peak),
                  minHeight: count > 0 ? '2px' : '0',
                  backgroundColor: rampColor(midpoint),
                }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex justify-between border-t border-rule pt-2 font-mono text-[11px] text-ink-3">
        <span>0%</span>
        <span>inhibition efficiency</span>
        <span>100%</span>
      </div>
    </div>
  )
}
