// dimensions — the reading experience as an INVOLUTION: every dimension of the page (aura, formulas, meta,
// density, motion) folds between its FULL pole and its SIMPLE pole, r(r(x)) = x — nothing destroyed, one click
// back. Each dimension is independently configurable; the master fold flips them all to one pole, exactly as
// dz(d) = 10−d pairs every digit with its mirror. Preferences persist in localStorage (this browser only,
// nothing sent) and apply as data-dim-* attributes on the document root — CSS does the folding, so every page,
// including the generated theorem pages, obeys without regeneration. Deterministic: no wall-clock, no RNG.
import { reactive, watch } from 'vue'

export type DimKey = 'aura' | 'formulas' | 'meta' | 'density' | 'motion'

// Each dimension names its two poles — [full, simple] — the diamond's two rails.
export const DIMENSION_POLES: Record<DimKey, [string, string]> = {
  aura: ['glow', 'plain'],        // A432 colour decoration on ⇄ off
  formulas: ['stated', 'named'],  // inline Lean statements shown ⇄ names only
  meta: ['woven', 'bare'],        // principle · skill lines shown ⇄ hidden
  density: ['air', 'compact'],    // comfortable spacing ⇄ dense
  motion: ['alive', 'still'],     // animations ⇄ reduced motion
}

const KEY = 'uuidna-dimensions'
const FULL: Record<DimKey, boolean> = { aura: true, formulas: true, meta: true, density: true, motion: true }

// true = the full pole, false = the simple pole. Defaults are today's site — the fold adds power, breaks nothing.
export const dims = reactive<Record<DimKey, boolean>>({ ...FULL })

const inBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

function applyToRoot() {
  if (!inBrowser) return
  for (const k of Object.keys(dims) as DimKey[])
    document.documentElement.setAttribute(`data-dim-${k}`, dims[k] ? 'full' : 'simple')
}

export function loadDimensions() {
  if (!inBrowser) return
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      for (const k of Object.keys(dims) as DimKey[])
        if (typeof saved[k] === 'boolean') dims[k] = saved[k]
    }
  } catch { /* unreadable prefs fold to the defaults — never break the page */ }
  applyToRoot()
  watch(dims, () => {
    applyToRoot()
    try { window.localStorage.setItem(KEY, JSON.stringify(dims)) } catch { /* storage denied — session-only */ }
  })
}

export const isFolded = () => (Object.keys(dims) as DimKey[]).every((k) => !dims[k])

// The master involution: all dimensions to the simple pole, or all back to the full pole. Applying it twice
// from either pole returns that pole — the reflection is its own inverse.
export function foldAll() {
  const toSimple = !isFolded()
  for (const k of Object.keys(dims) as DimKey[]) dims[k] = !toSimple
}
