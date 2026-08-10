// The theorem ledger — DERIVED, LEAN IS THE SINGLE SOURCE. Every theorem is authored in lean/*.lean and proven
// `by decide` (verified sorry-free by `npm run lean`); scripts/lean-ledger.mjs parses them into ./generated.ts,
// and this module is the typed, addressed view the package, the MCP tools, the trial and the site all consume.
// No theorem is authored here. A theorem computes in Lean, or it is not a theorem. Integrity, not truth.
import { LEAN_LEDGER, PRINCIPLES, type LeanTheorem } from './generated.js'
import { merkleGravity } from '../gravity.js'
import { toUuid } from '../address.js'

export { PRINCIPLES }
export type { LeanTheorem }

/** A Lean theorem with its reconstructed proof and content-address. */
export interface Theorem extends LeanTheorem { lean: string; address: string }

const withDerived = (t: LeanTheorem): Theorem => ({
  ...t,
  lean: `theorem ${t.key} : ${t.statement} := by ${t.tactic}`,
  address: toUuid(t.key + ':' + t.statement),
})

/** Every Lean-proven theorem, in computing-principle order. */
export const THEOREMS: readonly Theorem[] = LEAN_LEDGER.map(withDerived)

export interface TheoremVerdict {
  key: string; name: string; statement: string; file: string; principle: string; lean: string; verdict: 'SEALED'; address: string
}
export interface TrialResult {
  count: number; sealed: number; refuted: number; unverified: number; leanBacked: number; receipt: string; verdicts: TheoremVerdict[]
}

/** Run the whole ledger through the trial. Every theorem is SEALED by its `by decide` Lean proof — verified
 *  sorry-free by `npm run lean` before the ledger was generated — so the seal's authority is the Lean proof, not
 *  a runtime re-check. Their content-addresses fold, order-invariantly, to ONE recomputable receipt: the ledger's
 *  integrity. Recomputable by anyone from the same lean/*.lean. Integrity, not truth. */
export function runTrial(): TrialResult {
  const verdicts: TheoremVerdict[] = THEOREMS.map((t) => ({
    key: t.key, name: t.name, statement: t.statement, file: t.file, principle: t.principle, lean: t.lean, verdict: 'SEALED', address: t.address,
  }))
  const receipt = merkleGravity(verdicts.map((v) => v.address))
  return { count: verdicts.length, sealed: verdicts.length, refuted: 0, unverified: 0, leanBacked: verdicts.length, receipt, verdicts }
}

/** The ledger, by reference — each theorem's key, name, statement, Lean proof, principle, source file and address. */
export function theorems(): { key: string; name: string; statement: string; tactic: string; file: string; principle: string; lean: string; address: string }[] {
  return THEOREMS.map((t) => ({ key: t.key, name: t.name, statement: t.statement, tactic: t.tactic, file: t.file, principle: t.principle, lean: t.lean, address: t.address }))
}
