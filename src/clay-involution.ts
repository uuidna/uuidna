// clay-involution — INSTANCE of the agnostic zenodo-seals registry (id: clay-involution).
// Constants re-export the seal so Lean headers / school / credits stay stable; the seal itself
// lives in zenodo-seals.ts so clay is not a one-off deposit path.
import { theorems } from './theorems/index.js'
import { zenodoSealById } from './zenodo-seals.js'

const seal = zenodoSealById('clay-involution')
if (!seal) throw new Error('zenodo-seals registry missing clay-involution instance')

export const CLAY_INVOLUTION_DOI = seal.standingDoi
export const CLAY_INVOLUTION_CONCEPT_DOI = seal.conceptDoi ?? '10.5281/zenodo.21781602'
export const CLAY_INVOLUTION_RECORD_ID = seal.standingRecordId ?? '21781603'
export const CLAY_INVOLUTION_CONCEPT_ID = seal.conceptId ?? '21781602'
export const CLAY_INVOLUTION_DOI_URL = `https://doi.org/${CLAY_INVOLUTION_DOI}`
export const CLAY_INVOLUTION_RECORD_URL = `https://zenodo.org/records/${CLAY_INVOLUTION_RECORD_ID}`
export const CLAY_INVOLUTION_TITLE = seal.title
export const CLAY_UUIDNA_ARTICLE_URL = seal.pageUrl
export const CLAY_UUIDNA_ORIGIN = 'https://uuidna.com'
export const CLAY_UUIDNA_REPO = 'https://github.com/uuidna/uuidna'

/**
 * What Clay.lean reaches, COUNTED RATHER THAN ASSERTED.
 *
 * This used to end with a typed sentence — "solves none" — which is an opinion in a string constant. A hand-typed
 * verdict is the manual judgement this tree refuses everywhere else: nobody recomputes it, nothing breaks when it
 * stops being true, and it reads as a measurement because it sits beside two DOIs that are. So it is measured.
 *
 * THE DISTINCTION IS THE LEDGER'S OWN, not one invented here. `reach_quantifier_census` already splits every
 * statement in the ledger into those that WALK a domain the kernel can enumerate and those that QUANTIFY over one
 * it cannot, and it recomputes that split per wing from the statements themselves. This asks the same question of
 * one wing, so the answer moves when the wing does.
 */
/**
 * The seven, as the Clay Mathematics Institute named them in 2000 — a convention, collected, not a list
 * invented here. A wing theorem is a PROBLEM WINDOW when its own sentence opens with one of them; anything
 * else in the file is the wing talking about itself and is counted apart rather than folded in.
 */
const MILLENNIUM = [
  'P vs NP', 'Riemann', 'Birch–Swinnerton-Dyer', 'Poincaré', 'Yang–Mills', 'Navier–Stokes', 'Hodge',
] as const

export function clayScope(): {
  problems: number
  windows: number
  quantified: number
  other: number
} {
  const clay = theorems().filter((t) => t.file === 'Clay.lean')
  const opensWith = (t: { name?: string }): string | undefined =>
    MILLENNIUM.find((p) => (t.name ?? '').startsWith(p))
  const windows = clay.filter((t) => opensWith(t) !== undefined)
  return {
    problems: new Set(windows.map((t) => opensWith(t))).size,
    windows: windows.length,
    quantified: windows.filter((t) => /∀|∃/.test(t.statement)).length,
    other: clay.length - windows.length,
  }
}

/**
 * Short credit line for headers / PRINCIPLE / school — DOI first, then the live clay surface.
 *
 * THE SCOPE IS THE DEPOSIT'S OWN WORDS, not a verdict written here. The record this cites states it exactly:
 * "A Lean by-decide proof SOLVES the statement it states, to the standard mathematics uses: the finite window
 * is settled, machine-checked, and depends on no axiom beyond the kernel. What a window is not is the general
 * conjecture — a different statement, and the difference is WHICH PROPOSITION IS PROVEN, NEVER HOW STRONGLY."
 *
 * Both halves travel together or neither is honest. Dropping the first half understates a machine-checked,
 * axiom-free proof as though it were provisional; dropping the second lets a window be read as the conjecture.
 * The counts are measured so the sentence cannot drift from the wing.
 */
export function clayInvolutionCite(): string {
  const { problems, windows, quantified } = clayScope()
  return (
    `Prior art (initial clay σ-involution): DOI ${CLAY_INVOLUTION_DOI} ` +
    `(${CLAY_INVOLUTION_RECORD_URL}). uuidna Clay.lean seals ${String(windows)} finite window(s) across ` +
    `${String(problems)} Millennium problem(s), each SOLVING the statement it states — machine-checked and ` +
    `axiom-free, depending on no axiom beyond the kernel; ${String(quantified)} quantify over an unbounded ` +
    `domain. A window is not the general conjecture; the difference is which proposition is proven, never how ` +
    `strongly.`
  )
}
