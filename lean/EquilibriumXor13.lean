-- lean/EquilibriumXor13.lean — GENERATED. THE XOR TRANSLATION BY 12 IS AN AUTOMORPHISM, FILE 13 OF 64 — one theorem to a file, the smallest wing that changes no statement: a file is the unit the kernel compiles and saves, so each translation compiles alone, is saved as its own result, and every later step imports it instead of re-computing it. Same 64 claims as before the split; the claim is not narrowed. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 6-bit fuel (covers 0..63, exactly the 6 bits every cell of the six-cube
-- needs) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 6 a b

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 12: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_12 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 12) (lxor d 12) == lxor c d)) := by decide
