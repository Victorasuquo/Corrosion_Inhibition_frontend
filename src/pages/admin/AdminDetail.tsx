/**
 * The screens behind the rows.
 *
 * Each reads one record and shows everything it holds. The recurring problem is that
 * records written before the prediction store was widened carry thirteen fields and
 * newer ones carry all of them, so every field here goes through `field()`/`text()`
 * and renders "not recorded" when absent. An absent temperature and a temperature of
 * zero are different claims about an experiment, and the model itself distinguishes
 * them with its was-missing indicators — the interface should not collapse what the
 * model was careful to keep apart.
 */

import { useEffect, useState, type FormEvent } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '@/lib/api'
import { Section } from '@/components/Shell'
import { NOT_RECORDED, field, num, shortDate, text, when } from '@/lib/admin'
import { RAMP_GRADIENT } from '@/lib/ramp'
import { Empty } from '@/components/admin/AdminCharts'
import {
  BackLink,
  Detail,
  DetailGrid,
  EfficiencyBadge,
  LinkRow,
  Stat,
  StatGrid,
  StatusBadge,
  TableFrame,
  VerdictBadge,
} from './AdminShared'

type Row = Record<string, unknown>

function useRecord(resource: string, id: string | undefined) {
  const [item, setItem] = useState<Row | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api
      .adminResourceItem(resource, id)
      .then((result) => setItem(result.item))
      .catch(() => setError('That record could not be loaded.'))
  }, [resource, id])

  return { item, error }
}

/* -------------------------------------------------------------------------- */
/* A prediction                                                               */
/* -------------------------------------------------------------------------- */

export function AdminPredictionPage() {
  const { id } = useParams()
  const { item, error } = useRecord('predictions', id)

  if (error) return <Shell title="Prediction"><Empty note={error} /></Shell>
  if (!item) return <Shell title="Prediction"><Empty note="Loading…" /></Shell>

  const efficiency = item.inhibition_efficiency
  const low = item.interval_low
  const high = item.interval_high
  const imputed = Array.isArray(item.imputed_conditions) ? (item.imputed_conditions as string[]) : null
  const warnings = Array.isArray(item.reliability_warnings)
    ? (item.reliability_warnings as Row[])
    : null

  const condition = (label: string, name: string, unit = '') => {
    const value = field(item, name)
    const wasImputed = imputed?.some((c) => c.toLowerCase().includes(name.replace('_k', '').replace('_mm', '').replace('_h', '').replace('_m', '')))
    return (
      <Detail
        label={label}
        value={
          value === null ? (
            NOT_RECORDED
          ) : (
            <>
              <span className="font-mono">{String(value)}{unit}</span>
              {wasImputed && (
                <span className="ml-2 font-mono text-[11px] text-ie-40">filled from training median</span>
              )}
            </>
          )
        }
      />
    )
  }

  return (
    <Shell title="Prediction" back="/admin/predictions" backLabel="All predictions">
      {/* The reading, on the comparator scale */}
      <div className="panel mb-8 p-6 sm:p-8">
        <p className="patch-label text-ink-3">Inhibition efficiency</p>
        <p className="mt-2 font-mono text-5xl font-700 tabular">
          {typeof efficiency === 'number' ? efficiency.toFixed(2) : '—'}
          <span className="text-2xl text-ink-2">%</span>
        </p>

        <div className="mt-6">
          <div className="h-3 w-full" style={{ background: RAMP_GRADIENT }} />
          {typeof low === 'number' && typeof high === 'number' && (
            <div className="relative mt-1 h-6">
              <div
                className="absolute h-1.5 bg-ink"
                style={{ left: `${Math.max(0, low)}%`, width: `${Math.min(100, high) - Math.max(0, low)}%` }}
              />
              {typeof efficiency === 'number' && (
                <div
                  className="absolute h-4 w-0.5 bg-ink"
                  style={{ left: `${Math.max(0, Math.min(100, efficiency))}%` }}
                />
              )}
            </div>
          )}
          <p className="mt-2 font-mono text-sm text-ink-2">
            90% interval {num(item, 'interval_low')}% – {num(item, 'interval_high')}%
            {field(item, 'interval_half_width') !== null && ` (±${num(item, 'interval_half_width')})`}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <VerdictBadge verdict={item.ad_verdict} />
          <span className="font-mono text-xs text-ink-3">
            nearest training neighbour {num(item, 'max_tanimoto', 3)} Tanimoto
          </span>
        </div>
      </div>

      {warnings && warnings.length > 0 && (
        <div className="panel mb-8 border-l-4 border-ie-00 p-5">
          <p className="font-display font-700">Reliability warnings</p>
          <ul className="mt-3 space-y-3">
            {warnings.map((warning, index) => (
              <li key={index} className="text-sm">
                <p className="text-ink">{String(warning.message ?? '')}</p>
                {typeof warning.group_r2 === 'number' && (
                  <p className="mt-0.5 font-mono text-xs text-ink-3">
                    group R² {warning.group_r2.toFixed(3)}
                    {typeof warning.group_n === 'number' && ` · n = ${warning.group_n}`}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-base font-700">Conditions</h3>
          <DetailGrid>
            <Detail label="Base metal" value={text(item, 'metal')} />
            <Detail label="Alloy" value={text(item, 'alloy')} />
            <Detail label="Methodology" value={text(item, 'methodology')} />
            <Detail label="pH provenance" value={text(item, 'ph_source')} />
            {condition('Temperature', 'temperature_k', ' K')}
            {condition('Duration', 'duration_h', ' h')}
            {condition('Concentration', 'concentration_mm', ' mM')}
            {condition('pH', 'ph')}
            {condition('Supporting salt', 'salt_concentration_m', ' M')}
            <Detail
              label="Synergist"
              value={field(item, 'synergist_present') === null ? NOT_RECORDED : item.synergist_present ? 'present' : 'absent'}
            />
          </DetailGrid>
          {imputed && imputed.length > 0 && (
            <p className="mt-3 text-xs text-ink-3">
              {imputed.length} condition{imputed.length === 1 ? ' was' : 's were'} not supplied and
              filled with the training median. The model records that fact as a feature, so the
              reading already accounts for it.
            </p>
          )}
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-700">Molecule and provenance</h3>
          <DetailGrid>
            <Detail label="Canonical SMILES" value={<span className="break-all font-mono text-xs">{text(item, 'canonical_smiles')}</span>} />
            <Detail label="As submitted" value={<span className="break-all font-mono text-xs">{text(item, 'input_smiles')}</span>} />
            <Detail label="Formula" value={text(item, 'formula')} />
            <Detail label="Molecular weight" value={field(item, 'molecular_weight') === null ? NOT_RECORDED : `${num(item, 'molecular_weight')} g/mol`} />
            <Detail label="Heavy atoms" value={text(item, 'heavy_atoms')} />
            <Detail
              label="Scaffold in training"
              value={field(item, 'scaffold_in_training') === null ? NOT_RECORDED : item.scaffold_in_training ? 'yes' : 'no'}
            />
            <Detail label="Nearest training molecule" value={<span className="break-all font-mono text-xs">{text(item, 'nearest_training_smiles')}</span>} />
            <Detail
              label="Figure this is entitled to"
              value={
                field(item, 'reference_r2') === null
                  ? NOT_RECORDED
                  : `R² ${num(item, 'reference_r2', 3)} · ${text(item, 'reference_split')}`
              }
            />
            <Detail label="Model version" value={text(item, 'model_version')} />
            <Detail label="Served" value={when(item)} />
            <Detail
              label="Account"
              value={
                field(item, 'user_id') === null ? NOT_RECORDED : (
                  <a className="font-mono text-xs underline underline-offset-4" href={`/admin/customers/${String(item.user_id)}`}>
                    {String(item.user_id)}
                  </a>
                )
              }
            />
          </DetailGrid>
        </div>
      </div>
    </Shell>
  )
}

/* -------------------------------------------------------------------------- */
/* A customer                                                                 */
/* -------------------------------------------------------------------------- */

export function AdminCustomerPage() {
  const { id } = useParams()
  const [dossier, setDossier] = useState<Awaited<ReturnType<typeof api.adminCustomer>> | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api.adminCustomer(id).then(setDossier).catch(() => setError('That account could not be loaded.'))
  }, [id])

  if (error) return <Shell title="Customer"><Empty note={error} /></Shell>
  if (!dossier) return <Shell title="Customer"><Empty note="Loading…" /></Shell>

  const account = dossier.account
  const requests = [...dossier.requests.data, ...dossier.requests.papers]

  return (
    <Shell title={text(account, 'full_name')} back="/admin/customers" backLabel="All customers">
      <StatGrid>
        <Stat label="Predictions" value={dossier.totals.predictions} />
        <Stat label="Payments" value={dossier.totals.payments} note={`${dossier.totals.successful_payments} successful`} />
        <Stat label="Spend" value={`$${dossier.totals.spend_major.toFixed(2)}`} />
        <Stat label="Correspondence" value={requests.length + dossier.threads.length} note="requests and threads" />
      </StatGrid>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 font-display text-base font-700">Account</h3>
          <DetailGrid>
            <Detail label="Email" value={text(account, 'email')} />
            <Detail label="Verified" value={<StatusBadge status={account.email_verified === true ? 'verified' : 'pending'} />} />
            <Detail label="Role" value={text(account, 'role')} />
            <Detail label="Institution" value={text(account, 'school')} />
            <Detail label="Department" value={text(account, 'department')} />
            <Detail label="Research area" value={text(account, 'research_area')} />
            <Detail label="Country" value={text(account, 'country')} />
            <Detail label="Registered" value={when(account)} />
          </DetailGrid>
          {typeof account.bio === 'string' && account.bio && (
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-ink-2">{account.bio}</p>
          )}
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-700">Recent predictions</h3>
          {dossier.predictions.length === 0 ? (
            <Empty note="This account has not made a prediction." />
          ) : (
            <TableFrame head={['Prediction', 'When', 'Substrate', 'Reading', 'Domain']}>
              {dossier.predictions.slice(0, 25).map((row) => (
                <LinkRow key={String(row.id)} to={`/admin/predictions/${String(row.id)}`} label={String(row.id ?? '').slice(0, 10)}>
                  <td className="px-4 py-3 font-mono text-xs text-ink-2">{shortDate(row.created_at)}</td>
                  <td className="px-4 py-3 text-ink-2">{text(row, 'metal')}</td>
                  <td className="px-4 py-3"><EfficiencyBadge value={row.inhibition_efficiency} /></td>
                  <td className="px-4 py-3"><VerdictBadge verdict={row.ad_verdict} /></td>
                </LinkRow>
              ))}
            </TableFrame>
          )}
        </div>
      </div>

      {requests.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 font-display text-base font-700">Research requests</h3>
          <TableFrame head={['Request', 'Opened', 'Subject', 'Status']}>
            {requests.map((row) => (
              <LinkRow
                key={String(row.id)}
                to={`/admin/requests/${dossier.requests.data.includes(row) ? 'data' : 'paper'}/${String(row.id)}`}
                label={String(row.id ?? '').slice(0, 10)}
              >
                <td className="px-4 py-3 font-mono text-xs text-ink-2">{shortDate(row.created_at)}</td>
                <td className="px-4 py-3">{text(row, 'subject')}</td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              </LinkRow>
            ))}
          </TableFrame>
        </div>
      )}

      {dossier.invoices.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 font-display text-base font-700">Invoices</h3>
          <TableFrame head={['Invoice', 'When', 'Amount', 'Status']}>
            {dossier.invoices.map((row) => (
              <LinkRow key={String(row.id)} to={`/admin/invoices/${String(row.id)}`} label={text(row, 'invoice_number')}>
                <td className="px-4 py-3 font-mono text-xs text-ink-2">{shortDate(row.created_at)}</td>
                <td className="px-4 py-3 font-mono tabular">{text(row, 'currency')} {Number(row.amount_major ?? 0).toFixed(2)}</td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
              </LinkRow>
            ))}
          </TableFrame>
        </div>
      )}
    </Shell>
  )
}

/* -------------------------------------------------------------------------- */
/* An invoice                                                                 */
/* -------------------------------------------------------------------------- */

export function AdminInvoicePage() {
  const { id } = useParams()
  const { item, error } = useRecord('invoices', id)

  if (error) return <Shell title="Invoice"><Empty note={error} /></Shell>
  if (!item) return <Shell title="Invoice"><Empty note="Loading…" /></Shell>

  return (
    <Shell title={text(item, 'invoice_number')} back="/admin/revenue" backLabel="Revenue">
      <div className="panel max-w-2xl p-8 print:border-0">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p className="patch-label text-ink-3">Invoice</p>
            <p className="mt-1 font-display text-2xl font-700">{text(item, 'invoice_number')}</p>
          </div>
          <StatusBadge status={item.status} />
        </div>

        <DetailGrid>
          <Detail label="Issued" value={when(item)} />
          <Detail label="Reference" value={<span className="break-all font-mono text-xs">{text(item, 'reference')}</span>} />
          <Detail label="Description" value={text(item, 'description')} />
          <Detail label="Account" value={<span className="break-all font-mono text-xs">{text(item, 'user_id')}</span>} />
        </DetailGrid>

        <div className="mt-8 flex items-baseline justify-between border-t-2 border-ink pt-4">
          <span className="patch-label text-ink-3">Total</span>
          <span className="font-mono text-2xl font-700 tabular">
            {text(item, 'currency')} {Number(item.amount_major ?? 0).toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="mt-6 border border-rule px-4 py-2.5 font-display text-sm font-700 text-ink-2 transition-colors hover:border-ink hover:bg-card-2 print:hidden"
      >
        Print this invoice
      </button>
    </Shell>
  )
}

/* -------------------------------------------------------------------------- */
/* A research request                                                         */
/* -------------------------------------------------------------------------- */

export function AdminRequestPage() {
  const { kind, id } = useParams()
  const resource = kind === 'paper' ? 'paper_requests' : 'data_requests'
  const { item, error } = useRecord(resource, id)
  const [status, setStatus] = useState('')
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (item && typeof item.status === 'string') setStatus(item.status)
  }, [item])

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!kind || !id) return
    await api.updateAdminRequest(kind, id, { status, priority: 'normal', internal_note: note })
    setSaved(true)
  }

  if (error) return <Shell title="Request"><Empty note={error} /></Shell>
  if (!item) return <Shell title="Request"><Empty note="Loading…" /></Shell>

  return (
    <Shell title={text(item, 'subject')} back="/admin/requests" backLabel="All requests">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div>
          <div className="panel border-l-2 border-rule p-6">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{text(item, 'message')}</p>
          </div>
          <DetailGrid>
            <Detail label="Opened" value={when(item)} />
            <Detail label="Kind" value={kind === 'paper' ? 'Paper request' : 'Data request'} />
            <Detail label="Priority" value={text(item, 'priority')} />
            <Detail label="Account" value={<span className="break-all font-mono text-xs">{text(item, 'user_id')}</span>} />
          </DetailGrid>
        </div>

        <form onSubmit={(event) => void submit(event)} className="panel h-fit p-6">
          <p className="patch-label mb-4 text-ink-3">Update status</p>
          <label className="block text-sm text-ink-2">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="mt-1.5 w-full border border-rule bg-card px-3 py-2.5 text-sm outline-none focus:border-ink"
            >
              {['open', 'in_review', 'approved', 'declined', 'closed'].map((option) => (
                <option key={option} value={option}>{option.replaceAll('_', ' ')}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm text-ink-2">
            <span>Internal note</span>
            <textarea
              rows={4}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="mt-1.5 w-full border border-rule bg-card px-3 py-2.5 text-sm outline-none focus:border-ink"
            />
          </label>
          <button className="mt-5 bg-ink px-4 py-2.5 font-display text-sm font-700 text-card">
            Save
          </button>
          {saved && (
            <p className="mt-4 text-sm text-ink-2">
              Saved. The requester has been emailed the new status.
            </p>
          )}
        </form>
      </div>
    </Shell>
  )
}

/* -------------------------------------------------------------------------- */

function Shell({
  title,
  back,
  backLabel,
  children,
}: {
  title: string
  back?: string
  backLabel?: string
  children: React.ReactNode
}) {
  return (
    <Section eyebrow="Administration" title={title}>
      {back && backLabel && <BackLink to={back} label={backLabel} />}
      {children}
    </Section>
  )
}
