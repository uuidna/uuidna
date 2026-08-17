// palette — the site's window onto THE ONE DESIGN MATRIX (src/css.ts). Colour, type, durations and the field
// are computed there from the ℤ/9 sequence, the vortex orbit and the A432 step, and served identically to the
// MCP (uuidna_css), so the browser cannot render a different standard than a client fetching it.
// THE BACKGROUND IS THE LEDGER COMPUTING LIVE: it folds from the ledger's own receipt and count in this very
// browser, so the field a reader sees IS the sealed set, and it moves the moment a theorem lands.
import { sequenceVars, matrixVars, matrixBackground, matrixEffects, theorems, runTrial } from '../../../dist/index.js'

export { sequenceVars }

/** Set every computed matrix variable — colour, type, duration — and render the live field + effects. */
export function applySequence(): void {
  if (typeof document === 'undefined') return
  const vars = matrixVars()
  for (const k in vars) document.documentElement.style.setProperty(k, vars[k])
  // the field and the effects, computed from the ledger this page carries
  const id = 'uuidna-matrix'
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  style.textContent = matrixEffects() + matrixBackground(runTrial().receipt, theorems().length)
  document.head.appendChild(style)
}
