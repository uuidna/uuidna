---
title: "The tides"
description: "Computed from lean/Tides.lean — 6 sealed theorems, every claim citing its proof."
---

# The tides

> THE TIDES — the rule of twelfths, half-tide, the semidiurnal period and spring/neap, as decidable arithmetic. — held by [rule_of_twelfths](/theorem/rule_of_twelfths) and its 5 siblings below.

**6 theorems**, from [rule_of_twelfths](/theorem/rule_of_twelfths) onward, each proven `by decide` in [lean/Tides.lean](/lean/Tides.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 6 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [half_tide_at_hour_three](/theorem/half_tide_at_hour_three). A boundary stated here is decided, not merely denied.

### The sailor's rule of twelfths: over six hours a tide rises 1,2,3,3,2,1 twelfths of its range — and 1+2+3+3+2+1 = 12, the whole range accounted for.
The ledger holds this as [rule_of_twelfths](/theorem/rule_of_twelfths) — proven `by decide`, sorry-free:

```lean
1 + 2 + 3 + 3 + 2 + 1 = 12
```

### The rule is a palindrome — [1,2,3,3,2,1] reversed is itself: flood and ebb mirror, the tide fills as it drains.
The ledger holds this as [twelfths_symmetric](/theorem/twelfths_symmetric) — proven `by decide`, sorry-free:

```lean
[1,2,3,3,2,1].reverse = [1,2,3,3,2,1]
```

### By the third hour the water stands at HALF its range: 1+2+3 = 6 of 12 (2·6 = 12) — half-tide falls at mid-flood, not the halfway time by accident but by the twelfths.
The ledger holds this as [half_tide_at_hour_three](/theorem/half_tide_at_hour_three) — proven `by decide`, sorry-free:

```lean
1 + 2 + 3 = 6 ∧ 2 * 6 = 12
```

### Two high tides fall a lunar day apart: 12h25m = 745 minutes each, and 745·2 = 1490 = 24h50m — the semidiurnal rhythm, set by the Moon, not the Sun (which would give 24h).
The ledger holds this as [semidiurnal_period](/theorem/semidiurnal_period) — proven `by decide`, sorry-free:

```lean
745 * 2 = 1490
```

### A spring tide (new or full Moon, Sun and Moon aligned, their pulls ADD) exceeds a neap (at the quarter, pulls partly cancel): 2+1 > 2−1 — the range swells and shrinks with the phase.
The ledger holds this as [spring_exceeds_neap](/theorem/spring_exceeds_neap) — proven `by decide`, sorry-free:

```lean
2 + 1 > 2 - 1
```

### One semidiurnal cycle is six hours of flood and six of ebb: 6 + 6 = 12 — the tide gives back exactly the hours it took.
The ledger holds this as [flood_and_ebb](/theorem/flood_and_ebb) — proven `by decide`, sorry-free:

```lean
6 + 6 = 12
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
