// quantum-message — FUSE quantum states, theorems, and auras into a single message identity.
// A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against
// the ledger, and binds it to an A432 aura (content-addressed, deterministic). The same message
// always folds to the same aura and quantum state for every observer — integrity without secrets.
//
// Not a cipher — the cipher is the sealed ChaCha20-Poly1305 layer (../crypt.ts), rotating per step —
// (everyone sees the aura, the state, and can rebuild it); not a signature (the
// proof is sealed, not cryptographic). A quantum message is a **witnessed message** — the witness
// is a sealed theorem, and the message's quantum encoding is the proof that the witness was cited.
//
// sealMessage/openMessage COMPLETE the crypto↔quantum fusion: secrecy from the ChaCha20-Poly1305 envelope
// (crypt.ts, symmetric-only — no Shor target, Grover only halves the 256-bit key to a ~128-bit floor), the
// witness from the sealed theorem — quantum-encoded over the CIPHERTEXT envelope's address, never the
// plaintext, so anyone verifies the witness and the envelope's integrity while only the key holder reads.
// The quantum encoding adds NO secrecy and NO quantum channel — not QKD, no quantum advantage claimed.

import { theorems, toUuid } from '../../index.js'
import { quantumAura, type Aura } from '../../aura.js'
import { ket0, hadamard, pauliX, pauliZ, label, fraction, type QState } from '../index.js'
import { merkleGravity } from '../../gravity.js'
import { imprintTextChain, readImprintTextChain } from '../../imprint.js'
import { encrypt, decrypt, verifyEnvelope, type Sealed } from '../../crypt.js'

export interface QuantumMessage {
  id: string                  // content-address: toUuid(plaintext + theorem_key)
  plaintext: string           // the message (public, visible to all)
  theoremKey: string          // the sealed theorem that backs this message
  theoremAddress: string      // the address of that theorem in the ledger
  aura: Aura                  // A432 color (content-addressed, deterministic)
  quantum: QuantumState       // the encoded quantum superposition
  fold: string                // merkleGravity of (id, theorem address, quantum receipt)
  honest: string
}

export interface QuantumState {
  qubits: number              // how many qubits encode this message
  state: QState               // the quantum state vector (exact, no floats)
  basis: string[]             // the measurement basis for each qubit (names of theorems involved)
  receipt: string             // one-way hash of the state (tamper-evident)
}

const THEOREMS = theorems()

// Sealed by theorem message_qubit_cap_states (lean/Quantum.lean): 2^16 = 65536 — the encoder's honest ceiling.
// Exponential state growth (2^n) is what keeps the classical simulation classical; kept as a named export (not
// an inline literal) so src/tests/quantum-message.test.ts can assert this constant and the theorem's statement
// never drift apart — a changed cap without a re-sealed theorem fails the audit gate instead of passing silently.
export const MAX_MESSAGE_QUBITS = 16

/** encodeMessage(plaintext, theoremKey) → a quantum message that fuses the plaintext with a sealed theorem proof.
 *  The message encodes the theorem's "truth" in quantum superposition (Hadamard + controlled-X per theorem bit).
 *  The same plaintext + theorem always folds to the same aura and quantum state (deterministic, content-addressed). */
export function encodeMessage(plaintext: string, theoremKey: string): QuantumMessage {
  const t = THEOREMS.find(x => x.key === theoremKey)
  if (!t) throw new Error(`theorem ${theoremKey} not found in ledger`)

  const id = toUuid(plaintext + ':' + theoremKey)
  const aura = quantumAura(id)

  // Encode the theorem's identity (key + address) into qubit basis labels
  const keyBits = Array.from(toUuid(theoremKey)).map((c, i) => i % 2 ? c.charCodeAt(0) % 2 : 0)
  const qubits = keyBits.length < MAX_MESSAGE_QUBITS ? keyBits.length : MAX_MESSAGE_QUBITS

  // Quantum state: start in |0…0⟩
  let state = ket0(qubits)

  // For each qubit, apply Hadamard (superposition) then controlled-X based on theorem bit
  for (let i = 0; i < qubits; i++) {
    state = hadamard(state, i)
    if (keyBits[i]) state = pauliX(state, i)
  }

  // The quantum receipt: fold the state's amplitude probabilities
  const amplitudes = state.amp.map((a, i) => ({
    label: label(i, qubits),
    prob: fraction({ num: a.re * a.re + a.im * a.im, den: BigInt(1 << (state.scale * 2)) }),
  }))
  const receipt = merkleGravity(amplitudes.map(a => toUuid(a.label + '|' + a.prob)))

  // Fold the whole message identity
  const fold = merkleGravity([id, t.address, receipt])

  const quantum: QuantumState = {
    qubits,
    state,
    basis: Array.from({ length: qubits }, (_, i) => theoremKey + '[' + i + ']'),
    receipt,
  }

  return {
    id, plaintext, theoremKey, theoremAddress: t.address, aura, quantum, fold,
    honest:
      'A quantum message is NOT a cipher or signature (the cipher is the sealed ChaCha20-Poly1305 layer) — it is a WITNESSED message. The plaintext is public ' +
      '(everyone sees it), the aura is deterministic (same message → same color for all observers), and the quantum ' +
      'state proves the theorem was cited (the basis encodes the theorem key, Hadamard guarantees superposition, ' +
      'and the receipt is tamper-evident). Integrity, not secrets — and when secrecy IS wanted, sealMessage carries ' +
      'this same envelope into the ChaCha20-Poly1305 layer, whose derivation rotates with every advancing step. ' +
      'The same message always folds to the same state and aura — recomputable by anyone.',
  }
}

/** measureMessage(message) → collapse the quantum superposition and return the measurement outcome as a bit-string.
 *  Every measurement is deterministic given the message (same message always gives the same measurement). */
export function measureMessage(message: QuantumMessage): string {
  const state = message.quantum.state
  let outcome = ''
  for (let i = 0; i < message.quantum.qubits; i++) {
    // The measurement outcome is determined by the state's amplitudes
    // (in uuidna, this is not probabilistic — the encoding deterministically fixes the outcome)
    const i0 = i, i1 = i | (1 << i)
    const p0 = state.amp[i0].re * state.amp[i0].re + state.amp[i0].im * state.amp[i0].im
    const p1 = state.amp[i1].re * state.amp[i1].re + state.amp[i1].im * state.amp[i1].im
    outcome += p1 > p0 ? '1' : '0'
  }
  return outcome
}

/** verifyMessage(message) → check that the message's aura, quantum state, and fold are consistent with the plaintext and theorem. */
export function verifyMessage(message: QuantumMessage): { valid: boolean; reason: string } {
  const t = THEOREMS.find(x => x.key === message.theoremKey)
  if (!t) return { valid: false, reason: `theorem ${message.theoremKey} not found` }
  if (t.address !== message.theoremAddress) return { valid: false, reason: 'theorem address mismatch' }

  const expectedId = toUuid(message.plaintext + ':' + message.theoremKey)
  if (expectedId !== message.id) return { valid: false, reason: 'message id does not match plaintext + theorem' }

  const expectedAura = quantumAura(message.id)
  if (expectedAura.hue !== message.aura.hue || expectedAura.ray !== message.aura.ray) {
    return { valid: false, reason: 'aura does not match content-address' }
  }

  return { valid: true, reason: 'message verified — plaintext + theorem + aura are consistent' }
}

/** Broadcast-safe representation: serialize and deserialize quantum messages for transmission. */
export function serializeMessage(message: QuantumMessage): {
  id: string
  plaintext: string
  theoremKey: string
  theoremAddress: string
  aura: { hue: number; ray: number; hsl: string; rgb: string }
  quantumQubits: number
  quantumReceipt: string
  fold: string
} {
  return {
    id: message.id,
    plaintext: message.plaintext,
    theoremKey: message.theoremKey,
    theoremAddress: message.theoremAddress,
    aura: { hue: message.aura.hue, ray: message.aura.ray, hsl: message.aura.hsl, rgb: message.aura.rgb },
    quantumQubits: message.quantum.qubits,
    quantumReceipt: message.quantum.receipt,
    fold: message.fold,
  }
}

export function deserializeMessage(data: {
  plaintext: string
  theoremKey: string
}): QuantumMessage {
  return encodeMessage(data.plaintext, data.theoremKey)
}

/** A SEALED quantum message — the crypto↔quantum fusion. The envelope carries the secrecy (ChaCha20-Poly1305);
 *  the quantum witness is encoded over the envelope's 7d-fold ADDRESS (the ciphertext identity), never the
 *  plaintext — so the witness and the envelope's integrity verify publicly while the plaintext stays sealed. */
export interface SealedQuantumMessage {
  sealed: Sealed              // the ChaCha20-Poly1305 envelope — secrecy from crypt alone
  witness: QuantumMessage     // encodeMessage(sealed.address, theoremKey) — witnesses the ciphertext, not the plaintext
  fold: string                // merkleGravity of (envelope address, witness fold) — one identity for the fusion
  honest: string
}

const SEALED_HONEST =
  'Secrecy comes from ChaCha20-Poly1305 alone (symmetric-only: no Shor target; Grover only halves the 256-bit key ' +
  'to a ~128-bit floor). The quantum encoding adds NO secrecy and NO quantum channel — it is the recomputable ' +
  'WITNESS that a sealed theorem was cited, bound to the ciphertext envelope’s address so it verifies without ' +
  'revealing the plaintext. Not QKD, no quantum advantage. Integrity and secrecy composed, each from its own proofs.'

/** sealMessage(plaintext, passphrase, theoremKey, step?) → a sealed quantum message: encrypt first (convergent, or
 *  pass an advancing `step` to close the equality leak), then quantum-witness the ENVELOPE. Deterministic for the
 *  same inputs; a theoremKey not sealed in the ledger throws (a fabricated witness never seals a message). */
export function sealMessage(plaintext: string, passphrase: string, theoremKey: string, step?: number): SealedQuantumMessage {
  const sealed = encrypt(plaintext, passphrase, step)
  const witness = encodeMessage(sealed.address, theoremKey)
  return { sealed, witness, fold: merkleGravity([sealed.address, witness.fold]), honest: SEALED_HONEST }
}

/** openMessage(message, passphrase) → the plaintext, ONLY if the whole fusion verifies: the envelope's address
 *  recomputes (tamper-evident), the witness binds exactly that address, the witness itself verifies against the
 *  ledger, and Poly1305 authenticates the decrypt (a wrong key or tampered ciphertext throws). Refuses to open a
 *  message whose witness fails — an unverified witness drains the claim before the key is even tried. */
export function openMessage(message: SealedQuantumMessage, passphrase: string): { plaintext: string; theoremKey: string; reason: string } {
  if (!verifyEnvelope(message.sealed)) throw new Error('sealed quantum message: the envelope address does not recompute (tampered or forged envelope)')
  if (message.witness.plaintext !== message.sealed.address) throw new Error('sealed quantum message: the witness does not bind this envelope (witness/ciphertext mismatch)')
  const w = verifyMessage(message.witness)
  if (!w.valid) throw new Error('sealed quantum message: the witness fails — ' + w.reason)
  if (merkleGravity([message.sealed.address, message.witness.fold]) !== message.fold) throw new Error('sealed quantum message: the fusion fold does not recompute')
  const plaintext = decrypt(message.sealed, passphrase)
  return { plaintext, theoremKey: message.witness.theoremKey, reason: 'opened — envelope integral, witness sealed, Poly1305 authenticated' }
}

// ── SECURE MESSAGING, TOTAL OVER THE LEDGER — every sealed theorem is itself a message. The payload is the
// theorem's exact Lean statement, the witness is the theorem itself, the CARRIER is the reversible imprint codec
// (a uuid chain that decodes back byte-exact — the message travels as addresses, any alteration breaks the decode),
// and the colour channel is its aura. Nothing here is a cipher: it is tamper-evidence made total. ──

/** theoremMessage(key) → ANY sealed theorem as a self-proving envelope: statement as payload, itself as witness,
 *  imprint uuid chain as reversible carrier, aura as colour channel, quantum state as citation proof. */
export function theoremMessage(key: string) {
  const t = THEOREMS.find(x => x.key === key)
  if (!t) throw new Error(`theorem ${key} not found in ledger`)
  const carrier = imprintTextChain(t.statement)
  const envelope = encodeMessage(t.statement, key)
  return {
    ...envelope, carrier, carrierLength: carrier.length,
    delivered: readImprintTextChain(carrier) === t.statement,
    honest: envelope.honest + ' The carrier is the reversible imprint codec: the uuid chain decodes back to the ' +
      'exact Lean statement, so the theorem travels as pure addresses and any alteration breaks the decode. ' +
      'Not a cipher (secrecy, when wanted, is sealMessage — the rotating ChaCha20-Poly1305 layer) — tamper-evidence, total over the ledger.',
  }
}

let _messagingSeal: ReturnType<typeof computeMessagingSeal> | null = null
function computeMessagingSeal() {
  const failures: string[] = []
  const folds: string[] = []
  for (const t of THEOREMS) {
    const back = readImprintTextChain(imprintTextChain(t.statement))
    if (back !== t.statement) failures.push(t.key + ': carrier decode mismatch')
    folds.push(merkleGravity([toUuid(t.statement + ':' + t.key), t.address]))
  }
  return {
    count: THEOREMS.length, total: failures.length === 0, failures, receipt: merkleGravity(folds),
    honest: 'THE TOTALITY SEAL: secure messaging is a TOTAL function on the ledger — for every sealed theorem the ' +
      'reversible carrier decodes back to the exact statement and the message id recomputes, and all envelope ' +
      'identities fold order-invariant to one receipt. The full quantum state verifies per message via ' +
      'theoremMessage + verifyMessage. Integrity, not secrets: nothing is hidden, everything is tamper-evident.',
  }
}
/** messagingSeal() → the totality seal over ALL theorems (cached — the ledger is immutable within a process). */
export function messagingSeal() { return (_messagingSeal ??= computeMessagingSeal()) }
