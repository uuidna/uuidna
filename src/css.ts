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

// THE DURATION LADDER — the same vortex, read as time: the orbit digit d gives d/9 of a second (111ms, 222ms,
// 444ms, …), so motion is timed by the matrix exactly as colour and type are. The SPEED LAW is engineering, not
// arithmetic, and is named as such: the effects animate ONLY `transform` and `opacity`, the two properties a
// browser compositor can run without returning to layout or paint — everything else (box-shadow, filter,
// background-position, width) is held static. No effect animates a property that forces the pipeline.
export function durationVars(): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const d of [...new Set(vortexOrbit())].sort((a, b) => a - b)) {
    const ms = fdiv(d * 1000, 9) // exact: d/9 of a second
    vars['--dur-' + d] = ms + 'ms'
  }
  return vars
}

/** THE EFFECTS — superposition, collapse, entanglement: named for what the arithmetic does, never for physics */
export function matrixEffects(): string {
  return `
/* q-superposition — TWO STATES HELD AT ONCE: a digit and its dz-mirror (10−d) layered, neither collapsed. The
   crossfade runs on OPACITY alone, so the compositor carries it without layout or paint. */
.q-superposition { position: relative; isolation: isolate; }
.q-superposition::before,
.q-superposition::after {
  content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  transition: opacity var(--dur-4) linear;
  will-change: opacity;
}
.q-superposition::before { background: var(--seq-4); opacity: .5; }
.q-superposition::after  { background: var(--seq-6); opacity: .5; }

/* q-collapse — THE MEASUREMENT: on hover or focus the superposition resolves to ONE state. Opacity only. */
.q-superposition:hover::before, .q-superposition:focus-within::before { opacity: 1; }
.q-superposition:hover::after,  .q-superposition:focus-within::after  { opacity: 0; }

/* q-entangled — two elements carrying the same digit read the SAME computed hue: no animation, no message
   passed, and no correlation beyond sharing one source. The address announces; nothing signals. */
.q-entangled { border-inline-start: 2px solid var(--seq-center); }

/* q-fold — the involution, visible: the element turns and returns, self-inverse. TRANSFORM only. */
@keyframes q-fold { 50% { transform: rotateY(180deg); } }
.q-fold { animation: q-fold var(--dur-8) ease-in-out; transform-style: preserve-3d; will-change: transform; }

/* q-rung — the type ladder as motion: each rung its own duration, the vortex read as time. */
.q-rung-1 { transition-duration: var(--dur-1); }
.q-rung-2 { transition-duration: var(--dur-2); }
.q-rung-4 { transition-duration: var(--dur-4); }
.q-rung-5 { transition-duration: var(--dur-5); }
.q-rung-7 { transition-duration: var(--dur-7); }
.q-rung-8 { transition-duration: var(--dur-8); }

/* THE HUMAN CLAUSE — the reader's own setting outranks every effect above, and so does the site's ◈ fold. */
@media (prefers-reduced-motion: reduce) {
  .q-superposition::before, .q-superposition::after, .q-fold { transition: none; animation: none; }
}
:root[data-dim-motion="simple"] .q-superposition::before,
:root[data-dim-motion="simple"] .q-superposition::after,
:root[data-dim-motion="simple"] .q-fold { transition: none; animation: none; }
`
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
