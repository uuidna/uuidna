// quantum — a CLASSICAL, EXACT state-vector simulator of quantum circuits. Ported from ceccec/millennium-solutions
// (src/2/quantum.ts) and completed the way the captain says to compute: on INTEGER POSITIONS, NO DECIMAL DRIFT
// (uuidna.com/captain/message). The upstream used 1/√2 floats; here every amplitude is a GAUSSIAN INTEGER over a
// common √(2^scale): amplitude_i = (re_i + im_i·i) / √(2^scale). That is exactly the ring ℤ[i, 1/√2] the Clifford
// gates live in — closed under X, Y, Z, S, S†, H, CNOT, CZ, SWAP, Toffoli, CCZ — so the whole simulation runs in
// BigInt with no rounding, and every measurement probability is the EXACT rational (re² + im²) / 2^scale.
//
// Verified the way the crypto tests verify: exact KNOWN-ANSWER equality, never a tolerance (see the KAT suites).
//
// Honestly bounded: exact for small systems, but the state has 2^n amplitudes — EXPONENTIAL in qubit count, the
// exact classical cost CONFIRMED by theorem n_qubit_dimension; a simulator. The uniform-scale exact rep covers the Clifford group + Toffoli/CCZ
// (permutations, Gaussian-integer phases, and H); a non-Clifford √-phase applied to only part of a superposition
// (T = diag(1, e^{iπ/4}), controlled-H, arbitrary rotations) needs per-branch scaling and is the honest boundary —
// out of this exact representation, by construction. The paradox COMPUTES as simulation.
import { gcdBigInt, toUuid } from '../address.js'
import { merkleGravity } from '../gravity/index.js'

// ── Gaussian-integer amplitudes: (re + im·i), exact, BigInt ───────────────────────────────────────────────────
/** A Gaussian-integer amplitude coefficient re + im·i (the true amplitude is this over √(2^scale)). */
export interface Cx { re: bigint; im: bigint }
const cx = (re: bigint, im: bigint = 0n): Cx => ({ re, im })
const cadd = (a: Cx, b: Cx): Cx => ({ re: a.re + b.re, im: a.im + b.im })
const csub = (a: Cx, b: Cx): Cx => ({ re: a.re - b.re, im: a.im - b.im })
const cmuli = (a: Cx): Cx => ({ re: -a.im, im: a.re })   // × i
const cmulnegi = (a: Cx): Cx => ({ re: a.im, im: -a.re }) // × (−i)
const cneg = (a: Cx): Cx => ({ re: -a.re, im: -a.im })
const cabs2 = (a: Cx): bigint => a.re * a.re + a.im * a.im // |a|² — an ordinary integer

/** A real-and-imaginary state vector, carried EXACTLY: amplitude_i = amp[i] / √(2^scale); probability_i = |amp[i]|² / 2^scale. */
import { qubitsToHexbits, computeMassGap, type MassGap } from '../hexbit/index.js'

export interface QState { amp: Cx[]; scale: number; qubits: number }

/** THE STATE'S WIDTH IN THE ARCHITECTURE'S UNIT. A hexbit is 4 bits and 16 states, 32 to the uuid, and this
 *  ledger computes in hexbits — so a register is reported in them and not only in qubits. Exact integer
 *  division, never a logarithm: 16 qubits is 4 hexbits, and the 64-hexbit cipher key falls to a 32-hexbit floor
 *  under Grover, which is one whole uuid (`key_floor_is_one_uuid`). Bits are the borrowed unit here. */
export const hexbitsOfQubits = (qubits: number): number => qubitsToHexbits(qubits)
/** An exact probability num/den (den a power of two before reduction), reduced to lowest terms. */
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
  const amp = Array.from({ length: 1 << qubits }, () => cx(0n))
  amp[0] = cx(1n)
  return { amp, scale: 0, qubits }
}

// ── single-qubit gates — apply a 2×2 map to qubit t over each pair (|…0…⟩, |…1…⟩) ─────────────────────────────
function on1(s: QState, t: number, f: (a: Cx, b: Cx) => [Cx, Cx], dScale = 0): QState {
  const amp = s.amp.slice()
  for (let i = 0; i < amp.length; i++) if (((i >> t) & 1) === 0) {
    const j = i | (1 << t), [a, b] = f(s.amp[i], s.amp[j])
    amp[i] = a; amp[j] = b
  }
  return { amp, scale: s.scale + dScale, qubits: s.qubits }
}

/** Pauli-X (NOT) on qubit t — |0⟩↔|1⟩. A permutation; scale unchanged. */
export const pauliX = (s: QState, t: number): QState => on1(s, t, (a, b) => [b, a])
/** Pauli-Z on qubit t — phase-flip |1⟩. diag(1, −1); scale unchanged. */
export const pauliZ = (s: QState, t: number): QState => on1(s, t, (a, b) => [a, cneg(b)])
/** Pauli-Y on qubit t — [[0, −i], [i, 0]]: |0⟩→i|1⟩, |1⟩→−i|0⟩. Gaussian-integer; scale unchanged. */
export const pauliY = (s: QState, t: number): QState => on1(s, t, (a, b) => [cmulnegi(b), cmuli(a)])
/** Phase S on qubit t — diag(1, i). scale unchanged. */
export const phaseS = (s: QState, t: number): QState => on1(s, t, (a, b) => [a, cmuli(b)])
/** Phase S† on qubit t — diag(1, −i). scale unchanged. */
export const phaseSdg = (s: QState, t: number): QState => on1(s, t, (a, b) => [a, cmulnegi(b)])
/** Hadamard on qubit t — (a, b) → (a+b, a−b); the ONLY gate here that raises the scale (the shared 1/√2). */
export const hadamard = (s: QState, t: number): QState => on1(s, t, (a, b) => [cadd(a, b), csub(a, b)], 1)
/** Hadamard THEN Pauli-X on the SAME qubit t, fused into one on1 pass — (a, b) → (a−b, a+b), the same two
 *  outputs hadamard already computes, just swapped (X is exactly the swap pauliX applies). Algebraically
 *  identical to `pauliX(hadamard(s, t), t)`, one O(2^n) pass and one allocation instead of two. */
export const hadamardX = (s: QState, t: number): QState => on1(s, t, (a, b) => [csub(a, b), cadd(a, b)], 1)

// ── controlled / multi-qubit gates — permutations and phases, all exact, scale unchanged ──────────────────────
const bit = (i: number, q: number): number => (i >> q) & 1
/** CNOT(control c, target t) — flip the target where the control is set (self-inverse). */
export function cnot(s: QState, c: number, t: number): QState {
  return { amp: s.amp.map((v, i) => (bit(i, c) === 1 ? s.amp[i ^ (1 << t)] : v)), scale: s.scale, qubits: s.qubits }
}
/** CZ(a, b) — phase-flip |…1…1…⟩ where both qubits are set (symmetric in a, b). */
export function cz(s: QState, a: number, b: number): QState {
  return { amp: s.amp.map((v, i) => (bit(i, a) === 1 && bit(i, b) === 1 ? cneg(v) : v)), scale: s.scale, qubits: s.qubits }
}
/** SWAP(a, b) — exchange two qubits. A permutation of the basis. */
export function swap(s: QState, a: number, b: number): QState {
  return { amp: s.amp.map((v, i) => (bit(i, a) === bit(i, b) ? v : s.amp[i ^ (1 << a) ^ (1 << b)])), scale: s.scale, qubits: s.qubits }
}
/** Toffoli CCX(c1, c2, target) — flip the target where both controls are set. Non-Clifford but a permutation, so exact. */
export function toffoli(s: QState, c1: number, c2: number, t: number): QState {
  return { amp: s.amp.map((v, i) => (bit(i, c1) === 1 && bit(i, c2) === 1 ? s.amp[i ^ (1 << t)] : v)), scale: s.scale, qubits: s.qubits }
}
/** CCZ(c1, c2, c3) — phase-flip the all-ones corner of three qubits (symmetric). */
export function ccz(s: QState, c1: number, c2: number, c3: number): QState {
  return { amp: s.amp.map((v, i) => (bit(i, c1) === 1 && bit(i, c2) === 1 && bit(i, c3) === 1 ? cneg(v) : v)), scale: s.scale, qubits: s.qubits }
}

// ── measurement / read-out — exact rationals ──────────────────────────────────────────────────────────────────
/** The exact measurement distribution: probability_i = |amp[i]|² / 2^scale, reduced. The entries sum to 1 exactly. */
export function distribution(s: QState): Prob[] {
  const den = 2n ** BigInt(s.scale)
  return s.amp.map((a) => reduce(cabs2(a), den))
}
/** The exact probability of one basis outcome i. */
export function probability(s: QState, i: number): Prob {
  return reduce(cabs2(s.amp[i]), 2n ** BigInt(s.scale))
}
/** The exact marginal probability that qubit q reads `val` — Σ of |amp|² over basis states with bit q = val. */
export function marginal(s: QState, q: number, val: 0 | 1): Prob {
  const den = 2n ** BigInt(s.scale)
  let num = 0n
  for (let i = 0; i < s.amp.length; i++) if (bit(i, q) === val) num += cabs2(s.amp[i])
  return reduce(num, den)
}
/** The exact amplitude at basis index i, as its Gaussian-integer coefficients over √(2^scale). */
export function amplitude(s: QState, i: number): { re: bigint; im: bigint; scale: number } {
  return { re: s.amp[i].re, im: s.amp[i].im, scale: s.scale }
}
/** Canonical form: while every coefficient is even and scale ≥ 2, halve them and drop the scale by 2 (a shared
 *  1/2 = two 1/√2 factors). A normalized state has Σ|amp|² = 2^scale, so no odd common factor ever appears. */
function canon(s: QState): QState {
  let amp = s.amp, scale = s.scale
  while (scale >= 2 && amp.every((c) => c.re % 2n === 0n && c.im % 2n === 0n)) {
    amp = amp.map((c) => ({ re: c.re / 2n, im: c.im / 2n })); scale -= 2
  }
  return { amp, scale, qubits: s.qubits }
}
/** Two states are EXACTLY equal (identical amplitudes incl. phase) — compared in canonical form, so no epsilon. */
export function equalState(a: QState, b: QState): boolean {
  const x = canon(a), y = canon(b)
  return x.scale === y.scale && x.amp.length === y.amp.length && x.amp.every((v, i) => v.re === y.amp[i].re && v.im === y.amp[i].im)
}

/** Is a fully-applied gate g an INVOLUTION on state s — g(g(s)) = s (self-inverse, its own undo)? The quantum
 *  analogue of dz∘dz=id: X, Y, Z, H, CNOT, CZ, SWAP, Toffoli, CCZ satisfy it; S does NOT (S has order 4, S²=Z). */
export function isInvolution(g: (s: QState) => QState, s: QState): boolean {
  return equalState(g(g(s)), s)
}

// ── canonical circuits ────────────────────────────────────────────────────────────────────────────────────────
/** The 2-qubit Bell state (|00⟩ + |11⟩)/√2 — H(q0) then CNOT(q0 → q1). The canonical entangled pair. */
export function bellState(): QState { return cnot(hadamard(ket0(2), 0), 0, 1) }
/** Born-rule integer weights |amp|² of the Bell state — read off bellState(), never a hand table. */
export function bellBornWeights(): number[] {
  return bellState().amp.map((a) => Number(a.re * a.re + a.im * a.im))
}
/** Mass gap on the Bell Born field: computeMassGap(bellBornWeights()) — Δ from the live simulator. */
export function massGapOnBellBornField(): MassGap {
  return computeMassGap(bellBornWeights())
}
/** The n-qubit GHZ state (|0…0⟩ + |1…1⟩)/√2 — H(q0) then a CNOT fan-out. Maximal multipartite entanglement. */
export function ghzState(n: number): QState {
  let s = hadamard(ket0(n), 0)
  for (let q = 1; q < n; q++) s = cnot(s, 0, q)
  return s
}

/** The quantum receipt — the ORDER-INVARIANT content-address of a state's distribution (each label → its exact
 *  probability, folded by merkle gravity). The simulation folds to ONE uuid, recomputable by anyone. */
export function receiptOf(s: QState): string {
  const d = distribution(s)
  return merkleGravity(d.map((p, i) => toUuid(label(i, s.qubits) + '=' + fraction(p))))
}
/** The Bell-state quantum receipt (the canonical one). */
export function quantumReceipt(): string { return receiptOf(bellState()) }

// ── operational: run an ARBITRARY circuit given as data, and bridge to classical systems ──────────────────────
// Gate names follow the OpenQASM / Qiskit standard so any classical system that speaks quantum circuits interops
// seamlessly: h, x, y, z, s, sdg, cx (CNOT), cz, swap, ccx (Toffoli), ccz. Qubits: control(s) first, target last.
export interface GateOp { gate: 'x' | 'y' | 'z' | 's' | 'sdg' | 'h' | 'cx' | 'cz' | 'swap' | 'ccx' | 'ccz'; qubits: number[] }

const GATES: Record<GateOp['gate'], (s: QState, q: number[]) => QState> = {
  x: (s, q) => pauliX(s, q[0]), y: (s, q) => pauliY(s, q[0]), z: (s, q) => pauliZ(s, q[0]),
  s: (s, q) => phaseS(s, q[0]), sdg: (s, q) => phaseSdg(s, q[0]), h: (s, q) => hadamard(s, q[0]),
  cx: (s, q) => cnot(s, q[0], q[1]), cz: (s, q) => cz(s, q[0], q[1]), swap: (s, q) => swap(s, q[0], q[1]),
  ccx: (s, q) => toffoli(s, q[0], q[1], q[2]), ccz: (s, q) => ccz(s, q[0], q[1], q[2]),
}

/** Run an arbitrary circuit (a list of gate ops) on |0…0⟩ of `qubits` — the general, operational entry point. */
export function runCircuit(qubits: number, ops: readonly GateOp[]): QState {
  let s = ket0(qubits)
  for (const op of ops) {
    const g = GATES[op.gate]
    if (!g) throw new Error('unknown gate: ' + op.gate)
    if (op.qubits.some((i) => !Number.isInteger(i) || i < 0 || i >= qubits)) throw new Error('qubit index out of range in ' + op.gate)
    s = g(s, op.qubits)
  }
  return s
}

// Only H turns a computational-basis state into a superposition; every other gate maps a basis state to a single
// basis state (X/Y flip, CNOT/SWAP/Toffoli permute, Z/S/S†/CZ/CCZ add a phase but keep the bitstring). So an
// H-free circuit IS a CLASSICAL REVERSIBLE function on bitstrings — and Toffoli alone is universal for it.
const superposes = (g: GateOp['gate']): boolean => g === 'h'
const swapBits = (i: number, a: number, b: number): number => (((i >> a) & 1) === ((i >> b) & 1) ? i : i ^ (1 << a) ^ (1 << b))
/** The classical action of one gate on a basis index (phase gates leave the bitstring; H has none — excluded upstream). */
function classicalStep(op: GateOp, i: number): number {
  const q = op.qubits
  switch (op.gate) {
    case 'x': case 'y': return i ^ (1 << q[0])
    case 'cx': return ((i >> q[0]) & 1) === 1 ? i ^ (1 << q[1]) : i
    case 'swap': return swapBits(i, q[0], q[1])
    case 'ccx': return ((i >> q[0]) & 1) === 1 && ((i >> q[1]) & 1) === 1 ? i ^ (1 << q[2]) : i
    default: return i // z, s, sdg, cz, ccz — a phase on the amplitude, identity on the bitstring
  }
}

/** True iff the circuit is H-free — i.e. it computes a deterministic CLASSICAL reversible function. */
export function isClassical(ops: readonly GateOp[]): boolean { return ops.every((op) => !superposes(op.gate)) }

/** The classical reversible function an H-free circuit computes: a permutation of {0 … 2^qubits−1} (input index →
 *  output index), a bijection classical systems can use directly. Throws for a circuit with H (no classical map —
 *  run it as a quantum distribution instead). This is the honest quantum→classical bridge: these gates ARE logic. */
export function classicalMap(qubits: number, ops: readonly GateOp[]): number[] {
  if (!isClassical(ops)) throw new Error('circuit contains H (superposition) — no classical function; use runCircuit + distribution')
  return Array.from({ length: 1 << qubits }, (_, i) => ops.reduce((idx, op) => classicalStep(op, idx), i))
}

/** The truth table of an H-free circuit as readable bitstrings {in, out} — the classical reversible logic, exposed. */
export function truthTable(qubits: number, ops: readonly GateOp[]): { in: string; out: string }[] {
  return classicalMap(qubits, ops).map((out, i) => ({ in: label(i, qubits), out: label(out, qubits) }))
}

/** The demonstration, computed EXACTLY (integer positions, no decimal drift — the captain's rule): the Bell
 *  correlation, no-signaling, superposition, GHZ, and two Clifford identities checked by exact state equality. */
export function report(): string {
  const bell = bellState()
  const probs = distribution(bell).map((p, i) => 'P(' + label(i, bell.qubits) + ')=' + fraction(p)).join('  ')
  const one = distribution(hadamard(ket0(1), 0))
  const ghz = distribution(ghzState(3)).map((p, i) => 'P(' + label(i, 3) + ')=' + fraction(p)).filter((x) => !x.endsWith('=0'))
  // computed identities: H·Z·H = X and S·S = Z, verified by EXACT amplitude equality (no epsilon).
  const hzh_is_x = equalState(hadamard(pauliZ(hadamard(ket0(1), 0), 0), 0), pauliX(ket0(1), 0))
  const ss_is_z = equalState(phaseS(phaseS(hadamard(ket0(1), 0), 0), 0), pauliZ(hadamard(ket0(1), 0), 0))
  let o = 'classical simulator of a quantum algorithm — the paradox computes, EXACTLY (integer positions, no decimal drift):\n\n'
  o += '  2-qubit circuit:  H(q0) · CNOT(q0→q1)  →  (|00⟩ + |11⟩)/√2\n'
  o += '  measurement probabilities (|amplitude|², exact rationals):\n'
  o += '    ' + probs + '\n'
  o += '    → perfect correlation: the two qubits always agree (both 0 or both 1).\n\n'
  o += '  no-signaling (the paradox, computed): each qubit\'s MARGINAL stays 1/2:\n'
  o += '    P(q0=0)=' + fraction(marginal(bell, 0, 0)) + '  P(q0=1)=' + fraction(marginal(bell, 0, 1)) + '  → measuring q1 sends NOTHING to q0.\n\n'
  o += '  superposition (0-and-1), one qubit:  H|0⟩ → P(0)=' + fraction(one[0]) + '  P(1)=' + fraction(one[1]) + '\n'
  o += '  GHZ(3) — three-party entanglement:  ' + ghz.join('  ') + '  (all other outcomes exactly 0)\n\n'
  o += '  Clifford identities, verified by EXACT amplitude equality (no epsilon):\n'
  o += '    H·Z·H = X : ' + hzh_is_x + '     S·S = Z : ' + ss_is_z + '\n\n'
  o += '  the quantum receipt (order-invariant content-address of the Bell distribution):\n    ' + quantumReceipt() + '\n\n'
  o += 'HONEST: this is CLASSICAL state-vector simulation — exact for small systems, but the state has\n'
  o += '2^n amplitudes, so it is EXPONENTIAL in qubit count — the exact classical cost CONFIRMED by\n'
  o += 'theorem n_qubit_dimension; a simulator. The Bell correlation carries NO\n'
  o += 'message (marginals unchanged). The paradox COMPUTES\n'
  o += 'as simulation. entails →'
  return o
}
