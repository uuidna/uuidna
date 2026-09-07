-- lean/EquilibriumXor1.lean — GENERATED. THE XOR TRANSLATIONS ARE AUTOMORPHISMS, FILE 1 OF 8 — translations 0 to 7 of the six-cube, one theorem each, eight to a file so that lean-all's lanes prove the family in parallel: a wing is proved per FILE, and one file of sixty-four near-cap theorems held the whole landing behind a single kernel while every other lane idled. Same sixty-four claims as before the split; the claim is not narrowed, the chunk is sized to a lane. Backed by the chunk law this tree already seals for walk depth (Recursion.lean), applied to walk work. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 0: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_0 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 0) (lxor d 0) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 1: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_1 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 1) (lxor d 1) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 2: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_2 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 2) (lxor d 2) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 3: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_3 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 3) (lxor d 3) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 4: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_4 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 4) (lxor d 4) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 5: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_5 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 5) (lxor d 5) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 6: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_6 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 6) (lxor d 6) == lxor c d)) := by decide

/-- AND THE TRANSLATION IS AN AUTOMORPHISM, for the translation by 7: translating both ends of a pair by the
    same cell leaves their difference unchanged, so an edge stays an edge and a non-edge stays a non-edge, over
    all 4096 ordered pairs. This is the second symmetry the peer's suite claimed for the double, and it holds on
    the undoubled graph already. -/
theorem xor_translation_preserves_adjacency_7 : (List.range 64).all (fun c => (List.range 64).all (fun d => lxor (lxor c 7) (lxor d 7) == lxor c d)) := by decide
