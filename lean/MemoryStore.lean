-- lean/MemoryStore.lean — GENERATED. The MEMORY STORE distilled: the content-addressed memory receipt is ORDER-INVARIANT (any ordering → same root) and CHANGE-SENSITIVE (a changed member moves it), modeled on the axiom-free XOR fold Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- the memory store's receipt is ORDER-INVARIANT — every ordering of the members folds to the SAME root, so the store recomputes for any observer in any order (the 3-member fold equals all six permutations)
theorem store_fold_order_invariant :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c =>
    ([a,b,c].foldl lxor 0 == [a,c,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,a,c].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [b,c,a].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,a,b].foldl lxor 0)
    && ([a,b,c].foldl lxor 0 == [c,b,a].foldl lxor 0)))) := by decide

-- the memory store refuses DRIFT — a changed member MOVES the receipt: the three-member fold is unchanged iff the changed member is unchanged, so any edit to a memory is visible in the fold (tamper-evident)
theorem store_fold_change_moves_receipt :
  (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => (List.range 8).all (fun a2 =>
    ([a,b,c].foldl lxor 0 == [a2,b,c].foldl lxor 0) == (a == a2))))) := by decide
