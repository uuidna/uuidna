-- lean/EquilibriumXor3.lean — GENERATED. THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 3 OF 8 — translations 16 to 23 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. Same sixty-four claims as before the split; the claim is not narrowed, the chunk is sized to a lane. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 16: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_16 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 16) (lxor d 16) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 17: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_17 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 17) (lxor d 17) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 18: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_18 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 18) (lxor d 18) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 19: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_19 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 19) (lxor d 19) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 20: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_20 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 20) (lxor d 20) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 21: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_21 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 21) (lxor d 21) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 22: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_22 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 22) (lxor d 22) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 23: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_23 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 23) (lxor d 23) == lxor c d)) := by decide
