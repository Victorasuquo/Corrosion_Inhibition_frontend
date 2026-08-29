/**
 * The reading ramp.
 *
 * Inhibition efficiency lives on a physical colour axis: iron-oxide rust at 0%
 * (the metal corroding) through to passivation green at 100% (the metal protected).
 * Every gauge, chart series and status colour in the product derives from this and
 * nothing else, so trust and efficiency are read on one visual logic.
 */

export const RAMP = [
  { stop: 0, hex: '#7b2e12', name: 'Iron(III) oxide' },
  { stop: 20, hex: '#b4551f', name: 'Oxide orange' },
  { stop: 40, hex: '#c08a2e', name: 'Brass edge' },
  { stop: 60, hex: '#7e9a52', name: 'Onset of passivation' },
  { stop: 80, hex: '#2e8b7a', name: 'Verdigris' },
  { stop: 100, hex: '#008751', name: 'Passivation green' },
] as const

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Interpolate the ramp at an efficiency value in [0, 100]. */
export function rampColor(value: number): string {
  const v = Math.min(100, Math.max(0, value))
  const upperIndex = RAMP.findIndex((s) => s.stop >= v)
  if (upperIndex <= 0) return RAMP[0].hex

  const lower = RAMP[upperIndex - 1]
  const upper = RAMP[upperIndex]
  const t = (v - lower.stop) / (upper.stop - lower.stop)

  const a = hexToRgb(lower.hex)
  const b = hexToRgb(upper.hex)
  const mix = a.map((c, i) => Math.round(c + (b[i] - c) * t))
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`
}

/** CSS gradient across the full ramp, for scale bars. */
export const RAMP_GRADIENT = `linear-gradient(90deg, ${RAMP.map(
  (s) => `${s.hex} ${s.stop}%`,
).join(', ')})`

/**
 * Text colour that stays legible on a ramp patch.
 * The mid stops are light enough that white text fails contrast on them.
 */
export function rampTextOn(value: number): string {
  return value >= 30 && value <= 72 ? '#171a18' : '#ffffff'
}

/** Plain-language reading of an efficiency value. Never colour alone. */
export function efficiencyLabel(value: number): string {
  if (value >= 90) return 'Very high inhibition'
  if (value >= 75) return 'High inhibition'
  if (value >= 55) return 'Moderate inhibition'
  if (value >= 35) return 'Low inhibition'
  return 'Little to no inhibition'
}

export const DOMAIN_STYLE = {
  in_domain: {
    hex: '#008751',
    label: 'In domain',
    short: 'Known chemistry',
  },
  edge_of_domain: {
    hex: '#c08a2e',
    label: 'Edge of domain',
    short: 'Related chemistry',
  },
  out_of_domain: {
    hex: '#7b2e12',
    label: 'Outside domain',
    short: 'Unfamiliar chemistry',
  },
} as const

export type DomainVerdict = keyof typeof DOMAIN_STYLE
