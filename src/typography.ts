// typography — THE TYPE SCALE IS THE MATRIX. The palette already computes its hues from the ℤ/9 sequence; the
// type ladder computes from the same place, so no surface carries an authored pixel value. The ladder has
// exactly SIX rungs because 2 has order 6 in ℤ/9* (order_of_two_is_six — the coin tossed into itself visits every
// unit and returns home in six), and the rungs ARE the vortex orbit's digits read as ninths above the base:
// size(d) = (9 + d)/9 rem for d ∈ {1,2,4,5,7,8}. Line height is the sealed 3:4 harmonious rectangle
// (harmonious_page_three_four) — 4/3 of the size. All exact integer arithmetic: no host intrinsics, no
// wall-clock, no rounding library; the same input always emits the same scale, for anyone.
import { vortexOrbit, BASE } from './address.js'

/** floor division, exact — the repo's arithmetic (no host intrinsics) */
const fdiv = (a: number, b: number): number => (a - (a % b)) / b
/** an exact rational as a fixed 3-decimal string: milli(10, 9) → "1.111" */
const milli = (num: number, den: number): string => {
  const m = fdiv(num * 1000, den)
  const whole = fdiv(m, 1000)
  const frac = m - whole * 1000
  return whole + '.' + String(frac + 1000).slice(1)
}

export interface TypeRung { digit: number; size: string; lineHeight: string }

/** the ladder: the vortex orbit's digits ascending, each a ninth above the base, line height in the 3:4 ratio */
export function typeScale(): TypeRung[] {
  const digits = [...new Set(vortexOrbit())].sort((a, b) => a - b) // 1,2,4,5,7,8 — six rungs, the order of 2
  return digits.map((d) => ({
    digit: d,
    size: milli(BASE + d, BASE) + 'rem',                 // (9+d)/9
    lineHeight: milli((BASE + d) * 4, BASE * 3) + 'rem', // 4/3 of the size — the 3:4 rectangle
  }))
}

/** the scale as CSS custom properties — --type-<digit> and --type-lh-<digit>, read by every surface */
export function typeScaleVars(): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const r of typeScale()) {
    vars['--type-' + r.digit] = r.size
    vars['--type-lh-' + r.digit] = r.lineHeight
  }
  return vars
}

/** set the computed type scale on the document root (client-side only), beside the sequence palette */
export function applyTypeScale(): void {
  if (typeof document === 'undefined') return
  const vars = typeScaleVars()
  for (const k in vars) document.documentElement.style.setProperty(k, vars[k]!)
}
