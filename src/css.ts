// css — THE ONE DESIGN MATRIX, computed and served. Colour and type are the same arithmetic: the ℤ/9 sequence
// anchored on its fixed point (5 → green, the heart the diamond reflection holds) sets every hue, and the vortex
// orbit sets every rung of the type ladder. Nothing here is authored — no hex literal, no pixel value — so the
// site, the design system and any MCP client read ONE standard that cannot drift between them. Emitted as CSS
// custom properties under `:root`, folded to a receipt: two surfaces rendering the same matrix compute the same
// receipt, or they are not the same matrix. Exact integer arithmetic; no host intrinsics, no wall-clock.
import { toUuid } from './address.js'
import { typeScaleVars } from './typography.js'

/** the palette: hue = 120 + (d−5)·30, so 5 → green (the fixed point), 1 → red, 9 → blue; dz(d) mirrors across it */
export function sequenceVars(): Record<string, string> {
  const hue = (d: number) => 120 + (d - 5) * 30
  const vars: Record<string, string> = {}
  for (let d = 1; d <= 9; d++) vars['--seq-' + d] = 'hsl(' + hue(d) + ' 60% 55%)'
  vars['--seq-center'] = 'hsl(' + hue(5) + ' 60% 45%)' // 5 — green, the heart
  vars['--seq-light'] = 'hsl(' + hue(5) + ' 32% 82%)'
  vars['--seq-dark'] = 'hsl(' + hue(5) + ' 30% 50%)'
  vars['--seq-last'] = 'hsl(' + hue(4) + ' 45% 70%)' // the dz-mirror of 6
  return vars
}

/** every variable of the matrix — colour and type in one map, the whole standard */
export function matrixVars(): Record<string, string> {
  return { ...sequenceVars(), ...typeScaleVars() }
}

export interface MatrixCss { css: string; vars: number; receipt: string; honest: string }

/** the matrix as a stylesheet — the served standard, with the receipt that proves two surfaces share it */
export function matrixCss(): MatrixCss {
  const vars = matrixVars()
  const keys = Object.keys(vars).sort()
  const body = keys.map((k) => '  ' + k + ': ' + vars[k] + ';').join('\n')
  const css = ':root {\n' + body + '\n}\n'
  return {
    css,
    vars: keys.length,
    receipt: toUuid(css),
    honest: 'computed from the ℤ/9 sequence and the vortex orbit — no hex literal, no pixel value is authored; a surface that renders a different receipt is rendering a different matrix',
  }
}
