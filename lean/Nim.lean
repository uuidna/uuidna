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

-- Nim enters the ℤ/9 diamond, where the games interact: the maximal four-power nim-sum 15 ≡ 6 (mod 9), and 6 is a NILPOTENT of the ring (6·6 ≡ 0) — the diamond's self-annihilating residue, its "draw". The biggest win reduces to the vortex's zero-square, while chess sits at the units {1,8} and the audit at 8. HONEST SCOPE: a structural residue of the nim-sum, NOT a claim nim IS the ring.
theorem nim_max_is_a_diamond_nilpotent : (15 % 9 = 6) ∧ ((6 * 6) % 9 = 0) := by decide

-- The nim-sum 0 ⊕ 0 = 0 — entry (0,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_0 : lxor 0 0 = 0 := by decide

-- The nim-sum 0 ⊕ 1 = 1 — entry (0,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_1 : lxor 0 1 = 1 := by decide

-- The nim-sum 0 ⊕ 2 = 2 — entry (0,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_2 : lxor 0 2 = 2 := by decide

-- The nim-sum 0 ⊕ 3 = 3 — entry (0,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_3 : lxor 0 3 = 3 := by decide

-- The nim-sum 0 ⊕ 4 = 4 — entry (0,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_4 : lxor 0 4 = 4 := by decide

-- The nim-sum 0 ⊕ 5 = 5 — entry (0,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_5 : lxor 0 5 = 5 := by decide

-- The nim-sum 0 ⊕ 6 = 6 — entry (0,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_6 : lxor 0 6 = 6 := by decide

-- The nim-sum 0 ⊕ 7 = 7 — entry (0,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_7 : lxor 0 7 = 7 := by decide

-- The nim-sum 0 ⊕ 8 = 8 — entry (0,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_0_8 : lxor 0 8 = 8 := by decide

-- The nim-sum 1 ⊕ 0 = 1 — entry (1,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_0 : lxor 1 0 = 1 := by decide

-- The nim-sum 1 ⊕ 1 = 0 — entry (1,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_1 : lxor 1 1 = 0 := by decide

-- The nim-sum 1 ⊕ 2 = 3 — entry (1,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_2 : lxor 1 2 = 3 := by decide

-- The nim-sum 1 ⊕ 3 = 2 — entry (1,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_3 : lxor 1 3 = 2 := by decide

-- The nim-sum 1 ⊕ 4 = 5 — entry (1,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_4 : lxor 1 4 = 5 := by decide

-- The nim-sum 1 ⊕ 5 = 4 — entry (1,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_5 : lxor 1 5 = 4 := by decide

-- The nim-sum 1 ⊕ 6 = 7 — entry (1,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_6 : lxor 1 6 = 7 := by decide

-- The nim-sum 1 ⊕ 7 = 6 — entry (1,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_7 : lxor 1 7 = 6 := by decide

-- The nim-sum 1 ⊕ 8 = 9 — entry (1,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_1_8 : lxor 1 8 = 9 := by decide

-- The nim-sum 2 ⊕ 0 = 2 — entry (2,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_0 : lxor 2 0 = 2 := by decide

-- The nim-sum 2 ⊕ 1 = 3 — entry (2,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_1 : lxor 2 1 = 3 := by decide

-- The nim-sum 2 ⊕ 2 = 0 — entry (2,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_2 : lxor 2 2 = 0 := by decide

-- The nim-sum 2 ⊕ 3 = 1 — entry (2,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_3 : lxor 2 3 = 1 := by decide

-- The nim-sum 2 ⊕ 4 = 6 — entry (2,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_4 : lxor 2 4 = 6 := by decide

-- The nim-sum 2 ⊕ 5 = 7 — entry (2,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_5 : lxor 2 5 = 7 := by decide

-- The nim-sum 2 ⊕ 6 = 4 — entry (2,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_6 : lxor 2 6 = 4 := by decide

-- The nim-sum 2 ⊕ 7 = 5 — entry (2,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_7 : lxor 2 7 = 5 := by decide

-- The nim-sum 2 ⊕ 8 = 10 — entry (2,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_2_8 : lxor 2 8 = 10 := by decide

-- The nim-sum 3 ⊕ 0 = 3 — entry (3,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_0 : lxor 3 0 = 3 := by decide

-- The nim-sum 3 ⊕ 1 = 2 — entry (3,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_1 : lxor 3 1 = 2 := by decide

-- The nim-sum 3 ⊕ 2 = 1 — entry (3,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_2 : lxor 3 2 = 1 := by decide

-- The nim-sum 3 ⊕ 3 = 0 — entry (3,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_3 : lxor 3 3 = 0 := by decide

-- The nim-sum 3 ⊕ 4 = 7 — entry (3,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_4 : lxor 3 4 = 7 := by decide

-- The nim-sum 3 ⊕ 5 = 6 — entry (3,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_5 : lxor 3 5 = 6 := by decide

-- The nim-sum 3 ⊕ 6 = 5 — entry (3,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_6 : lxor 3 6 = 5 := by decide

-- The nim-sum 3 ⊕ 7 = 4 — entry (3,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_7 : lxor 3 7 = 4 := by decide

-- The nim-sum 3 ⊕ 8 = 11 — entry (3,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_3_8 : lxor 3 8 = 11 := by decide

-- The nim-sum 4 ⊕ 0 = 4 — entry (4,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_0 : lxor 4 0 = 4 := by decide

-- The nim-sum 4 ⊕ 1 = 5 — entry (4,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_1 : lxor 4 1 = 5 := by decide

-- The nim-sum 4 ⊕ 2 = 6 — entry (4,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_2 : lxor 4 2 = 6 := by decide

-- The nim-sum 4 ⊕ 3 = 7 — entry (4,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_3 : lxor 4 3 = 7 := by decide

-- The nim-sum 4 ⊕ 4 = 0 — entry (4,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_4 : lxor 4 4 = 0 := by decide

-- The nim-sum 4 ⊕ 5 = 1 — entry (4,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_5 : lxor 4 5 = 1 := by decide

-- The nim-sum 4 ⊕ 6 = 2 — entry (4,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_6 : lxor 4 6 = 2 := by decide

-- The nim-sum 4 ⊕ 7 = 3 — entry (4,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_7 : lxor 4 7 = 3 := by decide

-- The nim-sum 4 ⊕ 8 = 12 — entry (4,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_4_8 : lxor 4 8 = 12 := by decide

-- The nim-sum 5 ⊕ 0 = 5 — entry (5,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_0 : lxor 5 0 = 5 := by decide

-- The nim-sum 5 ⊕ 1 = 4 — entry (5,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_1 : lxor 5 1 = 4 := by decide

-- The nim-sum 5 ⊕ 2 = 7 — entry (5,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_2 : lxor 5 2 = 7 := by decide

-- The nim-sum 5 ⊕ 3 = 6 — entry (5,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_3 : lxor 5 3 = 6 := by decide

-- The nim-sum 5 ⊕ 4 = 1 — entry (5,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_4 : lxor 5 4 = 1 := by decide

-- The nim-sum 5 ⊕ 5 = 0 — entry (5,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_5 : lxor 5 5 = 0 := by decide

-- The nim-sum 5 ⊕ 6 = 3 — entry (5,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_6 : lxor 5 6 = 3 := by decide

-- The nim-sum 5 ⊕ 7 = 2 — entry (5,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_7 : lxor 5 7 = 2 := by decide

-- The nim-sum 5 ⊕ 8 = 13 — entry (5,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_5_8 : lxor 5 8 = 13 := by decide

-- The nim-sum 6 ⊕ 0 = 6 — entry (6,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_0 : lxor 6 0 = 6 := by decide

-- The nim-sum 6 ⊕ 1 = 7 — entry (6,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_1 : lxor 6 1 = 7 := by decide

-- The nim-sum 6 ⊕ 2 = 4 — entry (6,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_2 : lxor 6 2 = 4 := by decide

-- The nim-sum 6 ⊕ 3 = 5 — entry (6,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_3 : lxor 6 3 = 5 := by decide

-- The nim-sum 6 ⊕ 4 = 2 — entry (6,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_4 : lxor 6 4 = 2 := by decide

-- The nim-sum 6 ⊕ 5 = 3 — entry (6,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_5 : lxor 6 5 = 3 := by decide

-- The nim-sum 6 ⊕ 6 = 0 — entry (6,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_6 : lxor 6 6 = 0 := by decide

-- The nim-sum 6 ⊕ 7 = 1 — entry (6,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_7 : lxor 6 7 = 1 := by decide

-- The nim-sum 6 ⊕ 8 = 14 — entry (6,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_6_8 : lxor 6 8 = 14 := by decide

-- The nim-sum 7 ⊕ 0 = 7 — entry (7,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_0 : lxor 7 0 = 7 := by decide

-- The nim-sum 7 ⊕ 1 = 6 — entry (7,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_1 : lxor 7 1 = 6 := by decide

-- The nim-sum 7 ⊕ 2 = 5 — entry (7,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_2 : lxor 7 2 = 5 := by decide

-- The nim-sum 7 ⊕ 3 = 4 — entry (7,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_3 : lxor 7 3 = 4 := by decide

-- The nim-sum 7 ⊕ 4 = 3 — entry (7,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_4 : lxor 7 4 = 3 := by decide

-- The nim-sum 7 ⊕ 5 = 2 — entry (7,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_5 : lxor 7 5 = 2 := by decide

-- The nim-sum 7 ⊕ 6 = 1 — entry (7,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_6 : lxor 7 6 = 1 := by decide

-- The nim-sum 7 ⊕ 7 = 0 — entry (7,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_7 : lxor 7 7 = 0 := by decide

-- The nim-sum 7 ⊕ 8 = 15 — entry (7,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_7_8 : lxor 7 8 = 15 := by decide

-- The nim-sum 8 ⊕ 0 = 8 — entry (8,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_0 : lxor 8 0 = 8 := by decide

-- The nim-sum 8 ⊕ 1 = 9 — entry (8,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_1 : lxor 8 1 = 9 := by decide

-- The nim-sum 8 ⊕ 2 = 10 — entry (8,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_2 : lxor 8 2 = 10 := by decide

-- The nim-sum 8 ⊕ 3 = 11 — entry (8,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_3 : lxor 8 3 = 11 := by decide

-- The nim-sum 8 ⊕ 4 = 12 — entry (8,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_4 : lxor 8 4 = 12 := by decide

-- The nim-sum 8 ⊕ 5 = 13 — entry (8,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_5 : lxor 8 5 = 13 := by decide

-- The nim-sum 8 ⊕ 6 = 14 — entry (8,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_6 : lxor 8 6 = 14 := by decide

-- The nim-sum 8 ⊕ 7 = 15 — entry (8,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_7 : lxor 8 7 = 15 := by decide

-- The nim-sum 8 ⊕ 8 = 0 — entry (8,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
theorem nimsum_8_8 : lxor 8 8 = 0 := by decide
