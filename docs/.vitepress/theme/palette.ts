// palette — the site's window onto THE ONE DESIGN MATRIX (src/css.ts). Colour, type and durations are computed
// there from the ℤ/9 sequence, the vortex orbit and the A432 step, and served identically to the
// MCP (uuidna_css), so the browser cannot render a different standard than a client fetching it.
// Stock VitePress background only — matrixBackground (radial glow + q-drift) is not injected.
import { sequenceVars, matrixVars, matrixEffects } from '../../../dist/index.js'

export { sequenceVars }

/** Set every computed matrix variable — colour, type, duration — and register toy effect classes (no body field). */
export function applySequence(): void {
  if (typeof document === 'undefined') return
  const vars = matrixVars()
  for (const k in vars) document.documentElement.style.setProperty(k, vars[k])
  const id = 'uuidna-matrix'
  if (document.getElementById(id)) return
  const style = document.createElement('style')
  style.id = id
  // Effects only (superposition / fold toys). Do not paint matrixBackground body::before lobes.
  style.textContent = matrixEffects()
  document.head.appendChild(style)
}
