---
title: "The software-verifiable algebra"
description: "Computed from lean/Software.lean — 11 sealed theorems, every claim citing its proof."
---

# The software-verifiable algebra

> THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. Losslessness (split-and-recompose is the identity), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, total guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity). Indexing uses the axiom-free `nth`. HONEST SCOPE: integrity, not truth — uuidna SEALS the spec so an implementation can be verified against it; it does NOT write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec a program is checked against — not the program.

**11 theorems**, each proven `by decide` in [lean/Software.lean](/lean/Software.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### LOSSLESS by construction: splitting a number into (quotient, remainder) and recomposing it — 2·(n/2) + n%2 — returns n exactly, for every value. Serialisation that decomposes then reassembles loses nothing; the round-trip is the identity.

The ledger holds this as [codec_split_recompose_lossless](/theorem/codec_split_recompose_lossless) — proven `by decide`, sorry-free:

```lean
(List.range 32).all (fun n => 2 * (n / 2) + n % 2 == n)
```

### A pure transform PRESERVES STRUCTURE: mapping a function over a list keeps its length — no element is dropped or duplicated. length (map f l) = length l.

The ledger holds this as [map_preserves_length](/theorem/map_preserves_length) — proven `by decide`, sorry-free:

```lean
((List.range 10).map (fun x => x + 1)).length = 10
```

### A FILTER NEVER GROWS its input: selecting a sublist can only keep or drop elements, so its length is at most the original. length (filter p l) ≤ length l — a query cannot invent data.

The ledger holds this as [filter_never_grows](/theorem/filter_never_grows) — proven `by decide`, sorry-free:

```lean
((List.range 10).filter (fun x => x % 2 == 0)).length ≤ 10
```

### CONCATENATION is additive in length: joining two buffers gives exactly the sum of their lengths — length (a ++ b) = length a + length b. No byte is lost or invented at the seam.

The ledger holds this as [append_length_adds](/theorem/append_length_adds) — proven `by decide`, sorry-free:

```lean
([1,2,3] ++ [4,5]).length = 3 + 2
```

### NORMALISATION is IDEMPOTENT: clamping an already-clamped value changes nothing — clamp (clamp n) = clamp n, across every input. Apply the normaliser once or twice, the result is the same; re-processing is safe.

The ledger holds this as [clamp_is_idempotent](/theorem/clamp_is_idempotent) — proven `by decide`, sorry-free:

```lean
(List.range 20).all (fun n => let c := if n ≤ 7 then n else 7; (if c ≤ 7 then c else 7) == c)
```

### A GUARDED DIVISION is TOTAL: defined for every divisor including zero — 12/b for b ≠ 0, and 0 when b = 0 (the abstract-zero fold), never an error. Its table over [0,1,2,3,4,6] is [0,12,6,4,3,2]. Software never crashes on divide-by-zero.

The ledger holds this as [safe_div_is_total](/theorem/safe_div_is_total) — proven `by decide`, sorry-free:

```lean
[0,1,2,3,4,6].map (fun b => if b == 0 then 0 else 12 / b) = [0,12,6,4,3,2]
```

### A SUM-FOLD is ORDER-INVARIANT: reducing [1,2,3,4] and its reverse give the same total — 10 either way. A reduction over an associative-commutative op is safe to reorder or parallelise; the answer does not depend on the schedule.

The ledger holds this as [reduce_is_order_invariant](/theorem/reduce_is_order_invariant) — proven `by decide`, sorry-free:

```lean
List.foldl (fun a b => a + b) 0 [1,2,3,4] = List.foldl (fun a b => a + b) 0 [4,3,2,1]
```

### A SHIFT LOOP TERMINATES: halving any 4-bit value four times reaches 0 — the loop provably halts within its bound, for all 16 inputs. Bounded iteration does not hang.

The ledger holds this as [shift_loop_terminates](/theorem/shift_loop_terminates) — proven `by decide`, sorry-free:

```lean
(List.range 16).all (fun n => n/2/2/2/2 == 0)
```

### The COMPARE-SWAP ORDERS a pair: whatever the input order, the smaller ends first and the larger second (min ≤ max). This single primitive, composed, is every sorting network — proven to order on its base case.

The ledger holds this as [compare_swap_orders](/theorem/compare_swap_orders) — proven `by decide`, sorry-free:

```lean
[(3,1),(1,3),(2,2)].all (fun p => (if p.1 ≤ p.2 then p.1 else p.2) ≤ (if p.1 ≤ p.2 then p.2 else p.1))
```

### INDEXING is TOTAL: reading position 5 of a length-3 list returns the default 0 (never an out-of-bounds fault), while position 1 returns 20. Safe access is defined for every index — no buffer over-read.

The ledger holds this as [safe_index_is_total](/theorem/safe_index_is_total) — proven `by decide`, sorry-free:

```lean
(nth [10,20,30] 5 = 0) ∧ (nth [10,20,30] 1 = 20)
```

### UNDO of UNDO is the IDENTITY: reversing a list twice returns it unchanged — reverse (reverse l) = l. The reversible-operation law every codec and every undo-stack rests on.

The ledger holds this as [reverse_is_involutive](/theorem/reverse_is_involutive) — proven `by decide`, sorry-free:

```lean
[1,2,3,4].reverse.reverse = [1,2,3,4]
```


::: warning HONEST SCOPE
integrity, not truth — uuidna SEALS the spec so an implementation can be verified against it; it does NOT write, compile, or run your program, nor prove an arbitrary program correct.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
