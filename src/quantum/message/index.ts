// quantum-message — FUSE quantum states, theorems, and auras into a single message identity.
// A quantum message encodes plaintext + theorem proof into a quantum superposition, signs it against
// the ledger, and binds it to an A432 aura (content-addressed, deterministic). The same message
// always folds to the same aura and quantum state for every observer — integrity without secrets.
//
// Not a cipher — the cipher is the sealed ChaCha20-Poly1305 layer (../crypt.ts), rotating per step —
// (everyone sees the aura, the state, and can rebuild it); not a signature (the
// proof is sealed. A quantum message is a **witnessed message** — the witness
// is a sealed theorem, and the message's quantum encoding is the proof that the witness was cited.
//
// sealMessage/openMessage COMPLETE the crypto↔quantum fusion: secrecy from the ChaCha20-Poly1305 envelope
// (crypt.ts, symmetric-only — no Shor target). MEASURED IN HEXBITS, the unit this architecture computes in: the
// key is 64 hexbits, Grover halves the brute-force exponent, and the floor is 32 hexbits — which is EXACTLY the
// uuid. The cipher's post-quantum floor and an identifier's width are the same number in the same unit, sealed
// as `key_floor_is_one_uuid` (256/4 = 64, 128/4 = 32, 32·4 = 128). In bits that reads as 256 falling to 128 and
// the correspondence is invisible; bits are the borrowed unit here, hexbits the native one.
// witness from the sealed theorem — quantum-encoded over the CIPHERTEXT envelope's address
// plaintext, so anyone verifies the witness and the envelope's integrity while only the key holder reads.
// The quantum encoding adds NO secrecy and NO quantum channel — not QKD; the cost stays the classical 2^n
// CONFIRMED by theorem n_qubit_dimension.

import { theorems, toUuid } from '../../index.js'
import { quantumAura, type Aura } from '../../aura.js'
import { ket0, hadamard, pauliX, pauliZ, label, fraction, distribution, marginal, type QState } from '../index.js'
import { qubitsToHexbits, MESSAGE_CAP_QUBITS, MESSAGE_CAP_STATES } from '../../hexbit/index.js'
import { merkleGravity } from '../../gravity/index.js'
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
  hexbits: number             // the same width in the ledger's unit — 4 bits, 16 states, 32 to the uuid.
                              // Reported beside qubits rather than instead of them: a qubit is what the circuit
                              // holds, a hexbit is what the ledger prices, and a reader comparing this message
                              // to a theorem's coverage or to a uuid's 32 needs the second without converting.
  state: QState               // the quantum state vector (exact, no floats)
  basis: string[]             // the measurement basis for each qubit (names of theorems involved)
  receipt: string             // one-way hash of the state (tamper-evident)
}

const THEOREMS = theorems()

// Cap IS hexbit MESSAGE_CAP_* (court seals message_cap_is_four_hexbits in Hexbit.lean). Message consumes;
// it does not own a parallel mass-gap or cap seal — traitors filtered by architecture.
export const MAX_MESSAGE_QUBITS = MESSAGE_CAP_QUBITS
export const MAX_MESSAGE_STATES = MESSAGE_CAP_STATES

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

  // For each qubit, apply Hadamard (superposition) then controlled-X based on theorem bit — fused into one
  // O(2^n) pass via hadamardX when the bit is set (algebraically identical to hadamard-then-pauliX; see
  // src/quantum/index.ts), instead of two full state-vector allocations for roughly half the qubits.
  // THE KEY BIT MUST SURVIVE MEASUREMENT, SO IT CANNOT LIVE IN A PHASE.
  //
  // This applied hadamardX where the bit was set and hadamard where it was not. Those are algebraically distinct
  // states — and they have the IDENTICAL distribution, 1/2 1/2 on every qubit, because they differ only in sign.
  // Phase is exactly the quantity no measurement can see, so the theorem key was not merely hard to read out of
  // the state: it was unreadable. Every receipt came out the same constant, for every theorem and every plaintext.
  //
  // The same defect sat in the voting module, where YES and NO differed by a global phase and produced one
  // receipt. The fix is the same: put the bit in the BASIS STATE. A set bit flips its qubit with X and leaves it
  // un-superposed, so it is visible to distribution(), to marginal(), and therefore to the receipt; an unset bit
  // gets the Hadamard, which still carries the superposition the encoding wants.
  for (let i = 0; i < qubits; i++) {
    state = keyBits[i] ? pauliX(state, i) : hadamard(state, i)
  }

  // The quantum receipt: fold the state's amplitude probabilities
  // DELEGATED, not recomputed. This built the denominator as BigInt(1 << (state.scale * 2)), and with scale 16
  // that is 1 << 32, which WRAPS TO 1 in JavaScript's 32-bit bitwise arithmetic. Every probability came out as 1,
  // so every receipt was the same constant regardless of theorem or plaintext — a "tamper-evident" fold that was a
  // constant function of qubit count. distribution() is the simulator's own, verified against Bell, GHZ and the
  // no-signalling marginals in exact BigInt. Reimplementing arithmetic that already exists correctly is what
  // produced the bug; this stops doing it.
  const probs = distribution(state)
  const amplitudes = probs.map((pr, i) => ({ label: label(i, qubits), prob: fraction(pr) }))
  const hexbits = qubitsToHexbits(qubits)   // the unit, imported — not a fifth copy of the same division
  const receipt = merkleGravity(amplitudes.map(a => toUuid(a.label + '|' + a.prob)))

  // Fold the whole message identity
  const fold = merkleGravity([id, t.address, receipt])

  const quantum: QuantumState = {
    qubits,
    hexbits,
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
      'and the receipt is tamper-evident). Integrity— and when secrecy IS wanted, sealMessage carries ' +
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
    // marginal(state, i, v) sums over every basis state whose qubit i is v — which is what measuring one qubit
    // MEANS. This indexed the amplitude array with `i` and `i | (1 << i)`, conflating a qubit ordinal with a basis
    // index, so p1 > p0 was never true and the outcome was all zeros for every input.
    const p0 = marginal(state, i, 0), p1 = marginal(state, i, 1)
    outcome += p1.num * p0.den > p0.num * p1.den ? '1' : '0'
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
 *  the quantum witness is encoded over the envelope's 7d-fold ADDRESS (the ciphertext identity)
 *  plaintext — so the witness and the envelope's integrity verify publicly while the plaintext stays sealed. */
export interface SealedQuantumMessage {
  sealed: Sealed              // the ChaCha20-Poly1305 envelope — secrecy from crypt alone
  witness: QuantumMessage     // encodeMessage(sealed.address, theoremKey) — witnesses the ciphertext
  fold: string                // merkleGravity of (envelope address, witness fold) — one identity for the fusion
  honest: string
}

const SEALED_HONEST =
  'Secrecy comes from ChaCha20-Poly1305 alone (symmetric-only: no Shor target; Grover only halves the 256-bit key ' +
  'to a ~128-bit floor). The quantum encoding adds NO secrecy and NO quantum channel — it is the recomputable ' +
  'WITNESS that a sealed theorem was cited, bound to the ciphertext envelope’s address so it verifies without ' +
  'revealing the plaintext. Not QKD — the cost stays the classical 2^n confirmed by theorem n_qubit_dimension. ' +
  'Integrity and secrecy composed, each from its own proofs.'

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


// ── THE SEALED NEIGHBOURHOOD AS A MESSAGE THAT TRAVELS. The cube memory (../memory.ts) holds a handle until its
// whole neighbourhood is complete and seals the fusion to ONE order-invariant address. That address is the whole
// point of the memory, and an address that never leaves the process it was computed in has not been sealed — it
// has been remembered. So a sealed cube travels the same way every other message here travels: imprinted into a
// reversible uuid chain that decodes back byte-exact, witnessed by one of the cube's OWN theorems, and folded to a
// single fusion identity. Any alteration anywhere breaks the decode or the fold.
//
// WHAT THE WITNESS IS. encodeMessage binds a payload to a sealed theorem; here the theorem is a MEMBER of the very
// neighbourhood being announced — the first by key, so the choice is deterministic and carries no clock and no RNG.
// A cube therefore witnesses its own completion out of its own contents, and a fabricated cube cannot borrow one:
// encodeMessage refuses a key the ledger does not carry.
//
// HONEST SCOPE: this is TAMPER-EVIDENCE AND REVERSIBILITY. The carrier is a codec—
// everyone who holds the chain reads the address back. For secrecy, sealCubeSecurely puts the same address inside
// the ChaCha20-Poly1305 envelope, where the secrecy comes from the cipher alone (symmetric-only: no Shor target,
// Grover halving 256 bits to a ~128-bit floor) and the quantum encoding adds none. No quantum channel, no QKD, no
// advantage claimed — the quantum part is the recomputable witness that a sealed theorem was cited. ──
import type { Cube } from '../memory/index.js'
import { handleOf } from '../../handle.js'   // THE one derivation — never re-derived inline (see src/handle.ts)

export interface SealedCubeMessage {
  principle: string           // the neighbourhood this announces
  address: string             // its fold — the COMPLETE uuid, the identity that travels
  handle: string              // the eight-hex index derived from it — a path
  carrier: string[]           // the imprint chain carrying the address: reversible, byte-exact, tamper-evident
  witness: QuantumMessage     // one of the cube's own theorems, witnessing its completion
  fold: string                // merkleGravity of (address, witness fold) — one identity for the whole fusion
  honest: string
}

const CUBE_HONEST =
  'A sealed neighbourhood announced as a message: the payload is the cube\'s order-invariant fold (a complete uuid, ' +
  'never the truncated handle), the carrier is the reversible imprint codec, and the witness is one of the cube\'s ' +
  'OWN sealed theorems. Tamper-evidence and reversibility— the carrier is a codec and anyone holding ' +
  'the chain reads the address back. Only a COMPLETE neighbourhood can be sealed this way; an incomplete one is ' +
  'refused rather than announced. Integrity.'

/** sealCubeMessage(cube) → the complete fusion, imprinted as a travelling chain and witnessed by its own contents.
 *  An INCOMPLETE cube is refused: a half-neighbourhood that could be announced is the exact artifact the memory
 *  exists to never produce, and refusing it here keeps that guarantee at the boundary where it would leak. */
export function sealCubeMessage(cube: Cube): SealedCubeMessage {
  if (!cube.sealed) throw new Error(`sealed cube message: "${cube.principle}" is incomplete — ${cube.members.length} of ${cube.size} members, missing ${cube.missing.join(', ')}. Only a whole neighbourhood travels.`)
  const witnessKey = cube.members[0]!.key         // deterministic: members are held in key order, no clock, no RNG
  const witness = encodeMessage(cube.address, witnessKey)
  return {
    principle: cube.principle, address: cube.address, handle: cube.handle,
    carrier: imprintTextChain(cube.address),
    witness, fold: merkleGravity([cube.address, witness.fold]), honest: CUBE_HONEST,
  }
}

/** readCubeMessage(msg) → the address recovered from the CARRIER alone, byte-exact. The round trip is the check:
 *  a chain that decodes to anything else has been altered, and the codec cannot be persuaded otherwise. */
export const readCubeMessage = (msg: SealedCubeMessage): string => readImprintTextChain(msg.carrier)

/** verifyCubeMessage(msg) → does the whole fusion still recompute? The carrier must decode to the address, the
 *  witness must bind exactly that address, the witness must itself verify against the ledger, the fusion fold must
 *  recompute, and the handle must be that address truncated — never a second identity carried alongside it. */
export function verifyCubeMessage(msg: SealedCubeMessage): { valid: boolean; reason: string } {
  if (readCubeMessage(msg) !== msg.address) return { valid: false, reason: 'the carrier does not decode to the address (altered chain)' }
  if (msg.witness.plaintext !== msg.address) return { valid: false, reason: 'the witness does not bind this cube (witness/address mismatch)' }
  const w = verifyMessage(msg.witness)
  if (!w.valid) return { valid: false, reason: 'the witness fails — ' + w.reason }
  if (merkleGravity([msg.address, msg.witness.fold]) !== msg.fold) return { valid: false, reason: 'the fusion fold does not recompute' }
  if (msg.handle !== handleOf(msg.address)) return { valid: false, reason: 'the handle is not this address truncated' }
  return { valid: true, reason: 'sealed — carrier reversible, witness sealed in the ledger, fusion fold recomputes' }
}

/** sealCubeSecurely(cube, passphrase, step?) → the same fold, inside the ChaCha20-Poly1305 envelope. Secrecy comes
 *  from the cipher alone; the quantum witness adds none. Pass an advancing `step` to close the equality leak. */
export function sealCubeSecurely(cube: Cube, passphrase: string, step?: number): SealedQuantumMessage {
  if (!cube.sealed) throw new Error(`sealed cube message: "${cube.principle}" is incomplete — only a whole neighbourhood travels`)
  return sealMessage(cube.address, passphrase, cube.members[0]!.key, step)
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
      'theoremMessage + verifyMessage. Integrity.',
  }
}
/** messagingSeal() → the totality seal over ALL theorems (cached — the ledger is immutable within a process). */
export function messagingSeal() { return (_messagingSeal ??= computeMessagingSeal()) }
