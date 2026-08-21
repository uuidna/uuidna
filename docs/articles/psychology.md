---
title: "The instrument"
description: "Computed from lean/Psychology.lean — 8 sealed theorems, every claim citing its proof."
---

# The instrument

> THE INSTRUMENT — the ARITHMETIC of psychology's instruments and named models (the Likert midpoint, the Big Five count, Miller's span, Hick's bits, the detection table, the Weber–Fechner ladder, Dunbar's rounded layers) and ONLY that. — held by [likert_midpoint_is_fixed_point](/theorem/likert_midpoint_is_fixed_point) and its 7 siblings below.

**8 theorems**, from [likert_midpoint_is_fixed_point](/theorem/likert_midpoint_is_fixed_point) onward, each proven `by decide` in [lean/Psychology.lean](/lean/Psychology.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 7 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [big_five_factors_pentad](/theorem/big_five_factors_pentad). A boundary stated here is decided, not merely denied.

### A 7-point Likert scale has a NEUTRAL centre: the reflection 8−x on the points 1..7 (agree reflects to disagree) fixes exactly the 4th point, with an equal 3 above and 3 below (4−1 = 7−4). The neutral midpoint is the fixed point — the same reflection structure the ledger centres on. Says nothing about what the scale measures.
The ledger holds this as [likert_midpoint_is_fixed_point](/theorem/likert_midpoint_is_fixed_point) — proven `by decide`, sorry-free:

```lean
((List.range' 1 7).filter (fun x => 8 - x == x) = [4]) ∧ (4 - 1 = 7 - 4)
```

### The Big Five (OCEAN) model is FIVE factors — a five-dimensional description, a pentad. This seals only the COUNT of the model's axes (five), not that the five factors are correct, complete, or measure anything real about a person.
The ledger holds this as [big_five_factors_pentad](/theorem/big_five_factors_pentad) — proven `by decide`, sorry-free:

```lean
(List.range 5).length = 5
```

### Miller's reported span — the "magical number seven, plus or minus two" — is the range [5, 9], width 4 (7−2 = 5, 7+2 = 9, 9−5 = 4). This seals the ARITHMETIC of the range Miller reported, NOT a claim about memory, capacity, or the mind.
The ledger holds this as [working_memory_span_seven](/theorem/working_memory_span_seven) — proven `by decide`, sorry-free:

```lean
(7 - 2 = 5) ∧ (7 + 2 = 9) ∧ (9 - 5 = 4)
```

### Hick's law relates decision time to the INFORMATION of a choice: n equally-likely options carry log₂ n bits, so 8 options are exactly 3 bits (2³ = 8). This seals the information-theoretic arithmetic, NOT a prediction of anyone's reaction time.
The ledger holds this as [hicks_law_three_bits](/theorem/hicks_law_three_bits) — proven `by decide`, sorry-free:

```lean
2^3 = 8
```

### A yes/no detection has a 2×2 = 4 outcome table — hit, miss, false alarm, correct rejection — the two truths crossed with the two responses. This seals the COUNTING of the outcome table, NOT a claim about perception or sensitivity.
The ledger holds this as [signal_detection_two_by_two](/theorem/signal_detection_two_by_two) — proven `by decide`, sorry-free:

```lean
2 * 2 = 4
```

### Weber–Fechner: perceived intensity grows with the LOGARITHM of the stimulus, so a geometric stimulus ladder 1,2,4,8 (the powers 2⁰..2³) maps to equal perceived steps 0,1,2,3. This seals the log-ladder arithmetic, NOT a claim that all perception is logarithmic.
The ledger holds this as [weber_fechner_log_ladder](/theorem/weber_fechner_log_ladder) — proven `by decide`, sorry-free:

```lean
(List.range 4).map (fun k => 2^k) = [1,2,4,8]
```

### Two named developmental models carry stage-counts in a doubling relation: Piaget names 4 stages and Erikson names 8, and 8 = 2·4. This seals only the ARITHMETIC of the reported counts (a named model has that many stages), NOT that either model is true, universal, or describes any real development.
The ledger holds this as [developmental_stages_double](/theorem/developmental_stages_double) — proven `by decide`, sorry-free:

```lean
2 * 4 = 8
```

### Dunbar's social layers scale by about ×3 — 5, 15, then the exact 45 and 135 — but are REPORTED rounded to 50 and 150 (the same rounding gap the photography stops carry: 50−45 = 5, 150−135 = 15). This seals the ratio arithmetic and the rounding, NOT a claim about how many relationships a person can hold.
The ledger holds this as [dunbar_layers_triple_and_round](/theorem/dunbar_layers_triple_and_round) — proven `by decide`, sorry-free:

```lean
(5 * 3 = 15) ∧ (15 * 3 = 45) ∧ (50 - 45 = 5) ∧ (150 - 135 = 15)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
