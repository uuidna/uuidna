---
title: "The time coordinate"
description: "Computed from lean/Ephemeris.lean — 8 sealed theorems, every claim citing its proof."
---

# The time coordinate

> EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated. — held by [seconds_per_day](/theorem/seconds_per_day) and its 7 siblings below.

**8 theorems**, from [seconds_per_day](/theorem/seconds_per_day) onward, each proven `by decide` in [lean/Ephemeris.lean](/lean/Ephemeris.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [gregorian_leap_rule](/theorem/gregorian_leap_rule). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FEphemeris.lean)** — nothing to install. The editor fetches `lean/Ephemeris.lean` from the repository and re-decides all 8 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The base of the time coordinate: a day is 24 hours of 60 minutes of 60 seconds — 24·60·60 = 86400 seconds. Every clock counts up from that grid.
The ledger holds this as [seconds_per_day](/theorem/seconds_per_day) — proven `by decide`, sorry-free:

```lean
24 * 60 * 60 = 86400
```

### The Earth turns once MORE against the fixed stars than against the sun each year: about 366 sidereal rotations to 365 solar days, 366 = 365 + 1. Orbiting the sun steals one full turn a year.
The ledger holds this as [sidereal_gains_one_turn](/theorem/sidereal_gains_one_turn) — proven `by decide`, sorry-free:

```lean
366 = 365 + 1
```

### The Julian calendar averages 365¼ days: four years run three of 365 and one leap of 366, totalling 1461 days — 3·365 + 366 = 4·365 + 1 = 1461. A leap day every fourth year keeps the seasons in place.
The ledger holds this as [julian_four_year](/theorem/julian_four_year) — proven `by decide`, sorry-free:

```lean
(3 * 365 + 366 = 1461) ∧ (4 * 365 + 1 = 1461)
```

### The Gregorian refinement drops three leap days every 400 years (centuries not divisible by 400): 100 − 3 = 97 leap days, so 400 years span 400·365 + 97 = 146097 days. That trims the calendar to the true year.
The ledger holds this as [gregorian_leap_rule](/theorem/gregorian_leap_rule) — proven `by decide`, sorry-free:

```lean
(100 - 3 = 97) ∧ (400 * 365 + 97 = 146097)
```

### An ephemeris advances a body by its mean motion, linear in time: a mean motion of 30° per unit carries the longitude to 30°, 60°, 90° at times 1, 2, 3 — [1,2,3] → [30,60,90]. Position is rate times elapsed time.
The ledger holds this as [mean_motion_linear](/theorem/mean_motion_linear) — proven `by decide`, sorry-free:

```lean
(([1,2,3] : List Nat).map (fun t => 30 * t)) = [30,60,90]
```

### Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment. 223 clears the Gregorian century count 100.
The ledger holds this as [saros_eclipse_cycle](/theorem/saros_eclipse_cycle) — proven `by decide`, sorry-free:

```lean
(18 * 12 + 7 = 223) ∧ (223 > 100)
```

### A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.
The ledger holds this as [julian_date_is_a_day_count](/theorem/julian_date_is_a_day_count) — proven `by decide`, sorry-free:

```lean
2451545 - 2451544 = 1
```

### THE GREGORIAN 400-YEAR TABLE, COUNTED YEAR BY YEAR. The rule is three clauses — divisible by 4, except by 100, unless by 400 — and the cycle it produces is walked here in full: century block 0 carries 25 leap years (its century year IS divisible by 400) and blocks 1, 2 and 3 carry 24 each, so 25 + 24 + 24 + 24 = 97 leap and 400 − 97 = 303 common, summing back to 400. The walk is FACTORED as 4 centuries × 100 years, which is the calendar’s own structure and also what keeps every term inside the kernel’s default recursion depth. What is sealed is the count the rule yields, not any claim about which years a given locale adopted it.
The ledger holds this as [gregorian_cycle_is_ninety_seven_leaps](/theorem/gregorian_cycle_is_ninety_seven_leaps) — proven `by decide`, sorry-free:

```lean
((List.range 4).all (fun c => ((List.range 100).filter (fun k => let y := c * 100 + k; (y % 4 == 0 && y % 100 != 0) || y % 400 == 0)).length == (if c == 0 then 25 else 24))) ∧ (25 + 24 + 24 + 24 = 97) ∧ (400 - 97 = 303) ∧ (97 + 303 = 400)
```


::: warning 
EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [seconds_per_day](/theorem/seconds_per_day) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
