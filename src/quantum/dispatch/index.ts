// quantum/dispatch — NOTHING LEAVES EXCEPT AS A WITNESSED MESSAGE THAT PASSED THE GATE.
//
// The tree has both halves of this already and they are not joined. `gate.ts`/`slimgate.ts` decide whether a
// claim's citations are sealed; `quantum/message` encodes a claim as a witnessed quantum message bound to a
// sealed theorem. But a generator that writes a report calls NEITHER: it renders prose into a markdown block and
// the gate meets that prose later, in an audit, over a file — if the audit runs, and if the file is one it
// reads. That gap is where an overclaim lives comfortably for a few commits.
//
// So this module is the one exit. A figure that wants to be published is handed in as a CLAIM plus the sealed
// theorem that WITNESSES it, and it comes back either dispatched (a quantum message, a gate verdict, a fold) or
// REFUSED with the reason named. The emitter writes nothing until every line has passed. The gate stops being a
// thing that inspects the output afterwards and becomes the thing the output is made of.
//
// THREE CONDITIONS, AND THE THIRD IS THE ONE THAT MATTERS.
//   1. NOT DRAINED — the claim cites no theorem that is absent from the ledger. This is slimGate's one
//      decidably-false case and the only thing uuidna ever refuses outright.
//   2. THE WITNESS IS SEALED — encodeMessage refuses an unknown theorem key by throwing, so a message cannot be
//      minted against a proof that does not exist. That refusal is caught here and reported as data rather than
//      as a crash, because a generator that dies mid-write leaves a half-written derived layer behind.
//   3. THE WITNESS IS ONE THE CLAIM ACTUALLY CITES. Without this, conditions 1 and 2 are theatre: any sentence
//      could be witnessed by any sealed theorem in the ledger, and "backed by theorem bell_born_weights" would
//      attach to a claim about billing. That is citation laundering, and it is exactly the move a gate which
//      only checks that citations EXIST is blind to. So the witness must appear in the claim's own citation set.
//      This is the condition that can fail on honest code, and it is the reason to have this file.
//
// Passing this gate means the claim's citations are sealed and its witness is one of them. It
// does NOT mean the claim is true — uuidna verifies, it never refutes, and slimgate.ts says so at length. A
// VERIFIED verdict is backing, not endorsement; an UNVERIFIED claim is unbacked, not false. The quantum
// encoding adds no secrecy and no channel — secrecy lives one module over, in the sealed ChaCha20-Poly1305
// envelope (src/crypt.ts, rotating per step, and reachable from a message through sealMessage/openMessage) —
// and what the encoding here DOES add is binding: the claim and its witness fold to one deterministic message
// identity that any observer recomputes from the same claim. Everything dispatched is public by design.
import { encodeMessage, type QuantumMessage } from '../message/index.js'
import { reveal, type Reveal } from '../../gate.js'
import { merkleGravity } from '../../gravity/index.js'
import { toUuid } from '../../address.js'

/** One claim, offered for publication with the sealed theorem that witnesses it. */
export interface Claimed {
  /** the sentence as it will be published, citing its witness by key */
  claim: string
  /** the sealed theorem key that backs it — must be one the claim itself cites */
  witness: string
}

export interface Dispatch {
  claim: string
  witness: string
  verdict: Reveal['verdict']
  /** did all three conditions hold? Only a dispatched claim may be written out. */
  passed: boolean
  /** the sealed theorems the claim cites */
  cites: string[]
  /** cited keys that are NOT in the ledger — the one decidably-false case */
  fabricated: string[]
  /** the witnessed message, when one could be minted; null when the witness itself was refused */
  message: {
    id: string
    theoremAddress: string
    qubits: number
    hexbits: number
    aura: string
    fold: string
  } | null
  /** why it passed, or precisely which condition refused it */
  reason: string
}

const summarise = (m: QuantumMessage): NonNullable<Dispatch['message']> => ({
  id: m.id,
  theoremAddress: m.theoremAddress,
  qubits: m.quantum.qubits,
  hexbits: m.quantum.hexbits,
  aura: m.aura.rgb,
  fold: m.fold,
})

/** dispatch(claim, witness) → the claim as a witnessed quantum message, or a named refusal. Pure and total: it
 *  never throws, because the caller is usually a generator holding a half-built derived layer, and a thrown
 *  error there is worse than a refusal it can read and report. */
export function dispatch({ claim, witness }: Claimed): Dispatch {
  const r = reveal(claim)
  const base = { claim, witness, verdict: r.verdict, cites: r.cites, fabricated: r.fabricated }

  if (r.verdict === 'DRAINED') {
    return { ...base, passed: false, message: null,
      reason: `DRAINED — the claim cites ${r.fabricated.join(', ')}, which ${r.fabricated.length === 1 ? 'is' : 'are'} not sealed in the ledger. A citation to a proof that does not exist verifies nothing.` }
  }
  if (!r.cites.includes(witness)) {
    return { ...base, passed: false, message: null,
      reason: `WITNESS NOT CITED — the claim is offered under theorem ${witness} but cites ${r.cites.length ? r.cites.join(', ') : 'no sealed theorem at all'}. A witness the claim does not cite is a citation attached from outside, which is the one thing an existence check cannot catch.` }
  }
  let message: QuantumMessage
  try {
    message = encodeMessage(claim, witness)
  } catch (e) {
    return { ...base, passed: false, message: null,
      reason: `WITNESS NOT SEALED — no theorem ${witness} in the ledger (${e instanceof Error ? e.message : String(e)}).` }
  }
  return { ...base, passed: true, message: summarise(message),
    reason: `VERIFIED — witnessed by sealed theorem ${witness}, which the claim cites; encoded as a quantum message over ${message.quantum.qubits} qubits (${message.quantum.hexbits} hexbits). "Verified" is backing, never endorsement: it says the citation is sealed, not that the sentence is true.` }
}

export interface DispatchRun {
  dispatches: Dispatch[]
  passed: number
  refused: Dispatch[]
  /** may the caller write? False if any single claim was refused — the derived layer is all-or-nothing. */
  clear: boolean
  /** the run folded to one recomputable receipt, over the message folds of the claims that passed */
  receipt: string
}

/** dispatchAll(claims) → every claim dispatched, and one verdict for the run. `clear` is the emitter's
 *  permission to write: ONE refusal shuts the whole write, because a report that silently drops the line it
 *  could not back reads exactly like a report that had nothing to say there. */
export function dispatchAll(claims: readonly Claimed[]): DispatchRun {
  const dispatches = claims.map(dispatch)
  const refused = dispatches.filter((d) => !d.passed)
  return {
    dispatches,
    passed: dispatches.length - refused.length,
    refused,
    clear: refused.length === 0,
    receipt: merkleGravity([
      toUuid(`dispatch:${dispatches.length}:${refused.length}`),
      ...dispatches.filter((d) => d.message).map((d) => (d.message as NonNullable<Dispatch['message']>).fold),
    ]),
  }
}

/** The refusal, rendered for a build log: every refused claim with the condition that stopped it. Returns ''
 *  when the run is clear, so a caller can print it unconditionally. */
export function refusalReport(run: DispatchRun): string {
  if (run.clear) return ''
  return [
    `✗ dispatch — ${run.refused.length} of ${run.dispatches.length} claims did not pass the gate; nothing was written.`,
    ...run.refused.flatMap((d) => [`    claim: ${d.claim}`, `    ${d.reason}`, '']),
    '  FIX cite the witnessing theorem in the claim itself, or offer a witness that is sealed in the ledger.',
  ].join('\n')
}
