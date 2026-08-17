// analytics — QUANTUM ANALYTICS over the sealed ledger: descriptive measures anyone RECOMPUTES identically, folded
// ORDER-INVARIANT to one receipt (the "quantum" property — the same analytics for every observer, no privileged view).
// It COMPOSES the measures already computed elsewhere (coverage, creditsSummary, the layers, the ledger fingerprint,
// the coins) rather than recomputing them (DRY), and adds the recomputed collision census. No wall-clock, no RNG, no
// telemetry, no per-user tracking — the inputs are the public ledger alone, so the numbers are the same next year and
// on every machine. HONEST SCOPE: integrity, not truth. This is DESCRIPTIVE analytics of what is sealed — counts,
// distributions, and a recomputable receipt — NOT predictive statistics, NOT inference, and NOT observation of any
// person. It measures the ledger, not a user.
import { theorems } from './theorems/index.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'
import { coins } from './captain/billing/index.js'
import { creditsSummary } from './captain/credits/index.js'
import { coverage } from './publish.js'
import { ledgerFingerprint } from './fingerprint.js'
import { hardwareLayer, softwareLayer, osLayer } from './layers.js'

export interface Distribution { principle: string; count: number; share: string }
export interface LayerMeasure { name: string; principle: string; count: number; receipt: string }

export interface QuantumAnalytics {
  theorems: number
  principles: number
  distribution: Distribution[]                 // theorems per principle, largest first — the shape of the ledger
  layers: LayerMeasure[]                        // the named stack (hardware → software → os), sizes + receipts
  credits: { historical: number; contextual: number; captainAlone: number }
  coverage: { covered: number; total: number; ready: boolean }
  coins: number                                 // the conserved fair-exchange invariant (= 2)
  collisions: { keys: number; addresses: number }  // recomputed — 0/0 or an intrusion
  integrity: { fnvReceipt: string; sha256: string; tamperCost: string }
  receipt: string                               // order-invariant fold of every sub-measure's address — the ONE analytics receipt
  honest: string
}

// the ledger is immutable at runtime — compute the analytics once and memoise (the receipt never changes at runtime).
let _cache: QuantumAnalytics | null = null

/** quantumAnalytics() → the recomputable analytics fold over the sealed ledger: counts, the per-principle
 *  distribution, the named layers, the credit tally, coverage, the coins, the collision census, and the ledger
 *  fingerprint — folded ORDER-INVARIANT to one receipt any observer recomputes to the same value. Deterministic:
 *  no clock, no RNG, no telemetry. Integrity, not truth; it measures the ledger, not a user. */
export function quantumAnalytics(): QuantumAnalytics {
  if (_cache) return _cache
  const T = theorems()
  const n = T.length

  // per-principle distribution — the shape of the ledger, largest domain first
  const byPrinciple = new Map<string, number>()
  for (const t of T) byPrinciple.set(t.principle, (byPrinciple.get(t.principle) ?? 0) + 1)
  const distribution: Distribution[] = [...byPrinciple.entries()]
    .map(([principle, count]) => ({ principle, count, share: ((count * 1000 / n | 0) / 10).toFixed(1) + '%' }))
    .sort((a, b) => b.count - a.count || (a.principle < b.principle ? -1 : 1))

  // the named stack
  const L = [hardwareLayer(), softwareLayer(), osLayer()]
  const layers: LayerMeasure[] = [
    { name: 'hardware', principle: L[0].principle, count: L[0].count, receipt: L[0].receipt },
    { name: 'software', principle: L[1].principle, count: L[1].count, receipt: L[1].receipt },
    { name: 'os', principle: L[2].principle, count: L[2].count, receipt: L[2].receipt },
  ]

  // recomputed collision census — a key or address collision would be an intrusion, never a datum
  const keys = new Set(T.map((t) => t.key))
  const addrs = new Set(T.map((t) => t.address))
  const collisions = { keys: n - keys.size, addresses: n - addrs.size }

  const cs = creditsSummary()
  const cov = coverage()
  const fp = ledgerFingerprint()

  // the ONE analytics receipt — every sub-measure's address folded ORDER-INVARIANT (a set, not a sequence), so the
  // analytics is the same for every observer regardless of the order they read it in. This is the quantum receipt.
  const receipt = merkleGravity([
    cov.receipt,
    cs.address,
    ...layers.map((l) => l.receipt),
    toUuid('analytics-fingerprint:' + fp.sha256),
    toUuid('analytics-coins:' + coins()),
    merkleFold(distribution.map((d) => toUuid(d.principle + ':' + d.count))),
  ])

  _cache = {
    theorems: n,
    principles: byPrinciple.size,
    distribution,
    layers,
    credits: { historical: cs.historical, contextual: cs.contextual, captainAlone: cs.captainAlone },
    coverage: { covered: cov.covered, total: cov.total, ready: cov.ready },
    coins: coins(),
    collisions,
    integrity: { fnvReceipt: fp.fnvReceipt, sha256: fp.sha256, tamperCost: fp.tamperCost },
    receipt,
    honest:
      'Quantum analytics: DESCRIPTIVE measures over the sealed ledger, recomputed identically by every observer and ' +
      'folded ORDER-INVARIANT to one receipt (the same analytics for everyone — no clock, no RNG, no telemetry, no ' +
      'user tracking; the inputs are the public ledger alone). It counts and distributes what is SEALED — NOT ' +
      'predictive statistics, NOT inference, NOT observation of any person. It measures the ledger, not a user. ' +
      'Integrity, not truth.',
  }
  return _cache
}
