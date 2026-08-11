// cost — the RECOMPUTABLE cost of the ledger, computed from lean/*.lean itself, not self-reported like tokens. The
// PRODUCE cost is the size of the formal corpus (Σ bytes of each `theorem … := by decide`); the VERIFY cost is O(1)
// per theorem — recompute its content-address and compare. Anyone recomputes the SAME numbers from the SAME source,
// so the numerator is routed to the ledger, not hallucinated. Unlike uuidna_tokens (a self-report the server cannot
// observe), nothing here is on trust: the cost folds to a receipt anyone rechecks. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'

export interface CostReport {
  count: number
  formalBytes: number // Σ length of every theorem's full Lean text — the recomputable size of the formal corpus
  bytesPerTheorem: number // formalBytes / count — the recomputable cost-of-proof, no self-report
  verifyOps: number // count — one O(1) content-address recompute per theorem checks its integrity
  produceOverVerify: number // formalBytes / count — produce size against one verify op per theorem
  largest: { key: string; bytes: number } // the costliest theorem to state, recomputed
  smallest: { key: string; bytes: number }
  receipt: string // order-invariant fold of the per-theorem costs — recomputable by anyone from the same ledger
}

/** recomputableCost() → the ledger's cost, computed from itself. Deterministic: same lean/*.lean → same numbers. */
export function recomputableCost(): CostReport {
  const T = theorems()
  const count = T.length
  const costs = T.map((t) => ({ key: t.key, bytes: t.lean.length }))
  const formalBytes = costs.reduce((s, c) => s + c.bytes, 0)
  const largest = costs.reduce((m, c) => (c.bytes > m.bytes ? c : m), costs[0] || { key: '', bytes: 0 })
  const smallest = costs.reduce((m, c) => (c.bytes < m.bytes ? c : m), costs[0] || { key: '', bytes: 0 })
  return {
    count,
    formalBytes,
    bytesPerTheorem: count ? formalBytes / count : 0,
    verifyOps: count,
    produceOverVerify: count ? formalBytes / count : 0,
    largest: { key: largest.key, bytes: largest.bytes },
    smallest: { key: smallest.key, bytes: smallest.bytes },
    receipt: merkleFold(costs.map((c) => toUuid(c.key + ':' + c.bytes))),
  }
}
