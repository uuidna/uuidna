-- lean/EquilibriumXor5.lean — GENERATED. THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 5 OF 8 — translations 32 to 39 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. Same sixty-four claims as before the split; the claim is not narrowed, the chunk is sized to a lane. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 32: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_32 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 32) (lxor d 32) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 33: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_33 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 33) (lxor d 33) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 34: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_34 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 34) (lxor d 34) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 35: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_35 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 35) (lxor d 35) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 36: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_36 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 36) (lxor d 36) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 37: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_37 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 37) (lxor d 37) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 38: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_38 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 38) (lxor d 38) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 39: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_39 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 39) (lxor d 39) == lxor c d)) := by decide
