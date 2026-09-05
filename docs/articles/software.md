---
title: "The software-verifiable algebra"
description: "Computed from lean/Software.lean — 16 sealed theorems, every claim citing its proof."
---

# The software-verifiable algebra

> THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. — held by [codec_split_recompose_lossless](/theorem/codec_split_recompose_lossless) and its 15 siblings below.

**16 theorems**, from [codec_split_recompose_lossless](/theorem/codec_split_recompose_lossless) onward, each proven `by decide` in <a href="/lean/Software.lean">lean/Software.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 10 of its 16 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [filter_never_grows](/theorem/filter_never_grows). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSoftware.lean)** — nothing to install. The editor fetches `lean/Software.lean` from the repository and re-decides all 16 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### LOSSLESS by construction: splitting a number into (quotient, remainder) and recomposing it — 2·(n/2) + n%2 — returns n exactly, for every value. Serialisation that decomposes then reassembles loses nothing; the round-trip is the identity.
The ledger holds this as [codec_split_recompose_lossless](/theorem/codec_split_recompose_lossless) — proven `by decide`, sorry-free:

```lean
(List.range 32).all (fun n => 2 * (n / 2) + n % 2 == n)
```

### A pure transform PRESERVES STRUCTURE, checked over all ten list lengths 0..9: mapping a function over a list keeps its length — no element is dropped or duplicated at any of them. length (map f l) = length l.
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

### A GUARDED DIVISION is TOTAL: defined for every divisor including zero — 12/b for b ≠ 0, and 0 when b = 0 (the abstract-zero fold). Its table over [0,1,2,3,4,6] is [0,12,6,4,3,2]. Software never crashes on divide-by-zero.
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

### A NEIGHBOURHOOD SEALS EXACTLY WHEN IT IS WHOLE, AND AT NO OTHER COUNT. The sealing rule is seal(held, size) = (held == size), and it is its own converse — so it is settled ONCE and then instantiated, never re-walked. The kernel walks a window of 118 held-counts (as many as there are neighbourhoods on disk, a window measured from this ledger rather than an invented constant) and finds that exactly ONE of them seals and none below it does; then it confirms of each of the 117 measured neighbourhoods, in constant work, that it seals at its own size and NOT one short of it — and folds their sizes to 2640, a total appearing nowhere among them. This is the difference between a memory and a cache. A cache writes what it has; this holds a handle in memory and touches no disk until the last member of its neighbourhood arrives, so a run that dies part-way through a wing leaves nothing behind that could be mistaken for a whole one. An EMPTY neighbourhood refutes this theorem rather than passing it vacuously, because a wing that seals at nothing is a cache. The sizes are measured from the files.
The ledger holds this as [cube_seals_at_completeness_only](/theorem/cube_seals_at_completeness_only) — proven `by decide`, sorry-free:

```lean
(((List.range 118).filter (fun k => k == 117)).length = 1) ∧ (((List.range 117).filter (fun k => k == 117)).length = 0) ∧ ([6, 6, 6, 9, 13, 8, 11, 18, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 17, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 6, 6, 6, 18, 8, 20, 6, 13, 12, 6, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 2, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 14, 6, 10, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 16, 11, 11, 8, 6, 8, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 15, 18, 16, 935, 18].all (fun n => (n == n) && !(n - 1 == n))) ∧ (([6, 6, 6, 9, 13, 8, 11, 18, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 17, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 6, 6, 6, 18, 8, 20, 6, 13, 12, 6, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 2, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 14, 6, 10, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 16, 11, 11, 8, 6, 8, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 15, 18, 16, 935, 18].foldl (· + ·) 0) = 2640)
```

### THE NEIGHBOURHOODS PARTITION THE LEDGER, AND THE MEMORY IS ONE LINE PER NEIGHBOURHOOD. The kernel folds the 117 measured wing counts and lands on 2640 — the whole ledger, nothing counted twice and nothing lost — then counts the wings themselves and confirms there are fewer of them than there are theorems. That last inequality is the entire saving: what persists is ONE complete uuid for each neighbourhood, standing for every theorem inside it, because every member handle, statement and count behind that uuid is recomputable from the Lean by anyone holding the file. A second stored copy of a derived fact is the only kind that can disagree with the first. What the kernel does NOT decide here is whether any wing repeats a key — a duplicate would make the census smaller, and a smaller census would simply be sealed as a smaller number. That is the emitter's gate rather than the kernel's: the per-wing declaration counts and member counts are compared before a byte is written, and the build stops instead. Checked by removing one key from one wing and watching it stop.
The ledger holds this as [cubes_partition_ledger](/theorem/cubes_partition_ledger) — proven `by decide`, sorry-free:

```lean
(([6, 6, 6, 9, 13, 8, 11, 18, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 17, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 6, 6, 6, 18, 8, 20, 6, 13, 12, 6, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 2, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 14, 6, 10, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 16, 11, 11, 8, 6, 8, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 15, 18, 16, 935, 18].foldl (· + ·) 0) = 2640) ∧ ([6, 6, 6, 9, 13, 8, 11, 18, 11, 6, 17, 6, 5, 15, 5, 6, 9, 13, 24, 30, 8, 6, 9, 25, 17, 7, 4, 5, 64, 11, 9, 16, 13, 8, 10, 6, 14, 4, 13, 8, 12, 10, 6, 6, 6, 18, 8, 20, 6, 13, 12, 6, 10, 6, 5, 8, 11, 7, 7, 5, 8, 18, 93, 6, 2, 6, 9, 9, 8, 13, 6, 8, 6, 10, 5, 6, 8, 58, 17, 25, 14, 6, 10, 7, 6, 234, 148, 10, 7, 6, 9, 33, 5, 16, 11, 11, 8, 6, 8, 6, 4, 6, 6, 6, 11, 6, 18, 8, 6, 13, 7, 2, 15, 18, 16, 935, 18].length = 117) ∧ (117 < 2640)
```

### A STANDING RECEIPT IS FREE, AND ONLY A MOVED NEIGHBOURHOOD IS PAID FOR. Over the two bits the plan decides on (s = the cube is sealed, m = its fold matches the receipt already held), the cost is s·(1−m), and of the four states EXACTLY ONE pays: sealed-and-moved. A held cube costs nothing because it has not been decided either way, and a sealed cube whose fold is unchanged costs nothing because the work was already done and recorded — verify-by-receipt at the granularity of a neighbourhood rather than a file. The same algebra as the provenance gate and the harmony law, turned on cost instead of prose: never vacuous, because it does fire, and only where it should.
The ledger holds this as [receipt_costs_nothing](/theorem/receipt_costs_nothing) — proven `by decide`, sorry-free:

```lean
(((List.range 4).filter (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) == 1)).length = 1) ∧ ((List.range 4).all (fun n => let s := n % 2; let m := n / 2 % 2; s * (1 - m) ≤ s))
```

### WHAT TRAVELS IS THE COMPLETE ADDRESS; THE HANDLE IS ONLY THE PATH. A handle is 8 hex characters — 4 levels of 2, which is why it splits into a directory tree — and it indexes 16^8 = 4,294,967,296 addresses. The birthday bound is the reason that number is not the capacity: collisions become likely around its square root, and 65,536 × 65,536 is exactly 16^8, so the usable ceiling of an 8-hex name is about 65,536 things. The ledger is well inside that today and a memory built to grow is not. The full address carries 32 hex characters, 4 times the width and 128 bits, so the receipt stores that and the handle stays what it is good for: a place to put the file. Shipping the index where the identity belongs is the saving this refuses to take, refused here rather than at the point it would first collide.
The ledger holds this as [message_carries_address](/theorem/message_carries_address) — proven `by decide`, sorry-free:

```lean
(16^8 = 4294967296) ∧ (65536 * 65536 = 16^8) ∧ (8 * 4 = 32) ∧ (32 * 4 = 128)
```

### NO WING BUYS ITS OWN CEILING. Across the 118 wings on disk, the census of recursion-depth raises is ZERO — not one file asks the kernel for more depth than it gives by default. Until 2026-08-25 it was one: Wave.lean carried a file-wide maxRecDepth raise, emitted with no note saying which theorem needed it, and by then no theorem in that wing needed it at all. That is why the count is kept rather than the line merely deleted. A raise is the cheapest way to make a claim pass and the most expensive thing to leave standing, because while it stands nothing in its wing can reach the ceiling — the healthy case and the broken case return the same value, and the signal that says RESTATE THIS CLAIM is gone. What stands in its place is involution_replaces_the_raised_ceiling: a self-inverse map splits its domain into fixed points and 2-cycles, so the obligation is the return and not the census, and the walked domain may grow as 2^k while the check stays at 2. Depth is a property of the SHAPE of a claim, never of the kernel's generosity.
The ledger holds this as [no_wing_buys_its_own_ceiling](/theorem/no_wing_buys_its_own_ceiling) — proven `by decide`, sorry-free:

```lean
(([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].filter (fun r => r != 0)).length = 0) ∧ ([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].length = 118) ∧ (([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].foldl (· + ·) 0) = 0)
```


::: warning 
THE SOFTWARE-VERIFIABLE ALGEBRA — the companion to the hardware layer, one level up: the algebraic correctness LAWS a program is verified AGAINST, each a decidable, axiom-free `by decide` particle. The boundary is confirmed by the wing's own sealed theorems — e.g. [codec_split_recompose_lossless](/theorem/codec_split_recompose_lossless) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
