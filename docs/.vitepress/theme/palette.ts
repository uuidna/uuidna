// palette — the site's window onto THE ONE DESIGN MATRIX (src/css.ts). Colour and type are computed there from
// the ℤ/9 sequence and the vortex orbit and served identically to the MCP, so the browser cannot render a
// different standard than a client fetching uuidna_css: same matrix, same receipt.
import { sequenceVars, matrixVars } from '../../../dist/index.js'

export { sequenceVars }

/** Set every computed matrix variable — colour AND type — on the document root (client-side only). */
export function applySequence(): void {
  if (typeof document === 'undefined') return
  const vars = matrixVars()
  for (const k in vars) document.documentElement.style.setProperty(k, vars[k])
}
