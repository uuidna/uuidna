// cost — the RECOMPUTABLE cost of the ledger, computed from lean/*.lean itself, not self-reported like tokens. The
// PRODUCE cost is the size of the formal corpus (Σ bytes of each `theorem … := by decide`); the VERIFY cost is O(1)
// per theorem — recompute its content-address and compare. Anyone recomputes the SAME numbers from the SAME source,
// so the numerator is routed to the ledger, not hallucinated. Unlike uuidna_tokens (a self-report the server cannot
// observe), nothing here is on trust: the cost folds to a receipt anyone rechecks. Integrity, not truth.
import { theorems } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'

// THE THERMODYNAMIC HONESTY — where the numbers are shown, the boundary is named. A heartbeat and a formal byte are
// MACHINE-INDEPENDENT: the same on any device, so they are NOT the energy cost. The real cost is thermodynamic and
// device-dependent, bounded BELOW by Landauer's principle — erasing one bit of information costs at least kT·ln2 of
// energy, paid as heat by the device. At 300 K that floor is ≈ 2.87e-21 joules per bit; a real chip pays orders of
// magnitude more. uuidna measures the abstract work that recomputes anywhere; the physics of the device pays the
// joules. The gap between the two is not a defect to close — it is the honest line between the reproducible and the
// physical. There is no free computation: coding a bit is paid by the thermodynamics of the device used.
export const THERMODYNAMICS = {
  landauerJoulePerBitAt300K: 2.87e-21, // kT·ln2 at T=300 K — the MINIMUM energy to erase one bit (a floor, not the cost)
  note:
    'The heartbeat and the formal byte are machine-independent — the same on any device — so they are NOT the energy ' +
    'cost. The real cost is thermodynamic and device-dependent, bounded below by Landauer: erasing one bit costs at ' +
    'least kT·ln2 (≈ 2.87e-21 J at 300 K), paid as heat by the device; a real chip pays far more. uuidna measures the ' +
    'abstract, reproducible work; the physics of the device pays the joules. No computation is free.',
} as const

export interface CostReport {
  count: number
  formalBytes: number // Σ length of every theorem's full Lean text — the recomputable size of the formal corpus
  bytesPerTheorem: number // formalBytes / count — the recomputable cost-of-proof, no self-report
  verifyOps: number // count — one O(1) content-address recompute per theorem checks its integrity
  produceOverVerify: number // formalBytes / count — produce size against one verify op per theorem
  largest: { key: string; bytes: number } // the costliest theorem to state, recomputed
  smallest: { key: string; bytes: number }
  receipt: string // order-invariant fold of the per-theorem costs — recomputable by anyone from the same ledger
  thermodynamics: typeof THERMODYNAMICS // the honest boundary: the measured cost is NOT the device's energy cost
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
    thermodynamics: THERMODYNAMICS,
  }
}
