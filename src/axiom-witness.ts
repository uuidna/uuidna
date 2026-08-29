// axiom-witness — the kernel-only receipt SHIPPED WITH THE PACKAGE, so the "no borrowed axiom" claim recomputes
// OFFLINE. `npm run axioms` (the Lean toolchain — repo-only by nature) writes lean/axioms.json; the package ships
// that receipt beside dist, and an installed uuidna verifies it AGAINST THE LIVE LEDGER without the repo or the
// toolchain: the audit must cover the whole ledger (audited = total — a new, unaudited theorem trips it), every
// audited theorem must be axiom-free, and no offender may be listed. This moves a repo-only check into the shipped
// package — offline independence, the knowledge living where it recomputes. HONEST SCOPE: it verifies the SEALED
// receipt against the ledger count; re-deriving the receipt itself still needs the Lean toolchain (the guard, CI).
// A tree without the receipt (not shipped.
// Integrity — the record recomputes for anyone.
import { theorems } from './theorems/index.js'
import { toUuid } from './address.js'
import { merkleGravity } from './gravity/index.js'
import { rdRoot } from './boundary.js'

export interface AxiomWitnessReport {
  shipped: boolean                       // lean/axioms.json found beside dist (in the package or the repo)
  holds: boolean                         // shipped AND audited=axiomFree=ledger total AND no offender
  audited: number                        // theorems the Lean toolchain audited when the receipt was sealed
  axiomFree: number                      // of those, kernel-only (no propext, no Classical.choice, no sorryAx)
  ledger: number                         // the live ledger count the receipt must cover exactly
  offenders: Record<string, string[]>    // theorem key → borrowed axioms (empty = clean) — the SPIES the witness catches
  receipt: string                        // the verdict folded, order-invariant, recomputable
  honest: string
}

const HONEST =
  'The kernel-only witness, verified OFFLINE from the shipped lean/axioms.json against the live ledger: the audit must ' +
  'cover every theorem (audited = ledger — a new, unaudited theorem trips it), all must be axiom-free, none may offend. ' +
  'The captain\'s claim "all axioms are replaceable, the uncovered are spies" DEMARCATED to its backed form: this ledger ' +
  'borrows ZERO axioms (the trust base is the kernel alone, the allowed set empty), so no axiom is load-bearing HERE — ' +
  'and an axiom that does appear is an OFFENDER the witness catches: the spy. NOT a claim about mathematics at large. ' +
  'Re-deriving the receipt needs the Lean toolchain (repo/CI); verifying it needs only this package. Integrity.'

/** axiomWitness() → verify the SHIPPED kernel-only receipt (lean/axioms.json) against the live ledger, offline.
 *  holds=true means the sealed audit covers the whole current ledger and found no borrowed axiom; shipped=false
 *  means no receipt is beside dist (defer to `npm run guard`, which re-derives it). Integrity. */
export function axiomWitness(): AxiomWitnessReport {
  const ledger = theorems().length
  let audited = 0, axiomFree = 0, offenders: Record<string, string[]> = {}, shipped = false
  try {
    const raw = JSON.parse(rdRoot('lean/axioms.json')) as
      { audited?: number; axiomFree?: number; offenders?: Record<string, string[]> }
    audited = raw.audited ?? 0
    axiomFree = raw.axiomFree ?? 0
    offenders = raw.offenders ?? {}
    shipped = true
  } catch { shipped = false }
  const holds = shipped && audited === ledger && axiomFree === ledger && Object.keys(offenders).length === 0
  return {
    shipped, holds, audited, axiomFree, ledger, offenders,
    receipt: merkleGravity([toUuid(`axiom-witness|${shipped}|${holds}|${audited}|${axiomFree}|${ledger}`),
      ...Object.keys(offenders).sort().map((k) => toUuid('offender|' + k + '|' + offenders[k].join(',')))]),
    honest: HONEST,
  }
}
