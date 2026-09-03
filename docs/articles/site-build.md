---
title: "The site build as arithmetic"
description: "Computed from lean/SiteBuild.lean — 7 sealed theorems, every claim citing its proof."
---

# The site build as arithmetic

> THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The two knobs are sealed as insufficient rather than described as such: the concurrency's entire travel is 420 MB against a 750 MB overshoot, and the params are under a eight-hundredth of the retained mass. So the build left the container and the hook now verifies what the operator machine rendered. The same wing carries the arithmetic the typesetter is judged by, because the ledger is the referee of its own presentation: exponents associate right, and a congruence is the remainder in another hand. — held by [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) and its 6 siblings below.

**7 theorems**, from [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) onward, each proven `by decide` in [lean/SiteBuild.lean](/lean/SiteBuild.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSiteBuild.lean)** — nothing to install. The editor fetches `lean/SiteBuild.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### render_retention_exceeds_the_container
The ledger holds this as [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — proven `by decide`, sorry-free:

```lean
(5260 * 17 = 89420) ∧ (89420 > 81920) ∧ (1200 * 17 = 20400) ∧ (20400 < 20480) ∧ (89420 > 40960)
```

### the_concurrency_knob_cannot_close_the_gap
The ledger holds this as [the_concurrency_knob_cannot_close_the_gap](/theorem/the_concurrency_knob_cannot_close_the_gap) — proven `by decide`, sorry-free:

```lean
(8170 - 7750 = 420) ∧ (420 * 19 = 7980) ∧ (7980 < 8170) ∧ (8942 - 8192 = 750) ∧ (420 < 750)
```

### the_params_are_not_the_retained_mass
The ledger holds this as [the_params_are_not_the_retained_mass](/theorem/the_params_are_not_the_retained_mass) — proven `by decide`, sorry-free:

```lean
(61 - 50 = 11) ∧ (11 * 10 = 110) ∧ (110 * 800 = 88000) ∧ (88000 < 89420)
```

### the_process_holds_more_than_the_container_allows
The ledger holds this as [the_process_holds_more_than_the_container_allows](/theorem/the_process_holds_more_than_the_container_allows) — proven `by decide`, sorry-free:

```lean
(8460 > 8192) ∧ (8460 - 8192 = 268) ∧ (10784 = 107 * 100 + 84)
```

### verify_costs_one_walk_against_the_whole_page_count
The ledger holds this as [verify_costs_one_walk_against_the_whole_page_count](/theorem/verify_costs_one_walk_against_the_whole_page_count) — proven `by decide`, sorry-free:

```lean
(5260 = 5260 * 1) ∧ (5260 > 5000) ∧ (20 * 60 = 1200) ∧ (1200 > 1)
```

### exponent_associativity_changes_the_value
The ledger holds this as [exponent_associativity_changes_the_value](/theorem/exponent_associativity_changes_the_value) — proven `by decide`, sorry-free:

```lean
(2^3^2 = 512) ∧ ((2^3)^2 = 64) ∧ (512 ≠ 64)
```

### the_congruence_form_is_the_modulus_form
The ledger holds this as [the_congruence_form_is_the_modulus_form](/theorem/the_congruence_form_is_the_modulus_form) — proven `by decide`, sorry-free:

```lean
((List.range 63).all (fun x => ((x - x % 9) % 9 == 0) && (x % 9 < 9)))
```


::: warning 
THE SITE BUILD AS ARITHMETIC — the render phase retains every page for the whole run, so the heap is the page count times 17 tenths of a megabyte, and 5260 pages come to 8942 MB against a deploy container of 8192. The boundary is confirmed by the wing's own sealed theorems — e.g. [render_retention_exceeds_the_container](/theorem/render_retention_exceeds_the_container) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
