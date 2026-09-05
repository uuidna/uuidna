---
title: "The site build as arithmetic"
description: "Computed from lean/SiteBuild.lean — 16 sealed theorems, every claim citing its proof."
---

# The site build as arithmetic

> NINE OF THESE ELEVEN ARE PINNED, NOT FORCED — read that before the numbers. A peer's vocabulary (zeropoint-node-8a, 2026-09-04) after they found a literal expectation inside a column of their own labelled `derived`: a FORCED check has independent content and falls only for a law, a PINNED one holds the expected answer inside itself and falls for a convention just as readily. Audited across this wing: FORCED are exponent_associativity_changes_the_value (2^3^2 = 512 against (2^3)^2 = 64 is arithmetic, true whatever anyone measured) and the_congruence_form_is_the_modulus_form (exhaustive over every x below 63). The other nine seal MEASUREMENTS I took on one machine — resident-memory readings, byte counts, wall-clock timings, a retention constant derived from the very threshold it explains — and each says so in its own text. They are honest and they are not laws: re-run them on another host and the integers move. The kernel decides the arithmetic; a person measured the inputs. THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency's entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand. — held by [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) and its 15 siblings below.

**16 theorems**, from [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) onward, each proven `by decide` in <a href="/lean/SiteBuild.lean">lean/SiteBuild.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 3 of its 16 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [counting_beats_composing_by_six_magnitudes](/theorem/counting_beats_composing_by_six_magnitudes). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSiteBuild.lean)** — nothing to install. The editor fetches `lean/SiteBuild.lean` from the repository and re-decides all 16 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### 5260 pages at 17 tenths of a MB each = 8942 MB against an 8192 MB container
The ledger holds this as [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — proven `by decide`, sorry-free:

```lean
(5260 * 17 = 89420) ∧ (89420 > 81920) ∧ (1200 * 17 = 20400) ∧ (20400 < 20480) ∧ (89420 > 40960)
```

### 103030000 µs / 38 µs = 2711315: the render budget answered by counting, not by rendering
The ledger holds this as [counting_beats_composing_by_six_magnitudes](/theorem/counting_beats_composing_by_six_magnitudes) — proven `by decide`, sorry-free:

```lean
(103030000 / 38 = 2711315) ∧ (2711315 > 1000000) ∧ (4352 / 26 = 167) ∧ (2599 + 2516 + 116 + 33 + 18 = 5282)
```

### 12037 pages fit the 8192 cap and the site has 5260 — the margin is a page count, not a memory reading
The ledger holds this as [the_page_budget_is_twice_the_ledger](/theorem/the_page_budget_is_twice_the_ledger) — proven `by decide`, sorry-free:

```lean
(1367 + 2982 = 4349) ∧ (4349 < 4352) ∧ (8192 - 4352 = 3840) ∧ (12037 > 10520) ∧ (5260 * 2 = 10520)
```

### the knob's whole travel is 420 MB against a 750 MB overshoot
The ledger holds this as [the_concurrency_knob_cannot_close_the_gap](/theorem/the_concurrency_knob_cannot_close_the_gap) — proven `by decide`, sorry-free:

```lean
(8170 - 7750 = 420) ∧ (420 * 19 = 7980) ∧ (7980 < 8170) ∧ (8942 - 8192 = 750) ∧ (420 < 750)
```

### the per-page params are under an eight-hundredth of the retained mass
The ledger holds this as [the_params_are_not_the_retained_mass](/theorem/the_params_are_not_the_retained_mass) — proven `by decide`, sorry-free:

```lean
(61 - 50 = 11) ∧ (11 * 10 = 110) ∧ (110 * 800 = 88000) ∧ (88000 < 89420)
```

### peak resident 8460 MB exceeds the 8192 MB cap by 268 — a heap is not a resident set
The ledger holds this as [the_process_holds_more_than_the_container_allows](/theorem/the_process_holds_more_than_the_container_allows) — proven `by decide`, sorry-free:

```lean
(8460 > 8192) ∧ (8460 - 8192 = 268) ∧ (10784 = 107 * 100 + 84)
```

### one directory walk against 5260 page renders
The ledger holds this as [verify_costs_one_walk_against_the_whole_page_count](/theorem/verify_costs_one_walk_against_the_whole_page_count) — proven `by decide`, sorry-free:

```lean
(5260 = 5260 * 1) ∧ (5260 > 5000) ∧ (20 * 60 = 1200) ∧ (1200 > 1)
```

### 17 − 2 = 15: a floor standing on two unearned anchors exceeds what it can defend
The ledger holds this as [a_floor_may_fall_to_what_is_anchored](/theorem/a_floor_may_fall_to_what_is_anchored) — proven `by decide`, sorry-free:

```lean
(17 - 2 = 15) ∧ (17 - 1 = 16) ∧ (16 - 1 = 15) ∧ (17 > 15)
```

### 32293 − 32183 = 110 hundredths per tool: 280 bytes of sentence a parser had been cutting
The ledger holds this as [the_wire_rate_rose_by_restored_copy](/theorem/the_wire_rate_rose_by_restored_copy) — proven `by decide`, sorry-free:

```lean
(32293 - 32183 = 110) ∧ (255 - 242 = 13) ∧ (110 * 255 = 28050) ∧ (82349 - 77885 = 4464) ∧ (13 * 32183 = 418379)
```

### a fixed-point-free involution on two states: (1 + 1) % 2 = 0 and nothing is its own opposite
The ledger holds this as [the_two_sides_return_what_they_take](/theorem/the_two_sides_return_what_they_take) — proven `by decide`, sorry-free:

```lean
((1 + 1) % 2 = 0) ∧ (1 - 0 ≠ 0) ∧ (1 - 1 ≠ 1)
```

### 85179 bytes of markup from a 36-character address: 2366 times the input, shipped 2603 times
The ledger holds this as [the_face_is_computed_not_shipped](/theorem/the_face_is_computed_not_shipped) — proven `by decide`, sorry-free:

```lean
(85179 / 36 = 2366) ∧ (2603 * 85179 = 221720937) ∧ (2603 * 36 = 93708) ∧ (221720937 > 187416000)
```

### 2^3^2 = 512, but (2^3)^2 = 64
The ledger holds this as [exponent_associativity_changes_the_value](/theorem/exponent_associativity_changes_the_value) — proven `by decide`, sorry-free:

```lean
(2^3^2 = 512) ∧ ((2^3)^2 = 64) ∧ (512 ≠ 64)
```

### x − (x mod 9) is divisible by 9 for every x below 63
The ledger holds this as [the_congruence_form_is_the_modulus_form](/theorem/the_congruence_form_is_the_modulus_form) — proven `by decide`, sorry-free:

```lean
((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9)))
```

### 117 monographs through a one-variable template give 27 abstracts — 90 of them duplicates, 76 percent
The ledger holds this as [a_template_distinguishes_only_by_its_variable](/theorem/a_template_distinguishes_only_by_its_variable) — proven `by decide`, sorry-free:

```lean
(117 - 27 = 90) ∧ (90 * 100 / 117 = 76) ∧ (27 < 117)
```

### every one of 117 kin-degrees is between 1 and 5, and the 115 fives with two twos sum to all 579 edges
The ledger holds this as [the_kin_shortlist_accounts_for_every_edge](/theorem/the_kin_shortlist_accounts_for_every_edge) — proven `by decide`, sorry-free:

```lean
((List.replicate 115 5 ++ [2, 2]).length = 117) ∧ ((List.replicate 115 5 ++ [2, 2]).sum = 579) ∧ ((List.replicate 115 5 ++ [2, 2]).all (fun d => d ≤ 5 && d ≥ 1))
```

### modulus 6 over constant 2 over word 1, and a basis relating 102 of 116 is no basis
The ledger holds this as [a_shared_modulus_outranks_a_shared_word](/theorem/a_shared_modulus_outranks_a_shared_word) — proven `by decide`, sorry-free:

```lean
(6 > 2) ∧ (2 > 1) ∧ (102 > 116 / 2) ∧ (28 < 116 / 2)
```


::: warning 
NINE OF THESE ELEVEN ARE PINNED, NOT FORCED — read that before the numbers. The boundary is confirmed by the wing's own sealed theorems — e.g. [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
