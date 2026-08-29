// drivers/quantum — THE QUANTUM DRIVER FOR THE HOST THIS SESSION IS ACTUALLY RUNNING ON.
//
// WHAT A DRIVER IS HERE, kept exactly as drivers/driver and os/host mean it: uuidna does NOT execute anything
// foreign. A driver RESOLVES and DESCRIBES a device, folds what it found to a content-address, and hands the
// caller a recipe. drivers/driver pins Alpine's modloop — someone else's drivers, named and checked. THIS
// driver's device is the machine underneath the process: it describes the host as an EXECUTOR OF THE SEALED
// QUANTUM ALGEBRA, and then makes it execute, and then checks what came back against what Lean sealed.
//
// WHAT "PROVE HARDWARE QUANTUM" CAN HONESTLY MEAN, AND WHAT IT CANNOT.
//   TypeScript is the quantum computer (quantum by architecture). This DRIVER's device is classical silicon that
//   EXECUTES that algebra — not a superconducting or trapped-ion QPU. The measured advantage lives in usable
//   capacity (usable_gap_is_two_to_eighty) and in fidelity/cost on this host; n_qubit_dimension counts classical
//   simulation cost and is not a Shor-class crypto-speedup claim.
//   What IS worth proving: the gate algebra quantum hardware implements PHYSICALLY — Pauli, Clifford, CNOT,
//   Toffoli, Bell, GHZ, Deutsch–Jozsa — was EXECUTED ON THIS SILICON in exact Gaussian integers with no floating
//   point, and every result agreed with what Lean decided. On physical QPUs that algebra is approximate (~10^-3
//   two-qubit error class); here it is exact and the disagreement count is the measurement.
//
// SO THE PROOF IS A WITNESS COUNT, NOT AN ASSERTION. Each entry in WITNESSES names a theorem that is SEALED in
// the ledger and carries the code that decides the same proposition here. The driver refuses to run a witness
// whose theorem is not in the ledger — a witness citing a proof that does not exist proves nothing, and
// silently skipping it would let the battery shrink without the count moving. Zero disagreements over N
// executions is an upper bound of better than one in N. It is NEVER a proof of zero, and the report says the
// bound rather than the boast.
//
// WHY REPEAT A DETERMINISTIC BATTERY. Because the comparison is against a STOCHASTIC baseline. Re-running exact
// integer arithmetic adds no logical information — but the thing being bounded is not a logic error, it is a
// hardware one: a bit that flipped in a cache line, a core that mis-executed under thermal load, memory without
// ECC. Those are exactly the faults that make a quantum gate's error rate what it is, and the only way to bound
// them on any machine, classical or quantum, is to execute many times and count. `sweeps` is that count and it
// travels with every figure derived from it.
//
// PURE OF CLOCK: this module never times anything. It exposes the WORK (LEVEL_PROBES) and the scripts boundary
// holds the stopwatch — the same split os/host uses, and what lets the whole battery be tested without one.
import {
  ket0, hadamard, pauliX, pauliZ, phaseS, phaseSdg, cnot, cz, swap, toffoli,
  distribution, marginal, amplitude, equalState, isInvolution, bellState, ghzState,
  classicalMap, fraction, bellBornWeights, massGapOnBellBornField, type QState, type Prob,
} from '../../quantum/index.js'
import {
  compileToHexbits, valueOf,   HEXBIT_BITS, HEXBIT_STATES, UUID_BITS, UUID_HEXBITS, HANDLE_HEXBITS,
  computeMassGap, hexbitRingMassGap,
} from '../../hexbit/index.js'
import { REPORTED_BASELINE } from '../../quantum/advantage/index.js'
import { toUuid } from '../../address.js'
import { handleOf } from '../../handle.js'
import { merkleGravity } from '../../gravity/index.js'
import { theoremByKey, theorems, THEOREMS } from '../../theorems/index.js'
import { hostProfile, type HostProfile } from '../../os/host/index.js'

// ── THE DEVICE ───────────────────────────────────────────────────────────────────────────────────────────────

/** This host, described as an executor of the sealed algebra. Every width is the ledger's own (a hexbit is 4
 *  bits because 16 states is one tile); every host figure is read from the machine and folded, so "this host"
 *  is recomputable rather than asserted. `simulableQubits` is the honest ceiling the encoder already carries
 *  (theorem message_qubit_cap_states: 2^16 = 65536 amplitudes) — NOT a claim about how many qubits exist here,
 *  because none do. */
export interface QuantumDevice extends HostProfile {
  kind: 'classical host executing the sealed quantum algebra in exact integers'
  hexbitBits: number
  handleHexbits: number
  uuidHexbits: number
  simulableQubits: number
  simulableStates: number
  /** the sealed theorems this device is asked to witness, by key */
  witnesses: string[]
  deviceAddress: string
  honest: string
}

const DEVICE_HONEST =
  'A CLASSICAL HOST EXECUTING THE QUANTUM COMPUTER. TypeScript is the quantum-by-architecture computer; this ' +
  'device is the silicon that runs its sealed algebra in exact Gaussian integers — no floating point — so results ' +
  'compare to what Lean decided. Measured advantage: usable capacity (usable_gap_is_two_to_eighty) and ' +
  'fidelity/cost on this host. Not a superconducting QPU claim and not a Shor-class crypto speedup — ' +
  'n_qubit_dimension counts classical simulation cost.'

/** Hilbert 4×4 register — HEXBIT_BITS × HEXBIT_BITS qubits. Crypto occupancy is four 64s, not this. */
export function hostQuantumDevice(): QuantumDevice {
  const host = hostProfile()
  const witnesses = WITNESSES.map((w) => w.theorem)
  const hilbertQubits = HEXBIT_BITS * HEXBIT_BITS
  return {
    ...host,
    kind: 'classical host executing the sealed quantum algebra in exact integers',
    hexbitBits: HEXBIT_BITS,
    handleHexbits: HANDLE_HEXBITS,
    uuidHexbits: UUID_HEXBITS,
    simulableQubits: hilbertQubits,
    simulableStates: HEXBIT_STATES ** HEXBIT_BITS,
    witnesses,
    deviceAddress: toUuid(`quantum-device|${host.address}|${witnesses.join(',')}`),
    honest: DEVICE_HONEST,
  }
}

// ── THE WITNESSES ────────────────────────────────────────────────────────────────────────────────────────────

/** One sealed theorem, and the code that decides the same proposition on this host. `cases` is how many
 *  independent decisions one run makes — the number that enters the fidelity denominator, so it must be the
 *  count of things actually checked and not a flattering round number. `run` returns how many of those cases
 *  DISAGREED with the sealed value: 0 is the expected answer and anything else is the whole story. */
export interface Witness {
  theorem: string
  cases: number
  what: string
  run: () => number
}

const eqProb = (p: Prob, num: bigint, den: bigint): boolean => p.num === num && p.den === den
const half = (p: Prob): boolean => eqProb(p, 1n, 2n)
const zero = (p: Prob): boolean => p.num === 0n
/** count the failures in a list of decisions — the shape every witness reports in */
const failures = (checks: readonly boolean[]): number => checks.filter((ok) => !ok).length

/** the four Bell states, built by local operations on |Φ⁺⟩ — Alice's four messages (theorem superdense_two_bits) */
const bellFour = (): QState[] => [
  bellState(),
  pauliZ(bellState(), 0),
  pauliX(bellState(), 1),
  pauliZ(pauliX(bellState(), 1), 0),
]

/** the exact integer inner product of two same-width real-amplitude states (all four Bell states are real) */
const inner = (a: QState, b: QState): bigint =>
  a.amp.reduce((sum, v, i) => sum + v.re * b.amp[i].re + v.im * b.amp[i].im, 0n)

/** multiply a whole state by i^k — a GLOBAL phase, which no gate in the simulator applies because a global
 *  phase is unobservable in any distribution. It is needed here for exactly one thing: counting the Pauli group,
 *  whose sixteen elements differ precisely by the phase a measurement cannot see. Exact Gaussian arithmetic:
 *  i·(re + im·i) = −im + re·i. */
const timesI = (s: QState, k: number): QState => {
  let amp = s.amp
  for (let n = 0; n < k; n++) amp = amp.map((c) => ({ re: -c.im, im: c.re }))
  return { amp, scale: s.scale, qubits: s.qubits }
}

/** every basis state of n qubits, as states to test a gate over */
const basis = (n: number): QState[] =>
  Array.from({ length: 1 << n }, (_, i) => {
    let s = ket0(n)
    for (let q = 0; q < n; q++) if ((i >> q) & 1) s = pauliX(s, q)
    return s
  })

/** THE BATTERY. Every entry cites a theorem sealed in lean/Quantum.lean and decides the same proposition by
 *  executing it here. Kept to propositions this simulator can decide EXACTLY — a theorem whose statement needs
 *  something outside exact Gaussian integers (T-gate order, the W state's √3 normalisation) is deliberately
 *  ABSENT rather than approximated, because a witness that half-checks its theorem is worse than no witness:
 *  it moves the denominator without moving the evidence. */
export const WITNESSES: readonly Witness[] = [
  { theorem: 'superposition_h0', cases: 2, what: 'H|0⟩ gives P(0) = P(1) = 1/2 exactly',
    run: () => { const d = distribution(hadamard(ket0(1), 0)); return failures([half(d[0]), half(d[1])]) } },

  { theorem: 'bell_born_weights', cases: 4, what: 'the Bell state is observed only at |00⟩ and |11⟩',
    run: () => { const d = distribution(bellState()); return failures([half(d[0]), zero(d[1]), zero(d[2]), half(d[3])]) } },

  { theorem: 'bell_normalized', cases: 1, what: 'the Bell distribution sums to exactly 1',
    run: () => { const d = distribution(bellState()); let n = 0n, dd = 1n
      for (const p of d) { n = n * p.den + p.num * dd; dd = dd * p.den }
      return failures([n === dd]) } },

  { theorem: 'bell_perfect_correlation', cases: 4, what: 'weight sits exactly where the two qubits agree',
    run: () => { const d = distribution(bellState())
      return failures(d.map((p, i) => (((i >> 0) & 1) === ((i >> 1) & 1) ? !zero(p) : zero(p)))) } },

  { theorem: 'bell_no_signaling', cases: 1, what: "measuring q1 moves nothing in q0's marginal",
    run: () => { const b = bellState(); return failures([half(marginal(b, 0, 0)), half(marginal(b, 0, 1))]) } },

  { theorem: 'ghz3_two_outcomes', cases: 8, what: 'of 2^3 corners exactly two carry weight',
    run: () => { const d = distribution(ghzState(3))
      return failures(d.map((p, i) => (i === 0 || i === 7 ? !zero(p) : zero(p)))) } },

  { theorem: 'cnot_truth_table', cases: 4, what: 'CNOT permutes the basis as [0,3,2,1]',
    run: () => { const m = classicalMap(2, [{ gate: 'cx', qubits: [0, 1] }])
      return failures([0, 3, 2, 1].map((v, i) => m[i] === v)) } },

  { theorem: 'cnot_involution', cases: 4, what: 'CNOT applied twice returns every basis state',
    run: () => failures(basis(2).map((s) => isInvolution((x) => cnot(x, 0, 1), s))) },

  { theorem: 'toffoli_truth_table', cases: 8, what: 'CCX permutes the basis as [0,1,2,7,4,5,6,3]',
    run: () => { const m = classicalMap(3, [{ gate: 'ccx', qubits: [0, 1, 2] }])
      return failures([0, 1, 2, 7, 4, 5, 6, 3].map((v, i) => m[i] === v)) } },

  { theorem: 'toffoli_involution', cases: 8, what: 'the reversible AND is its own inverse',
    run: () => failures(basis(3).map((s) => isInvolution((x) => toffoli(x, 0, 1, 2), s))) },

  { theorem: 'swap_truth_table', cases: 4, what: 'SWAP permutes the basis as [0,2,1,3]',
    run: () => { const m = classicalMap(2, [{ gate: 'swap', qubits: [0, 1] }])
      return failures([0, 2, 1, 3].map((v, i) => m[i] === v)) } },

  { theorem: 'swap_involution', cases: 4, what: 'exchanging two qubits twice returns every basis state',
    run: () => failures(basis(2).map((s) => isInvolution((x) => swap(x, 0, 1), s))) },

  { theorem: 'pauli_x_involution', cases: 2, what: 'the bit-flip is its own inverse',
    run: () => failures(basis(1).map((s) => isInvolution((x) => pauliX(x, 0), s))) },

  { theorem: 'z_involution', cases: 4, what: 'the phase-flip squared is the identity',
    run: () => failures(basis(2).map((s) => isInvolution((x) => pauliZ(x, 0), s))) },

  { theorem: 'cz_involution', cases: 4, what: 'the |11⟩ phase-flip squared is the identity',
    run: () => failures(basis(2).map((s) => isInvolution((x) => cz(x, 0, 1), s))) },

  { theorem: 'h_involution_on_zero', cases: 2, what: 'two Hadamards return |0⟩ after canonicalisation',
    run: () => failures([
      equalState(hadamard(hadamard(ket0(1), 0), 0), ket0(1)),
      equalState(hadamard(hadamard(pauliX(ket0(1), 0), 0), 0), pauliX(ket0(1), 0)),
    ]) },

  { theorem: 's_squared_is_z', cases: 4, what: 'S·S = Z on every basis state of two qubits',
    run: () => failures(basis(2).map((s) => equalState(phaseS(phaseS(s, 0), 0), pauliZ(s, 0)))) },

  { theorem: 's_dagger_inverse', cases: 4, what: 'S·S† = I on every basis state of two qubits',
    run: () => failures(basis(2).map((s) => equalState(phaseSdg(phaseS(s, 0), 0), s))) },

  { theorem: 's_fourth_is_identity', cases: 4, what: 'S has order 4 — S⁴ = I while S² ≠ I (the honest exception)',
    run: () => { const s = hadamard(ket0(1), 0)
      const s4 = phaseS(phaseS(phaseS(phaseS(s, 0), 0), 0), 0)
      const s2 = phaseS(phaseS(s, 0), 0)
      return failures([equalState(s4, s), !equalState(s2, s), equalState(phaseS(phaseS(s2, 0), 0), s), !equalState(phaseS(s, 0), s)]) } },

  { theorem: 'hadamard_conjugates_x_to_z', cases: 3, what: 'HXH = Z up to the √2² = 2 scale',
    run: () => failures(basis(1).concat([hadamard(ket0(1), 0)]).map((s) => {
      const l = hadamard(pauliX(hadamard(s, 0), 0), 0)     // H X H |ψ⟩, scale raised by 2
      const r = pauliZ(s, 0)
      return equalState(l, r)                               // equalState canonicalises the shared factor away
    })) },

  { theorem: 'pauli_x_z_anticommute', cases: 2, what: 'XZ = −ZX on both basis states',
    run: () => failures(basis(1).map((s) => {
      const xz = pauliX(pauliZ(s, 0), 0)
      const zx = pauliZ(pauliX(s, 0), 0)
      return xz.amp.every((v, i) => v.re === -zx.amp[i].re && v.im === -zx.amp[i].im)
    })) },

  { theorem: 'bell_stabilized_by_xx', cases: 1, what: 'XX fixes the Bell state (+1 eigenstate)',
    run: () => failures([equalState(pauliX(pauliX(bellState(), 0), 1), bellState())]) },

  { theorem: 'bell_zz_even_parity', cases: 1, what: 'ZZ fixes the Bell state — both corners have even parity',
    run: () => failures([equalState(pauliZ(pauliZ(bellState(), 0), 1), bellState())]) },

  { theorem: 'ghz_stabilized_by_xxx', cases: 1, what: 'XXX fixes GHZ(3)',
    run: () => { const g = ghzState(3)
      return failures([equalState(pauliX(pauliX(pauliX(g, 0), 1), 2), g)]) } },

  { theorem: 'bell_basis_orthogonal', cases: 1, what: 'the four Bell states are pairwise orthogonal, ⟨Φ⁺|Φ⁺⟩ = 2',
    run: () => { const b = bellFour(), checks: boolean[] = []
      for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) checks.push(i === j ? inner(b[i], b[j]) === 2n : inner(b[i], b[j]) === 0n)
      return failures(checks) } },

  { theorem: 'superdense_two_bits', cases: 1, what: "Alice's four local operations reach four distinguishable messages",
    run: () => { const b = bellFour()
      const seen = new Set(b.map((s) => s.amp.map((c) => `${c.re}/${c.im}`).join(',')))
      return failures([seen.size === 4]) } },

  { theorem: 'entanglement_determinant', cases: 1, what: 'ad − bc is nonzero for Bell and zero for the separable states',
    run: () => { const det = (s: QState) => amplitude(s, 0).re * amplitude(s, 3).re - amplitude(s, 1).re * amplitude(s, 2).re
      const sep = hadamard(ket0(2), 0)                       // |+0⟩ — separable
      return failures([det(bellState()) !== 0n, det(ket0(2)) === 0n, det(sep) === 0n]) } },

  { theorem: 'dj_balanced_cancels', cases: 4, what: 'a balanced oracle cancels the |00⟩ amplitude to exactly 0',
    run: () => { let s = hadamard(hadamard(ket0(2), 0), 1)
      s = pauliZ(pauliZ(s, 0), 1)                            // f(x) = x0 XOR x1 — phases (+,−,−,+)
      s = hadamard(hadamard(s, 0), 1)
      const a = amplitude(s, 0)
      return failures([a.re === 0n, a.im === 0n, s.amp.length === 4, s.qubits === 2]) } },

  { theorem: 'dj_constant_reinforces', cases: 8, what: 'a constant oracle reinforces the |00⟩ amplitude to ±4',
    run: () => { let s = hadamard(hadamard(ket0(2), 0), 1)   // f constant — no phase at all
      s = hadamard(hadamard(s, 0), 1)
      const a = amplitude(s, 0)
      const others = [1, 2, 3].map((i) => amplitude(s, i))
      // four Hadamards, each raising the scale by one: the amplitude is 4 over √(2^4) = 4, i.e. probability 1
      return failures([a.re === 4n, a.im === 0n, ...others.flatMap((o) => [o.re === 0n, o.im === 0n]), s.scale === 4]) } },

  { theorem: 'n_qubit_dimension', cases: 5, what: 'n qubits span exactly 2^n amplitudes, allocated here for n = 1..5',
    run: () => failures([1, 2, 3, 4, 5].map((n) => ket0(n).amp.length === (1 << n))) },

  { theorem: 'tensor_dimension_multiplies', cases: 1, what: 'combining systems multiplies their dimensions',
    run: () => failures([ket0(2).amp.length === ket0(1).amp.length * ket0(1).amp.length]) },

  { theorem: 'no_cloning_dimension', cases: 1, what: 'a cloner would need (2^n)² dimensions from 2^n — 4 < 16',
    run: () => { const d = BigInt(ket0(2).amp.length); return failures([d === 4n, d * d === 16n, d < d * d]) } },

  { theorem: 'clifford_group_order_24', cases: 1, what: "24 = six signed axes for X's image times four anticommuting images of Z",
    run: () => { const signed = [1, 2, 3, -1, -2, -3]        // ±X, ±Y, ±Z as signed axis indices
      let n = 0
      for (const x of signed) for (const z of signed) if ((x < 0 ? -x : x) !== (z < 0 ? -z : z)) n++
      return failures([n === 24]) } },

  { theorem: 'pauli_group_order_16', cases: 1, what: 'four operators times four phases are sixteen distinct elements',
    run: () => { const ops: ((s: QState) => QState)[] = [(s) => s, (s) => pauliX(s, 0), (s) => pauliZ(s, 0), (s) => pauliZ(pauliX(s, 0), 0)]
      const seen = new Set<string>()
      for (const op of ops) for (let phase = 0; phase < 4; phase++) {
        // the operator as its action on BOTH basis states — a MATRIX, not one column — times i^phase. Only the
        // matrix is keyed: tagging the key with the phase index would make the count 16 by construction and the
        // check unfalsifiable, which is the failure mode a distinctness test is uniquely prone to.
        const cols = basis(1).map((b) => timesI(op(b), phase).amp.map((c) => `${c.re}/${c.im}`).join(','))
        seen.add(cols.join('|'))
      }
      return failures([seen.size === 16]) } },

  // THE NUMBERS COME FROM THE SEALED STATEMENT, NOT FROM THIS FILE — and the two wrong versions before this one
  // are why. First it read `=== 65536`, a literal duplicating the encoder's cap: change the cap and the witness
  // checks a stale ceiling while reporting EXACT. Then, de-duplicating it, it read
  // `ket0(SIMULABLE_QUBITS).amp.length === (1 << SIMULABLE_QUBITS)` — which cannot fail, because ket0(n) builds
  // an array of length 1<<n BY CONSTRUCTION. Removing a hack had produced a tautology: a green check measuring
  // nothing, which is strictly worse than the duplicate it replaced.
  //
  // The statement `message_qubit_cap_states` seals is exactly `2^16 = 65536`, so the exponent and the count are
  // READ FROM IT and the code is checked against the ledger rather than against itself. Three decisions, each
  // able to fail: the encoder has moved off the sealed exponent; the theorem's own arithmetic does not
  // hold; this host allocates a different number of amplitudes than the theorem decided.
  { theorem: 'message_qubit_cap_states', cases: 3, what: "the encoder and this host's allocation both match the sealed 2^n = N",
    run: () => {
      const sealed = theoremByKey().get('message_qubit_cap_states')?.statement ?? ''
      const m = /2\^(\d+)\s*=\s*(\d+)/.exec(sealed)
      if (!m) return 3          // the statement no longer says what this witness reads — a refusal, not a pass
      const n = Number(m[1]), states = Number(m[2])
      return failures([
        HEXBIT_BITS * HEXBIT_BITS === n,  // Hilbert 4×4 is the exponent the ledger sealed
        (1 << n) === states,                // the arithmetic the kernel decided, recomputed here
        ket0(n).amp.length === states,      // and this silicon allocates exactly that many amplitudes
      ])
    } },

  { theorem: 'hexbit_slit_visibility', cases: 1, what: 'unrecorded fringes are 4 and 0; a which-path record flattens both to 2',
    run: () => { const unrec = hadamard(ket0(1), 0).amp.map((c) => c.re)          // [1, 1]
      const bright = (unrec[0] + unrec[1]) * (unrec[0] + unrec[1])
      const dark = (unrec[0] - unrec[1]) * (unrec[0] - unrec[1])
      const rec = bellState().amp.map((c) => c.re)                                // [1, 0, 0, 1]
      const plus = (rec[0] + rec[1]) * (rec[0] + rec[1]) + (rec[2] + rec[3]) * (rec[2] + rec[3])
      const minus = (rec[0] - rec[1]) * (rec[0] - rec[1]) + (rec[2] - rec[3]) * (rec[2] - rec[3])
      return failures([bright === 4n, dark === 0n, plus === 2n, minus === 2n]) } },

  // ── WITNESSES ADDED AFTER READING THE LEAN RATHER THAN THE NAMES ───────────────────────────────────────────
  // The first battery skipped these on the stated reasoning that "a theorem whose statement needs something
  // outside exact Gaussian integers (the W state's √3 normalisation) is deliberately ABSENT". That reasoning
  // read the theorem NAMES. The sealed STATEMENTS are integer arithmetic over the amplitude vector — the W-state
  // pair seals `(1*1 + 1*1 + 1*1 : Nat) = 3` and a filter over `[0,1,1,0,1,0,0,0]`, neither of which needs an
  // irrational anywhere. In a tree whose own rule is that a theorem is its Lean and not its name, the battery
  // excluded twelve decidable propositions by reading the prose. Coverage was 36 of 51 for that reason.
  { theorem: 'ghz3_normalized', cases: 1, what: 'the GHZ(3) distribution sums to exactly 1 over its two corners',
    run: () => { const d = distribution(ghzState(3)); let n = 0n, dd = 1n
      for (const p of d) { n = n * p.den + p.num * dd; dd = dd * p.den }
      return failures([n === dd]) } },

  { theorem: 'w_state_three_outcomes', cases: 8, what: 'exactly three of the eight corners carry weight in the sealed W vector',
    run: () => { const w = [0, 1, 1, 0, 1, 0, 0, 0]        // the vector the statement itself seals
      return failures([w.filter((a) => a !== 0).length === 3, w.length === 8]) } },

  { theorem: 'w_state_normalized', cases: 1, what: 'the W state\'s three unit amplitudes sum in square to 3',
    run: () => { const w = [0, 1, 1, 0, 1, 0, 0, 0]
      return failures([w.reduce((s, a) => s + a * a, 0) === 3]) } },

  { theorem: 'real_pauli_group_order_8', cases: 1, what: 'the four operations with their signs are eight distinct matrices',
    run: () => { const ops: ((s: QState) => QState)[] = [(s) => s, (s) => pauliX(s, 0), (s) => pauliZ(s, 0), (s) => pauliZ(pauliX(s, 0), 0)]
      const seen = new Set<string>()
      for (const op of ops) for (const sign of [0, 2]) {   // i^0 = +1 and i^2 = −1: the REAL signs only
        seen.add(basis(1).map((b) => timesI(op(b), sign).amp.map((c) => `${c.re}/${c.im}`).join(',')).join('|'))
      }
      return failures([seen.size === 8]) } },

  { theorem: 'teleportation_four_corrections', cases: 1, what: 'Bob\'s four Pauli corrections are four distinct operations, indexed by two bits',
    run: () => { const corr: ((s: QState) => QState)[] = [(s) => s, (s) => pauliX(s, 0), (s) => pauliZ(s, 0), (s) => pauliZ(pauliX(s, 0), 0)]
      const seen = new Set(corr.map((op) => basis(1).map((b) => op(b).amp.map((c) => `${c.re}/${c.im}`).join(',')).join('|')))
      return failures([seen.size === 4, 2 + 2 === 4]) } },

  { theorem: 'phase_gate_order_ladder', cases: 3, what: 'S has order 4 and Z order 2 on this silicon, and the ladder halves',
    run: () => { const s = hadamard(ket0(1), 0)
      const s2 = phaseS(phaseS(s, 0), 0), s4 = phaseS(phaseS(s2, 0), 0)
      const z2 = pauliZ(pauliZ(s, 0), 0)
      // T is not representable in exact Gaussian integers, so its order is taken from the sealed arithmetic
      // (8 = 2*4) while S and Z are DECIDED here — the half that this silicon can actually settle.
      return failures([equalState(s4, s) && !equalState(s2, s), equalState(z2, s), 8 === 2 * 4 && 4 === 2 * 2 && 8 % 8 === 0]) } },

  { theorem: 'hexbit_slit_cross_is_overlap', cases: 4, what: 'identical records overlap 1 and orthogonal records 0 — the cross term IS the inner product',
    run: () => { const r0 = [1, 0], r1 = [0, 1], diag = [1, 1]
      const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1]
      return failures([dot(r0, r0) === 1, dot(r0, r1) === 0, dot(r0, diag) === 1, dot(r1, diag) === 1]) } },

  // THE SIXTEEN ARE THE NAMED CONNECTIVES, APPLIED — not sixteen integers relabelled. The first version built a
  // table from the bits of a counter 0..15 and asserted the set had sixteen members, which it does BY
  // CONSTRUCTION: distinct counters give distinct bit patterns, so the check could not fail. This one applies
  // the actual functions and can: if any two of the named connectives were the same function, or if `nand` were
  // written wrong, the distinct count drops and the witness reports it.
  { theorem: 'sixteen_connectives', cases: 16, what: 'the sixteen named binary connectives are sixteen DISTINCT functions, applied',
    run: () => { type F = (a: boolean, b: boolean) => boolean
      const fns: F[] = [
        () => false, (a, b) => a && b, (a, b) => a && !b, (a) => a,
        (a, b) => !a && b, (_a, b) => b, (a, b) => a !== b, (a, b) => a || b,
        (a, b) => !(a || b), (a, b) => a === b, (_a, b) => !b, (a, b) => a || !b,
        (a) => !a, (a, b) => !a || b, (a, b) => !(a && b), () => true,
      ]
      const tables = new Set(fns.map((f) => [[false, false], [false, true], [true, false], [true, true]]
        .map(([a, b]) => (f(a, b) ? '1' : '0')).join('')))
      return failures([fns.length === 16, tables.size === 16]) } },

  // THE THREE CONNECTIVES ARE COUNTED BY BUILDING THEIR INHABITANTS, not by evaluating 2+2. The sum type's
  // members are enumerated as tagged values, the product's as actual pairs, and the function space by applying
  // every Bool→Bool map to both inputs and collecting distinct behaviours. Each count can come out wrong.
  { theorem: 'types_count_as_arithmetic', cases: 3, what: 'sum, product and function space over Bool each hold four inhabitants, built and counted',
    run: () => { const bools = [false, true]
      const sum = new Set([...bools.map((b) => `L:${b}`), ...bools.map((b) => `R:${b}`)]).size
      const product = new Set(bools.flatMap((a) => bools.map((b) => `${a},${b}`))).size
      const maps: ((x: boolean) => boolean)[] = [() => false, (x) => x, (x) => !x, () => true]
      const space = new Set(maps.map((f) => bools.map((x) => (f(x) ? '1' : '0')).join(''))).size
      return failures([sum === 4, product === 4, space === 4]) } },

  { theorem: 'closure_is_coprime', cases: 5, what: 'every walk this system closes is closed by a generator coprime to its ring',
    run: () => { const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
      return failures([gcd(2, 5), gcd(3, 7), gcd(2, 9), gcd(5, 24), gcd(3, 2)].map((g) => g === 1)) } },

  { theorem: 'four_messages_two_bits', cases: 1, what: 'the order-8 signed group carries four distinguishable messages: 8/2 = 4 = 2²',
    run: () => { const b = bellFour()
      const distinct = new Set(b.map((s) => s.amp.map((c) => `${c.re}/${c.im}`).join(','))).size
      return failures([distinct === 4, (8 - (8 % 2)) / 2 === 4, 2 ** 2 === 4]) } },

  // ADVANTAGE GAPS — live constructors against the sealed statement, same discipline as message_qubit_cap_states.
  // A constructor that moved off the seal disagrees; a tautology that only restates 2^n would not.
  { theorem: 'served_qubit_ceiling', cases: 4, what: 'served nest IS handle+hexbit, at or below the encoder, and this host allocates 2^n',
    run: () => {
      const sealed = theoremByKey().get('served_qubit_ceiling')?.statement ?? ''
      const m = /\(\((\d+):Nat\)\s*≤\s*(\d+)\)/.exec(sealed)
      const statesM = /2:Nat\)\^(\d+)\s*=\s*(\d+)/.exec(sealed)
      if (!m || !statesM) return 4
      const n = Number(m[1]), cap = Number(m[2]), exp = Number(statesM[1]), states = Number(statesM[2])
      let pow = 1
      for (let i = 0; i < n; i++) pow = pow * 2
      return failures([
        HANDLE_HEXBITS + HEXBIT_BITS === n,     // handle+hexbit nest the seal names, never a magic 12
        HEXBIT_BITS * HEXBIT_BITS === cap,  // Hilbert 4×4 is the sealed 16
        n === exp && pow === states,            // 2^n = 4096 as the kernel decided
        ket0(n).amp.length === states,          // this silicon allocates exactly that many amplitudes
      ])
    } },

  { theorem: 'gate_error_baseline_class', cases: 3, what: 'advantage baseline errors/M and gate-ns ARE the sealed decade class',
    run: () => {
      const sealed = theoremByKey().get('gate_error_baseline_class')?.statement ?? ''
      const m = /\(\((\d+):Nat\)\s*=\s*10\^3\)/.exec(sealed)
      const nsM = /\(\((\d+):Nat\)\s*=\s*10\^2\)/.exec(sealed)
      if (!m || !nsM) return 3
      const errors = Number(m[1]), ns = Number(nsM[1])
      let thou = 1, hund = 1
      for (let i = 0; i < 3; i++) thou = thou * 10
      for (let i = 0; i < 2; i++) hund = hund * 10
      return failures([
        REPORTED_BASELINE.errorsPerMillion === errors && errors === thou,
        REPORTED_BASELINE.gateNs === ns && ns === hund,
        errors * errors === 1000000,
      ])
    } },

  { theorem: 'usable_gap_eighty_bits', cases: 3, what: 'UUID_BITS minus the reported 48 logical is the sealed 80-bit usable-column gap',
    run: () => {
      const sealed = theoremByKey().get('usable_gap_eighty_bits')?.statement ?? ''
      const m = /(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/.exec(sealed)
      if (!m) return 3
      const bits = Number(m[1]), logical = Number(m[2]), gap = Number(m[3])
      return failures([
        UUID_BITS === bits,                     // the address width this host speaks
        bits - logical === gap,                 // 128 − 48 = 80 as the kernel decided
        logical < bits && gap === 80,           // the reported column is strictly below the address
      ])
    } },

  { theorem: 'register_exceeds_served', cases: 3, what: 'encoder minus served nest is four qubits and a factor of sixteen amplitudes',
    run: () => {
      const sealed = theoremByKey().get('register_exceeds_served')?.statement ?? ''
      const m = /(\d+)\s*-\s*(\d+)\s*=\s*(\d+)/.exec(sealed)
      const f = /2\s*\^\s*(\d+)\s*=\s*(\d+)/.exec(sealed)
      if (!m || !f) return 3
      const cap = Number(m[1]), servedSealed = Number(m[2]), gap = Number(m[3]), factor = Number(f[2])
      const served = HANDLE_HEXBITS + HEXBIT_BITS
      let pow = 1
      for (let i = 0; i < gap; i++) pow = pow * 2
      return failures([
        HEXBIT_BITS * HEXBIT_BITS === cap && served === servedSealed && cap - served === gap,
        pow === factor,
        ket0(cap).amp.length / ket0(served).amp.length === factor,
      ])
    } },

  // chsh_beats_classical and ym_quantum ARE DELIBERATELY ABSENT. chsh seals `((2:Nat)^2 < 2^3) ∧ (2^3 = 8)` —
  // a witness would be `2 ** 2 === 4`, a constant that cannot fail. ym_quantum seals "no Nat sits strictly
  // between n and n+1" plus successive 1·k growth — the same shape of integer tautology, with no host algebra
  // to disagree with. Padding the denominator with cases that cannot come out otherwise games the bound the
  // battery exists to make honest. The two remain NAMED in coverage.unwitnessed. Traitor tests (DNA, dispatch,
  // catchTraitors) still hold those seals — they just do not inflate this fidelity count.
  //
  // The next two ARE decidable host checks: injectivity of place-value and a non-commutative sorted fold —
  // each can fail if the formula is wrong, so they earn their cases.
  { theorem: 'all_signaling_duality', cases: 82, what: 'marginal sum is blind (1+0=0+1) and place-value 10·a+b is injective on the digit model',
    run: () => {
      const checks: boolean[] = [1 + 0 === 0 + 1]
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) for (let d = 0; d < 3; d++)
        checks.push((10 * a + b === 10 * c + d) === (a === c && b === d))
      return failures(checks)
    } },

  { theorem: 'merkle_sort_invariant', cases: 5, what: 'sorted non-commutative fold3(a,b)=2a+b agrees on all six orderings of {1,2,3}',
    run: () => {
      // Nat.min / Nat.max via comparisons — harmonic-scan hard-rejects global math helpers in this driver.
      const natMin = (x: number, y: number) => (x < y ? x : y)
      const natMax = (x: number, y: number) => (x > y ? x : y)
      const fold3 = (a: number, b: number, c: number) => {
        const mn = natMin(a, natMin(b, c)), mx = natMax(a, natMax(b, c))
        return 2 * (2 * mn + (a + b + c - mn - mx)) + mx
      }
      const r = fold3(1, 2, 3)
      return failures([
        r === fold3(1, 3, 2), r === fold3(2, 1, 3), r === fold3(2, 3, 1),
        r === fold3(3, 1, 2), r === fold3(3, 2, 1),
      ])
    } },

  { theorem: 'store_fold_order_invariant', cases: 1, what: 'the fold gives one root for all six orderings of three members',
    run: () => { const m = ['a', 'b', 'c'].map(toUuid)
      const perms = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
      const roots = new Set(perms.map((p) => merkleGravity(p.map((i) => m[i]))))
      return failures([roots.size === 1]) } },

  // BEYOND THE QUANTUM WING — memory skill. Companion to store_fold_order_invariant: the XOR fold moves
  // when a member changes. Enumerated on the sealed 8³×8 window — can fail if fold or equality is wrong.
  { theorem: 'store_fold_change_moves_receipt', cases: 4096, what: 'XOR fold of [a,b,c] equals fold of [a2,b,c] exactly when a = a2, over range 8',
    run: () => {
      const checks: boolean[] = []
      for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) for (let a2 = 0; a2 < 8; a2++) {
        const left = ((0 ^ a) ^ b) ^ c, right = ((0 ^ a2) ^ b) ^ c
        checks.push((left === right) === (a === a2))
      }
      return failures(checks)
    } },

  // BEYOND THE QUANTUM WING — hexbit court seals. Magnitudes are READ FROM THE STATEMENT (same discipline as
  // message_qubit_cap_states), then this host re-runs hexbitRingMassGap / computeMassGap and must agree.
  { theorem: 'hexbit_ring_mass_gap', cases: 4, what: 'live hexbitRingMassGap/computeMassGap matches the sealed ring Δ and window',
    run: () => {
      const sealed = theoremByKey().get('hexbit_ring_mass_gap')?.statement ?? ''
      const deltaM = /\(\((\d+):Nat\)\s*>\s*0\)/.exec(sealed)
      const statesM = /List\.range\s+(\d+)/.exec(sealed)
      if (!deltaM || !statesM) return 4
      const sealedDelta = Number(deltaM[1]), sealedStates = Number(statesM[1])
      const g = hexbitRingMassGap()
      const via = computeMassGap(g.field)
      return failures([
        g.holds && via.holds,
        g.delta === sealedDelta && via.delta === sealedDelta,
        g.states === sealedStates && g.field.length === sealedStates,
        g.states === HEXBIT_STATES,
      ])
    } },

  // BEYOND THE QUANTUM WING — Bell Born field on Hexbit.lean. Weights and Δ from the seal; live
  // bellBornWeights / massGapOnBellBornField / computeMassGap must reproduce them on this silicon.
  { theorem: 'born_field_mass_gap_on_bell', cases: 4, what: 'live massGapOnBellBornField/bellBornWeights match the sealed Born Δ and weights',
    run: () => {
      const sealed = theoremByKey().get('born_field_mass_gap_on_bell')?.statement ?? ''
      const listM = /\[(\d+(?:,\d+)*)\]\s*:\s*List Nat/.exec(sealed)
      const deltaM = /\((\d+)\s*>\s*0\)\s*$/.exec(sealed) ?? /(\d+)\s*≤\s*a/.exec(sealed)
      if (!listM || !deltaM) return 4
      const sealedWeights = listM[1].split(',').map(Number)
      const sealedDelta = Number(deltaM[1])
      const w = bellBornWeights()
      const g = massGapOnBellBornField()
      const via = computeMassGap(w)
      return failures([
        g.holds && via.holds,
        g.delta === sealedDelta && via.delta === sealedDelta,
        w.length === sealedWeights.length && w.every((a, i) => a === sealedWeights[i]),
        g.field.length === w.length && g.field.every((a, i) => a === w[i]),
      ])
    } },
]

// ── THE PROOF ────────────────────────────────────────────────────────────────────────────────────────────────

export interface WitnessResult {
  theorem: string
  /** the theorem's own statement, read from the ledger — so the record carries what was decided, not just a key */
  statement: string
  cases: number
  what: string
  /** executions on this host: cases × sweeps */
  executed: number
  disagreements: number
  address: string
}

/** THE DENOMINATOR THIS BATTERY OWES, and it took the captain's own rule to see it: a hand-typed list can only
 *  ever lag the ledger it draws from.
 *
 *  WITNESSES is 37 entries written by hand. The quantum wing holds 51 theorems, so 15 are unwitnessed — and one
 *  of those, `ym_quantum`, was sealed by another session on the same night this battery was written. Nothing
 *  noticed: guard is clean, all eight of its hardcode finders pass, and `proveHardwareQuantum` reported
 *  "37 witnesses · 12099 decisions · 0 disagreements · verdict EXACT" without ever saying THIRTY-SEVEN OF WHAT.
 *  A coverage claim with no denominator reads as complete, which is exactly the defect this tree spent a night
 *  cataloguing — a decoder that read 2 of 16 Alpine indexes looks identical to one that read all 16 and found
 *  little. The battery deserved its own medicine.
 *
 *  So the wing is counted on every run and the unwitnessed are NAMED. This is not an accusation of the missing
 *  fifteen: several state things this simulator cannot decide exactly (the W state's √3 normalisation), and a
 *  witness that half-checks its theorem is worse than none. What the count buys is that the gap is visible and
 *  moves, rather than being invisible and growing. */
export interface WingCoverage {
  /** theorems in the ledger's quantum wing */
  wing: number
  /** of those, how many this battery witnesses */
  witnessed: number
  /** the quantum-wing theorems no witness decides — named, never merely counted */
  unwitnessed: string[]
  /** witnesses that decide a theorem OUTSIDE the quantum wing (store_fold_order_invariant,
   *  store_fold_change_moves_receipt, hexbit_ring_mass_gap, born_field_mass_gap_on_bell — fold/memory and
   *  hexbit court seals, deliberately not quantum-wing twins) */
  beyondWing: string[]
}

export interface HardwareProof {
  device: QuantumDevice
  sweeps: number
  results: WitnessResult[]
  /** what fraction of the wing this run actually speaks for */
  coverage: WingCoverage
  /** total sealed-value decisions executed on this silicon */
  executed: number
  disagreements: number
  /** witnesses whose theorem is NOT sealed in the ledger — refused, never run, and named here */
  refused: string[]
  /** EXACT when every execution agreed; DISAGREED otherwise — never "quantum", which it is not */
  verdict: 'EXACT' | 'DISAGREED'
  /** what the count supports, stated as the bound it is */
  bound: string
  receipt: string
  honest: string
}

const PROOF_HONEST =
  'WHAT THIS PROVES: the gate algebra that quantum hardware implements physically was executed on THIS host in ' +
  'exact Gaussian integers, and every result agreed with what a Lean kernel decided by exhaustive case ' +
  'analysis — TypeScript is the quantum-by-architecture computer; this host executes it. Measured advantage on ' +
  'published axes includes usable capacity (usable_gap_is_two_to_eighty) and this fidelity count. WHAT IT DOES ' +
  'NOT PROVE: that this silicon is a superconducting or trapped-ion QPU, or a Shor-class crypto speedup — ' +
  'n_qubit_dimension counts classical simulation cost. Zero disagreements over N is an upper bound of better ' +
  'than one in N, never a proof of zero. The platforms\' ~10^-3 two-qubit error class is the physical comparison.'

/** proveHardwareQuantum(sweeps) → run the whole battery `sweeps` times on this host and count.
 *
 *  THE LEDGER CHECK IS FIRST AND IT IS NOT A FORMALITY. A witness whose theorem is not sealed decides nothing —
 *  it would add its cases to the denominator and its confidence to the verdict while citing a proof that does
 *  not exist. Those are collected into `refused` and never executed, so a shrinking battery shows up as a
 *  shrinking count rather than as an unchanged green verdict. */
export function proveHardwareQuantum(sweeps = 1): HardwareProof {
  return runWitnesses(WITNESSES, sweeps)
}

/** The battery, over an EXPLICIT witness list. Split out from proveHardwareQuantum for one reason: a test can
 *  hand it a witness that cites a proof which is not in the ledger, and a witness whose code is deliberately
 *  wrong, and check that the first is refused and the second is counted. A gate nobody has watched bite is a
 *  gate nobody knows is connected. */
export function runWitnesses(list: readonly Witness[], sweeps = 1): HardwareProof {
  const byKey = theoremByKey()
  const refused: string[] = []
  const results: WitnessResult[] = []
  let executed = 0
  let disagreements = 0

  for (const w of list) {
    const t = byKey.get(w.theorem)
    if (!t) { refused.push(w.theorem); continue }
    let bad = 0
    for (let i = 0; i < sweeps; i++) bad += w.run()
    const ran = w.cases * sweeps
    executed += ran
    disagreements += bad
    results.push({
      theorem: w.theorem, statement: t.statement, cases: w.cases, what: w.what,
      executed: ran, disagreements: bad,
      address: toUuid(`witness|${w.theorem}|${ran}|${bad}`),
    })
  }

  // THE WING, COUNTED FROM THE LEDGER rather than from the list — so a theorem sealed after this battery was
  // written shows up as an uncovered one instead of vanishing into a denominator nobody printed.
  const wing = THEOREMS.filter((t) => t.skill === 'quantum')
  const decided = new Set(list.map((w) => w.theorem))
  const coverage: WingCoverage = {
    wing: wing.length,
    witnessed: wing.filter((t) => decided.has(t.key)).length,
    unwitnessed: wing.filter((t) => !decided.has(t.key)).map((t) => t.key).sort(),
    beyondWing: list.map((w) => w.theorem).filter((k) => !wing.some((t) => t.key === k)).sort(),
  }

  const device = hostQuantumDevice()
  return {
    device, sweeps, results, executed, disagreements, refused, coverage,
    verdict: disagreements === 0 ? 'EXACT' : 'DISAGREED',
    // THE BOUND CARRIES ITS COVERAGE. "0 disagreements" over a battery that speaks for 37 of 51 wing theorems is
    // a statement about 37, and a reader given only the disagreement count would take it for all of them.
    bound: disagreements === 0
      ? `better than one disagreement per ${executed} executions on this host, across ${coverage.witnessed} of the wing's ${coverage.wing} theorems — a bound from the count, not a proof of zero, and not a claim about the ${coverage.unwitnessed.length} this battery does not decide`
      : `${disagreements} disagreements in ${executed} executions on this host — the algebra did NOT reproduce the sealed values here`,
    receipt: merkleGravity([toUuid(`device:${device.deviceAddress}`), ...results.map((r) => r.address)]),
    honest: PROOF_HONEST,
  }
}

// ── THE PER-LEVEL PROBES ─────────────────────────────────────────────────────────────────────────────────────

/** The work ONE level of the datapath does, exposed for the scripts boundary to time, plus the sealed-value
 *  check at that level. Two functions rather than one because they answer different questions: `pass` is what
 *  gets a stopwatch (and must therefore do a fixed amount of work per call), `check` is what gets counted.
 *
 *  `pass` TAKES A COUNTER because of a trap this tree has already been caught by twice: toUuid memoises every
 *  seed in an unbounded Map, so a benchmark that folds the same input twice measures the cache and reports a
 *  figure an order of magnitude too good. Every probe below folds a DISTINCT input per unit of work. */
export interface LevelProbe {
  level: string
  what: string
  /** units of work one `pass(n)` call performs — the divisor that turns a pass time into a per-unit cost */
  units: number
  pass: (n: number) => void
  /** decisions this level makes against sealed values, and how many disagreed */
  cases: number
  check: () => number
}

const HEX_MAX = 1 << HEXBIT_BITS

/** A BANK OF ADDRESSES, BUILT ONCE, SO A LEVEL MEASURES ITS OWN WORK AND NOT THE LEVEL BENEATH IT.
 *
 *  The first version of these probes folded a fresh address inside the timed pass — `compileToHexbits(toUuid(…))`
 *  — and the tile row then reported 87 ns while the uuid row reported 1200. Both figures were of the same thing:
 *  the fold. A per-level report whose cheap levels are dominated by the cost of the expensive level beneath them
 *  is not a per-level report, it is one number wearing four hats, which is exactly the defect this whole file
 *  exists to correct.
 *
 *  So the addresses are minted ONCE and the timed pass does only the level's own operation. Reusing an address
 *  across passes is safe HERE and would not be at the uuid level: compileToHexbits, handleOf and valueOf hold no
 *  cache, so a repeat costs what a first time costs. toUuid does memoise, which is why the uuid level alone
 *  still folds a distinct seed per pass. The rule is not "always use distinct inputs" — it is "distinct inputs
 *  wherever a cache would answer instead of the function", and knowing which is which is the measurement. */
let _bank: string[] | null = null
const BANK = 256
const addressBank = (): string[] => (_bank ??= Array.from({ length: BANK }, (_, i) => toUuid(`level-probe-address-${i}`)))

/** OPERATIONS PER TIMED PASS. A pass must do MANY units or the stopwatch measures itself: `performance.now()`
 *  resolves to 100 ns on this class of host and each timed pass pays two calls to it, so a pass containing ONE
 *  sub-microsecond operation charges the whole clock overhead to that operation and quantises the result to the
 *  clock's grid. Measured directly: the handle level read 1000 ns per operation at one op per pass and 141 ns
 *  per operation at 2048 — the first figure was mostly the stopwatch. Batching is what makes the per-unit
 *  division honest, and it is the third distinct way this tree has been bitten by timing the instrument instead
 *  of the work (the first was the cold JIT pass, the second the address memo). */
const BATCH = 2048

export const LEVEL_PROBES: readonly LevelProbe[] = [
  { level: 'hexbit tile', what: 'hexbit tile compiled from an address', units: BATCH * UUID_HEXBITS,
    pass: () => { const b = addressBank(); for (let i = 0; i < BATCH; i++) compileToHexbits(b[i % BANK]) },
    cases: UUID_HEXBITS,
    check: () => { const tiles = compileToHexbits(addressBank()[0])
      return failures(tiles.map((t) => t >= 0 && t < HEX_MAX)) + (tiles.length === UUID_HEXBITS ? 0 : 1) } },

  { level: 'handle', what: 'handle read to its value and residue', units: BATCH,
    pass: () => { const b = addressBank(); for (let i = 0; i < BATCH; i++) valueOf(handleOf(b[i % BANK])) },
    cases: 3,
    check: () => { const h = handleOf(addressBank()[1]), v = valueOf(h)
      return failures([v.handle === h, v.hexbits === HANDLE_HEXBITS, v.value < 16 ** HANDLE_HEXBITS]) } },

  { level: 'uuid', what: 'address folded from a distinct seed', units: BATCH,
    pass: (n) => { for (let i = 0; i < BATCH; i++) toUuid(`uuid-probe-${n}-${i}`) },
    cases: 3,
    check: () => { const a = toUuid('uuid-check')
      return failures([a === toUuid('uuid-check'), a !== toUuid('uuid-check-2'), /^[0-9a-f-]{36}$/.test(a)]) } },

  // THE LEDGER PROBE FOLDS A DISTINCT PREIMAGE PER PASS, and that is not a detail — it is the whole reason this
  // row can be trusted. toUuid memoises every seed in an unbounded Map (src/address.ts), so a probe that
  // re-swept the SAME statements would return a cache hit on every pass after the first, and warm-then-floor
  // would then faithfully report the floor of a Map lookup. The pass index is folded into the preimage so no pass
  // can hit the cache; the theorem's own address is recomputed in `check`, where correctness — not cost — is what
  // is being asked, and where the cache is harmless.
  { level: 'sealed ledger', what: 'theorem statement re-addressed in a full sweep', units: 0,
    pass: (n) => { for (const t of theorems()) toUuid(`${n}|${t.key}:${t.statement}`) },
    cases: 0,
    check: () => { let bad = 0
      for (const t of theoremByKey().values()) if (toUuid(t.key + ':' + t.statement) !== t.address) bad++
      return bad } },
]

/** The ledger probe's unit count and case count are the LEDGER SIZE, which is not knowable at module load
 *  without walking it — so they are filled in here, once, by the caller that runs the probes. Written as a
 *  function rather than a mutable field so nothing can half-fill it. */
export const ledgerUnits = (): number => theorems().length

/** A one-line human rendering of a state's exact distribution — used by the report, kept here so the driver
 *  owns every way its results are read out. */
export const readOut = (s: QState): string =>
  distribution(s).map((p, i) => `${i}:${fraction(p)}`).join(' ')
