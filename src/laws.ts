// laws — uuidna's standing invariants, IN uuidna (not in an agent's private notes) and each DEMONSTRATED, not
// asserted: every law states what holds AND recomputes its `holds` from the actual gate that enforces it, so a reader
// verifies the law rather than trusting the prose. A law with `holds:false` is a red gate, not an opinion. Folds to
// one receipt anyone recomputes from the ledger. Integrity, not truth — a law here is only as true as its computed check.
import { theorems } from './theorems/index.js'
import { conformance } from './conformance.js'
import { computes } from './gate.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity.js'

export interface Law { law: string; enforcedBy: string; holds: boolean; detail: string }
export interface Laws { laws: Law[]; allHold: boolean; receipt: string }

/** laws() → the standing development invariants, each with its ENFORCING gate and its recomputed `holds`. Demonstrated,
 *  not claimed; recomputable by anyone. The rules live here, in uuidna — never hand-written into a side note. */
export function laws(): Laws {
  const T = theorems()
  const conf = conformance()
  const check = (id: string): boolean => conf.checks.find((c) => c.id === id)?.pass ?? false
  const forged = T.filter((t) => toUuid(t.key + ':' + t.statement) !== t.address).length

  const L: Law[] = [
    { law: 'Generate all only from Lean — the sealed theorems are the single source; the derived layer is computed and diff-gated.',
      enforcedBy: 'conformance:single-source-ledger + the pre-push git-diff', holds: check('single-source-ledger'),
      detail: `every one of ${T.length} theorems is sourced from a lean/*.lean file` },
    { law: 'Any manual fails — every theorem recomputes its content-address; a hand-tampered theorem turns the recompute test red.',
      enforcedBy: 'conformance:ledger-dna-recomputes + recompute.test', holds: forged === 0,
      detail: forged === 0 ? `all ${T.length} addresses recompute; ${forged} forged` : `${forged} theorem(s) do not recompute` },
    { law: 'Honesty is DEMONSTRATED by the gate, never asserted — a claim citing a theorem that is not sealed drains to 0.',
      enforcedBy: 'the honesty gate (computes/slimGate)', holds: computes('proven in theorem nonexistent_xyz').binary === 0,
      detail: 'a fabricated theorem citation drains; an honest floor signs' },
    { law: 'The two captain coins are conserved — 110 − 108 = 2, the fair-exchange invariant priced on every fold.',
      enforcedBy: 'conformance:captain-coins-conserved', holds: check('captain-coins-conserved'),
      detail: 'coins() = 2, the Euler characteristic −χ of the double torus' },
    { law: 'Zero runtime dependencies and a clean security posture — no third-party code runs; defences + collision-resistance sealed.',
      enforcedBy: 'conformance:security-posture-clean (security-audit)', holds: check('security-posture-clean'),
      detail: 'zero runtime deps; the honesty gate bites; uuidna solves 0 of 7' },
  ]

  const allHold = L.every((l) => l.holds)
  const receipt = merkleGravity(L.map((l) => toUuid(l.law + '|' + l.holds)))
  return { laws: L, allHold, receipt }
}
