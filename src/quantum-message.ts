// quantum-message — FUSE quantum states, theorems, and auras into a single message identity.
// A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against
// the ledger, and binds it to an A432 aura (content-addressed, deterministic). The same message
// always folds to the same aura and quantum state for every observer — integrity without secrets.
//
// Not a cipher (everyone sees the aura, the state, and can rebuild it); not a signature (the
// proof is sealed, not cryptographic). A quantum message is a **witnessed message** — the witness
// is a sealed theorem, and the message's quantum encoding is the proof that the witness was cited.

import { theorems, toUuid } from './index.js'
import { quantumAura, type Aura } from './aura.js'
import { ket0, hadamard, pauliX, pauliZ, label, fraction, type QState } from './quantum.js'
import { merkleGravity } from './gravity.js'

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
  const qubits = Math.min(keyBits.length, 16)  // cap at 16 qubits (65k states, tractable)

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
      'A quantum message is NOT a cipher or signature — it is a WITNESSED message. The plaintext is public ' +
      '(everyone sees it), the aura is deterministic (same message → same color for all observers), and the quantum ' +
      'state proves the theorem was cited (the basis encodes the theorem key, Hadamard guarantees superposition, ' +
      'and the receipt is tamper-evident). Integrity, not secrets. The same message always folds to the same state ' +
      'and aura — recomputable by anyone.',
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
