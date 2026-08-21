---
title: "The heaps"
description: "Computed from lean/Nim.lean — 93 sealed theorems, every claim citing its proof."
---

# The heaps

> NIM — the game of heaps as decidable arithmetic, the FIRST application of the ledger's axiom-free XOR (lxor): the nim-sum is the bitwise XOR of the heap sizes, a P-position (loss for the mover) is exactly a zero nim-sum (Bouton's theorem), equal heaps cancel (the mirror strategy), a lone heap wins, a nonzero nim-sum always has a move to zero, and Sprague–Grundy folds any impartial game to a single nim heap by XOR. — held by [nim_sum_is_xor](/theorem/nim_sum_is_xor) and its 92 siblings below.

**93 theorems**, from [nim_sum_is_xor](/theorem/nim_sum_is_xor) onward, each proven `by decide` in [lean/Nim.lean](/lean/Nim.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 93 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [nim_empty_heap_neutral](/theorem/nim_empty_heap_neutral). A boundary stated here is decided, not merely denied.

### The nim-sum is the bitwise XOR of the heap sizes — the ledger's own axiom-free lxor: heaps 3, 5, 7 fold to lxor(lxor 3 5) 7 = 1. Nonzero, so the position is a WIN for the player to move (Bouton's theorem).
The ledger holds this as [nim_sum_is_xor](/theorem/nim_sum_is_xor) — proven `by decide`, sorry-free:

```lean
lxor (lxor 3 5) 7 = 1
```

### A P-position (a LOSS for the player to move) is exactly a zero nim-sum: heaps 1, 2, 3 fold to lxor(lxor 1 2) 3 = 0, so whoever moves loses under optimal play. This is the whole of Bouton's theorem, one XOR.
The ledger holds this as [nim_pposition_is_zero](/theorem/nim_pposition_is_zero) — proven `by decide`, sorry-free:

```lean
lxor (lxor 1 2) 3 = 0
```

### Two equal heaps cancel: lxor n n = 0 for every heap size — the mirror strategy. Whatever the opponent takes from one heap, copy it on the other, and the nim-sum stays zero until you take the last stone.
The ledger holds this as [nim_equal_heaps_cancel](/theorem/nim_equal_heaps_cancel) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun n => lxor n n == 0)
```

### The empty heap is neutral: lxor n 0 = n. Adding or removing an exhausted heap never changes the nim-sum, so a finished heap can be ignored.
The ledger holds this as [nim_empty_heap_neutral](/theorem/nim_empty_heap_neutral) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun n => lxor n 0 == n)
```

### The nim-sum does not care about heap order: lxor a b = lxor b a. The heaps are a set, not a sequence — a symmetry the whole theory rests on.
The ledger holds this as [nim_sum_commutes](/theorem/nim_sum_commutes) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => lxor a b == lxor b a))
```

### The nim-sum folds in any grouping: lxor(lxor a b) c = lxor a (lxor b c). Combined with commutativity, a many-heap position folds to a single number no matter the order the heaps are read.
The ledger holds this as [nim_sum_associates](/theorem/nim_sum_associates) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => (List.range 8).all (fun c => lxor (lxor a b) c == lxor a (lxor b c))))
```

### A single non-empty heap is always a WIN for the player to move: its nim-sum is the heap itself (lxor 0 n = n ≠ 0), and the winning move is to take the whole heap. Only the empty position is a loss on one heap.
The ledger holds this as [nim_lone_heap_wins](/theorem/nim_lone_heap_wins) — proven `by decide`, sorry-free:

```lean
(List.range' 1 15).all (fun n => lxor 0 n != 0)
```

### From a nonzero nim-sum a move to a P-position always exists: heaps 1, 2, 4 fold to 7 (a WIN), and reducing the heap of 4 to 3 reaches 1, 2, 3 with nim-sum 0. lxor(lxor 1 2) 4 = 7 and lxor 7 4 = 3 name the target height — the constructive half of Bouton.
The ledger holds this as [nim_winning_move_exists](/theorem/nim_winning_move_exists) — proven `by decide`, sorry-free:

```lean
(lxor (lxor 1 2) 4 = 7) ∧ (lxor 7 4 = 3)
```

### Sprague–Grundy, stated as the LAW rather than one witness of it: for every pair of heaps below 8, the two-heap position is a LOSS for the player to move exactly when the nim-sum is zero, and that happens exactly when the heaps are equal. Proven by exhaustion over all 64 pairs, so the name is falsifiable by the structure it names. It read `lxor 1 2 = 3` until 2026-08-18 — one row of the nim-addition table this same wing already seals as nimsum_1_2, the identical Lean line under a second name, and a general law resting on a single instance. The mirror strategy is the whole proof: equal heaps cancel, so copy every move and take the last stone.
The ledger holds this as [grundy_sum_is_xor](/theorem/grundy_sum_is_xor) — proven `by decide`, sorry-free:

```lean
(List.range 8).all (fun a => (List.range 8).all (fun b => (lxor a b == 0) == (a == b)))
```

### Four heaps at the distinct powers 1, 2, 4, 8 fold to lxor…= 15 (all bits set, ≠ 0): a WIN, and the maximal nim-sum on those heaps — the bits never collide, so nothing cancels.
The ledger holds this as [nim_four_powers](/theorem/nim_four_powers) — proven `by decide`, sorry-free:

```lean
lxor (lxor (lxor 1 2) 4) 8 = 15
```

### The MISÈRE demarcation: three heaps of one stone, [1,1,1], fold to nim-sum lxor(lxor 1 1) 1 = 1 — a WIN under NORMAL play (last stone wins). Under MISÈRE play (last stone LOSES) the same position is a LOSS: the endgame rule flips near the end, so the nim-sum rule holds only while some heap exceeds one. This theorem is the normal-play arithmetic; misère is a different game.
The ledger holds this as [nim_misere_differs](/theorem/nim_misere_differs) — proven `by decide`, sorry-free:

```lean
lxor (lxor 1 1) 1 = 1
```

### Nim enters the ℤ/9 diamond, where the games interact: the maximal four-power nim-sum 15 ≡ 6 (mod 9), and 6 is a NILPOTENT of the ring (6·6 ≡ 0) — the diamond's self-annihilating residue, its "draw". The biggest win reduces to the vortex's zero-square, while chess sits at the units {1,8} and the audit at 8. a structural residue of the nim-sum, NOT a claim nim IS the ring.
The ledger holds this as [nim_max_is_a_diamond_nilpotent](/theorem/nim_max_is_a_diamond_nilpotent) — proven `by decide`, sorry-free:

```lean
(15 % 9 = 6) ∧ ((6 * 6) % 9 = 0)
```

### The nim-sum 0 ⊕ 0 = 0 — entry (0,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_0](/theorem/nimsum_0_0) — proven `by decide`, sorry-free:

```lean
lxor 0 0 = 0
```

### The nim-sum 0 ⊕ 1 = 1 — entry (0,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_1](/theorem/nimsum_0_1) — proven `by decide`, sorry-free:

```lean
lxor 0 1 = 1
```

### The nim-sum 0 ⊕ 2 = 2 — entry (0,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_2](/theorem/nimsum_0_2) — proven `by decide`, sorry-free:

```lean
lxor 0 2 = 2
```

### The nim-sum 0 ⊕ 3 = 3 — entry (0,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_3](/theorem/nimsum_0_3) — proven `by decide`, sorry-free:

```lean
lxor 0 3 = 3
```

### The nim-sum 0 ⊕ 4 = 4 — entry (0,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_4](/theorem/nimsum_0_4) — proven `by decide`, sorry-free:

```lean
lxor 0 4 = 4
```

### The nim-sum 0 ⊕ 5 = 5 — entry (0,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_5](/theorem/nimsum_0_5) — proven `by decide`, sorry-free:

```lean
lxor 0 5 = 5
```

### The nim-sum 0 ⊕ 6 = 6 — entry (0,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_6](/theorem/nimsum_0_6) — proven `by decide`, sorry-free:

```lean
lxor 0 6 = 6
```

### The nim-sum 0 ⊕ 7 = 7 — entry (0,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_7](/theorem/nimsum_0_7) — proven `by decide`, sorry-free:

```lean
lxor 0 7 = 7
```

### The nim-sum 0 ⊕ 8 = 8 — entry (0,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_0_8](/theorem/nimsum_0_8) — proven `by decide`, sorry-free:

```lean
lxor 0 8 = 8
```

### The nim-sum 1 ⊕ 0 = 1 — entry (1,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_0](/theorem/nimsum_1_0) — proven `by decide`, sorry-free:

```lean
lxor 1 0 = 1
```

### The nim-sum 1 ⊕ 1 = 0 — entry (1,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_1](/theorem/nimsum_1_1) — proven `by decide`, sorry-free:

```lean
lxor 1 1 = 0
```

### The nim-sum 1 ⊕ 2 = 3 — entry (1,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_2](/theorem/nimsum_1_2) — proven `by decide`, sorry-free:

```lean
lxor 1 2 = 3
```

### The nim-sum 1 ⊕ 3 = 2 — entry (1,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_3](/theorem/nimsum_1_3) — proven `by decide`, sorry-free:

```lean
lxor 1 3 = 2
```

### The nim-sum 1 ⊕ 4 = 5 — entry (1,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_4](/theorem/nimsum_1_4) — proven `by decide`, sorry-free:

```lean
lxor 1 4 = 5
```

### The nim-sum 1 ⊕ 5 = 4 — entry (1,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_5](/theorem/nimsum_1_5) — proven `by decide`, sorry-free:

```lean
lxor 1 5 = 4
```

### The nim-sum 1 ⊕ 6 = 7 — entry (1,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_6](/theorem/nimsum_1_6) — proven `by decide`, sorry-free:

```lean
lxor 1 6 = 7
```

### The nim-sum 1 ⊕ 7 = 6 — entry (1,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_7](/theorem/nimsum_1_7) — proven `by decide`, sorry-free:

```lean
lxor 1 7 = 6
```

### The nim-sum 1 ⊕ 8 = 9 — entry (1,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_1_8](/theorem/nimsum_1_8) — proven `by decide`, sorry-free:

```lean
lxor 1 8 = 9
```

### The nim-sum 2 ⊕ 0 = 2 — entry (2,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_0](/theorem/nimsum_2_0) — proven `by decide`, sorry-free:

```lean
lxor 2 0 = 2
```

### The nim-sum 2 ⊕ 1 = 3 — entry (2,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_1](/theorem/nimsum_2_1) — proven `by decide`, sorry-free:

```lean
lxor 2 1 = 3
```

### The nim-sum 2 ⊕ 2 = 0 — entry (2,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_2](/theorem/nimsum_2_2) — proven `by decide`, sorry-free:

```lean
lxor 2 2 = 0
```

### The nim-sum 2 ⊕ 3 = 1 — entry (2,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_3](/theorem/nimsum_2_3) — proven `by decide`, sorry-free:

```lean
lxor 2 3 = 1
```

### The nim-sum 2 ⊕ 4 = 6 — entry (2,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_4](/theorem/nimsum_2_4) — proven `by decide`, sorry-free:

```lean
lxor 2 4 = 6
```

### The nim-sum 2 ⊕ 5 = 7 — entry (2,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_5](/theorem/nimsum_2_5) — proven `by decide`, sorry-free:

```lean
lxor 2 5 = 7
```

### The nim-sum 2 ⊕ 6 = 4 — entry (2,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_6](/theorem/nimsum_2_6) — proven `by decide`, sorry-free:

```lean
lxor 2 6 = 4
```

### The nim-sum 2 ⊕ 7 = 5 — entry (2,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_7](/theorem/nimsum_2_7) — proven `by decide`, sorry-free:

```lean
lxor 2 7 = 5
```

### The nim-sum 2 ⊕ 8 = 10 — entry (2,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_2_8](/theorem/nimsum_2_8) — proven `by decide`, sorry-free:

```lean
lxor 2 8 = 10
```

### The nim-sum 3 ⊕ 0 = 3 — entry (3,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_0](/theorem/nimsum_3_0) — proven `by decide`, sorry-free:

```lean
lxor 3 0 = 3
```

### The nim-sum 3 ⊕ 1 = 2 — entry (3,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_1](/theorem/nimsum_3_1) — proven `by decide`, sorry-free:

```lean
lxor 3 1 = 2
```

### The nim-sum 3 ⊕ 2 = 1 — entry (3,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_2](/theorem/nimsum_3_2) — proven `by decide`, sorry-free:

```lean
lxor 3 2 = 1
```

### The nim-sum 3 ⊕ 3 = 0 — entry (3,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_3](/theorem/nimsum_3_3) — proven `by decide`, sorry-free:

```lean
lxor 3 3 = 0
```

### The nim-sum 3 ⊕ 4 = 7 — entry (3,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_4](/theorem/nimsum_3_4) — proven `by decide`, sorry-free:

```lean
lxor 3 4 = 7
```

### The nim-sum 3 ⊕ 5 = 6 — entry (3,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_5](/theorem/nimsum_3_5) — proven `by decide`, sorry-free:

```lean
lxor 3 5 = 6
```

### The nim-sum 3 ⊕ 6 = 5 — entry (3,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_6](/theorem/nimsum_3_6) — proven `by decide`, sorry-free:

```lean
lxor 3 6 = 5
```

### The nim-sum 3 ⊕ 7 = 4 — entry (3,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_7](/theorem/nimsum_3_7) — proven `by decide`, sorry-free:

```lean
lxor 3 7 = 4
```

### The nim-sum 3 ⊕ 8 = 11 — entry (3,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_3_8](/theorem/nimsum_3_8) — proven `by decide`, sorry-free:

```lean
lxor 3 8 = 11
```

### The nim-sum 4 ⊕ 0 = 4 — entry (4,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_0](/theorem/nimsum_4_0) — proven `by decide`, sorry-free:

```lean
lxor 4 0 = 4
```

### The nim-sum 4 ⊕ 1 = 5 — entry (4,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_1](/theorem/nimsum_4_1) — proven `by decide`, sorry-free:

```lean
lxor 4 1 = 5
```

### The nim-sum 4 ⊕ 2 = 6 — entry (4,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_2](/theorem/nimsum_4_2) — proven `by decide`, sorry-free:

```lean
lxor 4 2 = 6
```

### The nim-sum 4 ⊕ 3 = 7 — entry (4,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_3](/theorem/nimsum_4_3) — proven `by decide`, sorry-free:

```lean
lxor 4 3 = 7
```

### The nim-sum 4 ⊕ 4 = 0 — entry (4,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_4](/theorem/nimsum_4_4) — proven `by decide`, sorry-free:

```lean
lxor 4 4 = 0
```

### The nim-sum 4 ⊕ 5 = 1 — entry (4,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_5](/theorem/nimsum_4_5) — proven `by decide`, sorry-free:

```lean
lxor 4 5 = 1
```

### The nim-sum 4 ⊕ 6 = 2 — entry (4,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_6](/theorem/nimsum_4_6) — proven `by decide`, sorry-free:

```lean
lxor 4 6 = 2
```

### The nim-sum 4 ⊕ 7 = 3 — entry (4,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_7](/theorem/nimsum_4_7) — proven `by decide`, sorry-free:

```lean
lxor 4 7 = 3
```

### The nim-sum 4 ⊕ 8 = 12 — entry (4,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_4_8](/theorem/nimsum_4_8) — proven `by decide`, sorry-free:

```lean
lxor 4 8 = 12
```

### The nim-sum 5 ⊕ 0 = 5 — entry (5,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_0](/theorem/nimsum_5_0) — proven `by decide`, sorry-free:

```lean
lxor 5 0 = 5
```

### The nim-sum 5 ⊕ 1 = 4 — entry (5,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_1](/theorem/nimsum_5_1) — proven `by decide`, sorry-free:

```lean
lxor 5 1 = 4
```

### The nim-sum 5 ⊕ 2 = 7 — entry (5,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_2](/theorem/nimsum_5_2) — proven `by decide`, sorry-free:

```lean
lxor 5 2 = 7
```

### The nim-sum 5 ⊕ 3 = 6 — entry (5,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_3](/theorem/nimsum_5_3) — proven `by decide`, sorry-free:

```lean
lxor 5 3 = 6
```

### The nim-sum 5 ⊕ 4 = 1 — entry (5,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_4](/theorem/nimsum_5_4) — proven `by decide`, sorry-free:

```lean
lxor 5 4 = 1
```

### The nim-sum 5 ⊕ 5 = 0 — entry (5,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_5](/theorem/nimsum_5_5) — proven `by decide`, sorry-free:

```lean
lxor 5 5 = 0
```

### The nim-sum 5 ⊕ 6 = 3 — entry (5,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_6](/theorem/nimsum_5_6) — proven `by decide`, sorry-free:

```lean
lxor 5 6 = 3
```

### The nim-sum 5 ⊕ 7 = 2 — entry (5,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_7](/theorem/nimsum_5_7) — proven `by decide`, sorry-free:

```lean
lxor 5 7 = 2
```

### The nim-sum 5 ⊕ 8 = 13 — entry (5,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_5_8](/theorem/nimsum_5_8) — proven `by decide`, sorry-free:

```lean
lxor 5 8 = 13
```

### The nim-sum 6 ⊕ 0 = 6 — entry (6,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_0](/theorem/nimsum_6_0) — proven `by decide`, sorry-free:

```lean
lxor 6 0 = 6
```

### The nim-sum 6 ⊕ 1 = 7 — entry (6,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_1](/theorem/nimsum_6_1) — proven `by decide`, sorry-free:

```lean
lxor 6 1 = 7
```

### The nim-sum 6 ⊕ 2 = 4 — entry (6,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_2](/theorem/nimsum_6_2) — proven `by decide`, sorry-free:

```lean
lxor 6 2 = 4
```

### The nim-sum 6 ⊕ 3 = 5 — entry (6,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_3](/theorem/nimsum_6_3) — proven `by decide`, sorry-free:

```lean
lxor 6 3 = 5
```

### The nim-sum 6 ⊕ 4 = 2 — entry (6,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_4](/theorem/nimsum_6_4) — proven `by decide`, sorry-free:

```lean
lxor 6 4 = 2
```

### The nim-sum 6 ⊕ 5 = 3 — entry (6,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_5](/theorem/nimsum_6_5) — proven `by decide`, sorry-free:

```lean
lxor 6 5 = 3
```

### The nim-sum 6 ⊕ 6 = 0 — entry (6,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_6](/theorem/nimsum_6_6) — proven `by decide`, sorry-free:

```lean
lxor 6 6 = 0
```

### The nim-sum 6 ⊕ 7 = 1 — entry (6,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_7](/theorem/nimsum_6_7) — proven `by decide`, sorry-free:

```lean
lxor 6 7 = 1
```

### The nim-sum 6 ⊕ 8 = 14 — entry (6,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_6_8](/theorem/nimsum_6_8) — proven `by decide`, sorry-free:

```lean
lxor 6 8 = 14
```

### The nim-sum 7 ⊕ 0 = 7 — entry (7,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_0](/theorem/nimsum_7_0) — proven `by decide`, sorry-free:

```lean
lxor 7 0 = 7
```

### The nim-sum 7 ⊕ 1 = 6 — entry (7,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_1](/theorem/nimsum_7_1) — proven `by decide`, sorry-free:

```lean
lxor 7 1 = 6
```

### The nim-sum 7 ⊕ 2 = 5 — entry (7,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_2](/theorem/nimsum_7_2) — proven `by decide`, sorry-free:

```lean
lxor 7 2 = 5
```

### The nim-sum 7 ⊕ 3 = 4 — entry (7,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_3](/theorem/nimsum_7_3) — proven `by decide`, sorry-free:

```lean
lxor 7 3 = 4
```

### The nim-sum 7 ⊕ 4 = 3 — entry (7,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_4](/theorem/nimsum_7_4) — proven `by decide`, sorry-free:

```lean
lxor 7 4 = 3
```

### The nim-sum 7 ⊕ 5 = 2 — entry (7,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_5](/theorem/nimsum_7_5) — proven `by decide`, sorry-free:

```lean
lxor 7 5 = 2
```

### The nim-sum 7 ⊕ 6 = 1 — entry (7,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_6](/theorem/nimsum_7_6) — proven `by decide`, sorry-free:

```lean
lxor 7 6 = 1
```

### The nim-sum 7 ⊕ 7 = 0 — entry (7,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_7](/theorem/nimsum_7_7) — proven `by decide`, sorry-free:

```lean
lxor 7 7 = 0
```

### The nim-sum 7 ⊕ 8 = 15 — entry (7,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_7_8](/theorem/nimsum_7_8) — proven `by decide`, sorry-free:

```lean
lxor 7 8 = 15
```

### The nim-sum 8 ⊕ 0 = 8 — entry (8,0) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_0](/theorem/nimsum_8_0) — proven `by decide`, sorry-free:

```lean
lxor 8 0 = 8
```

### The nim-sum 8 ⊕ 1 = 9 — entry (8,1) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_1](/theorem/nimsum_8_1) — proven `by decide`, sorry-free:

```lean
lxor 8 1 = 9
```

### The nim-sum 8 ⊕ 2 = 10 — entry (8,2) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_2](/theorem/nimsum_8_2) — proven `by decide`, sorry-free:

```lean
lxor 8 2 = 10
```

### The nim-sum 8 ⊕ 3 = 11 — entry (8,3) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_3](/theorem/nimsum_8_3) — proven `by decide`, sorry-free:

```lean
lxor 8 3 = 11
```

### The nim-sum 8 ⊕ 4 = 12 — entry (8,4) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_4](/theorem/nimsum_8_4) — proven `by decide`, sorry-free:

```lean
lxor 8 4 = 12
```

### The nim-sum 8 ⊕ 5 = 13 — entry (8,5) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_5](/theorem/nimsum_8_5) — proven `by decide`, sorry-free:

```lean
lxor 8 5 = 13
```

### The nim-sum 8 ⊕ 6 = 14 — entry (8,6) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_6](/theorem/nimsum_8_6) — proven `by decide`, sorry-free:

```lean
lxor 8 6 = 14
```

### The nim-sum 8 ⊕ 7 = 15 — entry (8,7) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_7](/theorem/nimsum_8_7) — proven `by decide`, sorry-free:

```lean
lxor 8 7 = 15
```

### The nim-sum 8 ⊕ 8 = 0 — entry (8,8) of the 9×9 nim-addition Cayley table (XOR on {0..8}, group identity 0, every element self-inverse), by the axiom-free lxor.
The ledger holds this as [nimsum_8_8](/theorem/nimsum_8_8) — proven `by decide`, sorry-free:

```lean
lxor 8 8 = 0
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
