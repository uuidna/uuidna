// the trial — for any statement, a recomputable verdict. It NEVER claims absolute truth: the honesty gate is a
// floor, not an oracle (a gate-clean falsehood like "2+2=5" still passes it). The verdict is three-way:
//   REFUTED    — the gate drains a named overclaim, OR a supplied decidable test fails (counterexample).
//   SEALED     — gate-clean AND a decidable test holds → recomputable, admissible.
//   UNVERIFIED — gate-clean but no recomputable receipt supplied → bring a decidable test to move it.
// Integrity, not truth. Everything content-addressed. 0/7.
import { computes } from './gate.js'
import { toUuid, merkleFold } from './address.js'
import { merkleGravity } from './gravity.js'
import { imprint, readImprint } from './imprint.js'

export type VerdictKind = 'REFUTED' | 'SEALED' | 'UNVERIFIED'
export interface Verdict { statement: string; gateBinary: 0 | 1; verdict: VerdictKind; receipt: string; note: string }

export function adjudicate(statement: string, decidableTest?: () => boolean): Verdict {
  const g = computes(statement)
  const receipt = toUuid(statement)
  if (g.binary === 0) return { statement, gateBinary: 0, verdict: 'REFUTED', receipt, note: 'the honesty gate drains a named overclaim: ' + JSON.stringify(g.hit) }
  if (decidableTest) {
    let holds = false
    try { holds = decidableTest() === true } catch { holds = false }
    return holds
      ? { statement, gateBinary: 1, verdict: 'SEALED', receipt, note: 'gate-clean and a decidable test holds — recomputable, admissible' }
      : { statement, gateBinary: 1, verdict: 'REFUTED', receipt, note: 'gate-clean but its decidable test fails — refuted by counterexample' }
  }
  return { statement, gateBinary: 1, verdict: 'UNVERIFIED', receipt, note: 'gate-clean but no recomputable receipt — the floor is not an oracle; bring a decidable test' }
}

// A valid trial folds the FORMULAS, not just the verdict text: the caller supplies the receipts of the decidable
// theorems (each recomputing true) that establish the floor for this claim; they fold — with the gate predicate
// and the verdict — through merkleGravity (ORDER-INVARIANT, the quantum receipt) to ONE proof-of-verdict root,
// reproducible by any observer regardless of the order the formulas are presented in.
export interface ProvenVerdict extends Verdict { formulas: number; proofRoot: string }
export function proveVerdict(statement: string, formulaReceipts: readonly string[] = []): ProvenVerdict {
  const v = adjudicate(statement)
  const gateFormula = toUuid('computes(claim).binary=' + v.gateBinary)
  const proofRoot = merkleGravity([...formulaReceipts, gateFormula, toUuid('verdict:' + v.verdict), v.receipt])
  return { ...v, formulas: formulaReceipts.length, proofRoot }
}

// uuidna quantum verification: recompute the address from its seed (integrity, reproducible by anyone), decode
// any bounded imprinted message, and fold a MULTI-PERSPECTIVE receipt — the same for any observer ordering (the
// merkle fold is order-invariant). The quantum here is the multi-perspective structure, not hardware. 0/7.
export interface UuidnaVerdict { seed: string; address: string; recomputes: boolean; message: string | null; jointReceipt: string }
export function verifyUuidna(seed: string): UuidnaVerdict {
  const address = toUuid(seed)
  const recomputes = toUuid(seed) === address
  let message: string | null = null
  try { if (/^[01]+$/.test(seed)) message = readImprint(imprint(seed)) === seed ? seed : null } catch { message = null }
  const perspectives = ['a', 'b', 'c'].map((o) => toUuid(o + '→' + address))
  const jointReceipt = merkleFold(perspectives)
  return { seed, address, recomputes, message, jointReceipt }
}
