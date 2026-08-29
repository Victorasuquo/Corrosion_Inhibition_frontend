import { useRef, useState } from 'react'

import { ApiError, api, type BatchResult } from '@/lib/api'
import { DOMAIN_COLOR, rampColor } from '@/lib/ramp'
import { useT } from '@/i18n'

const TEMPLATE = `smiles,metal,temperature_k,duration_h,concentration_mm
c1ccc2[nH]nnc2c1,carbon_steel,298.15,6,1.0
NC(N)=S,iron,303.15,24,10
Oc1cccc2cccnc12,aluminium,298.15,24,5
Cn1cnc2c1c(=O)n(C)c(=O)n2C,carbon_steel,303.15,4,2
`

/**
 * Batch screening from a CSV.
 *
 * The industrial workflow is ranking a candidate series under one service condition,
 * so results are sorted by predicted efficiency rather than left in file order.
 */
export function BatchPanel() {
  const t = useT()
  const [result, setResult] = useState<BatchResult | null>(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function upload(file: File) {
    setPending(true)
    setError(null)
    setFileName(file.name)
    try {
      setResult(await api.batchCsv(file))
    } catch (err) {
      setResult(null)
      setError(err instanceof ApiError ? err.message : t.predictor.genericError)
    } finally {
      setPending(false)
    }
  }

  function downloadTemplate() {
    const url = URL.createObjectURL(new Blob([TEMPLATE], { type: 'text/csv' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'inhibiepdt-template.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function downloadResults() {
    if (!result) return
    const header =
      'input_smiles,canonical_smiles,metal,inhibition_efficiency,interval_low,interval_high,applicability_domain,max_tanimoto,error\n'
    const body = result.results
      .map((r) => {
        if (!r.ok || !r.prediction) {
          return `,,,,,,,,"${(r.error ?? 'failed').replace(/"/g, "'")}"`
        }
        const p = r.prediction
        return [
          p.input_smiles,
          p.canonical_smiles,
          p.metal,
          p.inhibition_efficiency,
          p.interval_low,
          p.interval_high,
          p.applicability_domain.verdict,
          p.applicability_domain.max_tanimoto,
          '',
        ].join(',')
      })
      .join('\n')
    const url = URL.createObjectURL(new Blob([header + body], { type: 'text/csv' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'inhibiepdt-results.csv'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const ranked = result
    ? [...result.results].sort((a, b) => {
        if (!a.ok || !a.prediction) return 1
        if (!b.ok || !b.prediction) return -1
        return b.prediction.inhibition_efficiency - a.prediction.inhibition_efficiency
      })
    : []

  return (
    <div className="panel registered p-6 sm:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
        <div>
          <h3 className="font-display text-lg font-700">{t.batch.panelTitle}</h3>
          <p className="mt-1 max-w-md text-sm text-ink-2">{t.batch.panelLead}</p>
        </div>
        <button
          type="button"
          onClick={downloadTemplate}
          className="patch-label border border-rule px-3 py-2 text-ink-2 transition-colors hover:border-ink hover:bg-card-2"
        >
          {t.batch.template}
        </button>
      </div>

      <div className="mt-6">
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          id="batch-file"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) void upload(file)
          }}
        />
        <label
          htmlFor="batch-file"
          className="flex cursor-pointer flex-col items-center border border-dashed border-rule bg-card-2/50 px-6 py-10 text-center transition-colors hover:border-ink hover:bg-card-2"
        >
          <span className="font-display text-sm font-600">
            {pending ? t.batch.reading : t.batch.choose}
          </span>
          <span className="mt-1.5 font-mono text-xs text-ink-3">
            smiles, metal, temperature_k, duration_h, concentration_mm
          </span>
          {fileName && !pending && (
            <span className="mt-2 font-mono text-xs text-ink-2">{fileName}</span>
          )}
        </label>
      </div>

      {error && (
        <p className="mt-4 border-l-2 border-ie-00 px-3 py-2 text-sm text-ink-2" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-ink-2 tabular">
              {result.succeeded} {t.batch.predicted} · {result.failed} {t.batch.failed} ·{' '}
              {result.elapsed_ms.toFixed(0)} ms
            </p>
            {result.succeeded > 0 && (
              <button
                type="button"
                onClick={downloadResults}
                className="patch-label border border-ink bg-ink px-3 py-2 text-card transition-opacity hover:opacity-90"
              >
                {t.batch.download}
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-auto border border-rule">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">{t.batch.tableCaption}</caption>
              <thead className="sticky top-0 bg-card-2">
                <tr className="border-b border-ink text-left">
                  <th scope="col" className="patch-label px-3 py-2 text-ink-3">{t.batch.colMolecule}</th>
                  <th scope="col" className="patch-label px-3 py-2 text-right text-ink-3">IE %</th>
                  <th scope="col" className="patch-label px-3 py-2 text-ink-3">{t.batch.colReading}</th>
                  <th scope="col" className="patch-label px-3 py-2 text-ink-3">{t.batch.colTrust}</th>
                </tr>
              </thead>
              <tbody>
                {ranked.map((row, i) => {
                  if (!row.ok || !row.prediction) {
                    return (
                      <tr key={`err-${i}`} className="border-b border-rule last:border-0">
                        <td className="px-3 py-2 font-mono text-xs text-ink-3">{t.batch.row} {row.index + 1}</td>
                        <td colSpan={3} className="px-3 py-2 text-xs text-ie-00">
                          {row.error}
                        </td>
                      </tr>
                    )
                  }
                  const p = row.prediction
                  const verdict = p.applicability_domain.verdict
                  return (
                    <tr key={`ok-${i}`} className="border-b border-rule last:border-0">
                      <td className="max-w-[12rem] truncate px-3 py-2 font-mono text-xs" title={p.canonical_smiles}>
                        {p.canonical_smiles}
                      </td>
                      <td className="px-3 py-2 text-right font-mono font-500 tabular">
                        {p.inhibition_efficiency.toFixed(1)}
                      </td>
                      <td className="px-3 py-2">
                        {/* Sparkline form of the comparator band. */}
                        <div className="relative h-3 w-full min-w-[5rem] bg-card-2">
                          <div
                            className="absolute inset-y-0 opacity-45"
                            style={{
                              left: `${p.interval_low}%`,
                              width: `${Math.max(p.interval_high - p.interval_low, 1)}%`,
                              backgroundColor: rampColor(p.inhibition_efficiency),
                            }}
                          />
                          <div
                            className="absolute inset-y-0 w-0.5 bg-ink"
                            style={{ left: `${p.inhibition_efficiency}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <span className="flex items-center gap-1.5 text-xs text-ink-2">
                          <span
                            className="h-2 w-2 shrink-0"
                            style={{ backgroundColor: DOMAIN_COLOR[verdict] }}
                            aria-hidden
                          />
                          {verdict === 'in_domain'
                            ? t.domain.inShort
                            : verdict === 'edge_of_domain'
                              ? t.domain.edgeShort
                              : t.domain.outShort}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
