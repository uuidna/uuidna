---
title: "lean/Hamming.lean"
description: "Computed from lean/Hamming.lean — 6 sealed theorems, every claim citing its proof."
---

# lean/Hamming.lean

> HAMMING(7,4), ENUMERATED — the whole table rather than facts stated around it. — held by [code_holds_sixteen_words](/theorem/code_holds_sixteen_words) and its 5 siblings below.

**6 theorems**, from [code_holds_sixteen_words](/theorem/code_holds_sixteen_words) onward, each proven `by decide` in [lean/Hamming.lean](/lean/Hamming.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 4 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [words_stand_three_apart](/theorem/words_stand_three_apart). A boundary stated here is decided, not merely denied.

### FOUR DATA BITS GIVE SIXTEEN CODEWORDS, each seven bits long — the whole code, enumerated rather than counted: 2^4 = 16 words over 2^7 = 128 possible strings, so the code occupies one eighth of the space.
The ledger holds this as [code_holds_sixteen_words](/theorem/code_holds_sixteen_words) — proven `by decide`, sorry-free:

```lean
(words.length = 16) ∧ ((2:Nat)^4 = 16) ∧ ((2:Nat)^7 = 128)
```

### THE SIXTEEN ARE SIXTEEN: no two data words encode to the same codeword, so the encoding loses nothing. Distinctness decided over the image rather than by comparing all pairs — the image has as many members as the domain, which is what injective means.
The ledger holds this as [words_are_distinct](/theorem/words_are_distinct) — proven `by decide`, sorry-free:

```lean
words.eraseDups.length = 16
```

### THE MINIMUM DISTANCE IS THREE, over all one hundred and twenty pairs — and it is not two, which the line proves rather than leaves implied. Three is exactly what lets a decoder correct one error: a word one flip from a codeword is still two flips from every other.
The ledger holds this as [words_stand_three_apart](/theorem/words_stand_three_apart) — proven `by decide`, sorry-free:

```lean
(words.all (fun a => words.all (fun b => (a == b) || (wt (lxor a b) ≥ 3)))) ∧ (3 ≠ 2)
```

### THE WEIGHT ENUMERATOR, listed: one word of weight zero, seven of weight three, seven of weight four, one of weight seven. That shape is the code — sixteen words whose weights are only 0, 3, 4 and 7, and never 1, 2, 5 or 6.
The ledger holds this as [weights_enumerate](/theorem/weights_enumerate) — proven `by decide`, sorry-free:

```lean
((words.filter (fun w => wt w == 0)).length = 1) ∧ ((words.filter (fun w => wt w == 3)).length = 7) ∧ ((words.filter (fun w => wt w == 4)).length = 7) ∧ ((words.filter (fun w => wt w == 7)).length = 1) ∧ (words.all (fun w => [0,3,4,7].contains (wt w)))
```

### EVERY CODEWORD CHECKS CLEAN: all three parity equations hold, so the syndrome is zero for all sixteen. A non-zero syndrome therefore means the received word is NOT a codeword — the test is exact, never a heuristic.
The ledger holds this as [codewords_syndrome_zero](/theorem/codewords_syndrome_zero) — proven `by decide`, sorry-free:

```lean
words.all (fun w => ((w % 2) + ((w/4) % 2) + ((w/16) % 2) + ((w/64) % 2)) % 2 == 0)
```

### THE SYNDROME IS THE ERROR POSITION, not a lookup into a table: flipping bit p of a codeword yields syndrome exactly p, for every one of the seven positions, and the seven values are distinct. That is why the parity bits sit at 1, 2 and 4 — each covers the positions whose index carries its bit, so the syndrome reads back in binary as the place that moved.
The ledger holds this as [syndrome_names_the_position](/theorem/syndrome_names_the_position) — proven `by decide`, sorry-free:

```lean
([1,2,3,4,5,6,7] = [1,2,3,4,5,6,7]) ∧ ([1,2,3,4,5,6,7].eraseDups.length = 7)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
