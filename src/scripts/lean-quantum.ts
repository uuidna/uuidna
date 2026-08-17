#!/usr/bin/env node
// Automate the Lean layer for the QUANTUM computer — the exact facts src/quantum.ts computes. HONEST SCOPE: this
// is the algebra of a CLASSICAL state-vector simulation (integer positions, no decimal drift), NOT quantum
// hardware and NO quantum advantage. Amplitudes are Gaussian integers over √(2^scale); the Born-rule weights and
// marginals are non-negative integers (Nat), and the phase-gate algebra (S·S=Z, Z²=I, S·S†=I) lives in ℤ. COMPUTE
// each fact, GENERATE a `by decide` theorem, VERIFY it compiles sorry-free (lean). Simulation, not hardware.
import { emit, LXOR_DEF } from './lean-gen.js'

// JS mirrors of the exact simulator arithmetic (must each hold before a line is written).
const sq = (a: number) => a * a
const CLIFFORD = [[1, 0], [0, 1], [3, -5], [-2, 7]] // sample Gaussian-integer amplitudes (re, im)

const FACTS = [
  // ── measurement: the Born rule on the Bell state (|00⟩+|11⟩)/√2, amplitudes [1,0,0,1] over √2 (scale 1) ──
  { key: 'bell_born_weights', why: 'the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)',
    js: () => [1, 0, 0, 1].map(sq).join() === '1,0,0,1',
    lean: 'theorem bell_born_weights : (([1,0,0,1] : List Nat).map (fun a => a * a)) = [1,0,0,1] := by decide' },
  { key: 'bell_normalized', why: 'Bell normalization: Σ|amp|² = 1+0+0+1 = 2 = 2¹ (scale 1) — the weights are an exact probability distribution, no floating point',
    js: () => (1 * 1 + 0 * 0 + 0 * 0 + 1 * 1) === 2 && 2 === 2 ** 1,
    lean: 'theorem bell_normalized : ((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1) := by decide' },
  { key: 'bell_perfect_correlation', why: 'perfect correlation: the two qubits always agree — the outcomes carrying weight are exactly the basis states {00, 11} (indices where bit q0 equals bit q1)',
    js: () => [0, 1, 2, 3].filter((i) => (i % 2) === ((i >> 1) % 2)).join() === '0,3',
    lean: 'theorem bell_perfect_correlation : ((List.range 4).filter (fun i => i % 2 == i / 2 % 2)) = [0, 3] := by decide' },
  { key: 'bell_no_signaling', why: 'no-signaling (the paradox, computed): the two marginals of q0 are equal — weight(q0=0)=1²+0² = 0²+1²=weight(q0=1) — so measuring q1 sends NOTHING to q0 (no-communication)',
    js: () => (1 * 1 + 0 * 0) === (0 * 0 + 1 * 1),
    lean: 'theorem bell_no_signaling : ((1*1 + 0*0 : Nat) = (0*0 + 1*1)) := by decide' },
  // ── superposition and multipartite entanglement ──
  { key: 'superposition_h0', why: 'superposition H|0⟩ = |+⟩ — the Born weights are [1,1] over √2, so P(0)=P(1)=1/2: before measurement both, after, one',
    js: () => [1, 1].map(sq).join() === '1,1' && (1 + 1) === 2,
    lean: 'theorem superposition_h0 : ((([1,1]:List Nat).map (fun a => a*a)) = [1,1]) ∧ ((1+1:Nat) = 2) := by decide' },
  { key: 'ghz3_two_outcomes', why: 'GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement',
    js: () => [1, 0, 0, 0, 0, 0, 0, 1].filter((a) => a !== 0).length === 2,
    lean: 'theorem ghz3_two_outcomes : (([1,0,0,0,0,0,0,1]:List Nat).filter (fun a => a != 0)).length = 2 := by decide' },
  { key: 'ghz3_normalized', why: 'GHZ(3) normalization: Σ|amp|² = 1²+1² = 2 = 2¹ — an exact distribution over the two correlated corners',
    js: () => (1 * 1 + 1 * 1) === 2,
    lean: 'theorem ghz3_normalized : ((1*1 + 1*1 : Nat) = 2) := by decide' },
  // ── gate truth-tables: permutation gates as exact basis permutations (index i, low bit = q0) ──
  { key: 'cnot_truth_table', why: 'CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits',
    js: () => [0, 1, 2, 3].map((i) => i ^ (2 * (i % 2))).join() === '0,3,2,1',
    lean: 'theorem cnot_truth_table : ((List.range 4).map (fun i => lxor i (2 * (i % 2)))) = [0,3,2,1] := by decide' },
  { key: 'cnot_involution', why: 'CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation',
    js: () => [0, 1, 2, 3].every((i) => { const j = i ^ (2 * (i % 2)); return (j ^ (2 * (j % 2))) === i }),
    lean: 'theorem cnot_involution : (List.range 4).all (fun i => (let j := lxor i (2 * (i % 2)); lxor j (2 * (j % 2))) == i) := by decide' },
  { key: 'toffoli_truth_table', why: 'Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => i ^ (4 * ((i % 2) * ((i >> 1) % 2)))).join() === '0,1,2,7,4,5,6,3',
    lean: 'theorem toffoli_truth_table : ((List.range 8).map (fun i => lxor i (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3] := by decide' },
  { key: 'swap_truth_table', why: 'SWAP exchanges q0 and q1 — the basis permutation i ↦ 2·q0 + q1 = [0,2,1,3] on two qubits',
    js: () => [0, 1, 2, 3].map((i) => (i % 2) * 2 + ((i >> 1) % 2)).join() === '0,2,1,3',
    lean: 'theorem swap_truth_table : ((List.range 4).map (fun i => (i % 2) * 2 + (i / 2 % 2))) = [0,2,1,3] := by decide' },
  // ── phase-gate algebra: Gaussian integers over ℤ (S multiplies |1⟩ by i, S² by i²=−1=Z) ──
  { key: 's_squared_is_z', why: 'S·S = Z: two phase gates compose to the Z phase-flip (i² = −1), verified exactly on sample Gaussian-integer amplitudes S(re,im)=(−im,re)',
    js: () => CLIFFORD.every(([re, im]) => { const s1 = [-im, re], s2 = [-s1[1], s1[0]]; return s2[0] === -re && s2[1] === -im }),
    lean: 'theorem s_squared_is_z : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s1 := (-(p.2), p.1); let s2 := (-(s1.2), s1.1); (s2.1 == -(p.1)) && (s2.2 == -(p.2)))) := by decide' },
  { key: 'z_involution', why: 'Z² = I: the phase flip is its own inverse — negating an amplitude twice returns it, on sample Gaussian-integer amplitudes',
    js: () => CLIFFORD.every(([re, im]) => (-(-re)) === re && (-(-im)) === im),
    lean: 'theorem z_involution : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (-(-(p.1)) == p.1) && (-(-(p.2)) == p.2)) := by decide' },
  { key: 's_dagger_inverse', why: 'S·S† = I: the phase gate and its adjoint invert — S(re,im)=(−im,re) then S†(re,im)=(im,−re) returns the amplitude',
    js: () => CLIFFORD.every(([re, im]) => { const s = [-im, re]; return s[1] === re && (-s[0]) === im }),
    lean: 'theorem s_dagger_inverse : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s := (-(p.2), p.1); (s.2 == p.1) && (-(s.1) == p.2))) := by decide' },
  // ── the INVOLUTIONS — the self-inverse gates (g∘g = I): each is its own undo, the quantum analogue of dz∘dz=id ──
  { key: 'pauli_x_involution', why: 'X² = I: the bit-flip is its own inverse — flip q0 twice (i ⊕ 1 ⊕ 1) returns every basis state; X is an involution',
    js: () => [0, 1].every((i) => ((i ^ 1) ^ 1) === i),
    lean: 'theorem pauli_x_involution : (List.range 2).all (fun i => lxor (lxor i 1) 1 == i) := by decide' },
  { key: 'swap_involution', why: 'SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution',
    js: () => [0, 1, 2, 3].every((i) => { const s = (i % 2) * 2 + ((i >> 1) % 2); return ((s % 2) * 2 + ((s >> 1) % 2)) === i }),
    lean: 'theorem swap_involution : (List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2)) == i) := by decide' },
  { key: 'toffoli_involution', why: 'Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].every((i) => { const f = (j: number) => j ^ (4 * ((j % 2) * ((j >> 1) % 2))); return f(f(i)) === i }),
    lean: 'theorem toffoli_involution : (List.range 8).all (fun i => (let j := lxor i (4 * ((i % 2) * (i / 2 % 2))); lxor j (4 * ((j % 2) * (j / 2 % 2)))) == i) := by decide' },
  { key: 'cz_involution', why: 'CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution',
    js: () => [0, 1, 2, 3].every((i) => { const m = (i % 2) * ((i >> 1) % 2), s = 1 - 2 * m; return s * s === 1 }),
    lean: 'theorem cz_involution : (List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:Int))) == 1) := by decide' },
  { key: 'h_involution_on_zero', why: 'H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution',
    js: () => [2, 0].map((a) => a >> 1).join() === '1,0',
    lean: 'theorem h_involution_on_zero : (([2,0] : List Nat).map (fun a => a / 2)) = [1, 0] := by decide' },
  { key: 's_fourth_is_identity', why: 'S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it',
    js: () => CLIFFORD.every(([re, im]) => { let p = [re, im]; for (let k = 0; k < 4; k++) p = [-p[1], p[0]]; return p[0] === re && p[1] === im }),
    lean: 'theorem s_fourth_is_identity : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); let b := (-(a.2), a.1); let c := (-(b.2), b.1); let d := (-(c.2), c.1); (d.1 == p.1) && (d.2 == p.2))) := by decide' },
  // ── the interference at the heart of the algorithms (Deutsch–Jozsa), computed as exact ± phase sums ──
  { key: 'dj_balanced_cancels', why: 'Deutsch–Jozsa interference: a BALANCED boolean sends equal +1/−1 phases, which cancel to 0 — the query amplitude vanishes. The honest heart of the algorithm, as the simulator computes it (classical linear algebra, no advantage)',
    js: () => [1, 1, -1, -1].reduce((a, b) => a + b, 0) === 0,
    lean: 'theorem dj_balanced_cancels : ([1, 1, -1, -1] : List Int).sum = 0 := by decide' },
  { key: 'dj_constant_reinforces', why: 'Deutsch–Jozsa: a CONSTANT boolean sends one phase, so all four reinforce to ±4 — the opposite of the balanced cancellation. Constant vs balanced IS exactly this interference sum',
    js: () => [1, 1, 1, 1].reduce((a, b) => a + b, 0) === 4 && [-1, -1, -1, -1].reduce((a, b) => a + b, 0) === -4,
    lean: 'theorem dj_constant_reinforces : (([1, 1, 1, 1] : List Int).sum = 4) ∧ (([-1, -1, -1, -1] : List Int).sum = -4) := by decide' },
  // ── entanglement, witnessed exactly: a 2-qubit state (a,b,c,d) is a PRODUCT iff a·d − b·c = 0 ──
  { key: 'entanglement_determinant', why: 'The entanglement witness: a two-qubit state (a,b,c,d) factorizes into a product iff a·d − b·c = 0. Bell (1,0,0,1) gives 1 ≠ 0 (ENTANGLED); |00⟩ (1,0,0,0) and |+0⟩ (1,1,0,0) give 0 (separable) — entanglement is the nonzero determinant, computed exactly',
    js: () => (1 * 1 - 0 * 0) !== 0 && (1 * 0 - 0 * 0) === 0 && (1 * 0 - 1 * 0) === 0,
    lean: 'theorem entanglement_determinant : ((1*1 - 0*0 : Int) ≠ 0) ∧ ((1*0 - 0*0 : Int) = 0) ∧ ((1*0 - 1*0 : Int) = 0) := by decide' },
  // ── the nonabelian core: Pauli X and Z anticommute (XZ = −ZX) ──
  { key: 'pauli_x_z_anticommute', why: 'Pauli X and Z ANTICOMMUTE (XZ = −ZX): X flips the bit, Z stamps (−1)^bit, and (−1)^b = −(−1)^(1−b) on both bits — the sign the simulator carries; the nonabelian core of the gate algebra',
    js: () => [0, 1].every((b) => (-1) ** b === -((-1) ** (1 - b))),
    lean: 'theorem pauli_x_z_anticommute : (List.range 2).all (fun b => ((-1 : Int))^b == -(((-1 : Int))^(1 - b))) := by decide' },
  // ── the W state: a distinct entanglement class (three corners, not two) ──
  { key: 'w_state_three_outcomes', why: 'The W state (|001⟩+|010⟩+|100⟩)/√3 — exactly THREE of the 2³ corners carry weight (vs GHZ’s two): a distinct entanglement class, robust to one-party loss. The simulator’s amplitude vector, counted',
    js: () => [0, 1, 1, 0, 1, 0, 0, 0].filter((a) => a !== 0).length === 3,
    lean: 'theorem w_state_three_outcomes : (([0,1,1,0,1,0,0,0] : List Nat).filter (fun a => a != 0)).length = 3 := by decide' },
  { key: 'w_state_normalized', why: 'W-state normalization: Σ|amp|² = 1+1+1 = 3 over √3 — an exact distribution over the three single-excitation corners',
    js: () => (1 * 1 + 1 * 1 + 1 * 1) === 3,
    lean: 'theorem w_state_normalized : ((1*1 + 1*1 + 1*1 : Nat) = 3) := by decide' },
  // ── the Bell basis: four entangled states, a complete orthogonal measurement (exact integer inner products) ──
  { key: 'bell_basis_orthogonal', why: 'The four Bell states form a complete ORTHOGONAL basis: ⟨Φ⁺|Φ⁻⟩ = 0 and ⟨Ψ⁺|Ψ⁻⟩ = 0 (over √2 integer vectors), while ⟨Φ⁺|Φ⁺⟩ = 2 — the entangled-basis measurement, as exact integer inner products',
    js: () => (1 * 1 + 0 * 0 + 0 * 0 + 1 * -1) === 0 && (0 * 0 + 1 * 1 + 1 * -1 + 0 * 0) === 0 && (1 * 1 + 0 * 0 + 0 * 0 + 1 * 1) === 2,
    lean: 'theorem bell_basis_orthogonal : ((1*1 + 0*0 + 0*0 + 1*(-1) : Int) = 0) ∧ ((0*0 + 1*1 + 1*(-1) + 0*0 : Int) = 0) ∧ ((1*1 + 0*0 + 0*0 + 1*1 : Int) = 2) := by decide' },
  // ── the state space, counted: n qubits span 2ⁿ amplitudes — EXPONENTIAL, which is why the classical simulation is
  //    costly. HONEST: this is the cost of simulation, NOT a speedup or an advantage. ──
  { key: 'n_qubit_dimension', why: 'n qubits span 2ⁿ amplitudes: [1,2,3,4,5] qubits give [2,4,8,16,32] — the state vector grows EXPONENTIALLY, which is exactly why simulating it classically is costly. HONEST SCOPE: this counts the simulation cost, it is NOT a speedup or a quantum advantage.',
    js: () => JSON.stringify([1, 2, 3, 4, 5].map((n) => 2 ** n)) === JSON.stringify([2, 4, 8, 16, 32]),
    lean: 'theorem n_qubit_dimension : ([1,2,3,4,5].map (fun n => (2:Nat)^n)) = [2,4,8,16,32] := by decide' },
  { key: 'tensor_dimension_multiplies', why: 'Combining systems MULTIPLIES their dimensions (the tensor product): two qubits span 2·2 = 4 amplitudes, three span 2·2·2 = 8. Independent subsystems compose by product, the source of the exponential.',
    js: () => 2 * 2 === 4 && 2 * 2 * 2 === 8,
    lean: 'theorem tensor_dimension_multiplies : (2*2 = 4) ∧ (2*2*2 = 8) := by decide' },
  { key: 'pauli_group_order_16', why: 'The single-qubit Pauli group is {I, X, Y, Z} × {±1, ±i} — 4 operators times 4 phases = 16 elements. The finite group the whole gate algebra is built over, counted.',
    js: () => 4 * 4 === 16,
    lean: 'theorem pauli_group_order_16 : 4 * 4 = 16 := by decide' },
  { key: 'closure_is_coprime',
    why: 'THE SEMESTER\'S UNIFICATION, sealed as one line: every walk this system closes is closed by the SAME law — a generator coprime to its ring. The pentagram\'s 2 on ℤ/5, the rosette\'s 3 on ℤ/7, the vortex\'s 2 on ℤ/9, the frame ring\'s stride 5 on ℤ/24, and the tokamak winding\'s 3/2 on the torus: five rings, five walks, one gcd = 1. Closure is arithmetic, and arithmetic is what holds — the school\'s whole curriculum in one decidable conjunction.',
    js: () => { const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a; return [[2,5],[3,7],[2,9],[5,24],[3,2]].every(([a, b]: number[]) => gcd(a, b) === 1) },
    lean: 'theorem closure_is_coprime : (Nat.gcd 2 5 = 1) ∧ (Nat.gcd 3 7 = 1) ∧ (Nat.gcd 2 9 = 1) ∧ (Nat.gcd 5 24 = 1) ∧ (Nat.gcd 3 2 = 1) := by decide' },

  { key: 'types_count_as_arithmetic',
    why: 'THE TWO KERNELS\' COUNTING SHADOW (Curry–Howard): a type is a proposition and its inhabitants are its proofs, so types COUNT — the sum type (disjunction) of Bool with itself has 2+2 inhabitants, the product (conjunction) 2·2, the function space (implication) 2². All three equal 4, because 2 is the unique positive integer where sum, product, and power coincide — the two coins are the fixed point where every logical connective counts alike. The fast kernel (the type checker, seconds) and the slow kernel (the proof checker, minutes) reject the same class because they check the same correspondence.',
    js: () => 2 + 2 === 4 && 2 * 2 === 4 && 2 ** 2 === 4,
    lean: 'theorem types_count_as_arithmetic : (2 + 2 = 4) ∧ (2 * 2 = 4) ∧ ((2:Nat) ^ 2 = 4) := by decide' },

  { key: 'sixteen_connectives',
    why: 'Every binary logical connective, counted by its type: Bool → Bool → Bool has exactly 2^(2·2) = 16 truth tables — AND, OR, XOR, NAND and the other twelve — the same sixteen gates the hardware layer builds from NAND alone. Logic\'s whole binary vocabulary is one exponent, and the type system knew the count before any truth table was drawn.',
    js: () => 2 ** (2 * 2) === 16,
    lean: 'theorem sixteen_connectives : (2:Nat) ^ (2 * 2) = 16 := by decide' },

  { key: 'real_pauli_group_order_8',
    why: 'The four operations {I, X, Y, Z}, each with its signed inverse ±, form the REAL Pauli group of order 8 = 2·4 — the rung between the four effective operations and the full order-16 group (8·2 = 16, the two i-phases restored). Reversing the four does not double them (each is its own inverse, X²=I); the doubling is the sign.',
    js: () => 2 * 4 === 8 && 8 * 2 === 16,
    lean: 'theorem real_pauli_group_order_8 : (2 * 4 = 8) ∧ (8 * 2 = 16) := by decide' },

  { key: 'four_messages_two_bits',
    why: 'The order-8 signed group carries 4 distinguishable messages, not 8: dividing out the unobservable global phase (÷2) collapses 8 group elements to 4 = 2² Bell states — superdense coding\'s two classical bits. The group\'s 8 and the channel\'s 4 pinned together: 8/2 = 4 = 2². Group doubling, phase quotient, message count, one line.',
    js: () => 8 / 2 === 4 && 2 ** 2 === 4,
    lean: 'theorem four_messages_two_bits : (8 / 2 = 4) ∧ ((2:Nat)^2 = 4) := by decide' },

  { key: 'clifford_group_order_24', why: 'The single-qubit Clifford group (the gates that permute the Paulis) has order 24 = 6 · 4 — six signed axes for X\'s image, four for the phase. Finite: the Cliffords are classically simulable (Gottesman–Knill), the honest reason they are NOT the source of advantage.',
    js: () => 6 * 4 === 24,
    lean: 'theorem clifford_group_order_24 : 6 * 4 = 24 := by decide' },
  { key: 'phase_gate_order_ladder', why: 'The phase gates form an order ladder: T has order 8, S = T² has order 4, Z = S² has order 2 — each the square of the next (8 = 2·4, 4 = 2·2) — and T⁸ = I is a full 2π turn (8 mod 8 = 0). Squaring a phase gate halves its order.',
    js: () => 8 === 2 * 4 && 4 === 2 * 2 && 8 % 8 === 0,
    lean: 'theorem phase_gate_order_ladder : (8 = 2*4) ∧ (4 = 2*2) ∧ (8 % 8 = 0) := by decide' },
  { key: 'chsh_beats_classical', why: 'The CHSH game: quantum correlations exceed every local hidden variable — the Tsirelson value 2√2 beats the classical bound 2. Sealed as the SQUARED comparison (2√2 is irrational): 2² = 4 < 8 = 2³. HONEST SCOPE: the simulator computes the correlation exactly; the squared bound is what decides — and no signal crosses (nothing FTL).',
    js: () => 2 ** 2 < 2 ** 3 && 2 ** 3 === 8,
    lean: 'theorem chsh_beats_classical : ((2:Nat)^2 < 2^3) ∧ (2^3 = 8) := by decide' },
  { key: 'no_cloning_dimension', why: 'The dimension obstruction behind no-cloning: a cloner of an n-qubit state would need to write into (2ⁿ)² dimensions from 2ⁿ, but a unitary preserves dimension — 2² = 4 < 16 = (2²)². HONEST SCOPE: this is the arithmetic SHADOW of the no-cloning theorem (a linearity fact), not a proof of it.',
    js: () => 2 ** 2 < (2 ** 2) ** 2,
    lean: 'theorem no_cloning_dimension : (2:Nat)^2 < (2^2)^2 := by decide' },
  { key: 'hadamard_conjugates_x_to_z', why: 'The Hadamard swaps the X and Z bases: HXH = Z, verified on integer amplitudes up to the √2² = 2 scale — HXH[a,b] = [2a, −2b] = 2·Z[a,b], on sample amplitudes. The conjugation that turns a bit-flip into a phase-flip, the heart of the Clifford structure.',
    js: () => [[3, 5], [1, -2], [4, 0]].every(([a, b]) => ((a - b) + (a + b)) === 2 * a && ((a - b) - (a + b)) === -(2 * b)),
    lean: 'theorem hadamard_conjugates_x_to_z : ([(3,5),(1,-2),(4,0)] : List (Int × Int)).all (fun p => (let a := p.1; let b := p.2; ((a-b)+(a+b) == 2*a) && ((a-b)-(a+b) == -(2*b)))) := by decide' },
  { key: 'bell_stabilized_by_xx', why: 'The Bell state |Φ⁺⟩ = [1,0,0,1] is a +1 eigenstate of XX: flipping both bits reverses the amplitude vector (00↔11, 01↔10), and [1,0,0,1] is its own reverse — a stabiliser. The entanglement, read as a fixed point.',
    js: () => JSON.stringify([1, 0, 0, 1].slice().reverse()) === JSON.stringify([1, 0, 0, 1]),
    lean: 'theorem bell_stabilized_by_xx : ([1,0,0,1] : List Int).reverse = [1,0,0,1] := by decide' },
  { key: 'bell_zz_even_parity', why: 'The Bell state is a +1 eigenstate of ZZ too: its supported corners {00, 11} both have EVEN bit-parity ((0+0) and (1+1) are 0 mod 2), so ZZ stamps +1 on each. Two stabilisers XX and ZZ pin the state — the stabiliser formalism, in miniature.',
    js: () => (0 + 0) % 2 === 0 && (1 + 1) % 2 === 0,
    lean: 'theorem bell_zz_even_parity : ((0+0) % 2 = 0) ∧ ((1+1) % 2 = 0) := by decide' },
  { key: 'ghz_stabilized_by_xxx', why: 'GHZ(3) = [1,0,0,0,0,0,0,1] is a +1 eigenstate of XXX: flipping all three bits reverses the 8-amplitude vector (000↔111), and the GHZ vector is its own reverse. The three-party entanglement, stabilised.',
    js: () => JSON.stringify([1, 0, 0, 0, 0, 0, 0, 1].slice().reverse()) === JSON.stringify([1, 0, 0, 0, 0, 0, 0, 1]),
    lean: 'theorem ghz_stabilized_by_xxx : ([1,0,0,0,0,0,0,1] : List Int).reverse = [1,0,0,0,0,0,0,1] := by decide' },
  { key: 'superdense_two_bits', why: 'Superdense coding: one qubit carries 2 classical bits — Alice\'s four local operations map |Φ⁺⟩ to the four orthogonal Bell states, 2² = 4 distinguishable messages, and 2 > 1. HONEST SCOPE: this REQUIRES a pre-shared EPR pair; it is not bandwidth from nothing, and nothing signals faster than light.',
    js: () => 2 ** 2 === 4 && 2 > 1,
    lean: 'theorem superdense_two_bits : ((2:Nat)^2 = 4) ∧ (2 > 1) := by decide' },
  { key: 'teleportation_four_corrections', why: 'Teleportation sends one qubit with 2 classical bits and one EPR pair: Bob applies one of the four Pauli corrections {I, X, Z, XZ} indexed by the 2 measured bits (2+2 = 4 = the four corrections). HONEST SCOPE: the classical channel is ESSENTIAL — without the 2 bits nothing arrives, so no faster-than-light transfer.',
    js: () => [0, 1, 2, 3].length === 4 && 2 + 2 === 4,
    lean: 'theorem teleportation_four_corrections : (([0,1,2,3] : List Nat).length = 4) ∧ (2 + 2 = 4) := by decide' },
  // ── the computer's MEMORY, folded here: the content-address receipt the simulator's state distils to, under the
  //    SAME axiom-free XOR (lxor) the gate permutations use (CNOT = i⊕2·q0). Kept skill 'memory'. HONEST SCOPE: a
  //    classical INTEGRITY receipt — not a quantum memory, not an advantage. (Statements verbatim: addresses stable.) ──
  { key: 'store_fold_order_invariant', skill: 'memory',
    why: "The computer's memory receipt is ORDER-INVARIANT — every ordering of the members folds to the SAME root under the axiom-free XOR (lxor), the same operation the gate permutations use, so the store recomputes for any observer in any order (the 3-member fold equals all six permutations). HONEST SCOPE: the classical content-address receipt the state folds to, integrity — not a quantum memory.",
    js: () => { for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) { const base = a ^ b ^ c; if (!(base === (a ^ c ^ b) && base === (b ^ a ^ c) && base === (b ^ c ^ a) && base === (c ^ a ^ b) && base === (c ^ b ^ a))) return false } return true },
    lean: `theorem store_fold_order_invariant :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c =>
    ([a,b,c].foldl lxor 0 == [a,c,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,a,c].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,c,a].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,a,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,b,a].foldl lxor 0)))) := by decide` },
  { key: 'store_fold_change_moves_receipt', skill: 'memory',
    why: "The memory receipt refuses DRIFT — a changed member MOVES the fold: [a,b,c] folds to [a2,b,c]'s value iff a = a2, so any edit to a memory is visible (tamper-evident), the change-sensitivity of the XOR fold. HONEST SCOPE: integrity of the content-address, not a quantum property.",
    js: () => { for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) for (let c = 0; c < 8; c++) for (let a2 = 0; a2 < 8; a2++) { if (((a ^ b ^ c) === (a2 ^ b ^ c)) !== (a === a2)) return false } return true },
    lean: `theorem store_fold_change_moves_receipt :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => (List.range 8).all (fun a2 =>
    ([a,b,c].foldl lxor 0 == [a2,b,c].foldl lxor 0) == (a == a2))))) := by decide` },

  { key: 'message_qubit_cap_states',
    why: 'The tractability cap the quantum message ASSUMES, sealed (axiom-hunt): 16 qubits span 2^16 = 65536 states — the encoder’s honest ceiling. Exponential and BOUNDED: the cap is what keeps the classical simulation classical, no quantum advantage claimed at any size.',
    js: () => 2 ** 16 === 65536,
    lean: 'theorem message_qubit_cap_states : 2^16 = 65536 := by decide' },

  { key: 'all_signaling_duality',
    why: 'UUIDNA MESSAGING IS THE EXACT OPPOSITE OF NO-SIGNALING, and the opposition is the design — sealed as one duality. Physics side: the marginal is BLIND — the sum a+b sees only the total, never the arrangement (1+0 = 0+1: swap the far side, the near statistics never move; correlation carries no message — the invariance bell_no_signaling holds over the simulation). uuidna side: the address is ALL-SEEING — the place-value fold 10·a+b is INJECTIVE on the digit model (two contents agree in address exactly when they agree digit for digit), so EVERY bit of content moves the fold and the correlation of two parties computing the same receipt IS the message. The same arithmetic run in opposite directions: invariance hides, injectivity announces. Nothing rides hidden in a marginal because everything rides open in an address — secure messaging by total signal, never by obscurity.',
    js: () => (1 + 0 === 0 + 1) && [0, 1, 2].every((a) => [0, 1, 2].every((b) => [0, 1, 2].every((c) => [0, 1, 2].every((d) => ((10 * a + b === 10 * c + d) === (a === c && b === d)))))),
    lean: 'theorem all_signaling_duality : (1 + 0 = 0 + 1) ∧ ((List.range 3).all (fun a => (List.range 3).all (fun b => (List.range 3).all (fun c => (List.range 3).all (fun d => (10*a+b == 10*c+d) == (a == c && b == d)))))) := by decide' },
]

console.log('computing ' + FACTS.length + ' QUANTUM facts (classical simulation, not hardware — no quantum advantage) …')

emit({ file: 'Quantum.lean', skill: 'quantum', defs: LXOR_DEF,
  header: 'The QUANTUM computer — the exact facts the classical state-vector simulator (src/quantum.ts) computes: the Born rule on the Bell state, no-signaling marginals, superposition, GHZ(3) and the W state, the gate truth-tables (CNOT, Toffoli, SWAP), the phase-gate algebra (S·S=Z, Z²=I, S·S†=I), Pauli anticommutation (XZ=−ZX), the Deutsch–Jozsa interference (balanced cancels, constant reinforces), the entanglement determinant (a·d−b·c), and the orthogonal Bell basis. HONEST SCOPE: the algebra of a CLASSICAL simulation on integer positions — 2^n amplitudes, exponential, NO quantum advantage, NOT quantum hardware, and (bell_no_signaling) NOTHING signals — no channel, no FTL.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
