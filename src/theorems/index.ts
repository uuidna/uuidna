// The theorem ledger — ONE source of truth tying the tools to the theorems, and the theorems to their Lean 4
// proofs. Each theorem is self-proving in code (a falsifiable test) and carries its formula; the algebraic ones
// carry a real `by decide` Lean proof (verified sorry-free in lean/Uuidna.lean). The function-KAT theorems
// (FNV address, gate, SHA-256, ChaCha, merkle…) carry lean: null HONESTLY — "only algebra in Lean"; a Lean proof
// there would be native_decide over a full port, which is real but pending, never claimed here. runTrial()
// adjudicates them all and folds the proof-of-verdict roots to ONE receipt. Integrity, not truth. 0/7.
import { adjudicate, proveVerdict, type VerdictKind } from '../adjudicate.js'
import { merkleGravity } from '../gravity.js'
import { theorem as t_units } from './units_z9/index.js'
import { theorem as t_vortex } from './vortex_orbit/index.js'
import { theorem as t_mod9 } from './mod9_arithmetic/index.js'
import { theorem as t_diamond } from './diamond_involution/index.js'
import { theorem as t_digitalroot } from './digital_root/index.js'
import { COMPUTATIONAL } from './computational/index.js'

export interface Theorem { key: string; formula: string; statement: string; lean: string | null; prove: () => boolean }

// the Lean-backed flagship theorems (each with a verified `by decide` proof) + the computational ledger.
export const THEOREMS: readonly Theorem[] = [t_units, t_vortex, t_mod9, t_diamond, t_digitalroot, ...COMPUTATIONAL]

export interface TheoremVerdict { key: string; statement: string; formula: string; lean: string | null; verdict: VerdictKind; receipt: string; proofRoot: string }
export interface TrialResult { count: number; sealed: number; refuted: number; unverified: number; leanBacked: number; receipt: string; verdicts: TheoremVerdict[] }

/** Run the whole ledger through the trial: adjudicate each theorem WITH its self-proving test, fold every
 *  proof-of-verdict root through the order-invariant gravity to ONE receipt. Recomputable by anyone. */
export function runTrial(): TrialResult {
  const verdicts: TheoremVerdict[] = THEOREMS.map((t) => {
    const v = adjudicate(t.statement, t.prove)
    const pv = proveVerdict(t.statement, [v.receipt])
    return { key: t.key, statement: t.statement, formula: t.formula, lean: t.lean, verdict: v.verdict, receipt: v.receipt, proofRoot: pv.proofRoot }
  })
  const receipt = merkleGravity(verdicts.map((v) => v.proofRoot))
  const by = (k: VerdictKind) => verdicts.filter((v) => v.verdict === k).length
  return { count: verdicts.length, sealed: by('SEALED'), refuted: by('REFUTED'), unverified: by('UNVERIFIED'), leanBacked: THEOREMS.filter((t) => t.lean !== null).length, receipt, verdicts }
}

/** The ledger, by reference — each theorem's key, statement, formula, and Lean proof (or null). */
export function theorems(): { key: string; statement: string; formula: string; lean: string | null }[] {
  return THEOREMS.map((t) => ({ key: t.key, statement: t.statement, formula: t.formula, lean: t.lean }))
}
