/**
 * The administrative surface.
 *
 * Replaces a JSON dump behind a row of resource buttons. Each tab loads only what it
 * needs, because the predictions collection is the one that grows and there is no
 * reason to fetch it to look at a request queue.
 *
 * The charts on each tab describe the rows that tab actually loaded, not the whole
 * collection — so every list says how much of the total it is showing. A dashboard that
 * charts its first hundred rows and labels the result "predictions" is stating
 * something false about the rest, and the moment that stops being obvious is the moment
 * someone draws a conclusion from it.
 */

import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { api, type ModelInfo } from '@/lib/api'
import { Section } from '@/components/Shell'
import { byDay, shortDate, tally, text, verdictSlices, when } from '@/lib/admin'
import { CATEGORICAL } from '@/lib/charts'
import { DOMAIN_COLOR } from '@/lib/ramp'
import {
  ChartFrame,
  EfficiencyHistogram,
  Empty,
  RankedBars,
  StackedShare,
  TimeSeriesBars,
} from '@/components/admin/AdminCharts'
import {
  EfficiencyBadge,
  LinkRow,
  Stat,
  StatGrid,
  StatusBadge,
  TableFrame,
  Truncation,
  VerdictBadge,
} from './AdminShared'

type Row = Record<string, unknown>

const TABS = [
  ['', 'Overview'],
  ['customers', 'Customers'],
  ['predictions', 'Predictions'],
  ['revenue', 'Revenue'],
  ['requests', 'Requests'],
  ['messages', 'Messages'],
  ['analytics', 'Analytics'],
] as const

const PAGE = 250

/** One collection, with the total so truncation can be stated rather than hidden. */
function useResource(resource: string | null) {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [total, setTotal] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!resource) return
    let active = true
    setRows(null)
    setFailed(false)
    api
      .adminResource(resource, PAGE)
      .then((result) => {
        if (!active) return
        setRows(result.items)
        setTotal(result.total)
      })
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [resource])

  return { rows, total, failed }
}

export default function AdminPage() {
  const location = useLocation()
  const tab = location.pathname.replace('/admin', '').replace(/^\//, '')

  return (
    <Section
      eyebrow="Administration"
      title="Platform operations"
      lead="Accounts, predictions, revenue, research requests, correspondence and privacy-preserving analytics."
    >
      <nav className="mb-10 flex gap-1 overflow-x-auto border-b border-rule" aria-label="Administration">
        {TABS.map(([slug, label]) => (
          <NavLink
            key={slug}
            end={slug === ''}
            to={`/admin/${slug}`}
            className={({ isActive }) =>
              `whitespace-nowrap border-b-2 px-3 py-3 text-sm transition-colors ${
                isActive
                  ? 'border-ie-100 font-700 text-ink'
                  : 'border-transparent text-ink-2 hover:border-rule hover:text-ink'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {tab === '' && <OverviewTab />}
      {tab === 'customers' && <CustomersTab />}
      {tab === 'predictions' && <PredictionsTab />}
      {tab === 'revenue' && <RevenueTab />}
      {tab === 'requests' && <RequestsTab />}
      {tab === 'messages' && <MessagesTab />}
      {tab === 'analytics' && <AnalyticsTab />}
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

function OverviewTab() {
  const [overview, setOverview] = useState<Record<string, unknown> | null>(null)
  const [model, setModel] = useState<ModelInfo | null>(null)
  const { rows: predictions } = useResource('predictions')

  useEffect(() => {
    api.adminOverview().then(setOverview).catch(() => undefined)
    api.model().then(setModel).catch(() => undefined)
  }, [])

  const drift = model?.drift as Record<string, unknown> | undefined
  const outOfDomainShare = typeof drift?.out_of_domain_share === 'number' ? drift.out_of_domain_share : null
  const alert = drift?.alert === true

  return (
    <div className="space-y-10">
      <StatGrid>
        <Stat
          label="Accounts"
          value={Number(overview?.users ?? 0)}
          note={`${Number(overview?.verified_users ?? 0)} verified`}
        />
        <Stat label="Predictions" value={Number(overview?.predictions ?? 0)} />
        <Stat
          label="Revenue"
          value={`$${Number(overview?.revenue_major ?? 0).toFixed(2)}`}
          note={`${Number(overview?.successful_payments ?? 0)} paid`}
        />
        <Stat
          label="Open correspondence"
          value={
            Number(overview?.data_requests ?? 0) +
            Number(overview?.paper_requests ?? 0) +
            Number(overview?.messages ?? 0)
          }
          note="requests and messages"
        />
      </StatGrid>

      {alert && (
        <div className="panel border-l-4 p-5" style={{ borderLeftColor: DOMAIN_COLOR.out_of_domain }}>
          <p className="font-display font-700">The service is drifting out of its domain</p>
          <p className="mt-2 max-w-prose text-sm text-ink-2">
            {String(drift?.alert_note ?? '')}
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartFrame
          title="Predictions per day"
          denominator={`last 30 days · ${predictions?.length ?? 0} loaded`}
        >
          <TimeSeriesBars data={byDay(predictions ?? [])} />
        </ChartFrame>

        <ChartFrame
          title="Applicability domain"
          denominator={
            typeof drift?.requests_seen === 'number'
              ? `${drift.requests_seen} since restart`
              : 'live telemetry'
          }
        >
          {drift ? (
            <>
              <StackedShare
                slices={Object.entries((drift.verdicts ?? {}) as Record<string, number>).map(
                  ([verdict, count]) => ({
                    label: verdict.replaceAll('_', ' '),
                    count,
                    colour: DOMAIN_COLOR[verdict as keyof typeof DOMAIN_COLOR] ?? CATEGORICAL[3],
                  }),
                )}
              />
              {outOfDomainShare !== null && (
                <p className="mt-4 border-t border-rule pt-3 text-xs text-ink-3">
                  {Math.round(outOfDomainShare * 100)}% of recent requests fell outside the domain
                  the model was validated on. Sustained above 50% is a research finding before it
                  is an operational one.
                </p>
              )}
            </>
          ) : (
            <Empty note="Model telemetry unavailable." />
          )}
        </ChartFrame>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Customers                                                                  */
/* -------------------------------------------------------------------------- */

function CustomersTab() {
  const { rows, total, failed } = useResource('users')
  const { rows: predictions } = useResource('predictions')

  const predictionsByUser = useMemo(() => {
    const counts = new Map<string, number>()
    for (const row of predictions ?? []) {
      const id = row.user_id
      if (typeof id === 'string') counts.set(id, (counts.get(id) ?? 0) + 1)
    }
    return counts
  }, [predictions])

  if (failed) return <Empty note="Could not load accounts." />
  if (!rows) return <Empty note="Loading accounts…" />
  if (rows.length === 0) return <Empty note="No accounts yet." />

  const verified = rows.filter((r) => r.email_verified === true).length

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartFrame title="Verification" denominator={`${rows.length} accounts`}>
          <StackedShare
            slices={[
              { label: 'Verified', count: verified, colour: CATEGORICAL[0] },
              { label: 'Unverified', count: rows.length - verified, colour: '#c08a2e' },
            ]}
          />
        </ChartFrame>
        <ChartFrame title="Where they are" denominator={`${rows.length} accounts`}>
          <RankedBars rows={tally(rows, 'country')} />
        </ChartFrame>
      </div>

      <div>
        <TableFrame head={['Account', 'Name', 'Institution', 'Country', 'Verified', 'Predictions']}>
          {rows.map((row) => (
            <LinkRow
              key={String(row.id)}
              to={`/admin/customers/${String(row.id)}`}
              label={text(row, 'email')}
            >
              <td className="px-4 py-3">{text(row, 'full_name')}</td>
              <td className="px-4 py-3 text-ink-2">{text(row, 'school')}</td>
              <td className="px-4 py-3 text-ink-2">{text(row, 'country')}</td>
              <td className="px-4 py-3">
                <StatusBadge status={row.email_verified === true ? 'verified' : 'pending'} />
              </td>
              <td className="px-4 py-3 font-mono tabular">
                {predictionsByUser.get(String(row.id)) ?? 0}
              </td>
            </LinkRow>
          ))}
        </TableFrame>
        <Truncation shown={rows.length} total={total} noun="accounts" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Predictions                                                                */
/* -------------------------------------------------------------------------- */

function PredictionsTab() {
  const { rows, total, failed } = useResource('predictions')
  const [verdict, setVerdict] = useState<string>('all')
  const [metal, setMetal] = useState<string>('all')

  const filtered = useMemo(() => {
    return (rows ?? []).filter(
      (row) =>
        (verdict === 'all' || row.ad_verdict === verdict) &&
        (metal === 'all' || row.metal === metal),
    )
  }, [rows, verdict, metal])

  if (failed) return <Empty note="Could not load predictions." />
  if (!rows) return <Empty note="Loading predictions…" />
  if (rows.length === 0) return <Empty note="No predictions have been made yet." />

  const metals = [...new Set(rows.map((r) => String(r.metal ?? '')).filter(Boolean))].sort()
  const efficiencies = filtered
    .map((r) => r.inhibition_efficiency)
    .filter((v): v is number => typeof v === 'number')

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartFrame title="Efficiency distribution" denominator={`${efficiencies.length} readings`}>
          <EfficiencyHistogram values={efficiencies} />
        </ChartFrame>
        <ChartFrame title="Applicability domain" denominator={`${filtered.length} predictions`}>
          <StackedShare slices={verdictSlices(filtered)} />
        </ChartFrame>
        <ChartFrame title="Substrate" denominator={`${filtered.length} predictions`}>
          <RankedBars rows={tally(filtered, 'metal')} colour={CATEGORICAL[2]} />
        </ChartFrame>
      </div>

      <ChartFrame title="Predictions per day" denominator={`last 30 days · ${filtered.length} shown`}>
        <TimeSeriesBars data={byDay(filtered)} />
      </ChartFrame>

      <div className="flex flex-wrap gap-3">
        <Filter label="Domain" value={verdict} onChange={setVerdict} options={['all', 'in_domain', 'edge_of_domain', 'out_of_domain']} />
        <Filter label="Metal" value={metal} onChange={setMetal} options={['all', ...metals]} />
      </div>

      <div>
        <TableFrame head={['Prediction', 'When', 'Molecule', 'Substrate', 'Reading', 'Domain']}>
          {filtered.map((row) => (
            <LinkRow
              key={String(row.id)}
              to={`/admin/predictions/${String(row.id)}`}
              label={String(row.id ?? '').slice(0, 12)}
            >
              <td className="px-4 py-3 font-mono text-xs text-ink-2">{shortDate(row.created_at)}</td>
              <td className="max-w-[16rem] truncate px-4 py-3 font-mono text-xs">
                {text(row, 'canonical_smiles')}
              </td>
              <td className="px-4 py-3 text-ink-2">
                {text(row, 'metal')}
                {row.alloy ? ` · ${String(row.alloy)}` : ''}
              </td>
              <td className="px-4 py-3">
                <EfficiencyBadge value={row.inhibition_efficiency} />
              </td>
              <td className="px-4 py-3">
                <VerdictBadge verdict={row.ad_verdict} />
              </td>
            </LinkRow>
          ))}
        </TableFrame>
        <Truncation shown={rows.length} total={total} noun="predictions" />
      </div>
    </div>
  )
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="text-sm text-ink-2">
      <span className="patch-label mr-2 text-ink-3">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-rule bg-card px-3 py-2 text-sm outline-none focus:border-ink"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option === 'all' ? 'All' : option.replaceAll('_', ' ')}
          </option>
        ))}
      </select>
    </label>
  )
}

/* -------------------------------------------------------------------------- */
/* Revenue                                                                    */
/* -------------------------------------------------------------------------- */

function RevenueTab() {
  const { rows: payments, total: paymentTotal, failed } = useResource('payments')
  const { rows: invoices, total: invoiceTotal } = useResource('invoices')

  if (failed) return <Empty note="Could not load payments." />
  if (!payments) return <Empty note="Loading payments…" />

  const successful = payments.filter((p) => p.status === 'success')
  const revenue = successful.reduce((sum, p) => sum + Number(p.amount_major ?? 0), 0)

  return (
    <div className="space-y-8">
      <StatGrid>
        <Stat label="Revenue" value={`$${revenue.toFixed(2)}`} note={`${successful.length} paid`} />
        <Stat label="Payments" value={payments.length} />
        <Stat label="Invoices" value={invoices?.length ?? 0} />
        <Stat
          label="Conversion"
          value={payments.length === 0 ? '—' : `${Math.round((successful.length / payments.length) * 100)}%`}
          note="of initiated payments"
        />
      </StatGrid>

      {payments.length === 0 ? (
        <Empty note="No payments recorded. Payments are off at launch." />
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartFrame title="Payment status" denominator={`${payments.length} payments`}>
            <StackedShare
              slices={tally(payments, 'status', 6).map((row, index) => ({
                label: row.label,
                count: row.count,
                colour: CATEGORICAL[index % CATEGORICAL.length],
              }))}
            />
          </ChartFrame>
          <ChartFrame title="Payments per day" denominator="last 30 days">
            <TimeSeriesBars data={byDay(payments)} colour={CATEGORICAL[0]} />
          </ChartFrame>
        </div>
      )}

      <div>
        <h3 className="mb-3 font-display text-base font-700">Invoices</h3>
        {invoices && invoices.length > 0 ? (
          <>
            <TableFrame head={['Invoice', 'When', 'Description', 'Amount', 'Status']}>
              {invoices.map((row) => (
                <LinkRow
                  key={String(row.id)}
                  to={`/admin/invoices/${String(row.id)}`}
                  label={text(row, 'invoice_number')}
                >
                  <td className="px-4 py-3 font-mono text-xs text-ink-2">
                    {shortDate(row.created_at)}
                  </td>
                  <td className="px-4 py-3 text-ink-2">{text(row, 'description')}</td>
                  <td className="px-4 py-3 font-mono tabular">
                    {text(row, 'currency')} {Number(row.amount_major ?? 0).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                </LinkRow>
              ))}
            </TableFrame>
            <Truncation shown={invoices.length} total={invoiceTotal} noun="invoices" />
          </>
        ) : (
          <Empty note="No invoices yet." />
        )}
        <Truncation shown={payments.length} total={paymentTotal} noun="payments" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Requests                                                                   */
/* -------------------------------------------------------------------------- */

function RequestsTab() {
  const { rows: data, total: dataTotal } = useResource('data_requests')
  const { rows: papers, total: paperTotal } = useResource('paper_requests')

  if (!data || !papers) return <Empty note="Loading requests…" />

  // Annotated explicitly: spreading a Record<string, unknown> into an object literal
  // narrows the result to just the added key, and every field read afterwards then
  // fails to typecheck.
  const all: Row[] = [
    ...data.map((r): Row => ({ ...r, _kind: 'data' })),
    ...papers.map((r): Row => ({ ...r, _kind: 'paper' })),
  ].sort((a, b) => String(a.created_at ?? '').localeCompare(String(b.created_at ?? '')))

  if (all.length === 0) return <Empty note="No research requests yet." />

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartFrame title="By status" denominator={`${all.length} requests`}>
          <StackedShare
            slices={tally(all, 'status', 6).map((row, index) => ({
              label: row.label,
              count: row.count,
              colour: CATEGORICAL[index % CATEGORICAL.length],
            }))}
          />
        </ChartFrame>
        <ChartFrame title="By kind" denominator={`${all.length} requests`}>
          <RankedBars
            rows={[
              { label: 'Data', count: data.length },
              { label: 'Papers', count: papers.length },
            ]}
          />
        </ChartFrame>
      </div>

      <div>
        <p className="mb-3 text-sm text-ink-3">Oldest first — the ones that have waited longest.</p>
        <TableFrame head={['Request', 'Opened', 'Kind', 'Subject', 'Status']}>
          {all.map((row) => (
            <LinkRow
              key={String(row.id)}
              to={`/admin/requests/${row._kind}/${String(row.id)}`}
              label={String(row.id ?? '').slice(0, 12)}
            >
              <td className="px-4 py-3 font-mono text-xs text-ink-2">{shortDate(row.created_at)}</td>
              <td className="px-4 py-3 text-ink-2">{String(row._kind)}</td>
              <td className="max-w-[20rem] truncate px-4 py-3">{text(row, 'subject')}</td>
              <td className="px-4 py-3">
                <StatusBadge status={row.status} />
              </td>
            </LinkRow>
          ))}
        </TableFrame>
        <Truncation shown={all.length} total={dataTotal + paperTotal} noun="requests" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Messages                                                                   */
/* -------------------------------------------------------------------------- */

function MessagesTab() {
  const { rows, total } = useResource('message_threads')
  if (!rows) return <Empty note="Loading conversations…" />
  if (rows.length === 0) return <Empty note="No conversations yet." />

  return (
    <div>
      <TableFrame head={['Thread', 'Opened', 'Subject', 'Status']}>
        {rows.map((row) => (
          <LinkRow
            key={String(row.id)}
            to={`/admin/threads/${String(row.id)}`}
            label={String(row.id ?? '').slice(0, 12)}
          >
            <td className="px-4 py-3 font-mono text-xs text-ink-2">{when(row)}</td>
            <td className="max-w-[24rem] truncate px-4 py-3">{text(row, 'subject')}</td>
            <td className="px-4 py-3">
              <StatusBadge status={row.status} />
            </td>
          </LinkRow>
        ))}
      </TableFrame>
      <Truncation shown={rows.length} total={total} noun="conversations" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Analytics                                                                  */
/* -------------------------------------------------------------------------- */

function AnalyticsTab() {
  const { rows, total, failed } = useResource('analytics_events')

  if (failed) return <Empty note="Could not load analytics." />
  if (!rows) return <Empty note="Loading analytics…" />
  if (rows.length === 0) return <Empty note="No visits recorded yet." />

  return (
    <div className="space-y-8">
      <ChartFrame title="Page views per day" denominator={`last 30 days · ${rows.length} loaded`}>
        <TimeSeriesBars data={byDay(rows)} colour={CATEGORICAL[1]} />
      </ChartFrame>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartFrame title="Most visited" denominator={`${rows.length} views`}>
          <RankedBars rows={tally(rows, 'path')} />
        </ChartFrame>
        <ChartFrame title="Where from" denominator={`${rows.length} views`}>
          <RankedBars rows={tally(rows, 'country')} colour={CATEGORICAL[2]} />
        </ChartFrame>
      </div>

      <p className="text-xs text-ink-3">
        Visits carry a path and a coarse location only — no identifier, no address, nothing
        that resolves to a person. They expire automatically on the retention window.
      </p>
      <Truncation shown={rows.length} total={total} noun="recorded visits" />
    </div>
  )
}
