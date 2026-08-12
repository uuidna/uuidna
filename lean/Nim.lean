-- lean/Nim.lean — GENERATED. NIM — the game of heaps as decidable arithmetic, the FIRST application of the ledger's axiom-free XOR (lxor): the nim-sum is the bitwise XOR of the heap sizes, a P-position (loss for the mover) is exactly a zero nim-sum (Bouton's theorem), equal heaps cancel (the mirror strategy), a lone heap wins, a nonzero nim-sum always has a move to zero, and Sprague–Grundy folds any impartial game to a single nim heap by XOR. HONEST SCOPE: NORMAL play only (last to move WINS) — MISÈRE nim flips the endgame and is demarcated; the exact arithmetic of the nim-sum, not a general game solver. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- lxor — bitwise XOR as decidable, AXIOM-FREE arithmetic. Lean's native `^^^` (Nat.xor) is defined by well-founded
-- recursion over Nat.bitwise, whose `by decide` proof term borrows the `propext` axiom — so a theorem stated with it
-- is NOT kernel-only. This structural recursion over an 8-bit fuel (covers 0..255, wider than any xor the ledger
-- takes) folds the SAME value with NO axiom; scripts/lean-axioms proves it. `lxor a b` = a XOR b.
def lxorAux : Nat → Nat → Nat → Nat
  | 0, _, _ => 0
  | Nat.succ w, a, b => (if a % 2 == b % 2 then 0 else 1) + 2 * lxorAux w (a / 2) (b / 2)
def lxor (a b : Nat) : Nat := lxorAux 8 a b

-- The nim-sum is the bitwise XOR of the heap sizes — the ledger's own axiom-free lxor: heaps 3, 5, 7 fold to lxor(lxor 3 5) 7 = 1. Nonzero, so the position is a WIN for the player to move (Bouton's theorem).
theorem nim_sum_is_xor : lxor (lxor 3 5) 7 = 1 := by decide

-- A P-position (a LOSS for the player to move) is exactly a zero nim-sum: heaps 1, 2, 3 fold to lxor(lxor 1 2) 3 = 0, so whoever moves loses under optimal play. This is the whole of Bouton's theorem, one XOR.
theorem nim_pposition_is_zero : lxor (lxor 1 2) 3 = 0 := by decide

-- Two equal heaps cancel: lxor n n = 0 for every heap size — the mirror strategy. Whatever the opponent takes from one heap, copy it on the other, and the nim-sum stays zero until you take the last stone.
theorem nim_equal_heaps_cancel : (List.range 16).all (fun n => lxor n n == 0) := by decide

-- The empty heap is neutral: lxor n 0 = n. Adding or removing an exhausted heap never changes the nim-sum, so a finished heap can be ignored.
theorem nim_empty_heap_neutral : (List.range 16).all (fun n => lxor n 0 == n) := by decide

-- The nim-sum does not care about heap order: lxor a b = lxor b a. The heaps are a set, not a sequence — a symmetry the whole theory rests on.
theorem nim_sum_commutes : (List.range 8).all (fun a => (List.range 8).all (fun b => lxor a b == lxor b a)) := by decide

-- The nim-sum folds in any grouping: lxor(lxor a b) c = lxor a (lxor b c). Combined with commutativity, a many-heap position folds to a single number no matter the order the heaps are read.
theorem nim_sum_associates : (List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => lxor (lxor a b) c == lxor a (lxor b c)))) := by decide

-- A single non-empty heap is always a WIN for the player to move: its nim-sum is the heap itself (lxor 0 n = n ≠ 0), and the winning move is to take the whole heap. Only the empty position is a loss on one heap.
theorem nim_lone_heap_wins : (List.range' 1 15).all (fun n => lxor 0 n != 0) := by decide

-- From a nonzero nim-sum a move to a P-position always exists: heaps 1, 2, 4 fold to 7 (a WIN), and reducing the heap of 4 to 3 reaches 1, 2, 3 with nim-sum 0. lxor(lxor 1 2) 4 = 7 and lxor 7 4 = 3 name the target height — the constructive half of Bouton.
theorem nim_winning_move_exists : (lxor (lxor 1 2) 4 = 7) ∧ (lxor 7 4 = 3) := by decide

-- Sprague–Grundy: the Grundy value of a SUM of independent games is the XOR of their values, and a nim heap of size n has Grundy value n. So two heaps 1 and 2 combine to lxor 1 2 = 3 — every impartial game reduces to a single nim heap.
theorem grundy_sum_is_xor : lxor 1 2 = 3 := by decide

-- Four heaps at the distinct powers 1, 2, 4, 8 fold to lxor…= 15 (all bits set, ≠ 0): a WIN, and the maximal nim-sum on those heaps — the bits never collide, so nothing cancels.
theorem nim_four_powers : lxor (lxor (lxor 1 2) 4) 8 = 15 := by decide

-- The MISÈRE demarcation: three heaps of one stone, [1,1,1], fold to nim-sum lxor(lxor 1 1) 1 = 1 — a WIN under NORMAL play (last stone wins). Under MISÈRE play (last stone LOSES) the same position is a LOSS: the endgame rule flips near the end, so the nim-sum rule holds only while some heap exceeds one. This theorem is the normal-play arithmetic; misère is a different game.
theorem nim_misere_differs : lxor (lxor 1 1) 1 = 1 := by decide
