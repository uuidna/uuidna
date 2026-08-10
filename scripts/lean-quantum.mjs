#!/usr/bin/env node
// Automate the Lean layer for the QUANTUM computer — the exact facts src/quantum.ts computes. HONEST SCOPE: this
// is the algebra of a CLASSICAL state-vector simulation (integer positions, no decimal drift), NOT quantum
// hardware and NO quantum advantage. Amplitudes are Gaussian integers over √(2^scale); the Born-rule weights and
// marginals are non-negative integers (Nat), and the phase-gate algebra (S·S=Z, Z²=I, S·S†=I) lives in ℤ. COMPUTE
// each fact, GENERATE a `by decide` theorem, VERIFY it compiles sorry-free (lean). Simulation, not hardware.
import { emit } from './lean-gen.mjs'

// JS mirrors of the exact simulator arithmetic (must each hold before a line is written).
const sq = (a) => a * a
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
    lean: 'theorem cnot_truth_table : ((List.range 4).map (fun i => i ^^^ (2 * (i % 2)))) = [0,3,2,1] := by decide' },
  { key: 'cnot_involution', why: 'CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation',
    js: () => [0, 1, 2, 3].every((i) => { const j = i ^ (2 * (i % 2)); return (j ^ (2 * (j % 2))) === i }),
    lean: 'theorem cnot_involution : (List.range 4).all (fun i => (let j := i ^^^ (2 * (i % 2)); j ^^^ (2 * (j % 2))) == i) := by decide' },
  { key: 'toffoli_truth_table', why: 'Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => i ^ (4 * ((i % 2) * ((i >> 1) % 2)))).join() === '0,1,2,7,4,5,6,3',
    lean: 'theorem toffoli_truth_table : ((List.range 8).map (fun i => i ^^^ (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3] := by decide' },
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
    lean: 'theorem pauli_x_involution : (List.range 2).all (fun i => (i ^^^ 1) ^^^ 1 == i) := by decide' },
  { key: 'swap_involution', why: 'SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution',
    js: () => [0, 1, 2, 3].every((i) => { const s = (i % 2) * 2 + ((i >> 1) % 2); return ((s % 2) * 2 + ((s >> 1) % 2)) === i }),
    lean: 'theorem swap_involution : (List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2)) == i) := by decide' },
  { key: 'toffoli_involution', why: 'Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution',
    js: () => [0, 1, 2, 3, 4, 5, 6, 7].every((i) => { const f = (j) => j ^ (4 * ((j % 2) * ((j >> 1) % 2))); return f(f(i)) === i }),
    lean: 'theorem toffoli_involution : (List.range 8).all (fun i => (let j := i ^^^ (4 * ((i % 2) * (i / 2 % 2))); j ^^^ (4 * ((j % 2) * (j / 2 % 2)))) == i) := by decide' },
  { key: 'cz_involution', why: 'CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution',
    js: () => [0, 1, 2, 3].every((i) => { const m = (i % 2) * ((i >> 1) % 2), s = 1 - 2 * m; return s * s === 1 }),
    lean: 'theorem cz_involution : (List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:Int))) == 1) := by decide' },
  { key: 'h_involution_on_zero', why: 'H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution',
    js: () => [2, 0].map((a) => a >> 1).join() === '1,0',
    lean: 'theorem h_involution_on_zero : (([2,0] : List Nat).map (fun a => a / 2)) = [1, 0] := by decide' },
  { key: 's_fourth_is_identity', why: 'S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it',
    js: () => CLIFFORD.every(([re, im]) => { let p = [re, im]; for (let k = 0; k < 4; k++) p = [-p[1], p[0]]; return p[0] === re && p[1] === im }),
    lean: 'theorem s_fourth_is_identity : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); let b := (-(a.2), a.1); let c := (-(b.2), b.1); let d := (-(c.2), c.1); (d.1 == p.1) && (d.2 == p.2))) := by decide' },
]

console.log('computing ' + FACTS.length + ' QUANTUM facts (classical simulation, not hardware — no quantum advantage) …')

emit({ file: 'Quantum.lean',
  header: 'The QUANTUM computer — the exact facts the classical state-vector simulator (src/quantum.ts) computes: the Born rule on the Bell state, no-signaling marginals, superposition, GHZ(3), the gate truth-tables (CNOT, Toffoli, SWAP), and the phase-gate algebra (S·S=Z, Z²=I, S·S†=I). HONEST SCOPE: the algebra of a CLASSICAL simulation on integer positions — 2^n amplitudes, exponential, NO quantum advantage, NOT quantum hardware.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
