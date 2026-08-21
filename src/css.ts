// css — THE ONE DESIGN MATRIX, computed and served. Colour and type are the same arithmetic: the ℤ/9 sequence
// anchored on its fixed point (5 → green, the heart the diamond reflection holds) sets every hue, and the vortex
// orbit sets every rung of the type ladder. Nothing here is authored — no hex literal, no pixel value — so the
// site, the design system and any MCP client read ONE standard that cannot drift between them. Emitted as CSS
// custom properties under `:root`, folded to a receipt: two surfaces rendering the same matrix compute the same
// receipt, or they are not the same matrix. Exact integer arithmetic; no host intrinsics, no wall-clock.
import { toUuid, vortexOrbit, digitalRoot, BASE, TRINITY, A432_STEP } from './address.js'
import { seedOf, handleOf } from './handle.js'   // THE one address→integer derivation — see handle.ts
import { DIAMOND_FIXED } from './diamond.js'
import { typeScaleVars } from './typography.js'
import { coins } from './captain/billing/index.js'

const fdiv = (a: number, b: number): number => (a - (a % b)) / b
const milli = (num: number, den: number): string => {
  const m = fdiv(num * 1000, den)
  const whole = fdiv(m, 1000)
  return whole + '.' + String(m - whole * 1000 + 1000).slice(1)
}

/** the palette — ONE hue law with the aura: the A432 step (360/9 = 40° per digit), saturation the trinity's
 *  complement ((9−3)/9), lightness the diamond's fixed point over the base (5/9 — the heart as a fraction).
 *  Nothing chosen: every number is a constant the ledger already exports. */
export function sequenceVars(): Record<string, string> {
  const HEART = DIAMOND_FIXED[0] ?? 5                       // 5 — the fixed point of dz(x) = 10−x
  const ORBIT = [...new Set(vortexOrbit())].length          // 6 — the order of 2 in ℤ/9* (order_of_two_is_six)
  const SECTOR = fdiv(360, ORBIT)                           // 60° — the colour wheel's own sector, and the orbit's
  const ANCHOR = coins() * SECTOR                           // 120° — GREEN: the two coins, one sector each
  const sat = fdiv((BASE - TRINITY) * 100, BASE)            // (9−3)/9 → 66%
  const light = fdiv(HEART * 100, BASE)                     // 5/9 → 55%
  // THE ANCHOR IS THE ACCOUNTING that was missing: a bare d·A432 hue is anchored at zero, which lands green on
  // the trinity digit 3 and leaves the fixed point adrift. The strip turns AROUND its heart, so the hue does too:
  // the heart takes the anchor (green at 120° = coins × sector) and every other digit steps from it by A432.
  // Then 2 → 0° (red) and its dz-mirror 8 → 240° (blue): the poles of the strand, on the poles of the wheel.
  const hue = (d: number) => ((ANCHOR + (d - HEART) * A432_STEP) % 360 + 360) % 360
  const vars: Record<string, string> = {}
  for (let d = 1; d <= BASE; d++) vars['--seq-' + d] = 'hsl(' + hue(d) + ' ' + sat + '% ' + light + '%)'
  vars['--seq-center'] = 'hsl(' + hue(HEART) + ' ' + sat + '% ' + fdiv(light * (BASE - 1), BASE) + '%)'
  vars['--seq-light'] = 'hsl(' + hue(HEART) + ' ' + fdiv(sat, 2) + '% ' + fdiv(light * 3, 2) + '%)'
  vars['--seq-dark'] = 'hsl(' + hue(HEART) + ' ' + sat + '% ' + fdiv(light * 2, 3) + '%)'
  vars['--seq-last'] = 'hsl(' + hue(BASE - HEART) + ' ' + sat + '% ' + fdiv(light * 5, 4) + '%)'
  return vars
}

/** every variable of the matrix — colour and type in one map, the whole standard */
export function matrixVars(): Record<string, string> {
  return { ...sequenceVars(), ...typeScaleVars(), ...durationVars() }
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

/** THE EFFECTS — every value DERIVED, none chosen: the dz involution picks the pairs, the two coins set the
 *  weights and the half turn, the vortex sets the durations, the trinity sets the layers. Named for what the
 *  arithmetic does, never for physics. */
export function matrixEffects(): string {
  const C = coins()                                   // 2 — the conserved measure (two_coins)
  const halfTurn = fdiv(360, C)                       // 180deg — a turn divided by the coins (the involution)
  const weight = milli(1, C)                          // 0.500 — each of C equal states (coin_is_one_qubit)
  const mid = fdiv(100, C)                            // 50% — the keyframe midpoint, the same halving
  const rungs = [...new Set(vortexOrbit())].sort((a, b) => a - b)
  // the dz mirror pairs (d, 10−d) with d below its mirror — the involution chooses them, not an author
  const pairs: Array<[number, number]> = []
  for (let d = 1; d <= BASE; d++) { const m = 10 - d; if (d < m && m <= BASE) pairs.push([d, m]) }

  const superposed = pairs.map(([a, b]) => `.q-superposition-${a}::before { background: var(--seq-${a}); }
.q-superposition-${a}::after  { background: var(--seq-${b}); }`).join('\n')
  const ladder = rungs.map((d) => `.q-rung-${d} { transition-duration: var(--dur-${d}); }`).join('\n')

  return `
/* THE SPEED LAW (engineering, not arithmetic — named as such): every effect below animates ONLY \`transform\`
   and \`opacity\`, the two properties a compositor runs without returning to layout or paint. Nothing here
   animates a property that forces the pipeline, and every timing function is linear — no invented curve. */

/* q-superposition — C = ${C} STATES HELD AT ONCE, each at weight 1/${C} = ${weight}: a digit and its dz-mirror
   (10−d) layered. One rule per mirror pair; the involution chose the pairs, not an author. */
.q-superposition { position: relative; isolation: isolate; }
.q-superposition::before,
.q-superposition::after {
  content: ''; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  opacity: ${weight};
  transition: opacity var(--dur-${rungs[2] ?? rungs[0]}) linear;
  will-change: opacity;
}
${superposed}

/* q-collapse — THE MEASUREMENT: hover or focus resolves the superposition to ONE state (weight 1, the other 0).
   Opacity only, so the collapse costs the compositor and nothing else. */
.q-superposition:hover::before, .q-superposition:focus-within::before { opacity: 1; }
.q-superposition:hover::after,  .q-superposition:focus-within::after  { opacity: 0; }

/* q-entangled — elements carrying the same digit read the SAME computed hue: no animation, no message passed,
   no correlation beyond sharing one source. The address announces; nothing signals. Width = the coins. */
.q-entangled { border-inline-start: ${C}px solid var(--seq-center); }

/* q-fold — the involution made visible: a turn of 360/${C} = ${halfTurn}deg at the ${mid}% midpoint, and back.
   Applied twice it is the identity, which is the whole claim. TRANSFORM only. */
@keyframes q-fold { ${mid}% { transform: rotateY(${halfTurn}deg); } }
.q-fold { animation: q-fold var(--dur-${rungs[rungs.length - 1]}) linear; transform-style: preserve-3d; will-change: transform; }

/* q-rung — the type ladder read as time: each rung carries its own duration from the vortex. */
${ladder}

/* THE HUMAN CLAUSE — the reader's own setting outranks every effect above, and so does the site's ◈ fold. */
@media (prefers-reduced-motion: reduce) {
  .q-superposition::before, .q-superposition::after, .q-fold { transition: none; animation: none; }
}
:root[data-dim-motion="simple"] .q-superposition::before,
:root[data-dim-motion="simple"] .q-superposition::after,
:root[data-dim-motion="simple"] .q-fold { transition: none; animation: none; }
`
}

/** THE BACKGROUND IS THE LEDGER, COMPUTING LIVE — the field is folded from the ledger's own receipt and count,
 *  so it is not decoration applied to the theorems but the theorems rendered: the hue is the receipt's digital
 *  root stepped by A432, the lobes sit on the vortex digits, the drift takes one second per orbit digit, and
 *  the whole field re-derives the moment a theorem lands and moves the receipt. Artistic, and exact. */
export function matrixBackground(receipt: string, theorems: number): string {
  const root = digitalRoot(theorems)                    // the ledger's own digit — moves as the ledger grows
  const seed = digitalRoot(seedOf(toUuid(receipt)))   // was a BigInt route computing this same number
  const hue = (seed * A432_STEP) % 360                  // the same A432 law as every other hue
  const mirror = (10 - seed) % BASE
  const rungs = [...new Set(vortexOrbit())].sort((a, b) => a - b)
  const drift = rungs[rungs.length - 1] * BASE          // seconds: the last rung, one turn per orbit digit
  const opacity = milli(1, BASE * TRINITY)              // 1/27 — the trinity of the base, a whisper
  return `
/* the field: folded from receipt ${handleOf(toUuid(receipt))} over ${theorems} sealed theorems — it moves when they do */
body::before {
  content: ''; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background:
    radial-gradient(closest-side, hsl(${hue} 70% 55% / ${opacity}), transparent ${100 - BASE * TRINITY}%) ${root * BASE}% ${mirror * BASE}% / ${BASE * TRINITY * 2}% ${BASE * TRINITY * 2}% no-repeat,
    radial-gradient(closest-side, hsl(${(hue + 180) % 360} 70% 55% / ${opacity}), transparent ${100 - BASE * TRINITY}%) ${100 - root * BASE}% ${100 - mirror * BASE}% / ${BASE * TRINITY * 2}% ${BASE * TRINITY * 2}% no-repeat;
  animation: q-drift ${drift}s linear infinite;
  will-change: transform;
}
@keyframes q-drift { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { body::before { animation: none; } }
:root[data-dim-motion="simple"] body::before { animation: none; }
`
}

export interface MatrixCss { css: string; vars: number; receipt: string; honest: string }

/** the matrix as a stylesheet — the served standard, with the receipt that proves two surfaces share it */
export function matrixCss(): MatrixCss {
  const vars = matrixVars()
  const keys = Object.keys(vars).sort()
  const body = keys.map((k) => '  ' + k + ': ' + vars[k] + ';').join('\n')
  const css = ':root {\n' + body + '\n}\n' + matrixEffects()
  return {
    css,
    vars: keys.length,
    receipt: toUuid(css),
    honest: 'computed from the ℤ/9 sequence and the vortex orbit — no hex literal, no pixel value is authored; a surface that renders a different receipt is rendering a different matrix',
  }
}
