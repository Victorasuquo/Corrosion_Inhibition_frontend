import { useEffect, useState } from 'react'

import { API_BASE_URL, api, type RecentPrediction } from '@/lib/api'
import { DOMAIN_COLOR, rampColor } from '@/lib/ramp'
import type { Translations } from '@/i18n/config'
import { Section } from '@/components/Shell'

/**
 * What the service has actually been asked.
 *
 * Backed by the prediction log — MongoDB Atlas in production, SQLite locally. Only the
 * canonical molecule is shown; the raw input string is never echoed back.
 */
export default function HistoryPage({ t }: { t: Translations }) {
  const [rows, setRows] = useState<RecentPrediction[] | null>(null)
  const [backend, setBackend] = useState<string>('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    api
      .recentPredictions(50)
      .then((res) => {
        setRows(res.items)
        setBackend(res.backend)
      })
      .catch(() => setFailed(true))
  }, [])

  return (
    <Section eyebrow={t.history.eyebrow} title={t.history.title} lead={t.history.lead}>
      {failed && (
        <p className="border border-dashed border-rule px-4 py-8 text-center text-sm text-ink-3">
          {t.results.unavailable} <code className="font-mono">{API_BASE_URL}</code>{' '}
          {t.results.unreachable}
        </p>
      )}

      {!failed && rows === null && (
        <p className="border border-dashed border-rule px-4 py-8 text-center text-sm text-ink-3">
          {t.results.loading}
        </p>
      )}

      {rows !== null && rows.length === 0 && (
        <div className="panel registered px-6 py-14 text-center">
          <h3 className="font-display text-lg font-700">{t.history.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">{t.history.emptyBody}</p>
        </div>
      )}

      {rows !== null && rows.length > 0 && (
        <>
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-sm">
              <caption className="sr-only">{t.history.tableCaption}</caption>
              <thead>
                <tr className="border-b border-ink text-left">
                  <th scope="col" className="patch-label px-4 py-2.5 text-ink-3">
                    {t.history.colWhen}
                  </th>
                  <th scope="col" className="patch-label px-4 py-2.5 text-ink-3">
                    {t.batch.colMolecule}
                  </th>
                  <th scope="col" className="patch-label px-4 py-2.5 text-ink-3">
                    {t.predictor.substrate}
                  </th>
                  <th scope="col" className="patch-label px-4 py-2.5 text-right text-ink-3">
                    IE %
                  </th>
                  <th scope="col" className="patch-label px-4 py-2.5 text-ink-3">
                    {t.batch.colReading}
                  </th>
                  <th scope="col" className="patch-label px-4 py-2.5 text-ink-3">
                    {t.batch.colTrust}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => {
                  const verdict = row.ad_verdict as keyof typeof DOMAIN_COLOR
                  const short =
                    verdict === 'in_domain'
                      ? t.domain.inShort
                      : verdict === 'edge_of_domain'
                        ? t.domain.edgeShort
                        : t.domain.outShort
                  return (
                    <tr key={`${row.created_utc}-${i}`} className="border-b border-rule last:border-0">
                      <td className="whitespace-nowrap px-4 py-2.5 font-mono text-xs text-ink-3" dir="ltr">
                        {row.created_utc.slice(0, 16).replace('T', ' ')}
                      </td>
                      <td
                        className="max-w-[14rem] truncate px-4 py-2.5 font-mono text-xs"
                        title={row.canonical_smiles}
                        dir="ltr"
                      >
                        {row.canonical_smiles}
                      </td>
                      <td className="px-4 py-2.5 text-ink-2">
                        {t.metals[row.metal as keyof typeof t.metals] ?? row.metal}
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono font-500 tabular">
                        {row.inhibition_efficiency.toFixed(1)}
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="relative h-3 w-full min-w-[5rem] bg-card-2">
                          <div
                            className="absolute inset-y-0 opacity-45"
                            style={{
                              left: `${row.interval_low}%`,
                              width: `${Math.max(row.interval_high - row.interval_low, 1)}%`,
                              backgroundColor: rampColor(row.inhibition_efficiency),
                            }}
                          />
                          <div
                            className="absolute inset-y-0 w-0.5 bg-ink"
                            style={{ left: `${row.inhibition_efficiency}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-ink-2">
                          <span
                            className="h-2 w-2 shrink-0"
                            style={{ backgroundColor: DOMAIN_COLOR[verdict] ?? '#6d756f' }}
                            aria-hidden
                          />
                          {short}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <p className="mt-4 font-mono text-xs text-ink-3" dir="ltr">
            {rows.length} {t.history.rows} · {backend}
          </p>
        </>
      )}
    </Section>
  )
}
