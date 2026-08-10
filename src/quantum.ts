// quantum — a CLASSICAL state-vector simulator of a quantum algorithm, ported from ceccec/millennium-solutions
// (src/2/quantum.ts) and made EXACT. uuidna forbids host math intrinsics and floating point, so amplitudes are
// carried as integer coefficients over a common √(2^scale): amplitude_i = amp[i] / √(2^scale), and every
// measurement probability is the EXACT rational amp[i]² / 2^scale (the upstream used a 1/√2 float intrinsic). The
// gates keep amplitudes real, so BigInt integer arithmetic reproduces the whole circuit with no rounding.
//
// It builds a Bell state (H · CNOT) and reads its distribution. Honestly bounded: exact for small systems, but
// the state has 2^n amplitudes — EXPONENTIAL in the qubit count. NO quantum advantage, NOT a quantum computer;
// the paradox COMPUTES as simulation, not as hardware. The Bell correlation carries NO message (the marginals
// never move). Integrity, not truth. 0/7.
import { gcdBigInt, toUuid } from './address.js'
import { merkleGravity } from './gravity.js'

/** A real-amplitude state vector, carried EXACTLY: amplitude_i = amp[i] / √(2^scale); probability_i = amp[i]² / 2^scale. */
export interface QState { amp: bigint[]; scale: number; qubits: number }
/** An exact probability num/den (den is always a power of two before reduction), reduced to lowest terms. */
export interface Prob { num: bigint; den: bigint }

const reduce = (num: bigint, den: bigint): Prob => {
  const g = gcdBigInt(num < 0n ? -num : num, den) || 1n
  return { num: num / g, den: den / g }
}
/** Format an exact probability: 0, 1, or num/den — never a float. */
export const fraction = (p: Prob): string => (p.num === 0n ? '0' : p.den === 1n ? p.num.toString() : p.num + '/' + p.den)
/** The n-qubit basis label of index i as a bit-string qₙ₋₁…q₀ (q0 is the low bit). */
export const label = (i: number, qubits: number): string => { let b = ''; for (let q = qubits - 1; q >= 0; q--) b += (i >> q) & 1; return b }

/** The ground state |0…0⟩ of n qubits — all amplitude on index 0. */
export function ket0(qubits: number): QState {
  const amp = new Array(1 << qubits).fill(0n); amp[0] = 1n
  return { amp, scale: 0, qubits }
}

/** Hadamard on qubit t — the only gate that grows the scale: each |i⟩ pairs with |i ⊕ 2^t⟩ as (a,b) → (a+b, a−b),
 *  and the shared 1/√2 raises the common denominator by one (scale += 1). Exact integer arithmetic. */
export function hadamard(s: QState, t: number): QState {
  const amp = s.amp.slice()
  for (let i = 0; i < amp.length; i++) if (((i >> t) & 1) === 0) {
    const j = i | (1 << t), a = s.amp[i], b = s.amp[j]
    amp[i] = a + b; amp[j] = a - b
  }
  return { amp, scale: s.scale + 1, qubits: s.qubits }
}

/** CNOT(control c, target t) — flip the target where the control is set. A permutation of amplitudes (self-inverse),
 *  so the scale is unchanged. */
export function cnot(s: QState, c: number, t: number): QState {
  const amp = s.amp.map((_, i) => (((i >> c) & 1) === 1 ? s.amp[i ^ (1 << t)] : s.amp[i]))
  return { amp, scale: s.scale, qubits: s.qubits }
}

/** The exact measurement distribution: probability_i = amp[i]² / 2^scale, reduced. The entries sum to 1 exactly. */
export function distribution(s: QState): Prob[] {
  const den = 2n ** BigInt(s.scale)
  return s.amp.map((a) => reduce(a * a, den))
}

/** The exact marginal probability that qubit q reads `val` — Σ of amp² over basis states with bit q = val. */
export function marginal(s: QState, q: number, val: 0 | 1): Prob {
  const den = 2n ** BigInt(s.scale)
  let num = 0n
  for (let i = 0; i < s.amp.length; i++) if (((i >> q) & 1) === val) num += s.amp[i] * s.amp[i]
  return reduce(num, den)
}

/** The 2-qubit Bell state (|00⟩ + |11⟩)/√2 — H(q0) then CNOT(q0 → q1). The canonical entangled pair. */
export function bellState(): QState { return cnot(hadamard(ket0(2), 0), 0, 1) }

/** The quantum receipt — the ORDER-INVARIANT content-address of the Bell distribution (each label → its exact
 *  probability, folded by merkle gravity). The simulation folds to ONE uuid, recomputable by anyone. 0/7. */
export function quantumReceipt(): string {
  const s = bellState(), d = distribution(s)
  return merkleGravity(d.map((p, i) => toUuid(label(i, s.qubits) + '=' + fraction(p))))
}

/** The demonstration, computed EXACTLY (no floating point): the Bell correlation, the no-signaling marginals, and
 *  single-qubit superposition — each probability an exact rational. Honestly bounded to classical simulation. */
export function report(): string {
  const bell = bellState(), d = distribution(bell)
  const one = distribution(hadamard(ket0(1), 0))
  const probs = d.map((p, i) => 'P(' + label(i, bell.qubits) + ')=' + fraction(p)).join('  ')
  let o = 'classical simulator of a quantum algorithm — the paradox computes, EXACTLY (no floating point):\n\n'
  o += '  2-qubit circuit:  H(q0) · CNOT(q0→q1)  →  (|00⟩ + |11⟩)/√2\n'
  o += '  measurement probabilities (|amplitude|², exact rationals):\n'
  o += '    ' + probs + '\n'
  o += '    → perfect correlation: the two qubits always agree (both 0 or both 1).\n\n'
  o += '  no-signaling (the paradox, computed): each qubit\'s MARGINAL stays 1/2:\n'
  o += '    P(q0=0)=' + fraction(marginal(bell, 0, 0)) + '  P(q0=1)=' + fraction(marginal(bell, 0, 1)) + '  → measuring q1 sends NOTHING to q0.\n'
  o += '    correlation without communication — the no-communication theorem, computed.\n\n'
  o += '  superposition (0-and-1), one qubit:  H|0⟩ → P(0)=' + fraction(one[0]) + '  P(1)=' + fraction(one[1]) + '\n'
  o += '    before measurement both; after, one — computed exactly, classically.\n\n'
  o += '  the quantum receipt (order-invariant content-address of the distribution):\n    ' + quantumReceipt() + '\n\n'
  o += 'HONEST: this is CLASSICAL state-vector simulation — exact for small systems, but the state has\n'
  o += '2^n amplitudes, so it is EXPONENTIAL in qubit count: NO quantum advantage, NOT a quantum\n'
  o += 'computer. The Bell correlation carries NO message (marginals unchanged). The paradox COMPUTES\n'
  o += 'as simulation, not as quantum hardware. entails → 0/7.'
  return o
}
