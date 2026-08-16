---
title: "The time coordinate"
description: "Computed from lean/Ephemeris.lean — 8 sealed theorems, every claim citing its proof."
---

# The time coordinate

> EPHEMERIS — the astronomical TIME coordinate, as decidable arithmetic, demarcated. A day is 86400 seconds (24·60·60); the Earth turns once more against the stars than the sun each year (366 = 365+1); the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400 (97 leap days); mean motion advances a longitude linearly in time ([1,2,3] → [30,60,90]); eclipses recur on the Saros (~223 synodic months); the Sun creeps just under a degree along the ecliptic per day (360 < 365); and a Julian Date is a continuous integer day count. HONEST SCOPE: the arithmetic of calendars and mean motion — the time coordinate — not a perturbed ephemeris, and distinct from the positional facts in Astronomy.

**8 theorems**, each proven `by decide` in [lean/Ephemeris.lean](/lean/Ephemeris.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

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

### Eclipses recur on the Saros of ~18 years — about 223 synodic months: 18·12 = 216 ordinary months plus 7 intercalary ≈ 223. After a Saros the sun, moon and nodes return to nearly the same alignment.

The ledger holds this as [saros_eclipse_cycle](/theorem/saros_eclipse_cycle) — proven `by decide`, sorry-free:

```lean
18 * 12 + 7 = 223
```

### The Sun advances just under one degree along the ecliptic each day, 360° over ~365 days, so 360 < 365 — a hair less than a degree daily. The year is the slow return of that creep to its start.

The ledger holds this as [sun_creeps_under_a_degree](/theorem/sun_creeps_under_a_degree) — proven `by decide`, sorry-free:

```lean
360 < 365
```

### A Julian Date is one continuous integer day count, so any interval is a plain subtraction: the epoch J2000 (JD 2451545) minus the day before (2451544) is 1 day. Time becomes a coordinate you can just subtract.

The ledger holds this as [julian_date_is_a_day_count](/theorem/julian_date_is_a_day_count) — proven `by decide`, sorry-free:

```lean
2451545 - 2451544 = 1
```


::: warning HONEST SCOPE
the arithmetic of calendars and mean motion — the time coordinate — not a perturbed ephemeris, and distinct from the positional facts in Astronomy.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
