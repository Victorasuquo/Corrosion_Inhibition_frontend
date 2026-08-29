import { RAMP, efficiencyLabel, rampColor } from '@/lib/ramp'

/**
 * The bare reference scale, with no reading on it.
 *
 * Used before a prediction exists. Showing a placeholder value here would put a
 * number on screen that no model produced, which is exactly the kind of thing this
 * product exists not to do.
 */
export function ReferenceStrip() {
  return (
    <figure className="w-full">
      <div className="flex h-11 w-full border border-rule" role="img" aria-label="The inhibition efficiency reference scale, from 0 to 100 percent.">
        {RAMP.map((stop, i) => (
          <div
            key={stop.stop}
            className="h-full flex-1"
            style={{
              backgroundColor: stop.hex,
              marginRight: i < RAMP.length - 1 ? 2 : 0,
            }}
          />
        ))}
      </div>
      <div className="relative mt-1.5 h-4" aria-hidden>
        {[0, 50, 100].map((tick) => (
          <span
            key={tick}
            className="patch-label absolute font-mono text-ink-3 tabular"
            style={{
              left: `${tick}%`,
              transform:
                tick === 0 ? 'none' : tick === 100 ? 'translateX(-100%)' : 'translateX(-50%)',
            }}
          >
            {tick}%
          </span>
        ))}
      </div>
    </figure>
  )
}

interface Props {
  /** Predicted inhibition efficiency, 0–100. */
  value: number
  /** Conformal interval bounds. Drawn as the width of the readable band. */
  low: number
  high: number
  /** Nominal coverage, e.g. 0.9. */
  coverage: number
  compact?: boolean
}

/**
 * The comparator scale — the product's primary reading device.
 *
 * A printed colour comparator is read by matching a sample against reference patches,
 * and crucially it is read as a *band between patches*, never as a point. So the
 * conformal interval is drawn as the literal width of the band, and the point estimate
 * is only a tick within it. Uncertainty is part of the instrument rather than a caveat
 * printed underneath it.
 */
export function ComparatorScale({ value, low, high, coverage, compact = false }: Props) {
  const clamp = (n: number) => Math.min(100, Math.max(0, n))
  const v = clamp(value)
  const lo = clamp(low)
  const hi = clamp(high)

  const height = compact ? 44 : 76

  return (
    <figure className="w-full">
      {/* Reference patches. These are the legend: the mapping is shown, not described. */}
      <div
        className="relative w-full overflow-hidden border border-rule"
        style={{ height }}
        role="img"
        aria-label={`Predicted inhibition efficiency ${v.toFixed(1)} percent, ${Math.round(
          coverage * 100,
        )} percent interval from ${lo.toFixed(1)} to ${hi.toFixed(1)} percent. ${efficiencyLabel(v)}.`}
      >
        <div className="absolute inset-0 flex">
          {RAMP.map((stop, i) => (
            <div
              key={stop.stop}
              className="h-full flex-1"
              style={{
                backgroundColor: stop.hex,
                // A 2px surface gap between fills, per the mark spec.
                marginRight: i < RAMP.length - 1 ? 2 : 0,
              }}
            />
          ))}
        </div>

        {/* The readable band: everything outside it is dimmed away, the way a
            comparator window masks all but the patch you are matching against. */}
        <div
          className="absolute inset-y-0 left-0 bg-card/55"
          style={{ width: `${lo}%` }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 bg-card/55"
          style={{ width: `${100 - hi}%` }}
          aria-hidden
        />

        {/* Band edges */}
        <div
          className="absolute inset-y-0 border-x-2 border-ink"
          style={{ left: `${lo}%`, width: `${Math.max(hi - lo, 0.5)}%` }}
          aria-hidden
        />

        {/* The point estimate — a tick inside the band, never the whole story. */}
        <div
          className="absolute inset-y-0 w-[3px] bg-ink"
          style={{ left: `calc(${v}% - 1.5px)` }}
          aria-hidden
        />
      </div>

      {/* Scale ticks */}
      <div className="relative mt-1.5 h-4" aria-hidden>
        {[0, 20, 40, 60, 80, 100].map((tick) => (
          <span
            key={tick}
            className="patch-label absolute font-mono text-ink-3 tabular"
            style={{
              left: `${tick}%`,
              transform:
                tick === 0 ? 'none' : tick === 100 ? 'translateX(-100%)' : 'translateX(-50%)',
            }}
          >
            {tick}
          </span>
        ))}
      </div>

      {!compact && (
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <span className="text-sm text-ink-2">
            <span
              className="mr-2 inline-block h-2.5 w-2.5 align-middle"
              style={{ backgroundColor: rampColor(v) }}
              aria-hidden
            />
            {efficiencyLabel(v)}
          </span>
          <span className="font-mono text-xs text-ink-3 tabular">
            {Math.round(coverage * 100)}% interval · {lo.toFixed(1)}–{hi.toFixed(1)}% IE
          </span>
        </figcaption>
      )}
    </figure>
  )
}
