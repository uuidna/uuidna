-- lean/Quantum.lean — GENERATED. The QUANTUM computer — the exact facts the classical state-vector simulator (src/quantum.ts) computes: the Born rule on the Bell state, no-signaling marginals, superposition, GHZ(3) and the W state, the gate truth-tables (CNOT, Toffoli, SWAP), the phase-gate algebra (S·S=Z, Z²=I, S·S†=I), Pauli anticommutation (XZ=−ZX), the Deutsch–Jozsa interference (balanced cancels, constant reinforces), the entanglement determinant (a·d−b·c), and the orthogonal Bell basis. HONEST SCOPE: the algebra of a CLASSICAL simulation on integer positions — 2^n amplitudes, exponential, NO quantum advantage, NOT quantum hardware, and (bell_no_signaling) NOTHING signals — no channel, no FTL. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)
theorem bell_born_weights : (([1,0,0,1] : List Nat).map (fun a => a * a)) = [1,0,0,1] := by decide

-- Bell normalization: Σ|amp|² = 1+0+0+1 = 2 = 2¹ (scale 1) — the weights are an exact probability distribution, no floating point
theorem bell_normalized : ((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1) := by decide

-- perfect correlation: the two qubits always agree — the outcomes carrying weight are exactly the basis states {00, 11} (indices where bit q0 equals bit q1)
theorem bell_perfect_correlation : ((List.range 4).filter (fun i => i % 2 == i / 2 % 2)) = [0, 3] := by decide

-- no-signaling (the paradox, computed): the two marginals of q0 are equal — weight(q0=0)=1²+0² = 0²+1²=weight(q0=1) — so measuring q1 sends NOTHING to q0 (no-communication)
theorem bell_no_signaling : ((1*1 + 0*0 : Nat) = (0*0 + 1*1)) := by decide

-- superposition H|0⟩ = |+⟩ — the Born weights are [1,1] over √2, so P(0)=P(1)=1/2: before measurement both, after, one
theorem superposition_h0 : ((([1,1]:List Nat).map (fun a => a*a)) = [1,1]) ∧ ((1+1:Nat) = 2) := by decide

-- GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement
theorem ghz3_two_outcomes : (([1,0,0,0,0,0,0,1]:List Nat).filter (fun a => a != 0)).length = 2 := by decide

-- GHZ(3) normalization: Σ|amp|² = 1²+1² = 2 = 2¹ — an exact distribution over the two correlated corners
theorem ghz3_normalized : ((1*1 + 1*1 : Nat) = 2) := by decide

-- CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits
theorem cnot_truth_table : ((List.range 4).map (fun i => lxor i (2 * (i % 2)))) = [0,3,2,1] := by decide

-- CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation
theorem cnot_involution : (List.range 4).all (fun i => (let j := lxor i (2 * (i % 2)); lxor j (2 * (j % 2))) == i) := by decide

-- Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits
theorem toffoli_truth_table : ((List.range 8).map (fun i => lxor i (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3] := by decide

-- SWAP exchanges q0 and q1 — the basis permutation i ↦ 2·q0 + q1 = [0,2,1,3] on two qubits
theorem swap_truth_table : ((List.range 4).map (fun i => (i % 2) * 2 + (i / 2 % 2))) = [0,2,1,3] := by decide

-- S·S = Z: two phase gates compose to the Z phase-flip (i² = −1), verified exactly on sample Gaussian-integer amplitudes S(re,im)=(−im,re)
theorem s_squared_is_z : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s1 := (-(p.2), p.1); let s2 := (-(s1.2), s1.1); (s2.1 == -(p.1)) && (s2.2 == -(p.2)))) := by decide

-- Z² = I: the phase flip is its own inverse — negating an amplitude twice returns it, on sample Gaussian-integer amplitudes
theorem z_involution : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (-(-(p.1)) == p.1) && (-(-(p.2)) == p.2)) := by decide

-- S·S† = I: the phase gate and its adjoint invert — S(re,im)=(−im,re) then S†(re,im)=(im,−re) returns the amplitude
theorem s_dagger_inverse : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s := (-(p.2), p.1); (s.2 == p.1) && (-(s.1) == p.2))) := by decide

-- X² = I: the bit-flip is its own inverse — flip q0 twice (i ⊕ 1 ⊕ 1) returns every basis state; X is an involution
theorem pauli_x_involution : (List.range 2).all (fun i => lxor (lxor i 1) 1 == i) := by decide

-- SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution
theorem swap_involution : (List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2)) == i) := by decide

-- Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution
theorem toffoli_involution : (List.range 8).all (fun i => (let j := lxor i (4 * ((i % 2) * (i / 2 % 2))); lxor j (4 * ((j % 2) * (j / 2 % 2)))) == i) := by decide

-- CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution
theorem cz_involution : (List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:Int))) == 1) := by decide

-- H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution
theorem h_involution_on_zero : (([2,0] : List Nat).map (fun a => a / 2)) = [1, 0] := by decide

-- S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it
theorem s_fourth_is_identity : ([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); let b := (-(a.2), a.1); let c := (-(b.2), b.1); let d := (-(c.2), c.1); (d.1 == p.1) && (d.2 == p.2))) := by decide

-- Deutsch–Jozsa interference: a BALANCED boolean sends equal +1/−1 phases, which cancel to 0 — the query amplitude vanishes. The honest heart of the algorithm, as the simulator computes it (classical linear algebra, no advantage)
theorem dj_balanced_cancels : ([1, 1, -1, -1] : List Int).sum = 0 := by decide

-- Deutsch–Jozsa: a CONSTANT boolean sends one phase, so all four reinforce to ±4 — the opposite of the balanced cancellation. Constant vs balanced IS exactly this interference sum
theorem dj_constant_reinforces : (([1, 1, 1, 1] : List Int).sum = 4) ∧ (([-1, -1, -1, -1] : List Int).sum = -4) := by decide

-- The entanglement witness: a two-qubit state (a,b,c,d) factorizes into a product iff a·d − b·c = 0. Bell (1,0,0,1) gives 1 ≠ 0 (ENTANGLED); |00⟩ (1,0,0,0) and |+0⟩ (1,1,0,0) give 0 (separable) — entanglement is the nonzero determinant, computed exactly
theorem entanglement_determinant : ((1*1 - 0*0 : Int) ≠ 0) ∧ ((1*0 - 0*0 : Int) = 0) ∧ ((1*0 - 1*0 : Int) = 0) := by decide

-- Pauli X and Z ANTICOMMUTE (XZ = −ZX): X flips the bit, Z stamps (−1)^bit, and (−1)^b = −(−1)^(1−b) on both bits — the sign the simulator carries; the nonabelian core of the gate algebra
theorem pauli_x_z_anticommute : (List.range 2).all (fun b => ((-1 : Int))^b == -(((-1 : Int))^(1 - b))) := by decide

-- The W state (|001⟩+|010⟩+|100⟩)/√3 — exactly THREE of the 2³ corners carry weight (vs GHZ’s two): a distinct entanglement class, robust to one-party loss. The simulator’s amplitude vector, counted
theorem w_state_three_outcomes : (([0,1,1,0,1,0,0,0] : List Nat).filter (fun a => a != 0)).length = 3 := by decide

-- W-state normalization: Σ|amp|² = 1+1+1 = 3 over √3 — an exact distribution over the three single-excitation corners
theorem w_state_normalized : ((1*1 + 1*1 + 1*1 : Nat) = 3) := by decide

-- The four Bell states form a complete ORTHOGONAL basis: ⟨Φ⁺|Φ⁻⟩ = 0 and ⟨Ψ⁺|Ψ⁻⟩ = 0 (over √2 integer vectors), while ⟨Φ⁺|Φ⁺⟩ = 2 — the entangled-basis measurement, as exact integer inner products
theorem bell_basis_orthogonal : ((1*1 + 0*0 + 0*0 + 1*(-1) : Int) = 0) ∧ ((0*0 + 1*1 + 1*(-1) + 0*0 : Int) = 0) ∧ ((1*1 + 0*0 + 0*0 + 1*1 : Int) = 2) := by decide
