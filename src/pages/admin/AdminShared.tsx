/**
 * Shared furniture for the administrative screens.
 *
 * The admin surface reads records the API returns as untyped documents, so almost
 * everything here is about answering one question honestly: is this field absent, or is
 * it present and zero? Predictions stored before the record was widened carry thirteen
 * fields; ones stored after carry all of them. A screen that renders a missing
 * temperature as "0 K" states something false about an experiment, so `field()` returns
 * null for absent and the components render "not recorded" rather than a value.
 */

import { Link, useNavigate } from 'react-router-dom'

import { DOMAIN_COLOR, rampColor, rampTextOn } from '@/lib/ramp'
import { NOT_RECORDED } from '@/lib/admin'

/* -------------------------------------------------------------------------- */

export function Stat({
  label,
  value,
  note,
}: {
  label: string
  value: string | number
  note?: string
}) {
  return (
    <div className="bg-card p-5">
      <p className="patch-label text-ink-3">{label}</p>
      <p className="mt-3 font-mono text-2xl font-700 tabular">{value}</p>
      {note && <p className="mt-1 text-xs text-ink-3">{note}</p>}
    </div>
  )
}

export function StatGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-4">{children}</div>
}

/** A label/value pair for the detail screens. */
export function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  const missing = value === NOT_RECORDED
  return (
    <div className="border-b border-rule py-2.5">
      <dt className="patch-label text-ink-3">{label}</dt>
      <dd className={`mt-1 text-sm ${missing ? 'italic text-ink-3' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}

export function DetailGrid({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-x-10 sm:grid-cols-2">{children}</dl>
}

/* -------------------------------------------------------------------------- */

/** The efficiency reading, on the same colour ramp the comparator card uses. */
export function EfficiencyBadge({ value }: { value: unknown }) {
  if (typeof value !== 'number') return <span className="text-ink-3">—</span>
  return (
    <span
      className="inline-block px-2 py-1 font-mono text-xs font-700 tabular"
      style={{ backgroundColor: rampColor(value), color: rampTextOn(value) }}
    >
      {value.toFixed(2)}%
    </span>
  )
}

const VERDICT_TEXT: Record<string, string> = {
  in_domain: 'In domain',
  edge_of_domain: 'Edge',
  out_of_domain: 'Out of domain',
}

export function VerdictBadge({ verdict }: { verdict: unknown }) {
  if (typeof verdict !== 'string') return <span className="text-ink-3">—</span>
  const colour = DOMAIN_COLOR[verdict as keyof typeof DOMAIN_COLOR] ?? '#6d756f'
  return (
    <span
      className="inline-block border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em]"
      style={{ borderColor: colour, color: colour }}
    >
      {VERDICT_TEXT[verdict] ?? verdict}
    </span>
  )
}

export function StatusBadge({ status }: { status: unknown }) {
  const value = typeof status === 'string' ? status : '—'
  const good = ['success', 'paid', 'closed', 'approved', 'resolved'].includes(value)
  const open = ['pending', 'open', 'running'].includes(value)
  const colour = good ? '#008751' : open ? '#c08a2e' : '#6d756f'
  return (
    <span
      className="inline-block border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.06em]"
      style={{ borderColor: colour, color: colour }}
    >
      {value}
    </span>
  )
}

/* -------------------------------------------------------------------------- */

export function TableFrame({
  head,
  children,
  caption,
}: {
  head: string[]
  children: React.ReactNode
  caption?: string
}) {
  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[46rem] text-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead>
          <tr className="border-b border-ink text-left">
            {head.map((column) => (
              <th key={column} className="patch-label px-4 py-3 text-ink-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

/**
 * A table row that navigates.
 *
 * The row carries the click so the whole line is a target, but the first cell holds a
 * real anchor: that is what makes the row reachable by keyboard, openable in a new tab
 * with a middle click, and announced as a link by a screen reader. A div-with-onClick
 * has none of those properties, and wrapping the row in an anchor is not valid inside a
 * table — the browser hoists it out and the columns stop aligning.
 */
export function LinkRow({
  to,
  label,
  children,
}: {
  to: string
  label: string
  children: React.ReactNode
}) {
  const navigate = useNavigate()
  return (
    <tr
      className="cursor-pointer border-b border-rule transition-colors hover:bg-card-2"
      onClick={(event) => {
        // Let a real click on the anchor behave like one, including modifier-clicks.
        if ((event.target as HTMLElement).closest('a')) return
        navigate(to)
      }}
    >
      <td className="px-4 py-3">
        <Link
          to={to}
          className="font-mono text-xs underline-offset-4 hover:underline"
          onClick={(event) => event.stopPropagation()}
        >
          {label}
        </Link>
      </td>
      {children}
    </tr>
  )
}

export function Truncation({ shown, total, noun }: { shown: number; total: number; noun: string }) {
  if (total <= shown) {
    return (
      <p className="mt-3 font-mono text-[11px] text-ink-3">
        {total} {noun}
      </p>
    )
  }
  return (
    <p className="mt-3 font-mono text-[11px] text-ie-40">
      showing {shown} of {total} {noun} — charts on this page describe the {shown} shown
    </p>
  )
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mb-6 inline-block font-mono text-xs text-ink-3 underline-offset-4 hover:text-ink hover:underline"
    >
      ← {label}
    </Link>
  )
}
