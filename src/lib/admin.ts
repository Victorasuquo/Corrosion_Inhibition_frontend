/**
 * Reading and summarising administrative records.
 *
 * Pure functions, kept out of the component files so those export components and
 * nothing else — mixing the two breaks Fast Refresh, which is why the linter objects.
 *
 * The recurring concern here is absence. The API returns records as untyped documents,
 * and a prediction stored before the record was widened carries thirteen fields where a
 * newer one carries all of them. An absent temperature and a temperature of zero are
 * different claims about an experiment — the model itself keeps them apart with its
 * was-missing indicators — so `field()` distinguishes them and the formatters render
 * absence as words rather than as a number that was never measured.
 */

import { DOMAIN_COLOR } from '@/lib/ramp'

export type Row = Record<string, unknown>

export const NOT_RECORDED = 'not recorded'

/** The value, or null when the field was never stored. Zero and false survive. */
export function field(row: Row, name: string): unknown {
  const value = row[name]
  return value === undefined || value === null || value === '' ? null : value
}

export function text(row: Row, name: string): string {
  const value = field(row, name)
  return value === null ? NOT_RECORDED : String(value)
}

export function num(row: Row, name: string, digits = 2): string {
  const value = field(row, name)
  return typeof value === 'number' ? value.toFixed(digits) : NOT_RECORDED
}

export function when(row: Row, name = 'created_at'): string {
  const value = field(row, name)
  if (typeof value !== 'string') return NOT_RECORDED
  const date = new Date(value)
  return Number.isNaN(date.valueOf()) ? value : date.toLocaleString()
}

export function shortDate(value: unknown): string {
  return typeof value === 'string' ? value.slice(0, 10) : '—'
}

/* -------------------------------------------------------------------------- */
/* Aggregation                                                                */
/* -------------------------------------------------------------------------- */

export interface DayCount {
  day: string
  count: number
}

export interface Slice {
  label: string
  count: number
  colour: string
}

export const VERDICT_SLICE_ORDER = ['in_domain', 'edge_of_domain', 'out_of_domain'] as const

export const VERDICT_LABEL: Record<string, string> = {
  in_domain: 'Within the domain',
  edge_of_domain: 'Edge of the domain',
  out_of_domain: 'Outside the domain',
}

export function verdictSlices(rows: { ad_verdict?: unknown }[]): Slice[] {
  return VERDICT_SLICE_ORDER.map((verdict) => ({
    label: VERDICT_LABEL[verdict],
    count: rows.filter((r) => r.ad_verdict === verdict).length,
    colour: DOMAIN_COLOR[verdict as keyof typeof DOMAIN_COLOR],
  }))
}

/**
 * Group rows by UTC day over a fixed window.
 *
 * Days with nothing in them are kept. A chart that silently drops empty days turns four
 * scattered predictions into a run of four busy ones, which is the opposite of what the
 * reader concludes from the same four bars side by side.
 */
export function byDay(rows: { created_at?: unknown }[], days = 30): DayCount[] {
  const counts = new Map<string, number>()
  for (const row of rows) {
    const raw = row.created_at
    if (typeof raw !== 'string') continue
    const day = raw.slice(0, 10)
    counts.set(day, (counts.get(day) ?? 0) + 1)
  }

  const out: DayCount[] = []
  const today = new Date()
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setUTCDate(date.getUTCDate() - offset)
    const key = date.toISOString().slice(0, 10)
    out.push({ day: key, count: counts.get(key) ?? 0 })
  }
  return out
}

/** Count occurrences of one field, largest first. */
export function tally(rows: Row[], field: string, top = 8) {
  const counts = new Map<string, number>()
  for (const row of rows) {
    const value = row[field]
    if (value === null || value === undefined || value === '') continue
    const key = String(value)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, top)
}
