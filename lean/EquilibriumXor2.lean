-- lean/EquilibriumXor2.lean — GENERATED. THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 2 OF 8 — translations 8 to 15 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. Same sixty-four claims as before the split; the claim is not narrowed, the chunk is sized to a lane. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 8: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_8 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 8) (lxor d 8) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 9: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_9 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 9) (lxor d 9) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 10: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_10 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 10) (lxor d 10) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 11: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_11 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 11) (lxor d 11) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 12: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_12 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 12) (lxor d 12) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 13: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_13 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 13) (lxor d 13) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 14: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_14 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 14) (lxor d 14) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 15: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_15 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 15) (lxor d 15) == lxor c d)) := by decide
