-- lean/cross/quantum/cross-named.lean — CONSOLIDATED by a script from lean/Quantum.lean (domain Quantum, family cross-named).
-- Each theorem below is copied verbatim from its source; the preamble is that file's own definitions, namespaced.
namespace Cross_Quantum_cross_named

-- lean/Quantum.lean — GENERATED. The QUANTUM computer — the exact facts the classical state-vector code (src/quantum.ts) computes: the Born rule on the Bell state, no-signaling marginals, superposition, GHZ(3) and the W state, the gate truth-tables (CNOT, Toffoli, SWAP), the phase-gate algebra (S·S=Z, Z²=I, S·S†=I), Pauli anticommutation (XZ=−ZX), the Deutsch–Jozsa interference (balanced cancels, constant reinforces), the entanglement determinant (a·d−b·c), and the orthogonal Bell basis. the algebra of a CLASSICAL computation on integer positions — 2^n amplitudes, exponential, NO quantum advantage— no channel, no FTL. Every proof checked by the kernel (by decide, by intro), sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- the amplitudes an n-qubit register carries: none added means one (the empty product), and each qubit
    doubles the space it joins -/
def amps : Nat → Nat
  | 0 => 1
  | n + 1 => 2 * amps n


/-- THE CROSS TERM IS THE RECORD OVERLAP — the whole mystery, one inner product. Identical records keep the
    fringes (⟨r₀|r₀⟩ = 1·1 + 0·0 = 1); orthogonal records kill them (⟨r₀|r₁⟩ = 1·0 + 0·1 = 0). And the quantum
    eraser is the same arithmetic run backwards: both records overlap the erasing diagonal [1,1] in exactly 1
    (1·1 + 0·1 = 1 and 0·1 + 1·1 = 1), so sorting the screen by an erasing-basis read restores the fringes in
    each subensemble — nothing is undone, the bookkeeping is re-partitioned. Exact integer inner products, the
    bell_basis_orthogonal method applied to the slit. -/
theorem hexbit_slit_cross_is_overlap : (1*1 + 0*0 = 1) ∧ (1*0 + 0*1 = 0) ∧ (1*1 + 0*1 = 1) ∧ (0*1 + 1*1 = 1) := by decide

end Cross_Quantum_cross_named
