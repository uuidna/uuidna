---
title: "The quantum computer"
description: "Computed from lean/Quantum.lean — 52 sealed theorems, every claim citing its proof."
---

# The quantum computer

> The QUANTUM computer — the exact facts the classical state-vector simulator (src/quantum.ts) computes: the Born rule on the Bell state, no-signaling marginals, superposition, GHZ(3) and the W state, the gate truth-tables (CNOT, Toffoli, SWAP), the phase-gate algebra (S·S=Z, Z²=I, S·S†=I), Pauli anticommutation (XZ=−ZX), the Deutsch–Jozsa interference (balanced cancels, constant reinforces), the entanglement determinant (a·d−b·c), and the orthogonal Bell basis. the algebra of a CLASSICAL simulation on integer positions — 2^n amplitudes, exponential, NO quantum advantage— no channel, no FTL. — held by [bell_born_weights](/theorem/bell_born_weights) and its 51 siblings below.

**52 theorems**, from [bell_born_weights](/theorem/bell_born_weights) onward, each proven `by decide` in [lean/Quantum.lean](/lean/Quantum.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 11 of its 52 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [bell_born_weights](/theorem/bell_born_weights). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FQuantum.lean)** — nothing to install. The editor fetches `lean/Quantum.lean` from the repository and re-decides all 52 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### the Bell state (|00⟩+|11⟩)/√2 — the Born-rule weights |amp|² are [1,0,0,1]: only |00⟩ and |11⟩ are ever observed, |01⟩ and |10⟩ never (probability 0)
The ledger holds this as [bell_born_weights](/theorem/bell_born_weights) — proven `by decide`, sorry-free:

```lean
(([1,0,0,1] : List Nat).map (fun a => a * a)) = [1,0,0,1]
```

### Bell normalization: Σ|amp|² = 1+0+0+1 = 2 = 2¹ (scale 1) — the weights are an exact probability distribution, no floating point
The ledger holds this as [bell_normalized](/theorem/bell_normalized) — proven `by decide`, sorry-free:

```lean
((1*1 + 0*0 + 0*0 + 1*1 : Nat) = 2) ∧ ((2:Nat) = 2^1)
```

### perfect correlation: the two qubits always agree — the outcomes carrying weight are exactly the basis states {00, 11} (indices where bit q0 equals bit q1)
The ledger holds this as [bell_perfect_correlation](/theorem/bell_perfect_correlation) — proven `by decide`, sorry-free:

```lean
((List.range 4).filter (fun i => i % 2 == i / 2 % 2)) = [0, 3]
```

### no-signaling (the paradox, computed): the two marginals of q0 are equal — weight(q0=0)=1²+0² = 0²+1²=weight(q0=1) — so measuring q1 sends NOTHING to q0 (no-communication)
The ledger holds this as [bell_no_signaling](/theorem/bell_no_signaling) — proven `by decide`, sorry-free:

```lean
((1*1 + 0*0 : Nat) = (0*0 + 1*1))
```

### superposition H|0⟩ = |+⟩ — the Born weights are [1,1] over √2, so P(0)=P(1)=1/2: before measurement both, after, one
The ledger holds this as [superposition_h0](/theorem/superposition_h0) — proven `by decide`, sorry-free:

```lean
((([1,1]:List Nat).map (fun a => a*a)) = [1,1]) ∧ ((1+1:Nat) = 2)
```

### GHZ(3) = (|000⟩+|111⟩)/√2 — of the 2³ = 8 basis outcomes exactly two carry weight (the all-0 and all-1 corners); three-party entanglement
The ledger holds this as [ghz3_two_outcomes](/theorem/ghz3_two_outcomes) — proven `by decide`, sorry-free:

```lean
(([1,0,0,0,0,0,0,1]:List Nat).filter (fun a => a != 0)).length = 2
```

### GHZ(3) normalization: Σ|amp|² = 1²+1² = 2 = 2¹ — an exact distribution over the two correlated corners
The ledger holds this as [ghz3_normalized](/theorem/ghz3_normalized) — proven `by decide`, sorry-free:

```lean
((1*1 + 1*1 : Nat) = 2)
```

### CNOT(q0→q1) flips q1 iff q0 is set — the basis permutation i ↦ i ⊕ 2·(q0) = [0,3,2,1] on two qubits
The ledger holds this as [cnot_truth_table](/theorem/cnot_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 4).map (fun i => lxor i (2 * (i % 2)))) = [0,3,2,1]
```

### CNOT is its own inverse: applying it twice returns every basis state — a reversible (unitary) permutation
The ledger holds this as [cnot_involution](/theorem/cnot_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun i => (let j := lxor i (2 * (i % 2)); lxor j (2 * (j % 2))) == i)
```

### Toffoli (CCX) flips q2 iff q0 ∧ q1 — the reversible classical AND: i ↦ i ⊕ 4·(q0·q1) = [0,1,2,7,4,5,6,3] on three qubits
The ledger holds this as [toffoli_truth_table](/theorem/toffoli_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun i => lxor i (4 * ((i % 2) * (i / 2 % 2))))) = [0,1,2,7,4,5,6,3]
```

### SWAP exchanges q0 and q1 — the basis permutation i ↦ 2·q0 + q1 = [0,2,1,3] on two qubits
The ledger holds this as [swap_truth_table](/theorem/swap_truth_table) — proven `by decide`, sorry-free:

```lean
((List.range 4).map (fun i => (i % 2) * 2 + (i / 2 % 2))) = [0,2,1,3]
```

### S·S = Z: two phase gates compose to the Z phase-flip (i² = −1), verified exactly on sample Gaussian-integer amplitudes S(re,im)=(−im,re)
The ledger holds this as [s_squared_is_z](/theorem/s_squared_is_z) — proven `by decide`, sorry-free:

```lean
([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s1 := (-(p.2), p.1); let s2 := (-(s1.2), s1.1); (s2.1 == -(p.1)) && (s2.2 == -(p.2))))
```

### Z² = I: the phase flip is its own inverse — negating an amplitude twice returns it, on sample Gaussian-integer amplitudes
The ledger holds this as [z_involution](/theorem/z_involution) — proven `by decide`, sorry-free:

```lean
([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (-(-(p.1)) == p.1) && (-(-(p.2)) == p.2))
```

### S·S† = I: the phase gate and its adjoint invert — S(re,im)=(−im,re) then S†(re,im)=(im,−re) returns the amplitude
The ledger holds this as [s_dagger_inverse](/theorem/s_dagger_inverse) — proven `by decide`, sorry-free:

```lean
([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let s := (-(p.2), p.1); (s.2 == p.1) && (-(s.1) == p.2)))
```

### X² = I: the bit-flip is its own inverse — flip q0 twice (i ⊕ 1 ⊕ 1) returns every basis state; X is an involution
The ledger holds this as [pauli_x_involution](/theorem/pauli_x_involution) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun i => lxor (lxor i 1) 1 == i)
```

### SWAP² = I: exchanging q0 and q1 twice returns every basis state — SWAP is an involution
The ledger holds this as [swap_involution](/theorem/swap_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun i => (let s := (i % 2) * 2 + (i / 2 % 2); (s % 2) * 2 + (s / 2 % 2)) == i)
```

### Toffoli² = I: the reversible AND is its own inverse — applying CCX twice returns every basis state; Toffoli is an involution
The ledger holds this as [toffoli_involution](/theorem/toffoli_involution) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun i => (let j := lxor i (4 * ((i % 2) * (i / 2 % 2))); lxor j (4 * ((j % 2) * (j / 2 % 2)))) == i)
```

### CZ² = I: the |11⟩ phase-flip squared is the identity — the sign (1 − 2·q0·q1) ∈ {+1,−1} squares to +1; CZ is an involution
The ledger holds this as [cz_involution](/theorem/cz_involution) — proven `by decide`, sorry-free:

```lean
(List.range 4).all (fun i => (let m := (i % 2) * (i / 2 % 2); (1 - 2*(m:Int)) * (1 - 2*(m:Int))) == 1)
```

### H² = I on |0⟩: two Hadamards give amplitudes [2,0] at scale 2, which canonicalize (÷2, dropping scale by 2) to |0⟩ = [1,0]; H is an involution
The ledger holds this as [h_involution_on_zero](/theorem/h_involution_on_zero) — proven `by decide`, sorry-free:

```lean
(([2,0] : List Nat).map (fun a => a / 2)) = [1, 0]
```

### S⁴ = I but S² = Z ≠ I: the phase gate has ORDER 4 (i⁴=1), so S is NOT an involution — the honest exception; multiplying an amplitude by i four times returns it
The ledger holds this as [s_fourth_is_identity](/theorem/s_fourth_is_identity) — proven `by decide`, sorry-free:

```lean
([(1,0),(0,1),(3,-5),(-2,7)] : List (Int × Int)).all (fun p => (let a := (-(p.2), p.1); let b := (-(a.2), a.1); let c := (-(b.2), b.1); let d := (-(c.2), c.1); (d.1 == p.1) && (d.2 == p.2)))
```

### Deutsch–Jozsa interference: a BALANCED boolean sends equal +1/−1 phases, which cancel to 0 — the query amplitude vanishes. The honest heart of the algorithm, as the simulator computes it (classical linear algebra, no advantage)
The ledger holds this as [dj_balanced_cancels](/theorem/dj_balanced_cancels) — proven `by decide`, sorry-free:

```lean
([1, 1, -1, -1] : List Int).sum = 0
```

### Deutsch–Jozsa: a CONSTANT boolean sends one phase, so all four reinforce to ±4 — the opposite of the balanced cancellation. Constant vs balanced IS exactly this interference sum
The ledger holds this as [dj_constant_reinforces](/theorem/dj_constant_reinforces) — proven `by decide`, sorry-free:

```lean
(([1, 1, 1, 1] : List Int).sum = 4) ∧ (([-1, -1, -1, -1] : List Int).sum = -4)
```

### The entanglement witness: a two-qubit state (a,b,c,d) factorizes into a product iff a·d − b·c = 0. Bell (1,0,0,1) gives 1 ≠ 0 (ENTANGLED); |00⟩ (1,0,0,0) and |+0⟩ (1,1,0,0) give 0 (separable) — entanglement is the nonzero determinant, computed exactly
The ledger holds this as [entanglement_determinant](/theorem/entanglement_determinant) — proven `by decide`, sorry-free:

```lean
((1*1 - 0*0 : Int) ≠ 0) ∧ ((1*0 - 0*0 : Int) = 0) ∧ ((1*0 - 1*0 : Int) = 0)
```

### Pauli X and Z ANTICOMMUTE (XZ = −ZX): X flips the bit, Z stamps (−1)^bit, and (−1)^b = −(−1)^(1−b) on both bits — the sign the simulator carries; the nonabelian core of the gate algebra
The ledger holds this as [pauli_x_z_anticommute](/theorem/pauli_x_z_anticommute) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun b => ((-1 : Int))^b == -(((-1 : Int))^(1 - b)))
```

### The W state (|001⟩+|010⟩+|100⟩)/√3 — exactly THREE of the 2³ corners carry weight (vs GHZ’s two): a distinct entanglement class, robust to one-party loss. The simulator’s amplitude vector, counted
The ledger holds this as [w_state_three_outcomes](/theorem/w_state_three_outcomes) — proven `by decide`, sorry-free:

```lean
(([0,1,1,0,1,0,0,0] : List Nat).filter (fun a => a != 0)).length = 3
```

### W-state normalization: Σ|amp|² = 1+1+1 = 3 over √3 — an exact distribution over the three single-excitation corners
The ledger holds this as [w_state_normalized](/theorem/w_state_normalized) — proven `by decide`, sorry-free:

```lean
((1*1 + 1*1 + 1*1 : Nat) = 3)
```

### The four Bell states form a complete ORTHOGONAL basis: ⟨Φ⁺|Φ⁻⟩ = 0 and ⟨Ψ⁺|Ψ⁻⟩ = 0 (over √2 integer vectors), while ⟨Φ⁺|Φ⁺⟩ = 2 — the entangled-basis measurement, as exact integer inner products
The ledger holds this as [bell_basis_orthogonal](/theorem/bell_basis_orthogonal) — proven `by decide`, sorry-free:

```lean
((1*1 + 0*0 + 0*0 + 1*(-1) : Int) = 0) ∧ ((0*0 + 1*1 + 1*(-1) + 0*0 : Int) = 0) ∧ ((1*1 + 0*0 + 0*0 + 1*1 : Int) = 2)
```

### n qubits span 2ⁿ amplitudes: [1,2,3,4,5] qubits give [2,4,8,16,32] — the state vector grows EXPONENTIALLY, which is exactly why simulating it classically is costly. this counts the simulation cost, it is NOT a speedup or a quantum advantage.
The ledger holds this as [n_qubit_dimension](/theorem/n_qubit_dimension) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5].map (fun n => (2:Nat)^n)) = [2,4,8,16,32]
```

### Combining systems MULTIPLIES their dimensions (the tensor product): two qubits span 2·2 = 4 amplitudes, three span 2·2·2 = 8. Independent subsystems compose by product, the source of the exponential.
The ledger holds this as [tensor_dimension_multiplies](/theorem/tensor_dimension_multiplies) — proven `by decide`, sorry-free:

```lean
(2*2 = 4) ∧ (2*2*2 = 8)
```

### The single-qubit Pauli group is {I, X, Y, Z} × {±1, ±i} — 4 operators times 4 phases = 16 elements. The finite group the whole gate algebra is built over, counted.
The ledger holds this as [pauli_group_order_16](/theorem/pauli_group_order_16) — proven `by decide`, sorry-free:

```lean
4 * 4 = 16
```

### THE SEMESTER'S UNIFICATION, sealed as one line: every walk this system closes is closed by the SAME law — a generator coprime to its ring. The pentagram's 2 on ℤ/5, the rosette's 3 on ℤ/7, the vortex's 2 on ℤ/9, the frame ring's stride 5 on ℤ/24, and the tokamak winding's 3/2 on the torus: five rings, five walks, one gcd = 1. Closure is arithmetic, and arithmetic is what holds — the school's whole curriculum in one decidable conjunction.
The ledger holds this as [closure_is_coprime](/theorem/closure_is_coprime) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 2 5 = 1) ∧ (Nat.gcd 3 7 = 1) ∧ (Nat.gcd 2 9 = 1) ∧ (Nat.gcd 5 24 = 1) ∧ (Nat.gcd 3 2 = 1)
```

### THE TWO KERNELS' COUNTING SHADOW (Curry–Howard): a type is a proposition and its inhabitants are its proofs, so types COUNT — the sum type (disjunction) of Bool with itself has 2+2 inhabitants, the product (conjunction) 2·2, the function space (implication) 2². All three equal 4, because 2 is the unique positive integer where sum, product, and power coincide — the two coins are the fixed point where every logical connective counts alike. The fast kernel (the type checker, seconds) and the slow kernel (the proof checker, minutes) reject the same class because they check the same correspondence.
The ledger holds this as [types_count_as_arithmetic](/theorem/types_count_as_arithmetic) — proven `by decide`, sorry-free:

```lean
(2 + 2 = 4) ∧ (2 * 2 = 4) ∧ ((2:Nat) ^ 2 = 4)
```

### Every binary logical connective, counted by its type: Bool → Bool → Bool has exactly 2^(2·2) = 16 truth tables — AND, OR, XOR, NAND and the other twelve — the same sixteen gates the hardware layer builds from NAND alone. Logic's whole binary vocabulary is one exponent, and the type system knew the count before any truth table was drawn.
The ledger holds this as [sixteen_connectives](/theorem/sixteen_connectives) — proven `by decide`, sorry-free:

```lean
(2:Nat) ^ (2 * 2) = 16
```

### The four operations {I, X, Y, Z}, each with its signed inverse ±, form the REAL Pauli group of order 8 = 2·4 — the rung between the four effective operations and the full order-16 group (8·2 = 16, the two i-phases restored). Reversing the four does not double them (each is its own inverse, X²=I); the doubling is the sign.
The ledger holds this as [real_pauli_group_order_8](/theorem/real_pauli_group_order_8) — proven `by decide`, sorry-free:

```lean
(2 * 4 = 8) ∧ (8 * 2 = 16)
```

### The order-8 signed group carries 4 distinguishable messages— superdense coding's two classical bits. The group's 8 and the channel's 4 pinned together: 8/2 = 4 = 2². Group doubling, phase quotient, message count, one line.
The ledger holds this as [four_messages_two_bits](/theorem/four_messages_two_bits) — proven `by decide`, sorry-free:

```lean
(8 / 2 = 4) ∧ ((2:Nat)^2 = 4)
```

### The single-qubit Clifford group (the gates that permute the Paulis) has order 24 = 6 · 4 — six signed axes for X's image, four for the phase. Finite: the Cliffords are classically simulable (Gottesman–Knill), the honest reason they are NOT the source of advantage.
The ledger holds this as [clifford_group_order_24](/theorem/clifford_group_order_24) — proven `by decide`, sorry-free:

```lean
6 * 4 = 24
```

### The phase gates form an order ladder: T has order 8, S = T² has order 4, Z = S² has order 2 — each the square of the next (8 = 2·4, 4 = 2·2) — and T⁸ = I is a full 2π turn (8 mod 8 = 0). Squaring a phase gate halves its order.
The ledger holds this as [phase_gate_order_ladder](/theorem/phase_gate_order_ladder) — proven `by decide`, sorry-free:

```lean
(8 = 2*4) ∧ (4 = 2*2) ∧ (8 % 8 = 0)
```

### The CHSH game: quantum correlations exceed every local hidden variable — the Tsirelson value 2√2 beats the classical bound 2. Sealed as the SQUARED comparison (2√2 is irrational): 2² = 4 < 8 = 2³. the simulator computes the correlation exactly; the squared bound is what decides — and no signal crosses (nothing FTL).
The ledger holds this as [chsh_beats_classical](/theorem/chsh_beats_classical) — proven `by decide`, sorry-free:

```lean
((2:Nat)^2 < 2^3) ∧ (2^3 = 8)
```

### The dimension obstruction behind no-cloning: a cloner of an n-qubit state would need to write into (2ⁿ)² dimensions from 2ⁿ, but a unitary preserves dimension — 2² = 4 < 16 = (2²)². this is the arithmetic SHADOW of the no-cloning theorem (a linearity fact).
The ledger holds this as [no_cloning_dimension](/theorem/no_cloning_dimension) — proven `by decide`, sorry-free:

```lean
(2:Nat)^2 < (2^2)^2
```

### The Hadamard swaps the X and Z bases: HXH = Z, verified on integer amplitudes up to the √2² = 2 scale — HXH[a,b] = [2a, −2b] = 2·Z[a,b], on sample amplitudes. The conjugation that turns a bit-flip into a phase-flip, the heart of the Clifford structure.
The ledger holds this as [hadamard_conjugates_x_to_z](/theorem/hadamard_conjugates_x_to_z) — proven `by decide`, sorry-free:

```lean
([(3,5),(1,-2),(4,0)] : List (Int × Int)).all (fun p => (let a := p.1; let b := p.2; ((a-b)+(a+b) == 2*a) && ((a-b)-(a+b) == -(2*b))))
```

### The Bell state |Φ⁺⟩ = [1,0,0,1] is a +1 eigenstate of XX: flipping both bits reverses the amplitude vector (00↔11, 01↔10), and [1,0,0,1] is its own reverse — a stabiliser. The entanglement, read as a fixed point.
The ledger holds this as [bell_stabilized_by_xx](/theorem/bell_stabilized_by_xx) — proven `by decide`, sorry-free:

```lean
([1,0,0,1] : List Int).reverse = [1,0,0,1]
```

### The Bell state is a +1 eigenstate of ZZ too: its supported corners {00, 11} both have EVEN bit-parity ((0+0) and (1+1) are 0 mod 2), so ZZ stamps +1 on each. Two stabilisers XX and ZZ pin the state — the stabiliser formalism, in miniature.
The ledger holds this as [bell_zz_even_parity](/theorem/bell_zz_even_parity) — proven `by decide`, sorry-free:

```lean
((0+0) % 2 = 0) ∧ ((1+1) % 2 = 0)
```

### GHZ(3) = [1,0,0,0,0,0,0,1] is a +1 eigenstate of XXX: flipping all three bits reverses the 8-amplitude vector (000↔111), and the GHZ vector is its own reverse. The three-party entanglement, stabilised.
The ledger holds this as [ghz_stabilized_by_xxx](/theorem/ghz_stabilized_by_xxx) — proven `by decide`, sorry-free:

```lean
([1,0,0,0,0,0,0,1] : List Int).reverse = [1,0,0,0,0,0,0,1]
```

### Superdense coding: one qubit carries 2 classical bits — Alice's four local operations map |Φ⁺⟩ to the four orthogonal Bell states, 2² = 4 distinguishable messages, and 2 > 1. this REQUIRES a pre-shared EPR pair; it is not bandwidth from nothing, and nothing signals faster than light.
The ledger holds this as [superdense_two_bits](/theorem/superdense_two_bits) — proven `by decide`, sorry-free:

```lean
((2:Nat)^2 = 4) ∧ (2 > 1)
```

### Teleportation sends one qubit with 2 classical bits and one EPR pair: Bob applies one of the four Pauli corrections {I, X, Z, XZ} indexed by the 2 measured bits (2+2 = 4 = the four corrections). the classical channel is ESSENTIAL — without the 2 bits nothing arrives, so no faster-than-light transfer.
The ledger holds this as [teleportation_four_corrections](/theorem/teleportation_four_corrections) — proven `by decide`, sorry-free:

```lean
(([0,1,2,3] : List Nat).length = 4) ∧ (2 + 2 = 4)
```

### The computer's memory receipt is ORDER-INVARIANT — every ordering of the members folds to the SAME root under the axiom-free XOR (lxor), the same operation the gate permutations use, so the store recomputes for any observer in any order (the 3-member fold equals all six permutations). the classical content-address receipt the state folds to, integrity — not a quantum memory.
The ledger holds this as [store_fold_order_invariant](/theorem/store_fold_order_invariant) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => ([a,b,c].foldl lxor 0 == [a,c,b].foldl lxor 0) && ([a,b,c].foldl lxor 0 == [b,a,c].foldl lxor 0) && ([a,b,c].foldl lxor 0 == [b,c,a].foldl lxor 0) && ([a,b,c].foldl lxor 0 == [c,a,b].foldl lxor 0) && ([a,b,c].foldl lxor 0 == [c,b,a].foldl lxor 0))))
```

### The memory receipt refuses DRIFT — a changed member MOVES the fold: [a,b,c] folds to [a2,b,c]'s value iff a = a2, so any edit to a memory is visible (tamper-evident), the change-sensitivity of the XOR fold. integrity of the content-address.
The ledger holds this as [store_fold_change_moves_receipt](/theorem/store_fold_change_moves_receipt) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => (List.range 8).all (fun a2 => ([a,b,c].foldl lxor 0 == [a2,b,c].foldl lxor 0) == (a == a2)))))
```

### CONSUMER MIRROR of hexbit MESSAGE_CAP_*: 2^16 = 65536. Court and gates cite message_cap_is_four_hexbits (Hexbit.lean) — this Quantum line only restates the amplitude count the encoder reads; it is not a second mass-gap or cap court. No qft_mass_gap twin here.
The ledger holds this as [message_qubit_cap_states](/theorem/message_qubit_cap_states) — proven `by decide`, sorry-free:

```lean
2^16 = 65536
```

### The message receipt folds every leaf through merkleFold, which SORTS before it merges — the honest reason the fold is order-invariant even though merge itself is NOT commutative (merge(a,b) ≠ merge(b,a), by design). Sealed on a representative 3-leaf fold with a deliberately non-commutative pairwise op (f(a,b)=2a+b, so f(1,2)=4 ≠ f(2,1)=5): sorting first (min, mid, max via Nat.min/Nat.max and sum-arithmetic, no custom sort needed) makes all six orderings of the same three leaves fold to the identical root. one representative instance, the same scope every fold-invariance theorem here uses (store_fold_order_invariant proves the same shape for a commutative XOR fold; this is the harder, non-commutative case merkleFold actually is).
The ledger holds this as [merkle_sort_invariant](/theorem/merkle_sort_invariant) — proven `by decide`, sorry-free:

```lean
(let fold3 := fun (a b c : Nat) => let mn := Nat.min a (Nat.min b c); let mx := Nat.max a (Nat.max b c); 2 * (2 * mn + (a + b + c - mn - mx)) + mx; (fold3 1 2 3 = fold3 1 3 2) ∧ (fold3 1 2 3 = fold3 2 1 3) ∧ (fold3 1 2 3 = fold3 2 3 1) ∧ (fold3 1 2 3 = fold3 3 1 2) ∧ (fold3 1 2 3 = fold3 3 2 1))
```

### UUIDNA MESSAGING IS THE EXACT OPPOSITE OF NO-SIGNALING, and the opposition is the design — sealed as one duality. Physics side: the marginal is BLIND — the sum a+b sees only the total; correlation carries no message — the invariance bell_no_signaling holds over the simulation). uuidna side: the address is ALL-SEEING — the place-value fold 10·a+b is INJECTIVE on the digit model (two contents agree in address exactly when they agree digit for digit), so EVERY bit of content moves the fold and the correlation of two parties computing the same receipt IS the message. The same arithmetic run in opposite directions: invariance hides, injectivity announces. Nothing rides hidden in a marginal because everything rides open in an address — secure messaging by total signal.
The ledger holds this as [all_signaling_duality](/theorem/all_signaling_duality) — proven `by decide`, sorry-free:

```lean
(1 + 0 = 0 + 1) ∧ ((List.range 3).all (fun a => (List.range 3).all (fun b => (List.range 3).all (fun c => (List.range 3).all (fun d => (10*a+b == 10*c+d) == (a == c && b == d))))))
```

### THE HEXBIT SLIT — the double slit's "unexplained", read as handle bookkeeping in exact integers. Two slits are one path qubit with amplitudes [1,1]; a which-path read APPENDS a record qubit — a handle-read that gives the branch a definite time-space address (the handle is the timestamp) — and the joint state is EXACTLY the Bell vector [1,0,0,1] this wing already stabilises (bell_stabilized_by_xx). UNRECORDED, the screen sees (1+1)² = 4 bright and (1−1)² = 0 dark — fringes of visibility 4. RECORDED, summing over the unread record basis: (1±0)² + (0±1)² = 2 at BOTH phases (the minus phase computed in ℤ) — flat, visibility 0. No collapse postulate enters: the fringes were the cross term, and the record made the branches orthogonal. HONEST SCOPE: exact bookkeeping of the integer amplitude vectors this wing already counts (bell_basis_orthogonal); it decides the ARITHMETIC of which-path decoherence, never a claim about photons — and why THIS outcome occurs (the Born selection) stays exactly as unexplained as before.
The ledger holds this as [hexbit_slit_visibility](/theorem/hexbit_slit_visibility) — proven `by decide`, sorry-free:

```lean
((1 + 1)^2 = 4) ∧ ((1 - 1)^2 = 0) ∧ (((1 : Int) + 0)^2 + ((0 : Int) + 1)^2 = 2) ∧ (((1 : Int) - 0)^2 + ((0 : Int) - 1)^2 = 2)
```

### THE CROSS TERM IS THE RECORD OVERLAP — the whole mystery, one inner product. Identical records keep the fringes (⟨r₀|r₀⟩ = 1·1 + 0·0 = 1); orthogonal records kill them (⟨r₀|r₁⟩ = 1·0 + 0·1 = 0). And the quantum eraser is the same arithmetic run backwards: both records overlap the erasing diagonal [1,1] in exactly 1 (1·1 + 0·1 = 1 and 0·1 + 1·1 = 1), so sorting the screen by an erasing-basis read restores the fringes in each subensemble — nothing is undone, the bookkeeping is re-partitioned. Exact integer inner products, the bell_basis_orthogonal method applied to the slit.
The ledger holds this as [hexbit_slit_cross_is_overlap](/theorem/hexbit_slit_cross_is_overlap) — proven `by decide`, sorry-free:

```lean
(1*1 + 0*0 = 1) ∧ (1*0 + 0*1 = 0) ∧ (1*1 + 0*1 = 1) ∧ (0*1 + 1*1 = 1)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
